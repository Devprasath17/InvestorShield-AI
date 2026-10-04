import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';

export const HomePage: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="bg-transparent font-body-md text-on-surface antialiased min-h-screen flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out motion-reduce:animate-none">
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 max-w-[1280px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex items-center justify-between gap-gutter">
          <div className="flex items-center gap-space-md">
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight">InvestorShield AI</span>
              <span className="font-label-sm text-label-sm text-secondary">Bharat Guardian</span>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-space-lg h-full">
            <Link to="/" aria-current="page" className="h-full flex items-center transition-colors text-secondary border-b-2 border-secondary font-label-lg active:scale-95">{t('nav.home')}</Link>
            <Link to="/analyze" className="h-full flex items-center font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors active:scale-95">{t('nav.analyze')}</Link>
            <Link to="/dashboard" className="h-full flex items-center font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors active:scale-95">{t('nav.dashboard')}</Link>
            <Link to="/learn" className="h-full flex items-center font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors active:scale-95">{t('nav.learn')}</Link>
            <Link to="/about" className="h-full flex items-center font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors active:scale-95">{t('nav.about')}</Link>
          </nav>
          <div className="flex items-center gap-space-md">
            <div className="flex items-center p-space-xs bg-surface-container-high rounded-full">
              <button onClick={() => setLanguage('en')} aria-pressed={language === 'en'} className={`px-space-sm py-1 rounded-full font-label-sm text-label-sm transition-all active:scale-95 ${language === 'en' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'}`} type="button">EN</button>
              <button onClick={() => setLanguage('ta')} aria-pressed={language === 'ta'} className={`px-space-sm py-1 rounded-full font-label-sm text-label-sm transition-all active:scale-95 ${language === 'ta' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'}`} type="button">தமிழ்</button>
            </div>
            <Link to="/analyze" className="hidden sm:inline-flex items-center justify-center px-space-lg py-space-sm rounded-lg bg-secondary font-label-lg text-label-lg text-on-secondary hover:bg-secondary-container hover:-translate-y-px active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md">{t('nav.getStarted')}</Link>
            <Link to="/dashboard" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full pt-20 bg-transparent flex-grow flex flex-col">
        <section className="relative w-full overflow-hidden bg-transparent pb-space-xl pt-space-lg lg:pb-32">
          <div className="pointer-events-none absolute -right-24 -top-24 h-[650px] w-[800px] rounded-full bg-surface-container-highest/60 blur-3xl hidden md:block"></div>
          <div className="pointer-events-none absolute left-1/3 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-secondary-fixed/30 blur-2xl"></div>
          
          <div className="relative mx-auto max-w-[1280px] px-margin md:px-margin-tablet lg:px-margin-desktop">
            <div className="grid grid-cols-1 items-center gap-space-xl lg:grid-cols-12 lg:gap-gutter-desktop">
              <div className="flex flex-col items-start gap-space-md lg:col-span-6 lg:pr-space-md">
                <div className="inline-flex items-center gap-space-xs rounded-full bg-surface-container-high px-3.5 py-1.5 shadow-sm">
                  <span className="material-symbols-outlined text-secondary text-[18px]">auto_awesome</span>
                  <span className="font-label-md text-label-md text-secondary">{t('home.hero.badge')}</span>
                </div>
                
                <h1 className="font-display-lg text-display-lg text-primary tracking-tight">
                  {t('home.hero.title1')} <br className="hidden sm:inline"/>
                  <span className="text-secondary">{t('home.hero.title2')}</span>
                </h1>
                
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                  {t('home.hero.description')}
                </p>
                
                <div className="mt-space-sm flex flex-wrap items-center gap-space-md">
                  <Link to="/analyze" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-secondary px-6 font-label-lg text-label-lg text-on-secondary shadow-md hover:bg-secondary-container hover:-translate-y-px hover:shadow-lg active:scale-95 transition-all duration-200">
                    <span className="material-symbols-outlined text-[20px]">search_check</span>
                    <span>{t('home.hero.btnAnalyze')}</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                  <button 
                    onClick={() => document.getElementById('how-it-works')?.scrollIntoView({behavior: 'smooth'})}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-surface-container-lowest px-5 font-label-lg text-label-lg text-primary shadow-sm hover:bg-surface-container hover:-translate-y-px active:scale-95 transition-all duration-200"
                  >
                    <span className="material-symbols-outlined text-secondary text-[20px]">play_circle</span>
                    <span>{t('home.hero.btnLearn')}</span>
                  </button>

                </div>
                
                <div className="mt-space-lg grid w-full grid-cols-2 gap-space-md sm:grid-cols-4">
                  <div className="flex flex-col gap-1 rounded-xl bg-surface-container-low p-space-sm">
                    <div className="flex items-center gap-1.5 text-secondary">
                      <span className="material-symbols-outlined text-[20px]">verified_user</span>
                      <span className="font-label-md text-label-md font-bold text-on-surface">{t('home.feat.detect')}</span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{t('home.feat.detectSub')}</span>
                  </div>
                  <div className="flex flex-col gap-1 rounded-xl bg-surface-container-low p-space-sm">
                    <div className="flex items-center gap-1.5 text-secondary">
                      <span className="material-symbols-outlined text-[20px]">find_in_page</span>
                      <span className="font-label-md text-label-md font-bold text-on-surface">{t('home.feat.verify')}</span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{t('home.feat.verifySub')}</span>
                  </div>
                  <div className="flex flex-col gap-1 rounded-xl bg-surface-container-low p-space-sm">
                    <div className="flex items-center gap-1.5 text-secondary">
                      <span className="material-symbols-outlined text-[20px]">menu_book</span>
                      <span className="font-label-md text-label-md font-bold text-on-surface">{t('home.feat.understand')}</span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{t('home.feat.understandSub')}</span>
                  </div>
                  <div className="flex flex-col gap-1 rounded-xl bg-surface-container-low p-space-sm">
                    <div className="flex items-center gap-1.5 text-secondary">
                      <span className="material-symbols-outlined text-[20px]">trending_up</span>
                      <span className="font-label-md text-label-md font-bold text-on-surface">{t('home.feat.invest')}</span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{t('home.feat.investSub')}</span>
                  </div>

                </div>
              </div>

              <div className="relative w-full lg:col-span-6">
                <div className="relative mx-auto w-full max-w-[620px] rounded-3xl bg-gradient-to-br from-surface-container-high/90 via-surface-container/60 to-surface-container-highest/40 p-4 shadow-xl backdrop-blur-md">
                  <div className="mb-3 flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-error/70"></div>
                      <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                      <div className="h-3 w-3 rounded-full bg-on-tertiary-container"></div>
                      <span className="ml-2 font-label-sm text-label-sm text-on-surface-variant">InvestorShield Engine v2.4</span>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-surface-container-lowest px-2 py-0.5 font-label-sm text-label-sm text-secondary shadow-sm">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-on-tertiary-container animate-pulse"></span>
                      SEBI Sync Active
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-3">
                    <div className="hidden sm:flex col-span-3 flex-col gap-1 rounded-xl bg-surface-container-lowest/80 p-2 shadow-sm backdrop-blur">
                      <div className="mb-2 flex items-center gap-1.5 px-2 py-1">
                        <div className="flex h-5 w-5 items-center justify-center rounded bg-primary text-on-primary">
                          <span className="material-symbols-outlined text-[13px]">shield</span>
                        </div>
                        <span className="font-label-sm text-label-sm font-bold text-primary">Shield AI</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container">
                        <span className="material-symbols-outlined text-[16px]">grid_view</span>
                        <span>{t('nav.dashboard')}</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-surface-container-high px-2 py-1.5 font-label-sm text-label-sm font-bold text-secondary">
                        <span className="material-symbols-outlined text-[16px]">travel_explore</span>
                        <span>{t('nav.analyze')}</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container">
                        <span className="material-symbols-outlined text-[16px]">history</span>
                        <span>{t('nav.history')}</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container">
                        <span className="material-symbols-outlined text-[16px]">school</span>
                        <span>{t('nav.learn')}</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container">
                        <span className="material-symbols-outlined text-[16px]">info</span>
                        <span>{t('nav.about')}</span>
                      </div>

                    </div>

                    <div className="col-span-12 sm:col-span-9 flex flex-col gap-3">
                      <div className="rounded-2xl bg-surface-container-lowest p-3.5 shadow-md">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="font-headline-sm text-headline-sm text-primary">{t('home.widget.analyze')}</h2>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">{t('home.widget.analyzeSub')}</p>
                          </div>
                        </div>
                        <div className="mt-2.5 flex gap-1.5 rounded-lg bg-surface-container p-1">
                          <button className="flex-1 rounded-md bg-surface-container-lowest py-1 font-label-sm text-label-sm font-semibold text-secondary shadow-sm" type="button">{t('home.widget.btnPaste')}</button>
                          <button className="flex-1 rounded-md py-1 font-label-sm text-label-sm text-on-surface-variant" type="button">{t('home.widget.btnUpload')}</button>
                        </div>

                        <div className="mt-2.5 rounded-xl bg-surface-container-low p-2.5 font-body-sm text-body-sm text-on-surface">
                          <p className="text-error font-semibold">🚨 SEBI approved opportunity! 🚨</p>
                          <p className="text-on-surface-variant">Invest <span className="font-semibold text-on-surface">₹10,000</span> today and get <span className="font-semibold text-on-surface">₹50,000 guaranteed</span> in 15 days. Limited slots remaining! Click https://t.me/sebi_guaranteed_wealth</p>
                        </div>
                        <div className="mt-2.5 flex items-center justify-between">
                          <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-secondary">lock</span> {t('home.widget.encrypted')}
                          </span>
                          <button className="inline-flex items-center gap-1 rounded-lg bg-secondary px-4 py-1.5 font-label-sm text-label-sm font-semibold text-on-secondary shadow-sm" type="button">
                            <span className="material-symbols-outlined text-[16px]">neurology</span>
                            <span>{t('home.widget.btnAnalyzeSignals')}</span>
                          </button>

                        </div>
                      </div>

                      <div className="rounded-2xl bg-surface-container-lowest p-3.5 shadow-md">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-error text-[18px]">report_problem</span>
                            <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-on-surface">{t('home.widget.resultTitle')}</span>
                          </div>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">{t('home.widget.resultJustNow')}</span>
                        </div>
                        <div className="mt-2 flex items-center gap-3 rounded-xl bg-error-container/60 p-2.5">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-error text-on-error shadow-sm">
                            <span className="material-symbols-outlined text-[22px]">warning</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-label-lg text-label-lg font-bold text-on-error-container">{t('home.widget.resultRisky')}</span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">{t('home.widget.resultRiskySub')}</span>
                          </div>

                        </div>
                        <div className="relative mt-3 flex items-center justify-center rounded-xl bg-surface-container-low p-2">
                          <svg className="w-full h-auto max-h-[170px]" fill="none" viewBox="0 0 420 180" xmlns="http://www.w3.org/2000/svg">
                            <line stroke="#cbd5e1" strokeDasharray="3 3" strokeWidth="1.5" x1="210" x2="210" y1="90" y2="28"></line>
                            <line stroke="#cbd5e1" strokeDasharray="3 3" strokeWidth="1.5" x1="210" x2="80" y1="90" y2="70"></line>
                            <line stroke="#cbd5e1" strokeDasharray="3 3" strokeWidth="1.5" x1="210" x2="340" y1="90" y2="70"></line>
                            <line stroke="#cbd5e1" strokeDasharray="3 3" strokeWidth="1.5" x1="210" x2="100" y1="90" y2="148"></line>
                            <line stroke="#cbd5e1" strokeDasharray="3 3" strokeWidth="1.5" x1="210" x2="320" y1="90" y2="148"></line>
                            <circle cx="210" cy="90" fill="#dae2ff" r="26"></circle>
                            <circle cx="210" cy="90" fill="#ffffff" r="22" stroke="#2170e4" strokeWidth="2"></circle>
                            <text fill="#001849" fontFamily="Inter" fontSize="9" fontWeight="700" textAnchor="middle" x="210" y="94">CONTENT</text>
                            
                            <rect fill="#ffdad6" height="24" rx="12" width="130" x="145" y="16"></rect>
                            <circle cx="157" cy="28" fill="#ba1a1a" r="5"></circle>
                            <text fill="#ffffff" fontFamily="Inter" fontSize="8" fontWeight="800" textAnchor="middle" x="157" y="31">!</text>
                            <text fill="#93000a" fontFamily="Inter" fontSize="10" fontWeight="600" textAnchor="middle" x="215" y="32">Guaranteed Returns</text>
                            
                            <rect fill="#fef3c7" height="24" rx="12" width="105" x="25" y="58"></rect>
                            <circle cx="37" cy="70" fill="#b45309" r="5"></circle>
                            <text fill="#ffffff" fontFamily="Inter" fontSize="8" fontWeight="800" textAnchor="middle" x="37" y="73">!</text>
                            <text fill="#78350f" fontFamily="Inter" fontSize="10" fontWeight="600" textAnchor="middle" x="85" y="74">Urgency Signal</text>
                            
                            <rect fill="#ffdad6" height="24" rx="12" width="115" x="285" y="58"></rect>
                            <circle cx="297" cy="70" fill="#ba1a1a" r="5"></circle>
                            <text fill="#ffffff" fontFamily="Inter" fontSize="8" fontWeight="800" textAnchor="middle" x="297" y="73">!</text>
                            <text fill="#93000a" fontFamily="Inter" fontSize="10" fontWeight="600" textAnchor="middle" x="350" y="74">Authority Claim</text>
                            
                            <rect fill="#ffdad6" height="24" rx="12" width="120" x="40" y="136"></rect>
                            <circle cx="52" cy="148" fill="#ba1a1a" r="5"></circle>
                            <text fill="#ffffff" fontFamily="Inter" fontSize="8" fontWeight="800" textAnchor="middle" x="52" y="151">!</text>
                            <text fill="#93000a" fontFamily="Inter" fontSize="10" fontWeight="600" textAnchor="middle" x="108" y="152">Suspicious Link</text>
                            
                            <rect fill="#fef3c7" height="24" rx="12" width="120" x="260" y="136"></rect>
                            <circle cx="272" cy="148" fill="#b45309" r="5"></circle>
                            <text fill="#ffffff" fontFamily="Inter" fontSize="8" fontWeight="800" textAnchor="middle" x="272" y="151">!</text>
                            <text fill="#78350f" fontFamily="Inter" fontSize="10" fontWeight="600" textAnchor="middle" x="328" y="152">Telegram Gateway</text>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative -mt-6 ml-auto max-w-[280px] sm:max-w-[320px] rounded-2xl bg-surface-container-lowest p-3 shadow-xl ring-1 ring-surface-container-high transition-transform hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-primary-container px-2 py-0.5 font-label-sm text-label-sm font-bold text-on-primary">SEBI Register</span>
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 font-label-sm text-label-sm font-semibold text-amber-800">Needs Verification</span>
                    </div>
                    <p className="mt-2 font-headline-sm text-headline-sm text-primary">Securities & Exchange Board of India</p>
                    <p className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">No matching license or certified intermediary found under registration database.</p>
                    <div className="mt-2 flex items-center justify-between">
                      <a className="inline-flex items-center gap-1 font-label-sm text-label-sm font-bold text-secondary hover:underline" href="https://www.sebi.gov.in" rel="noreferrer" target="_blank">
                        <span>View SEBI Directory</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                      </a>
                      <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-surface-container-low py-space-lg">
          <div className="mx-auto max-w-[1280px] px-margin md:px-margin-tablet lg:px-margin-desktop">
            <div className="flex flex-col items-center justify-between gap-space-lg lg:flex-row">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="font-label-lg text-label-lg font-bold text-primary">{t('home.trusted.title')}</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">{t('home.trusted.sub')}</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-space-md sm:gap-space-lg">
                <div className="flex items-center gap-2 rounded-xl bg-surface-container-lowest px-3 py-2 shadow-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-container font-headline-sm text-headline-sm font-black text-primary">
                    ₹
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-bold text-primary">SEBI</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Securities Exchange Board</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-surface-container-lowest px-3 py-2 shadow-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-container">
                    <span className="material-symbols-outlined text-primary text-[20px]">account_balance</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-bold text-primary">RBI Sachet</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Reserve Bank of India</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-surface-container-lowest px-3 py-2 shadow-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-container">
                    <span className="material-symbols-outlined text-primary text-[20px]">corporate_fare</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-bold text-primary">MCA-21</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Ministry of Corporate Affairs</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-surface-container-lowest px-3 py-2 shadow-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-container">
                    <span className="material-symbols-outlined text-primary text-[20px]">health_and_safety</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-bold text-primary">IRDAI</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Insurance Regulatory Authority</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-surface-container-lowest px-3 py-2 shadow-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-error-container">
                    <span className="material-symbols-outlined text-error text-[20px]">ring_volume</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-bold text-error">NCRP 1930</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Cybercrime Grievance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-surface py-space-xl" id="how-it-works">
          <div className="mx-auto max-w-[1280px] px-margin md:px-margin-tablet lg:px-margin-desktop">
            <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
              <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-secondary">{t('home.how.badge')}</span>
              <h2 className="mt-1 font-display-lg text-display-lg text-primary tracking-tight">{t('home.how.title')}</h2>
              <p className="mt-2 font-body-lg text-body-lg text-on-surface-variant">
                {t('home.how.sub')}
              </p>
            </div>
            <div className="mt-space-xl grid grid-cols-1 items-start gap-space-md sm:grid-cols-2 lg:grid-cols-5">
              <div className="group relative flex flex-col items-center rounded-2xl bg-surface-container-lowest p-space-md text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-container-high text-secondary">
                  <span className="material-symbols-outlined text-[28px]">search_insights</span>
                  <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-secondary font-label-sm text-label-sm font-bold text-on-secondary">01</span>
                </div>
                <h3 className="mt-space-md font-headline-sm text-headline-sm text-primary">{t('home.how.step1.title')}</h3>
                <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{t('home.how.step1.desc')}</p>
              </div>
              <div className="group relative flex flex-col items-center rounded-2xl bg-surface-container-lowest p-space-md text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-container-high text-secondary">
                  <span className="material-symbols-outlined text-[28px]">fact_check</span>
                  <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-secondary font-label-sm text-label-sm font-bold text-on-secondary">02</span>
                </div>
                <h3 className="mt-space-md font-headline-sm text-headline-sm text-primary">{t('home.how.step2.title')}</h3>
                <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{t('home.how.step2.desc')}</p>
              </div>
              <div className="group relative flex flex-col items-center rounded-2xl bg-surface-container-lowest p-space-md text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-container-high text-secondary">
                  <span className="material-symbols-outlined text-[28px]">lightbulb</span>
                  <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-secondary font-label-sm text-label-sm font-bold text-on-secondary">03</span>
                </div>
                <h3 className="mt-space-md font-headline-sm text-headline-sm text-primary">{t('home.how.step3.title')}</h3>
                <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{t('home.how.step3.desc')}</p>
              </div>
              <div className="group relative flex flex-col items-center rounded-2xl bg-surface-container-lowest p-space-md text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-container-high text-secondary">
                  <span className="material-symbols-outlined text-[28px]">school</span>
                  <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-secondary font-label-sm text-label-sm font-bold text-on-secondary">04</span>
                </div>
                <h3 className="mt-space-md font-headline-sm text-headline-sm text-primary">{t('home.how.step4.title')}</h3>
                <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{t('home.how.step4.desc')}</p>
              </div>
              <div className="group relative flex flex-col items-center rounded-2xl bg-surface-container-lowest p-space-md text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-container-high text-secondary">
                  <span className="material-symbols-outlined text-[28px]">security</span>
                  <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-secondary font-label-sm text-label-sm font-bold text-on-secondary">05</span>
                </div>
                <h3 className="mt-space-md font-headline-sm text-headline-sm text-primary">{t('home.how.step5.title')}</h3>
                <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{t('home.how.step5.desc')}</p>
              </div>

            </div>
          </div>
        </section>

        <section className="w-full bg-surface-container-low py-space-xl">
          <div className="mx-auto max-w-[1280px] px-margin md:px-margin-tablet lg:px-margin-desktop">
            <div className="flex flex-col items-center justify-between gap-space-md sm:flex-row">
              <div>
                <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-secondary">IN-DEPTH VERIFICATION SHOWCASE</span>
                <h2 className="font-headline-lg text-headline-lg text-primary">Deceptive Claim vs. Verified Truth</h2>
              </div>
              <div className="flex items-center gap-space-xs rounded-full bg-surface-container p-1">
                <span className="rounded-full bg-primary px-3 py-1 font-label-sm text-label-sm text-on-primary">WhatsApp Stock Tip</span>
                <span className="px-3 py-1 font-label-sm text-label-sm text-on-surface-variant">IPO Allotment Scam</span>
                <span className="px-3 py-1 font-label-sm text-label-sm text-on-surface-variant">Dabba Trading</span>
              </div>
            </div>

            <div className="mt-space-lg grid grid-cols-1 overflow-hidden rounded-3xl bg-surface-container-lowest shadow-lg lg:grid-cols-12">
              <div className="flex flex-col justify-between bg-error-container/30 p-space-lg lg:col-span-5">
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-full bg-error px-2.5 py-1 font-label-sm text-label-sm font-bold text-on-error">
                      <span className="material-symbols-outlined text-[14px]">cancel</span>
                      Flagged Claim (Unverified)
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Forwarded WhatsApp Message</span>
                  </div>
                  <div className="mt-space-sm rounded-2xl bg-surface-container-lowest p-space-md shadow-sm">
                    <div className="flex items-center gap-2 border-b border-surface-container pb-2 mb-2">
                      <div className="h-8 w-8 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-primary">
                        VIP
                      </div>
                      <div>
                        <p className="font-label-md text-label-md font-bold text-primary">HNI Institutional Club 🚀</p>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">+91 9840X XXXXX</p>
                      </div>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                      "Exclusive Upper-Circuit calls! 100% accurate inside tips direct from institutional desks. Deposit ₹25,000 into private escrow to get daily 15-20% intraday profit. SEBI reg. confirmed: INZ00029348. Pay now to lock price!"
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 pt-space-xs">
                    <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-error">Critical Red Flags</span>
                    <div className="flex items-center gap-2 text-on-error-container font-body-sm text-body-sm">
                      <span className="material-symbols-outlined text-[18px] text-error">check_circle</span>
                      <span>Promising fixed guaranteed returns on equity instruments (Violates SEBI Circular 2021).</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-error-container font-body-sm text-body-sm">
                      <span className="material-symbols-outlined text-[18px] text-error">check_circle</span>
                      <span>Fictitious registration string mimicking a Stock Broker code for an investment advisory pitch.</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-error-container font-body-sm text-body-sm">
                      <span className="material-symbols-outlined text-[18px] text-error">check_circle</span>
                      <span>Demanding transfer into third-party personal savings account via UPI.</span>
                    </div>
                  </div>
                </div>
                <div className="mt-space-md flex items-center gap-2 rounded-lg bg-surface-container-lowest/80 p-2 font-label-sm text-label-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px] text-error">gavel</span>
                  <span>Unregistered advisory constitutes a cognizable offense under Section 12A of SEBI Act 1992.</span>
                </div>
              </div>

              <div className="flex flex-col justify-between p-space-lg lg:col-span-7">
                <div className="flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-full bg-surface-container-high px-2.5 py-1 font-label-sm text-label-sm font-bold text-secondary">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      InvestorShield Ground Truth Evidence
                    </span>
                    <span className="font-label-sm text-label-sm text-on-tertiary-container font-bold flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-on-tertiary-container"></span> SEBI Master List Cross-Referenced
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2">
                    <div className="rounded-xl bg-surface-container-low p-space-sm">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Registration Validation</span>
                      <p className="font-headline-sm text-headline-sm text-error font-bold mt-1">FRAUDULENT ID</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Code INZ00029348 does not map to any active SEBI Research Analyst (RA) or Investment Adviser (IA).</p>
                    </div>
                    <div className="rounded-xl bg-surface-container-low p-space-sm">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">UPI Payment Risk Level</span>
                      <p className="font-headline-sm text-headline-sm text-error font-bold mt-1">HIGH (Mule Account)</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Associated VPA recipient flagged 14 times on National Cyber Crime Reporting Portal.</p>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-surface-container p-space-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-label-sm text-label-sm font-bold text-primary">Plain-Language Summary / எளிய விளக்கம்</span>
                      <span className="font-label-sm text-label-sm text-secondary">Dual Linguistic Parity</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface">
                      <strong>English:</strong> Legitimate SEBI registered advisers never guarantee intraday returns and are legally barred from taking money directly into personal bank accounts for pooled trading.
                    </p>
                    <p className="mt-2 font-body-md text-body-md text-on-surface-variant border-t border-outline-variant/30 pt-2">
                      <strong>தமிழ் (Tamil):</strong> செபி (SEBI) உரிமம் பெற்ற எந்த ஒரு ஆலோசகரும் உறுதியான லாபத்திற்கு உத்தரவாதம் அளிக்க மாட்டார்கள். தனிநபர் வங்கிக் கணக்குகளில் முதலீட்டுத் தொகையை அனுப்புவது நிதி மோசடியாகும்.
                    </p>
                  </div>
                </div>
                <div className="mt-space-md flex flex-wrap items-center justify-between gap-space-sm pt-space-sm">
                  <div className="flex items-center gap-space-xs">
                    <a className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 font-label-sm text-label-sm text-on-primary hover:bg-primary-container transition-all" href="https://scores.sebi.gov.in" rel="noreferrer" target="_blank">
                      <span className="material-symbols-outlined text-[16px]">report</span>
                      <span>Report to SEBI SCORES</span>
                    </a>
                    <a className="inline-flex items-center gap-1.5 rounded-lg bg-surface-container-high px-3 py-2 font-label-sm text-label-sm text-primary hover:bg-surface-container transition-all" href="https://cybercrime.gov.in" rel="noreferrer" target="_blank">
                      <span className="material-symbols-outlined text-[16px]">call</span>
                      <span>Dial 1930</span>
                    </a>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Report Reference: #IS-2025-9982</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-surface py-space-xl">
          <div className="mx-auto max-w-[1280px] px-margin md:px-margin-tablet lg:px-margin-desktop">
            <div className="flex flex-col items-center text-center">
              <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-secondary">WHY INVESTORSHIELD AI</span>
              <h2 className="font-headline-lg text-headline-lg text-primary">Purpose-Built for Indian Retail Security</h2>
              <p className="mt-2 max-w-xl font-body-lg text-body-lg text-on-surface-variant">
                Advanced fraud detection algorithms specifically calibrated to local vernaculars, Telegram syndicate patterns, and authentic SEBI regulatory frameworks.
              </p>
            </div>
            <div className="mt-space-xl grid grid-cols-1 gap-space-lg md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col justify-between rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container text-secondary">
                    <span className="material-symbols-outlined text-[26px]">radar</span>
                  </div>
                  <h3 className="mt-space-md font-headline-sm text-headline-sm text-primary">Deceptive Signal NLP</h3>
                  <p className="mt-space-xs font-body-md text-body-md text-on-surface-variant">
                    Proprietary heuristics detect high-urgency keywords, fake upper-circuit promises, and synthetic screenshots designed to trigger FOMO.
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs">
                  <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary font-bold">
                    <span>99.4% Detection Accuracy</span>
                    <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container text-secondary">
                    <span className="material-symbols-outlined text-[26px]">database</span>
                  </div>
                  <h3 className="mt-space-md font-headline-sm text-headline-sm text-primary">Direct Registry Sync</h3>
                  <p className="mt-space-xs font-body-md text-body-md text-on-surface-variant">
                    Every advisor registration number, corporate CIN, and depository participant link is matched live against official databases.
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs">
                  <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary font-bold">
                    <span>SEBI & RBI Intermediaries</span>
                    <span className="material-symbols-outlined text-[14px]">sync</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container text-secondary">
                    <span className="material-symbols-outlined text-[26px]">translate</span>
                  </div>
                  <h3 className="mt-space-md font-headline-sm text-headline-sm text-primary">Vernacular First</h3>
                  <p className="mt-space-xs font-body-md text-body-md text-on-surface-variant">
                    Full parity for regional languages starting with Tamil, ensuring tier-2, 3, and 4 investors understand complex securities warnings clearly.
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs">
                  <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary font-bold">
                    <span>English & தமிழ் Ready</span>
                    <span className="material-symbols-outlined text-[14px]">public</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container text-secondary">
                    <span className="material-symbols-outlined text-[26px]">shield_with_heart</span>
                  </div>
                  <h3 className="mt-space-md font-headline-sm text-headline-sm text-primary">Emergency 1-Click Escalation</h3>
                  <p className="mt-space-xs font-body-md text-body-md text-on-surface-variant">
                    Immediate pre-filled evidentiary dossiers ready for direct export to 1930 Cyber Cell and SEBI SCORES dispute resolution.
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs">
                  <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-error font-bold">
                    <span>Rapid Loss Mitigation</span>
                    <span className="material-symbols-outlined text-[14px]">bolt</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-surface-container-low py-space-xl">
          <div className="mx-auto max-w-[1280px] px-margin md:px-margin-tablet lg:px-margin-desktop">
            <div className="grid grid-cols-1 items-center gap-space-xl lg:grid-cols-12">
              <div className="flex flex-col gap-space-md lg:col-span-6">
                <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-secondary">REAL IMPACT ACROSS INDIA</span>
                <h2 className="font-headline-lg text-headline-lg text-primary">Protecting Over ₹18.4 Cr in Retail Capital</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant">
                  In 2024 alone, over 1.2 million citizens were targeted by bogus IPO syndicates, WhatsApp pump-and-dump channels, and algorithmic betting setups disguised as certified equity funds.
                </p>
                <div className="grid grid-cols-2 gap-space-md pt-space-sm sm:grid-cols-3">
                  <div className="flex flex-col rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
                    <span className="font-display-lg text-display-lg text-primary font-bold">42,800+</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Scam links flagged</span>
                  </div>
                  <div className="flex flex-col rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
                    <span className="font-display-lg text-display-lg text-secondary font-bold">98.2%</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Verification accuracy</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex flex-col rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
                    <span className="font-display-lg text-display-lg text-on-tertiary-container font-bold">&lt; 3.2s</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Analysis speed</span>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl bg-surface-container-lowest p-space-lg shadow-xl lg:col-span-6">
                <div className="flex items-center gap-space-sm mb-space-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-on-primary">
                    <span className="material-symbols-outlined text-[22px]">checklist</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-primary">The 4-Point Golden Shield Rule</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Essential checklist before transferring a single rupee</p>
                  </div>
                </div>
                <div className="flex flex-col gap-space-md">
                  <div className="flex items-start gap-space-sm rounded-xl bg-surface-container p-space-sm">
                    <span className="material-symbols-outlined text-secondary text-[22px]">check_box</span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-bold text-primary">Verify SEBI Registration Number</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Only engage with valid Research Analysts (INH...) or Investment Advisers (INA...).</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-space-sm rounded-xl bg-surface-container p-space-sm">
                    <span className="material-symbols-outlined text-secondary text-[22px]">check_box</span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-bold text-primary">No Demat Credentials Sharing</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Never disclose your TOTP, MPIN, or Password to any third-party portfolio manager.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-space-sm rounded-xl bg-surface-container p-space-sm">
                    <span className="material-symbols-outlined text-secondary text-[22px]">check_box</span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-bold text-primary">Reject Fixed "Guaranteed" Return Claims</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Equities inherently carry market risk. Guaranteeing returns is illegal under Indian law.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-space-sm rounded-xl bg-surface-container p-space-sm">
                    <span className="material-symbols-outlined text-secondary text-[22px]">check_box</span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-bold text-primary">Refuse Telegram / WhatsApp Payments</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">All financial transactions must run through licensed banking or broker accounts.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-surface py-space-xl">
          <div className="mx-auto max-w-[1280px] px-margin md:px-margin-tablet lg:px-margin-desktop">
            <div className="relative overflow-hidden rounded-3xl bg-primary p-space-xl text-on-primary shadow-xl">
              <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-secondary/30 blur-3xl"></div>
              <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-secondary-container/20 blur-2xl"></div>
              <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-container px-3.5 py-1 font-label-sm text-label-sm font-semibold text-secondary-fixed">
                  <span className="material-symbols-outlined text-[16px]">health_and_safety</span>
                  100% Free Public Utility for Bharat Investors
                </span>
                <h2 className="mt-space-md font-display-lg text-display-lg text-on-primary tracking-tight">
                  Received a suspicious financial link? <br/>
                  Let our AI inspect it in seconds.
                </h2>
                <p className="mt-space-sm max-w-xl font-body-lg text-body-lg text-primary-fixed">
                  Do not deposit money until verified. Copy the message, SMS, or Telegram URL and get an instant forensic breakdown.
                </p>
                <div className="mt-space-lg flex flex-wrap items-center justify-center gap-space-md">
                  <Link to="/analyze" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-secondary px-8 font-label-lg text-label-lg text-on-secondary shadow-lg hover:bg-secondary-container transition-all">
                    <span className="material-symbols-outlined text-[20px]">document_scanner</span>
                    <span>Test a Message Now</span>
                  </Link>
                  <a className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-surface-container-lowest px-6 font-label-lg text-label-lg text-primary shadow-sm hover:bg-surface-container transition-all" href="https://cybercrime.gov.in" rel="noreferrer" target="_blank">
                    <span className="material-symbols-outlined text-[20px]">emergency</span>
                    <span>Report Cyber Fraud</span>
                  </a>
                </div>
                <div className="mt-space-lg flex flex-wrap items-center justify-center gap-space-md text-surface-container-high font-label-sm text-label-sm">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">no_encryption</span> No login required
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">visibility_off</span> Zero data tracking
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">verified</span> SEBI-aligned guidelines
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-surface-container-low py-space-md">
          <div className="mx-auto max-w-[1280px] px-margin md:px-margin-tablet lg:px-margin-desktop">
            <div className="rounded-xl bg-surface-container/80 p-space-md">
              <div className="flex items-start gap-space-sm">
                <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">info</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  <strong>Statutory Notice & Regulatory Exemption:</strong> InvestorShield AI is an autonomous, open educational fraud-detection and financial safety intelligence platform. InvestorShield AI does NOT provide investment advice, equity tips, trading signals, portfolio management services, or stock buy/sell recommendations. InvestorShield AI is not registered as an Investment Adviser under the SEBI (Investment Advisers) Regulations, 2013. Always verify investment credentials independently through official government channels (SEBI, RBI, MCA).
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-[1280px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl mb-space-xl">
            <div className="lg:col-span-2 flex flex-col gap-space-md">
              <div className="flex items-center gap-space-sm">
                <div className="w-7 h-7 rounded-lg bg-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-secondary-container text-[18px]">shield</span>
                </div>
                <span className="font-headline-sm text-headline-sm text-primary">InvestorShield AI</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">Detect. Verify. Understand. Invest Safer. Empowering Indian retail investors across Tier-1 to Tier-4 regions with institutional-grade scam detection.</p>
              <div className="flex items-center gap-space-sm pt-space-xs">
                <span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[14px] text-on-tertiary-container">verified_user</span>SEBI Aligned Diligence
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-lg text-label-lg text-on-surface">Platform</span>
              <Link to="/" className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface">Home</Link>
              <Link to="/analyze" className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface">Analyze</Link>
              <Link to="/dashboard" className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface">Dashboard</Link>
              <Link to="/learn" className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface">Learn</Link>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-lg text-label-lg text-on-surface">Organisation</span>
              <Link to="/about" className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface">About Us</Link>
              <Link to="/privacy-policy" className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface">Privacy Policy</Link>
              <Link to="/terms-of-service" className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface">Terms of Service</Link>
              <Link to="/settings" className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface">Security Center</Link>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-lg text-label-lg text-on-surface">Official Portals</span>
              <a className="font-body-sm text-body-sm text-secondary hover:text-primary flex items-center gap-1" href="https://cybercrime.gov.in" rel="noreferrer" target="_blank">
                <span className="material-symbols-outlined text-[16px]">call</span>1930 Helpline
              </a>
              <a className="font-body-sm text-body-sm text-secondary hover:text-primary flex items-center gap-1" href="https://scores.sebi.gov.in" rel="noreferrer" target="_blank">
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>SEBI SCORES
              </a>
              <a className="font-body-sm text-body-sm text-secondary hover:text-primary flex items-center gap-1" href="https://sachet.rbi.org.in" rel="noreferrer" target="_blank">
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>RBI Sachet
              </a>
            </div>
          </div>
          <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md bg-surface-container/60 rounded-xl p-space-md">
            <p className="font-body-sm text-body-sm text-on-surface-variant text-center md:text-left">InvestorShield AI provides educational risk awareness. Not an investment adviser registered under SEBI IA Regulations 2013.</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">© 2025 InvestorShield AI (Bharat Guardian). All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
