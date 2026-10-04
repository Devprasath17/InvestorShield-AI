import { useState, useEffect } from 'react';
import { getEducationTopics } from '../services/api';
import type { EducationItem } from '../types/analysis.types';
import { 
  ShieldCheck, AlertTriangle, CheckCircle, Search, 
  ArrowRight, Shield, ClipboardCheck, Eye, Link2, 
  Lock, Building2, Wallet, Users, CreditCard, Clock, 
  HelpCircle, BadgeCheck, FileCheck, ArrowUpRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n';

export const LearnPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [topics, setTopics] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      try {
        const response = await getEducationTopics(language);
        if (response.success && response.topics) {
          setTopics(response.topics);
        } else {
          setError(response.error || 'Failed to load topics.');
        }
      } catch (err) {
        setError('An error occurred while connecting to the server.');
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, [language]);

  // Helper to assign visual properties based on index to API topics
  const getTopicVisuals = (index: number) => {
    const visuals = [
      { icon: <CheckCircle className="w-5 h-5 text-blue-600" />, type: 'High-Risk Signal', color: 'red' },
      { icon: <ArrowUpRight className="w-5 h-5 text-blue-600" />, type: 'High-Risk Signal', color: 'red' },
      { icon: <Clock className="w-5 h-5 text-blue-600" />, type: 'High-Risk Signal', color: 'red' },
      { icon: <Building2 className="w-5 h-5 text-blue-600" />, type: 'Regulatory Verification', color: 'blue' },
      { icon: <BadgeCheck className="w-5 h-5 text-blue-600" />, type: 'Regulatory Verification', color: 'blue' },
      { icon: <Link2 className="w-5 h-5 text-blue-600" />, type: 'Digital Identity', color: 'red' },
      { icon: <Lock className="w-5 h-5 text-blue-600" />, type: 'Digital Identity', color: 'red' },
      { icon: <Building2 className="w-5 h-5 text-blue-600" />, type: 'Regulatory Verification', color: 'blue' },
      { icon: <Wallet className="w-5 h-5 text-blue-600" />, type: 'Payment Steps', color: 'blue' },
      { icon: <Users className="w-5 h-5 text-blue-600" />, type: 'High-Risk Signal', color: 'red' },
      { icon: <CreditCard className="w-5 h-5 text-blue-600" />, type: 'Payment Steps', color: 'red' },
    ];
    return visuals[index % visuals.length];
  };

  const categories = [
    "High-Risk Signals",
    "Investment Scams",
    "Phishing & Social Engineering",
    "Fake SEBI / Regulatory Claims",
    "Guaranteed Returns",
    "Suspicious Links",
    "Fake Trading Apps",
    "Payment & UPI Safety",
    "Account & OTP Safety",
    "Safe Investing Habits"
  ];

  const filteredTopics = topics.filter(topic => {
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch = !searchLower || (
      (topic.topic && topic.topic.toLowerCase().includes(searchLower)) ||
      (topic.title && topic.title.toLowerCase().includes(searchLower)) ||
      (topic.explanation && topic.explanation.toLowerCase().includes(searchLower)) ||
      (topic.whyItMatters && topic.whyItMatters.toLowerCase().includes(searchLower)) ||
      (topic.whatToLookFor && topic.whatToLookFor.toLowerCase().includes(searchLower)) ||
      (topic.whatToCheck && topic.whatToCheck.toLowerCase().includes(searchLower)) ||
      (topic.safeHabit && topic.safeHabit.toLowerCase().includes(searchLower))
    );

    const matchesCategory = !activeCategory || (
      topic.topic === activeCategory || 
      (activeCategory === 'High-Risk Signals' && topic.topic?.toLowerCase().includes('risk')) ||
      (activeCategory === 'Investment Scams' && (topic.topic?.toLowerCase().includes('scam') || topic.topic?.toLowerCase().includes('invest'))) ||
      (activeCategory === 'Phishing & Social Engineering' && (topic.topic?.toLowerCase().includes('phishing') || topic.topic?.toLowerCase().includes('social'))) ||
      (activeCategory === 'Fake SEBI / Regulatory Claims' && (topic.topic?.toLowerCase().includes('sebi') || topic.topic?.toLowerCase().includes('regulat'))) ||
      (activeCategory === 'Guaranteed Returns' && topic.topic?.toLowerCase().includes('guarantee')) ||
      (activeCategory === 'Suspicious Links' && topic.topic?.toLowerCase().includes('link')) ||
      (activeCategory === 'Fake Trading Apps' && (topic.topic?.toLowerCase().includes('app') || topic.topic?.toLowerCase().includes('trad'))) ||
      (activeCategory === 'Payment & UPI Safety' && (topic.topic?.toLowerCase().includes('payment') || topic.topic?.toLowerCase().includes('upi'))) ||
      (activeCategory === 'Account & OTP Safety' && (topic.topic?.toLowerCase().includes('account') || topic.topic?.toLowerCase().includes('otp'))) ||
      (activeCategory === 'Safe Investing Habits' && topic.topic?.toLowerCase().includes('habit')) ||
      // Fallback matching
      (topic.topic && activeCategory.toLowerCase().includes(topic.topic.toLowerCase())) ||
      (topic.topic && topic.topic.toLowerCase().includes(activeCategory.toLowerCase()))
    );

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-[1440px] mx-auto p-4 md:p-8 font-sans text-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out motion-reduce:animate-none">
      
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center justify-between mb-12">
        <div className="lg:w-1/2">
          <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase mb-3 block flex items-center">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
            INVESTOR SAFETY EDUCATION - VERNACULAR & PLAIN LANGUAGE
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F2D6B] tracking-tight leading-tight mb-4">
            {t('learn.title')}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            {t('learn.subtitle')}
          </p>
          <div className="flex items-center gap-6 text-sm font-semibold text-[#0F2D6B]">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-blue-600"/> SEBI / RBI Due Diligence</span>
            <span className="flex items-center gap-1.5"><FileCheck className="w-4 h-4 text-blue-600"/> Plain English / தமிழ் Content</span>
            <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-blue-600"/> Zero-Pressure Environment</span>
          </div>
        </div>

        <div className="lg:w-1/2 bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm w-full">
          <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
            <span className="font-bold text-xs tracking-widest text-[#0F2D6B] uppercase flex items-center">
              <Shield className="w-4 h-4 mr-2 text-blue-600" /> INVESTOR SAFETY FRAMEWORK
            </span>
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Our Objective</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">01</div>
              <div>
                <h4 className="text-xs font-bold text-[#0F2D6B] uppercase tracking-wider">RECEIVED SIGNAL</h4>
                <p className="text-xs text-slate-500">Unverified WhatsApp / Telegram / SMS pitch</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm relative">
              <div className="absolute -top-3 left-4 w-[2px] h-3 bg-slate-200"></div>
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs shrink-0">02</div>
              <div>
                <h4 className="text-xs font-bold text-red-600 uppercase tracking-wider">IDENTIFY FLAWS</h4>
                <p className="text-xs text-slate-500">Guaranteed ROI + Scarcity + Authority spoofing</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm relative">
              <div className="absolute -top-3 left-4 w-[2px] h-3 bg-slate-200"></div>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">03</div>
              <div>
                <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider">VERIFY STATUTORY DATA</h4>
                <p className="text-xs text-slate-500">SEBI Registry + SCORES 2.0 + MCA portal</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm relative">
              <div className="absolute -top-3 left-4 w-[2px] h-3 bg-slate-200"></div>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs shrink-0">04</div>
              <div>
                <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider">PLAIN RECONSTRUCTION</h4>
                <p className="text-xs text-slate-500">Bilingual context + Manipulative bias breakdown</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[#0F2D6B] p-2.5 rounded-xl border border-[#0F2D6B] shadow-sm relative">
              <div className="absolute -top-3 left-4 w-[2px] h-3 bg-slate-200"></div>
              <div className="w-8 h-8 rounded-lg bg-white/20 text-white flex items-center justify-center font-bold text-xs shrink-0">05</div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">PROTECTED OUTCOME</h4>
                <p className="text-xs text-blue-200">Preserve evidence + 24h cooling + 1930 Helpline</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="mb-12">
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="What do you want to learn? (e.g., Guaranteed returns, Suspicious links, Regulatory claims, OTP safety...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm font-semibold"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 shadow-sm ${
              activeCategory === null 
                ? "font-semibold bg-[#0F2D6B] text-white active:scale-95" 
                : "font-medium bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 active:scale-95"
            }`}
          >
            {t('learn.filters.all')}
          </button>

          
          {categories.map((category) => (
            <button 
              key={category}
              onClick={() => setActiveCategory(activeCategory === category ? null : category)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 shadow-sm ${
                activeCategory === category
                  ? "font-semibold bg-[#0F2D6B] text-white active:scale-95" 
                  : "font-medium bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 active:scale-95"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Checklist */}
      <div className="bg-[#f0f4ff] border border-blue-100 rounded-2xl p-6 mb-16 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[#0F2D6B] flex items-center text-lg">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
            Before Acting, Ask: Quick Safety Checklist
          </h3>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-100 px-2.5 py-1 rounded-md">Interactive Diagnostics</span>
        </div>
        <p className="text-sm text-slate-600 mb-6">5 critical reality-checks before you authorize any transfer, click an APK link, or reply to a private group tip.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl p-4 border border-blue-100/50 shadow-sm flex flex-col">
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded inline-block w-fit mb-2 uppercase">Q1 • Pressure</span>
            <p className="text-sm font-bold text-slate-800 mb-1">Is there pressure to act immediately?</p>
            <p className="text-xs text-slate-500 mb-4 flex-1">e.g., "Offer closes in 15 mins!"</p>
            <div className="flex gap-2">
              <button className="flex-1 text-xs py-1.5 rounded bg-slate-50 border border-slate-200 text-slate-600 font-medium hover:bg-slate-100 active:scale-95 transition-all duration-200">Yes (High Risk)</button>
              <button className="flex-1 text-xs py-1.5 rounded bg-slate-50 border border-slate-200 text-slate-600 font-medium hover:bg-slate-100 active:scale-95 transition-all duration-200">No</button>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-blue-100/50 shadow-sm flex flex-col">
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded inline-block w-fit mb-2 uppercase">Q2 • Returns</span>
            <p className="text-sm font-bold text-slate-800 mb-1">Are returns being explicitly guaranteed?</p>
            <p className="text-xs text-slate-500 mb-4 flex-1">e.g., "Zero risk daily 5% assured"</p>
            <div className="flex gap-2">
              <button className="flex-1 text-xs py-1.5 rounded bg-slate-50 border border-slate-200 text-slate-600 font-medium hover:bg-slate-100 active:scale-95 transition-all duration-200">Yes (Red Flag)</button>
              <button className="flex-1 text-xs py-1.5 rounded bg-slate-50 border border-slate-200 text-slate-600 font-medium hover:bg-slate-100 active:scale-95 transition-all duration-200">No</button>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-blue-100/50 shadow-sm flex flex-col">
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded inline-block w-fit mb-2 uppercase">Q3 • Registry</span>
            <p className="text-sm font-bold text-slate-800 mb-1">Can you verify entity on sebi.gov.in?</p>
            <p className="text-xs text-slate-500 mb-4 flex-1">Check official SEBI INA/INA code.</p>
            <div className="flex gap-2">
              <button className="flex-1 text-xs py-1.5 rounded bg-slate-50 border border-slate-200 text-slate-600 font-medium hover:bg-slate-100 active:scale-95 transition-all duration-200">Yes (Verified)</button>
              <button className="flex-1 text-xs py-1.5 rounded bg-slate-50 border border-slate-200 text-slate-600 font-medium hover:bg-slate-100 active:scale-95 transition-all duration-200">No / Unverifiable</button>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-blue-100/50 shadow-sm flex flex-col">
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded inline-block w-fit mb-2 uppercase">Q4 • Links</span>
            <p className="text-sm font-bold text-slate-800 mb-1">Is the link, APK, or payment unexpected?</p>
            <p className="text-xs text-slate-500 mb-4 flex-1">Individual UPI handles or bit.ly URLs.</p>
            <div className="flex gap-2">
              <button className="flex-1 text-xs py-1.5 rounded bg-slate-50 border border-slate-200 text-slate-600 font-medium hover:bg-slate-100 active:scale-95 transition-all duration-200">Yes (Suspect)</button>
              <button className="flex-1 text-xs py-1.5 rounded bg-slate-50 border border-slate-200 text-slate-600 font-medium hover:bg-slate-100 active:scale-95 transition-all duration-200">No</button>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-blue-100/50 shadow-sm flex flex-col">
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded inline-block w-fit mb-2 uppercase">Q5 • Secrets</span>
            <p className="text-sm font-bold text-slate-800 mb-1">Asked for OTP, PIN, or demat credentials?</p>
            <p className="text-xs text-slate-500 mb-4 flex-1">"Required to unlock your profits"</p>
            <div className="flex gap-2">
              <button className="flex-1 text-xs py-1.5 rounded bg-slate-50 border border-slate-200 text-slate-600 font-medium hover:bg-slate-100 active:scale-95 transition-all duration-200">Yes (Danger)</button>
              <button className="flex-1 text-xs py-1.5 rounded bg-slate-50 border border-slate-200 text-slate-600 font-medium hover:bg-slate-100 active:scale-95 transition-all duration-200">No</button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Lesson Panel */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 mb-16 shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="bg-[#0F2D6B] text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded">ESSENTIAL PRIMER #01</span>
            <h2 className="text-xl font-bold text-slate-800">Guaranteed Returns — The Universal Red Flag</h2>
          </div>
          <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded uppercase tracking-widest hidden sm:block">High Severity Threat • 5 min read</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-5/12 bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">COMPARATIVE RISK ANALYTICS</h3>
            <h4 className="text-lg font-bold text-[#0F2D6B] mb-6">Fraudulent Promise vs. Statutory Capital Reality</h4>
            
            <div className="space-y-4">
              <div className="bg-white p-3 rounded-xl border border-red-100 shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-red-700 flex items-center"><AlertTriangle className="w-3 h-3 mr-1" /> SCAM PITCH</span>
                  <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">+300% IN 15 DAYS</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">Mathematical impossibility in legitimate secondary markets. Promoted widely via fraud-syndicates or phantom software simulators.</p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-blue-700 flex items-center"><CheckCircle className="w-3 h-3 mr-1" /> Regulated Benchmark</span>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">12% - 18% CAGR</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">Nifty 50 long-term historical average with compounding, market volatility, and regulated fund disclosure.</p>
              </div>
            </div>
            
            <div className="mt-8 border-t border-slate-200 pt-6">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span>Risk / Reward Asymmetry</span>
                <span>Theoretical Capital Loss</span>
              </div>
              <div className="flex h-3 rounded-full overflow-hidden bg-slate-200">
                <div className="w-1/4 bg-blue-300"></div>
                <div className="w-1/4 bg-blue-500"></div>
                <div className="w-1/4 bg-[#0F2D6B]"></div>
                <div className="w-1/4 bg-red-500 relative"><span className="absolute inset-0 flex items-center justify-center text-[8px] text-white font-bold">100% Capital Theft</span></div>
              </div>
            </div>
          </div>

          <div className="lg:w-7/12 space-y-6">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3 mt-0.5 border border-blue-100 shrink-0">
                <ClipboardCheck className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-1">Why This Matters</h4>
                <p className="text-sm text-slate-600 leading-relaxed">Under the SEBI (Prohibition of Fraudulent and Unfair Trade Practices) Regulations, no registered broker, research analyst, or investment advisor is legally permitted to assure fixed returns on equity products. Any entity promising "fixed profit" is by definition unregistered or in statutory breach.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center mr-3 mt-0.5 border border-red-100 shrink-0">
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-2">What to Look For (Common Phrases)</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded-md border border-red-100">"Guaranteed daily 10% returns"</span>
                  <span className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded-md border border-red-100">"Zero-risk proprietary algorithm"</span>
                  <span className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded-md border border-red-100">"VIP institutional allotment slot"</span>
                  <span className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded-md border border-red-100">"SEBI approved guaranteed returns"</span>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center mr-3 mt-0.5 border border-slate-200 shrink-0">
                <Search className="w-4 h-4 text-slate-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-1">What to Check</h4>
                <p className="text-sm text-slate-600 leading-relaxed">Go directly to <a href="#" className="text-blue-600 font-bold hover:underline">sebi.gov.in</a> → "Recognised Intermediaries". Cross-reference the registered phone number, corporate email domain, and bank account name before submitting any funds.</p>
              </div>
            </div>

            <div className="flex items-start bg-[#f0f4ff] p-4 rounded-xl border border-blue-100">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center mr-3 mt-0.5 border border-blue-200 shrink-0 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-[#0F2D6B] mb-1">Safe Habit: The 24-Hour Cooling Period</h4>
                <p className="text-sm text-slate-700 leading-relaxed">Whenever an unprompted message promises high returns, initiate a non-negotiable 24-hour pause. High-pressure fraudsters rely on adrenaline. Once time elapses, their fabricated urgency falls apart.</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] text-slate-400 font-medium">Source Ref: SEBI CIR/MIRSD/2023/150</span>
              <button className="text-sm font-bold text-blue-600 hover:text-[#0F2D6B] active:scale-95 transition-all duration-200 flex items-center group">
                Read Full Educational Dossier <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center mb-1">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-1.5"></span> CURATED CURRICULUM
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F2D6B] tracking-tight">Start With the Essentials</h2>
          </div>
          <span className="text-xs font-semibold text-slate-500 hidden sm:block">11 Standard Modules • Self-Paced</span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium">Loading curriculum...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-2xl text-center max-w-2xl mx-auto shadow-sm">
            <AlertTriangle className="w-8 h-8 mx-auto mb-3" />
            <h3 className="font-bold mb-1">Unable to Load Topics</h3>
            <p className="text-sm">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic, index) => {
                const visual = getTopicVisuals(index);
                const moduleStr = `MODULE ${(index + 1).toString().padStart(2, '0')}`;
                
                return (
                  <div 
                    key={topic.id || index} 
                    onClick={() => navigate(`/learn/${topic.id}`)}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 group flex flex-col h-full cursor-pointer hover:border-blue-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ${visual.color === 'red' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                        {topic.topic || moduleStr}
                      </span>
                      <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        {visual.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2 leading-snug">{topic.title}</h3>
                    <p className="text-sm text-slate-500 mb-6 flex-1 leading-relaxed line-clamp-3">{topic.whyItMatters}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                      <span className="text-[10px] font-semibold text-slate-400">{visual.type}</span>
                      <span className="text-sm font-bold text-blue-600 group-hover:text-[#0F2D6B] transition-colors flex items-center">
                        {t('learn.btn.learnMore')} <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No learning resources found</h3>
                <p className="text-slate-500 max-w-md">
                  Try another keyword such as "phishing", "investment scam", or "guaranteed returns".
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory(null);
                  }}
                  className="mt-6 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors text-sm"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 5-Step Protocol */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 mb-16">
        <h3 className="font-bold text-[#0F2D6B] text-xl mb-2 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-blue-600" />
          Before You Trust a Financial Message: 5-Step Protocol
        </h3>
        <p className="text-slate-600 text-sm mb-8">A standardized protective reflex designed to intercept social engineering before financial harm occurs.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-[1px] bg-slate-200"></div>
          
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xl font-black text-blue-600">01</span>
              <ShieldCheck className="w-4 h-4 text-slate-400" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-2">Pause</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Stop immediately. Reject any artificial countdown, urgency trigger, or fear of missing out (FOMO).</p>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xl font-black text-blue-600">02</span>
              <Eye className="w-4 h-4 text-slate-400" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-2">Check the Claim</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Evaluate promises against statutory realities. If they promise zero risk with high yield, it is counterfeit.</p>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xl font-black text-blue-600">03</span>
              <ClipboardCheck className="w-4 h-4 text-slate-400" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-2">Verify Source</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Cross-reference the registration code, website domain, and bank account name on sebi.gov.in.</p>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xl font-black text-blue-600">04</span>
              <Lock className="w-4 h-4 text-slate-400" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-2">Protect Credentials</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Never share OTPs, demat passwords, or approve unsolicited UPI mandate push prompts on your phone.</p>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xl font-black text-blue-600">05</span>
              <CheckCircle className="w-4 h-4 text-slate-400" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-2">Decide Carefully</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Enforce a 24-hour waiting rule. Consult trusted relatives or call the National Cyber Crime Helpline (1930).</p>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-[#0F2D6B] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between shadow-lg relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
           <Shield className="w-64 h-64 text-white" />
        </div>
        <div className="relative z-10 md:w-2/3 mb-8 md:mb-0">
          <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest bg-blue-900/50 px-2 py-1 rounded flex items-center w-fit mb-4">
            <Shield className="w-3 h-3 mr-1.5" /> AI-Automated Data Verification Engine
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Want to analyze something you received?</h2>
          <p className="text-blue-100 text-lg md:text-xl max-w-xl">
            Put InvestorShield AI to work on a suspicious WhatsApp tip, Telegram group link, APK file, or SMS screenshot. We deconstruct fraud markers in seconds.
          </p>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <button 
            onClick={() => navigate('/analyze')}
            className="px-6 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 hover:-translate-y-[1px] active:scale-[0.98] transition-all duration-200 shadow-sm flex items-center justify-center whitespace-nowrap"
          >
            Analyze Content <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          <button 
            onClick={() => navigate('/history')}
            className="px-6 py-3.5 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 hover:-translate-y-[1px] active:scale-[0.98] transition-all duration-200 flex items-center justify-center whitespace-nowrap"
          >
            View Analysis History
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-center pb-8 border-t border-slate-200 pt-8 flex items-start justify-center gap-2 max-w-4xl mx-auto">
        <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-500 leading-relaxed">
          <strong>Statutory Notice:</strong> InvestorShield AI provides educational and safety guidance, not investment advice. Registered intermediaries should always be verified independently at <a href="#" className="font-bold text-blue-600 hover:underline">sebi.gov.in</a>. For immediate fraud distress, dial national cyber helpline <strong>1930</strong>.
        </p>
      </div>

    </div>
  );
};
