import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Search, 
  BookOpen, 
  FileText, 
  Image as ImageIcon,
  Clock,
  ArrowRight,
  Zap,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  GraduationCap
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [recentAnalyses, setRecentAnalyses] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecent = async () => {
      const { getHistory } = await import('../services/api');
      const response = await getHistory(3);
      if (response.success && response.analyses) {
        setRecentAnalyses(response.analyses);
      }
    };
    fetchRecent();
  }, []);

  return (
    <div className="space-y-8 pb-12">
      
      {/* 7. MAIN WELCOME HERO */}
      <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-8 lg:p-10 relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 z-10">
          <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200">
            <Zap className="w-3.5 h-3.5 mr-1.5" /> AI-Powered Investor Safety
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Welcome to <span className="text-blue-600">InvestorShield AI</span>
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-xl text-lg leading-relaxed">
            Analyze suspicious financial messages and screenshots, verify important claims, understand warning signs, and build safer investor habits.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate('/analyze')}
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
            >
              Analyze Content <ArrowRight className="ml-2 w-4 h-4" />
            </button>
            <button 
              onClick={() => navigate('/learn')}
              className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-colors"
            >
              Learn Investor Safety
            </button>
          </div>
        </div>
        
        {/* 8. HERO VISUAL */}
        <div className="hidden md:block w-72 lg:w-80 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="bg-gray-50 border-b border-gray-100 p-3 flex items-center">
              <ShieldCheck className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-xs font-bold text-gray-700">Analysis Snapshot</span>
            </div>
            <div className="p-4 space-y-3">
              <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                <p className="text-[11px] font-bold text-red-800 flex items-center mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 mr-1" /> Potential Risk Detected
                </p>
                <p className="text-[10px] text-gray-600 italic border-l-2 border-red-300 pl-2 ml-1">"Get ₹50,000 guaranteed in 15 days!"</p>
                <div className="mt-2 flex flex-wrap gap-1">
                   <span className="text-[9px] bg-white border border-red-200 text-red-700 px-1.5 py-0.5 rounded">Guaranteed Returns</span>
                   <span className="text-[9px] bg-white border border-red-200 text-red-700 px-1.5 py-0.5 rounded">Urgency</span>
                </div>
              </div>
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 flex justify-between items-center">
                <span className="text-[11px] font-bold text-gray-800">Claim Status</span>
                <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded">Needs Verification</span>
              </div>
              <div className="bg-green-50 p-3 rounded-xl border border-green-100">
                <p className="text-[11px] font-bold text-green-800 flex items-center mb-1">
                  <CheckCircle className="w-3.5 h-3.5 mr-1" /> Safe Next Step
                </p>
                <p className="text-[10px] text-green-900">Verify the source before taking action.</p>
              </div>
            </div>
          </div>
          
          {/* Decorative background blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"></div>
          <div className="absolute top-1/4 right-0 w-48 h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"></div>
        </div>
      </div>

      {/* 10. TRUST / CAPABILITY STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2 border-y border-gray-100 bg-white/50 rounded-xl px-4">
        <div className="flex flex-col items-center text-center p-3">
          <Search className="w-5 h-5 text-blue-600 mb-2" />
          <h4 className="text-sm font-bold text-gray-900">Fast Analysis</h4>
          <p className="text-xs text-gray-500 mt-1">Analyze messages and screenshots quickly.</p>
        </div>
        <div className="flex flex-col items-center text-center p-3 border-l border-gray-100">
          <ShieldCheck className="w-5 h-5 text-blue-600 mb-2" />
          <h4 className="text-sm font-bold text-gray-900">Trusted Sources</h4>
          <p className="text-xs text-gray-500 mt-1">Check important claims against relevant trusted sources.</p>
        </div>
        <div className="flex flex-col items-center text-center p-3 md:border-l border-gray-100">
          <Lightbulb className="w-5 h-5 text-blue-600 mb-2" />
          <h4 className="text-sm font-bold text-gray-900">Clear Explanations</h4>
          <p className="text-xs text-gray-500 mt-1">Understand warning signs in simple language.</p>
        </div>
        <div className="flex flex-col items-center text-center p-3 border-l border-gray-100">
          <GraduationCap className="w-5 h-5 text-blue-600 mb-2" />
          <h4 className="text-sm font-bold text-gray-900">Investor Education</h4>
          <p className="text-xs text-gray-500 mt-1">Learn how to recognize similar risks in the future.</p>
        </div>
      </div>

      {/* 9. QUICK ACTIONS */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">What would you like to do?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow hover:border-blue-300 flex flex-col group cursor-pointer" onClick={() => navigate('/analyze')}>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2 text-lg">Analyze a Message</h4>
            <p className="text-sm text-gray-600 flex-1 mb-6">Paste suspicious financial content and analyze warning indicators.</p>
            <span className="text-sm font-semibold text-blue-600 flex items-center group-hover:text-blue-700">
              Analyze Message <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow hover:border-blue-300 flex flex-col group cursor-pointer" onClick={() => navigate('/analyze')}>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2 text-lg">Analyze a Screenshot</h4>
            <p className="text-sm text-gray-600 flex-1 mb-6">Upload a screenshot of a financial message or offer.</p>
            <span className="text-sm font-semibold text-blue-600 flex items-center group-hover:text-blue-700">
              Upload Screenshot <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow hover:border-blue-300 flex flex-col group cursor-pointer" onClick={() => navigate('/learn')}>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2 text-lg">Learn Investor Safety</h4>
            <p className="text-sm text-gray-600 flex-1 mb-6">Explore practical lessons based on common financial warning signs.</p>
            <span className="text-sm font-semibold text-blue-600 flex items-center group-hover:text-blue-700">
              Start Learning <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* 11. RECENT ANALYSIS SECTION */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Recent Analysis</h3>
                <p className="text-sm text-gray-500 mt-0.5">Continue where you left off or review previous analysis.</p>
              </div>
              <Link to="/history" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {recentAnalyses.length === 0 ? (
                /* 12. EMPTY STATE FOR RECENT ANALYSIS */
                <div className="p-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-4 border border-gray-200">
                    <Clock className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">No analyses yet</h4>
                  <p className="text-gray-500 mb-6 max-w-sm">Analyze your first financial message or screenshot to see your results here.</p>
                  <button 
                    onClick={() => navigate('/analyze')}
                    className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Analyze Content →
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {recentAnalyses.map((analysis) => (
                    <div key={analysis._id} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded uppercase tracking-wider">
                            {analysis.inputType === 'image' ? 'Screenshot' : 'Text'}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            analysis.riskLevel === 'Low Indicators' ? 'bg-green-100 text-green-800' :
                            analysis.riskLevel === 'Potentially Risky' ? 'bg-amber-100 text-amber-800' :
                            analysis.riskLevel === 'High Number of Risk Indicators' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {analysis.riskLevel}
                          </span>
                        </div>
                        <p className="text-sm text-gray-900 truncate font-medium">{analysis.inputPreview}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(analysis.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <Link to={`/history/${analysis._id}`} className="flex-shrink-0 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                        View Details <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* 16. OPTIONAL "HOW IT WORKS" MINI SECTION */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">How InvestorShield AI Works</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 relative">
                <div className="hidden sm:block absolute top-1/2 left-8 right-8 h-0.5 bg-gray-100 -z-0 -translate-y-1/2"></div>
                
                {[
                  { label: 'Submit Content', icon: Search },
                  { label: 'AI Analysis', icon: Zap },
                  { label: 'Verify Claims', icon: ShieldCheck },
                  { label: 'Education', icon: BookOpen },
                  { label: 'Safe Actions', icon: CheckCircle },
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center bg-white z-10 px-2 text-center w-full sm:w-auto">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border-2 border-white shadow-sm mb-2">
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-gray-700">{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-6">
          
          {/* 13. RIGHT-SIDE SAFETY SUMMARY */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-gray-900">Your Safety Summary</h3>
              <p className="text-xs text-gray-500">Based on your recent activity</p>
            </div>
            <div className="p-5">
              {recentAnalyses.length === 0 ? (
                <div className="text-center py-6 text-gray-500 text-sm">
                  Not available yet
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                    <span className="text-sm text-gray-600">Total Recent Analyses</span>
                    <span className="text-lg font-bold text-gray-900">{recentAnalyses.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                    <span className="text-sm text-gray-600">Risk Indicators Found</span>
                    <span className="text-lg font-bold text-red-600">
                      {recentAnalyses.reduce((acc, a) => acc + (a.riskIndicators?.length || 0), 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                    <span className="text-sm text-gray-600">Claims Analyzed</span>
                    <span className="text-lg font-bold text-blue-600">
                      {recentAnalyses.reduce((acc, a) => acc + (a.claims?.length || 0), 0)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 15. QUICK LINKS PANEL */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-2">
              <Link to="/analyze" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                <div className="flex items-center">
                  <Search className="w-4 h-4 text-gray-400 group-hover:text-blue-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Analyze New Content</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600" />
              </Link>
              <Link to="/learn" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 text-gray-400 group-hover:text-blue-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">View Learning Center</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600" />
              </Link>
              <Link to="/history" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-400 group-hover:text-blue-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Check Analysis History</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600" />
              </Link>
            </div>
          </div>

          {/* 14. IMPORTANT SAFETY PRINCIPLE CARD */}
          <div className="bg-blue-50 rounded-2xl border border-blue-100 p-5">
            <div className="flex items-center mb-3">
              <Lightbulb className="w-5 h-5 text-blue-700 mr-2" />
              <h4 className="font-bold text-blue-900 text-sm">Remember</h4>
            </div>
            <h5 className="font-bold text-gray-900 text-sm mb-2">No Evidence Found ≠ False</h5>
            <p className="text-xs text-gray-700 leading-relaxed">
              If relevant evidence cannot be found in the trusted sources searched, InvestorShield AI clearly communicates that limitation instead of making assumptions.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
