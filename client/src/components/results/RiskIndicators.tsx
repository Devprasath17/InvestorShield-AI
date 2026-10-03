import React from 'react';
import { AlertTriangle } from 'lucide-react';
import type { RiskIndicator } from '../../types/analysis.types';

interface RiskIndicatorsProps {
  indicators: RiskIndicator[];
}

export const RiskIndicators: React.FC<RiskIndicatorsProps> = ({ indicators }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="font-bold text-gray-900 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
          Warning Signs ({indicators.length} detected)
        </h3>
      </div>
      <div className="divide-y divide-gray-100">
        {indicators.map((indicator, index) => (
          <div key={index} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">{indicator.type}</h4>
              <span className={`px-2 py-1 text-xs font-bold uppercase rounded ${
                indicator.severity === 'high' ? 'bg-red-100 text-red-800' :
                indicator.severity === 'medium' ? 'bg-amber-100 text-amber-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {indicator.severity}
              </span>
            </div>
            <blockquote className="border-l-4 border-gray-300 pl-3 italic text-gray-600 text-sm mb-3">
              "{indicator.evidence}"
            </blockquote>
            <p className="text-sm text-gray-700">{indicator.explanation}</p>
          </div>
        ))}
        {indicators.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No major warning indicators were detected from the available content.
          </div>
        )}
      </div>
    </div>
  );
};
