
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
  const [consentAccepted, setConsentAccepted] = useState<boolean>(() => {
    return localStorage.getItem('iscal_consent_accepted') === 'true';
  });

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
              localStorage.setItem('iscal_consent_accepted', 'true');
              setConsentAccepted(true);
            }} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {view === 'home' ? (
          renderView()
        ) : (
          <div className="max-w-4xl mx-auto px-4 pt-8 pb-12">
            {renderView()}
            {/* Footer Disclaimer persistente nas seções */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12 pt-8 border-t border-gray-200 text-center space-y-2 pb-8"
            >
              <p className="text-[10px] text-gray-500 max-w-md mx-auto">
                Este aplicativo é uma ferramenta de consulta rápida para profissionais de saúde, baseado em diretrizes institucionais e bases de dados de referência. Uso exclusivo profissional.
              </p>
              <p className="text-xs text-gray-700 font-bold uppercase tracking-wide">
                © ISCAL – Irmandade da Santa Casa de Londrina
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;