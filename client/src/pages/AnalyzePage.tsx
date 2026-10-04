import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { analyzeText, analyzeImage, verifyClaims, generateEducation } from '../services/api';
import type { AnalysisResult } from '../types/analysis.types';
import { ShieldCheck, AlertTriangle, X, ArrowRight, Upload, FileText, Image as ImageIcon, CheckCircle, ScanSearch } from 'lucide-react';
import { 
  RiskSummaryCard, 
  RiskIndicators, 
  ClaimsList, 
  ExtractedText, 
  EducationSection, 
  SafeActions,
  RiskSignalMap
} from '../components/results';
import { useLanguage } from '../i18n';

const DEMO_TEXT = `SEBI approved investment opportunity!\n\nInvest ₹10,000 today and get ₹50,000 guaranteed in 15 days.\n\nLimited slots. Click now.\n\nhttps://bit.ly/invest-now`;

export const AnalyzePage: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
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
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
      setText(''); // clear text when image selected to avoid confusion
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
    if (activeTab === 'text') {
      if (!text.trim()) {
        setError('Please enter some content to analyze.');
        return;
      }
      await processAnalysis('text');
    } else {
      if (!imageFile) {
        setError('Please upload a valid image file.');
        return;
      }
      await processAnalysis('image');
    }
  };

  const processAnalysis = async (type: 'text' | 'image') => {
    setLoading(true);
    setError(null);
    setVerificationError(null);
    setEducationError(null);
    setResult(null);
    setExtractedText(null);
    setActiveStepIndex(1); // Detect

    // Simulate stages
    if (type === 'image') {
      setLoadingStage('Extracting text from screenshot...');
      setTimeout(() => setLoadingStage('Analyzing financial content...'), 2000);
      setTimeout(() => { setLoadingStage('Identifying warning indicators...'); setActiveStepIndex(1); }, 3500);
      setTimeout(() => { setLoadingStage('Checking trusted sources...'); setActiveStepIndex(2); }, 5000);
    } else {
      setLoadingStage('Analyzing financial content...');
      setTimeout(() => { setLoadingStage('Identifying warning indicators...'); setActiveStepIndex(1); }, 1500);
      setTimeout(() => { setLoadingStage('Extracting financial claims...'); setActiveStepIndex(2); }, 3000);
    }

    try {
      const response = type === 'image' && imageFile
        ? await analyzeImage(imageFile)
        : await analyzeText(text);

      if (response.success && response.analysis) {
        let finalAnalysis = { ...response.analysis };
        let currentExtractedText = response.extractedText || null;

        setResult(finalAnalysis);
        if (currentExtractedText) {
          setExtractedText(currentExtractedText);
        }

        // Verify claims
        if (finalAnalysis.claims && finalAnalysis.claims.length > 0) {
          setActiveStepIndex(2); // Verify
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
          setActiveStepIndex(3); // Explain
          setLoadingStage('Preparing investor education...');
          setTimeout(() => setActiveStepIndex(4), 1000); // Educate
          
          const eduResponse = await generateEducation(finalAnalysis.riskIndicators, language);
          if (eduResponse.success && eduResponse.education) {
             finalAnalysis = { ...finalAnalysis, education: eduResponse.education };
             setResult(finalAnalysis);
          } else {
             setEducationError('Personalized education is temporarily unavailable. You can still review the warning signs below.');
          }
        }

        setActiveStepIndex(5); // Complete
        setLoadingStage('Saving analysis...');
        
        // Save to History
        const historyData = {
          inputType: type,
          inputPreview: type === 'text' ? text : currentExtractedText || 'Screenshot Analysis',
          extractedText: currentExtractedText,
          riskLevel: finalAnalysis.riskLevel,
          riskSummary: finalAnalysis.riskSummary,
          riskIndicators: finalAnalysis.riskIndicators,
          claims: finalAnalysis.claims,
          education: finalAnalysis.education,
          safeActions: finalAnalysis.safeActions
        };
        
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
    <div className="max-w-[1280px] mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out motion-reduce:animate-none font-sans">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-secondary mb-1 flex items-center gap-1.5">
            {t('analyze.badge')} <span className="text-outline-variant">•</span> {t('analyze.badgeSub')}
          </span>
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">{t('analyze.title')}</h1>
          <p className="mt-2 font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            {t('analyze.desc')}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-full border border-surface-container-highest shadow-sm shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-on-tertiary-container opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-on-tertiary-container"></span>
          </span>
          <span className="font-label-sm text-label-sm text-on-surface font-semibold">AI Safety Engine Active</span>
          <span className="text-outline-variant mx-1">|</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">v2.4</span>
        </div>
      </div>

      {!result && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: INPUT COLUMN */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-3xl shadow-sm border border-surface-container-highest overflow-hidden">
            <div className="p-6 border-b border-surface-container-highest">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">{t('analyze.whatToAnalyze')}</h2>
                <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low px-2.5 py-1 rounded-md">{t('analyze.sandbox')}</span>
              </div>
              
              <div className="flex bg-surface-container p-1 rounded-xl">
                <button 
                  onClick={() => setActiveTab('text')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-label-md text-label-md active:scale-95 transition-all duration-200 ${activeTab === 'text' ? 'bg-secondary text-on-secondary shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest/50'}`}
                >
                  <FileText className="w-4 h-4" /> {t('analyze.pasteText')}
                </button>
                <button 
                  onClick={() => setActiveTab('image')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-label-md text-label-md active:scale-95 transition-all duration-200 ${activeTab === 'image' ? 'bg-secondary text-on-secondary shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest/50'}`}
                >
                  <ImageIcon className="w-4 h-4" /> {t('analyze.uploadScreenshot')}
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {activeTab === 'text' && (
                <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-200">
                  <textarea
                    value={text}
                    onChange={(e) => { setText(e.target.value); clearImage(); }}
                    placeholder={t('analyze.textPlaceholder')}
                    className="w-full min-h-[220px] p-5 bg-surface-container-low border border-surface-container-highest rounded-2xl focus:ring-2 focus:ring-secondary/40 focus:border-secondary resize-none text-on-surface font-body-md leading-relaxed placeholder:text-on-surface-variant/60 transition-all shadow-inner"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">{text.length} / 50,000 characters</span>
                    {text.length === 0 && (
                      <button
                        onClick={() => setText(DEMO_TEXT)}
                        className="flex items-center gap-1.5 font-label-sm text-label-sm text-secondary hover:text-primary active:scale-95 transition-all duration-200 bg-secondary-fixed px-3 py-1.5 rounded-lg"
                      >
                        {t('analyze.loadDemo')}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'image' && (
                <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-200">
                  <div className={`w-full min-h-[220px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center relative overflow-hidden transition-all ${imagePreview ? 'border-secondary/30 bg-secondary-fixed/20' : 'border-surface-container-highest bg-surface-container-low hover:bg-surface-container hover:border-secondary/50'}`}>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/jpeg, image/png, image/webp"
                      onChange={handleImageSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    
                    {imagePreview ? (
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-surface-container-lowest p-4">
                        <div className="relative w-full h-40 flex items-center justify-center mb-4">
                          <img src={imagePreview} alt="Preview" className="max-w-full max-h-full object-contain rounded-lg shadow-sm border border-surface-container-highest" />
                        </div>
                        <div className="flex items-center justify-between w-full max-w-md px-4 py-3 bg-surface-container-low rounded-xl border border-surface-container-highest">
                          <div className="truncate flex-1 font-label-md text-label-md text-on-surface mr-4">
                            {imageFile?.name} <span className="text-on-surface-variant font-normal ml-1">({formatFileSize(imageFile?.size || 0)})</span>
                          </div>
                          <button 
                            onClick={(e) => { e.stopPropagation(); clearImage(); }}
                            className="font-label-sm text-label-sm text-error hover:text-red-800 flex items-center bg-error-container/30 hover:bg-error-container/50 active:scale-95 px-3 py-1.5 rounded-lg transition-all duration-200"
                          >
                            <X className="w-3.5 h-3.5 mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center px-6 pointer-events-none">
                        <div className="w-14 h-14 bg-surface-container-lowest rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-surface-container-highest">
                          <Upload className="w-6 h-6 text-secondary" />
                        </div>
                        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-1">{t('analyze.uploadScreenshot')}</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 max-w-xs mx-auto"></p>
                        <div className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-surface-container-lowest border border-surface-container-highest font-label-sm text-label-sm text-secondary font-semibold shadow-sm">
                          {t('analyze.dropImage')}
                        </div>
                        <p className="font-label-sm text-label-sm text-outline-variant mt-4">PNG · JPG · WebP · Max 5 MB</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-4 p-4 bg-error-container text-on-error-container rounded-xl flex items-start gap-3 font-body-sm text-body-sm animate-in slide-in-from-bottom-2">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="font-label-sm text-label-sm text-on-surface-variant opacity-70">
                  {t('analyze.disclaimer')}
                </p>
                <button
                  onClick={handleAnalyze}
                  disabled={loading || (activeTab === 'text' ? !text.trim() : !imageFile)}
                  className="w-full sm:w-auto px-8 py-3 bg-primary text-on-primary font-label-lg text-label-lg rounded-xl hover:bg-primary-container hover:-translate-y-[1px] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-200 ease-out flex justify-center items-center group shadow-md shrink-0"
                >
                  {t('analyze.btnAnalyze')} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: HOW IT WORKS COLUMN */}
          <div className="lg:col-span-5 bg-surface-container-low rounded-3xl border border-surface-container-highest p-6 shadow-inner hidden md:block">
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="w-6 h-6 text-secondary" />
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">{t('analyze.checks.title')}</h2>
            </div>
            
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
              {t('analyze.checks.sub')}
            </p>

            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.1rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-surface-container-highest before:to-transparent">
              
              <div className="relative flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-md text-label-md font-bold shrink-0 z-10 shadow-sm shadow-primary/20">01</div>
                <div>
                  <h4 className="font-label-lg text-label-lg font-bold text-on-surface mb-1">Detect</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Scan linguistic patterns, unrealistic yields, and artificial urgency.</p>
                </div>
              </div>
              
              <div className="relative flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-label-md text-label-md font-bold shrink-0 z-10">02</div>
                <div>
                  <h4 className="font-label-lg text-label-lg font-bold text-on-surface mb-1">Verify</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Query SEBI, RBI, and AMFI master lists for active registration IDs.</p>
                </div>
              </div>

              <div className="relative flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-label-md text-label-md font-bold shrink-0 z-10">03</div>
                <div>
                  <h4 className="font-label-lg text-label-lg font-bold text-on-surface mb-1">Explain</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Translate legal terminology into clear, accessible regional language.</p>
                </div>
              </div>

              <div className="relative flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-label-md text-label-md font-bold shrink-0 z-10">04</div>
                <div>
                  <h4 className="font-label-lg text-label-lg font-bold text-on-surface mb-1">Educate</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Deliver targeted micro-modules to build enduring investor resilience.</p>
                </div>
              </div>

              <div className="relative flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-label-md text-label-md font-bold shrink-0 z-10">05</div>
                <div>
                  <h4 className="font-label-lg text-label-lg font-bold text-on-surface mb-1">Safe Action</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Provide 1-click reporting shortcuts to the National Cybercrime Portal.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="max-w-2xl mx-auto mt-10 animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out motion-reduce:animate-none">
          <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-lg border border-surface-container-highest">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-secondary-fixed rounded-2xl flex items-center justify-center shrink-0">
                <ScanSearch className="w-6 h-6 text-secondary animate-pulse" />
              </div>
              <div>
                <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Analyzing your content</h2>
                <p className="font-body-sm text-body-sm text-secondary animate-pulse">{loadingStage}</p>
              </div>
            </div>

            <div className="space-y-1 relative before:absolute before:inset-0 before:ml-[1.3rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-surface-container-highest">
              
              <div className={`relative flex items-center gap-4 p-3 rounded-xl transition-colors ${activeStepIndex === 1 ? 'bg-surface-container-low' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-label-sm text-label-sm font-bold shrink-0 z-10 transition-colors ${activeStepIndex > 1 ? 'bg-tertiary-fixed text-on-tertiary-fixed' : activeStepIndex === 1 ? 'bg-secondary text-on-secondary shadow-md' : 'bg-surface-container text-on-surface-variant border border-surface-container-highest'}`}>
                  {activeStepIndex > 1 ? <CheckCircle className="w-4 h-4" /> : '01'}
                </div>
                <div>
                  <h4 className={`font-label-md text-label-md font-bold ${activeStepIndex >= 1 ? 'text-on-surface' : 'text-on-surface-variant'}`}>Detect</h4>
                  {activeStepIndex === 1 && <p className="font-body-sm text-body-sm text-on-surface-variant">Identifying warning signals</p>}
                </div>
              </div>

              <div className={`relative flex items-center gap-4 p-3 rounded-xl transition-colors ${activeStepIndex === 2 ? 'bg-surface-container-low' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-label-sm text-label-sm font-bold shrink-0 z-10 transition-colors ${activeStepIndex > 2 ? 'bg-tertiary-fixed text-on-tertiary-fixed' : activeStepIndex === 2 ? 'bg-secondary text-on-secondary shadow-md' : 'bg-surface-container text-on-surface-variant border border-surface-container-highest'}`}>
                  {activeStepIndex > 2 ? <CheckCircle className="w-4 h-4" /> : '02'}
                </div>
                <div>
                  <h4 className={`font-label-md text-label-md font-bold ${activeStepIndex >= 2 ? 'text-on-surface' : 'text-on-surface-variant'}`}>Verify</h4>
                  {activeStepIndex === 2 && <p className="font-body-sm text-body-sm text-on-surface-variant">Checking available evidence</p>}
                </div>
              </div>

              <div className={`relative flex items-center gap-4 p-3 rounded-xl transition-colors ${activeStepIndex === 3 ? 'bg-surface-container-low' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-label-sm text-label-sm font-bold shrink-0 z-10 transition-colors ${activeStepIndex > 3 ? 'bg-tertiary-fixed text-on-tertiary-fixed' : activeStepIndex === 3 ? 'bg-secondary text-on-secondary shadow-md' : 'bg-surface-container text-on-surface-variant border border-surface-container-highest'}`}>
                  {activeStepIndex > 3 ? <CheckCircle className="w-4 h-4" /> : '03'}
                </div>
                <div>
                  <h4 className={`font-label-md text-label-md font-bold ${activeStepIndex >= 3 ? 'text-on-surface' : 'text-on-surface-variant'}`}>Explain</h4>
                  {activeStepIndex === 3 && <p className="font-body-sm text-body-sm text-on-surface-variant">Preparing an understandable explanation</p>}
                </div>
              </div>

              <div className={`relative flex items-center gap-4 p-3 rounded-xl transition-colors ${activeStepIndex === 4 ? 'bg-surface-container-low' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-label-sm text-label-sm font-bold shrink-0 z-10 transition-colors ${activeStepIndex > 4 ? 'bg-tertiary-fixed text-on-tertiary-fixed' : activeStepIndex === 4 ? 'bg-secondary text-on-secondary shadow-md' : 'bg-surface-container text-on-surface-variant border border-surface-container-highest'}`}>
                  {activeStepIndex > 4 ? <CheckCircle className="w-4 h-4" /> : '04'}
                </div>
                <div>
                  <h4 className={`font-label-md text-label-md font-bold ${activeStepIndex >= 4 ? 'text-on-surface' : 'text-on-surface-variant'}`}>Educate</h4>
                  {activeStepIndex === 4 && <p className="font-body-sm text-body-sm text-on-surface-variant">Finding relevant safety lessons</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {result && !loading && (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out motion-reduce:animate-none pb-12">
          
          <div className="flex items-center justify-between mb-4">
            <span className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-outline">ANALYSIS COMPLETE</span>
            <button 
              onClick={() => { setResult(null); setActiveStepIndex(0); }}
              className="px-4 py-2 bg-surface-container-lowest border border-surface-container-highest rounded-lg font-label-sm text-label-sm text-on-surface hover:bg-surface-container hover:-translate-y-px active:scale-95 transition-all duration-200 shadow-sm hover:shadow"
            >
              Start New Analysis
            </button>
          </div>

          {(verificationError || educationError) && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex items-start gap-3 text-sm">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                {verificationError && <p>{verificationError}</p>}
                {educationError && <p className={verificationError ? 'mt-2' : ''}>{educationError}</p>}
              </div>
            </div>
          )}

          {/* 1. Risk Summary */}
          <RiskSummaryCard 
            riskLevel={result.riskLevel} 
            riskSummary={result.riskSummary} 
            indicatorCount={result.riskIndicators.length} 
            claimCount={result.claims?.length || 0}
          />

          {/* 2. Risk Signal Map */}
          <RiskSignalMap indicators={result.riskIndicators} />

          {/* 3. Warning Signs */}
          <RiskIndicators indicators={result.riskIndicators} />

          {/* 4. Claims & Evidence */}
          <ClaimsList claims={result.claims} />

          {/* 5. Extracted Text (if screenshot) */}
          {extractedText && (
            <ExtractedText text={extractedText} />
          )}

          {/* 6. Personalized Education */}
          <EducationSection education={result.education} />

          {/* 7. Safe Next Steps */}
          <SafeActions actions={result.safeActions} />

        </div>
      )}

    </div>
  );
};
