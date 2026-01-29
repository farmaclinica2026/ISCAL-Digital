
import React, { useState, useEffect } from 'react';
import { Home, Droplets, Calculator, Eraser, HeartPulse, ChevronDown, AlertTriangle, CheckCircle2, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

interface GasometrySectionProps {
  onBack: () => void;
}

const referenceRanges = {
  arterial: {
    ph: { range: [7.35, 7.45], unit: '', label: 'pH' },
    po2: { range: [80, 100], unit: 'mmHg', label: 'PO₂' },
    pco2: { range: [35, 45], unit: 'mmHg', label: 'PCO₂' },
    hco3: { range: [22, 26], unit: 'mmol/L', label: 'HCO₃⁻' },
    be: { range: [-2, 2], unit: 'mEq/L', label: 'BE' },
    so2: { range: [95, 100], unit: '%', label: 'SatO₂' },
  },
  venous: {
    ph: { range: [7.32, 7.43], unit: '', label: 'pH' },
    po2: { range: [25, 40], unit: 'mmHg', label: 'PO₂' },
    pco2: { range: [38, 50], unit: 'mmHg', label: 'PCO₂' },
    hco3: { range: [22, 29], unit: 'mmol/L', label: 'HCO₃⁻' },
    be: { range: [-2, 2], unit: 'mEq/L', label: 'BE' },
    so2: { range: [60, 75], unit: '%', label: 'SatO₂' },
  }
};

// Fixed: Added default value for 'unit' to make it optional in component props destructuring
const InputField = ({ label, unit = "", value, onChange, placeholder, step = "any", name, gasometryType }) => {
  const [status, setStatus] = useState<'default' | 'low' | 'normal' | 'high'>('default');
  const ref = referenceRanges[gasometryType][name];

  useEffect(() => {
    const numValue = parseFloat(value);
    if (value === '' || isNaN(numValue)) {
      setStatus('default');
      return;
    }

    if (numValue < ref.range[0]) setStatus('low');
    else if (numValue > ref.range[1]) setStatus('high');
    else setStatus('normal');
  }, [value, gasometryType, name, ref.range]);

  const statusStyles = {
    default: { border: 'border-gray-200', text: 'text-gray-400', label: '', icon: null },
    low: { border: 'border-blue-400 bg-blue-50/30', text: 'text-blue-600', label: 'Baixo', icon: <ArrowDownCircle className="w-3 h-3" /> },
    normal: { border: 'border-green-400 bg-green-50/30', text: 'text-green-600', label: 'Normal', icon: <CheckCircle2 className="w-3 h-3" /> },
    high: { border: 'border-red-400 bg-red-50/30', text: 'text-red-600', label: 'Alto', icon: <ArrowUpCircle className="w-3 h-3" /> },
  };

  return (
    <div className="relative group">
      <div className="flex justify-between items-end mb-1.5">
        <label className="text-xs font-bold text-gray-600 uppercase tracking-tight">
          {label} {unit && <span className="text-gray-400 font-medium lowercase">({unit})</span>}
        </label>
        {status !== 'default' && (
          <span className={`flex items-center gap-1 text-[10px] font-bold uppercase transition-all duration-300 ${statusStyles[status].text}`}>
            {statusStyles[status].icon} {statusStyles[status].label}
          </span>
        )}
      </div>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          step={step}
          className={`w-full px-4 py-2.5 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all text-sm font-semibold ${statusStyles[status].border}`}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
           <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-mono">
             Ref: {ref.range[0]}-{ref.range[1]}
           </span>
        </div>
      </div>
    </div>
  );
};

const GasometrySection: React.FC<GasometrySectionProps> = ({ onBack }) => {
  const [gasometryType, setGasometryType] = useState<'arterial' | 'venous'>('arterial');
  const [ph, setPh] = useState('');
  const [po2, setPo2] = useState('');
  const [pco2, setPco2] = useState('');
  const [hco3, setHco3] = useState('');
  const [be, setBe] = useState('');
  const [so2, setSo2] = useState('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleClear = () => {
    setGasometryType('arterial');
    setPh(''); setPo2(''); setPco2(''); setHco3(''); setBe(''); setSo2('');
    setAnalysisResult(null);
  };

  const handleCalculate = () => {
    const numPh = parseFloat(ph);
    const numPco2 = parseFloat(pco2);
    const numHco3 = parseFloat(hco3);

    if (isNaN(numPh) || isNaN(numPco2) || isNaN(numHco3)) {
      setAnalysisResult({ error: 'Preencha pH, PCO₂ e HCO₃⁻ para a interpretação básica.' });
      return;
    }

    const ranges = referenceRanges[gasometryType];
    const results: any = { 
      general: { primary: 'Equilíbrio ácido-básico normal.', secondary: '' },
      params: []
    };
    
    // Parameter status tracking for the breakdown UI
    const paramsList = [
      { key: 'ph', val: ph, label: 'pH' },
      { key: 'pco2', val: pco2, label: 'PCO₂' },
      { key: 'hco3', val: hco3, label: 'HCO₃⁻' },
      { key: 'po2', val: po2, label: 'PO₂' },
      { key: 'be', val: be, label: 'BE' },
      { key: 'so2', val: so2, label: 'SatO₂' },
    ];

    paramsList.forEach(p => {
      const v = parseFloat(p.val);
      if (!isNaN(v)) {
        const ref = ranges[p.key];
        let status = 'normal';
        if (v < ref.range[0]) status = 'low';
        else if (v > ref.range[1]) status = 'high';
        results.params.push({ label: p.label, value: v, status, unit: ref.unit, range: ref.range });
      }
    });

    const isAcidemia = numPh < ranges.ph.range[0];
    const isAlkalemia = numPh > ranges.ph.range[1];
    const isRespAcidosis = numPco2 > ranges.pco2.range[1];
    const isRespAlkalosis = numPco2 < ranges.pco2.range[0];
    const isMetaAcidosis = numHco3 < ranges.hco3.range[0];
    const isMetaAlkalosis = numHco3 > ranges.hco3.range[1];

    if (isAcidemia) {
      if (isMetaAcidosis && isRespAcidosis) {
        results.general.primary = 'Acidose Mista';
        results.general.secondary = 'Componente metabólico e respiratório contribuindo para acidemia.';
      } else if (isMetaAcidosis) {
        results.general.primary = 'Acidose Metabólica';
        const expectedPco2 = (1.5 * numHco3) + 8;
        if (numPco2 > expectedPco2 + 2) results.general.secondary = 'Com Acidose Respiratória associada (Distúrbio Misto).';
        else if (numPco2 < expectedPco2 - 2) results.general.secondary = 'Com Alcalose Respiratória associada (Distúrbio Misto).';
        else results.general.secondary = `Compensação respiratória adequada (PCO₂ esperado: ${expectedPco2.toFixed(1)} ±2).`;
      } else if (isRespAcidosis) {
        results.general.primary = 'Acidose Respiratória';
        results.general.secondary = 'Acidemia de origem respiratória. Verificar ventilação.';
      }
    } else if (isAlkalemia) {
      if (isMetaAlkalosis && isRespAlkalosis) {
        results.general.primary = 'Alcalose Mista';
      } else if (isMetaAlkalosis) {
        results.general.primary = 'Alcalose Metabólica';
        const expectedPco2 = (0.7 * numHco3) + 21;
        if (numPco2 > expectedPco2 + 2) results.general.secondary = 'Com Acidose Respiratória associada (Distúrbio Misto).';
        else results.general.secondary = `PCO₂ esperado para compensação: ${expectedPco2.toFixed(1)} ±2.`;
      } else if (isRespAlkalosis) {
        results.general.primary = 'Alcalose Respiratória';
      }
    } else {
      if (isRespAcidosis && isMetaAlkalosis) results.general.primary = 'Distúrbio Misto (Acidose Resp. + Alcalose Meta.)';
      else if (isRespAlkalosis && isMetaAcidosis) results.general.primary = 'Distúrbio Misto (Alcalose Resp. + Acidose Meta.)';
      else if (isMetaAcidosis || isRespAcidosis || isMetaAlkalosis || isRespAlkalosis) results.general.primary = 'Distúrbio ácido-básico compensado.';
    }
    
    setAnalysisResult(results);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center shadow-inner">
            <Droplets className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-orange-700 uppercase tracking-tight leading-none">Gasometria</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Interpretação Clínica</p>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="p-3 bg-white text-orange-600 hover:bg-orange-50 border border-orange-100 rounded-2xl transition-all shadow-sm active:scale-95"
          aria-label="Voltar"
        >
          <Home className="w-5 h-5" />
        </button>
      </div>
      
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-orange-900/5 p-6 md:p-8">
        <div className="mb-8">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block">Contexto da Amostra</label>
          <div className="grid grid-cols-2 gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
            <button
              onClick={() => setGasometryType('arterial')}
              className={`py-3 px-4 rounded-xl text-xs font-bold transition-all ${gasometryType === 'arterial' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-500 hover:bg-white'}`}
            >
              Arterial
            </button>
            <button
              onClick={() => setGasometryType('venous')}
              className={`py-3 px-4 rounded-xl text-xs font-bold transition-all ${gasometryType === 'venous' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-500 hover:bg-white'}`}
            >
              Venosa
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6 mb-8">
          {/* Fixed: unit prop is now optional in InputField, but pH naturally has no unit in referenceRanges */}
          <InputField name="ph" gasometryType={gasometryType} label="pH" value={ph} onChange={setPh} placeholder="7.40" step="0.01" />
          <InputField name="pco2" gasometryType={gasometryType} label="PCO₂" unit="mmHg" value={pco2} onChange={setPco2} placeholder="40" />
          <InputField name="hco3" gasometryType={gasometryType} label="HCO₃⁻" unit="mmol/L" value={hco3} onChange={setHco3} placeholder="24" />
          <InputField name="po2" gasometryType={gasometryType} label="PO₂" unit="mmHg" value={po2} onChange={setPo2} placeholder="95" />
          <InputField name="be" gasometryType={gasometryType} label="Base Excess" unit="mEq/L" value={be} onChange={setBe} placeholder="0" />
          <InputField name="so2" gasometryType={gasometryType} label="SatO₂" unit="%" value={so2} onChange={setSo2} placeholder="98" />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={handleClear} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95">
            <Eraser className="w-5 h-5" /> Limpar Dados
          </button>
          <button onClick={handleCalculate} className="flex-[2] bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-extrabold flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-600/20 active:scale-95">
            <Calculator className="w-5 h-5" /> Analisar Gasometria
          </button>
        </div>
      </div>

      {analysisResult && (
        <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-top-4">
          {analysisResult.error ? (
            <div className="p-5 rounded-2xl flex items-center gap-4 bg-red-50 border-2 border-red-100">
              <div className="p-2 bg-red-100 rounded-lg"><AlertTriangle className="w-6 h-6 text-red-600"/></div>
              <p className="text-red-800 font-bold text-sm">{analysisResult.error}</p>
            </div>
          ) : (
            <>
              {/* Diagnóstico Principal */}
              <div className="bg-white rounded-3xl p-6 border-2 border-orange-100 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-2xl ${analysisResult.general.primary.includes('normal') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    <HeartPulse className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Diagnóstico Sindrômico</h4>
                    <p className={`text-xl font-black ${analysisResult.general.primary.includes('normal') ? 'text-green-700' : 'text-red-700'}`}>
                      {analysisResult.general.primary}
                    </p>
                  </div>
                </div>
                {analysisResult.general.secondary && (
                  <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100/50">
                    <p className="text-xs text-orange-800 font-medium leading-relaxed italic">
                      "{analysisResult.general.secondary}"
                    </p>
                  </div>
                )}
              </div>

              {/* Detalhamento dos Parâmetros */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {analysisResult.params.map((p: any, i: number) => (
                  <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-black text-gray-400 uppercase">{p.label}</span>
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        p.status === 'normal' ? 'bg-green-100 text-green-600' : 
                        p.status === 'low' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {p.status}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-black text-gray-800">{p.value}</span>
                      <span className="text-[10px] font-medium text-gray-400">{p.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <div className="mt-10 bg-gray-100/50 p-6 rounded-3xl border border-dashed border-gray-300">
        <div className="flex gap-4 items-start">
          <AlertTriangle className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-600 uppercase tracking-widest">Observações Técnicas</h4>
            <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
              • A interpretação leva em conta as fórmulas de Winter (PCO₂ esperado) e o delta-delta quando aplicável.<br/>
              • Valores venosos possuem pH ligeiramente inferior e PCO₂ superior ao arterial.<br/>
              • BE (Base Excess) auxilia na distinção de distúrbios crônicos e agudos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GasometrySection;
