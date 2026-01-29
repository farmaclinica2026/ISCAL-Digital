
import React, { useState } from 'react';
import { RefreshCw, Home, Search, ExternalLink, AlertTriangle, Info, Loader2, CheckCircle } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import InteractionResultCard from './InteractionResultCard';

interface Interaction {
  drugs: string[];
  severity: string;
  effect: string;
  reason: string;
}

interface InteractionSectionProps {
  onBack: () => void;
}

const InteractionSection: React.FC<InteractionSectionProps> = ({ onBack }) => {
  const [drugs, setDrugs] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Interaction[] | string | null>(null);

  const handleSearch = async () => {
    if (!drugs.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Aja como um farmacêutico clínico sênior e especialista em interações medicamentosas. Sua base de conhecimento inclui dados de fontes de referência mundial como Drugs.com, IBM Micromedex, Cerner Multum, American Society of Health-System Pharmacists (ASHP), FDA e Mayo Clinic.
Para os fármacos a seguir: ${drugs}.
1. Traduza os nomes para o inglês para a busca.
2. Analise as interações e filtre APENAS as classificadas como 'Major' (Grave).
3. Para cada interação grave, retorne os seguintes dados em um JSON:
   - 'drugs': uma lista com os nomes dos fármacos que interagem em português.
   - 'severity': o nível de gravidade, que será 'Grave'.
   - 'effect': uma descrição clara do efeito clínico que a interação pode causar.
   - 'reason': um resumo do motivo da gravidade, focado no risco clínico principal.
Se não encontrar interações graves, retorne um JSON com uma lista 'interactions' vazia.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              interactions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    drugs: { type: Type.ARRAY, items: { type: Type.STRING } },
                    severity: { type: Type.STRING },
                    effect: { type: Type.STRING },
                    reason: { type: Type.STRING },
                  },
                  required: ["drugs", "severity", "effect", "reason"]
                }
              }
            },
            required: ["interactions"]
          }
        },
      });

      try {
        const data = JSON.parse(response.text);
        if (data.interactions && data.interactions.length > 0) {
          setResult(data.interactions);
        } else {
          setResult("Nenhuma interação grave encontrada entre os medicamentos pesquisados.");
        }
      } catch (parseError) {
        console.error("JSON parsing error:", parseError);
        setResult("A resposta da IA não pôde ser processada. Verifique a formatação do resultado.");
      }
    } catch (error) {
      console.error(error);
      setResult('Erro ao consultar a base de dados. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-indigo-700 uppercase leading-tight">Interação Medicamentosa</h2>
            <p className="text-[10px] text-gray-400 font-medium uppercase">Verificador de Conflitos</p>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="p-2.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-full transition-colors flex items-center justify-center shadow-sm"
          aria-label="Voltar para a página inicial"
        >
          <Home className="w-5 h-5" />
        </button>
      </div>

      {/* Drugs.com Access Card */}
      <div className="bg-indigo-600 rounded-2xl p-5 text-white shadow-lg mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <ExternalLink className="w-20 h-20 rotate-12" />
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <h3 className="font-bold flex items-center gap-2">
            <ExternalLink className="w-5 h-5" /> Base de Referência
          </h3>
          <a 
            href="https://www.drugs.com/drug_interactions.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white/20 hover:bg-white/30 transition-colors text-white py-2 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-white/30"
          >
            Validar no Drugs.com <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
        <label className="block text-sm font-bold text-gray-700 mb-2">Análise por IA ISCAL</label>
        <div className="flex flex-col gap-3">
          <div className="relative">
            <textarea
              className="w-full p-4 pr-12 border border-gray-300 rounded-xl min-h-[100px] focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm leading-relaxed"
              placeholder="Digite os fármacos separados por vírgula. Ex: Varfarina, AAS, Clopidogrel"
              value={drugs}
              onChange={(e) => setDrugs(e.target.value)}
            />
            <div className="absolute top-4 right-4">
              <RefreshCw className={`w-5 h-5 text-gray-300 ${loading ? 'animate-spin' : ''}`} />
            </div>
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !drugs.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white py-4 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-pulse" /> : <Search className="w-5 h-5" />}
            {loading ? 'Analisando Interações...' : 'Analisar Conflitos'}
          </button>
        </div>
      </div>

      {/* Result Display */}
      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 mb-4">
            {typeof result === 'string' ? (
                 <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
                <AlertTriangle className="w-5 h-5 text-red-600" />
            )}
            <h3 className="font-bold text-gray-800">
                {typeof result === 'string' ? 'Análise Concluída' : 'Análise de Interações Graves'}
            </h3>
          </div>
          
          <div className="space-y-4">
            {typeof result === 'string' ? (
              <p className="text-sm text-gray-600">{result}</p>
            ) : (
              result.map((interaction, index) => (
                <InteractionResultCard key={interaction.drugs.join('-') + index} interaction={interaction} />
              ))
            )}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-start gap-3 bg-slate-50 p-4 rounded-xl">
            <Info className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-gray-500 leading-tight">
              Aviso: Esta análise é gerada por inteligência artificial e deve ser validada no Drugs.com ou por um farmacêutico clínico. Não substitui o julgamento profissional.
            </p>
          </div>
        </div>
      )}

      {/* Footer Disclaimer */}
      <div className="mt-10 pt-6 border-t border-gray-200">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-yellow-800">Aviso Importante</h4>
              <p className="mt-1 text-xs text-yellow-900 leading-relaxed">
                Os resultados encontrados são de uma base de dados externa, não sendo um canal oficial da instituição.
              </p>
              <p className="mt-2 text-xs text-yellow-900 leading-relaxed">
                Esta ferramenta utiliza a base de dados do site Drugs.com apenas como referência para pesquisa.
              </p>
              <p className="mt-2 text-[10px] text-yellow-800/80 leading-relaxed">
                As informações são baseadas em dados de fontes como: IBM Micromedex, Cerner Multum, American Society of Health-System Pharmacists (ASHP), FDA (órgão regulador de medicamentos dos EUA) e Mayo Clinic.
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default InteractionSection;
