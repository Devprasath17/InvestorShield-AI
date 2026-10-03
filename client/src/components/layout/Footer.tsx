import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">InvestorShield AI</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm mb-6">
              Smarter Analysis. Safer Investments.
            </p>
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
              InvestorShield AI provides informational and educational assistance by identifying potential warning signs in financial content. It does not provide investment, trading, or financial advice.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Navigation</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/analyze" className="text-sm hover:text-blue-400 transition-colors">Analyze</Link></li>
              <li><Link to="/learn" className="text-sm hover:text-blue-400 transition-colors">Learning Center</Link></li>
              <li><Link to="/history" className="text-sm hover:text-blue-400 transition-colors">History</Link></li>
              <li><Link to="/about" className="text-sm hover:text-blue-400 transition-colors">About</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Information</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors">How It Works</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors">Disclaimer</a></li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-gray-500">
            &copy; 2026 InvestorShield AI. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-4 text-xs text-gray-500">
             <span>Designed for everyday investors in India.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
