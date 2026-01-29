
import React, { useState, useMemo } from 'react';
import { Search, AlertCircle, Home, ShieldAlert, Info } from 'lucide-react';
import { protocols, categoryNotes } from '../data';
import SearchBar from './SearchBar';
import ProtocolTable from './ProtocolTable';
import CategoryFilter from './CategoryFilter';
import GeneralGuidelines from './GeneralGuidelines';

interface ProphylaxisSectionProps {
  onBack: () => void;
}

type LocalTabType = 'adults' | 'guidelines';

const ProphylaxisSection: React.FC<ProphylaxisSectionProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<LocalTabType>('adults');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(protocols.map(p => p.category)));
    return cats.sort();
  }, []);

  const filteredProtocols = useMemo(() => {
    return protocols.filter(p => {
      const matchesSearch = 
        p.procedure.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.antibiotic.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header com Referência Técnica Sutil */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shadow-inner">
            <ShieldAlert className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm font-black text-blue-800 uppercase leading-none">Profilaxia Antibiótica Perioperatória</h2>
            <div className="mt-1.5 flex flex-col">
               <span className="text-[8px] text-gray-400 font-semibold uppercase tracking-tight leading-tight">
                 NORMA TÉCNICA - SERVIÇO DE PREVENÇÃO DE INFECÇÃO HOSPITALAR
               </span>
               <span className="text-[8px] text-gray-400 font-medium uppercase tracking-tight leading-tight">
                 SPCIH-015 ANTIBIOTICOPROFILAXIA PERI OPERATÓRIA
               </span>
               <span className="text-[7px] text-gray-300 font-bold uppercase tracking-widest mt-0.5">
                 Versão 05 | Revisão: 23/01/2025
               </span>
            </div>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-full transition-colors flex items-center justify-center shadow-sm"
          aria-label="Voltar"
        >
          <Home className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs de Navegação - Agora apenas Adultos e Orientações */}
      <div className="flex p-1 bg-gray-100 rounded-2xl mb-6">
        <button
          onClick={() => setActiveTab('adults')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'adults' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Protocolos (Adultos)
        </button>
        <button
          onClick={() => setActiveTab('guidelines')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'guidelines' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <Info className="w-3.5 h-3.5" /> Orientações Gerais
        </button>
      </div>

      {activeTab === 'adults' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <CategoryFilter 
              categories={categories} 
              selectedCategory={selectedCategory} 
              onSelect={setSelectedCategory} 
            />
          </div>

          {selectedCategory !== 'Todos' && categoryNotes[selectedCategory] && (
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <p className="text-xs text-amber-900 leading-relaxed italic whitespace-pre-line">
                {categoryNotes[selectedCategory]}
              </p>
            </div>
          )}

          <ProtocolTable protocols={filteredProtocols} />
        </div>
      )}
      
      {activeTab === 'guidelines' && <GeneralGuidelines />}
    </div>
  );
};

export default ProphylaxisSection;
