import React, { useState } from 'react';
import { Filter, Search, RotateCcw, AlertCircle } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { generateDynamicReviews } from '../utils/reviewUtils';
import ReviewCard from './ReviewCard';

const FormTab: React.FC = () => {
  const [selections, setSelections] = useState<{ [key: string]: string }>({
    Location: '',
    Service: '',
    Outcome: '',
    Trust: ''
  });
  
  const [generatedReviews, setGeneratedReviews] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (category: string, value: string) => {
    setSelections(prev => ({
      ...prev,
      [category]: value
    }));
    setError(''); // Clear error on change
  };

  const handleGenerate = () => {
    // Basic validation to ensure fields are picked
    if (!selections['Location'] && !selections['Service']) {
      setError('Please select at least a Location and Service to generate relevant reviews.');
      return;
    }

    const results = generateDynamicReviews(
      selections['Location'],
      selections['Service'],
      selections['Outcome'],
      selections['Trust']
    );
    
    setGeneratedReviews(results);
    setHasSearched(true);
  };

  const handleReset = () => {
    setSelections({ Location: '', Service: '', Outcome: '', Trust: '' });
    setGeneratedReviews([]);
    setHasSearched(false);
    setError('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 mb-4 text-slate-800 font-semibold text-lg">
          <Filter className="w-5 h-5 text-blue-600" />
          <h2>Configure Review Criteria</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CATEGORIES.map((cat) => (
            <div key={cat.title} className="space-y-1.5">
              <label className="text-sm font-medium text-slate-600 ml-1">
                {cat.title}
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <cat.icon size={16} />
                </div>
                <select
                  value={selections[cat.title] || ''}
                  onChange={(e) => handleChange(cat.title, e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 appearance-none cursor-pointer"
                >
                  <option value="">Select {cat.title}...</option>
                  {cat.options.map((opt) => (
                    <option key={opt.value} value={opt.label}>
                      {/* Using Label here for better sentence construction in templates */}
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleGenerate}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <Search size={20} />
            Generate 10 Reviews
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-3 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
            title="Reset Filters"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      {hasSearched && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-lg font-semibold text-slate-800">
              Generated Templates ({generatedReviews.length})
            </h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {generatedReviews.map((review) => (
              <ReviewCard key={review.id} text={review.text} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormTab;