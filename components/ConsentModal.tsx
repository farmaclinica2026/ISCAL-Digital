import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, ChevronDown, ChevronUp, ShieldCheck, AlertTriangle, Check, X } from 'lucide-react';

interface ConsentModalProps {
  onAccept: () => void;
  isReviewMode?: boolean;
  onClose?: () => void;
}

const ConsentModal: React.FC<ConsentModalProps> = ({ onAccept, isReviewMode = false, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(isReviewMode);
  const [hasChecked, setHasChecked] = useState(isReviewMode);
  const [declined, setDeclined] = useState(false);

  const handleAccept = () => {
    if (hasChecked) {
      onAccept();
    }
  };

  if (declined) {
    return (
      <div className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-red-100 text-center space-y-6"
        >
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
            <AlertTriangle className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900">Acesso Restrito</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Para utilizar o <span className="font-semibold text-gray-800">ISCAL Digital</span>, é obrigatório ler e concordar com o Termo de Ciência e Responsabilidade Técnica.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => setDeclined(false)}
              className="w-full bg-[#00579D] text-white py-3 px-4 rounded-2xl text-sm font-bold shadow-lg hover:bg-[#004680] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Revisar Termo de Ciência
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00579D] to-[#004680] p-6 text-white text-center relative">
          {isReviewMode && onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-bold tracking-tight uppercase">Termo de Ciência e Responsabilidade</h1>
          <p className="text-blue-100/80 text-xs mt-1">Uso Profissional do Aplicativo ISCAL Digital</p>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto scrollbar-thin">
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            Ao acessar esta ferramenta digital, o usuário declara que leu, compreendeu e concorda com os termos descritos abaixo.
          </p>

          {/* Collapsible Section Container */}
          <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/50">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left font-bold text-xs text-[#00579D] hover:bg-slate-100/60 transition-colors uppercase tracking-wider"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Visualizar termo completo
              </span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden border-t border-slate-200 bg-white"
                >
                  <div className="p-4 space-y-4 text-xs text-gray-600 leading-relaxed">
                    <p>
                      Esta plataforma foi desenvolvida com a finalidade de facilitar o acesso aos protocolos institucionais, documentos técnicos e materiais de apoio à prática clínica, promovendo maior agilidade na consulta às informações e contribuindo para a padronização das condutas assistenciais.
                    </p>
                    <p>
                      As informações disponibilizadas têm caráter exclusivamente informativo e de apoio à tomada de decisão clínica, não substituindo o julgamento profissional, a avaliação individualizada do paciente, a legislação vigente, as diretrizes institucionais ou a consulta às equipes responsáveis.
                    </p>
                    
                    <div className="space-y-2.5">
                      <p className="font-bold text-gray-900 uppercase tracking-wide text-[10px]">O usuário reconhece que:</p>
                      <ol className="list-decimal pl-4 space-y-2">
                        <li>É profissional de saúde ou estudante autorizado a utilizar esta ferramenta no âmbito de suas atividades.</li>
                        <li>A responsabilidade pela avaliação clínica, prescrição, administração de medicamentos e demais condutas assistenciais é exclusivamente do profissional habilitado.</li>
                        <li>As informações contidas no aplicativo devem ser utilizadas em conjunto com os protocolos institucionais vigentes, normas técnicas e evidências científicas atualizadas.</li>
                        <li>Eventuais divergências entre o conteúdo apresentado na ferramenta e os documentos oficiais da instituição deverão ser comunicadas aos responsáveis pelo sistema, prevalecendo sempre a versão oficial do protocolo institucional.</li>
                        <li>O desenvolvedor e a instituição não se responsabilizam por decisões clínicas tomadas exclusivamente com base nas informações disponibilizadas nesta ferramenta, sem a devida avaliação profissional.</li>
                        <li>O acesso à ferramenta não autoriza a reprodução, alteração ou distribuição de seu conteúdo sem autorização dos responsáveis.</li>
                      </ol>
                    </div>

                    <p className="pt-2 border-t border-slate-100">
                      Esta ferramenta não armazena dados clínicos dos pacientes nem realiza diagnóstico, prescrição automática ou substituição da avaliação médica, farmacêutica ou de qualquer outro profissional de saúde habilitado.
                    </p>

                    <p className="font-semibold text-[#00579D] bg-[#00579D]/5 p-3 rounded-xl border border-[#00579D]/10">
                      Ao selecionar a opção "Aceito", o usuário declara estar ciente de que utilizará esta ferramenta de forma ética, responsável e em conformidade com os protocolos institucionais, reconhecendo que ela constitui um recurso de apoio à prática clínica e não substitui o julgamento técnico-profissional.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Checkbox and Action Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100">
          {isReviewMode ? (
            <div className="flex justify-center">
              <button
                onClick={onClose}
                className="w-full py-3 bg-[#00579D] hover:bg-[#004680] text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                Fechar Visualização
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer group select-none">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={hasChecked}
                    onChange={(e) => setHasChecked(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center ${hasChecked ? 'bg-[#00579D] border-[#00579D]' : 'bg-white border-slate-300 group-hover:border-slate-400'}`}>
                    {hasChecked && <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />}
                  </div>
                </div>
                <span className="text-xs text-gray-700 font-semibold leading-relaxed">
                  Declaro que li, compreendi e concordo com os termos de uso desta ferramenta.
                </span>
              </label>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => setDeclined(true)}
                  className="w-full sm:w-1/3 py-3 border border-slate-300 hover:bg-slate-100 active:scale-95 rounded-2xl text-xs font-bold text-gray-600 transition-all uppercase tracking-wider"
                >
                  Não aceito
                </button>
                <button
                  onClick={handleAccept}
                  disabled={!hasChecked}
                  className={`w-full sm:w-2/3 py-3 rounded-2xl text-xs font-bold text-white uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${hasChecked ? 'bg-gradient-to-r from-[#00579D] to-[#004680] hover:shadow-lg' : 'bg-slate-300 cursor-not-allowed shadow-none'}`}
                >
                  Aceitar e continuar
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ConsentModal;
