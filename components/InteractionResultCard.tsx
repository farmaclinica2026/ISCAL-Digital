
import React from 'react';
import { AlertTriangle, Zap, ShieldAlert } from 'lucide-react';

interface Interaction {
  drugs: string[];
  severity: string;
  effect: string;
  reason: string;
}

interface InteractionResultCardProps {
  interaction: Interaction;
}

const InteractionResultCard: React.FC<InteractionResultCardProps> = ({ interaction }) => {
  return (
    <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 transition-all hover:border-slate-300 hover:bg-slate-100/50">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <span className="inline-block px-3 py-1 text-xs font-bold text-red-700 bg-red-100 border border-red-200 rounded-full w-fit">
          {interaction.severity}
        </span>
        <h4 className="font-bold text-slate-800 text-base leading-tight">
          {interaction.drugs.map((drug, index) => (
            <React.Fragment key={drug + index}>
              <span className="bg-red-50 text-red-900 px-2 py-1 rounded-md border border-red-100">{drug}</span>
              {index < interaction.drugs.length - 1 && <span className="mx-1.5 font-normal text-gray-400">+</span>}
            </React.Fragment>
          ))}
        </h4>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div className="p-3 bg-white rounded-lg border border-gray-200 flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <p className="font-semibold text-gray-500 text-xs uppercase tracking-wide">Efeito Potencial</p>
          </div>
          <p className="text-gray-800">{interaction.effect}</p>
        </div>
        <div className="p-3 bg-white rounded-lg border border-gray-200 flex flex-col">
          <div className="flex items-center gap-2 mb-1">
             <ShieldAlert className="w-4 h-4 text-red-600 flex-shrink-0" />
            <p className="font-semibold text-gray-500 text-xs uppercase tracking-wide">Risco Clínico</p>
          </div>
          <p className="text-gray-800">{interaction.reason}</p>
        </div>
      </div>
    </div>
  );
};

export default InteractionResultCard;
