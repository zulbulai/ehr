import React, { useState } from 'react';
import { Copy, ExternalLink, Check } from 'lucide-react';
import { GMB_LINK } from '../constants';

interface ReviewCardProps {
  text: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGoGmb = () => {
    window.open(GMB_LINK, '_blank');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200 flex flex-col gap-4">
      <div className="relative">
        <p className="text-slate-700 leading-relaxed text-base whitespace-pre-wrap font-medium">
          {text}
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-100 mt-2">
        <button
          onClick={handleCopy}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
            copied 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
          {copied ? 'Copied!' : 'Copy Clipboard'}
        </button>
        
        <button
          onClick={handleGoGmb}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
        >
          <ExternalLink size={18} />
          Go GMB
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;