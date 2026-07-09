
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppView } from './types';
import Home from './components/Home';
import ProphylaxisSection from './components/ProphylaxisSection';
import RenalAdjustmentSection from './components/RenalAdjustmentSection';
import ConsentModal from './components/ConsentModal';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [consentAccepted, setConsentAccepted] = useState<boolean>(false);
  const [showConsentReview, setShowConsentReview] = useState<boolean>(false);

  // Handle PWA installation prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setView(event.state.view);
      } else {
        setView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Initialize history state if it's the first load
    if (!window.history.state) {
      window.history.replaceState({ view: 'home' }, '');
    } else if (window.history.state.view) {
      setView(window.history.state.view);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (newView: AppView) => {
    if (newView !== view) {
      window.history.pushState({ view: newView }, '', `#${newView}`);
      setView(newView);
    }
  };

  const renderView = () => {
    switch (view) {
      case 'prophylaxis':
        return (
          <motion.div
            key="prophylaxis"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <ProphylaxisSection onBack={() => navigateTo('home')} />
          </motion.div>
        );
      case 'renal':
        return (
          <motion.div
            key="renal"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <RenalAdjustmentSection onBack={() => navigateTo('home')} />
          </motion.div>
        );
      case 'home':
      default:
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Home 
              onNavigate={navigateTo} 
              canInstall={!!deferredPrompt} 
              onInstall={handleInstallClick} 
              onShowConsent={() => setShowConsentReview(true)}
            />
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AnimatePresence>
        {!consentAccepted && (
          <ConsentModal 
            onAccept={() => {
              setConsentAccepted(true);
            }} 
          />
        )}
        {showConsentReview && (
          <ConsentModal 
            onAccept={() => {}} 
            isReviewMode={true}
            onClose={() => setShowConsentReview(false)}
          />
        )}
      </AnimatePresence>

      {/* O acesso ao termo de ciência está fixado de forma limpa nos rodapés da aplicação */}

      <AnimatePresence mode="wait">
        {view === 'home' ? (
          renderView()
        ) : (
          <div className="max-w-4xl mx-auto px-4 pt-8 pb-12">
            {renderView()}
            {/* Footer Disclaimer persistente nas seções - Interativo para acessar o Termo de Ciência */}
            <motion.button 
              onClick={() => setShowConsentReview(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12 w-full pt-8 border-t border-gray-200 text-center space-y-2 pb-8 hover:opacity-80 transition-opacity cursor-pointer group flex flex-col items-center"
            >
              <p className="text-[10px] text-gray-500 max-w-md mx-auto leading-relaxed font-medium">
                Este aplicativo é uma ferramenta de consulta rápida para profissionais de saúde, baseado em diretrizes institucionais e bases de dados de referência. Uso exclusivo profissional.
              </p>
              <p className="text-[11px] text-[#00579D] font-bold uppercase tracking-wide group-hover:underline">
                © ISCAL – Irmandade da Santa Casa de Londrina • <span className="underline font-black text-[#00579D]">Ver Termo de Ciência</span>
              </p>
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;