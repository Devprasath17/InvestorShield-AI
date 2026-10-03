import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Search, 
  BookOpen, 
  Clock, 
  Info, 
  Settings, 
  HelpCircle,
  Bell,
  User,
  ShieldCheck,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X,
  Globe
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path));

  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen]);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Shield },
    { path: '/analyze', label: 'Analyze', icon: Search },
    { path: '/history', label: 'History', icon: Clock },
    { path: '/learn', label: 'Learn', icon: BookOpen },
    { path: '/about', label: 'About', icon: Info },
  ];

  const bottomNavItems = [
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  // Helper to get page title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path.startsWith('/analyze')) return 'Analyze Financial Content';
    if (path.startsWith('/history')) return 'Analysis History';
    if (path.startsWith('/learn')) return 'Learning Center';
    if (path.startsWith('/about')) return 'How It Works';
    if (path.startsWith('/settings')) return 'Settings';
    return '';
  };

  const activeTopIndex = navItems.findIndex((item) => isActive(item.path));
  const activeBottomIndex = bottomNavItems.findIndex((item) => isActive(item.path));

  return (
    <div className="min-h-screen bg-surface-container flex flex-col md:flex-row font-sans text-on-surface selection:bg-secondary-fixed selection:text-secondary">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-surface-container-lowest border-b border-surface-container-highest flex items-center justify-between p-4 sticky top-0 z-50 shadow-sm">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <ShieldCheck className="w-7 h-7 text-secondary" />
          <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface">InvestorShield AI</span>
        </Link>
        <button className="text-on-surface-variant active:scale-95 transition-transform duration-200">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-surface-container-lowest border-r border-surface-container-highest fixed h-full z-40 shadow-sm">
        {/* Logo Area */}
        <div className="px-6 py-8 border-b border-surface-container-highest/50">
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <div className="bg-secondary/10 p-2 rounded-xl group-hover:bg-secondary/20 group-active:scale-95 transition-all duration-300">
              <ShieldCheck className="w-7 h-7 text-secondary group-hover:scale-105 transition-transform duration-300" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col group-hover:translate-x-0.5 transition-transform duration-300">
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none mb-1">InvestorShield AI</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider">FINANCIAL SAFETY</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 flex flex-col gap-1 overflow-y-auto overflow-x-hidden relative">
          {/* Active Indicator Background */}
          <div 
            className={`absolute left-4 right-4 h-11 rounded-xl bg-secondary shadow-sm shadow-secondary/25 transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-0 motion-reduce:transition-none ${
              activeTopIndex >= 0 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ top: '24px', transform: `translateY(${activeTopIndex * 48}px)` }}
          />

          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={`relative z-10 flex items-center space-x-3 px-3 h-11 rounded-xl font-label-lg text-label-lg font-normal transition-all duration-300 group motion-reduce:transition-none ${
                isActive(item.path) 
                  ? 'text-white' 
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <item.icon 
                className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 group-active:scale-95 motion-reduce:transition-none ${isActive(item.path) ? 'text-white scale-105' : 'text-on-surface-variant'}`} 
                strokeWidth={isActive(item.path) ? 2.5 : 2} 
              />
              <span className="group-hover:translate-x-0.5 transition-transform duration-300 motion-reduce:transition-none">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Nav & Footer */}
        <div className="p-4 border-t border-surface-container-highest/50 flex flex-col gap-1 relative">
          {/* Active Indicator Bottom */}
          <div 
            className={`absolute left-4 right-4 h-11 rounded-xl bg-secondary shadow-sm shadow-secondary/25 transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-0 motion-reduce:transition-none ${
              activeBottomIndex >= 0 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ top: '16px', transform: `translateY(${activeBottomIndex * 48}px)` }}
          />

          {bottomNavItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={`relative z-10 flex items-center space-x-3 px-3 h-11 rounded-xl font-label-lg text-label-lg font-normal transition-all duration-300 group motion-reduce:transition-none ${
                isActive(item.path) 
                  ? 'text-white' 
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <item.icon 
                className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 group-active:scale-95 motion-reduce:transition-none ${isActive(item.path) ? 'text-white scale-105' : 'text-on-surface-variant'}`} 
                strokeWidth={isActive(item.path) ? 2.5 : 2} 
              />
              <span className="group-hover:translate-x-0.5 transition-transform duration-300 motion-reduce:transition-none">{item.label}</span>
            </Link>
          ))}

          <div className="mt-4 px-3 relative z-10">
             <div className="flex items-center justify-between text-xs font-medium text-on-surface-variant bg-surface-container px-3 py-2 rounded-lg border border-surface-container-highest transition-all duration-200 hover:shadow-sm">
                <span className="text-on-surface font-semibold">EN</span>
                <span className="text-border">|</span>
                <span className="hover:text-on-surface cursor-pointer transition-colors active:scale-95 inline-block">தமிழ்</span>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64 min-w-0">
        
        {/* Top Header */}
        <header className="bg-surface-container/80 backdrop-blur-md h-20 sticky top-0 z-30 hidden md:flex items-center justify-between px-8 border-b border-surface-container-highest/50">
          <div>
            <h1 className="text-2xl font-bold text-on-surface tracking-tight animate-in fade-in duration-300 ease-out">{getPageTitle()}</h1>
          </div>
          
          <div className="flex items-center space-x-5">
            <button className="relative p-2 text-on-surface-variant hover:bg-white hover:shadow-sm rounded-full transition-all border border-transparent hover:border-surface-container-highest active:scale-95 group">
              <Bell className="w-5 h-5 group-hover:text-secondary transition-colors" strokeWidth={2} />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-status-danger border-2 border-bg-subtle rounded-full animate-pulse"></span>
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-white hover:shadow-sm rounded-full transition-all border border-transparent hover:border-surface-container-highest active:scale-95 group">
              <HelpCircle className="w-5 h-5 group-hover:text-secondary transition-colors" strokeWidth={2} />
            </button>
            
            <div className="h-9 w-9 rounded-full bg-secondary-fixed border border-primary/20 flex items-center justify-center text-secondary overflow-hidden ml-2 shadow-inner cursor-pointer hover:bg-secondary/20 hover:scale-105 active:scale-95 transition-all">
              <User className="w-5 h-5" strokeWidth={2} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-[1200px] w-full mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out motion-reduce:animate-none">
          {children}
        </main>
      </div>
    </div>
  );
};
