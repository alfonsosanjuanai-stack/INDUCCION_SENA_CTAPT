export interface ApprenticeProfile {
  fullName: string;
  documentType: 'CC' | 'TI' | 'CE' | 'PEP';
  documentNumber: string;
  programName: string;
  fichaNumber: string;
  regional: string;
  trainingCenter: string;
  avatarUrl?: string;
  completedModules: string[];
  examScore: number | null;
  certifiedAt: string | null;
}

export interface SymbolHotspot {
  id: string;
  name: string;
  sector: string;
  meaning: string;
  details: string;
}

export interface HymnStanza {
  id: number;
  type: 'CORO' | 'ESTROFA';
  number?: number;
  lines: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  scenario: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
    regulationArticle: string;
  }[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  category: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ProductiveAlternative {
  id: string;
  title: string;
  iconName: string;
  description: string;
  requirements: string[];
  benefits: string[];
  idealFor: string;
}

export interface GlossaryTerm {
  term: string;
  shortDefinition: string;
  fullDefinition: string;
  category: 'Pedagogía' | 'Plataformas' | 'Administrativo' | 'Institucional';
}

export interface ReglamentoArticulo {
  numero: number;
  titulo: string;
  resumen: string;
  contenidoCompleto: string;
  pagina: number;
  categoria: 'Principios' | 'Derechos' | 'Deberes' | 'Prohibiciones' | 'Novedades' | 'Etapa Productiva' | 'Faltas' | 'Medidas Formativas' | 'Procedimiento' | 'Representación';
  clave2024?: string;
}

export interface ReglamentoCapitulo {
  numero: number;
  romano: string;
  titulo: string;
  descripcion: string;
  paginas: number[];
  articulos: ReglamentoArticulo[];
}

export interface ReglamentoPagina {
  page: number;
  chapter: string;
  title: string;
  content: string;
}

export interface ReglamentoJSONStructure {
  documento: string;
  total_paginas: number;
  entidad: string;
  fecha_expedicion: string;
  diario_oficial: string;
  deroga: string;
  capitulos: ReglamentoCapitulo[];
  paginas: ReglamentoPagina[];
}
