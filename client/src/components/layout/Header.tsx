import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../i18n';

export const Header: React.FC = () => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Logo + Tagline */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900 tracking-tight leading-none">InvestorShield AI</span>
            <span className="text-xs text-gray-500 font-medium mt-1">{t('nav.tagline')}</span>
          </div>
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden md:flex space-x-1">
          {[
            { path: '/', label: t('nav.home') },
            { path: '/analyze', label: t('nav.analyze') },
            { path: '/learn', label: t('nav.learn') },
            { path: '/history', label: t('nav.history') },
            { path: '/about', label: t('nav.about') }
          ].map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                isActive(item.path) 
                  ? 'text-blue-700 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center text-sm font-medium border border-gray-200 rounded-lg p-1">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-md transition-colors ${language === 'en' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
              aria-label="Switch language to English"
              aria-pressed={language === 'en'}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('ta')}
              className={`px-2 py-1 rounded-md transition-colors ${language === 'ta' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
              aria-label="Switch language to Tamil"
              aria-pressed={language === 'ta'}
            >
              தமிழ்
            </button>
          </div>
          
          <button className="hidden sm:flex text-gray-400 hover:text-gray-600 transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>

          <Link 
            to="/analyze" 
            className="hidden sm:inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
          >
            {t('nav.analyzeContent')}
          </Link>

          {/* Mobile menu button (visual only for now) */}
          <button className="md:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
};
