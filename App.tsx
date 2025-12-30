import React, { useState } from 'react';
import { TabType } from './types';
import FormTab from './components/FormTab';
import SelectionTab from './components/SelectionTab';
import ExploreTab from './components/ExploreTab';
import RandomReviewModal from './components/RandomReviewModal';
import { FileText, ListFilter, Globe, Shuffle } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('form');
  const [isRandomModalOpen, setIsRandomModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20 md:pb-10">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-blue-200 shadow-md">
              E
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">EHR Generator</h1>
              <p className="text-xs text-slate-500 font-medium">Estate Home Realtor Reviews</p>
            </div>
          </div>

          {/* Random Button */}
          <button 
            onClick={() => setIsRandomModalOpen(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-md active:scale-95"
          >
            <Shuffle size={16} className="text-purple-300" />
            Random
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {activeTab === 'form' && <FormTab />}
        {activeTab === 'selection' && <SelectionTab />}
        {activeTab === 'explore' && <ExploreTab />}
      </main>

      {/* Random Modal */}
      <RandomReviewModal 
        isOpen={isRandomModalOpen} 
        onClose={() => setIsRandomModalOpen(false)} 
      />

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
        <div className="max-w-3xl mx-auto flex justify-around p-2">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg flex-1 transition-colors ${
              activeTab === 'form' ? 'text-blue-600 bg-blue-50' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <FileText size={20} strokeWidth={activeTab === 'form' ? 2.5 : 2} />
            <span className="text-xs font-medium">Form Types</span>
          </button>
          
          <button
            onClick={() => setActiveTab('selection')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg flex-1 transition-colors ${
              activeTab === 'selection' ? 'text-blue-600 bg-blue-50' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <ListFilter size={20} strokeWidth={activeTab === 'selection' ? 2.5 : 2} />
            <span className="text-xs font-medium">Selections</span>
          </button>
          
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg flex-1 transition-colors ${
              activeTab === 'explore' ? 'text-blue-600 bg-blue-50' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Globe size={20} strokeWidth={activeTab === 'explore' ? 2.5 : 2} />
            <span className="text-xs font-medium">Explore All</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;