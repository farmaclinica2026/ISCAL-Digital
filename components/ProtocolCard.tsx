import React from 'react';
import { Protocol } from '../types';
import { Clock, Pill, Activity, Syringe, Hourglass } from 'lucide-react';

interface ProtocolCardProps {
  protocol: Protocol;
}

const ProtocolCard: React.FC<ProtocolCardProps> = ({ protocol }) => {
  const isHighRisk = protocol.procedure.toLowerCase().includes('alto risco') || protocol.procedure.toLowerCase().includes('perfurada');
  const isNoAntibiotic = protocol.antibiotic.toLowerCase().includes('não indicado') || protocol.antibiotic.toLowerCase().includes('sem indicação');

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${isNoAntibiotic ? 'border-gray-200' : 'border-l-4 border-l-blue-500 border-y-gray-200 border-r-gray-200'} p-5 hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-gray-800 leading-tight">
          {protocol.procedure}
        </h3>
        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap ml-2">
          {protocol.category}
        </span>
      </div>

      {isHighRisk && (
        <div className="mb-3">
           <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100">
             Alto Risco / Contaminada
           </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className={`col-span-1 md:col-span-2 flex items-start p-3 rounded-xl border ${isNoAntibiotic ? 'bg-gray-50/50 border-gray-100' : 'bg-indigo-50/40 border-indigo-100/50'}`}>
          <Pill className={`h-5 w-5 mr-2.5 mt-0.5 ${isNoAntibiotic ? 'text-gray-400' : 'text-indigo-600'}`} />
          <div>
            <span className={`block text-xs uppercase font-extrabold tracking-wider ${isNoAntibiotic ? 'text-gray-500' : 'text-indigo-800'}`}>Antibiótico</span>
            <span className={`text-base font-bold whitespace-pre-line leading-relaxed ${isNoAntibiotic ? 'text-gray-500 italic' : 'text-indigo-950'}`}>
              {protocol.antibiotic}
            </span>
          </div>
        </div>

        {!isNoAntibiotic && (
          <>
            <div className="flex items-start p-1">
              <Syringe className="h-5 w-5 mr-2.1 mt-0.5 text-emerald-600" />
              <div>
                <span className="block text-xs text-gray-500 uppercase font-semibold">Dose Indução</span>
                <span className="text-sm text-gray-900 font-medium">{protocol.inductionDose}</span>
              </div>
            </div>

            <div className="flex items-start p-1">
              <Activity className="h-5 w-5 mr-2.1 mt-0.5 text-amber-600" />
              <div>
                <span className="block text-xs text-gray-500 uppercase font-semibold">Intra-op</span>
                <span className="text-sm text-gray-900 font-medium">{protocol.intraOp}</span>
              </div>
            </div>

            <div className="flex items-start p-3 bg-blue-50/80 border border-blue-100/50 rounded-xl">
              <Hourglass className="h-5 w-5 mr-2.5 mt-0.5 text-blue-600" />
              <div>
                <span className="block text-xs text-blue-800 uppercase font-extrabold tracking-wider">Duração</span>
                <span className="text-sm text-blue-950 font-bold">{protocol.duration}</span>
              </div>
            </div>

            <div className="flex items-start p-3 bg-blue-50/80 border border-blue-100/50 rounded-xl">
              <Clock className="h-5 w-5 mr-2.5 mt-0.5 text-indigo-600" />
              <div>
                <span className="block text-xs text-indigo-800 uppercase font-extrabold tracking-wider">Dose Pós-Op / Intervalo</span>
                <span className="text-sm text-slate-900 font-bold">{protocol.postOpInterval || '-'}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProtocolCard;