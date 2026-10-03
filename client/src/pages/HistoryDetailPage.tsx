import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAnalysisById } from '../services/api';
import { 
  RiskSummaryCard, 
  RiskIndicators, 
  ClaimsList, 
  EvidenceStatus, 
  ExtractedText, 
  EducationSection, 
  SafeActions 
} from '../components/results';
import { ArrowLeft, Clock, Shield, AlertTriangle } from 'lucide-react';

export const HistoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchAnalysisDetails(id);
    }
  }, [id]);

  const fetchAnalysisDetails = async (analysisId: string) => {
    setLoading(true);
    setError(null);
    const response = await getAnalysisById(analysisId);
    
    if (response.success && response.analysis) {
      setResult(response.analysis);
    } else {
      setError(response.error || 'Unable to retrieve analysis details.');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-6"></div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">Loading analysis details...</h3>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <button onClick={() => navigate('/history')} className="text-blue-600 hover:text-blue-800 font-medium flex items-center mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to History
        </button>
        <div className="bg-white border border-red-200 p-8 rounded-xl text-center shadow-sm">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Analysis Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'This analysis may have been deleted or does not exist.'}</p>
          <Link to="/analyze" className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Analyze New Content
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate('/history')} className="text-blue-600 hover:text-blue-800 font-medium flex items-center bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to History
        </button>
        <div className="text-sm text-gray-500 flex items-center bg-white px-3 py-1.5 rounded-lg border border-gray-200">
          <Clock className="w-4 h-4 mr-1.5" />
          {new Date(result.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
        </div>
      </div>

      <div className="space-y-6">
        <RiskSummaryCard 
          riskLevel={result.riskLevel}
          riskSummary={result.riskSummary}
          indicatorCount={result.riskIndicators?.length || 0}
          claimCount={result.claims?.length || 0}
        />

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
            <Shield className="w-5 h-5 text-gray-500 mr-2" /> Analyzed Content
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700 font-medium italic whitespace-pre-wrap">
            {result.inputPreview}
          </div>
        </div>

        {result.extractedText && (
          <ExtractedText text={result.extractedText} />
        )}

        {result.riskIndicators && result.riskIndicators.length > 0 && (
          <RiskIndicators indicators={result.riskIndicators} />
        )}

        {result.claims && result.claims.length > 0 && (
          <>
            <ClaimsList claims={result.claims} />
            {/* The result.claims includes the evidence, so we can extract it if needed, or EvidenceStatus uses the evidence array directly if we map it out. But in AnalyzePage we didn't pass evidence explicitly since claims contains it? Wait, let's look at AnalyzePage. */}
          </>
        )}

        {/* EvidenceStatus needs a flat array of evidence across all claims usually, let's create it */}
        {result.claims && (
          <EvidenceStatus evidence={result.claims.flatMap((c: any) => c.evidence || [])} />
        )}

        {result.education && result.education.length > 0 && (
          <EducationSection education={result.education} />
        )}

        {result.safeActions && result.safeActions.length > 0 && (
          <SafeActions actions={result.safeActions} />
        )}
      </div>
    </div>
  );
};
