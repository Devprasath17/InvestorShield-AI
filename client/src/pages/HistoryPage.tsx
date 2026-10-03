import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory, deleteAnalysis } from '../services/api';
import { 
  Trash2, ArrowRight, ShieldCheck, AlertTriangle, 
  HelpCircle, FileText, Image as ImageIcon, History, 
  Search, Filter, Plus, ShieldAlert, MoreVertical, Shield
} from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'text' | 'image'>('All');
  const [riskFilter, setRiskFilter] = useState('All Risk Levels');
  
  // Modal state
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
      setError('Your analysis history could not be loaded right now.');
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    setIsDeleting(true);
    const response = await deleteAnalysis(deleteConfirmId);
    if (response.success) {
      setAnalyses(analyses.filter(a => a._id !== deleteConfirmId));
      setDeleteConfirmId(null);
    } else {
      setDeleteConfirmId(null);
    }
    setIsDeleting(false);
  };

  const stats = useMemo(() => {
    return {
      total: analyses.length,
      text: analyses.filter(a => a.inputType === 'text').length,
      image: analyses.filter(a => a.inputType === 'image').length,
      risky: analyses.filter(a => a.riskLevel === 'Potentially Risky' || a.riskLevel === 'High Number of Risk Indicators').length
    };
  }, [analyses]);

  const filteredAnalyses = useMemo(() => {
    return analyses.filter(a => {
      const matchesSearch = (a.inputPreview || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'All' || a.inputType === typeFilter;
      const matchesRisk = riskFilter === 'All Risk Levels' || a.riskLevel === riskFilter;
      return matchesSearch && matchesType && matchesRisk;
    });
  }, [analyses, searchQuery, typeFilter, riskFilter]);

  const getRiskStyles = (level: string) => {
    switch (level) {
      case 'High Number of Risk Indicators':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Potentially Risky':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low Indicators':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'High Number of Risk Indicators':
        return <ShieldAlert className="w-3.5 h-3.5 mr-1.5" />;
      case 'Potentially Risky':
        return <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />;
      case 'Low Indicators':
        return <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />;
      default:
        return <HelpCircle className="w-3.5 h-3.5 mr-1.5" />;
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full p-4 sm:p-8 font-sans animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out motion-reduce:animate-none">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        <div>
          <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase mb-2 block">
            YOUR ANALYSIS ARCHIVE
          </span>
          <h1 className="text-3xl font-bold text-[#0F2D6B] mb-2 tracking-tight">Analysis History</h1>
          <p className="text-slate-600">Review the financial content you've analyzed with InvestorShield AI.</p>
        </div>
        <button 
          onClick={() => navigate('/analyze')}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#0F2D6B] text-white font-medium rounded-xl hover:bg-[#0A1F4D] hover:-translate-y-[1px] active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow"
        >
          <Plus className="w-4 h-4" /> Analyze Content
        </button>
      </div>

      {/* Summary Strip */}
      {!loading && !error && analyses.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between shadow-sm">
            <div>
              <div className="text-slate-500 text-xs font-semibold mb-1">Total Analyses</div>
              <div className="text-2xl font-bold text-[#0F2D6B]">{stats.total}</div>
            </div>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center border border-blue-100">
              <History className="w-5 h-5" />
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between shadow-sm">
            <div>
              <div className="text-slate-500 text-xs font-semibold mb-1">Text Analyses</div>
              <div className="text-2xl font-bold text-[#0F2D6B]">{stats.text}</div>
            </div>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center border border-blue-100">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between shadow-sm">
            <div>
              <div className="text-slate-500 text-xs font-semibold mb-1">Screenshot Analyses</div>
              <div className="text-2xl font-bold text-[#0F2D6B]">{stats.image}</div>
            </div>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center border border-blue-100">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between shadow-sm">
            <div>
              <div className="text-slate-500 text-xs font-semibold mb-1">Potentially Risky</div>
              <div className="text-2xl font-bold text-red-600">{stats.risky}</div>
            </div>
            <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center border border-red-100">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
        </div>
      )}

      {/* Toolbar */}
      {!loading && !error && analyses.length > 0 && (
        <div className="flex flex-col md:flex-row gap-3 mb-8 bg-white p-3 border border-slate-200 rounded-2xl shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search your analyses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-700"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            <div className="flex bg-slate-50 border border-slate-200 p-1 rounded-xl shrink-0">
              <button onClick={() => setTypeFilter('All')} className={`px-4 py-1.5 rounded-lg text-sm active:scale-95 transition-all duration-200 ${typeFilter === 'All' ? 'bg-white text-slate-800 font-medium shadow-sm border border-slate-200/60' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}>All</button>
              <button onClick={() => setTypeFilter('text')} className={`px-4 py-1.5 rounded-lg text-sm active:scale-95 transition-all duration-200 ${typeFilter === 'text' ? 'bg-white text-slate-800 font-medium shadow-sm border border-slate-200/60' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}>Text</button>
              <button onClick={() => setTypeFilter('image')} className={`px-4 py-1.5 rounded-lg text-sm active:scale-95 transition-all duration-200 ${typeFilter === 'image' ? 'bg-white text-slate-800 font-medium shadow-sm border border-slate-200/60' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}>Screenshot</button>
            </div>
            <select 
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-blue-500 shrink-0 cursor-pointer"
            >
              <option value="All Risk Levels">All Risk Levels</option>
              <option value="Potentially Risky">Potentially Risky</option>
              <option value="High Number of Risk Indicators">High Number of Risk Indicators</option>
              <option value="Low Indicators">Low Indicators</option>
              <option value="Unable to Assess">Unable to Assess</option>
            </select>
            <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-500 shrink-0 flex items-center gap-2 cursor-pointer hover:bg-slate-100">
              Newest First <Filter className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse">
              <div className="flex justify-between mb-4">
                <div className="h-6 w-32 bg-slate-100 rounded-md"></div>
                <div className="h-5 w-24 bg-slate-100 rounded-md"></div>
              </div>
              <div className="h-16 w-full bg-slate-50 rounded-xl mb-4"></div>
              <div className="h-6 w-1/2 bg-slate-100 rounded-md"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="p-10 bg-white border border-red-100 rounded-2xl text-center shadow-sm">
          <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">{error}</h3>
          <button 
            onClick={fetchHistory}
            className="px-6 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors mt-4"
          >
            Try Again
          </button>
        </div>
      ) : analyses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm">
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-[#0F2D6B] mb-2">Your analysis history is empty</h2>
          <p className="text-slate-500 mb-8 max-w-sm mx-auto">Analyze a financial message or screenshot and your saved results will appear here.</p>
          <button 
            onClick={() => navigate('/analyze')}
            className="inline-flex items-center px-6 py-3 bg-[#0F2D6B] text-white font-medium rounded-xl hover:bg-[#0A1F4D] hover:-translate-y-[1px] active:scale-[0.98] transition-all duration-200 shadow-sm"
          >
            Analyze Content <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredAnalyses.map((analysis) => (
            <div key={analysis._id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 group flex flex-col gap-4">
              
              {/* Top row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${analysis.inputType === 'image' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                    {analysis.inputType === 'image' ? <ImageIcon className="w-3.5 h-3.5 mr-1.5" /> : <FileText className="w-3.5 h-3.5 mr-1.5" />}
                    {analysis.inputType === 'image' ? 'Screenshot OCR' : 'Text Message'}
                  </span>
                  <span className="text-xs text-slate-400 font-medium flex items-center">
                    <span className="w-1 h-1 rounded-full bg-slate-300 mr-2"></span>
                    {new Date(analysis.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setDeleteConfirmId(analysis._id)}
                    className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-slate-50 active:scale-95 transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 active:scale-95 transition-all duration-200">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-700 leading-relaxed line-clamp-2 font-medium">
                "{analysis.inputPreview}"
              </div>

              {/* Middle row */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold border ${getRiskStyles(analysis.riskLevel)}`}>
                  {getRiskIcon(analysis.riskLevel)} {analysis.riskLevel}
                </span>
                
                <span className="text-slate-800 font-semibold text-xs">
                  {analysis.riskIndicators?.length || 0} Warning Signals
                </span>
                
                {analysis.riskIndicators && analysis.riskIndicators.length > 0 && (
                  <span className="text-slate-500 text-xs truncate max-w-[300px] hidden sm:block">
                    <span className="font-semibold text-slate-700">Indicators:</span> {analysis.riskIndicators.map((r:any) => r.type).join(' · ')}
                  </span>
                )}
              </div>

              {/* Bottom row */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-2">
                <div className="text-xs font-medium text-slate-500 flex items-center">
                  <ShieldCheck className="w-4 h-4 text-blue-500 mr-1.5" />
                  Analyzed against SEBI Intermediaries Registry & SCORES database
                </div>
                <button 
                  onClick={() => navigate(`/history/${analysis._id}`)}
                  className="text-blue-600 font-semibold text-sm flex items-center hover:text-blue-700 active:scale-95 transition-all duration-200"
                >
                  View Analysis <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

            </div>
          ))}
          
          {/* Pagination */}
          {filteredAnalyses.length > 0 && (
            <div className="flex items-center justify-between mt-6 text-sm">
              <span className="text-slate-500">Showing <strong className="text-slate-700">1-{filteredAnalyses.length}</strong> of <strong className="text-slate-700">{stats.total}</strong> analyses</span>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 text-slate-400 font-medium rounded hover:bg-slate-50" disabled>Previous</button>
                <button className="w-8 h-8 flex items-center justify-center bg-[#0F2D6B] text-white font-medium rounded-lg">1</button>
                <button className="w-8 h-8 flex items-center justify-center text-slate-600 font-medium rounded-lg hover:bg-slate-50">2</button>
                <button className="w-8 h-8 flex items-center justify-center text-slate-600 font-medium rounded-lg hover:bg-slate-50">3</button>
                <button className="px-3 py-1.5 text-slate-800 font-medium rounded hover:bg-slate-50">Next</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200 motion-reduce:animate-none">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200 ease-out motion-reduce:animate-none">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Delete this analysis?</h3>
            <p className="text-sm text-slate-500 mb-8">This saved analysis will be permanently removed from your history and offline backup cache.</p>
            <div className="flex items-center justify-end gap-3">
              <button 
                onClick={() => setDeleteConfirmId(null)}
                disabled={isDeleting}
                className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl active:scale-95 transition-all duration-200"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2.5 text-sm font-semibold bg-red-600 text-white hover:bg-red-700 rounded-xl active:scale-95 transition-all duration-200 shadow-sm hover:shadow disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete Analysis'}
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};
