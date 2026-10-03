import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface RiskSummaryCardProps {
  riskLevel: string;
  riskSummary: string;
  indicatorCount: number;
  claimCount: number;
}

export const RiskSummaryCard: React.FC<RiskSummaryCardProps> = ({
  riskLevel,
  riskSummary,
  indicatorCount,
  claimCount,
}) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High Number of Risk Indicators':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'Potentially Risky':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Low Indicators':
        return 'text-green-700 bg-green-50 border-green-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`p-6 rounded-xl border ${getRiskColor(riskLevel)}`}>
      <div className="flex items-start">
        <AlertTriangle className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <h2 className="text-xl font-bold mb-1">{riskLevel}</h2>
          <p>{riskSummary}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
        <span className="flex items-center bg-white/50 px-3 py-1 rounded-full">
          <span className="text-red-600 font-bold mr-1">{indicatorCount}</span> Warning Signs
        </span>
        <span className="flex items-center bg-white/50 px-3 py-1 rounded-full">
          <span className="text-blue-600 font-bold mr-1">{claimCount}</span> Financial Claims
        </span>
      </div>
    </div>
  );
};
