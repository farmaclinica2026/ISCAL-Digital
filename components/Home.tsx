
import React from 'react';
import { ShieldAlert, Activity, Info, RefreshCw, Lock, Droplets } from 'lucide-react';
import { AppView } from '../types';

interface HomeProps { onNavigate: (view: AppView) => void; }

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-10">
      {/* Header SUS Style */}
      <header className="bg-[#00579D] pt-12 pb-28 px-6 relative rounded-b-[40px] shadow-lg overflow-hidden">
        <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-[-20px] left-[-20px] w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-md mx-auto relative z-10 text-center">
          <div className="inline-block bg-white/20 p-2 rounded-2xl mb-4 backdrop-blur-sm">
            <ShieldAlert className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">ISCAL Digital</h1>
          <p className="text-blue-100 text-sm font-medium mt-1">Protocolos de Segurança</p>
        </div>
      </header>

      {/* Grid de Botões */}
      <main className="max-w-md mx-auto px-6 -mt-20 relative z-20 w-full">
        <div className="grid grid-cols-3 gap-4 bg-white p-4 rounded-3xl shadow-lg border border-gray-100">
          
          {/* Módulo Profilaxia */}
          <button 
            onClick={() => onNavigate('prophylaxis')}
            className="flex flex-col items-center justify-start p-2 rounded-xl hover:bg-blue-50 transition-colors group"
          >
            <div className="w-16 h-16 border-2 border-blue-600/80 rounded-2xl flex items-center justify-center transform transition-transform duration-200 group-hover:scale-105">
              <ShieldAlert className="w-8 h-8 text-blue-600/80" />
            </div>
            <p className="h-14 flex items-center justify-center text-center text-[10px] font-bold text-gray-700 mt-2 leading-tight uppercase">
              Profilaxia Antibiótica<br/>Perioperatória
            </p>
          </button>

          {/* Módulo Renal */}
          <button 
            onClick={() => onNavigate('renal')}
            className="flex flex-col items-center justify-start p-2 rounded-xl hover:bg-green-50 transition-colors group"
          >
            <div className="w-16 h-16 border-2 border-green-600/80 rounded-2xl flex items-center justify-center transform transition-transform duration-200 group-hover:scale-105">
              <Activity className="w-8 h-8 text-green-600/80" />
            </div>
            <p className="h-14 flex items-center justify-center text-center text-[10px] font-bold text-gray-700 mt-2 leading-tight uppercase">
              Ajuste Renal de<br/>Antimicrobianos
            </p>
          </button>

          {/* Módulo Interação Medicamentosa */}
          <button 
            onClick={() => onNavigate('interactions')}
            className="flex flex-col items-center justify-start p-2 rounded-xl hover:bg-indigo-50 transition-colors group"
          >
            <div className="w-16 h-16 border-2 border-indigo-600/80 rounded-2xl flex items-center justify-center transform transition-transform duration-200 group-hover:scale-105">
              <RefreshCw className="w-8 h-8 text-indigo-600/80" />
            </div>
            <p className="h-14 flex items-center justify-center text-center text-[10px] font-bold text-gray-700 mt-2 leading-tight uppercase">
              Interação<br/>Medicamentosa
            </p>
          </button>

          {/* Módulo Gasometria */}
          <button 
            onClick={() => onNavigate('gasometry')}
            className="flex flex-col items-center justify-start p-2 rounded-xl hover:bg-orange-50 transition-colors group"
          >
            <div className="w-16 h-16 border-2 border-orange-600/80 rounded-2xl flex items-center justify-center transform transition-transform duration-200 group-hover:scale-105">
              <Droplets className="w-8 h-8 text-orange-600/80" />
            </div>
            <p className="h-14 flex items-center justify-center text-center text-[10px] font-bold text-gray-700 mt-2 leading-tight uppercase">
              Análise de<br/>Gasometria
            </p>
          </button>

          {/* Placeholder Em Construção */}
          <div className="flex flex-col items-center justify-start p-2 rounded-xl">
             <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center">
              <Lock className="w-7 h-7 text-gray-400" />
            </div>
            <p className="h-14 flex items-center justify-center text-center text-[10px] font-bold text-gray-400 mt-2 leading-tight uppercase">
              Em Breve
            </p>
          </div>
          
          {/* Placeholder Em Construção */}
          <div className="flex flex-col items-center justify-start p-2 rounded-xl">
             <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center">
              <Lock className="w-7 h-7 text-gray-400" />
            </div>
            <p className="h-14 flex items-center justify-center text-center text-[10px] font-bold text-gray-400 mt-2 leading-tight uppercase">
              Em Breve
            </p>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-[#00579D]/5 border border-[#00579D]/10 rounded-3xl p-6 flex items-start gap-4">
          <Info className="w-5 h-5 text-[#00579D] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] text-[#00579D]/80 leading-relaxed font-medium">
              Este aplicativo é uma ferramenta de consulta rápida para profissionais de saúde, baseado em diretrizes institucionais e bases de dados de referência. Uso exclusivo profissional.
            </p>
            <p className="mt-3 text-[11px] text-[#00579D] font-bold uppercase tracking-wide">
              © ISCAL – Irmandade da Santa Casa de Londrina
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;