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
import { ArrowLeft, Clock, ShieldCheck, AlertTriangle } from 'lucide-react';

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
      <div className="max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8 text-center py-20 flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-bg-subtle border-t-primary rounded-full animate-spin mb-6"></div>
        <h3 className="text-xl font-bold text-navy mb-2 tracking-tight">Loading Report</h3>
        <p className="text-text-secondary font-medium">Retrieving securely saved analysis data...</p>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
        <button onClick={() => navigate('/history')} className="text-text-secondary hover:text-navy font-semibold flex items-center mb-6 bg-card px-4 py-2 rounded-lg border border-border shadow-sm transition-colors w-fit">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to History
        </button>
        <div className="bg-card border border-status-danger/20 p-10 rounded-3xl text-center shadow-md max-w-2xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-status-danger/50"></div>
          <AlertTriangle className="w-14 h-14 text-status-danger mx-auto mb-5" />
          <h2 className="text-2xl font-extrabold text-navy mb-3 tracking-tight">Analysis Not Found</h2>
          <p className="text-text-secondary mb-8 text-lg">{error || 'This report may have been permanently deleted.'}</p>
          <Link to="/analyze" className="px-8 py-3.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20 inline-flex items-center">
            Analyze New Content
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto w-full p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <button onClick={() => navigate('/history')} className="text-text-secondary hover:text-navy font-semibold flex items-center bg-card px-4 py-2 rounded-lg border border-border shadow-sm transition-colors w-fit">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to History
        </button>
        <div className="text-xs font-bold text-navy uppercase tracking-wider flex items-center bg-card px-4 py-2.5 rounded-lg border border-border shadow-sm">
          <Clock className="w-4 h-4 mr-2 text-primary" />
          {new Date(result.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
        </div>
      </div>

      <div className="space-y-8 max-w-3xl mx-auto">
        <RiskSummaryCard 
          riskLevel={result.riskLevel}
          riskSummary={result.riskSummary}
          indicatorCount={result.riskIndicators?.length || 0}
          claimCount={result.claims?.length || 0}
        />

        <div className="bg-card rounded-3xl shadow-sm border border-border overflow-hidden">
          <div className="p-5 border-b border-border bg-bg-subtle flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-navy">Original Analyzed Content</h3>
          </div>
          <div className="p-6">
            <div className="bg-bg-subtle p-5 rounded-2xl border border-border text-text-main font-mono text-sm italic whitespace-pre-wrap leading-relaxed">
              "{result.inputPreview}"
            </div>
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
          </>
        )}

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
