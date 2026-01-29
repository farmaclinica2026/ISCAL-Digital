
import { Protocol } from './types';

export const protocols: Protocol[] = [
  // Cabeça e Pescoço
  {
    id: 'cp-1',
    category: 'Cabeça e Pescoço',
    procedure: 'Amigdalectomia, Adenoidectomia, Tireoidectomia, Pólipos, cistos de laringe, Excisão de linfonodos',
    antibiotic: 'Sem indicação',
    inductionDose: '-',
    intraOp: '-',
    duration: '-',
    postOpInterval: '-'
  },
  {
    id: 'cp-2',
    category: 'Cabeça e Pescoço',
    procedure: 'Timpanoplastia; Rinosseptoplastia',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '1g 4/4h',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'cp-3',
    category: 'Cabeça e Pescoço',
    procedure: 'Reconstruções Complexas (com uso de enxertos ósseos ou materiais aloplásticos)',
    antibiotic: 'Cefazolina + Metronidazol',
    inductionDose: '2g + 500mg',
    intraOp: 'X',
    duration: '24-48h',
    postOpInterval: '1g 8/8h (Cef) + 500mg 12/12h (Metro)'
  },
  {
    id: 'cp-4',
    category: 'Cabeça e Pescoço',
    procedure: 'Fraturas Maxilofaciais Abertas (com comunicação com cavidade oral ou seios paranasais)',
    antibiotic: 'Cefazolina + Metronidazol',
    inductionDose: '2g + 500mg',
    intraOp: 'X',
    duration: '24-72h (dependendo da extensão da contaminação, tipo de fratura e da estabilidade cirúrgica)',
    postOpInterval: '1g 8/8h (Cef) + 500mg 12/12h (Metro)'
  },
  {
    id: 'cp-5',
    category: 'Cabeça e Pescoço',
    procedure: 'Extrações de terceiros molares impactados e Implantes dentários múltiplos',
    antibiotic: 'Amoxicilina',
    inductionDose: '2g via oral',
    intraOp: '-',
    duration: '1h antes da cirurgia',
    postOpInterval: '-'
  },
  {
    id: 'cp-6',
    category: 'Cabeça e Pescoço',
    procedure: 'Cirurgia endoscópica (sinusite crônica, tumores, polipose nasal)',
    antibiotic: 'Clindamicina',
    inductionDose: '600mg',
    intraOp: '-',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'cp-7',
    category: 'Cabeça e Pescoço',
    procedure: 'Estética facial, Cirurgias Ortognáticas',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '1g 4/4h',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'cp-8',
    category: 'Cabeça e Pescoço',
    procedure: 'Mastoidectomia',
    antibiotic: 'Clindamicina',
    inductionDose: '600mg',
    intraOp: '-',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },

  // Cardíaca
  {
    id: 'card-1',
    category: 'Cardíaca',
    procedure: 'Prótese Valvar',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '1g 4/4h',
    duration: '24 - 48h',
    postOpInterval: '1g 8/8h'
  },
  {
    id: 'card-1b',
    category: 'Cardíaca',
    procedure: 'Revascularização miocárdio',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '1g 4/4h',
    duration: '24h',
    postOpInterval: '1g 8/8h'
  },
  {
    id: 'card-1c',
    category: 'Cardíaca',
    procedure: 'Transplante cardíaco',
    antibiotic: 'Cefuroxima',
    inductionDose: '1,5g',
    intraOp: '750mg 4/4h',
    duration: '24h',
    postOpInterval: '1,5g 12/12h'
  },
  {
    id: 'card-2',
    category: 'Cardíaca',
    procedure: 'Implante marca passo / Implante de dispositivos de assistência ventricular',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '1g 4/4h',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },

  // Torácica
  {
    id: 'tor-1',
    category: 'Torácica',
    procedure: 'Toracotomia; Pneumectomia; Cirurgia do mediastino; Correção de hérnia/eventração diafragmática; Correção de pectus; Decorticação pulmonar; Pericardiectomia; Ressecção de estenose de traquéia; Ressecção de tumor pleural; Ressecção pulmonar (Nodulectomia, Segmentectomia, Lobectomia); Toracectomia (tumor de parede); Traqueostomia aberta; Videotoracoscopia cirúrgica',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '1g 4/4h',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'tor-2',
    category: 'Torácica',
    procedure: 'Biópsia (transtorácica, gânglio, pleura, pulmão a céu aberto ou tumores de parede); Costectomia segmentar; Drenagem pleural (não empiema); Laringoscopia de suspensão; Mediastinoscopia / Mediastinotomia; Pleuroscopia; Toracocentese',
    antibiotic: 'Não indicado',
    inductionDose: '-',
    intraOp: '-',
    duration: '-',
    postOpInterval: '-'
  },

  // Gastrointestinal
  {
    id: 'gastro-1',
    category: 'Gastrointestinal',
    procedure: 'Herniorrafia baixo risco',
    antibiotic: 'Não indicado',
    inductionDose: '-',
    intraOp: '-',
    duration: '-',
    postOpInterval: '-'
  },
  {
    id: 'gastro-2',
    category: 'Gastrointestinal',
    procedure: 'Herniorrafia alto risco (com tela)',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '1g 4/4h',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'gastro-3',
    category: 'Gastrointestinal',
    procedure: 'Apendicectomia não perfurada / Intestino delgado',
    antibiotic: 'Cefoxitina',
    inductionDose: '2g',
    intraOp: '1g 2/2h',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'gastro-4',
    category: 'Gastrointestinal',
    procedure: 'Apendicectomia perfurada / abcesso',
    antibiotic: 'Ceftriaxona + Metronidazol',
    inductionDose: '-',
    intraOp: '-',
    duration: '5 dias',
    postOpInterval: '-'
  },
  {
    id: 'gastro-5',
    category: 'Gastrointestinal',
    procedure: 'Colecistectomia laparoscópica eletiva (baixo risco)',
    antibiotic: 'Não indicado',
    inductionDose: '-',
    intraOp: '-',
    duration: '-',
    postOpInterval: '-'
  },
  {
    id: 'gastro-6',
    category: 'Gastrointestinal',
    procedure: 'Colecistectomia aberta ou Alto Risco',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '1g 4/4h',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'gastro-8',
    category: 'Gastrointestinal',
    procedure: 'Esôfago: Incisão na mucosa',
    antibiotic: 'Cefoxitina',
    inductionDose: '2g',
    intraOp: '1g 2/2h',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'gastro-9',
    category: 'Gastrointestinal',
    procedure: 'Gastrectomia ou hérnia de hiato',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '1g 4/4h',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'gastro-10',
    category: 'Gastrointestinal',
    procedure: 'Cólon (ressecção intestinal, colectomia, reconstrução de trânsito, ressecção retal)',
    antibiotic: 'Cefoxitina + (opcional: preparo mecânico e químico)',
    inductionDose: '2g',
    intraOp: '1g 2/2h',
    duration: '24h',
    postOpInterval: '1g 8/8h'
  },
  {
    id: 'gastro-11',
    category: 'Gastrointestinal',
    procedure: 'Peritonectomia',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '1g 4/4h',
    duration: '24h',
    postOpInterval: '1g 8/8h'
  },
  {
    id: 'gastro-12',
    category: 'Gastrointestinal',
    procedure: 'Pâncreas',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '1g 4/4h',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'gastro-13',
    category: 'Gastrointestinal',
    procedure: 'CPRE sem sinais de infecção (Colangiopancreotografia retrógrada endoscópica)',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '-',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'gastro-14',
    category: 'Gastrointestinal',
    procedure: 'Hepatectomia',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '1g 4/4h',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'gastro-15',
    category: 'Gastrointestinal',
    procedure: 'Esplenectomia',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '1g 4/4h',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'gastro-16',
    category: 'Gastrointestinal',
    procedure: 'Bariátrica sem manipulação de alças intestinais',
    antibiotic: 'Cefazolina',
    inductionDose: '3g',
    intraOp: '1g 4/4h',
    duration: '24h',
    postOpInterval: '1g 8/8h'
  },
  {
    id: 'gastro-17',
    category: 'Gastrointestinal',
    procedure: 'Gastrostomia',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '-',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'gastro-18',
    category: 'Gastrointestinal',
    procedure: 'Bariátrica com manipulação de alças intestinais',
    antibiotic: 'Cefoxitina',
    inductionDose: '3g',
    intraOp: '1g 4/4h',
    duration: '24h',
    postOpInterval: '1g 8/8h'
  },
  {
    id: 'gastro-19',
    category: 'Gastrointestinal',
    procedure: 'Gastroduodenopancreatectomia (Sem procedimentos invasivos pré operatório)',
    antibiotic: 'Cefoxitina',
    inductionDose: '2g',
    intraOp: '-',
    duration: '24h',
    postOpInterval: '1g 6/6h'
  },
  {
    id: 'gastro-20',
    category: 'Gastrointestinal',
    procedure: 'Gastroduodenopancreatectomia (com infecção ou procedimentos invasivos pré operatório)',
    antibiotic: 'Metronidazol + Ceftriaxona',
    inductionDose: '500mg + 1g',
    intraOp: '-',
    duration: '7 dias',
    postOpInterval: '500mg 8/8h (Metro) + 1g 12/12h (Cef)'
  },
  {
    id: 'gastro-21',
    category: 'Gastrointestinal',
    procedure: 'Abscesso perirretal ou perianal',
    antibiotic: 'Amoxicilina + Clavulonato',
    inductionDose: '875/125mg',
    intraOp: '-',
    duration: '5 dias',
    postOpInterval: '875/125mg'
  },
  {
    id: 'gastro-22',
    category: 'Gastrointestinal',
    procedure: 'Fístula anorretal, hemorroidectomia, prolapso retal',
    antibiotic: 'Cefoxitina + (opcional: preparo mecânico e químico)',
    inductionDose: '2g',
    intraOp: '1g 2/2h',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'gastro-23',
    category: 'Gastrointestinal',
    procedure: 'Cisto pilonidal, plicoma',
    antibiotic: 'Não indicado',
    inductionDose: '-',
    intraOp: '-',
    duration: '-',
    postOpInterval: '-'
  },

  // Neurológica
  {
    id: 'neuro-1',
    category: 'Neurológica',
    procedure: 'Craniotomia sem implantação de corpo estranho; Cirurgia com acesso transesfenoidal; Laminectomia ou outras cirurgias de coluna sem implantes',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '1g 4/4h',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'neuro-2',
    category: 'Neurológica',
    procedure: 'Laminectomia or outras cirurgias de coluna com implantes ou se cirurgia longa / vários níveis',
    antibiotic: 'Cefuroxima',
    inductionDose: '1,5g',
    intraOp: '750mg 4/4h',
    duration: '24h',
    postOpInterval: '1,5g 12/12h'
  },
  {
    id: 'neuro-3',
    category: 'Neurológica',
    procedure: 'Microcirurgia de SNC com implante; Clipagem aneurisma',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '1g 4/4h',
    duration: '24h',
    postOpInterval: '1g 8/8h'
  },
  {
    id: 'neuro-4',
    category: 'Neurológica',
    procedure: 'Implantação de DVE, DVP, DLE',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '1g 4/4h',
    duration: '24h',
    postOpInterval: '1,5g 12/12h'
  },
  {
    id: 'neuro-5',
    category: 'Neurológica',
    procedure: 'Cisto pilonidal, plicoma',
    antibiotic: 'Não indicado',
    inductionDose: '-',
    intraOp: '-',
    duration: '-',
    postOpInterval: '-'
  },
  {
    id: 'neuro-6',
    category: 'Neurológica',
    procedure: 'Fístula liquórica** e pneumoencéfalo Pós-trauma: Obs.: eficácia não Estabelecida',
    antibiotic: 'Cefuroxima',
    inductionDose: '1,5g',
    intraOp: '750mg 4/4h',
    duration: '5 dias',
    postOpInterval: '1,5g 8/8h'
  },

  // Obstétrica / Ginecológica
  {
    id: 'obgyn-1',
    category: 'Obstétrica/Ginecológica',
    procedure: 'Parto Vaginal',
    antibiotic: 'Sem Indicação',
    inductionDose: '-',
    intraOp: '-',
    duration: '-',
    postOpInterval: '-'
  },
  {
    id: 'obgyn-2',
    category: 'Obstétrica/Ginecológica',
    procedure: 'Histerectomia',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '1g 4/4h',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'obgyn-3',
    category: 'Obstétrica/Ginecológica',
    procedure: 'Parto vaginal com dequitação manual de placenta e/ou manipulação intra-uterina',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '-',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'obgyn-4',
    category: 'Obstétrica/Ginecológica',
    procedure: 'Parto fórcipe',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '-',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'obgyn-5',
    category: 'Obstétrica/Ginecológica',
    procedure: 'Parto cesárea',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '-',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'obgyn-6',
    category: 'Obstétrica/Ginecológica',
    procedure: 'Retocele, cistocele',
    antibiotic: 'Cefazolina + Metronidazol',
    inductionDose: '2g + 500mg',
    intraOp: '1g 4/4h (Cef) + 500mg 6/6h (Metro)',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'obgyn-7',
    category: 'Obstétrica/Ginecológica',
    procedure: 'Mastectomia',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '1g 4/4h',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },

  // Ortopédica
  {
    id: 'orto-1',
    category: 'Ortopédica',
    procedure: 'Cirurgias limpas envolvendo tecido avascular, infiltrações articulares',
    antibiotic: 'Não indicado',
    inductionDose: '-',
    intraOp: '-',
    duration: '-',
    postOpInterval: '-'
  },
  {
    id: 'orto-2',
    category: 'Ortopédica',
    procedure: 'Infiltração coluna, Radiculotomia, Microneurólise',
    antibiotic: 'Não indicado',
    inductionDose: '-',
    intraOp: '-',
    duration: '-',
    postOpInterval: '-'
  },
  {
    id: 'orto-3',
    category: 'Ortopédica',
    procedure: 'Cirurgias limpas envolvendo mão, joelho ou pé sem implante, sem inserção de próteses, pinos ou parafusos; Ruptura de bíceps',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '1g 4/4h',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'orto-4',
    category: 'Ortopédica',
    procedure: 'Fixação de fraturas fechadas, fratura de quadril com pinos/Hastes, Retirada de sintese (sem infecção)',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '1g 4/4h',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'orto-5',
    category: 'Ortopédica',
    procedure: 'Cirurgia eletiva com implante ou manipulação óssea',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '1g 4/4h',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'orto-6',
    category: 'Ortopédica',
    procedure: 'Artroplastias - cirurgias com próteses, artroscopia c/ síntese',
    antibiotic: 'Cefuroxima',
    inductionDose: '1,5g',
    intraOp: '750mg 6/6h',
    duration: '24 - 48h',
    postOpInterval: '1,5g 12/12h'
  },
  {
    id: 'orto-7',
    category: 'Ortopédica',
    procedure: 'Artroscopia sem síntese',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '-',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'orto-8',
    category: 'Ortopédica',
    procedure: 'Revisão de artroplastia',
    antibiotic: 'Teicoplanina',
    inductionDose: '6mg/kg',
    intraOp: '-',
    duration: 'Máximo 5 dias ou até resultado de culturas, se negativo suspender',
    postOpInterval: '10mg/kg 24/24h'
  },

  // Trauma
  {
    id: 'trauma-1',
    category: 'Traumas',
    procedure: 'Abd. penetrante',
    antibiotic: 'Cefoxitina',
    inductionDose: '2g',
    intraOp: '-',
    duration: '24h (pós cirurgia)',
    postOpInterval: '1g 6/6h'
  },
  {
    id: 'trauma-2',
    category: 'Traumas',
    procedure: 'Abd. fechado com indicação cirúrgica',
    antibiotic: 'Cefoxitina',
    inductionDose: '2g',
    intraOp: '-',
    duration: '24h',
    postOpInterval: '1g 6/6h'
  },
  {
    id: 'trauma-3',
    category: 'Traumas',
    procedure: 'Toraco abd. Penetrante',
    antibiotic: 'Cefoxitina',
    inductionDose: '2g',
    intraOp: '-',
    duration: '24h',
    postOpInterval: '1g 6/6h'
  },
  {
    id: 'trauma-4',
    category: 'Traumas',
    procedure: 'Torácico penetrante',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '-',
    duration: '24h',
    postOpInterval: '1g 8/8h'
  },
  {
    id: 'trauma-5',
    category: 'Traumas',
    procedure: 'Torácico fechado que necessita de drenagem',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '-',
    duration: '24h',
    postOpInterval: '1g 8/8h'
  },
  {
    id: 'trauma-6',
    category: 'Traumas',
    procedure: 'Trauma torácico penetrante com lesão de esôfago',
    antibiotic: 'Clindamicina + Gentamicina',
    inductionDose: '600mg + 240mg',
    intraOp: '-',
    duration: '7 dias',
    postOpInterval: '600mg 8/8h (Clinda) + 240mg 1x dia (Genta)'
  },
  {
    id: 'trauma-7',
    category: 'Traumas',
    procedure: 'Fratura exposta Gustilo 1 e 2',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '-',
    duration: '24 a 72h',
    postOpInterval: '1g 8/8h'
  },
  {
    id: 'trauma-8',
    category: 'Traumas',
    procedure: 'Fratura exposta Gustilo 3',
    antibiotic: 'Clindamicina + Gentamicina',
    inductionDose: '600mg + 240mg',
    intraOp: '-',
    duration: '7 dias',
    postOpInterval: '600mg 8/8h (Clinda) + 240mg 1x dia (Genta)'
  },
  {
    id: 'trauma-9',
    category: 'Traumas',
    procedure: 'Cabeça e pescoço',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '-',
    duration: '24h',
    postOpInterval: '1g 8/8h'
  },
  {
    id: 'trauma-10',
    category: 'Traumas',
    procedure: 'Crânio penetrante',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '-',
    duration: '24h',
    postOpInterval: '1g 8/8h'
  },
  {
    id: 'trauma-11',
    category: 'Traumas',
    procedure: 'Crânio com fístula',
    antibiotic: 'Cefuroxima',
    inductionDose: '2g',
    intraOp: '-',
    duration: '5 dias',
    postOpInterval: '1g 8/8h'
  },

  // Plástica
  {
    id: 'plas-1',
    category: 'Plástica',
    procedure: 'Cirurgias plásticas com colocação de próteses ou com grande ressecção de pele e subcutâneo',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '-',
    duration: 'intra-operatório',
    postOpInterval: '-'
  },

  // Urológica
  {
    id: 'uro-1',
    category: 'Urológica',
    procedure: 'Prótese peniana',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '-',
    duration: '24h',
    postOpInterval: '1g 8/8h'
  },
  {
    id: 'uro-4',
    category: 'Urológica',
    procedure: 'Ureteroscopia, Ureterorrenoscopia',
    antibiotic: 'Ceftriaxona',
    inductionDose: '1g',
    intraOp: '-',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'uro-5',
    category: 'Urológica',
    procedure: 'Biópsia prostática transretal',
    antibiotic: 'Ciprofloxacino',
    inductionDose: '500mg via oral (12h pré procedimento) 400mg EV 1h antes procedimento',
    intraOp: '-',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'uro-6',
    category: 'Urológica',
    procedure: 'Biópsia prostática transperineal',
    antibiotic: 'Não indicado',
    inductionDose: '-',
    intraOp: '-',
    duration: '-',
    postOpInterval: '-'
  },
  {
    id: 'uro-7',
    category: 'Urológica',
    procedure: 'Nefrolitotomia percutânea',
    antibiotic: 'Ceftriaxona',
    inductionDose: '1g',
    intraOp: '-',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'uro-8',
    category: 'Urológica',
    procedure: 'Nefrolitotripsia percutânea (coraliforme)',
    antibiotic: 'Ceftriaxona',
    inductionDose: '1g',
    intraOp: '-',
    duration: '24h',
    postOpInterval: '1g 12/12h'
  },
  {
    id: 'uro-9',
    category: 'Urológica',
    procedure: 'Ureterolitotripsia',
    antibiotic: 'Ceftriaxona',
    inductionDose: '1g',
    intraOp: '-',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'uro-10',
    category: 'Urológica',
    procedure: 'Estudos urodinâmicos, cistoscopia e pielografia retrógada simples',
    antibiotic: 'Baixo risco: não necessita\nAlto risco: Ciprofloxacino',
    inductionDose: '500mg VO (Alto risco)',
    intraOp: '-',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'uro-11',
    category: 'Urológica',
    procedure: 'Cirurgias limpas (orquiectomia, postectomia, vasectomia, varicocelectomia)',
    antibiotic: 'Sem indicação',
    inductionDose: '-',
    intraOp: '-',
    duration: '-',
    postOpInterval: '-'
  },
  {
    id: 'uro-12',
    category: 'Urológica',
    procedure: 'Prostatectomia aberta - Ressecção transuretral de próstata/bexiga',
    antibiotic: 'Cefuroxima',
    inductionDose: '1,5g',
    intraOp: '-',
    duration: '24h',
    postOpInterval: '1,5g 12/12h'
  },
  {
    id: 'uro-13',
    category: 'Urológica',
    procedure: 'Uretrotomia interna',
    antibiotic: 'Ceftriaxona',
    inductionDose: '1g',
    intraOp: '-',
    duration: '24h',
    postOpInterval: '1g 12/12h'
  },
  {
    id: 'uro-14',
    category: 'Urológica',
    procedure: 'Uretrotomia aberta',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '-',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'uro-15',
    category: 'Urológica',
    procedure: 'Nefrectomia limpa',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '-',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'uro-17',
    category: 'Urológica',
    procedure: 'Inserção de duplo J',
    antibiotic: 'Ceftriaxona',
    inductionDose: '1g',
    intraOp: '-',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'uro-18',
    category: 'Urológica',
    procedure: 'Esfincter artificial',
    antibiotic: 'Ceftriaxona',
    inductionDose: '1g',
    intraOp: '-',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },

  // Transplantes
  {
    id: 'trans-1',
    category: 'Transplantes',
    procedure: 'Transplante renal',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '1g 4/4h',
    duration: '24h',
    postOpInterval: '1g 8/8h'
  },
  {
    id: 'trans-2',
    category: 'Transplantes',
    procedure: 'Transplante de coração adulto',
    antibiotic: 'Cefuroxima',
    inductionDose: '1,5g',
    intraOp: '750mg 4/4h',
    duration: '24h',
    postOpInterval: '1,5g 12/12h'
  },

  // Oftalmológica
  {
    id: 'oft-1',
    category: 'Oftalmológica',
    procedure: 'Cirurgia lacrimal e pálpebras',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '-',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'oft-2',
    category: 'Oftalmológica',
    procedure: 'Facectomia, facomulsificação, vitrectomia, introflexção, escleral, trabeculotomia, implante de tubo, correção de estrabismo, sutura de perfurantes, evisceração, enucleação, dacriocistoriostomia, glaucoma',
    antibiotic: 'Não está indicado antibioticoterapia endovenosa\n\nPode utilizar moxifloxacino colírio 1 hora antes do início do procedimento',
    inductionDose: '-',
    intraOp: '-',
    duration: '-',
    postOpInterval: '-'
  },

  // Vascular
  {
    id: 'vasc-1',
    category: 'Vascular',
    procedure: 'Varizes - Baixo risco (ligaduras de perfurantes e colaterais), Fistulas arteriovenosa',
    antibiotic: 'Sem Indicação',
    inductionDose: '-',
    intraOp: '-',
    duration: '-',
    postOpInterval: '-'
  },
  {
    id: 'vasc-2',
    category: 'Vascular',
    procedure: 'Varizes Safenectomias, Tromboflebite, Úlceras de estase, Dermatofitose',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '-',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'vasc-3',
    category: 'Vascular',
    procedure: 'Embolectomia baixo risco',
    antibiotic: 'Sem indicação',
    inductionDose: '-',
    intraOp: '-',
    duration: '-',
    postOpInterval: '-'
  },
  {
    id: 'vasc-4',
    category: 'Vascular',
    procedure: 'Embolectomia alto risco',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '-',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'vasc-5',
    category: 'Vascular',
    procedure: 'Fístula arteriovenosa with próteses',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '-',
    duration: 'Intra-operatório',
    postOpInterval: '-'
  },
  {
    id: 'vasc-6',
    category: 'Vascular',
    procedure: 'Enxerto com prótese vascular / Aneurisma / Endarterectomia',
    antibiotic: 'Cefazolina',
    inductionDose: '2g',
    intraOp: '-',
    duration: '24h',
    postOpInterval: '1g 8/8h'
  },
  {
    id: 'vasc-7',
    category: 'Vascular',
    procedure: 'Implante de shunt temporário ou implante de cateter de longa permanência',
    antibiotic: 'Cefazolina',
    inductionDose: '-',
    intraOp: '-',
    duration: '-',
    postOpInterval: '-'
  },
  {
    id: 'vasc-8',
    category: 'Vascular',
    procedure: 'Amputação por gangrena seca',
    antibiotic: 'Cefoxitina',
    inductionDose: '2g',
    intraOp: '1g 6/6h',
    duration: '24h',
    postOpInterval: '1g 8/8h'
  },
  {
    id: 'vasc-9',
    category: 'Vascular',
    procedure: 'Amputações por gangrena úmida',
    antibiotic: 'Clindamicina + Ciprofloxacino',
    inductionDose: '900mg + 400mg IV',
    intraOp: '600mg 6/6h + 400mg 12/12h',
    duration: 'Ajustar conforme resultado de culturas',
    postOpInterval: '-'
  },
];

