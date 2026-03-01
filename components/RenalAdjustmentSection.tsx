
import React, { useState, useMemo } from 'react';
import { Search, Info, AlertTriangle, Home, Activity, Calculator, Eraser, Filter } from 'lucide-react';
import { renalDoses } from '../renalData';

interface RenalAdjustmentSectionProps {
  onBack: () => void;
}

const CATEGORY_CONFIG = {
  antibiotic: {
    label: 'Antibiótico',
    border: 'border-gray-200',
    bg: 'bg-slate-50',
    headerBorder: 'border-gray-100',
    text: 'text-slate-900',
    badgeBg: 'bg-slate-200',
    badgeText: 'text-slate-700'
  },
  antifungal: {
    label: 'Antifúngico',
    border: 'border-purple-200',
    bg: 'bg-purple-50',
    headerBorder: 'border-purple-100',
    text: 'text-purple-900',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-700'
  },
  antiviral: {
    label: 'Antiviral',
    border: 'border-emerald-200',
    bg: 'bg-emerald-50',
    headerBorder: 'border-emerald-100',
    text: 'text-emerald-900',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-700'
  }
};

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'Todas as Categorias' },
  { value: 'antibiotic', label: 'Antibióticos' },
  { value: 'antifungal', label: 'Antifúngicos' },
  { value: 'antiviral', label: 'Antivirais' },
];

const DoseItem = ({ label, value, isHighlighted }: { label: string, value: string, isHighlighted: boolean }) => (
  <div className={`space-y-1 p-3 rounded-lg transition-all ${isHighlighted ? 'bg-green-100 ring-2 ring-green-500' : 'bg-slate-50'}`}>
    <p className="text-xs font-bold text-gray-400 uppercase">{label}</p>
    <p className={`text-sm font-medium ${isHighlighted ? 'text-green-900 font-bold' : 'text-gray-800'}`}>{value}</p>
  </div>
);

