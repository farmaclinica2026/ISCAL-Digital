
import React from 'react';
import { RefreshCw, Home, ExternalLink, AlertTriangle } from 'lucide-react';

interface InteractionSectionProps {
  onBack: () => void;
}

const InteractionSection: React.FC<InteractionSectionProps> = ({ onBack }) => {
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
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Verificador de Conflitos</p>
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
      <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl mb-12 relative overflow-hidden group">
        <div className="absolute top-[-20px] right-[-20px] w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/15 transition-colors"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <ExternalLink className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">Base de Referência Global</h3>
              <p className="text-indigo-100 text-sm">Drugs.com Knowledge Base</p>
            </div>
          </div>
          
          <p className="text-indigo-50 mb-8 text-sm leading-relaxed max-w-md font-medium">
            Para garantir a máxima segurança do paciente, utilize a base de dados do Drugs.com, referência mundial em interações farmacológicas.
          </p>

          <a 
            href="https://www.drugs.com/drug_interactions.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-white text-indigo-700 hover:bg-indigo-50 transition-all py-4 px-8 rounded-2xl text-sm font-extrabold shadow-lg hover:shadow-indigo-500/20 active:scale-95 w-full sm:w-auto"
          >
            Acessar Verificador Drugs.com <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Aviso Importante */}
      <div className="mt-10 pt-6 border-t border-gray-200">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
            <AlertTriangle className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-amber-800 uppercase tracking-wide mb-2">Aviso de Isenção</h4>
              <p className="text-xs text-amber-900 leading-relaxed mb-3">
                Os resultados de interações medicamentosas são fornecidos por uma base de dados externa e independente. A ISCAL não gere as informações do Drugs.com.
              </p>
              <p className="text-xs text-amber-900 leading-relaxed font-bold">
                O julgamento clínico do profissional de saúde deve prevalecer sobre qualquer dado automatizado.
              </p>
              <div className="mt-4 pt-4 border-t border-amber-200">
                <p className="text-[10px] text-amber-800/80 leading-relaxed">
                  Referência: IBM Micromedex, Cerner Multum, ASHP, FDA e Mayo Clinic via Drugs.com.
                </p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default InteractionSection;
