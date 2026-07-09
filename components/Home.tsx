
import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Activity, Info, Download } from 'lucide-react';
import { AppView } from '../types';

interface HomeProps { 
  onNavigate: (view: AppView) => void;
  canInstall?: boolean;
  onInstall?: () => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, canInstall, onInstall }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-10">
      {/* Header SUS Style */}
      <header className="bg-[#00579D] pt-12 pb-28 px-6 relative rounded-b-[40px] shadow-lg overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/10 rounded-full blur-2xl"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
          className="absolute bottom-[-20px] left-[-20px] w-60 h-60 bg-white/5 rounded-full blur-3xl"
        ></motion.div>
        
        <div className="max-w-md mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block bg-white p-2 rounded-2xl mb-4 shadow-xl"
          >
            <img 
              src="/pwa-192x192.svg" 
              alt="ISCAL Logo" 
              className="w-16 h-16 object-contain"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.h1 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-extrabold text-white tracking-tight"
          >
            ISCAL Digital
          </motion.h1>
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-blue-100 text-sm font-medium mt-1"
          >
            Protocolos de Segurança
          </motion.p>

          {canInstall && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={onInstall}
              className="mt-6 bg-white text-[#00579D] px-6 py-2.5 rounded-2xl text-xs font-black uppercase shadow-2xl flex items-center gap-2 mx-auto active:scale-95 transition-transform"
            >
              <Download className="w-4 h-4" />
              Instalar Aplicativo
            </motion.button>
          )}
        </div>
      </header>

        {/* Grid de Botões */}
        <main className="max-w-md mx-auto px-6 -mt-20 relative z-20 w-full">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-4 bg-white p-4 rounded-3xl shadow-lg border border-gray-100"
          >
          
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
              Guia Rápido para<br/>ajuste de antimicrobianos
            </p>
          </button>
        </motion.div>

        {/* Info Card */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-[#00579D]/5 border border-[#00579D]/10 rounded-3xl p-6 flex items-start gap-4"
        >
          <Info className="w-5 h-5 text-[#00579D] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] text-[#00579D]/80 leading-relaxed font-medium">
              Este aplicativo é uma ferramenta de consulta rápida para profissionais de saúde, baseado em diretrizes institucionais e bases de dados de referência. Uso exclusivo profissional.
            </p>
            <p className="mt-3 text-[11px] text-[#00579D] font-bold uppercase tracking-wide">
              © ISCAL – Irmandade da Santa Casa de Londrina
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;