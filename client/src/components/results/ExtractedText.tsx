import React, { useState } from 'react';
import { Image as ImageIcon, Copy, Check } from 'lucide-react';

interface ExtractedTextProps {
  text: string;
}

export const ExtractedText: React.FC<ExtractedTextProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <ImageIcon className="w-5 h-5 mr-2 text-gray-500" />
          <h3 className="font-bold text-gray-900">Extracted from Screenshot</h3>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
        >
          {copied ? (
            <><Check className="w-4 h-4 mr-1 text-green-600" /> <span className="text-green-600">Copied</span></>
          ) : (
            <><Copy className="w-4 h-4 mr-1" /> Copy</>
          )}
        </button>
      </div>
      <div className="p-4 bg-gray-50/50">
        <blockquote className="text-sm text-gray-700 whitespace-pre-wrap border-l-4 border-gray-300 pl-4 italic break-words">
          {text}
        </blockquote>
      </div>
    </div>
  );
};
