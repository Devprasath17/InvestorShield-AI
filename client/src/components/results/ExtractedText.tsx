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
    <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-surface-container-highest overflow-hidden">
      <div className="p-5 bg-surface-container-low border-b border-surface-container-highest flex items-center justify-between">
        <div className="flex items-center">
          <ImageIcon className="w-5 h-5 mr-2 text-secondary" />
          <h3 className="font-bold text-on-surface">Extracted from Screenshot</h3>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center font-label-lg text-label-lg font-bold text-on-surface-variant hover:text-secondary transition-colors bg-surface-container-lowest px-3 py-1.5 rounded-lg border border-surface-container-highest shadow-sm"
        >
          {copied ? (
            <><Check className="w-4 h-4 mr-1 text-on-tertiary-container" /> <span className="text-on-tertiary-container">Copied</span></>
          ) : (
            <><Copy className="w-4 h-4 mr-1" /> Copy Text</>
          )}
        </button>
      </div>
      <div className="p-6">
        <blockquote className="text-sm font-mono text-text-main whitespace-pre-wrap leading-relaxed break-words bg-surface-container-low p-5 rounded-2xl border border-surface-container-highest">
          {text}
        </blockquote>
      </div>
    </div>
  );
};
