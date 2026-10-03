import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SafeActionsProps {
  actions: string[];
}

export const SafeActions: React.FC<SafeActionsProps> = ({ actions }) => {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center">
        <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
        Stay Safe: Recommended Next Steps
      </h3>
      <ul className="space-y-3">
        {actions.map((action, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{action}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
