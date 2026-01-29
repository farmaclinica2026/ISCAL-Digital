
import React, { useState, useMemo } from 'react';
import { Search, Info, AlertTriangle, Home, Activity, Calculator, Eraser } from 'lucide-react';
import { renalDoses } from '../renalData';

interface RenalAdjustmentSectionProps {
  onBack: () => void;
}

const RenalAdjustmentSection: React.FC<RenalAdjustmentSectionProps> = ({ onBack }) => {
  const [search, setSearch] = useState('');
  const [crcl, setCrcl] = useState<number | null>(null);

  // State for calculator
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [gender, setGender] = useState('male');
  const [calcError, setCalcError] = useState('');

  const handleCalculateCrcl = () => {
    const numAge = parseFloat(age);
    const numWeight = parseFloat(weight);
    const numCreatinine = parseFloat(creatinine);

    if (isNaN(numAge) || isNaN(numWeight) || isNaN(numCreatinine) || numAge <= 0 || numWeight <= 0 || numCreatinine <= 0) {
      setCalcError('Por favor, preencha todos os campos com valores válidos.');
      setCrcl(null);
      return;
    }
    
    setCalcError('');
    let calculatedCrcl = ((140 - numAge) * numWeight) / (72 * numCreatinine);
    if (gender === 'female') {
      calculatedCrcl *= 0.85;
    }
    setCrcl(calculatedCrcl);
  };

  const handleClearCalculator = () => {
    setAge('');
    setWeight('');
    setCreatinine('');
    setGender('male');
    setCalcError('');
    setCrcl(null);
  }

  const filteredDoses = useMemo(() => {
    return renalDoses.filter(d => 
      d.drug.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);
  
  const getCrclCategory = (clearance: number | null): string | null => {
    if (clearance === null) return null;
    if (clearance > 50) return 'normalDose';
    if (clearance >= 10 && clearance <= 50) return 'crcl10_50';
    if (clearance < 10) return 'crcl_10';
    return null;
  };
  
  const highlightedCategory = getCrclCategory(crcl);

  const DoseItem = ({ label, value, isHighlighted }) => (
     <div className={`space-y-1 p-3 rounded-lg transition-all ${isHighlighted ? 'bg-green-100 ring-2 ring-green-500' : 'bg-slate-50'}`}>
        <p className="text-xs font-bold text-gray-400 uppercase">{label}</p>
        <p className={`text-sm font-medium ${isHighlighted ? 'text-green-900 font-bold' : 'text-gray-800'}`}>{value}</p>
     </div>
  );

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

      {/* Calculator Section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
        <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-green-600" />
          Calculadora de Função Renal (Cockcroft-Gault)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Idade (anos)</label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Ex: 65" className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Peso (kg)</label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Ex: 70" className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500" />
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
              <Calculator className="w-4 h-4" /> Calcular CrCl
            </button>
        </div>
      </div>
      
      {crcl !== null && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-900 rounded-xl p-4 text-center animate-in fade-in">
          <p className="text-sm font-medium">Clearance de Creatinina Estimado:</p>
          <p className="text-2xl font-bold">{crcl.toFixed(2)} mL/min</p>
        </div>
      )}

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          placeholder="Buscar antimicrobiano (ex: Meropenem, Vancomicina)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredDoses.length === 0 ? (
          <div className="text-center py-12">
            <Info className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2 text-gray-500">Nenhum antimicrobiano encontrado.</p>
          </div>
        ) : (
          filteredDoses.map((item) => (
            <div key={item.drug} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">{item.drug}</h3>
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Ajuste de Dose</span>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                 <DoseItem label="Dose Normal (CrCl > 50)" value={item.normalDose} isHighlighted={highlightedCategory === 'normalDose'} />
                 <DoseItem label="CrCl 10 - 50 mL/min" value={item.crcl10_50} isHighlighted={highlightedCategory === 'crcl10_50'} />
                 <DoseItem label="CrCl < 10 mL/min" value={item.crcl_10} isHighlighted={highlightedCategory === 'crcl_10'} />
                 <DoseItem label="Hemodiálise" value={item.dialysis} isHighlighted={false} />
              </div>
              {item.notes && (
                <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-100 flex gap-2 items-start">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-[11px] text-yellow-800">{item.notes}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="mt-8 bg-blue-50 p-4 rounded-xl border border-blue-100">
        <h4 className="font-bold text-blue-900 text-sm mb-2 flex items-center gap-2">
          <Info className="w-4 h-4" /> Importante
        </h4>
        <p className="text-xs text-blue-800 leading-relaxed">
          Os ajustes sugeridos são baseados em guias de referência. A decisão clínica deve considerar o estado volêmico, gravidade da infecção e monitorização laboratorial. O cálculo do CrCl deve ser feito preferencialmente pela fórmula de Cockcroft-Gault.
        </p>
      </div>
    </div>
  );
};

export default RenalAdjustmentSection;
