import React from 'react';
import { AlertTriangle, Clock, ShieldCheck, Thermometer } from 'lucide-react';

const GeneralGuidelines: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700 font-bold">
              Princípios Básicos
            </p>
            <p className="text-sm text-yellow-700 mt-1">
              O objetivo é prevenir infecção no sítio cirúrgico. A profilaxia termina ao fim da cirurgia (sutura), exceto em casos específicos indicados.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-3 text-blue-600">
            <Clock className="w-6 h-6 mr-2" />
            <h3 className="font-bold text-lg">Tempo de Início</h3>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
            <li><strong>Início SEMPRE antes:</strong> Até 30 minutos da 1ª incisão.</li>
            <li><strong>Cefalosporinas:</strong> Administrar em 5 min.</li>
            <li><strong>Aminoglicosídeo/Clindamicina:</strong> em 20 a 30 min.</li>
            <li><strong>Vancomicina:</strong> em 45 a 60 min.</li>
          </ul>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-3 text-red-600">
            <Thermometer className="w-6 h-6 mr-2" />
            <h3 className="font-bold text-lg">Repique Intra-operatório</h3>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
            <li>Repetir dose se a cirurgia durar mais que <strong>4 horas</strong>.</li>
            <li>Repetir dose se houver perda sanguínea <strong>&gt; 1 litro</strong>.</li>
            <li>Não é necessário correção pela função renal na dose profilática única.</li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
         <div className="flex items-center mb-3 text-emerald-600">
            <ShieldCheck className="w-6 h-6 mr-2" />
            <h3 className="font-bold text-lg">Considerações</h3>
          </div>
          <p className="text-gray-700 text-sm mb-2">
            A antibioticoprofilaxia tardia (após a incisão) pode diminuir a extensão da infecção mas não diminui sua incidência.
          </p>
           <p className="text-gray-700 text-sm">
            Riscos de profilaxia precoce (horas/dias antes): Surgimento de patógenos resistentes e superinfecções.
          </p>
      </div>
    </div>
  );
};

export default GeneralGuidelines;