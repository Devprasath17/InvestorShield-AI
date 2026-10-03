import { useState, useEffect } from 'react';
import { getEducationTopics } from '../services/api';
import type { EducationItem } from '../types/analysis.types';
import { BookOpen, ShieldCheck, AlertTriangle, CheckCircle } from 'lucide-react';

export const LearnPage: React.FC = () => {
  const [topics, setTopics] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await getEducationTopics();
        if (response.success && response.topics) {
          setTopics(response.topics);
        } else {
          setError(response.error || 'Failed to load topics.');
        }
      } catch (err) {
        setError('An error occurred while connecting to the server.');
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
          <BookOpen className="w-8 h-8 text-blue-700" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Investor Learning Center</h1>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Build your verification skills and learn how to identify common warning signs in financial communications.
        </p>
      </div>

      {loading && (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {topics.map((edu, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
              <div className="p-5 bg-blue-50 border-b border-blue-100 flex items-center">
                <ShieldCheck className="w-6 h-6 text-blue-700 mr-3" />
                <h3 className="font-bold text-gray-900 text-lg">{edu.title}</h3>
              </div>
              
              <div className="p-6 flex-1 space-y-5">
                <div>
                  <h5 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider text-blue-800">Why this matters</h5>
                  <p className="text-gray-700">{edu.whyItMatters}</p>
                  <p className="text-gray-700 mt-2">{edu.explanation}</p>
                </div>

                {edu.warningSigns && edu.warningSigns.length > 0 && (
                  <div>
                    <h5 className="text-sm font-bold text-gray-900 mb-2 flex items-center uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 mr-1.5 text-amber-500" /> What to look for
                    </h5>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {edu.warningSigns.map((sign, i) => (
                        <li key={i}>{sign}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {edu.whatToCheck && edu.whatToCheck.length > 0 && (
                  <div>
                    <h5 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider text-blue-800">What to check</h5>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {edu.whatToCheck.map((check, i) => (
                        <li key={i}>{check}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="p-5 bg-green-50 border-t border-green-100 mt-auto">
                <h5 className="text-xs font-bold text-green-800 uppercase mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1.5" /> Safe Habit
                </h5>
                <p className="text-green-900 font-medium">{edu.safeHabit}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
