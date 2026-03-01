
import React, { useState } from 'react';
import { AppView } from './types';
import Home from './components/Home';
import ProphylaxisSection from './components/ProphylaxisSection';
import RenalAdjustmentSection from './components/RenalAdjustmentSection';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');

  const renderView = () => {
    switch (view) {
      case 'prophylaxis':
        return <ProphylaxisSection onBack={() => setView('home')} />;
      case 'renal':
        return <RenalAdjustmentSection onBack={() => setView('home')} />;
      case 'home':
      default:
        return <Home onNavigate={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {view === 'home' ? (
        renderView()
      ) : (
        <div className="max-w-4xl mx-auto px-4 pt-8 pb-12">
          {renderView()}
          {/* Footer Disclaimer persistente nas seções */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center space-y-2 pb-8">
            <p className="text-[10px] text-gray-500 max-w-md mx-auto">
              Este aplicativo é uma ferramenta de consulta rápida para profissionais de saúde, baseado em diretrizes institucionais e bases de dados de referência. Uso exclusivo profissional.
            </p>
            <p className="text-xs text-gray-700 font-bold uppercase tracking-wide">
              © ISCAL – Irmandade da Santa Casa de Londrina
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;