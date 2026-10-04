import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col w-full animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out motion-reduce:animate-none">
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden pt-space-lg pb-space-xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-surface-container-high/60 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center relative z-10">
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm tracking-wide uppercase mb-space-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
              <span>{t('about.badge')}</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-primary tracking-tight mb-space-md">
              {t('about.title1')} <span className="text-secondary">{t('about.title2')}</span> {t('about.title3')}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed mb-space-lg">
              {t('about.desc')}
            </p>
            <div className="flex flex-wrap items-center gap-space-sm">
              <Link to="/analyze" className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md hover:bg-primary hover:-translate-y-[1px] active:scale-[0.98] transition-all duration-200">
                <span className="material-symbols-outlined text-[20px]">security_update_warning</span>
                <span>{t('about.btnAnalyze')}</span>
              </Link>
              <a href="#pipeline" className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-lg bg-surface-container-lowest text-primary font-label-lg text-label-lg shadow-sm hover:bg-surface-container hover:-translate-y-[1px] active:scale-[0.98] transition-all duration-200">
                <span className="material-symbols-outlined text-[20px]">account_tree</span>
                <span>{t('about.btnArchitecture')}</span>
              </a>
            </div>
            <div className="mt-space-lg flex items-center gap-space-md pt-space-md">
              <div className="flex items-center -space-x-2">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm flex items-center justify-center font-bold ring-2 ring-surface-container-lowest">SEBI</div>
                <div className="w-8 h-8 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm flex items-center justify-center font-bold ring-2 ring-surface-container-lowest">RBI</div>
                <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold ring-2 ring-surface-container-lowest">MCA</div>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">{t('about.statutoryDesc')}</span>
            </div>
          </div>
          {/* Hero Visual Shield Composition */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center p-space-md">
              {/* Background Concentric Rings */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-surface-container-lowest via-surface-container-low to-surface-container-high shadow-xl"></div>
              <div className="absolute inset-6 rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-sm"></div>
              {/* Central Shield Core */}
              <div className="relative z-20 w-32 h-36 rounded-2xl bg-gradient-to-b from-primary to-primary-container text-on-primary flex flex-col items-center justify-center shadow-2xl">
                <span className="material-symbols-outlined text-[44px] text-tertiary-fixed mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                <span className="font-label-sm text-label-sm tracking-wider uppercase font-bold text-center px-2">Public Shield</span>
              </div>
              {/* Orbital Node 1: Content Input (Top Left) */}
              <div className="absolute top-4 left-8 z-20 w-16 h-16 rounded-2xl bg-surface-container-lowest shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform group">
                <span className="material-symbols-outlined text-[24px] text-secondary">chat</span>
                <span className="font-label-sm text-[10px] text-on-surface-variant mt-0.5 font-semibold">Input</span>
              </div>
              {/* Orbital Node 2: Detection (Top Right) */}
              <div className="absolute top-4 right-8 z-20 w-16 h-16 rounded-2xl bg-surface-container-lowest shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform group">
                <span className="material-symbols-outlined text-[24px] text-error">troubleshoot</span>
                <span className="font-label-sm text-[10px] text-on-surface-variant mt-0.5 font-semibold">Detect</span>
              </div>
              {/* Orbital Node 3: Verification (Right Center) */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-2xl bg-surface-container-lowest shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform group">
                <span className="material-symbols-outlined text-[24px] text-tertiary-container">policy</span>
                <span className="font-label-sm text-[10px] text-on-surface-variant mt-0.5 font-semibold">Verify</span>
              </div>
              {/* Orbital Node 4: Education (Bottom Right) */}
              <div className="absolute bottom-4 right-10 z-20 w-16 h-16 rounded-2xl bg-surface-container-lowest shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform group">
                <span className="material-symbols-outlined text-[24px] text-secondary-container">school</span>
                <span className="font-label-sm text-[10px] text-on-surface-variant mt-0.5 font-semibold">Educate</span>
              </div>
              {/* Orbital Node 5: Safe Action Lock (Bottom Left) */}
              <div className="absolute bottom-4 left-10 z-20 w-16 h-16 rounded-2xl bg-surface-container-lowest shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform group">
                <span className="material-symbols-outlined text-[24px] text-primary">lock_open</span>
                <span className="font-label-sm text-[10px] text-on-surface-variant mt-0.5 font-semibold">Action</span>
              </div>
              {/* Connecting Decorative Circuit Lines (Inline SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none text-outline-variant/30" fill="none" viewBox="0 0 400 400">
                <circle cx="200" cy="200" r="140" stroke="currentColor" strokeDasharray="4 6" strokeWidth="1.5"></circle>
                <line stroke="currentColor" strokeWidth="1.5" x1="100" x2="160" y1="80" y2="150"></line>
                <line stroke="currentColor" strokeWidth="1.5" x1="300" x2="240" y1="80" y2="150"></line>
                <line stroke="currentColor" strokeWidth="1.5" x1="330" x2="260" y1="200" y2="200"></line>
                <line stroke="currentColor" strokeWidth="1.5" x1="290" x2="230" y1="320" y2="250"></line>
                <line stroke="currentColor" strokeWidth="1.5" x1="110" x2="170" y1="320" y2="250"></line>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PRODUCT MISSION (ELEVATED & CENTERED) */}
      <section className="my-space-xl relative">
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg md:p-space-xl shadow-md relative overflow-hidden text-center max-w-4xl mx-auto">
          <div className="w-20 h-1 bg-secondary-container mx-auto mb-space-md rounded-full"></div>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold mb-space-xs block">
            Our Mission
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight max-w-2xl mx-auto mb-space-md">
            Make financial safety information easier to understand and easier to verify.
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-space-lg">
            Financial messages often create manufactured pressure, confusion, and psychological vulnerability. InvestorShield AI provides retail citizens with an objective, evidence-backed pause button: slowing down urgency, deconstructing deceptive claims, referencing statutory registries, and instilling lasting resilience.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md pt-space-md">
            <div className="p-space-md rounded-xl bg-surface-container-low text-left">
              <div className="font-display-lg text-display-lg text-primary mb-1 font-bold">1930</div>
              <span className="font-label-md text-label-md font-semibold text-primary block">Cyber Helpline First</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Instant gateway for victims under financial duress.</span>
            </div>
            <div className="p-space-md rounded-xl bg-surface-container-low text-left">
              <div className="font-display-lg text-display-lg text-secondary mb-1 font-bold">0%</div>
              <span className="font-label-md text-label-md font-semibold text-primary block">Subjective Advice</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Strictly facts grounded in public regulatory filings.</span>
            </div>
            <div className="p-space-md rounded-xl bg-surface-container-low text-left">
              <div className="font-display-lg text-display-lg text-tertiary-container mb-1 font-bold">2+</div>
              <span className="font-label-md text-label-md font-semibold text-primary block">Bilingual Grounding</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Tamil & English native parity for linguistic clarity.</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FROM MESSAGE TO CLARITY (5-STEP PROCESS PIPELINE) */}
      <section className="my-space-xl" id="pipeline">
        <div className="flex flex-col items-center text-center mb-space-lg">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Operational Workflow</span>
          <h2 className="font-headline-lg text-headline-lg text-primary mt-1">From Suspicious Message to Absolute Clarity</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-2">
            A deliberate five-phase pipeline engineered to strip fear and replace it with verifiable statutory truth.
          </p>
        </div>
        {/* Horizontal Process Pipeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-space-md relative">
          {/* Step 1 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 relative">
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-display-lg text-headline-lg text-outline-variant font-black">01</span>
                <span className="w-10 h-10 rounded-lg bg-surface-container-high text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">radar</span>
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-1">Detect</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Scan for psychological triggers, guaranteed yield claims, high pressure timers, and executive impersonation cues.
              </p>
            </div>
            <div className="mt-space-md pt-space-xs">
              <span className="font-label-sm text-[10px] uppercase font-bold text-secondary tracking-wider">Trigger Analysis</span>
            </div>
          </div>
          {/* Step 2 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 relative">
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-display-lg text-headline-lg text-outline-variant font-black">02</span>
                <span className="w-10 h-10 rounded-lg bg-surface-container-high text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-1">Verify</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Cross-reference entity names, registration claims, and URLs against SEBI, RBI Sachet, MCA-21, and AMFI repositories.
              </p>
            </div>
            <div className="mt-space-md pt-space-xs">
              <span className="font-label-sm text-[10px] uppercase font-bold text-secondary tracking-wider">Statutory Query</span>
            </div>
          </div>
          {/* Step 3 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 relative">
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-display-lg text-headline-lg text-outline-variant font-black">03</span>
                <span className="w-10 h-10 rounded-lg bg-surface-container-high text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">translate</span>
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-1">Explain</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Translate dense regulatory jargon into accessible plain language and native vernaculars (English & Tamil).
              </p>
            </div>
            <div className="mt-space-md pt-space-xs">
              <span className="font-label-sm text-[10px] uppercase font-bold text-secondary tracking-wider">Linguistic Parity</span>
            </div>
          </div>
          {/* Step 4 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 relative">
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-display-lg text-headline-lg text-outline-variant font-black">04</span>
                <span className="w-10 h-10 rounded-lg bg-surface-container-high text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">lightbulb</span>
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-1">Educate</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Deliver bite-sized micro-lessons unpacking the exact economic mechanism behind the scam (e.g. Pump & Dump, Ponzi loop).
              </p>
            </div>
            <div className="mt-space-md pt-space-xs">
              <span className="font-label-sm text-[10px] uppercase font-bold text-secondary tracking-wider">Micro-Curriculum</span>
            </div>
          </div>
          {/* Step 5 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 relative">
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-display-lg text-headline-lg text-outline-variant font-black">05</span>
                <span className="w-10 h-10 rounded-lg bg-surface-container-high text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">shield</span>
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-1">Safe Action</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Direct reporting links to National Cyber Crime Portal (1930), SEBI SCORES, and instant evidence packet backup.
              </p>
            </div>
            <div className="mt-space-md pt-space-xs">
              <span className="font-label-sm text-[10px] uppercase font-bold text-secondary tracking-wider">Citizen Defense</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: BUILT AROUND UNDERSTANDING, NOT FEAR (3 CORE TENETS) */}
      <section className="my-space-xl">
        <div className="mb-space-lg">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Guiding Philosophy</span>
          <h2 className="font-headline-lg text-headline-lg text-primary mt-1">Built Around Understanding, Not Fear</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
            Most security utilities rely on terrifying threat meters and flashing sirens. We ground investors in structural literacy and empirical truth.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center mb-space-md">
                <span className="material-symbols-outlined text-[26px]">fact_check</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-space-xs">Evidence First</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Claims are verified against public regulatory registries rather than subjective opinions or algorithmic assumptions. If SEBI, RBI, or MCA has no record, that absence is clearly declared with statutory context.
              </p>
            </div>
            <div className="mt-space-lg p-space-sm rounded-lg bg-surface-container-low flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px]">database</span>
              <span className="font-label-sm text-label-sm text-primary font-semibold">Zero Speculative Weight</span>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center mb-space-md">
                <span className="material-symbols-outlined text-[26px]">visibility</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-space-xs">Explainable AI</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Clear deconstruction of every warning indicator without cryptic risk scores or arbitrary percentages. We tell you exactly what phrases violate Indian advertising standards and why guaranteed yields are illegal.
              </p>
            </div>
            <div className="mt-space-lg p-space-sm rounded-lg bg-surface-container-low flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px]">psychology</span>
              <span className="font-label-sm text-label-sm text-primary font-semibold">Full Reasoning Logs</span>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center mb-space-md">
                <span className="material-symbols-outlined text-[26px]">school</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-space-xs">Education Driven</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Every suspicious interaction is turned into a resilient financial literacy learning opportunity. By understanding how the trick functions, the investor becomes permanently immunized against future mutations.
              </p>
            </div>
            <div className="mt-space-lg p-space-sm rounded-lg bg-surface-container-low flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px]">auto_stories</span>
              <span className="font-label-sm text-label-sm text-primary font-semibold">Lifelong Investor Immunity</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHAT INVESTORSHIELD IS NOT (HIGH-CONTRAST DEEP BLUE SECTION) */}
      <section className="my-space-xl">
        <div className="bg-primary text-on-primary rounded-2xl p-space-lg md:p-space-xl shadow-xl relative overflow-hidden">
          {/* Decorative Backdrop Geometry */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/10 w-fit text-tertiary-fixed font-label-sm text-label-sm uppercase tracking-wider mb-space-sm">
              <span className="material-symbols-outlined text-[16px]">gavel</span>
              <span>Statutory Boundaries & Compliance</span>
            </div>
            <h2 className="font-display-lg text-headline-lg md:text-display-lg text-on-primary mb-space-xs">
              InvestorShield is not your financial advisor.
            </h2>
            <p className="font-body-lg text-body-lg text-surface-variant max-w-2xl mb-space-lg">
              Clear statutory boundaries are vital to protect public integrity and uphold SEBI (Research Analyst / Investment Adviser) regulations:
            </p>
            {/* 4 Negative Boundaries */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md mb-space-lg">
              <div className="flex items-start gap-space-sm p-space-md rounded-xl bg-surface-container-lowest/5 hover:bg-surface-container-lowest/10 transition-colors">
                <span className="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0 font-bold">✕</span>
                <div>
                  <span className="font-label-lg text-label-lg text-on-primary block font-semibold">No Stock Recommendations</span>
                  <p className="font-body-sm text-body-sm text-surface-variant mt-0.5">We never endorse or rate specific equities, crypto tokens, mutual funds, or derivatives.</p>
                </div>
              </div>
              <div className="flex items-start gap-space-sm p-space-md rounded-xl bg-surface-container-lowest/5 hover:bg-surface-container-lowest/10 transition-colors">
                <span className="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0 font-bold">✕</span>
                <div>
                  <span className="font-label-lg text-label-lg text-on-primary block font-semibold">No Market Predictions</span>
                  <p className="font-body-sm text-body-sm text-surface-variant mt-0.5">We do not forecast bull/bear trends, gold movements, index targets, or price movements.</p>
                </div>
              </div>
              <div className="flex items-start gap-space-sm p-space-md rounded-xl bg-surface-container-lowest/5 hover:bg-surface-container-lowest/10 transition-colors">
                <span className="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0 font-bold">✕</span>
                <div>
                  <span className="font-label-lg text-label-lg text-on-primary block font-semibold">No Portfolio Management</span>
                  <p className="font-body-sm text-body-sm text-surface-variant mt-0.5">We hold zero custodial authority and never manage, rebalance, or solicit client funds.</p>
                </div>
              </div>
              <div className="flex items-start gap-space-sm p-space-md rounded-xl bg-surface-container-lowest/5 hover:bg-surface-container-lowest/10 transition-colors">
                <span className="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0 font-bold">✕</span>
                <div>
                  <span className="font-label-lg text-label-lg text-on-primary block font-semibold">No Return Guarantees</span>
                  <p className="font-body-sm text-body-sm text-surface-variant mt-0.5">All capital market activities contain risk. Any claim of guaranteed profit is inherently illicit.</p>
                </div>
              </div>
            </div>
            {/* Reassurance Callout Box */}
            <div className="p-space-md rounded-xl bg-surface-container-lowest/10 flex items-center gap-space-md">
              <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">verified</span>
              </div>
              <div>
                <span className="font-label-md text-label-md text-tertiary-fixed font-bold uppercase tracking-wider block">Our Sole Mandate</span>
                <p className="font-body-md text-body-md text-on-primary font-medium">
                  Instead, InvestorShield AI equips you with objective regulatory knowledge, forensic literacy, and registry verification so you never act in the dark.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: OUR SAFETY PRINCIPLES (4 CARDS) */}
      <section className="my-space-xl">
        <div className="flex flex-col mb-space-lg">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Institutional Standards</span>
          <h2 className="font-headline-lg text-headline-lg text-primary mt-1">Our Safety Principles</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
            How we maintain mathematical impartiality and protect citizens from both malicious actors and accidental misinformation.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Principle 1 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-surface-container-high text-primary flex items-center justify-center mb-space-sm">
                <span className="material-symbols-outlined text-[22px]">flaky</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-1">No False Certainty</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                "No Evidence Found" does not mean False. We never declare unverified claims definitively authentic just because a registry query came up empty.
              </p>
            </div>
            <div className="mt-space-md pt-space-xs">
              <span className="font-label-sm text-label-sm text-secondary font-semibold">Strict Evidentiary Bar</span>
            </div>
          </div>
          {/* Principle 2 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-surface-container-high text-primary flex items-center justify-center mb-space-sm">
                <span className="material-symbols-outlined text-[22px]">handshake</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-1">No Investment Advice</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                We strictly evaluate communication patterns, deceptive psychology, and statutory adherence, never investment merits or valuation logic.
              </p>
            </div>
            <div className="mt-space-md pt-space-xs">
              <span className="font-label-sm text-label-sm text-secondary font-semibold">Unbiased Linguistic Audit</span>
            </div>
          </div>
          {/* Principle 3 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-surface-container-high text-primary flex items-center justify-center mb-space-sm">
                <span className="material-symbols-outlined text-[22px]">policy</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-1">Evidence Matters</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Claims must be corroborated by statutory registries (SEBI, RBI Sachet, MCA) before credibility is granted. Anonymity is treated with caution.
              </p>
            </div>
            <div className="mt-space-md pt-space-xs">
              <span className="font-label-sm text-label-sm text-secondary font-semibold">Public Registry Grounding</span>
            </div>
          </div>
          {/* Principle 4 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-surface-container-high text-primary flex items-center justify-center mb-space-sm">
                <span className="material-symbols-outlined text-[22px]">vpn_key_off</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-1">Zero Sensitive Exposure</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                No citizen should ever disclose OTPs, Demat passwords, or bank logins. InvestorShield scrubs personal identifiers before any analysis runs.
              </p>
            </div>
            <div className="mt-space-md pt-space-xs">
              <span className="font-label-sm text-label-sm text-secondary font-semibold">Client-Side Sanitization</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: TECHNOLOGY & PIPELINE OVERVIEW */}
      <section className="my-space-xl">
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg md:p-space-xl shadow-md">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-md">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">System Infrastructure</span>
              <h2 className="font-headline-lg text-headline-lg text-primary mt-1">Architected for Explainable AI & Public Resilience</h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-1">
                Built as an explainable, multi-stage pipeline combining OCR, bilingual LLMs, and real-time public regulatory database lookups.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-primary font-semibold">Registry Query Nodes: Active</span>
            </div>
          </div>
          {/* Horizontal System Flow Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-space-sm bg-surface-container-low p-space-md rounded-xl mb-space-lg">
            {/* Node 1 */}
            <div className="p-space-sm bg-surface-container-lowest rounded-lg shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary text-[18px]">perm_media</span>
                <span className="font-label-sm text-label-sm font-bold text-primary">01. Citizen Input</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Unstructured WhatsApp, Telegram text, or uploaded screenshot.</span>
            </div>
            {/* Node 2 */}
            <div className="p-space-sm bg-surface-container-lowest rounded-lg shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-secondary text-[18px]">document_scanner</span>
                <span className="font-label-sm text-label-sm font-bold text-primary">02. OCR Extraction</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Tesseract / Indic OCR parses Tamil script, numbers, and phone handles.</span>
            </div>
            {/* Node 3 */}
            <div className="p-space-sm bg-surface-container-lowest rounded-lg shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary-container text-[18px]">neurology</span>
                <span className="font-label-sm text-label-sm font-bold text-primary">03. Multilingual NLP</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Gemini guardrails decompose psychological urgency & claim patterns.</span>
            </div>
            {/* Node 4 */}
            <div className="p-space-sm bg-surface-container-lowest rounded-lg shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-secondary-container text-[18px]">database</span>
                <span className="font-label-sm text-label-sm font-bold text-primary">04. Registry Query</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Live check against SEBI Intermediaries, MCA-21, and RBI Sachet logs.</span>
            </div>
            {/* Node 5 */}
            <div className="p-space-sm bg-surface-container-lowest rounded-lg shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-tertiary-container text-[18px]">recommend</span>
                <span className="font-label-sm text-label-sm font-bold text-primary">05. Action Engine</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Plain English & Tamil verdict with one-tap 1930 reporting payload.</span>
            </div>
          </div>
          {/* Tech Stack Badges */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pt-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Core Frameworks & Verified Data Sources:</span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-medium">React</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-medium">Tailwind CSS</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-medium">Node.js Engine</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-medium">Google Gemini Pro</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-medium">Indic Tesseract OCR</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-medium">SEBI / RBI Public APIs</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: DESIGNED FOR RESPONSIBLE AI */}
      <section className="my-space-xl">
        <div className="mb-space-lg text-center max-w-2xl mx-auto">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Public Trust Commitment</span>
          <h2 className="font-headline-lg text-headline-lg text-primary mt-1">Designed for Responsible AI</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            We adhere to strict ethical AI governance to guarantee user sovereignty, data dignity, and uncompromised regulatory alignment.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* 1: Transparent */}
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-[28px] text-secondary mb-2">visibility</span>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-1">Transparent</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Clear attribution for every finding. We cite exact SEBI advisory circulars, MCA master records, and legal statutes used in analysis.
              </p>
            </div>
          </div>
          {/* 2: Evidence-Grounded */}
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-[28px] text-secondary mb-2">verified_user</span>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-1">Evidence-Grounded</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Zero hallucinated confidence. Predictions without matching statutory records explicitly surface their data limits to the user.
              </p>
            </div>
          </div>
          {/* 3: Privacy-Aware */}
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-[28px] text-secondary mb-2">security</span>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-1">Privacy-Aware</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Zero PII storage. Phone numbers, bank accounts, and investor identities are scrubbed locally before analysis tokens leave your browser.
              </p>
            </div>
          </div>
          {/* 4: Human Agency */}
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-[28px] text-secondary mb-2">front_hand</span>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-1">Human Agency</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                The investor retains complete control. InvestorShield informs and clarifies; it never makes financial or legal decisions on your behalf.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: FINAL ACTION CARD */}
      <section className="my-space-xl">
        <div className="bg-gradient-to-r from-primary-container via-primary to-primary text-on-primary rounded-2xl p-space-lg md:p-space-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-space-lg">
          <div className="max-w-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed block mb-2 font-bold">Safe Financial Habitation</span>
            <h2 className="font-headline-lg text-headline-lg text-on-primary mb-2">
              Understand Before You Act.
            </h2>
            <p className="font-body-md text-body-md text-surface-variant">
              Have a WhatsApp message, Telegram group invite, or high-yield stock tip you are unsure about? Verify its regulatory footprint in seconds.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-space-sm shrink-0 w-full sm:w-auto">
            <Link to="/analyze" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 h-12 rounded-lg bg-surface-container-lowest text-primary font-label-lg text-label-lg font-bold shadow-md hover:bg-surface-container-low hover:-translate-y-[1px] active:scale-[0.98] transition-all duration-200">
              <span>Analyze Content Now</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
            <Link to="/learn" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 h-12 rounded-lg bg-surface-container-lowest/10 text-on-primary font-label-lg text-label-lg font-bold hover:bg-surface-container-lowest/20 hover:-translate-y-[1px] active:scale-[0.98] transition-all duration-200">
              <span className="material-symbols-outlined text-[18px]">school</span>
              <span>Explore Learning Center</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
