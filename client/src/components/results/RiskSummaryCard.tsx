import React from 'react';
import { AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

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
  const getRiskStyles = (level: string) => {
    switch (level) {
      case 'High Number of Risk Indicators':
        return {
          card: 'text-error-dark bg-error/10 border-error/30',
          icon: <AlertTriangle className="w-8 h-8 mr-4 flex-shrink-0 text-error" />,
          pill1: 'text-error',
          pill2: 'text-on-surface'
        };
      case 'Potentially Risky':
        return {
          card: 'text-amber-800 bg-amber-100/10 border-amber-200/30',
          icon: <AlertTriangle className="w-8 h-8 mr-4 flex-shrink-0 text-amber-600" />,
          pill1: 'text-amber-800',
          pill2: 'text-on-surface'
        };
      case 'Low Indicators':
        return {
          card: 'text-on-tertiary-container bg-tertiary-fixed/10 border-tertiary-fixed-dim/30',
          icon: <ShieldCheck className="w-8 h-8 mr-4 flex-shrink-0 text-on-tertiary-container" />,
          pill1: 'text-on-tertiary-container',
          pill2: 'text-on-surface'
        };
      default:
        return {
          card: 'text-on-surface bg-surface-container-low border-surface-container-highest',
          icon: <HelpCircle className="w-8 h-8 mr-4 flex-shrink-0 text-secondary" />,
          pill1: 'text-secondary',
          pill2: 'text-on-surface'
        };
    }
  };

  const styles = getRiskStyles(riskLevel);

  return (
    <div className={`p-8 rounded-3xl border shadow-sm ${styles.card}`}>
      <div className="flex items-start">
        {styles.icon}
        <div>
          <h2 className="font-headline-lg text-headline-lg font-bold mb-2 tracking-tight">{riskLevel}</h2>
          <p className="font-medium opacity-90 leading-relaxed text-lg">{riskSummary}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-4 font-label-lg text-label-lg font-bold ml-12">
        <span className="flex items-center bg-surface-container-lowest px-4 py-2 rounded-lg border border-surface-container-highest shadow-sm">
          <span className={`${styles.pill1} mr-1.5`}>{indicatorCount}</span> Warning Signs
        </span>
        <span className="flex items-center bg-surface-container-lowest px-4 py-2 rounded-lg border border-surface-container-highest shadow-sm">
          <span className={`${styles.pill2} mr-1.5 text-secondary`}>{claimCount}</span> Financial Claims
        </span>
      </div>
    </div>
  );
};
