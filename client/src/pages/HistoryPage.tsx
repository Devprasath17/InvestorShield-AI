import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory, deleteAnalysis } from '../services/api';
import { 
  Clock, 
  Trash2, 
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  FileText,
  Image as ImageIcon
} from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    const response = await getHistory();
    
    if (response.success && response.analyses) {
      setAnalyses(response.analyses);
    } else {
      setError('Your analysis history could not be loaded right now. Your previous analyses may still be available later.');
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const response = await deleteAnalysis(id);
    if (response.success) {
      setAnalyses(analyses.filter(a => a._id !== id));
      setDeleteConfirm(null);
      setSuccessMessage('Analysis removed from history.');
      setTimeout(() => setSuccessMessage(null), 3000);
    } else {
      setError('Unable to delete analysis.');
      setTimeout(() => setError(null), 3000);
    }
  };

  const getRiskColor = (level: string) => {
    if (level === 'Low Indicators') return 'text-green-700 bg-green-50 border-green-200';
    if (level === 'Potentially Risky') return 'text-amber-700 bg-amber-50 border-amber-200';
    if (level === 'High Number of Risk Indicators') return 'text-red-700 bg-red-50 border-red-200';
    return 'text-gray-700 bg-gray-50 border-gray-200';
  };

  const getRiskIcon = (level: string) => {
    if (level === 'Low Indicators') return <ShieldCheck className="w-4 h-4 mr-1.5" />;
    if (level === 'Potentially Risky' || level === 'High Number of Risk Indicators') return <AlertTriangle className="w-4 h-4 mr-1.5" />;
    return <HelpCircle className="w-4 h-4 mr-1.5" />;
  };

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analysis History</h1>
        <p className="text-gray-600">Review your previous financial-content analyses.</p>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center">
          <ShieldCheck className="w-5 h-5 mr-2" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && !loading && (
        <div className="mb-6 p-6 bg-white border border-red-200 rounded-xl text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Unable to Load History</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={fetchHistory}
            className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          <div className="text-center py-12 text-gray-500">Loading your analysis history...</div>
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-10 bg-gray-100 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : !error && analyses.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center flex flex-col items-center shadow-sm">
          <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-6 border border-gray-100">
            <Clock className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No Analysis History Yet</h2>
          <p className="text-gray-600 mb-8 max-w-md">Your completed analyses will appear here after you check a financial message or screenshot.</p>
          <button 
            onClick={() => navigate('/analyze')}
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
          >
            Analyze Content <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {analyses.map((analysis) => (
            <div key={analysis._id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow relative group">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded">
                      {analysis.inputType === 'image' ? <ImageIcon className="w-3.5 h-3.5 mr-1" /> : <FileText className="w-3.5 h-3.5 mr-1" />}
                      {analysis.inputType === 'image' ? 'Screenshot Analysis' : 'Text Analysis'}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {new Date(analysis.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm text-gray-700 italic border-l-4 border-l-gray-300">
                    "{analysis.inputPreview}"
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-bold border ${getRiskColor(analysis.riskLevel)}`}>
                      {getRiskIcon(analysis.riskLevel)} {analysis.riskLevel}
                    </span>
                    
                    {analysis.claims && analysis.claims.length > 0 && (
                      <span className="text-sm text-gray-600 font-medium">
                        {analysis.claims.length} claim{analysis.claims.length !== 1 && 's'} verified
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                  <button 
                    onClick={() => navigate(`/history/${analysis._id}`)}
                    className="inline-flex items-center px-5 py-2.5 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors w-full justify-center"
                  >
                    View Details <ArrowRight className="w-4 h-4 ml-1.5" />
                  </button>
                  
                  {deleteConfirm === analysis._id ? (
                    <div className="text-right">
                      <p className="text-xs text-red-600 font-bold mb-2">Delete this analysis?</p>
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => setDeleteConfirm(null)} className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 font-medium">Cancel</button>
                        <button onClick={() => handleDelete(analysis._id)} className="text-xs px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded font-medium">Delete</button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setDeleteConfirm(analysis._id)}
                      className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors md:opacity-0 group-hover:opacity-100"
                      title="Delete Analysis"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
