import React from 'react';
import { Baby } from 'lucide-react';
import { pediatricDoses } from '../data';

const PediatricSection: React.FC = () => {
  return (
    <div className="space-y-6">
       <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex items-start">
        <Baby className="h-6 w-6 text-blue-500 mr-3 mt-1" />
        <div>
          <h3 className="font-bold text-blue-800">Cirurgia Pediátrica</h3>
          <p className="text-sm text-blue-700 mt-1">
            O antimicrobiano deve ser iniciado no máximo 1 hora antes da incisão. Em cirurgias contaminadas e infectadas, considera-se tratamento e não profilaxia.
          </p>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Doses Pediátricas
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Referência de dosagem por peso.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            {pediatricDoses.map((item, index) => (
              <div key={item.drug} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                <dt className="text-sm font-medium text-gray-900">
                  {item.drug}
                </dt>
                <dd className="mt-1 text-sm text-gray-700 sm:mt-0 sm:col-span-2">
                  {item.dose}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-bold text-lg mb-3">Neonatal</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-gray-500">Idade</th>
                <th className="px-3 py-2 text-left font-medium text-gray-500">Sem abertura alça intestinal</th>
                <th className="px-3 py-2 text-left font-medium text-gray-500">Com abertura alça intestinal</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-3 py-2 whitespace-nowrap">&lt; 72 h de vida</td>
                <td className="px-3 py-2">Penicilina + Gentamicina</td>
                <td className="px-3 py-2">Penicilina + Gentamicina + Metronidazol</td>
              </tr>
              <tr>
                <td className="px-3 py-2 whitespace-nowrap">&gt; 72 h de vida</td>
                <td className="px-3 py-2">Cefazolina</td>
                <td className="px-3 py-2">Cefazolina + Metronidazol</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          * A duração máxima da profilaxia é 24 horas.
        </p>
      </div>
    </div>
  );
};

export default PediatricSection;