import React from 'react';
import type { EducationItem } from '../../types/analysis.types';
import { BookOpen, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

interface EducationSectionProps {
  education: EducationItem[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  if (!education || education.length === 0) {
    return (
      <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-surface-container-highest p-8 text-center">
        <h3 className="font-extrabold text-on-surface text-xl mb-3">Learn From This Analysis</h3>
        <p className="text-on-surface-variant">No specific warning-sign topics were identified for this analysis. You can explore the Investor Learning Center to build general verification skills.</p>
        <a href="/learn" className="inline-block mt-6 px-6 py-2.5 bg-secondary-fixed text-secondary font-bold rounded-xl border border-primary/10 hover:bg-secondary/10 transition-colors">
          Visit Learning Center →
        </a>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-surface-container-highest p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-surface-container-highest pb-6">
        <div>
          <div className="flex items-center mb-2">
            <BookOpen className="w-6 h-6 text-secondary mr-3" />
            <h3 className="font-extrabold text-on-surface text-2xl tracking-tight">Learn From This Analysis</h3>
          </div>
          <p className="text-on-surface-variant font-medium">These lessons are based on the warning signs and claims identified in the content you submitted.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((edu, index) => (
          <div key={index} className="bg-surface-container-low rounded-3xl border border-surface-container-highest overflow-hidden flex flex-col h-full group hover:border-primary/30 transition-colors shadow-sm">
            <div className="p-5 bg-surface-container-lowest border-b border-surface-container-highest flex items-center">
              <ShieldCheck className="w-5 h-5 text-secondary mr-2" />
              <h4 className="font-bold text-on-surface text-lg">{edu.title}</h4>
            </div>
            
            <div className="p-6 flex-1 space-y-6">
              <div>
                <h5 className="font-label-sm text-label-sm font-bold text-secondary mb-2 uppercase tracking-widest flex items-center">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-1.5"></span> Why this matters
                </h5>
                <p className="text-sm text-text-main font-medium leading-relaxed">{edu.whyItMatters}</p>
                <p className="text-sm text-text-main mt-2 leading-relaxed">{edu.explanation}</p>
              </div>

              {edu.whatToLookFor && (
                <div className="bg-amber-100/5 p-4 rounded-2xl border border-amber-200/20">
                  <h5 className="font-label-sm text-label-sm font-bold text-amber-800 mb-2 flex items-center uppercase tracking-widest">
                    <AlertTriangle className="w-3.5 h-3.5 mr-1 text-amber-600" /> What to look for
                  </h5>
                  <p className="flex items-start text-sm text-text-main">
                    <span className="text-amber-600 mr-2 font-bold">•</span>
                    {edu.whatToLookFor}
                  </p>
                </div>
              )}

              {edu.whatToCheck && (
                <div>
                  <h5 className="font-label-sm text-label-sm font-bold text-on-surface mb-2 uppercase tracking-widest flex items-center">
                    <BookOpen className="w-3 h-3 mr-1.5 text-on-surface" /> What to check
                  </h5>
                  <p className="flex items-start text-sm text-text-main">
                    <span className="text-secondary mr-2 font-bold">→</span>
                    {edu.whatToCheck}
                  </p>
                </div>
              )}
            </div>
            
            <div className="p-5 bg-tertiary-fixed/10 border-t border-tertiary-fixed-dim/20 mt-auto">
              <h5 className="font-label-sm text-label-sm font-bold text-on-tertiary-container uppercase tracking-widest mb-1.5 flex items-center">
                <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> Safe Habit
              </h5>
              <p className="text-sm text-on-surface font-bold leading-relaxed">{edu.safeHabit}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center pt-8 border-t border-surface-container-highest">
        <a href="/learn" className="inline-flex items-center text-secondary font-bold hover:text-on-surface transition-colors px-6 py-3 bg-surface-container-low rounded-xl border border-surface-container-highest group">
          Explore all topics in the Learning Center 
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </div>
  );
};
