import React from 'react';
import type { Claim } from '../../types/analysis.types';
import { Search, Info, Link as LinkIcon } from 'lucide-react';

interface ClaimsListProps {
  claims: Claim[];
}

export const ClaimsList: React.FC<ClaimsListProps> = ({ claims }) => {
  return (
    <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-surface-container-highest overflow-hidden">
      <div className="p-5 border-b border-surface-container-highest bg-surface-container-low flex items-center justify-between">
        <h3 className="font-bold text-on-surface flex items-center text-lg">
          <Search className="w-5 h-5 mr-2 text-secondary" />
          Extracted Claims
        </h3>
        <span className="font-label-md text-label-md font-bold text-secondary bg-secondary-fixed px-3 py-1 rounded-full border border-primary/20">
          {claims.length} Extracted
        </span>
      </div>
      <div className="divide-y divide-border">
        {claims.map((claim, index) => (
          <div key={index} className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <span className="text-xs font-extrabold text-secondary uppercase tracking-widest mb-2 sm:mb-0">
                Claim {String(index + 1).padStart(2, '0')}
              </span>
              <span className={`px-3 py-1 font-label-sm text-label-sm font-bold uppercase tracking-widest rounded-full border ${
                claim.status === 'Needs Verification' || claim.status === 'No Evidence Found' ? 'bg-amber-100/10 text-amber-800 border-amber-200/30' :
                claim.status === 'Verified' ? 'bg-tertiary-fixed/10 text-on-tertiary-container border-tertiary-fixed-dim/30' :
                'bg-error/10 text-error-dark border-error/30'
              }`}>
                {claim.status}
              </span>
            </div>
            
            <p className="font-bold text-on-surface text-lg mb-4 leading-tight">"{claim.text}"</p>
            
            <div className="text-sm text-text-main mb-6 leading-relaxed">
              <strong className="text-on-surface mr-2 block mb-1 flex items-center"><Info className="w-4 h-4 mr-1 text-secondary" /> Why verify this?</strong>
              {claim.explanation}
            </div>
            
            {claim.evidence && claim.evidence.length > 0 && (
              <div className="mt-6 pt-6 border-t border-surface-container-highest">
                <h4 className="text-xs font-extrabold text-on-surface uppercase tracking-widest mb-4">Verification Evidence</h4>
                <div className="space-y-4">
                  {claim.evidence.map((ev, i) => {
                    return (
                      <div key={i} className="bg-surface-container-low rounded-2xl p-4 border border-surface-container-highest">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                          <div>
                            <div className="font-bold text-on-surface">{ev.sourceName}</div>
                            {ev.isOfficial && (
                              <span className="inline-block mt-1 px-2 py-0.5 bg-secondary-fixed text-secondary font-label-sm text-label-sm font-bold uppercase tracking-wider rounded border border-primary/20">
                                Official Source
                              </span>
                            )}
                          </div>
                          <a 
                            href={ev.sourceUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center font-label-md text-label-md font-bold text-secondary hover:text-on-surface bg-surface-container-lowest border border-surface-container-highest rounded-lg px-3 py-1.5 transition-colors shadow-sm"
                          >
                            <LinkIcon className="w-3 h-3 mr-1" /> View Source
                          </a>
                        </div>
                        
                        <div className="text-xs text-on-surface-variant mb-3 bg-surface-container-lowest inline-block px-2 py-1 rounded border border-surface-container-highest">
                          Relationship: <span className="font-bold text-on-surface">{ev.relationship}</span>
                        </div>
                        
                        <div className="bg-surface-container-lowest rounded-xl p-3 border border-surface-container-highest mt-1">
                          <div className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-on-surface-variant mb-1">AI Interpretation:</div>
                          <blockquote className="font-body-sm text-body-sm text-text-main leading-relaxed">
                            {ev.relevantText}
                          </blockquote>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {(!claim.evidence || claim.evidence.length === 0) && claim.status === 'No Evidence Found' && (
              <div className="mt-6 pt-5 border-t border-surface-container-highest">
                <div className="bg-amber-100/5 border border-amber-200/20 p-4 rounded-xl text-sm text-amber-800">
                  <p className="font-medium mb-2">We did not find relevant evidence in the trusted sources searched.</p>
                  <p className="font-label-md text-label-md font-bold uppercase tracking-wider opacity-80">No Evidence Found ≠ False</p>
                </div>
              </div>
            )}
          </div>
        ))}
        {claims.length === 0 && (
          <div className="p-10 text-center text-on-surface-variant font-medium">
            No specific financial claims were identified for verification.
          </div>
        )}
      </div>
    </div>
  );
};
