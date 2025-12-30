import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import { filterReviews } from '../utils/reviewUtils';
import ReviewCard from './ReviewCard';
import { ChevronRight } from 'lucide-react';

const SelectionTab: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Location');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const currentCategory = CATEGORIES.find(c => c.title === activeCategory);
  
  // If a filter is selected, show reviews. Otherwise, show nothing or instructions.
  const displayReviews = activeFilter ? filterReviews(activeFilter) : [];

  return (
    <div className="space-y-6">
      {/* Top Level Category Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.title}
            onClick={() => {
              setActiveCategory(cat.title);
              setActiveFilter(null);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap font-medium transition-all ${
              activeCategory === cat.title
                ? 'bg-slate-800 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <cat.icon size={16} />
            {cat.title}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar / Top selection area for options */}
        <div className="md:w-1/3 space-y-2">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-1 mb-3">
            Select {activeCategory}
          </h3>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {currentCategory?.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setActiveFilter(opt.value)}
                className={`w-full text-left px-5 py-3.5 flex items-center justify-between border-b border-slate-100 last:border-0 transition-colors ${
                  activeFilter === opt.value
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{opt.label}</span>
                {activeFilter === opt.value && <ChevronRight size={16} />}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="md:w-2/3">
           <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-1 mb-3">
            Available Reviews {activeFilter && `(${displayReviews.length})`}
          </h3>
          
          {activeFilter ? (
            <div className="space-y-4">
               {displayReviews.length > 0 ? (
                displayReviews.map((review) => (
                  <ReviewCard key={review.id} text={review.text} />
                ))
               ) : (
                 <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500">
                   No reviews found specifically tagged with this exact keyword in the demo set.
                 </div>
               )}
            </div>
          ) : (
            <div className="bg-slate-100 p-8 rounded-xl border border-dashed border-slate-300 text-center text-slate-500 flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                <ChevronRight className="text-slate-400" />
              </div>
              Select an option from the left to view matching reviews.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectionTab;