
import React from 'react';
import { Protocol } from '../types';
import { Info } from 'lucide-react';
import ProtocolCard from './ProtocolCard';

interface ProtocolTableProps {
  protocols: Protocol[];
}

const ProtocolTable: React.FC<ProtocolTableProps> = ({ protocols }) => {
  if (protocols.length === 0) {
    return (
      <div className="text-center py-12">
        <Info className="mx-auto h-12 w-12 text-gray-300" />
        <p className="mt-2 text-lg text-gray-500">Nenhum protocolo encontrado.</p>
        <p className="text-sm text-gray-400">Tente buscar por outro termo ou limpar os filtros.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Visualização Mobile: Lista de Cartões */}
      <div className="block md:hidden space-y-4">
        {protocols.map((protocol) => (
          <ProtocolCard key={protocol.id} protocol={protocol} />
        ))}
      </div>

      {/* Visualização Desktop: Tabela Responsiva */}
      <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-lg shadow-sm bg-white">
        {/* Usando table-auto para um layout mais fluido e w-full para preencher o container */}
        <table className="w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr>
              {/* Colunas com largura definida para melhor distribuição */}
              <th scope="col" className="w-2/6 px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Cirurgia
              </th>
              <th scope="col" className="w-2/6 px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Antibiótico
              </th>
              {/* Colunas restantes com largura automática */}
              <th scope="col" className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Indução
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Intra-Op
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider bg-blue-50 border-l border-blue-100">
                Duração
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider bg-blue-50 border-l border-blue-100">
                Pós-Op/Intervalo
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-sm">
            {protocols.map((protocol) => {
               const isHighRisk = protocol.procedure.toLowerCase().includes('alto risco') || protocol.procedure.toLowerCase().includes('perfurada');
               const isNoAntibiotic = protocol.antibiotic.toLowerCase().includes('não indicado') || protocol.antibiotic.toLowerCase().includes('sem indicação');

              return (
                <tr key={protocol.id} className="hover:bg-slate-50 transition-colors">
                  {/* Padding reduzido e break-words para quebra de texto */}
                  <td className="px-3 py-4 align-top break-words">
                    <div className="font-semibold text-gray-900">{protocol.procedure}</div>
                    <div className="text-xs text-blue-600 mt-1 font-medium">{protocol.category}</div>
                     {isHighRisk && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 mt-1">
                        Alto Risco
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-4 align-top break-words">
                    <span className={`font-medium whitespace-pre-line ${isNoAntibiotic ? 'text-gray-400 italic' : 'text-gray-900'}`}>
                      {protocol.antibiotic}
                    </span>
                  </td>
                  <td className="px-3 py-4 align-top text-gray-600">
                    {protocol.inductionDose}
                  </td>
                  <td className="px-3 py-4 align-top text-gray-600">
                    {protocol.intraOp}
                  </td>
                  <td className="px-3 py-4 align-top text-gray-600 bg-blue-50 border-l border-blue-100">
                    {protocol.duration}
                  </td>
                  <td className="px-3 py-4 align-top text-gray-600 bg-blue-50 border-l border-blue-100">
                    {protocol.postOpInterval || '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProtocolTable;
