import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { analyzeText, analyzeImage, verifyClaims, generateEducation } from '../services/api';
import type { AnalysisResult } from '../types/analysis.types';
import { Shield, AlertTriangle, Lock, Upload, Image as ImageIcon, FileText, X } from 'lucide-react';
import { 
  RiskSummaryCard, 
  RiskIndicators, 
  ClaimsList, 
  EvidenceStatus, 
  ExtractedText, 
  EducationSection, 
  SafeActions 
} from '../components/results';

const DEMO_TEXT = `SEBI approved investment opportunity!\n\nInvest ₹10,000 today and get ₹50,000 guaranteed in 15 days.\n\nLimited slots. Click now.\n\nhttps://bit.ly/invest-now`;

export const AnalyzePage: React.FC = () => {
  const [inputType, setInputType] = useState<'text' | 'image'>('text');
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [educationError, setEducationError] = useState<string | null>(null);
  const [loadingStage, setLoadingStage] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (inputType === 'text' && !text.trim()) {
      setError('Please enter some content to analyze.');
      return;
    }
    if (inputType === 'image' && !imageFile) {
      setError('Please upload a valid image file.');
      return;
    }

    setLoading(true);
    setError(null);
    setVerificationError(null);
    setEducationError(null);
    setResult(null);
    setExtractedText(null);

    // Simulate stages
    if (inputType === 'image') {
      setLoadingStage('Extracting text from screenshot...');
      setTimeout(() => setLoadingStage('Analyzing financial content...'), 2000);
      setTimeout(() => setLoadingStage('Identifying warning indicators...'), 3500);
      setTimeout(() => setLoadingStage('Preparing investor guidance...'), 5000);
    } else {
      setLoadingStage('Analyzing financial content...');
      setTimeout(() => setLoadingStage('Identifying warning indicators...'), 1500);
      setTimeout(() => setLoadingStage('Extracting financial claims...'), 3000);
      setTimeout(() => setLoadingStage('Preparing investor guidance...'), 4500);
    }

    try {
      const response = inputType === 'image' && imageFile
        ? await analyzeImage(imageFile)
        : await analyzeText(text);

      if (response.success && response.analysis) {
        let finalAnalysis = { ...response.analysis };
        let currentExtractedText = response.extractedText || null;

        // Initial setup
        setResult(finalAnalysis);
        if (currentExtractedText) {
          setExtractedText(currentExtractedText);
        }

        // Verify claims
        if (finalAnalysis.claims && finalAnalysis.claims.length > 0) {
          setLoadingStage('Checking trusted sources...');
          const verifyResponse = await verifyClaims(finalAnalysis.claims);
          if (verifyResponse.success && verifyResponse.claims) {
             finalAnalysis = { ...finalAnalysis, claims: verifyResponse.claims };
             setResult(finalAnalysis);
          } else {
             setVerificationError('Independent verification is temporarily unavailable.');
          }
        }

        // Generate personalized education
        if (finalAnalysis.riskIndicators && finalAnalysis.riskIndicators.length > 0) {
          setLoadingStage('Preparing investor education...');
          const eduResponse = await generateEducation(finalAnalysis.riskIndicators, 'en');
          if (eduResponse.success && eduResponse.education) {
             finalAnalysis = { ...finalAnalysis, education: eduResponse.education };
             setResult(finalAnalysis);
          } else {
             setEducationError('Personalized education is temporarily unavailable. You can still review the warning signs below.');
          }
        }

        // Save to History
        setLoadingStage('Saving analysis...');
        const historyData = {
          inputType,
          inputPreview: inputType === 'text' ? text : currentExtractedText || 'Screenshot Analysis',
          extractedText: currentExtractedText,
          riskLevel: finalAnalysis.riskLevel,
          riskSummary: finalAnalysis.riskSummary,
          riskIndicators: finalAnalysis.riskIndicators,
          claims: finalAnalysis.claims,
          education: finalAnalysis.education,
          safeActions: finalAnalysis.safeActions
        };
        
        // Import createHistory at the top if not imported yet
        const { createHistory } = await import('../services/api');
        await createHistory(historyData);

      } else {
        setError(response.error || 'An unknown error occurred.');
      }
    } catch (err) {
      setError('An error occurred while connecting to the server.');
    } finally {
      setLoading(false);
      setLoadingStage('');
    }
  };



  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
          <Shield className="w-8 h-8 text-blue-700" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Analyze Financial Content</h1>
        <p className="mt-2 text-gray-600">
          Paste an investment-related message or upload a screenshot to identify potential warning signs.
        </p>
      </div>

      {!result && !loading && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setInputType('text')}
              className={`flex-1 py-4 text-center font-medium text-sm flex items-center justify-center transition-colors ${
                inputType === 'text' 
                  ? 'border-b-2 border-blue-600 text-blue-600 bg-white' 
                  : 'text-gray-500 hover:text-gray-700 bg-gray-50'
              }`}
            >
              <FileText className="w-4 h-4 mr-2" /> Text
            </button>
            <button
              onClick={() => setInputType('image')}
              className={`flex-1 py-4 text-center font-medium text-sm flex items-center justify-center transition-colors ${
                inputType === 'image' 
                  ? 'border-b-2 border-blue-600 text-blue-600 bg-white' 
                  : 'text-gray-500 hover:text-gray-700 bg-gray-50'
              }`}
            >
              <ImageIcon className="w-4 h-4 mr-2" /> Screenshot
            </button>
          </div>

          <div className="p-6">
            {inputType === 'text' ? (
              <>
                <div className="mb-4">
                  <button
                    onClick={() => setText(DEMO_TEXT)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Load Demo Sample
                  </button>
                </div>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste suspicious investment message here..."
                  className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </>
            ) : (
              <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 relative overflow-hidden transition-colors hover:bg-gray-100">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg, image/png, image/webp"
                  onChange={handleImageSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                
                {imagePreview ? (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white p-4">
                    <div className="relative w-full h-3/4 flex items-center justify-center mb-4">
                      <img src={imagePreview} alt="Preview" className="max-w-full max-h-full object-contain rounded" />
                    </div>
                    <div className="flex items-center justify-between w-full px-4 text-sm">
                      <div className="truncate flex-1 font-medium text-gray-700">
                        {imageFile?.name} <span className="text-gray-500 font-normal">({formatFileSize(imageFile?.size || 0)})</span>
                      </div>
                      <button 
                        onClick={clearImage}
                        className="ml-4 text-red-600 hover:text-red-800 flex items-center font-medium"
                      >
                        <X className="w-4 h-4 mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="text-gray-600 font-medium mb-1">Upload a screenshot of a suspicious investment message</p>
                    <p className="text-gray-500 text-sm">Drag and drop or click to browse (JPG, PNG, WebP up to 5MB)</p>
                  </>
                )}
              </div>
            )}
            
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start">
                <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="mt-6 flex flex-col items-center">
              <button
                onClick={handleAnalyze}
                disabled={loading || (inputType === 'text' ? !text.trim() : !imageFile)}
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
              >
                Analyze Content →
              </button>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Lock className="w-4 h-4 mr-1.5" />
                Never enter passwords, OTPs, PINs or banking credentials.
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-6"></div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Analyzing your content</h3>
          <p className="text-gray-600 mb-6">We're checking the content for financial risk indicators and claims.</p>
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
            {loadingStage}
          </div>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => {
                setResult(null);
                setExtractedText(null);
                setVerificationError(null);
                setEducationError(null);
              }} 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Input
            </button>
          </div>

          <RiskSummaryCard 
            riskLevel={result.riskLevel}
            riskSummary={result.riskSummary}
            indicatorCount={result.riskIndicators.length}
            claimCount={result.claims.length}
          />

          {extractedText && (
            <ExtractedText text={extractedText} />
          )}

          <RiskIndicators indicators={result.riskIndicators} />

          {verificationError && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg text-sm mb-6">
              {verificationError}
              <div className="text-gray-600 mt-1">The risk analysis is still available below.</div>
            </div>
          )}

          <ClaimsList claims={result.claims} />

          <EvidenceStatus evidence={result.evidence} />

          {educationError && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg text-sm mb-6">
              {educationError}
            </div>
          )}

          <EducationSection education={result.education} />

          <SafeActions actions={result.safeActions} />

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <button
              onClick={() => {
                setResult(null);
                setExtractedText(null);
                setVerificationError(null);
                setEducationError(null);
              }}
              className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Analyze Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
