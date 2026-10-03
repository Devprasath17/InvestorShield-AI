import React from 'react';
import { Info, HelpCircle } from 'lucide-react';
import type { Evidence } from '../../types/analysis.types';

interface EvidenceStatusProps { 
  evidence?: Evidence[];
}

export const EvidenceStatus: React.FC<EvidenceStatusProps> = () => {
  return (
    <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-surface-container-highest overflow-hidden">
      <div className="p-5 border-b border-surface-container-highest bg-surface-container-low flex items-center gap-2">
        <HelpCircle className="w-5 h-5 text-secondary" />
        <h3 className="font-bold text-on-surface text-lg">Evidence Status</h3>
      </div>
      <div className="p-6 bg-secondary-fixed/50 border-t-2 border-primary/20 text-sm text-text-main flex flex-col sm:flex-row items-start gap-4">
        <div className="bg-surface-container-lowest p-2 rounded-full border border-surface-container-highest shadow-sm flex-shrink-0">
          <Info className="w-6 h-6 text-secondary" />
        </div>
        <div className="pt-1">
          <p className="mb-3 font-bold text-on-surface text-base">Independent verification has not yet been performed.</p>
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container-highest shadow-sm">
            <h4 className="font-extrabold text-xs uppercase tracking-widest text-secondary mb-2">No Evidence Found ≠ False</h4>
            <p className="text-on-surface-variant leading-relaxed">
              The absence of evidence does not automatically mean a claim is false. It highlights that the claim requires further independent verification before you act on it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
