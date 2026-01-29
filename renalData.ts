
import { RenalDose } from './types';

export const renalDoses: RenalDose[] = [
  {
    drug: 'Amoxicilina + Clavulanato',
    normalDose: '875/125mg 12/12h ou 500/125mg 8/8h',
    crcl10_50: '250-500mg 12/12h',
    crcl_10: '250-500mg 24/24h',
    dialysis: 'Dose adicional após hemodiálise',
    notes: 'Ajuste baseado no componente Amoxicilina.'
  },
  {
    drug: 'Cefazolina',
    normalDose: '1-2g 8/8h',
    crcl10_50: '1-2g 12/12h',
    crcl_10: '1-2g 24/24h',
    dialysis: '0.5-1g após hemodiálise',
    notes: 'Dose profilática única não requer ajuste.'
  },
  {
    drug: 'Ceftriaxona',
    normalDose: '1-2g 24/24h',
    crcl10_50: 'Sem ajuste',
    crcl_10: 'Sem ajuste (máx 2g/dia)',
    dialysis: 'Sem dose extra',
    notes: 'Monitorar em insuficiência hepática e renal combinadas.'
  },
  {
    drug: 'Ciprofloxacino (EV)',
    normalDose: '400mg 8/8h ou 12/12h',
    crcl10_50: '200-400mg 12-24/24h',
    crcl_10: '200-400mg 24/24h',
    dialysis: 'Dose após hemodiálise',
  },
  {
    drug: 'Clindamicina',
    normalDose: '600-900mg 8/8h',
    crcl10_50: 'Sem ajuste',
    crcl_10: 'Sem ajuste',
    dialysis: 'Sem dose extra',
  },
  {
    drug: 'Meropenem',
    normalDose: '1g 8/8h',
    crcl10_50: '1g 12/12h',
    crcl_10: '500mg 24/24h',
    dialysis: 'Dose após hemodiálise',
  },
  {
    drug: 'Metronidazol',
    normalDose: '500mg 8/8h',
    crcl10_50: 'Sem ajuste',
    crcl_10: '250mg 8/8h ou 500mg 12/12h',
    dialysis: 'Dose após hemodiálise',
  },
  {
    drug: 'Piperacilina + Tazobactam',
    normalDose: '4,5g 6/6h',
    crcl10_50: '2,25g 6/6h ou 4,5g 12/12h',
    crcl_10: '2,25g 8/8h',
    dialysis: '2,25g 12/12h + dose extra 0,75g após HD',
  },
  {
    drug: 'Vancomicina',
    normalDose: '15-20 mg/kg 12/12h',
    crcl10_50: 'Ajuste por nível sérico',
    crcl_10: 'Ajuste por nível sérico',
    dialysis: 'Dose conforme nível sérico pré-dialítico',
    notes: 'Sempre guiar pela monitorização terapêutica (vancocinemia).'
  }
];