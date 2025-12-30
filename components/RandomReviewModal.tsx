import React, { useState, useEffect } from 'react';
import { X, Shuffle, Sparkles } from 'lucide-react';
import { generateRandomReview } from '../utils/reviewUtils';
import ReviewCard from './ReviewCard';
import { Review } from '../types';

interface RandomReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RandomReviewModal: React.FC<RandomReviewModalProps> = ({ isOpen, onClose }) => {
  const [currentReview, setCurrentReview] = useState<Review | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Generate initial review when modal opens
  useEffect(() => {
    if (isOpen) {
      handleGenerate();
    }
  }, [isOpen]);

  const handleGenerate = () => {
    // Pass current text to avoid duplicates
    const newReview = generateRandomReview(currentReview?.text || null);
    setCurrentReview(newReview);
    setAnimationKey(prev => prev + 1); // Trigger re-render for animation
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl w-full max-w-lg shadow-2xl transform transition-all scale-100 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Sparkles className="text-yellow-300 animate-pulse" />
            Random Generator
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 bg-slate-50 flex flex-col gap-6">
          
          <div key={animationKey} className="animate-fade-in-up">
            {currentReview && <ReviewCard text={currentReview.text} />}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleGenerate}
              className="flex-1 bg-purple-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-purple-700 active:scale-95 transition-all shadow-lg shadow-purple-200 flex items-center justify-center gap-2"
            >
              <Shuffle size={24} />
              Generate Another
            </button>
          </div>
          
          <p className="text-center text-xs text-slate-400">
            Generates a unique combination every time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RandomReviewModal;