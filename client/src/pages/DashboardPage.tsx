import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Search, 
  BookOpen, 
  FileText, 
  Image as ImageIcon,
  Clock,
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  FileSearch,
  ExternalLink,
  X,
  ArrowUpRight,
  PhoneCall,
  Filter
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [recentAnalyses, setRecentAnalyses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdvisory, setShowAdvisory] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const { getHistory } = await import('../services/api');
        const response = await getHistory(50);
        if (response.success && response.analyses) {
          setRecentAnalyses(response.analyses);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRecent();
  }, []);

  const totalAnalyses = recentAnalyses.length;
  const potentiallyRiskyCount = recentAnalyses.filter(a => a.riskLevel === 'Potentially Risky' || a.riskLevel === 'High Number of Risk Indicators').length;
  const totalRiskSignals = recentAnalyses.reduce((acc, a) => acc + (a.riskIndicators?.length || 0), 0);
  const totalVerifiedClaims = recentAnalyses.reduce((acc, a) => acc + (a.claims?.filter((c: any) => c.status === 'Verified').length || 0), 0);

  const riskCategories = new Map<string, number>();
  recentAnalyses.forEach(a => {
    a.riskIndicators?.forEach((indicator: any) => {
      const type = indicator.type || 'Unknown Risk';
      riskCategories.set(type, (riskCategories.get(type) || 0) + 1);
    });
  });
  
  const sortedRiskCategories = Array.from(riskCategories.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out motion-reduce:animate-none max-w-350 mx-auto">
      
      {showAdvisory && (
        <div className="bg-error/5 border border-error/20 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm">
          <div className="bg-error/10 p-2 rounded-xl text-error shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-label-sm text-label-sm font-bold text-error tracking-widest uppercase mb-1 flex items-center">
              ACTIVE REGULATORY ADVISORY <span className="text-border mx-2">—</span> <span className="text-on-surface-variant">SEBI / NSE / BSE Joint Notice</span>
            </div>
            <div className="text-sm text-on-surface font-bold truncate">Surge detected in fraudulent IPO "Institutional Allotment" Telegram groups claiming zero lock-in allocations.</div>
          </div>
          <div className="flex items-center gap-4 sm:ml-auto shrink-0">
            <a href="#" className="font-label-lg text-label-lg text-secondary hover:text-on-surface hover:translate-x-1 transition-all duration-200 flex items-center">
              Read Advisory <ArrowUpRight className="w-4 h-4 ml-1" />
            </a>
            <button onClick={() => setShowAdvisory(false)} className="text-on-surface-variant hover:text-on-surface hover:scale-110 active:scale-95 transition-all duration-200">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
        <div>
          <h2 className="font-display-lg text-display-lg text-secondary tracking-tight mb-3 flex items-center flex-wrap gap-4">
            Good morning, Investor
            <span className="inline-flex items-center px-3 py-1 bg-tertiary-fixed/10 border border-tertiary-fixed-dim/20 text-on-tertiary-container font-label-md text-label-md rounded-lg uppercase tracking-widest shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-on-tertiary-container" /> Protected
            </span>
          </h2>
          <p className="text-font-body-md text-body-md text-lg">Your financial safety overview <span className="mx-2">•</span> Stay informed. Stay cautious.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link 
            to="/history"
            className="flex-1 sm:flex-none inline-flex justify-center items-center px-5 py-3 bg-surface-container-lowest border border-surface-container-highest text-on-surface font-label-lg text-label-lg rounded-xl hover:bg-surface-container hover:-translate-y-px hover:shadow-md active:scale-[0.98] transition-all duration-200 shadow-sm"
          >
            <Clock className="w-4 h-4 mr-2" />
            View History
          </Link>
          <Link 
            to="/analyze"
            className="flex-1 sm:flex-none inline-flex justify-center items-center px-6 py-3 bg-secondary text-white font-label-lg text-label-lg rounded-xl hover:bg-secondary/90 hover:-translate-y-px hover:shadow-lg active:scale-[0.98] transition-all duration-200 shadow-sm"
          >
            <Search className="w-4 h-4 mr-2" />
            Analyze Content
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-highest shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-px transition-all duration-200 group">
          <div className="flex justify-between items-start mb-6">
            <span className="font-label-md text-label-md font-bold text-on-surface-variant uppercase tracking-widest">Total Analyses</span>
            <div className="bg-surface-container p-2.5 rounded-xl border border-surface-container-highest group-hover:scale-110 transition-transform">
              <FileSearch className="w-5 h-5 text-on-surface" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <h3 className="font-display-lg text-display-lg text-on-surface tracking-tighter leading-none">{totalAnalyses}</h3>
            <div className="flex flex-col items-end">
              <span className="font-body-md text-body-md text-on-surface-variant">Analyzed messages &</span>
              <span className="font-label-md text-label-md text-secondary">100% active</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-highest shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-px transition-all duration-200 group">
          <div className="flex justify-between items-start mb-6">
            <span className="font-label-md text-label-md font-bold text-on-surface-variant uppercase tracking-widest">Potentially Risky</span>
            <div className="bg-error/10 p-2.5 rounded-xl border border-error/20 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-5 h-5 text-error" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <h3 className="font-display-lg text-display-lg text-error tracking-tighter leading-none">{potentiallyRiskyCount}</h3>
            <div className="flex flex-col items-end">
              <span className="font-body-md text-body-md text-on-surface-variant">Containing manipulation</span>
              <span className="font-label-sm text-label-sm font-bold text-error bg-error/10 px-2 py-0.5 rounded mt-1 uppercase tracking-wider">Caution Required</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-highest shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-px transition-all duration-200 group">
          <div className="flex justify-between items-start mb-6">
            <span className="font-label-md text-label-md font-bold text-on-surface-variant uppercase tracking-widest">Risk Signals Flagged</span>
            <div className="bg-secondary/10 p-2.5 rounded-xl border border-primary/20 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-5 h-5 text-secondary" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <h3 className="font-display-lg text-display-lg text-on-surface tracking-tighter leading-none">{totalRiskSignals}</h3>
            <div className="flex flex-col items-end">
              <span className="font-body-md text-body-md text-on-surface-variant">Specific tactics parsed</span>
              <span className="font-label-sm text-label-sm font-bold text-on-surface bg-surface-container border border-surface-container-highest px-2 py-0.5 rounded mt-1">{sortedRiskCategories.length} distinct classes</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-highest shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-px transition-all duration-200 group">
          <div className="flex justify-between items-start mb-6">
            <span className="font-label-md text-label-md font-bold text-on-surface-variant uppercase tracking-widest">Verified Authentic</span>
            <div className="bg-tertiary-fixed/10 p-2.5 rounded-xl border border-tertiary-fixed-dim/20 group-hover:scale-110 transition-transform">
              <CheckCircle className="w-5 h-5 text-on-tertiary-container" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <h3 className="font-display-lg text-display-lg text-on-tertiary-container tracking-tighter leading-none">{totalVerifiedClaims}</h3>
            <div className="flex flex-col items-end">
              <span className="font-body-md text-body-md text-on-surface-variant">Legitimate entities</span>
              <span className="font-label-sm text-label-sm font-bold text-on-tertiary-container bg-tertiary-fixed/20 px-2 py-0.5 rounded mt-1 uppercase tracking-wider">Corroborated</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          
          <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-surface-container-highest overflow-hidden p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-surface-container-highest pb-6">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface flex items-center mb-2 tracking-tight">
                  <div className="bg-secondary-fixed p-2 rounded-lg mr-3 shadow-inner border border-primary/20">
                    <ShieldCheck className="w-6 h-6 text-secondary" />
                  </div>
                  Your Safety Overview
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Aggregated risk signals identified across your analyzed submissions <span className="mx-2">•</span> Systematic threat breakdown</p>
              </div>
              <div className="flex items-center gap-4 font-label-md text-label-md text-on-surface-variant">
                <div className="flex items-center"><span className="w-2.5 h-2.5 rounded-sm bg-error mr-2"></span> High Severity</div>
                <div className="flex items-center"><span className="w-2.5 h-2.5 rounded-sm bg-secondary mr-2"></span> Moderate Concern</div>
              </div>
            </div>
            
            <div className="space-y-6">
              {totalAnalyses === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-6 border border-surface-container-highest">
                    <BarChart3 className="w-8 h-8 text-on-surface-variant" />
                  </div>
                  <h4 className="font-headline-lg text-headline-lg text-on-surface mb-3">Your safety journey starts here.</h4>
                  <p className="text-on-surface-variant mb-8 max-w-sm mx-auto text-lg">Analyze your first financial message to build your personalized safety overview.</p>
                  <Link to="/analyze" className="inline-flex items-center px-8 py-4 bg-secondary text-white font-bold rounded-xl hover:bg-secondary/90 hover:-translate-y-px active:scale-95 transition-all duration-200 shadow-md">
                    Analyze Content <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              ) : sortedRiskCategories.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-tertiary-fixed/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-tertiary-fixed-dim/20">
                    <CheckCircle className="w-8 h-8 text-on-tertiary-container" />
                  </div>
                  <h4 className="font-headline-lg text-headline-lg text-on-surface mb-3">All clear!</h4>
                  <p className="text-on-surface-variant text-lg">No risk signals have been detected in your recent history.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {sortedRiskCategories.map(([type, count], index) => {
                    const maxCount = sortedRiskCategories[0][1];
                    const rawDots = Math.ceil((count / maxCount) * 20);
                    const dots = Math.max(1, Math.min(rawDots, 20));
                    const isHighSeverity = type.toLowerCase().includes('guarantee') || type.toLowerCase().includes('regulatory') || type.toLowerCase().includes('upi') || type.toLowerCase().includes('payment');
                    
                    return (
                      <div key={index} className="group">
                        <div className="flex items-center justify-between mb-3 border-b border-surface-container-highest/50 pb-2">
                          <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-lg ${isHighSeverity ? 'bg-error/10 text-error' : 'bg-secondary-fixed text-secondary'}`}>
                              <AlertTriangle className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-extrabold text-on-surface tracking-wide">{type}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`font-label-sm text-label-sm font-bold uppercase tracking-widest ${isHighSeverity ? 'text-error' : 'text-secondary'}`}>
                              {isHighSeverity ? 'High Frequency' : 'Moderate'} <span className="mx-1">•</span> {count} Case{count !== 1 ? 's' : ''}
                            </span>
                            <button className="font-label-md text-label-md text-on-surface-variant hover:text-secondary active:scale-95 transition-all duration-200 flex items-center">
                              Filter <ArrowRight className="w-3 h-3 ml-1" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {Array.from({ length: 20 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-3 h-5 rounded-sm transition-all duration-300 ${
                                i < dots 
                                  ? (isHighSeverity ? 'bg-error' : 'bg-secondary') 
                                  : 'bg-surface-container border border-surface-container-highest opacity-50'
                              } ${i < dots ? 'group-hover:opacity-80' : ''}`}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-end justify-between mb-6">
              <div>
                <h3 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Recent Analyses</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">Real-time breakdown of parsed tips and notifications</p>
              </div>
              <div className="hidden sm:flex bg-surface-container-lowest border border-surface-container-highest p-1 rounded-xl shadow-sm">
                <button className="px-4 py-2 bg-primary text-white font-label-md text-label-md rounded-lg shadow-sm active:scale-95 transition-transform duration-200">All ({recentAnalyses.length})</button>
                <button className="px-4 py-2 text-on-surface-variant hover:text-on-surface font-label-md text-label-md rounded-lg active:scale-95 transition-all duration-200">WhatsApp</button>
                <button className="px-4 py-2 text-on-surface-variant hover:text-on-surface font-label-md text-label-md rounded-lg active:scale-95 transition-all duration-200">Telegram</button>
                <button className="px-4 py-2 text-on-surface-variant hover:text-on-surface font-label-md text-label-md rounded-lg active:scale-95 transition-all duration-200">SMS + Circulars</button>
              </div>
            </div>
            
            <div className="space-y-4">
              {recentAnalyses.length === 0 ? (
                null
              ) : (
                recentAnalyses.slice(0, 3).map((analysis) => {
                  const isRisky = analysis.riskLevel === 'Potentially Risky' || analysis.riskLevel === 'High Number of Risk Indicators';
                  const isSafe = analysis.riskLevel === 'Low Indicators';
                  const dateStr = new Date(analysis.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                  const timeStr = new Date(analysis.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                  return (
                    <div key={analysis._id} className="bg-surface-container-lowest rounded-3xl border border-surface-container-highest p-6 shadow-sm hover:shadow-md hover:-translate-y-px transition-all duration-200 group">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <span className="font-label-sm text-label-sm font-bold text-on-surface bg-surface-container border border-surface-container-highest px-3 py-1.5 rounded-lg uppercase tracking-widest flex items-center">
                            {analysis.inputType === 'image' ? <ImageIcon className="w-3.5 h-3.5 mr-2 text-secondary" /> : <FileText className="w-3.5 h-3.5 mr-2 text-secondary" />}
                            {analysis.inputType === 'image' ? 'Screenshot OCR' : 'Text Message'}
                          </span>
                          <span className="font-body-md text-body-md text-on-surface-variant">{dateStr}, {timeStr}</span>
                        </div>
                        <span className={`font-label-sm text-label-sm font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest flex items-center ${
                          isRisky ? 'bg-error/10 text-error border border-error/20' :
                          isSafe ? 'bg-tertiary-fixed/10 text-on-tertiary-container border border-tertiary-fixed-dim/20' :
                          'bg-surface-container text-on-surface-variant border border-surface-container-highest'
                        }`}>
                          {isRisky && <ShieldAlert className="w-3 h-3 mr-1.5" />}
                          {isSafe && <CheckCircle className="w-3 h-3 mr-1.5" />}
                          {analysis.riskLevel}
                        </span>
                      </div>
                      
                      <div className="bg-surface-container p-5 rounded-2xl border border-surface-container-highest mb-6">
                        <div className="font-label-sm text-label-sm font-bold text-on-surface-variant uppercase tracking-widest mb-3">Extracted Snippet</div>
                        <p className="text-sm text-on-surface italic font-medium leading-relaxed line-clamp-3">
                          "{analysis.inputPreview}"
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mb-6">
                        {analysis.riskIndicators && analysis.riskIndicators.length > 0 && (
                          <span className="font-label-sm text-label-sm font-bold text-amber-800 bg-amber-100/10 border border-amber-200/20 px-3 py-1.5 rounded-lg flex items-center">
                            <AlertTriangle className="w-3 h-3 mr-1.5 text-amber-600" />
                            {analysis.riskIndicators.length} Warning Signal{analysis.riskIndicators.length !== 1 ? 's' : ''}
                          </span>
                        )}
                        {analysis.claims && analysis.claims.slice(0, 3).map((claim: any, idx: number) => (
                          <span key={idx} className="font-label-sm text-label-sm font-bold text-on-surface bg-white border border-surface-container-highest px-3 py-1.5 rounded-lg">
                            {claim.claim}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-surface-container-highest">
                        <span className="font-body-md text-body-md text-on-surface-variant flex items-center">
                          <Search className="w-3.5 h-3.5 mr-2 opacity-50" />
                          Analyzed against official databases
                        </span>
                        <Link 
                          to={`/history/${analysis._id}`} 
                          className="font-label-lg text-label-lg text-secondary hover:text-on-surface transition-colors flex items-center"
                        >
                          View Full Analysis <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}

              {recentAnalyses.length > 3 && (
                <div className="flex justify-center pt-4 border-t border-surface-container-highest mt-8">
                  <Link to="/history" className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2">
                    <Filter className="w-4 h-4" /> Looking for an older record? Search circulars or filter by incident code. <span className="text-secondary ml-2">Open Archive →</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-secondary-fixed rounded-3xl border border-primary/20 overflow-hidden shadow-sm">
            <div className="p-8">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-6 shadow-md">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-4">Have a suspicious message?</h3>
              <p className="text-sm text-font-body-md text-body-md leading-relaxed mb-6">
                Paste the message, forward an SMS, or drop a screenshot. InvestorShield deconstructs risk signals in seconds.
              </p>
              <div className="bg-white p-4 rounded-2xl border border-surface-container-highest mb-6">
                <div className="text-xs text-font-body-md text-body-md mb-8">Paste SMS, WhatsApp text, or regulatory claim here...</div>
                <div className="flex items-center justify-between font-label-md text-label-md text-secondary pt-4 border-t border-surface-container-highest">
                  <span className="flex items-center"><ImageIcon className="w-3.5 h-3.5 mr-1.5" /> Upload screenshot</span>
                  <span className="text-on-surface-variant">OCR enabled</span>
                </div>
              </div>
              <Link to="/analyze" className="w-full inline-flex justify-center items-center px-6 py-4 bg-secondary text-white font-label-lg text-label-lg rounded-xl hover:bg-secondary/90 hover:-translate-y-px active:scale-[0.98] transition-all duration-200 shadow-md">
                Analyze Content Now <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4 mt-8">
              <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center">
                <div className="w-8 h-8 bg-surface-container-lowest rounded-lg flex items-center justify-center mr-3 border border-surface-container-highest">
                  <BookOpen className="w-4 h-4 text-secondary" />
                </div>
                Investor Literacy
              </h3>
              <span className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">Recommended</span>
            </div>
            
            <div className="space-y-3">
              <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container-highest shadow-sm hover:shadow-md hover:-translate-y-px transition-all duration-200 group flex items-start gap-4">
                <div className="bg-surface-container p-3 rounded-xl border border-surface-container-highest shrink-0 group-hover:bg-secondary-fixed transition-colors">
                  <BarChart3 className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-sm mb-1 group-hover:text-secondary transition-colors">Guaranteed Returns: The Trap</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-3">Why no SEBI registered advisor can promise fixed equity yields.</p>
                  <div className="font-label-sm text-label-sm font-bold text-on-surface-variant uppercase tracking-widest">3 min read <span className="mx-1">•</span> Case Studies</div>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container-highest shadow-sm hover:shadow-md hover:-translate-y-px transition-all duration-200 group flex items-start gap-4">
                <div className="bg-surface-container p-3 rounded-xl border border-surface-container-highest shrink-0 group-hover:bg-secondary-fixed transition-colors">
                  <ShieldCheck className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-sm mb-1 group-hover:text-secondary transition-colors">Spotting Fake SEBI Registration</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-3">Recognize prefix manipulations (e.g. INA vs INZ vs Fake Codes).</p>
                  <div className="font-label-sm text-label-sm font-bold text-on-surface-variant uppercase tracking-widest">4 min read <span className="mx-1">•</span> Interactive Guide</div>
                </div>
              </div>
              
              <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container-highest shadow-sm hover:shadow-md hover:-translate-y-px transition-all duration-200 group flex items-start gap-4">
                <div className="bg-surface-container p-3 rounded-xl border border-surface-container-highest shrink-0 group-hover:bg-secondary-fixed transition-colors">
                  <Clock className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-sm mb-1 group-hover:text-secondary transition-colors">Urgency Traps & The 24h Rule</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-3">Psychological manipulation strategies used by boiler room operators.</p>
                  <div className="font-label-sm text-label-sm font-bold text-on-surface-variant uppercase tracking-widest">2 min read <span className="mx-1">•</span> Practical Checklist</div>
                </div>
              </div>

              <Link to="/learn" className="block text-center font-label-md text-label-md text-secondary hover:text-on-surface transition-colors pt-4 pb-2">
                Explore All Topics in Learning Center →
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-label-sm text-label-sm font-bold text-on-surface-variant uppercase tracking-widest mb-4">Direct Authority Verification</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center justify-between p-4 bg-surface-container-lowest border border-surface-container-highest rounded-xl hover:shadow-sm hover:-translate-y-px active:scale-[0.98] transition-all duration-200 group">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-secondary" />
                  <span className="font-label-lg text-label-lg text-on-surface">SEBI Recognized Intermediaries Portal</span>
                </div>
                <ExternalLink className="w-4 h-4 text-on-surface-variant group-hover:text-secondary transition-colors" />
              </a>
              <a href="#" className="flex items-center justify-between p-4 bg-surface-container-lowest border border-surface-container-highest rounded-xl hover:shadow-sm hover:-translate-y-px active:scale-[0.98] transition-all duration-200 group">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-secondary" />
                  <span className="font-label-lg text-label-lg text-on-surface">RBI Sachet Unregistered Deposit Portal</span>
                </div>
                <ExternalLink className="w-4 h-4 text-on-surface-variant group-hover:text-secondary transition-colors" />
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-12 bg-primary rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden shadow-xl border border-primary-container">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full blur-[100px] opacity-20 z-0"></div>
        <div className="flex items-start gap-6 relative z-10 max-w-3xl">
          <div className="bg-white/10 p-4 rounded-2xl shrink-0">
            <ShieldAlert className="w-8 h-8 text-secondary-light" />
          </div>
          <div>
            <div className="font-label-sm text-label-sm font-bold text-white/60 uppercase tracking-widest mb-2">Golden Rule of Retail Financial Safety</div>
            <h3 className="text-xl font-bold text-white leading-snug">No SEBI-registered broker or research analyst will ever ask you to transfer funds into a personal savings account or individual UPI handle.</h3>
          </div>
        </div>
        <div className="relative z-10 shrink-0 w-full sm:w-auto">
          <a href="#" className="flex items-center justify-center sm:justify-start px-6 py-4 bg-white text-error font-extrabold rounded-xl hover:bg-surface-container transition-colors shadow-lg">
            <PhoneCall className="w-5 h-5 mr-3" />
            National Cyber Crime: 1930
          </a>
        </div>
      </div>

    </div>
  );
};

