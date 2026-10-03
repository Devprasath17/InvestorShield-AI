import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Search, 
  ShieldCheck, 
  Lightbulb, 
  GraduationCap, 
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Landmark,
  Building,
  FileText
} from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 5. Hero Section & 6. Hero Visual */}
      <section className="bg-gradient-to-b from-blue-50 to-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side: Copy */}
            <div className="z-10 relative">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-6">
                <Shield className="w-4 h-4 mr-2" />
                AI-Powered Investor Safety
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
                <span className="text-blue-600">Understand</span> Before You Invest.
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl leading-relaxed">
                InvestorShield AI analyzes suspicious financial messages and screenshots, checks claims against trusted sources, explains warning signs clearly, and helps you build safer investing habits.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link 
                  to="/analyze" 
                  className="inline-flex justify-center items-center px-6 py-3.5 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
                >
                  Analyze Content <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link 
                  to="/learn" 
                  className="inline-flex justify-center items-center px-6 py-3.5 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
                >
                  Learn Investor Safety
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                <div>
                  <h4 className="font-bold text-gray-900 flex items-center mb-1">
                    <Search className="w-4 h-4 text-blue-600 mr-1.5" /> Fast Analysis
                  </h4>
                  <p className="text-sm text-gray-500">Analyze messages and screenshots quickly.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 flex items-center mb-1">
                    <ShieldCheck className="w-4 h-4 text-blue-600 mr-1.5" /> Trusted Sources
                  </h4>
                  <p className="text-sm text-gray-500">Check claims against relevant official sources.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 flex items-center mb-1">
                    <Lightbulb className="w-4 h-4 text-blue-600 mr-1.5" /> Simple Education
                  </h4>
                  <p className="text-sm text-gray-500">Understand risks without technical jargon.</p>
                </div>
              </div>
            </div>

            {/* Right Side: Visual */}
            <div className="relative lg:ml-auto w-full max-w-md mx-auto lg:max-w-none">
              <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl">
                <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[11px] top-[124px] rounded-l-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[11px] top-[178px] rounded-l-lg"></div>
                <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[11px] top-[142px] rounded-r-lg"></div>
                
                <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white flex flex-col relative">
                  
                  {/* Phone Header */}
                  <div className="pt-8 pb-4 px-4 bg-gray-50 border-b border-gray-100 flex items-center">
                     <Shield className="w-5 h-5 text-blue-600 mr-2" />
                     <span className="font-semibold text-sm">InvestorShield AI</span>
                  </div>

                  {/* Phone Content */}
                  <div className="p-4 flex-1 overflow-y-auto space-y-4 bg-gray-50">
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-xs text-gray-600">
                      <p className="font-bold text-gray-900 mb-1">"SEBI approved investment opportunity!"</p>
                      <p>Invest ₹10,000 today and get ₹50,000 guaranteed in 15 days.</p>
                      <p className="mt-1 text-red-600">Limited slots available.</p>
                    </div>

                    <div className="bg-red-50 p-3 rounded-lg border border-red-100 flex items-start">
                       <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                       <div>
                         <p className="text-xs font-bold text-red-900">Potential Risk Indicators</p>
                         <p className="text-[10px] text-red-800 mt-1">Guaranteed returns, short return period, urgency, regulatory claim.</p>
                       </div>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                       <p className="text-xs font-bold text-amber-900 flex justify-between">
                         Claim Verification
                         <span className="bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded text-[10px]">Needs Verification</span>
                       </p>
                       <p className="text-[10px] text-amber-800 mt-1">Independent verification is required.</p>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                       <p className="text-xs font-bold text-blue-900 flex items-center">
                         <GraduationCap className="w-3.5 h-3.5 mr-1" /> Learn Why This Matters
                       </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-1/4 -left-12 bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-100 flex items-center animate-bounce" style={{ animationDuration: '3s' }}>
                <Search className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-semibold text-gray-800">Risk Indicators Detected</span>
              </div>
              <div className="absolute top-1/2 -right-8 bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-100 flex items-center animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <ShieldCheck className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm font-semibold text-gray-800">Trusted Source Check</span>
              </div>
            </div>
            
          </div>

          {/* 7. Hero Trust Statement */}
          <div className="mt-20 text-center max-w-2xl mx-auto">
             <h3 className="text-xl font-bold text-gray-900 mb-2">Your first step before acting on suspicious financial content.</h3>
             <p className="text-gray-600">Analyze the content. Understand the warning signs. Verify important claims. Then decide what to do.</p>
          </div>
        </div>
      </section>

      {/* 8. "How InvestorShield AI Helps" Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">From Suspicious Message to Safer Understanding</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">One simple workflow for analyzing, verifying, understanding, and learning from financial content.</p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-stretch space-y-8 lg:space-y-0 relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-8 left-10 right-10 h-0.5 bg-blue-100 z-0"></div>

            {[
              { num: '01', title: 'Detect', desc: 'Identify suspicious patterns like guaranteed returns or urgency.', icon: Search },
              { num: '02', title: 'Verify', desc: 'Compare claims with trusted sources and show verification status.', icon: ShieldCheck },
              { num: '03', title: 'Explain', desc: 'Translate technical warning signs into simple language.', icon: Lightbulb },
              { num: '04', title: 'Educate', desc: 'Turn detected warning signs into practical investor lessons.', icon: GraduationCap },
              { num: '05', title: 'Stay Safe', desc: 'Provide general safety actions without investment recommendations.', icon: Shield }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center w-full lg:w-1/5 px-4 z-10 relative">
                <div className="w-16 h-16 rounded-full bg-blue-50 border-4 border-white shadow-sm flex items-center justify-center text-blue-600 mb-4">
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="text-xs font-bold text-blue-600 mb-1">{step.num} — {step.title}</div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title === 'Detect' ? 'Find Warning Signs' : step.title === 'Verify' ? 'Check Important Claims' : step.title === 'Explain' ? 'Understand the Risk' : step.title === 'Educate' ? 'Learn the Pattern' : 'Take Safer Next Steps'}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Main Feature Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">More Than Just Scam Detection</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">InvestorShield AI combines AI analysis, evidence-based verification, and investor education in one place.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <Search className="w-10 h-10 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Detect Risk Indicators</h3>
              <p className="text-gray-600">Analyze messages and screenshots for suspicious financial patterns.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <ShieldCheck className="w-10 h-10 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verify Claims</h3>
              <p className="text-gray-600">Check important claims against trusted sources where available.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <Lightbulb className="w-10 h-10 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Explain Clearly</h3>
              <p className="text-gray-600">Understand why a message may deserve caution.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
              <GraduationCap className="w-10 h-10 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personalized Education</h3>
              <p className="text-gray-600">Learn about the specific warning signs detected in your content.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow md:col-span-2 lg:col-span-2">
              <Shield className="w-10 h-10 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Safe Next Steps</h3>
              <p className="text-gray-600">Get practical investor-safety guidance without investment recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. "See What the AI Understands" Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">See What the AI Understands</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Compare raw suspicious content with our structured AI safety analysis.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Suspicious Message</h3>
              <div className="bg-white p-6 rounded-xl shadow-sm text-gray-800 font-medium italic border-l-4 border-gray-400">
                <p className="mb-4">"Guaranteed 5X returns in 7 days!"</p>
                <p className="mb-4">"Limited slots — invest now!"</p>
                <p>"SEBI approved opportunity!"</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100 relative">
              <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-6">InvestorShield AI Analysis</h3>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-red-100">
                  <h4 className="font-bold text-red-700 flex items-center mb-2"><AlertTriangle className="w-4 h-4 mr-2" /> Potentially Risky</h4>
                  <p className="text-sm text-gray-600 mb-2 font-medium">Warning indicators:</p>
                  <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                    <li>Guaranteed returns</li>
                    <li>Short return period</li>
                    <li>Urgency</li>
                    <li>Regulatory claim</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-amber-100">
                  <h4 className="font-bold text-gray-900 mb-1">Claim Status</h4>
                  <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded">Needs Verification</span>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                  <h4 className="font-bold text-gray-900 mb-1">Why it matters</h4>
                  <p className="text-sm text-gray-600">Guaranteed or unusually high returns over a short period can be a warning sign. Important claims should be independently verified before taking action.</p>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 mt-6 leading-tight">
                AI analysis identifies indicators and provides educational context. It does not determine investment outcomes or provide investment advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Trusted Evidence Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Built Around Evidence, Not Guesswork</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Important financial claims should be checked against reliable information whenever possible.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <Landmark className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="font-bold text-lg mb-2">Regulatory Sources</h3>
              <p className="text-sm text-gray-400">SEBI and other relevant official sources.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <Building className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="font-bold text-lg mb-2">Government Sources</h3>
              <p className="text-sm text-gray-400">Relevant government and public information sources.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <FileText className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="font-bold text-lg mb-2">Trusted Financial Information</h3>
              <p className="text-sm text-gray-400">Reliable sources used to provide context where appropriate.</p>
            </div>
          </div>

          <div className="bg-blue-900/50 border border-blue-800 rounded-xl p-8 text-center max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-blue-200 mb-3">No Evidence Found ≠ False</h3>
            <p className="text-blue-100">
              If relevant evidence cannot be found, InvestorShield AI clearly communicates that limitation instead of presenting an unsupported conclusion.
            </p>
          </div>
        </div>
      </section>

      {/* 12. Investor Education Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Turn Every Warning Sign Into a Learning Opportunity</h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['Guaranteed Returns', 'Unrealistically High Returns', 'Urgency & Pressure', 'Regulatory Claims', 'Suspicious Links', 'Unknown Investment Entities', 'OTP / PIN Requests', 'Unusual Payments'].map((topic, i) => (
              <span key={i} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-medium text-sm border border-blue-100">
                {topic}
              </span>
            ))}
          </div>

          <Link 
            to="/learn" 
            className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Explore Investor Safety <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* 13. Indian Investor Focus */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Designed for Everyday Investors in India</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10">
            Financial safety information should be understandable, accessible, and relevant to people across India.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center max-w-4xl mx-auto">
            <div className="bg-blue-700/50 p-4 rounded-xl"><span className="block text-sm">English</span></div>
            <div className="bg-blue-700/50 p-4 rounded-xl"><span className="block text-sm">தமிழ் (Planned)</span></div>
            <div className="bg-blue-700/50 p-4 rounded-xl"><span className="block text-sm">Simple Explanations</span></div>
            <div className="bg-blue-700/50 p-4 rounded-xl"><span className="block text-sm">Indian Regulatory Context</span></div>
            <div className="bg-blue-700/50 p-4 rounded-xl col-span-2 md:col-span-1"><span className="block text-sm">Mobile-friendly</span></div>
          </div>
          <p className="text-xs text-blue-200 mt-6">English-first with multilingual support designed for future expansion.</p>
        </div>
      </section>

      {/* 14. "Why Use InvestorShield AI?" Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Without InvestorShield AI</h3>
              <ul className="space-y-4">
                {['React immediately', 'Trust forwarded messages', 'Miss warning signs', 'Struggle to understand financial claims', 'Search manually for information'].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center mr-3 flex-shrink-0 text-sm">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-900 p-8 rounded-2xl shadow-md text-white">
              <h3 className="text-xl font-bold mb-6 pb-4 border-b border-blue-800">With InvestorShield AI</h3>
              <ul className="space-y-4">
                {['Analyze suspicious content', 'Identify warning indicators', 'Understand important claims', 'Check trusted sources', 'Learn safer financial habits'].map((item, i) => (
                  <li key={i} className="flex items-center text-blue-100">
                    <CheckCircle className="w-6 h-6 text-blue-400 mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 15. Final CTA Section */}
      <section className="py-24 bg-white text-center border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Before You Act, Understand What You Received.</h2>
          <p className="text-xl text-gray-600 mb-10">
            Analyze a suspicious financial message or screenshot and learn what warning signs to look for.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <Link 
              to="/analyze" 
              className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
            >
              Analyze Content →
            </Link>
            <Link 
              to="/learn" 
              className="inline-flex justify-center items-center px-8 py-4 border border-gray-300 text-lg font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              Explore Investor Safety
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            InvestorShield AI provides informational and educational assistance. It does not provide investment, trading, or financial advice.
          </p>
        </div>
      </section>
    </div>
  );
};
