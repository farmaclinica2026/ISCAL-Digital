
import React, { useState, useEffect } from 'react';
import { Home, Droplets, Calculator, Eraser, HeartPulse, ChevronDown, AlertTriangle } from 'lucide-react';

interface GasometrySectionProps {
  onBack: () => void;
}

const referenceRanges = {
  arterial: {
    ph: { range: [7.35, 7.45], interpretation: ['Acidose', 'Normal', 'Alcalose'] },
    po2: { range: [80, 100], interpretation: ['Hipoxemia', 'Normal', 'Hiperóxia'] },
    pco2: { range: [35, 45], interpretation: ['Alcalose Respiratória', 'Normal', 'Acidose Respiratória'] },
    hco3: { range: [22, 26], interpretation: ['Acidose Metabólica', 'Normal', 'Alcalose Metabólica'] },
    be: { range: [-2, 2], interpretation: ['BE Negativo (Acidose)', 'Normal', 'BE Positivo (Alcalose)'] },
    so2: { range: [95, 100], interpretation: ['Saturação Baixa', 'Normal', 'Saturação Elevada'] },
  },
  venous: {
    ph: { range: [7.32, 7.43], interpretation: ['Acidose', 'Normal', 'Alcalose'] },
    po2: { range: [25, 40], interpretation: ['Baixa pressão de oxigênio', 'Normal', 'Alta pressão de oxigênio'] },
    pco2: { range: [38, 50], interpretation: ['Alcalose Respiratória', 'Normal', 'Acidose Respiratória'] },
    hco3: { range: [22, 29], interpretation: ['Acidose Metabólica', 'Normal', 'Alcalose Metabólica'] },
    be: { range: [-2, 2], interpretation: ['BE Negativo (Acidose)', 'Normal', 'BE Positivo (Alcalose)'] },
    so2: { range: [60, 75], interpretation: ['Saturação Baixa', 'Normal', 'Saturação Elevada'] },
  }
};

const InputField = ({ label, unit, value, onChange, placeholder, step = "any", name, gasometryType }) => {
  const [status, setStatus] = useState('default'); // 'default', 'valid', 'invalid'

  useEffect(() => {
    const numValue = parseFloat(value);
    if (value === '' || isNaN(numValue)) {
      setStatus('default');
      return;
    }

    const ref = referenceRanges[gasometryType][name];
    if (ref && ref.range) {
      setStatus(numValue >= ref.range[0] && numValue <= ref.range[1] ? 'valid' : 'invalid');
    }
  }, [value, gasometryType, name]);

  const validationClasses = {
    default: 'border-gray-300 focus:ring-orange-500',
    valid: 'border-green-500 bg-green-50 focus:ring-green-500',
    invalid: 'border-red-500 bg-red-50 focus:ring-red-500',
  };
  
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1">{label} {unit && <span className="text-gray-400 font-normal">({unit})</span>}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        step={step}
        className={`w-full px-4 py-3 border rounded-lg focus:border-transparent outline-none transition-colors duration-200 ${validationClasses[status]}`}
      />
    </div>
  );
};


