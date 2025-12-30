import React from 'react';
import { ALL_REVIEWS } from '../data/reviews';
import ReviewCard from './ReviewCard';
import { Sparkles } from 'lucide-react';

const ExploreTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-xl text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="text-yellow-300" />
          <h2 className="text-xl font-bold">Explore All Templates</h2>
        </div>
        <p className="text-blue-100">
          Browse through the complete collection of 150+ generated review templates suited for various scenarios.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {ALL_REVIEWS.map((review) => (
          <ReviewCard key={review.id} text={review.text} />
        ))}
      </div>
    </div>
  );
};

export default ExploreTab;