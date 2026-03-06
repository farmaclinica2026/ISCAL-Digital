
export interface Protocol {
  id: string;
  category: string;
  procedure: string;
  antibiotic: string;
  inductionDose: string;
  intraOp: string;
  duration: string;
  postOpInterval?: string;
  notes?: string;
}

export type TabType = 'adults' | 'guidelines';

export interface RenalDose {
  drug: string;
  category?: 'antibiotic' | 'antifungal' | 'antiviral';
  attackDose?: string;
  normalDose: string;
  crcl30_50: string;
  crcl_30: string;
  dialysis: string;
  notes?: string;
}

export type AppView = 'home' | 'prophylaxis' | 'renal';
