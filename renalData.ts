
import { RenalDose } from './types';

export const renalDoses: RenalDose[] = [
  {
    drug: 'Amicacina',
    category: 'antibiotic',
    attackDose: '15-20mg/kg',
    normalDose: '15-20mg/kg 24/24h',
    crcl30_50: '7,5-15mg/kg 24/24h',
    crcl_30: '7,5mg/kg 24/24h',
    dialysis: '7,5mg/kg após cada sessão de HD',
    notes: 'Se restrição de volume: 5mg/mL; IMC ≥ 30kg/m²: peso corporal ajustado;'
  },
  {
    drug: 'Amoxicilina + clavulanato',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '1,2g 8/8h',
    crcl30_50: '1,2g 12/12h',
    crcl_30: '1,2g 24/24h',
    dialysis: '1,2g após cada sessão de HD',
    notes: 'A dose é baseada no componente Amoxicilina; Prescrição em dose composta 1,2g = 1 frasco;'
  },
  {
    drug: 'Ampicilina',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '1-2g a cada 4-6h',
    crcl30_50: '1-2g a cada 6-8h',
    crcl_30: '1-2g a cada 8-12h',
    dialysis: '1-2g 12/12h + após cada sessão de HD',
    notes: 'Se restrição de volume: 30mg/mL;'
  },
  {
    drug: 'Ampicilina + sulbactam',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '3g 6/6h',
    crcl30_50: '3g 8/8h',
    crcl_30: '3g 12/12h',
    dialysis: '3g 24/24h + 3g após cada sessão de HD',
    notes: 'Se restrição de volume: 375mg/mL (250mg ampicilina + 125mg sulbactam); Prescrição em dose composta 1,5g = 1 frasco ou 3g = 1 frasco; Monitorar função hepática;'
  },
  {
    drug: 'Azitromicina',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '500mg 24/24h',
    crcl30_50: 'Não requer ajuste',
    crcl_30: 'Não requer ajuste',
    dialysis: 'Não requer ajuste',
    notes: 'Monitorar função cardíaca e hepática;'
  },
  {
    drug: 'Aztreonam',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '1-2g 8/8h',
    crcl30_50: '1-2g 12/12h',
    crcl_30: '1-2g 24/24h',
    dialysis: '0,5-1g 24/24h + 1g após cada sessão de HD',
    notes: 'Se restrição de volume: 20mg/mL; Monitorar função hepática e renal;'
  },
  {
    drug: 'Cefazolina',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '1-2g 8/8h',
    crcl30_50: '1-2g 12/12h',
    crcl_30: '1-2g 24/24h',
    dialysis: '1-2g 24/24h + 2g após cada sessão de HD',
    notes: ''
  },
  {
    drug: 'Cefepime',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '1-2g a cada 8-12h',
    crcl30_50: '1-2g 24/24h',
    crcl_30: '0,5-1g 24/24h',
    dialysis: '1g após cada sessão de HD',
    notes: 'IMC > 30kg/m²: 2g a cada 8h; IMC ≥ 40kg/m²: 2g a cada 8h, infundidos ao longo de 3-4h; Monitorar função renal e INR. Observar SNC principalmente em renais;'
  },
  {
    drug: 'Ceftarolina',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '600mg 12/12h',
    crcl30_50: '400mg 12/12h',
    crcl_30: '300mg 12/12h',
    dialysis: '200mg 12/12h + 200mg após cada sessão de HD',
    notes: 'Se restrição de volume: 12mg/mL;'
  },
  {
    drug: 'Ceftazidima',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '1-2g a cada 8-12h',
    crcl30_50: '1-2g 12/12h',
    crcl_30: '1-2g 24/24h',
    dialysis: '1g 24/24h + 1g após cada sessão de HD',
    notes: 'Se restrição de volume: 40mg/mL; Monitorar INR e função renal;'
  },
  {
    drug: 'Ceftazidima + avibactam',
    category: 'antibiotic',
    attackDose: '2,5g',
    normalDose: '2,5g 8/8h',
    crcl30_50: '1,25g 12/12h',
    crcl_30: '94mg 24/24h',
    dialysis: '625mg após cada sessão de HD',
    notes: 'Se restrição de volume: 40mg/mL ceftazidima + 10mg/mL avibactam; Prescrição em dose composta 2,5g = 1 frasco; Monitorar função renal;'
  },
  {
    drug: 'Ceftolozana + tazobactam',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '1,5-3g 8/8h',
    crcl30_50: '750mg-1,5g 8/8h',
    crcl_30: '750mg 8/8h',
    dialysis: '750mg após cada sessão de HD',
    notes: 'Prescrição em dose composta 1,5g = 1 frasco; Monitorar função renal;'
  },
  {
    drug: 'Ceftriaxona',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '1-2g 24/24h',
    crcl30_50: 'Ajuste apenas em disfunção renal e hepática combinada grave',
    crcl_30: 'Ajuste apenas em disfunção renal e hepática combinada grave',
    dialysis: 'Não requer ajuste',
    notes: 'IM: se reconstituído com lidocaína não pode ser administrado EV; Monitorar INR;'
  },
  {
    drug: 'Cefuroxima',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '750mg-1,5g 8/8h',
    crcl30_50: '750mg 12/12h',
    crcl_30: '750mg 24/24h',
    dialysis: '750mg 24/24h + 750mg após cada sessão de HD',
    notes: 'Se restrição de volume: 100mg/mL;'
  },
  {
    drug: 'Ciprofloxacino',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '400mg a cada 8-12h',
    crcl30_50: '200-400mg 12/12h',
    crcl_30: '200-400mg 24/24h',
    dialysis: '200-400mg 24/24h + 200mg após cada sessão de HD',
    notes: 'Bolsa pronta para uso;'
  },
  {
    drug: 'Clindamicina',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '600mg 8/8h',
    crcl30_50: 'Não requer ajuste',
    crcl_30: 'Não requer ajuste',
    dialysis: 'Não requer ajuste',
    notes: 'Se restrição de volume: 18mg/mL; Monitorar função hepática e renal;'
  },
  {
    drug: 'Daptomicina',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '4-6mg/kg 24/24h (10-12mg/kg 24/24h para endocardite/bacteremia)',
    crcl30_50: '10-12mg/kg 48/48h',
    crcl_30: '10-12mg/kg 48/48h',
    dialysis: '4-6mg/kg 48/48h + após cada sessão de HD',
    notes: 'IMC ≥ 30kg/m²: peso corporal ajustado; Monitorar CPK basal;'
  },
  {
    drug: 'Delafloxacino meglumina',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '300mg 12/12h',
    crcl30_50: '200mg 12/12h',
    crcl_30: '100mg 12/12h',
    dialysis: '100mg 12/12h + 100mg após cada sessão de HD',
    notes: ''
  },
  {
    drug: 'Doxiciclina',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '100mg 12/12h',
    crcl30_50: 'Não requer ajuste',
    crcl_30: 'Não requer ajuste',
    dialysis: 'Não requer ajuste',
    notes: ''
  },
  {
    drug: 'Ertapenem',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '1g 24/24h',
    crcl30_50: '500mg 24/24h',
    crcl_30: '500mg 24/24h',
    dialysis: '500mg 24/24h + 500mg após cada sessão de HD',
    notes: 'Monitorar função hepática, renal e hematopoiese;'
  },
  {
    drug: 'Gentamicina',
    category: 'antibiotic',
    attackDose: '5mg/kg',
    normalDose: '5mg/kg 24/24h',
    crcl30_50: '3mg/kg 24/24h',
    crcl_30: '5mg/kg 48/48h',
    dialysis: '2-3mg/kg após cada sessão de HD',
    notes: 'Realizar em DOSE ÚNICA DIÁRIA; Monitorar nefrotoxicidade e ototoxicidade; Se restrição de volume: diluir em 50-100mL; Cálculo do peso: PCT < PCI -> PCT, PCT = 1-1,2 x PCI -> PCT ou PCI (preferir PCT se crítico), PCT > 1,2 x PCI -> PCA;'
  },
  {
    drug: 'Imipenem + cilastatina',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '500mg 6/6h ou 1g 8/8h',
    crcl30_50: '500mg a cada 8-12h',
    crcl_30: '250mg 12/12h ou 500mg 24/24h',
    dialysis: '250-500mg 12/12h + 250mg após cada sessão de HD',
    notes: 'Se restrição de volume: 5mg/mL; Contraindicado se ClCr ≤ 15 mL/min, exceto se houver início de hemodiálise em até 48h; A dose é baseada no componente Imipenem;'
  },
  {
    drug: 'Imipenem + cilastatina + relabactam',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '1,25g 8/8h',
    crcl30_50: '0,625g 12/12h',
    crcl_30: '0,5g 24/24h',
    dialysis: '0,25g 12/12h + 250mg após cada sessão de HD',
    notes: ''
  },
  {
    drug: 'Levofloxacino',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '500-750mg 24/24h',
    crcl30_50: '250-500mg 24/24h',
    crcl_30: '250mg 48/48h',
    dialysis: '250-500mg após cada sessão de HD',
    notes: 'Bolsa pronta para uso;'
  },
  {
    drug: 'Linezolida',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '600mg 12/12h',
    crcl30_50: 'Não requer ajuste',
    crcl_30: 'Não requer ajuste',
    dialysis: 'Não requer ajuste',
    notes: 'Bolsa pronta para uso; Monitorar associações interações medicamentosas graves documentadas;'
  },
  {
    drug: 'Meropenem',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: 'Inf. moderadas: 1g 8/8h; Inf. graves como meningite: 2g 8/8h',
    crcl30_50: '1g 12/12h',
    crcl_30: '500mg 12/12h',
    dialysis: '500mg 24/24h + 500mg após cada sessão de HD',
    notes: 'Se restrição de volume: 20mg/mL; Incompatível com Midazolam, verificar acessos venosos disponíveis;'
  },
  {
    drug: 'Metronidazol',
    category: 'antibiotic',
    attackDose: 'C. difficile grave: 15mg/kg',
    normalDose: '500mg 8/8h',
    crcl30_50: 'Não requer ajuste',
    crcl_30: 'Não requer ajuste',
    dialysis: 'Não requer ajuste',
    notes: 'Bolsa pronta para uso;'
  },
  {
    drug: 'Moxifloxacino',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '400mg 24/24h',
    crcl30_50: 'Não requer ajuste',
    crcl_30: 'Não requer ajuste',
    dialysis: 'Não requer ajuste',
    notes: 'Bolsa pronta para uso;'
  },
  {
    drug: 'Oxacilina',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '1-2g a cada 4-6h',
    crcl30_50: 'Não requer ajuste',
    crcl_30: 'Não requer ajuste',
    dialysis: 'Não requer ajuste',
    notes: 'Se restrição de volume: IV direto 100mg/mL ou infusão lenta 2mg/mL; Monitorar função hepática se tratamento > 14 dias;'
  },
  {
    drug: 'Piperacilina + tazobactam',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '4,5g 6/6h',
    crcl30_50: '2,25g 6/6h',
    crcl_30: '2,25g 8/8h',
    dialysis: '2,25g 12/12h + 2,25g após cada sessão de HD',
    notes: 'Incompatível em Y com Insulina Regular em BIC, usar acessos distintos.'
  },
  {
    drug: 'Polimixina B',
    category: 'antibiotic',
    attackDose: '2,5mg/kg = 25.000 UI/kg',
    normalDose: '1,5mg/kg 12/12h',
    crcl30_50: '1,5mg/kg 12/12h',
    crcl_30: '1,5mg/kg 12/12h',
    dialysis: '1,5mg/kg 12/12h',
    notes: 'Correr em BIC; Monitorar função renal e neurotoxicidade; IMC ≥ 40 kg/m²: peso corporal ajustado; Se restrição de volume: 5.000UI/mL: 1 Frasco: 100mL, 2 Frascos: 200mL, 3 Frascos: 300mL, 4 Frascos: 400mL; Incompatível em Y com Insulina Regular em BIC, usar acessos distintos. 10 mil UI = 1mg;'
  },
  {
    drug: 'Polimixina E',
    category: 'antibiotic',
    attackDose: '9 milhões UI',
    normalDose: '4,5 milhões UI 12/12h',
    crcl30_50: '4,5 milhões UI 24/24h',
    crcl_30: '3 milhões UI 24/24h',
    dialysis: '4,5 milhões UI a cada 24h + 4,5 milhões UI após cada sessão de HD',
    notes: 'Monitorar função renal, neurotoxicidade e parâmetros respiratórios; 80mg = 1.000.000 UI;'
  },
  {
    drug: 'Sulfametoxazol + trimetoprim',
    category: 'antibiotic',
    attackDose: 'N/A',
    normalDose: '8-10mg/kg/dia a cada 8-12h',
    crcl30_50: '4-5mg/kg/dia a cada 8-12h',
    crcl_30: '4-5mg/kg/dia a cada 8-12h',
    dialysis: '4-5mg/kg/dia a cada 12h',
    notes: 'Prescrição em dose composta 400mg/80mg = 1 ampola; As recomendações de dose baseadas no peso são referentes ao componente TRIMETOPRIM. IMC ≥ 30kg/m²: peso corporal ajustado; Incompatível em Y com Insulina Regular em BIC, usar acessos distintos.'
  },
  {
    drug: 'Teicoplanina',
    category: 'antibiotic',
    attackDose: 'Somente se paciente instável: 6-12mg/kg 12/12h por 3 doses',
    normalDose: '6-12mg/kg 24/24h',
    crcl30_50: '6mg/kg 24/24h',
    crcl_30: '6-12mg/kg 48/48h',
    dialysis: 'Não sugerido',
    notes: 'Monitorar nefrotoxicidade;'
  },
  {
    drug: 'Tigeciclina',
    category: 'antibiotic',
    attackDose: 'Somente se paciente instável: 100mg',
    normalDose: '50mg 12/12h; Se ICS ou PAV: 100mg 12/12h',
    crcl30_50: 'Não requer ajuste',
    crcl_30: 'Não requer ajuste',
    dialysis: 'Não requer ajuste',
    notes: 'Monitorar função hepática e fatores de coagulação;'
  },
  {
    drug: 'Vancomicina',
    category: 'antibiotic',
    attackDose: '25-30mg/kg',
    normalDose: '15-20mg/kg a cada 8-12h',
    crcl30_50: '15-20mg/kg 24/24h',
    crcl_30: '7,5mg/kg 24/24h',
    dialysis: 'Dose de ataque normal. Manutenção: 7,5-10mg/kg após cada sessão de HD a cada 3 dias ou monitorar nível sérico',
    notes: 'Correr em BIC; Monitorar nível sérico > AUC/MIC: 400-600mg/L; Se restrição de volume: 10mg/mL; Muitas interações medicamentosas consolidadas, monitorar; A via intravenosa é ineficaz no tratamento da infecção por C. difficile. A via oral é ineficaz para o tratamento de infecções sistêmicas;'
  },
  {
    drug: 'Anfotericina B desoxicolato',
    category: 'antifungal',
    attackDose: 'N/A',
    normalDose: '0,7-1mg/kg',
    crcl30_50: 'Considerar reduzir dose em 50% ou considerar formulação lipídica devido à nefrotoxicidade',
    crcl_30: 'Considerar reduzir dose em 50% ou considerar formulação lipídica devido à nefrotoxicidade',
    dialysis: 'Não é removível por HD. Administrar dose ajustada com cautela, monitorando função renal',
    notes: 'IMC ≥ 30 kg/m²: peso corporal ajustado; Muitas incompatibilidades e interações medicamentosas consolidadas, acesso exclusivo;'
  },
  {
    drug: 'Anfotericina B Lipossomal',
    category: 'antifungal',
    attackDose: 'N/A',
    normalDose: '3-5mg/kg',
    crcl30_50: 'Não requer ajuste',
    crcl_30: 'Não requer ajuste',
    dialysis: 'Não requer ajuste',
    notes: 'Muitas incompatibilidades e interações medicamentosas consolidadas, acesso exclusivo;'
  },
  {
    drug: 'Anidulafungina',
    category: 'antifungal',
    attackDose: '200mg',
    normalDose: '100mg 24/24h',
    crcl30_50: 'Não requer ajuste',
    crcl_30: 'Não requer ajuste',
    dialysis: 'Não requer ajuste',
    notes: 'IMC ≥ 40 kg/m²: 300mg no dia 1 depois 150mg 24/24h;'
  },
  {
    drug: 'Fluconazol',
    category: 'antifungal',
    attackDose: 'N/A',
    normalDose: '6-12mg/kg 24/24h',
    crcl30_50: '3-6mg/kg 24/24h',
    crcl_30: '3-6mg/kg 24/24h',
    dialysis: '6-12mg/kg após cada sessão de HD',
    notes: 'Bolsa pronta para uso;'
  },
  {
    drug: 'Micafungina',
    category: 'antifungal',
    attackDose: '100mg',
    normalDose: '100-150mg 24/24h',
    crcl30_50: 'Não requer ajuste',
    crcl_30: 'Não requer ajuste',
    dialysis: 'Não requer ajuste',
    notes: 'Candidíase (Tratamento – espécie C. albicans) IMC ≥ 30 kg/m² e peso ≥ 120kg: 200mg 24/24h; Incompatível em Y com Insulina Regular em BIC, usar acessos distintos.'
  },
  {
    drug: 'Voriconazol',
    category: 'antifungal',
    attackDose: 'N/A',
    normalDose: '6-12mg/kg 12/12h',
    crcl30_50: '4mg/kg 12/12h',
    crcl_30: 'Não requer ajuste da dose oral',
    dialysis: 'Não requer ajuste da dose oral',
    notes: 'IMC ≥ 30 kg/m²: peso corporal ajustado; Evitar ou usar com cautela a formulação IV devido ao acúmulo de ciclodextrina;'
  },
  {
    drug: 'Aciclovir',
    category: 'antiviral',
    attackDose: 'N/A',
    normalDose: '5-10mg/kg 8/8h',
    crcl30_50: '5-10mg/kg 12/12h',
    crcl_30: '5-10mg/kg 24/24h',
    dialysis: '5-10mg/kg 24/24h, após a sessão de HD',
    notes: 'IMC ≥ 30kg/m²: peso corporal ideal;'
  },
  {
    drug: 'Ganciclovir',
    category: 'antiviral',
    attackDose: 'N/A',
    normalDose: '5mg/kg 12/12h',
    crcl30_50: '2,5mg/kg 12/12h',
    crcl_30: '2,5mg/kg 24/24h',
    dialysis: '1,25mg/kg 3x/semana',
    notes: 'IMC ≥ 30kg/m²: peso corporal ideal;'
  }
];
