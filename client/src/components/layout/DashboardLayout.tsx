import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bell,
  BookOpen,
  Clock,
  HelpCircle,
  Info,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  User,
  X,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path));

  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;

    try {
      const saved = window.localStorage.getItem('sidebarCollapsed');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
    }
  }, [isCollapsed]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileOpen) {
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
  const ToggleIcon = isCollapsed ? PanelLeftOpen : PanelLeftClose;

  const renderSidebarItem = (item: { path: string; label: string; icon: typeof Shield }) => {
    const current = isActive(item.path);

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`group relative z-10 flex items-center h-11 rounded-xl font-label-lg text-label-lg font-normal transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          isCollapsed ? 'justify-center px-0' : 'justify-start px-3'
        } ${
          current
            ? 'text-white'
            : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
        }`}
        aria-label={item.label}
      >
        <span
          className={`relative flex items-center justify-center rounded-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            current ? 'bg-white/10 text-white shadow-sm' : 'bg-transparent text-current'
          } ${
            isCollapsed ? 'h-10 w-10' : 'h-5 w-5'
          }`}
        >
          <item.icon
            className={`w-5 h-5 shrink-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-active:scale-95 ${
              current ? 'text-white scale-105' : 'text-current group-hover:scale-110'
            }`}
            strokeWidth={current ? 2.5 : 2}
          />
        </span>

        <span
          className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            isCollapsed
              ? 'pointer-events-none opacity-0 w-0 -translate-x-2'
              : 'opacity-100 w-auto translate-x-0 ml-3'
          }`}
        >
          {item.label}
        </span>

        {isCollapsed && (
          <span
            className="pointer-events-none absolute left-full top-1/2 z-20 ml-2 -translate-y-1/2 rounded-md border border-surface-container-highest bg-surface-container-lowest px-2 py-1 text-[11px] font-medium text-on-surface shadow-sm opacity-0 -translate-x-1 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:translate-x-0"
          >
            {item.label}
          </span>
        )}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col md:flex-row font-sans text-on-surface selection:bg-secondary-fixed selection:text-secondary">
      <div className="md:hidden bg-surface-container-lowest/80 backdrop-blur-md border-b border-surface-container-highest flex items-center justify-between p-4 sticky top-0 z-50 shadow-sm">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <ShieldCheck className="w-7 h-7 text-secondary" />
          <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface">InvestorShield AI</span>
        </Link>

        <button
          type="button"
          aria-label="Open navigation menu"
          onClick={() => setIsMobileOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-surface-container-highest bg-surface-container text-on-surface-variant transition-all duration-200 active:scale-95"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-slate-900/25 backdrop-blur-[1px] transition-opacity duration-300 md:hidden ${isMobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        aria-hidden={!isMobileOpen}
        onClick={() => setIsMobileOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-surface-container-highest bg-surface-container-lowest shadow-xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-surface-container-highest/70 px-4 py-4">
          <Link to="/dashboard" className="flex items-center gap-2" onClick={() => setIsMobileOpen(false)}>
            <ShieldCheck className="h-6 w-6 text-secondary" />
            <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface">InvestorShield AI</span>
          </Link>

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsMobileOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-surface-container-highest bg-surface-container text-on-surface-variant transition-all duration-200 hover:bg-surface-container hover:text-primary active:scale-95"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => renderSidebarItem(item))}
        </nav>

        <div className="border-t border-surface-container-highest/70 p-3">
          {bottomNavItems.map((item) => renderSidebarItem(item))}
        </div>
      </aside>

      <aside
        className={`hidden md:flex flex-col border-r border-surface-container-highest bg-surface-container-lowest shadow-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isCollapsed ? 'w-19' : 'w-64'
        }`}
      >
        <div className="flex items-center justify-between border-b border-surface-container-highest/70 px-3 py-4">
          {isCollapsed ? (
            <div className="flex w-full justify-center">
              <Link to="/dashboard" className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-all duration-200 hover:bg-secondary/15 active:scale-95">
                <ShieldCheck className="h-5 w-5" />
              </Link>
            </div>
          ) : (
            <Link to="/dashboard" className="flex flex-1 items-center gap-3 overflow-hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-all duration-200 hover:bg-secondary/15">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-headline-sm text-headline-sm tracking-tight text-on-surface">InvestorShield AI</div>
                <div className="truncate font-label-sm text-label-sm uppercase tracking-[0.12em] text-on-surface-variant">Financial Safety</div>
              </div>
            </Link>
          )}

          <button
            type="button"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={() => setIsCollapsed((previous) => !previous)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-surface-container-highest bg-surface-container text-on-surface-variant shadow-sm transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-surface-container hover:text-primary active:scale-95"
          >
            <ToggleIcon className="h-4.5 w-4.5 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          </button>
        </div>

        <div className="relative flex flex-1 flex-col overflow-hidden px-3 py-4">
          <div
            className={`absolute left-3 right-3 h-11 rounded-xl bg-secondary shadow-sm shadow-secondary/25 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              activeTopIndex >= 0 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              top: `${16 + activeTopIndex * 48}px`,
              transform: isCollapsed ? 'scale(0.96)' : 'scale(1)',
            }}
          />

          <nav className="relative z-10 flex flex-col gap-1">
            {navItems.map((item) => renderSidebarItem(item))}
          </nav>

          <div className="mt-2 border-t border-surface-container-highest/70 pt-3">
            <div
              className={`absolute left-3 right-3 h-11 rounded-xl bg-secondary shadow-sm shadow-secondary/25 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                activeBottomIndex >= 0 ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                top: `${16 + navItems.length * 48 + activeBottomIndex * 48}px`,
                transform: isCollapsed ? 'scale(0.96)' : 'scale(1)',
              }}
            />

            {bottomNavItems.map((item) => renderSidebarItem(item))}
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:ml-0">
        <header className="hidden h-20 items-center justify-between border-b border-surface-container-highest/50 bg-surface-container/80 px-8 backdrop-blur-md md:flex">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-on-surface">{getPageTitle()}</h1>
          </div>

          <div className="flex items-center space-x-5">
            <button className="group relative rounded-full border border-transparent p-2 text-on-surface-variant transition-all duration-200 hover:border-surface-container-highest hover:bg-white hover:shadow-sm active:scale-95">
              <Bell className="h-5 w-5 transition-colors group-hover:text-secondary" strokeWidth={2} />
              <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-bg-subtle bg-status-danger animate-pulse" />
            </button>

            <button className="group rounded-full border border-transparent p-2 text-on-surface-variant transition-all duration-200 hover:border-surface-container-highest hover:bg-white hover:shadow-sm active:scale-95">
              <HelpCircle className="h-5 w-5 transition-colors group-hover:text-secondary" strokeWidth={2} />
            </button>

            <div className="ml-2 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-secondary-fixed text-secondary shadow-inner transition-all duration-200 hover:scale-105 hover:bg-secondary/20 active:scale-95">
              <User className="h-5 w-5" strokeWidth={2} />
            </div>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-300 flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
