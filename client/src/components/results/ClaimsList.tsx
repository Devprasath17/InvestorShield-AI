import React from 'react';
import type { Claim } from '../../types/analysis.types';

interface ClaimsListProps {
  claims: Claim[];
}

export const ClaimsList: React.FC<ClaimsListProps> = ({ claims }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="font-bold text-gray-900">Extracted Claims ({claims.length} detected)</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {claims.map((claim, index) => (
          <div key={index} className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <span className="text-sm text-gray-500 mb-1 sm:mb-0">Claim {String(index + 1).padStart(2, '0')}</span>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                claim.status === 'Needs Verification' || claim.status === 'No Evidence Found' ? 'bg-amber-100 text-amber-800' :
                claim.status === 'Verified' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {claim.status}
              </span>
            </div>
            <p className="font-medium text-gray-900 mb-2">"{claim.text}"</p>
            <div className="text-sm text-gray-600 mb-4">
              <strong>Why?</strong><br />
              {claim.explanation}
            </div>
            
            {claim.evidence && claim.evidence.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-bold text-gray-900 mb-3">Evidence</h4>
                <div className="space-y-3">
                  {claim.evidence.map((ev, i) => {
                    return (
                      <div key={i} className="bg-gray-50 rounded p-3 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-medium text-gray-900">{ev.sourceName}</div>
                            {ev.isOfficial && (
                              <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold uppercase rounded">
                                Official Source
                              </span>
                            )}
                          </div>
                          <a 
                            href={ev.sourceUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:text-blue-800 border border-blue-200 rounded px-2 py-1"
                          >
                            View Source
                          </a>
                        </div>
                        <div className="text-xs text-gray-500 mb-1">
                          Relationship: <span className="font-medium">{ev.relationship}</span>
                        </div>
                        <div className="text-xs font-semibold text-gray-700 mt-2 mb-1">AI Interpretation of Source:</div>
                        <blockquote className="border-l-2 border-gray-300 pl-2 text-xs italic text-gray-700">
                          {ev.relevantText}
                        </blockquote>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {(!claim.evidence || claim.evidence.length === 0) && claim.status === 'No Evidence Found' && (
              <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                <p>We did not find relevant evidence in the trusted sources searched.</p>
                <p className="mt-1 italic">No Evidence Found ≠ False</p>
              </div>
            )}
          </div>
        ))}
        {claims.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No specific financial claims were identified.
          </div>
        )}
      </div>
    </div>
  );
};
