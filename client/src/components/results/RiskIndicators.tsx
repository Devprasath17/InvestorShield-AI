import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import type { RiskIndicator } from '../../types/analysis.types';

interface RiskIndicatorsProps {
  indicators: RiskIndicator[];
}

export const RiskIndicators: React.FC<RiskIndicatorsProps> = ({ indicators }) => {
  return (
    <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-surface-container-highest overflow-hidden">
      <div className="p-5 border-b border-surface-container-highest bg-surface-container-low flex items-center justify-between">
        <h3 className="font-bold text-on-surface flex items-center text-lg">
          <AlertTriangle className="w-5 h-5 mr-2 text-error" />
          Detected Risk Signals
        </h3>
        <span className="font-label-md text-label-md font-bold text-error-dark bg-error/10 px-3 py-1 rounded-full border border-error/30">
          {indicators.length} Found
        </span>
      </div>
      <div className="divide-y divide-border">
        {indicators.map((indicator, index) => (
          <div key={index} className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <h4 className="font-bold text-on-surface text-lg">{indicator.type}</h4>
              <span className={`px-3 py-1 font-label-sm text-label-sm font-bold uppercase tracking-widest rounded-full border mt-2 sm:mt-0 ${
                indicator.severity === 'high' ? 'bg-error/10 text-error-dark border-error/30' :
                indicator.severity === 'medium' ? 'bg-amber-100/10 text-amber-800 border-amber-200/30' :
                'bg-secondary-fixed text-secondary border-primary/20'
              }`}>
                {indicator.severity} Severity
              </span>
            </div>
            <div className="bg-surface-container-low rounded-xl p-4 border border-surface-container-highest mb-4">
              <p className="font-label-md text-label-md font-bold text-on-surface-variant uppercase tracking-widest mb-2 flex items-center">
                <Info className="w-3.5 h-3.5 mr-1" /> Flagged Content
              </p>
              <blockquote className="italic text-on-surface font-body-sm text-body-sm">
                "{indicator.evidence}"
              </blockquote>
            </div>
            <p className="text-sm text-text-main leading-relaxed">
              <strong className="text-on-surface mr-2">Why it's flagged:</strong>
              {indicator.explanation}
            </p>
          </div>
        ))}
        {indicators.length === 0 && (
          <div className="p-10 text-center text-on-surface-variant font-medium">
            No major warning indicators were detected from the available content.
          </div>
        )}
      </div>
    </div>
  );
};