const RenalAdjustmentSection: React.FC<RenalAdjustmentSectionProps> = ({ onBack }) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [crcl, setCrcl] = useState<number | null>(null);

  const [age, setAge] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [gender, setGender] = useState('male');
  const [calcError, setCalcError] = useState('');

  const handleCalculateCrcl = () => {
    const numAge = parseFloat(age);
    const numCreatinine = parseFloat(creatinine);

    if (isNaN(numAge) || isNaN(numCreatinine) || numAge <= 0 || numCreatinine <= 0) {
      setCalcError('Por favor, preencha todos os campos com valores válidos.');
      setCrcl(null);
      return;
    }
    
    setCalcError('');
    
    const k = gender === 'female' ? 0.7 : 0.9;
    const a = gender === 'female' ? -0.241 : -0.302;
    const genderConstant = gender === 'female' ? 1.012 : 1.0;
    const sc_k = numCreatinine / k;
    
    const egfr = 142 * Math.pow(Math.min(sc_k, 1), a) * Math.pow(Math.max(sc_k, 1), -1.200) * Math.pow(0.9938, numAge) * genderConstant;
    
    setCrcl(egfr);
  };

  const handleClearCalculator = () => {
    setAge('');
    setCreatinine('');
    setGender('male');
    setCalcError('');
    setCrcl(null);
  };

  const medicamentosFiltrados = useMemo(() => {
    return renalDoses
      .filter(d => {
        const matchesSearch = d.drug.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || d.category === categoryFilter;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => a.drug.localeCompare(b.drug));
  }, [search, categoryFilter]);
  
  const getDoseCategoryByClearance = (clearance: number | null): string | null => {
    if (clearance === null) return null;
    if (clearance > 50) return 'normalDose';
    if (clearance >= 30 && clearance <= 50) return 'crcl30_50';
    if (clearance < 30) return 'crcl_30';
    return null;
  };
  
  const highlightedCategory = getDoseCategoryByClearance(crcl);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
            <Activity className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-green-700 uppercase leading-tight">Ajuste Renal de Antimicrobianos</h2>
            <p className="text-[10px] text-gray-400 font-medium uppercase">Correção de Doses</p>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="p-2.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-full transition-colors flex items-center justify-center shadow-sm"
          aria-label="Voltar para a página inicial"
        >
          <Home className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
        <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-green-600" />
          Calculadora de Função Renal (CKD-EPI 2021)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Idade (anos)</label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Ex: 65" className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Creatinina (mg/dL)</label>
            <input type="number" value={creatinine} onChange={e => setCreatinine(e.target.value)} placeholder="Ex: 1.2" step="0.1" className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Gênero</label>
            <select value={gender} onChange={e => setGender(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-1 focus:ring-green-500">
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
            </select>
          </div>
        </div>
        {calcError && <p className="text-red-600 text-xs mt-3">{calcError}</p>}
        <div className="grid grid-cols-2 gap-3 mt-4">
            <button onClick={handleClearCalculator} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors text-sm">
              <Eraser className="w-4 h-4" /> Limpar
            </button>
            <button onClick={handleCalculateCrcl} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors shadow text-sm">
              <Calculator className="w-4 h-4" /> Calcular ClCr
            </button>
        </div>
      </div>
      
      {crcl !== null && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-900 rounded-xl p-4 text-center animate-in fade-in">
          <p className="text-sm font-medium">Taxa de Filtração Glomerular Estimada (ClCr):</p>
          <p className="text-2xl font-bold">{crcl.toFixed(2)} mL/min/1.73m²</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            placeholder="Buscar antimicrobiano, antifúngico ou antiviral (ex: Meropenem, Aciclovir)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="relative min-w-[200px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-4 w-4 text-gray-400" />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl leading-5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm appearance-none font-medium"
          >
            {CATEGORY_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {medicamentosFiltrados.length === 0 ? (
          <div className="text-center py-12">
            <Info className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2 text-gray-500">Nenhum antimicrobiano, antifúngico ou antiviral encontrado.</p>
          </div>
        ) : (
          medicamentosFiltrados.map((item) => {
            const config = CATEGORY_CONFIG[item.category || 'antibiotic'];
            return (
              <div key={item.drug} className={`bg-white border ${config.border} rounded-2xl shadow-sm overflow-hidden`}>
                <div className={`${config.bg} px-5 py-4 border-b ${config.headerBorder} flex flex-col justify-center`}>
                  <div className="flex items-center justify-between">
                    <h3 className={`font-black ${config.text} text-lg uppercase tracking-tight`}>{item.drug}</h3>
                    <span className={`px-2 py-0.5 ${config.badgeBg} ${config.badgeText} text-[10px] font-bold rounded-full uppercase tracking-wider`}>
                      {config.label}
                    </span>
                  </div>
                  {item.drug === 'Polimixina B' && (
                    <p className="text-xs font-bold text-slate-500 mt-0.5">10 mil UI = 1mg</p>
                  )}
                  {item.drug === 'Polimixina E' && (
                    <p className="text-xs font-bold text-slate-500 mt-0.5">80mg = 1.000.000 UI</p>
                  )}
                </div>

                <div className="p-5 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <DoseItem label="Dose de Ataque" value={item.attackDose || 'N/A'} isHighlighted={false} />
                     <DoseItem label="POSOLOGIA ClCr >50mL/min" value={item.normalDose} isHighlighted={highlightedCategory === 'normalDose'} />
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-[11px] font-bold text-slate-800 uppercase mb-3 tracking-tight">
                      AJUSTE DE DOSE EM INSUFICIÊNCIA RENAL
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                       <DoseItem label="ClCr 30-50mL/min" value={item.crcl30_50} isHighlighted={highlightedCategory === 'crcl30_50'} />
                       <DoseItem label="ClCr < 30 mL/min sem hemodiálise" value={item.crcl_30} isHighlighted={highlightedCategory === 'crcl_30'} />
                       <DoseItem label="Hemodiálise" value={item.dialysis} isHighlighted={false} />
                    </div>
                  </div>
                </div>
                {item.notes && (
                  <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-100 flex gap-2 items-start">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] text-yellow-800">{item.notes}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="mt-8 bg-blue-50 p-4 rounded-xl border border-blue-100">
        <h4 className="font-bold text-blue-900 text-sm mb-2 flex items-center gap-2">
          <Info className="w-4 h-4" /> Importante
        </h4>
        <p className="text-xs text-blue-800 leading-relaxed">
          Os ajustes sugeridos são baseados em guias de referência. A decisão clínica deve considerar o estado volêmico, gravidade da infecção e monitorização laboratorial. O cálculo da função renal utiliza a equação CKD-EPI (2021).
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Glossário</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-3 gap-x-4">
          {[
            { term: 'AUC', desc: 'Área sobre a curva' },
            { term: 'BIC', desc: 'Bomba de Infusão Contínua' },
            { term: 'ClCr', desc: 'Clearance de Creatinina' },
            { term: 'HD', desc: 'Hemodiálise' },
            { term: 'ICS', desc: 'Infecção de Corrente Sanguínea' },
            { term: 'IMC', desc: 'Índice de Massa Corpórea' },
            { term: 'IM', desc: 'Intramuscular' },
            { term: 'IC/EV', desc: 'Intravenoso/Endovenoso' },
            { term: 'MIC', desc: 'Concentração Inibitória Mínima' },
            { term: 'N/A', desc: 'Não se Aplica' },
            { term: 'PAV', desc: 'Pneumonia Associada a Ventilação Mecânica' },
            { term: 'PCA', desc: 'Peso Corporal Ajustado' },
            { term: 'PCI', desc: 'Peso Corporal Ideal' },
            { term: 'PCT', desc: 'Peso Corporal Total' },
            { term: 'SNC', desc: 'Sistema Nervoso Central' },
            { term: 'UI', desc: 'Unidade Internacionais' },
          ].map((item) => (
            <div key={item.term} className="flex flex-col">
              <span className="text-[10px] font-black text-slate-700 leading-tight">{item.term}</span>
              <span className="text-[10px] text-slate-500 leading-tight">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RenalAdjustmentSection;