export const categoryNotes: Record<string, string> = {
  'Cardíaca': 'Obs.: Se paciente internado há mais de 5 dias realizar como antibiótico profilático: Teicoplanina 6mg/Kg/dia.',
  'Gastrointestinal': '*Preparo intestinal mecânico: Neomicina 1g + Metronidazol 1g via oral as 13,14 e 23h do dia anterior\n\n***Alto risco:\n• colangiografia intra-operatória\n• vazamento bile\n• colecistite aguda\n• icterícia\n• gravidez\n• conversão para cirurgia aberta',
  'Neurológica': 'Obs: Se paciente internado há mais de 5 dias realizar como antibiótico profilático Teicoplanina 6mg/Kg/dia.',
  'Ortopédica': 'Obs.: Se paciente internado há mais de 5 dias realizar como antibiótico profilático Teicoplanina 6mg/kg/dia.',
  'Plástica': 'Obs.: * trauma abdominal com contaminação de cavidade com fezes, lavagem cavidade mais eficaz que manutenção de antibioticoterapia.',
  'Vascular': 'Obs.: Se paciente internado há mais de 5 dias realizar como antibiótico profilático Teicoplanina 6mg/Kg/dia.'
};

/**
 * Pediatric dose data as required by PediatricSection.tsx
 */
export const pediatricDoses = [
  { drug: 'Cefazolina', dose: '30-50 mg/kg (máx 2g)' },
  { drug: 'Cefoxitina', dose: '30-40 mg/kg (máx 2g)' },
  { drug: 'Cefuroxima', dose: '50 mg/kg (máx 1,5g)' },
  { drug: 'Metronidazol', dose: '15 mg/kg (máx 500mg)' },
  { drug: 'Clindamicina', dose: '10 mg/kg (máx 600-900mg)' },
  { drug: 'Gentamicina', dose: '5 mg/kg' },
  { drug: 'Vancomicina', dose: '15 mg/kg (máx 1g)' },
];
