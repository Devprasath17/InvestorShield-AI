import React from 'react';
import type { EducationItem } from '../../types/analysis.types';
import { BookOpen, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

interface EducationSectionProps {
  education: EducationItem[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  if (!education || education.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
        <h3 className="font-bold text-gray-900 text-lg mb-2">Learn From This Analysis</h3>
        <p className="text-sm text-gray-600">No specific warning-sign topics were identified for this analysis. You can explore the Investor Learning Center to build general verification skills.</p>
        <a href="/learn" className="inline-block mt-4 text-blue-600 font-medium hover:text-blue-800 text-sm">
          Visit Learning Center →
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
        <h3 className="font-bold text-gray-900 text-lg">Learn From This Analysis</h3>
      </div>
      <p className="text-sm text-gray-600 mb-6">These lessons are based on the warning signs and claims identified in the content you submitted.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((edu, index) => (
          <div key={index} className="bg-blue-50/50 rounded-xl border border-blue-100 overflow-hidden flex flex-col h-full">
            <div className="p-4 bg-blue-50 border-b border-blue-100 flex items-center">
              <ShieldCheck className="w-5 h-5 text-blue-700 mr-2" />
              <h4 className="font-bold text-blue-900">{edu.title}</h4>
            </div>
            
            <div className="p-5 flex-1 space-y-4">
              <div>
                <h5 className="text-sm font-bold text-gray-900 mb-1">Why this matters</h5>
                <p className="text-sm text-gray-700">{edu.whyItMatters}</p>
                <p className="text-sm text-gray-700 mt-2">{edu.explanation}</p>
              </div>

              {edu.warningSigns && edu.warningSigns.length > 0 && (
                <div>
                  <h5 className="text-sm font-bold text-gray-900 mb-1 flex items-center">
                    <AlertTriangle className="w-3.5 h-3.5 mr-1 text-amber-500" /> What to look for
                  </h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    {edu.warningSigns.map((sign, i) => (
                      <li key={i}>{sign}</li>
                    ))}
                  </ul>
                </div>
              )}

              {edu.whatToCheck && edu.whatToCheck.length > 0 && (
                <div>
                  <h5 className="text-sm font-bold text-gray-900 mb-1">What to check</h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    {edu.whatToCheck.map((check, i) => (
                      <li key={i}>{check}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="p-4 bg-green-50 border-t border-green-100 mt-auto">
              <h5 className="text-xs font-bold text-green-800 uppercase mb-1 flex items-center">
                <CheckCircle className="w-3.5 h-3.5 mr-1" /> Safe Habit
              </h5>
              <p className="text-sm text-green-900 font-medium">{edu.safeHabit}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center pt-6 border-t border-gray-100">
        <a href="/learn" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
          Explore all topics in the Learning Center →
        </a>
      </div>
    </div>
  );
};
