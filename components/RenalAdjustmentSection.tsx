
import React, { useState, useMemo } from 'react';
import { Search, Info, AlertTriangle, Home, Activity, Calculator, Eraser, Filter, X } from 'lucide-react';
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

const DoseItem = ({ label, value, isHighlighted, weight }: { label: string, value: string, isHighlighted: boolean, weight: string }) => {
  const calculatedDoses = useMemo(() => {
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum <= 0) return null;

    // Regex to match patterns like "15-20mg/kg" or "5mg/kg" or "0,7-1mg/kg"
    const regex = /(\d+(?:,\d+)?)(?:-(\d+(?:,\d+)?))?\s*(m?g\/kg)/gi;
    const matches = [...value.matchAll(regex)];
    if (matches.length === 0) return null;

    return matches.map(match => {
      const minVal = parseFloat(match[1].replace(',', '.'));
      const maxVal = match[2] ? parseFloat(match[2].replace(',', '.')) : null;
      const unit = match[3].toLowerCase();
      const baseUnit = unit.includes('mg') ? 'mg' : 'g';

      const minDose = minVal * weightNum;
      const maxDose = maxVal ? maxVal * weightNum : null;

      const formatNum = (num: number) => {
        if (num >= 1000 && baseUnit === 'mg') {
          return `${(num / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} g`;
        }
        return `${num.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} ${baseUnit}`;
      };

      const result = maxDose ? `${formatNum(minDose)} - ${formatNum(maxDose)}` : formatNum(minDose);
      return { original: match[0], calculated: result };
    });
  }, [value, weight]);

  return (
    <div className={`space-y-1 p-3 rounded-lg transition-all ${isHighlighted ? 'bg-green-100 ring-2 ring-green-500' : 'bg-slate-50'}`}>
      <p className="text-xs font-bold text-gray-400 uppercase">{label}</p>
      <p className={`text-sm font-medium whitespace-pre-line ${isHighlighted ? 'text-green-900 font-bold' : 'text-gray-800'}`}>{value}</p>
      {calculatedDoses && calculatedDoses.length > 0 && (
        <div className="mt-2 pt-2 border-t border-gray-200/50">
          <p className="text-[10px] font-black text-green-700 uppercase mb-1">Dose Calculada ({weight}kg):</p>
          {calculatedDoses.map((d, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 font-medium">{d.original}:</span>
              <span className="text-sm font-black text-green-600">{d.calculated}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const RenalAdjustmentSection: React.FC<RenalAdjustmentSectionProps> = ({ onBack }) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [crcl, setCrcl] = useState<{
    egfrIndexed: number;
    egfrNonNormalized: number;
    bsa: number | null;
    egfrPatientBSA: number | null;
  } | null>(null);

  const [age, setAge] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('male');
  const [calcError, setCalcError] = useState('');
  const [showCalcInfo, setShowCalcInfo] = useState(false);

  const handleCalculateCrcl = () => {
    const numAge = parseFloat(age);
    const numCreatinine = parseFloat(creatinine);
    const numHeight = parseFloat(height);
    const numWeight = parseFloat(weight);

    if (isNaN(numAge) || isNaN(numCreatinine) || numAge <= 0 || numCreatinine <= 0) {
      setCalcError('Por favor, preencha Idade, Creatinina e Gênero corretamente.');
      setCrcl(null);
      return;
    }
    
    setCalcError('');
    
    const k = gender === 'female' ? 0.7 : 0.9;
    const alpha = gender === 'female' ? -0.241 : -0.302;
    const sexFactor = gender === 'female' ? 1.012 : 1.0;
    const ratio = numCreatinine / k;
    
    const egfrIndexed = 142 * 
      Math.pow(Math.min(ratio, 1), alpha) * 
      Math.pow(Math.max(ratio, 1), -1.200) * 
      Math.pow(0.9938, numAge) * 
      sexFactor;
    
    let bsa: number | null = null;
    let egfrPatientBSA: number | null = null;

    if (!isNaN(numHeight) && !isNaN(numWeight) && numHeight > 0 && numWeight > 0) {
      bsa = 0.007184 * Math.pow(numHeight, 0.725) * Math.pow(numWeight, 0.425);
      egfrPatientBSA = egfrIndexed * (bsa / 1.73);
    }
    
    setCrcl({
      egfrIndexed: Math.round(egfrIndexed),
      egfrNonNormalized: egfrPatientBSA ? Math.round(egfrPatientBSA) : Math.round(egfrIndexed),
      bsa: bsa ? Number(bsa.toFixed(2)) : null,
      egfrPatientBSA: egfrPatientBSA ? Math.round(egfrPatientBSA) : null
    });
  };

  const handleClearCalculator = () => {
    setAge('');
    setCreatinine('');
    setHeight('');
    setWeight('');
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
  
  const highlightedCategory = getDoseCategoryByClearance(crcl ? crcl.egfrIndexed : null);

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
          <span>Calculadora de Função Renal (CKD-EPI 2021)</span>
          <button 
            onClick={() => setShowCalcInfo(!showCalcInfo)}
            className="p-1 text-gray-400 hover:text-green-600 transition-colors"
            title="Informações sobre a calculadora"
          >
            <Info className="w-4 h-4" />
          </button>
        </h3>

        {showCalcInfo && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl text-[11px] text-blue-800 space-y-2 animate-in fade-in slide-in-from-top-2">
            <div className="flex justify-between items-start">
              <p className="font-bold uppercase tracking-tight flex items-center gap-1.5">
                <Info className="w-3 h-3" /> Notas da Calculadora
              </p>
              <button onClick={() => setShowCalcInfo(false)} className="text-blue-400 hover:text-blue-600 p-1">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <ul className="list-disc pl-4 space-y-1.5">
              <li>As unidades padrão para peso e altura são quilogramas (kg) e centímetros (cm). Verifique se a unidade correta está selecionada.</li>
              <li>A TFG (eGFR) é calculada pela equação CKD-EPI 2021 (creatinina).</li>
              <li>Resultados de TFG são arredondados para o inteiro mais próximo; pode haver diferença individual relevante entre TFG estimada e medida.</li>
              <li>A TFG sem normalização para BSA pode ser usada para ajuste de dose. Em obesidade, a não normalizada pode superestimar a função renal e levar a superdosagem.</li>
              <li>BSA calculada pela fórmula de Du Bois e Du Bois.</li>
            </ul>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="age-input" className="block text-xs font-medium text-gray-600 mb-1">Idade (anos)</label>
            <input id="age-input" type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Ex: 65" className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500" />
          </div>
          <div>
            <label htmlFor="creatinine-input" className="block text-xs font-medium text-gray-600 mb-1">Creatinina (mg/dL)</label>
            <input id="creatinine-input" type="number" value={creatinine} onChange={e => setCreatinine(e.target.value)} placeholder="Ex: 1.2" step="0.1" className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500" />
          </div>
          <div>
            <label htmlFor="height-input" className="block text-xs font-medium text-gray-600 mb-1">Altura (cm) <span className="text-[10px] text-gray-400 font-normal">(Opcional)</span></label>
            <input id="height-input" type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="Ex: 170" className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500" />
          </div>
          <div>
            <label htmlFor="weight-input" className="block text-xs font-medium text-gray-600 mb-1">Peso (kg) <span className="text-[10px] text-gray-400 font-normal">(Opcional)</span></label>
            <input id="weight-input" type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Ex: 70" className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500" />
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
              <Calculator className="w-4 h-4" /> Calcular TFGe
            </button>
        </div>
      </div>
      
      {crcl !== null && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-900 rounded-xl p-5 animate-in fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-green-200 ring-2 ring-green-500 ring-offset-2 col-span-1 sm:col-span-2 shadow-sm text-center">
              <p className="text-[10px] sm:text-[11px] font-bold text-green-700 uppercase mb-1 leading-tight">TFGe Normalizada (para 1,73m²)</p>
              <p className="text-2xl sm:text-3xl font-black">{crcl.egfrIndexed} <span className="text-xs sm:text-sm font-normal">mL/min/1.73m²</span></p>
            </div>
            
            {crcl.bsa !== null && (
              <>
                <div className="bg-white/30 p-2 rounded-lg border border-green-100/50">
                  <p className="text-[9px] font-bold text-green-600/70 uppercase mb-0.5 leading-tight">BSA (Du Bois)</p>
                  <p className="text-base font-bold text-green-800">{crcl.bsa} <span className="text-[10px] font-normal">m²</span></p>
                </div>
                <div className="bg-white/30 p-2 rounded-lg border border-green-100/50">
                  <p className="text-[9px] font-bold text-green-600/70 uppercase mb-0.5 leading-tight">TFGe Absoluta (para este paciente)</p>
                  <p className="text-base font-bold text-green-800">{crcl.egfrNonNormalized} <span className="text-[10px] font-normal">mL/min</span></p>
                </div>
              </>
            )}
          </div>
          <p className="text-[10px] text-green-600 mt-4 text-center italic">
            * O ajuste de dose sugerido abaixo utiliza o valor normalizado (1.73 m²).
          </p>
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
                     <DoseItem label="Dose de Ataque" value={item.attackDose || 'N/A'} isHighlighted={false} weight={weight} />
                     <DoseItem label="POSOLOGIA ClCr >50mL/min" value={item.normalDose} isHighlighted={highlightedCategory === 'normalDose'} weight={weight} />
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-[11px] font-bold text-slate-800 uppercase mb-3 tracking-tight">
                      AJUSTE DE DOSE EM INSUFICIÊNCIA RENAL
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                       <DoseItem label="ClCr 30-50mL/min" value={item.crcl30_50} isHighlighted={highlightedCategory === 'crcl30_50'} weight={weight} />
                       <DoseItem label="ClCr < 30 mL/min sem hemodiálise" value={item.crcl_30} isHighlighted={highlightedCategory === 'crcl_30'} weight={weight} />
                       <DoseItem label="Hemodiálise" value={item.dialysis} isHighlighted={false} weight={weight} />
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