const GasometrySection: React.FC<GasometrySectionProps> = ({ onBack }) => {
  const [gasometryType, setGasometryType] = useState('arterial');
  const [ph, setPh] = useState('');
  const [po2, setPo2] = useState('');
  const [pco2, setPco2] = useState('');
  const [hco3, setHco3] = useState('');
  const [be, setBe] = useState('');
  const [so2, setSo2] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleClear = () => {
    setGasometryType('arterial');
    setPh('');
    setPo2('');
    setPco2('');
    setHco3('');
    setBe('');
    setSo2('');
    setAnalysisResult(null);
  };

  const handleCalculate = () => {
    const values = { ph, po2, pco2, hco3, be, so2 };
    const numPh = parseFloat(ph);
    const numPco2 = parseFloat(pco2);
    const numHco3 = parseFloat(hco3);

    if (isNaN(numPh) || isNaN(numPco2) || isNaN(numHco3)) {
        setAnalysisResult({ error: 'Preencha pH, PCO₂ e HCO₃⁻ para a interpretação.' });
        return;
    }

    const ranges = referenceRanges[gasometryType];
    const results: any = { general: { primary: 'Equilíbrio ácido-básico normal.', secondary: '' } };
    
    // Evaluate individual parameter status for UI feedback
    Object.keys(values).forEach(key => {
        const value = parseFloat(values[key]);
        if (!isNaN(value) && ranges[key]) {
            const ref = ranges[key];
            let status = 'normal';
            if (value < ref.range[0]) status = 'low';
            else if (value > ref.range[1]) status = 'high';
            results[key] = { status };
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
            results.general.primary = 'Acidose Mista (Metabólica e Respiratória)';
        } else if (isMetaAcidosis) {
            results.general.primary = 'Acidose Metabólica';
            const expectedPco2 = (1.5 * numHco3) + 8;
            if (numPco2 > expectedPco2 + 2) {
                results.general.secondary = 'Com Acidose Respiratória associada (distúrbio misto).';
            } else if (numPco2 < expectedPco2 - 2) {
                results.general.secondary = 'Com Alcalose Respiratória associada (distúrbio misto).';
            } else {
                results.general.secondary = `Compensação respiratória adequada. PCO₂ esperado: ${expectedPco2.toFixed(1)} (±2) mmHg.`;
            }
        } else if (isRespAcidosis) {
            results.general.primary = 'Acidose Respiratória';
            const deltaPco2 = numPco2 - 40;
            const expectedHco3Acute = 24 + 1 * (deltaPco2 / 10);
            const expectedHco3Chronic = 24 + 3.5 * (deltaPco2 / 10);
            if (numHco3 > expectedHco3Chronic + 3) {
                 results.general.secondary = 'Com Alcalose Metabólica associada (distúrbio misto).';
            } else if (numHco3 < expectedHco3Acute - 3) {
                results.general.secondary = 'Com Acidose Metabólica associada (distúrbio misto).';
            } else {
                results.general.secondary = `Compensação metabólica esperada. HCO₃⁻ agudo: ~${expectedHco3Acute.toFixed(1)}, crônico: ~${expectedHco3Chronic.toFixed(1)} mmol/L.`;
            }
        } else {
             results.general.primary = 'Acidemia de causa indeterminada pelos dados fornecidos.';
        }
    } else if (isAlkalemia) {
        if (isMetaAlkalosis && isRespAlkalosis) {
            results.general.primary = 'Alcalose Mista (Metabólica e Respiratória)';
        } else if (isMetaAlkalosis) {
            results.general.primary = 'Alcalose Metabólica';
            const expectedPco2 = (0.7 * numHco3) + 21;
            if (numPco2 > expectedPco2 + 5) {
                results.general.secondary = 'Com Acidose Respiratória associada (distúrbio misto).';
            } else if (numPco2 < expectedPco2 - 5) {
                results.general.secondary = 'Com Alcalose Respiratória associada (distúrbio misto).';
            } else {
                results.general.secondary = `Compensação respiratória adequada. PCO₂ esperado: ${expectedPco2.toFixed(1)} (±5) mmHg.`;
            }
        } else if (isRespAlkalosis) {
            results.general.primary = 'Alcalose Respiratória';
            const deltaPco2 = 40 - numPco2;
            const expectedHco3Acute = 24 - 2 * (deltaPco2 / 10);
            const expectedHco3Chronic = 24 - 5 * (deltaPco2 / 10);
            if (numHco3 < expectedHco3Chronic - 3) {
                results.general.secondary = 'Com Acidose Metabólica associada (distúrbio misto).';
            } else if (numHco3 > expectedHco3Acute + 3) {
                results.general.secondary = 'Com Alcalose Metabólica associada (distúrbio misto).';
            } else {
                results.general.secondary = `Compensação metabólica esperada. HCO₃⁻ agudo: ~${expectedHco3Acute.toFixed(1)}, crônico: ~${expectedHco3Chronic.toFixed(1)} mmol/L.`;
            }
        } else {
            results.general.primary = 'Alcalemia de causa indeterminada pelos dados fornecidos.';
        }
    } else { // pH Normal
        if (isRespAcidosis && isMetaAlkalosis) {
            results.general.primary = 'Distúrbio Misto (Acidose Respiratória e Alcalose Metabólica)';
        } else if (isRespAlkalosis && isMetaAcidosis) {
            results.general.primary = 'Distúrbio Misto (Alcalose Respiratória e Acidose Metabólica)';
        } else if (!isRespAcidosis && !isRespAlkalosis && !isMetaAcidosis && !isMetaAlkalosis) {
            results.general.primary = 'Equilíbrio ácido-básico normal.';
        } else {
            results.general.primary = 'Distúrbio ácido-básico compensado.';
            results.general.secondary = 'O pH está na faixa normal, indicando compensação completa ou um distúrbio misto complexo.';
        }
    }
    
    setAnalysisResult(results);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
            <Droplets className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-orange-700 uppercase leading-tight">Gasometria</h2>
            <p className="text-[10px] text-gray-400 font-medium uppercase">Calculadora & Guia</p>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="p-2.5 bg-orange-50 text-orange-600 hover:bg-orange-100 rounded-full transition-colors flex items-center justify-center shadow-sm"
          aria-label="Voltar para a página inicial"
        >
          <Home className="w-5 h-5" />
        </button>
      </div>
      
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Tipo de Gasometria:</label>
              <div className="relative">
                <select
                  value={gasometryType}
                  onChange={(e) => {setAnalysisResult(null); setGasometryType(e.target.value);}}
                  className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-white"
                >
                  <option value="arterial">Arterial</option>
                  <option value="venous">Venosa</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
            <InputField name="ph" gasometryType={gasometryType} label="pH" unit="" value={ph} onChange={setPh} placeholder="Ex: 7.35" step="0.01" />
            <InputField name="po2" gasometryType={gasometryType} label="PO₂" unit="mmHg" value={po2} onChange={setPo2} placeholder="Ex: 83" />
            <InputField name="pco2" gasometryType={gasometryType} label="PCO₂" unit="mmHg" value={pco2} onChange={setPco2} placeholder="Ex: 40" />
            <InputField name="hco3" gasometryType={gasometryType} label="HCO₃⁻" unit="mmol/L" value={hco3} onChange={setHco3} placeholder="Ex: 24" />
            <InputField name="be" gasometryType={gasometryType} label="Base Excess (BE)" unit="" value={be} onChange={setBe} placeholder="Ex: 0" />
            <InputField name="so2" gasometryType={gasometryType} label="SO₂" unit="%" value={so2} onChange={setSo2} placeholder="Ex: 95" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={handleClear} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors">
            <Eraser className="w-5 h-5" /> Limpar
          </button>
          <button onClick={handleCalculate} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors shadow">
            <Calculator className="w-5 h-5" /> Calcular
          </button>
        </div>
      </div>

      {analysisResult && (
        <div className="mt-6 animate-in fade-in">
          {analysisResult.error ? (
              <div className="p-4 rounded-lg flex items-center gap-3 bg-red-50 border-l-4 border-red-400">
                <AlertTriangle className="w-5 h-5 text-red-600"/>
                <p className="text-red-800 font-medium">{analysisResult.error}</p>
              </div>
          ) : (
            <div className="pt-2">
                <p className="font-bold text-gray-600 mb-2">Interpretação Geral</p>
                <div className={`p-4 rounded-lg flex items-start gap-3 ${analysisResult.general.primary.includes('normal') ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'} border-l-4`}>
                    <HeartPulse className={`w-5 h-5 mt-0.5 ${analysisResult.general.primary.includes('normal') ? 'text-green-700' : 'text-red-700'}`} />
                    <div>
                        <p className={`font-bold ${analysisResult.general.primary.includes('normal') ? 'text-green-800' : 'text-red-800'}`}>{analysisResult.general.primary}</p>
                        {analysisResult.general.secondary && <p className={`text-sm ${analysisResult.general.primary.includes('normal') ? 'text-green-700' : 'text-red-700'}`}>{analysisResult.general.secondary}</p>}
                    </div>
                </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default GasometrySection;
