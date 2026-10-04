import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEducationTopics } from '../services/api';
import type { EducationItem } from '../types/analysis.types';
import { 
  ArrowLeft, AlertTriangle, ShieldCheck, Search, 
  ClipboardCheck, ArrowRight, Shield, CheckCircle
} from 'lucide-react';

export const LearnDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<EducationItem | null>(null);
  const [relatedTopics, setRelatedTopics] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        setLoading(true);
        const response = await getEducationTopics();
        if (response.success && response.topics) {
          const foundTopic = response.topics.find(t => t.id === id);
          if (foundTopic) {
            setTopic(foundTopic);
            
            // Find related topics
            const others = response.topics.filter(t => t.id !== id);
            const shuffled = [...others].sort(() => 0.5 - Math.random());
            setRelatedTopics(shuffled.slice(0, 3));
          } else {
            setError('Topic not found.');
          }
        } else {
          setError(response.error || 'Failed to load topic.');
        }
      } catch (err) {
        setError('An error occurred while connecting to the server.');
      } finally {
        setLoading(false);
      }
    };
    fetchTopic();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full max-w-[1440px] mx-auto p-4 md:p-8 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium">Loading learning content...</p>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="w-full max-w-[1440px] mx-auto p-4 md:p-8">
        <button 
          onClick={() => navigate('/learn')}
          className="flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Learn
        </button>
        <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-2xl text-center max-w-2xl mx-auto shadow-sm">
          <AlertTriangle className="w-8 h-8 mx-auto mb-3" />
          <h3 className="font-bold mb-1">Unable to Load Topic</h3>
          <p className="text-sm">{error || 'Topic not found.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto p-4 md:p-8 font-sans text-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out motion-reduce:animate-none">
      
      <button 
        onClick={() => navigate('/learn')}
        className="flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Learn
      </button>

      {/* Main Content */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 mb-12 shadow-sm">
        <div className="mb-8 border-b border-slate-100 pb-6">
          <span className="bg-[#0F2D6B] text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded mb-4 inline-block">
            {topic.topic}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F2D6B] tracking-tight leading-tight mb-4">
            {topic.title}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            {topic.explanation}
          </p>
        </div>

        <div className="space-y-8">
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mr-4 mt-0.5 border border-blue-100 shrink-0">
              <ClipboardCheck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Why This Matters</h3>
              <p className="text-slate-600 leading-relaxed">{topic.whyItMatters}</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mr-4 mt-0.5 border border-red-100 shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">What to Look For</h3>
              <p className="text-slate-600 leading-relaxed">{topic.whatToLookFor}</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mr-4 mt-0.5 border border-slate-200 shrink-0">
              <Search className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">What to Check</h3>
              <p className="text-slate-600 leading-relaxed">{topic.whatToCheck}</p>
            </div>
          </div>

          <div className="flex items-start bg-[#f0f4ff] p-5 rounded-2xl border border-blue-100">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mr-4 mt-0.5 border border-blue-200 shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0F2D6B] mb-2">Safe Habit</h3>
              <p className="text-slate-700 leading-relaxed">{topic.safeHabit}</p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Quick Checklist */}
      <div className="bg-[#0F2D6B] rounded-3xl p-8 md:p-10 text-white mb-16 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-5 pointer-events-none">
          <Shield className="w-96 h-96 -translate-y-20 translate-x-20" />
        </div>
        <div className="relative z-10 max-w-4xl">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <CheckCircle className="w-6 h-6 mr-3 text-blue-300" />
            Before You Invest: Quick Verification
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center mr-3 shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-blue-200"></div>
              </div>
              <span className="text-blue-50 text-lg">Who sent it? Check the source.</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center mr-3 shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-blue-200"></div>
              </div>
              <span className="text-blue-50 text-lg">What return is being promised? High returns with no risk is impossible.</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center mr-3 shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-blue-200"></div>
              </div>
              <span className="text-blue-50 text-lg">Is the person creating urgency? Stop and take 24 hours.</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center mr-3 shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-blue-200"></div>
              </div>
              <span className="text-blue-50 text-lg">Are they asking for payment through an unusual method? Be careful with UPI or crypto.</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center mr-3 shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-blue-200"></div>
              </div>
              <span className="text-blue-50 text-lg">Are they asking for sensitive information like OTP or Demat login? Never share this.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Related Topics */}
      {relatedTopics.length > 0 && (
        <div>
          <h3 className="text-2xl font-extrabold text-[#0F2D6B] mb-6">Related Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTopics.map((relTopic, index) => (
              <div 
                key={relTopic.id || index}
                onClick={() => navigate(`/learn/${relTopic.id}`)}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all duration-200 cursor-pointer group flex flex-col h-full"
              >
                <div className="mb-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest bg-blue-50 text-blue-600 inline-block mb-2">
                    {relTopic.topic}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2 leading-snug">{relTopic.title}</h4>
                <p className="text-sm text-slate-500 mb-6 flex-1 leading-relaxed line-clamp-3">{relTopic.whyItMatters}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                  <span className="text-sm font-bold text-blue-600 group-hover:text-[#0F2D6B] transition-colors flex items-center">
                    Learn More <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
