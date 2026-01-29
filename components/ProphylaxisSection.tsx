
import React, { useState, useMemo } from 'react';
import { BookOpen, Search, AlertCircle, Home, ShieldAlert } from 'lucide-react';
import { protocols, categoryNotes } from '../data';
import { TabType } from '../types';
import SearchBar from './SearchBar';
import ProtocolTable from './ProtocolTable';
import CategoryFilter from './CategoryFilter';
import GeneralGuidelines from './GeneralGuidelines';

interface ProphylaxisSectionProps {
  onBack: () => void;
}

const ProphylaxisSection: React.FC<ProphylaxisSectionProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<TabType>('adults');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = useMemo(() => {
    const cats = new Set(protocols.map((p) => p.category));
    return Array.from(cats).sort();
  }, []);

  const filteredProtocols = useMemo(() => {
    return protocols.filter((p) => {
      const matchesSearch =
        p.procedure.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.antibiotic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'Todos' || p.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 pb-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-[#00579D]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#00579D] uppercase leading-tight">Profilaxia Antibiótica</h2>
            <p className="text-[10px] text-gray-400 font-medium uppercase">Perioperatória</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button 
            onClick={onBack}
            className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-full transition-colors flex items-center justify-center shadow-sm"
            aria-label="Voltar para a página inicial"
          >
            <Home className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('adults')}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'adults'
                ? 'text-blue-600 bg-blue-50/50 border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Search className="w-4 h-4" />
            Protocolos
          </button>
          <button
            onClick={() => setActiveTab('guidelines')}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'guidelines'
                ? 'text-blue-600 bg-blue-50/50 border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Diretrizes
          </button>
        </div>

        <div className="p-4 md:p-6">
          {activeTab === 'adults' && (
            <>
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
              
              <div className="mt-6">
                <ProtocolTable protocols={filteredProtocols} />
                
                {selectedCategory !== 'Todos' && categoryNotes[selectedCategory] && (
                  <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-yellow-800 whitespace-pre-line leading-relaxed">
                      {categoryNotes[selectedCategory]}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'guidelines' && <GeneralGuidelines />}
        </div>
      </div>
    </div>
  );
};

export default ProphylaxisSection;