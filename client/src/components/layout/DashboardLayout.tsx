import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Search, 
  BookOpen, 
  Clock, 
  Info, 
  Settings, 
  Globe, 
  HelpCircle,
  Bell,
  User
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path));

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Shield },
    { path: '/analyze', label: 'Analyze', icon: Search },
    { path: '/learn', label: 'Learn', icon: BookOpen },
    { path: '/history', label: 'History', icon: Clock },
    { path: '/about', label: 'About', icon: Info },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row font-sans text-gray-900">
      
      {/* Mobile Header (visible only on small screens) */}
      <div className="md:hidden bg-white border-b border-gray-200 flex items-center justify-between p-4 sticky top-0 z-50">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-blue-700" />
          <span className="font-bold text-gray-900">InvestorShield</span>
        </Link>
        <button className="text-gray-500">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>

      {/* Sidebar (hidden on mobile) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-40">
        {/* Logo Area */}
        <div className="p-6 border-b border-gray-100">
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors shadow-sm">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 tracking-tight leading-tight">InvestorShield AI</span>
              <span className="text-[10px] text-gray-500 font-medium">Smarter Analysis. Safer Investments.</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.path) 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-blue-600' : 'text-gray-400'}`} />
              <span>{item.label}</span>
              {isActive(item.path) && (
                <div className="absolute left-0 w-1 h-8 bg-blue-600 rounded-r-full"></div>
              )}
            </Link>
          ))}
        </nav>

        {/* Bottom Safety Card */}
        <div className="p-4 border-t border-gray-100">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-blue-700" />
              <span className="text-xs font-bold text-blue-900">Your Safety Matters</span>
            </div>
            <p className="text-[10px] text-blue-800 leading-tight">
              Make informed decisions with trusted insights.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64 min-w-0">
        
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 sticky top-0 z-30 hidden md:flex items-center justify-between px-8">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Your investor safety overview</p>
          </div>
          
          <div className="flex items-center space-x-5">
            {/* Language Selector */}
            <div className="flex items-center text-xs text-gray-500 font-medium border border-gray-200 rounded-lg px-2 py-1.5 cursor-not-allowed bg-gray-50">
              <Globe className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
              <span className="text-gray-900">EN</span>
              <span className="mx-1.5 text-gray-300">|</span>
              <span className="text-gray-400">தமிழ்</span>
            </div>
            
            <div className="h-6 w-px bg-gray-200"></div>
            
            <button className="text-gray-400 hover:text-gray-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
            
            <div className="h-8 w-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 overflow-hidden ml-2 cursor-pointer">
              <User className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
