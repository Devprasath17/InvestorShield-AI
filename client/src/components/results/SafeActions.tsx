import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SafeActionsProps {
  actions: string[];
}

export const SafeActions: React.FC<SafeActionsProps> = ({ actions }) => {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-status-success/10 to-status-success/5 rounded-3xl shadow-sm border border-tertiary-fixed-dim/20 p-6 sm:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-6 opacity-10">
        <ShieldCheck className="w-32 h-32 text-on-tertiary-container" />
      </div>
      <h3 className="font-extrabold text-on-tertiary-container text-xl mb-6 flex items-center relative z-10">
        <ShieldCheck className="w-6 h-6 mr-2 text-on-tertiary-container" />
        Stay Safe: Recommended Next Steps
      </h3>
      <ul className="space-y-4 relative z-10 max-w-2xl">
        {actions.map((action, index) => (
          <li key={index} className="flex items-start bg-surface-container-lowest/80 p-4 rounded-xl border border-tertiary-fixed-dim/20 shadow-sm backdrop-blur-sm">
            <CheckCircle2 className="w-5 h-5 mr-3 text-on-tertiary-container flex-shrink-0 mt-0.5" />
            <span className="text-on-surface font-bold leading-relaxed">{action}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
