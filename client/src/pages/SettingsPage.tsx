import React, { useState, useEffect } from 'react';
import { 
  User, SlidersHorizontal, ScanSearch, Bell, ShieldCheck, 
  LockKeyhole, Shield, Download, Trash2, LogOut, Check, 
  AlertTriangle, Info, MonitorSmartphone, Loader2
} from 'lucide-react';
import { useLanguage } from '../i18n';

const ToggleSwitch = ({ defaultChecked, onChange }: { defaultChecked?: boolean; onChange?: () => void }) => {
  const [checked, setChecked] = useState(defaultChecked || false);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => {
        setChecked(!checked);
        if (onChange) onChange();
      }}
      className={`${
        checked ? 'bg-blue-600' : 'bg-slate-200'
      } relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-out focus:outline-none focus:ring-[3px] focus:ring-blue-500/20 motion-reduce:transition-none`}
    >
      <span
        aria-hidden="true"
        className={`${
          checked ? 'translate-x-5' : 'translate-x-0'
        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform duration-250 ease-out motion-reduce:transition-none`}
      />
    </button>
  );
};

export const SettingsPage: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['profile', 'preferences', 'analysis', 'notifications', 'privacy', 'security', 'danger'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= (el.offsetTop - 150)) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 600);
  };

  const navItems = [
    { id: 'profile', label: t('settings.profile'), icon: User },
    { id: 'preferences', label: t('settings.preferences'), icon: SlidersHorizontal },
    { id: 'analysis', label: t('settings.analysis'), icon: ScanSearch },
    { id: 'notifications', label: t('settings.notifications'), icon: Bell },
    { id: 'privacy', label: t('settings.privacy'), icon: ShieldCheck },
    { id: 'security', label: t('settings.security'), icon: LockKeyhole },
    { id: 'danger', label: t('settings.danger'), icon: AlertTriangle, danger: true },
  ];

  const activeIndex = navItems.findIndex(i => i.id === activeSection);

  return (
    <div className="w-full max-w-[1280px] mx-auto p-4 md:p-8 font-sans text-slate-800 pb-24 animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out motion-reduce:animate-none">
      
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-[10px] tracking-widest uppercase mb-4 border border-blue-100">
          <User className="w-3.5 h-3.5 mr-2" /> ACCOUNT SETTINGS
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F2D6B] mb-3">{t('settings.title')}</h1>
        <p className="text-slate-600 text-lg max-w-2xl">
          {t('settings.desc')}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 shrink-0 lg:sticky lg:top-24 z-10 hidden md:block">
          <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300">
            <nav className="flex flex-col gap-1 relative">
              {/* Active Indicator Background */}
              <div 
                className={`absolute left-0 right-0 h-11 rounded-xl transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-0 motion-reduce:transition-none ${
                  navItems[activeIndex]?.danger ? 'bg-red-50/80' : 'bg-blue-50/80'
                }`}
                style={{ transform: `translateY(${activeIndex * 48}px)` }}
              />
              
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative z-10 flex items-center gap-3 px-4 py-3 h-11 rounded-xl text-sm font-bold transition-all duration-300 w-full text-left group motion-reduce:transition-none ${
                    activeSection === item.id 
                      ? item.danger ? 'text-red-600' : 'text-blue-700'
                      : item.danger
                        ? 'text-red-600 hover:bg-red-50/50'
                        : 'text-slate-600 hover:bg-slate-50/50 hover:text-slate-900'
                  }`}
                >
                  <item.icon className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 group-active:scale-95 motion-reduce:transition-none ${activeSection === item.id ? 'scale-105' : ''}`} />
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300 motion-reduce:transition-none">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full flex-1 flex flex-col gap-12">
          
          {/* 1. Profile Section */}
          <section id="profile" className="scroll-mt-24">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-[#0F2D6B] mb-2">Profile Information</h2>
              <p className="text-slate-600 text-sm">Manage the information associated with your InvestorShield AI account.</p>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-8 border-b border-slate-100">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-[#0F2D6B] text-white rounded-full flex items-center justify-center text-xl font-bold shadow-md shrink-0">
                    RK
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0F2D6B]">R. Krishnan</h3>
                    <p className="text-slate-500 text-sm mb-2">retail.investor@gmail.com</p>
                    <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                      <Check className="w-3 h-3 mr-1" /> Account Active
                    </div>
                  </div>
                </div>
                <button className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:-translate-y-px active:scale-[0.98] text-sm shadow-sm transition-all duration-200 ease-out whitespace-nowrap">
                  Change Photo
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                  <label className="text-sm font-bold text-slate-700 group-focus-within:text-blue-600 transition-colors duration-200">Full Name</label>
                  <input type="text" defaultValue="R. Krishnan" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-[3px] focus:ring-blue-500/20 transition-all duration-200 ease-out shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex justify-between">
                    Email Address <span className="text-xs text-slate-400 font-normal">Read-only</span>
                  </label>
                  <input type="email" defaultValue="retail.investor@gmail.com" readOnly className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 focus:outline-none cursor-not-allowed shadow-sm transition-all" />
                </div>
                <div className="space-y-2 group">
                  <label className="text-sm font-bold text-slate-700 group-focus-within:text-blue-600 transition-colors duration-200">Preferred Language</label>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as 'en' | 'ta')}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-[3px] focus:ring-blue-500/20 transition-all duration-200 ease-out shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="en">English</option>
                    <option value="ta">தமிழ்</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-1">Used for explanations and investor education content.</p>
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-3 mt-10 pt-6 border-t border-slate-100">
                <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all duration-200 text-sm">
                  Cancel
                </button>
                <button 
                  onClick={handleSave} 
                  disabled={isSaving}
                  className="w-[140px] flex items-center justify-center h-11 bg-[#0F2D6B] text-white font-bold rounded-xl hover:bg-[#0A1F4D] hover:shadow-md hover:-translate-y-px active:scale-[0.98] transition-all duration-200 ease-out text-sm disabled:opacity-80 disabled:pointer-events-none"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* 2. Preferences Section */}
          <section id="preferences" className="scroll-mt-24">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-[#0F2D6B] mb-2">Preferences</h2>
              <p className="text-slate-600 text-sm">Customize how InvestorShield AI communicates information to you.</p>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300">
              <h3 className="text-lg font-bold text-slate-800 mb-2">Accessibility</h3>
              <p className="text-sm text-slate-500 mb-6">Enhance readability and interaction across the application.</p>
              
              <div className="space-y-2">
                <div className="flex items-start justify-between py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 rounded-xl px-2 -mx-2 transition-colors duration-200">
                  <div className="pr-8">
                    <h4 className="text-sm font-bold text-slate-800">Larger Text</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">Increase text size across the application for easier reading.</p>
                  </div>
                  <div className="pt-1"><ToggleSwitch /></div>
                </div>
                <div className="flex items-start justify-between py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 rounded-xl px-2 -mx-2 transition-colors duration-200">
                  <div className="pr-8">
                    <h4 className="text-sm font-bold text-slate-800">Reduce Motion</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">Minimize animations and transitions throughout the application.</p>
                  </div>
                  <div className="pt-1"><ToggleSwitch /></div>
                </div>
                <div className="flex items-start justify-between py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 rounded-xl px-2 -mx-2 transition-colors duration-200">
                  <div className="pr-8">
                    <h4 className="text-sm font-bold text-slate-800">High Contrast</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">Increase visual contrast between text, surfaces, and controls.</p>
                  </div>
                  <div className="pt-1"><ToggleSwitch /></div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Analysis Preferences Section */}
          <section id="analysis" className="scroll-mt-24">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-[#0F2D6B] mb-2">Analysis Preferences</h2>
              <p className="text-slate-600 text-sm">Choose how InvestorShield AI presents analysis and verification results.</p>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300">
              <div className="space-y-2">
                <div className="flex items-start justify-between py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 rounded-xl px-2 -mx-2 transition-colors duration-200">
                  <div className="pr-8">
                    <h4 className="text-sm font-bold text-slate-800">Explain Risk Signals</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">Show detailed explanations for detected warning signals.</p>
                  </div>
                  <div className="pt-1"><ToggleSwitch defaultChecked /></div>
                </div>
                <div className="flex items-start justify-between py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 rounded-xl px-2 -mx-2 transition-colors duration-200">
                  <div className="pr-8">
                    <h4 className="text-sm font-bold text-slate-800">Evidence Details</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">Show supporting evidence and verification context when available.</p>
                  </div>
                  <div className="pt-1"><ToggleSwitch defaultChecked /></div>
                </div>
                <div className="flex items-start justify-between py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 rounded-xl px-2 -mx-2 transition-colors duration-200">
                  <div className="pr-8">
                    <h4 className="text-sm font-bold text-slate-800">Educational Guidance</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">Include relevant investor-safety lessons after analysis.</p>
                  </div>
                  <div className="pt-1"><ToggleSwitch defaultChecked /></div>
                </div>
                <div className="flex items-start justify-between py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 rounded-xl px-2 -mx-2 transition-colors duration-200">
                  <div className="pr-8">
                    <h4 className="text-sm font-bold text-slate-800">Regional Language Explanations</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">Provide explanations in your selected language when available.</p>
                  </div>
                  <div className="pt-1"><ToggleSwitch defaultChecked /></div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-800 leading-relaxed font-medium">
                  These preferences affect how results are presented. They do not change the underlying evidence or analysis.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Notifications Section */}
          <section id="notifications" className="scroll-mt-24">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-[#0F2D6B] mb-2">Notifications</h2>
              <p className="text-slate-600 text-sm">Choose which updates you would like to receive.</p>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300">
              <div className="space-y-2">
                <div className="flex items-start justify-between py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 rounded-xl px-2 -mx-2 transition-colors duration-200">
                  <div className="pr-8">
                    <h4 className="text-sm font-bold text-slate-800">Analysis Complete</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">Notify me when an analysis is ready.</p>
                  </div>
                  <div className="pt-1"><ToggleSwitch defaultChecked /></div>
                </div>
                <div className="flex items-start justify-between py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 rounded-xl px-2 -mx-2 transition-colors duration-200">
                  <div className="pr-8">
                    <h4 className="text-sm font-bold text-slate-800">Security Alerts</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">Notify me about important account or security events.</p>
                  </div>
                  <div className="pt-1"><ToggleSwitch defaultChecked /></div>
                </div>
                <div className="flex items-start justify-between py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 rounded-xl px-2 -mx-2 transition-colors duration-200">
                  <div className="pr-8">
                    <h4 className="text-sm font-bold text-slate-800">Learning Reminders</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">Receive occasional reminders about investor-safety topics.</p>
                  </div>
                  <div className="pt-1"><ToggleSwitch /></div>
                </div>
                <div className="flex items-start justify-between py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 rounded-xl px-2 -mx-2 transition-colors duration-200">
                  <div className="pr-8">
                    <h4 className="text-sm font-bold text-slate-800">Product Updates</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">Receive updates about new InvestorShield AI features.</p>
                  </div>
                  <div className="pt-1"><ToggleSwitch /></div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Privacy Section */}
          <section id="privacy" className="scroll-mt-24">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-[#0F2D6B] mb-2">Privacy & Data</h2>
              <p className="text-slate-600 text-sm">Manage your saved analyses and control your data preferences.</p>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300">
              <div className="flex items-center gap-4 mb-8 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm mb-0.5">Your Data, Your Control</h3>
                  <p className="text-xs text-slate-500">Manage saved analyses and control your InvestorShield AI data preferences.</p>
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <div className="flex items-start justify-between py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 rounded-xl px-2 -mx-2 transition-colors duration-200">
                  <div className="pr-8">
                    <h4 className="text-sm font-bold text-slate-800">Analysis History</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">Save your analysis results so you can review them later from History.</p>
                  </div>
                  <div className="pt-1"><ToggleSwitch defaultChecked /></div>
                </div>
                <div className="flex items-start justify-between py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 rounded-xl px-2 -mx-2 transition-colors duration-200">
                  <div className="pr-8">
                    <h4 className="text-sm font-bold text-slate-800">Save Uploaded Content</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">Control whether uploaded analysis content is retained with your saved analysis.</p>
                  </div>
                  <div className="pt-1"><ToggleSwitch /></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="flex items-start gap-4 p-5 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 hover:-translate-y-[1px] hover:shadow-md active:scale-[0.98] transition-all duration-200 ease-out group">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors duration-200">
                    <Download className="w-5 h-5 text-slate-500 group-hover:text-blue-600 transition-colors duration-200" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-slate-800 mb-0.5">Download My Data</div>
                    <div className="text-xs text-slate-500">Export available account and analysis information.</div>
                  </div>
                </button>
                <button onClick={() => setShowClearModal(true)} className="flex items-start gap-4 p-5 bg-white border border-slate-200 rounded-2xl hover:bg-red-50/50 hover:border-red-100 hover:-translate-y-[1px] hover:shadow-md active:scale-[0.98] transition-all duration-200 ease-out group">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors duration-200">
                    <Trash2 className="w-5 h-5 text-slate-500 group-hover:text-red-500 transition-colors duration-200" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-slate-800 group-hover:text-red-700 transition-colors duration-200 mb-0.5">Clear Analysis History</div>
                    <div className="text-xs text-slate-500 group-hover:text-red-600/80 transition-colors duration-200">Remove your saved analysis history from your account.</div>
                  </div>
                </button>
              </div>
            </div>
          </section>

          {/* 6. Security Section */}
          <section id="security" className="scroll-mt-24">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-[#0F2D6B] mb-2">Security</h2>
              <p className="text-slate-600 text-sm">Review account security and protect access to your InvestorShield AI account.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:-translate-y-[1px] hover:shadow-md transition-all duration-300 ease-out">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100">
                      <Shield className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                      <Check className="w-3 h-3 mr-1" /> Protected
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-800 text-base mb-1">Account Security</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">Your account is currently protected by standard authentication measures.</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:-translate-y-[1px] hover:shadow-md transition-all duration-300 ease-out">
                <div>
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-200 mb-4">
                    <LockKeyhole className="w-5 h-5 text-slate-600" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-base mb-1">Password</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">Keep your account password up to date.</p>
                </div>
                <button className="w-full py-2.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 active:scale-[0.98] text-sm shadow-sm transition-all duration-200 ease-out">
                  Change Password
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:-translate-y-[1px] hover:shadow-md transition-all duration-300 ease-out">
                <div>
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-200 mb-4">
                    <MonitorSmartphone className="w-5 h-5 text-slate-600" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-base mb-1">Active Sessions</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">Review devices currently signed in to your account.</p>
                </div>
                <button className="w-full py-2.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 active:scale-[0.98] text-sm shadow-sm transition-all duration-200 ease-out">
                  Manage Sessions
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:-translate-y-[1px] hover:shadow-md transition-all duration-300 ease-out">
                <div>
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-200 mb-4">
                    <LogOut className="w-5 h-5 text-slate-600" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-base mb-1">Sign Out</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">Securely log out of your current session.</p>
                </div>
                <button className="w-full py-2.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 active:scale-[0.98] text-sm shadow-sm transition-all duration-200 ease-out">
                  Sign Out
                </button>
              </div>
            </div>
          </section>

          {/* 7. Danger Zone */}
          <section id="danger" className="scroll-mt-24">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Danger Zone</h2>
              <p className="text-slate-600 text-sm">These actions can permanently affect your account or saved information.</p>
            </div>
            
            <div className="bg-white border border-red-200 rounded-3xl p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-red-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1">Delete Account</h4>
                  <p className="text-xs text-slate-500 max-w-md leading-relaxed">Permanently delete your InvestorShield AI account and associated account data.</p>
                </div>
                <button onClick={() => setShowDeleteModal(true)} className="shrink-0 px-6 py-3 bg-white border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 hover:-translate-y-px active:scale-[0.98] transition-all duration-200 ease-out shadow-sm text-sm">
                  Delete Account
                </button>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Toast Notification */}
      <div className={`fixed bottom-8 right-8 bg-slate-800 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${showToast ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'} z-50`}>
        <div className="w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center">
          <Check className="w-3.5 h-3.5" />
        </div>
        <span className="text-sm font-bold">✓ Changes saved</span>
      </div>

      {/* Modals */}
      {showClearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200 ease-out" onClick={() => setShowClearModal(false)}></div>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative z-10 animate-in zoom-in-95 fade-in slide-in-from-bottom-2 duration-200 ease-out">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-5">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Clear Analysis History</h3>
            <p className="text-slate-500 text-sm mb-2">Are you sure you want to clear your analysis history?</p>
            <p className="text-slate-500 text-sm mb-8">This action will remove your saved analysis history. This cannot be undone.</p>
            <div className="flex items-center gap-3 w-full">
              <button onClick={() => setShowClearModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 active:scale-[0.98] transition-all duration-200 ease-out text-sm">
                Cancel
              </button>
              <button onClick={() => setShowClearModal(false)} className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 active:scale-[0.98] hover:shadow-md transition-all duration-200 ease-out text-sm">
                Clear History
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200 ease-out" onClick={() => setShowDeleteModal(false)}></div>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative z-10 animate-in zoom-in-95 fade-in slide-in-from-bottom-2 duration-200 ease-out">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-5">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Account</h3>
            <p className="text-slate-500 text-sm mb-2">Are you sure you want to delete your account?</p>
            <p className="text-slate-500 text-sm mb-8">This action is permanent. Review the information carefully before continuing.</p>
            <div className="flex items-center gap-3 w-full">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 active:scale-[0.98] transition-all duration-200 ease-out text-sm">
                Cancel
              </button>
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 active:scale-[0.98] hover:shadow-md transition-all duration-200 ease-out text-sm">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
