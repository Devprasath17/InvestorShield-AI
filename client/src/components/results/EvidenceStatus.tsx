import React from 'react';
import { Info } from 'lucide-react';
import type { Evidence } from '../../types/analysis.types';

interface EvidenceStatusProps { 
  evidence?: Evidence[];
}

export const EvidenceStatus: React.FC<EvidenceStatusProps> = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="font-bold text-gray-900">Evidence Status</h3>
      </div>
      <div className="p-4 bg-blue-50 text-sm text-blue-800 flex items-start">
        <Info className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <p className="mb-2"><strong>Independent verification has not yet been performed.</strong></p>
          <p>
            <strong>No Evidence Found ≠ False</strong><br/>
            The absence of evidence does not automatically mean a claim is false. It highlights that the claim requires further independent verification.
          </p>
        </div>
      </div>
    </div>
  );
};
