import {
  SymbolHotspot,
  HymnStanza,
  CaseStudy,
  QuizQuestion,
  ProductiveAlternative,
  GlossaryTerm
} from '../types/induction';

export const SENA_REGIONALES = [
  'Regional Distrito Capital (Bogotá)',
  'Regional Antioquia (Medellín)',
  'Regional Valle del Cauca (Cali)',
  'Regional Atlántico (Barranquilla)',
  'Regional Santander (Bucaramanga)',
  'Regional Bolívar (Cartagena)',
  'Regional Caldas (Manizales)',
  'Regional Risaralda (Pereira)',
  'Regional Boyacá (Tunja)',
  'Regional Huila (Neiva)',
  'Regional Tolima (Ibagué)',
  'Regional Nariño (Pasto)',
  'Regional Cauca (Popayán)',
  'Regional Cundinamarca',
  'Regional Norte de Santander (Cúcuta)',
  'Regional Meta (Villavicencio)',
  'Regional Cesar (Valledupar)',
  'Regional Córdoba (Montería)',
  'Regional Magdalena (Santa Marta)',
  'Regional Quindío (Armenia)',
  'Regional Sucre (Sincelejo)',
  'Regional Casanare (Yopal)',
  'Regional Caquetá (Florencia)',
  'Regional Chocó (Quibdó)',
  'Regional La Guajira (Riohacha)',
  'Regional Arauca',
  'Regional Putumayo',
  'Regional Amazonas (Leticia)',
  'Regional Guainía',
  'Regional Guaviare',
  'Regional San Andrés y Providencia',
  'Regional Vaupés',
  'Regional Vichada'
];

export const POPULAR_PROGRAMS = [
  'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
  'Tecnólogo en Gestión Empresarial',
  'Tecnólogo en Gestión del Talento Humano',
  'Tecnólogo en Animación Digital y 3D',
  'Tecnólogo en Mecatrónica Industrial',
  'Tecnólogo en Control Ambiental',
  'Tecnólogo en Redes de Datos y Ciberseguridad',
  'Técnico en Sistemas e Infraestructura',
  'Técnico en Asistencia Administrativa',
  'Técnico en Contabilización de Operaciones Comerciales y Financieras',
  'Técnico en Cocina y Gastronomía Colombiana',
  'Técnico en Electricidad Industrial'
];

export const INSTITUTIONAL_VALUES = [
  {
    name: 'Respeto',
    description: 'Reconocimiento de la dignidad y diversidad de todas las personas en la comunidad educativa.',
    quote: 'Valorar las diferencias y construir convivencia pacífica.'
  },
  {
    name: 'Libre Pensamiento y Actitud Crítica',
    description: 'Fomento del debate argumentado, la libertad de opinión y el cuestionamiento proactivo con rigor académico.',
    quote: 'Aprender a pensar, no solo a memorizar.'
  },
  {
    name: 'Liderazgo Transformador',
    description: 'Inspirar a otros mediante el ejemplo, asumiendo el protagonismo en el desarrollo de la sociedad.',
    quote: 'Agentes activos del progreso de las regiones colombianas.'
  },
  {
    name: 'Solidaridad',
    description: 'Compromiso genuino con el bienestar colectivo y la cooperación entre compañeros e instructores.',
    quote: 'La formación técnica como motor de movilidad social.'
  },
  {
    name: 'Justicia y Equidad',
    description: 'Acceso incluyente a oportunidades formativas sin distingo de raza, género, condición socioeconómica o credo.',
    quote: 'Oportunidad real de educación gratuita y de calidad para todos.'
  },
  {
    name: 'Transparencia',
    description: 'Actuación íntegra, honesta y pública en todos los procesos pedagógicos y de convivencia institucional.',
    quote: 'Honestidad en el trabajo académico y profesional.'
  },
  {
    name: 'Creatividad e Innovación',
    description: 'Búsqueda constante de soluciones disruptivas para las necesidades productivas y sociales del país.',
    quote: 'Transformar ideas en soluciones concretas para el tejido productivo.'
  }
];

export const SYMBOL_HOTSPOTS: SymbolHotspot[] = [
  {
    id: 'caduceo',
    name: 'El Caduceo',
    sector: 'Sector Terciario (Comercio y Servicios)',
    meaning: 'Simboliza la actividad comercial, el intercambio ético, la logística y los servicios.',
    details: 'Representa la formación impartida en finanzas, comercio exterior, mercadeo, turismo, gestión documental y servicios de salud.'
  },
  {
    id: 'pinon',
    name: 'La Rueda Dentada (Piñón)',
    sector: 'Sector Secundario (Industria y Construcción)',
    meaning: 'Simboliza la fuerza de la industria, la maquinaria, la tecnología, la manufactura y la transformación de materias primas.',
    details: 'Alude al corazón fabril y tecnológico del país: software, mecatrónica, soldadura, electricidad, construcción y telecomunicaciones.'
  },
  {
    id: 'cafe',
    name: 'El Café y la Riqueza Agraria',
    sector: 'Sector Primario (Agropecuario y Extractivo)',
    meaning: 'Simboliza la riqueza natural de los suelos colombianos, la soberanía alimentaria y la vocación agrícola de las regiones.',
    details: 'Enmarca la formación campesina, agroindustrial, biotecnológica y ambiental que dignifica el campo colombiano a través de programas como SENA Emprende Rural.'
  }
];

export const HYMN_STANZAS: HymnStanza[] = [
  {
    id: 1,
    type: 'CORO',
    lines: [
      'Estudiantes del SENA, ¡adelante!',
      'Por Colombia luchad con amor,',
      'Con el ánimo noble y constante,',
      'Al trabajo, la patria y el honor.'
    ]
  },
  {
    id: 2,
    type: 'ESTROFA',
    number: 1,
    lines: [
      'Hoy la patria nos grita sentida,',
      '¡Estudiantes del SENA, triunfad!',
      'Sólo así lograréis en la vida,',
      'Más justicia, mayor libertad.'
    ]
  },
  {
    id: 3,
    type: 'ESTROFA',
    number: 2,
    lines: [
      'Avancemos con paso seguro,',
      'Clara el alma, serena la faz,',
      'Hacia luz del radiante futuro,',
      'En conquista de gloria y de paz.'
    ]
  },
  {
    id: 4,
    type: 'ESTROFA',
    number: 3,
    lines: [
      'Los talleres, las aulas proclaman,',
      'La misión que debemos cumplir,',
      'Y las fuerzas fecundas nos llaman,',
      'A forjar un feliz porvenir.'
    ]
  }
];

export const PRODUCTIVE_ALTERNATIVES: ProductiveAlternative[] = [
  {
    id: 'contrato_aprendizaje',
    title: 'Contrato de Aprendizaje',
    iconName: 'Briefcase',
    description: 'Vinculación formal mediante Ley 789 de 2002 con una empresa legalmente constituida que patrocina al aprendiz.',
    requirements: [
      'Estar en etapa lectiva avanzada o productiva aprobada.',
      'No haber firmado anteriormente contrato de aprendizaje del mismo nivel formativo.',
      'Postularse a través del aplicativo Caprendizaje (SGVA).'
    ],
    benefits: [
      'Apoyo de sostenimiento mensual mínimo equivalente al 75% o 100% de un SMLMV según tasa de desempleo.',
      'Afiliación y cobertura completa a EPS (Salud) y ARL (Riesgos Laborales).',
      'Experiencia laboral directa certificable en el sector productivo afín.'
    ],
    idealFor: 'Aprendices que buscan inserción directa y patrocinio económico en empresas privadas o públicas.'
  },
  {
    id: 'vinculo_laboral',
    title: 'Vínculo Laboral o Contractual',
    iconName: 'Building',
    description: 'Desempeño de funciones laborales afines al programa de formación mediante un contrato de trabajo previo o vigente.',
    requirements: [
      'Contrato laboral vigente en una empresa formal.',
      'Las funciones asignadas deben coincidir al 100% con las competencias del programa SENA.',
      'Aval y certificación de funciones por parte del empleador y aprobación del Coordinador Académico.'
    ],
    benefits: [
      'Salario regular completo con todas las prestaciones legales.',
      'Compatibilidad entre el empleo actual y la culminación del programa formativo.',
      'No requiere desvincularse laboralmente.'
    ],
    idealFor: 'Aprendices que ya trabajan en el sector y cuyas labores diarias coinciden con su titulación.'
  },
  {
    id: 'proyecto_productivo',
    title: 'Proyecto Productivo (Emprendimiento / Fondo Emprender)',
    iconName: 'Rocket',
    description: 'Creación y puesta en marcha de una unidad de negocio, empresa o desarrollo de I+D articulado con TecnoParque o Fondo Emprender.',
    requirements: [
      'Formulación formal del plan de negocio con asesoría de la Unidad de Emprendimiento SENA.',
      'Definición de cronograma de ejecución y entrega de resultados.',
      'Aprobación de la coordinación de formación del Centro.'
    ],
    benefits: [
      'Posibilidad de acceder a capital semilla no reembolsable del Fondo Emprender.',
      'Construcción de empresa propia generando autoempleo y empleo regional.',
      'Acompañamiento especializado de mentores empresariales.'
    ],
    idealFor: 'Aprendices con perfil emprendedor que desean crear su propia empresa tecnológica o comercial.'
  },
  {
    id: 'sennova_investigacion',
    title: 'Participación en Proyectos SENNOVA',
    iconName: 'Microscope',
    description: 'Integración a semilleros y grupos de investigación aplicada e innovación tecnológica en centros de formación y TecnoAcademias.',
    requirements: [
      'Vinculación formal a un proyecto de investigación aprobado en convocatoria SENNOVA.',
      'Dedicación horaria concertada con el instructor líder del semillero.',
      'Cumplimiento de objetivos técnicos y de desarrollo tecnológico.'
    ],
    benefits: [
      'Desarrollo de habilidades de investigación aplicada, patentes y publicaciones.',
      'Acceso a laboratorios de punta y equipamiento de alta tecnología.',
      'Posibilidad de apoyos económicos especiales para proyectos I+D.'
    ],
    idealFor: 'Aprendices apasionados por la ciencia, la investigación, la robótica, la biotecnología o el desarrollo de software.'
  },
  {
    id: 'pasantia',
    title: 'Pasantía Empresarial o Social',
    iconName: 'GraduationCap',
    description: 'Práctica concertada entre el SENA y una empresa, ONG o entidad estatal para realizar actividades específicas de apoyo técnico.',
    requirements: [
      'Convenio de pasantía debidamente firmado por las partes.',
      'Afiliación a ARL cubierta por la empresa o por el SENA.',
      'Plan de trabajo avalado por el instructor de seguimiento.'
    ],
    benefits: [
      'Flexibilidad horaria concertada.',
      'Aplicación en el sector público, fundaciones sociales o microempresas familiares.',
      'Desarrollo de proyectos con alto impacto comunitario.'
    ],
    idealFor: 'Aprendices interesados en entidades públicas, ONGs o apoyo a comunidades vulnerables.'
  },
  {
    id: 'monitoria',
    title: 'Monitoría Institucional en el SENA',
    iconName: 'Award',
    description: 'Apoyo técnico y pedagógico directo en los ambientes de formación, laboratorios o bibliotecas del propio Centro SENA.',
    requirements: [
      'Rendimiento académico sobresaliente en la etapa lectiva.',
      'Convocatoria oficial de monitorías abierta en el Centro.',
      'Aprobación de prueba y entrevista institucional.'
    ],
    benefits: [
      'Estímulo económico mensual establecido por la resolución institucional.',
      'Inmersión pedagógica y técnica profunda al lado de instructores expertos.',
      'Certificación institucional de alto prestigio.'
    ],
    idealFor: 'Aprendices destacados académicamente con vocación formativa o técnica en ambientes SENA.'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'asistencia_inasistencia',
    title: 'Dilema de Inasistencia Injustificada',
    scenario: 'Carlos, aprendiz del tecnólogo en ADSO, acumula 3 días continuos de inasistencia a sus clases y proyectos formativos sin avisar al instructor ni presentar incapacidad médica.',
    options: [
      {
        id: 'opt1',
        text: 'No pasa nada, en el SENA solo importa entregar los talleres al final del trimestre.',
        isCorrect: false,
        explanation: 'Falso. La formación en el SENA es presencial y/o sincrónica de dedicación continua. El abandono injustificado acarrea deserción.',
        regulationArticle: 'Reglamento del Aprendiz (Acuerdo 009 de 2024).'
      },
      {
        id: 'opt2',
        text: 'Carlos debe reportar la justificación médica o de fuerza mayor dentro de los 3 días hábiles siguientes; de lo contrario incurre en deserción y cancelación de matrícula.',
        isCorrect: true,
        explanation: '¡Correcto! El Acuerdo 009 de 2024 estipula que tres (3) días consecutivos de inasistencia no justificada dan inicio al trámite formal de deserción garantizando el debido proceso.',
        regulationArticle: 'Régimen de Novedades y Deserción - Acuerdo 009 de 2024.'
      },
      {
        id: 'opt3',
        text: 'Puede pedirle a un compañero que firme la planilla por él para evitar llamados de atención.',
        isCorrect: false,
        explanation: 'Falso y grave. Suplantar o falsificar firmas en planillas o accesos virtuales es una falta gravísima con consecuencias disciplinarias y legales.',
        regulationArticle: 'Capítulo de Prohibiciones - Acuerdo 009 de 2024.'
      }
    ]
  },
  {
    id: 'plagio_evidencias',
    title: 'Integridad Académica, IA y Plagio en Evidencias',
    scenario: 'Durante la entrega de una Guía de Aprendizaje sobre base de datos, Luisa descarga un proyecto completo de GitHub o genera código con Inteligencia Artificial y lo presenta como propio sin citar la autoría ni hacer adaptaciones.',
    options: [
      {
        id: 'opt1',
        text: 'El plagio, copia no autorizada y uso deshonesto de IA sin declaración constituyen falta gravísima contra la formación profesional y el patrimonio intelectual.',
        isCorrect: true,
        explanation: '¡Excelente! Presentar trabajos ajenos como propios vulnera los principios éticos y el Acuerdo 009 de 2024, que exige uso ético de tecnologías y declaración transparente de fuentes.',
        regulationArticle: 'Prohibiciones y Régimen Disciplinario - Acuerdo 009 de 2024.'
      },
      {
        id: 'opt2',
        text: 'Es una práctica permitida si el repositorio es de código abierto en internet.',
        isCorrect: false,
        explanation: 'Aunque una biblioteca sea abierta, presentarla como evidencia de desarrollo propio sin atribución es plagio académico.',
        regulationArticle: 'Código de Integridad y Ética Digital - Acuerdo 009 de 2024.'
      },
      {
        id: 'opt3',
        text: 'Solo amerita que el instructor le ponga una nota baja sin mayores consecuencias.',
        isCorrect: false,
        explanation: 'En el SENA no existe calificación numérica (0-5); el aprendizaje se evalúa como Aprobado (A) o No Aprobado (Deficiente/D), y el plagio implica falta disciplinaria grave o gravísima.',
        regulationArticle: 'Evaluación y Medidas Formativas - Acuerdo 009 de 2024.'
      }
    ]
  },
  {
    id: 'uso_carne',
    title: 'Porte Obligatorio del Carné Institucional (Físico o Digital)',
    scenario: 'Andrés olvida su carné institucional y al llegar al Centro de Formación intenta ingresar empujando al personal de seguridad y negándose a registrar su documento oficial.',
    options: [
      {
        id: 'opt1',
        text: 'El carné institucional (físico o digital) es de porte obligatorio y visible para el ingreso y permanencia en todas las sedes del SENA por seguridad y convivencia de la comunidad.',
        isCorrect: true,
        explanation: '¡Exacto! El carné identifica al aprendiz como miembro activo del SENA y es de porte obligatorio. El irrespeto a funcionarios y personal de apoyo configura falta disciplinaria.',
        regulationArticle: 'Deberes del Aprendiz - Acuerdo 009 de 2024.'
      },
      {
        id: 'opt2',
        text: 'Cualquier persona puede ingresar libremente a los talleres y laboratorios sin identificarse.',
        isCorrect: false,
        explanation: 'Por protocolos de seguridad industrial, protección de activos y salvaguarda de menores de edad, el control de acceso es estricto.',
        regulationArticle: 'Normas de Seguridad y Salud en el Trabajo (SST).'
      }
    ]
  },
  {
    id: 'etapa_productiva_inicio',
    title: 'Oportunidad de la Etapa Productiva',
    scenario: 'Valentina culminó el 100% de los Resultados de Aprendizaje de su etapa lectiva. ¿Cuál es el plazo máximo que estipula el reglamento para iniciar y registrar su alternativa de etapa productiva?',
    options: [
      {
        id: 'opt1',
        text: 'Tiene hasta dos (2) años continuos para legalizar y concertar su alternativa de etapa productiva tras culminar la etapa lectiva.',
        isCorrect: true,
        explanation: '¡Correcto! El aprendiz cuenta con hasta dos años para legalizar su etapa productiva; superado este periodo sin justificación o solicitud de prórroga, incurre en causal de cancelación de matrícula.',
        regulationArticle: 'Trámite de Etapa Productiva - Acuerdo 009 de 2024.'
      },
      {
        id: 'opt2',
        text: 'No hay límite de tiempo, puede hacerla 10 años después.',
        isCorrect: false,
        explanation: 'Falso. Las competencias tecnológicas pierden vigencia y el reglamento establece plazos perentorios para la titulación.',
        regulationArticle: 'Reglamento del Aprendiz (Acuerdo 009 de 2024).'
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Historia e Identidad',
    question: '¿En qué año fue fundado el SENA y quién fue su principal gestor visionario?',
    options: [
      'En 1957 por Rodolfo Martínez Tono',
      'En 1975 por Alfonso López Michelsen',
      'En 1948 por Jorge Eliécer Gaitán',
      'En 1968 por Carlos Lleras Restrepo'
    ],
    correctAnswer: 0,
    explanation: 'El SENA nació el 21 de junio de 1957 mediante el Decreto Ley 118, como una iniciativa visionaria del economista cartagenero Rodolfo Martínez Tono junto con empresarios y sindicatos.'
  },
  {
    id: 2,
    category: 'Símbolos Institucionales',
    question: 'En el escudo oficial del SENA, ¿qué representa la Rueda Dentada (piñón)?',
    options: [
      'La agricultura colombiana y los recursos hídricos',
      'El sector industrial, la maquinaria, la manufactura y la tecnología',
      'El comercio internacional y los servicios financieros',
      'Las vías y carreteras de la geografía nacional'
    ],
    correctAnswer: 1,
    explanation: 'El piñón representa el sector secundario: industria, tecnología, maquinaria y la fuerza transformadora de los trabajadores colombianos.'
  },
  {
    id: 3,
    category: 'Símbolos Institucionales',
    question: '¿Qué simboliza el Caduceo presente en el escudo del SENA?',
    options: [
      'La medicina y la salud ocupacional',
      'El sector terciario: comercio, logística y servicios',
      'La diplomacia y las relaciones exteriores',
      'La paz entre los partidos políticos'
    ],
    correctAnswer: 1,
    explanation: 'El caduceo alude históricamente al comercio y los servicios, componentes centrales del sector terciario en la economía del país.'
  },
  {
    id: 4,
    category: 'Modelo Pedagógico',
    question: '¿Cuáles son las dos grandes etapas que componen la Formación Profesional Integral (FPI)?',
    options: [
      'Etapa Teórica y Etapa de Grado',
      'Etapa Básica y Etapa Universitaria',
      'Etapa Lectiva y Etapa Productiva',
      'Etapa Presencial y Etapa Virtual'
    ],
    correctAnswer: 2,
    explanation: 'La FPI se estructura en dos fases complementarias: Etapa Lectiva (apropiación teórica y práctica en ambientes) y Etapa Productiva (aplicación en el entorno laboral real).'
  },
  {
    id: 5,
    category: 'Evaluación del Aprendizaje',
    question: '¿Cómo se evalúa y califica el desempeño y las evidencias de un aprendiz en el SENA?',
    options: [
      'Con notas numéricas de 1.0 a 5.0',
      'Con letras A (Aprobado) o D (Deficiente / No Aprobado)',
      'Con porcentajes de 0% a 100%',
      'Con estrellas de calidad del 1 al 5'
    ],
    correctAnswer: 1,
    explanation: 'El SENA califica por competencia cualitativa: "A" si el aprendiz alcanza los Resultados de Aprendizaje (RAP) demostrando suficiencia, o "D" si aún requiere planes de mejoramiento.'
  },
  {
    id: 6,
    category: 'Reglamento del Aprendiz',
    question: '¿Cuántos días de inasistencia consecutiva injustificada dan lugar al inicio del trámite de deserción según el Acuerdo 009 de 2024?',
    options: [
      'Un solo día',
      'Tres (3) días hábiles consecutivos',
      'Quince (15) días calendario',
      'Treinta (30) días calendario'
    ],
    correctAnswer: 1,
    explanation: 'El Acuerdo 009 de 2024 estipula que tres (3) días consecutivos de inasistencia sin justificación formal dan inicio al trámite de deserción, garantizando el debido proceso para presentar descargos.'
  },
  {
    id: 7,
    category: 'Reglamento del Aprendiz',
    question: 'Bajo el Acuerdo 009 de 2024, ¿cuál de las siguientes conductas constituye una FALTA GRAVÍSIMA?',
    options: [
      'Llegar 5 minutos tarde a un taller con excusa',
      'Plagiar trabajos, suplantar identidades o cometer actos de violencia y discriminación',
      'No portar cuaderno de notas',
      'Pedir aclaración de una evaluación al instructor'
    ],
    correctAnswer: 1,
    explanation: 'El fraude, la suplantación digital, el plagio y cualquier conducta de violencia o discriminación se tipifican como faltas gravísimas en el Acuerdo 009 de 2024.'
  },
  {
    id: 8,
    category: 'Bienestar al Aprendiz',
    question: '¿Qué es el Fondo Emprender del SENA?',
    options: [
      'Un préstamo bancario con cobro de intereses altos',
      'Un fondo de capital semilla no reembolsable creado para financiar iniciativas empresariales de aprendices y egresados',
      'Una cooperativa de ahorro para empleados del SENA',
      'Un subsidio exclusivo de pasajes de transporte'
    ],
    correctAnswer: 1,
    explanation: 'El Fondo Emprender es el fondo de capital semilla más importante de Colombia, administrado por el SENA para convertir proyectos de aprendices en empresas sostenibles.'
  },
  {
    id: 9,
    category: 'Ecosistema Digital',
    question: '¿Cuál es el Ambiente Virtual de Aprendizaje (LMS) oficial del SENA actualmente para consultar materiales y subir evidencias?',
    options: [
      'Moodle Universal',
      'Zajuna',
      'Google Classroom',
      'Canvas Enterprise'
    ],
    correctAnswer: 1,
    explanation: 'Zajuna es la plataforma oficial LMS institucional del SENA en la que los aprendices e instructores gestionan rutas de aprendizaje, foros y evidencias.'
  },
  {
    id: 10,
    category: 'Etapa Productiva',
    question: '¿Cuál es un beneficio directo del Contrato de Aprendizaje según la normatividad colombiana?',
    options: [
      'El aprendiz no tiene ninguna obligación de asistir a la empresa',
      'Recibir apoyo de sostenimiento mensual y afiliación completa a EPS y ARL',
      'Ser contratado como socio con acciones de la empresa',
      'Exención de pago de impuestos de por vida'
    ],
    correctAnswer: 1,
    explanation: 'El Contrato de Aprendizaje garantiza un apoyo económico de sostenimiento y cobertura en seguridad social (Salud y Riesgos Laborales) sin generar relación laboral subordinada clásica.'
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'FPI (Formación Profesional Integral)',
    shortDefinition: 'Proceso teórico-práctico integral para el desarrollo humano y técnico.',
    fullDefinition: 'Es el proceso mediante el cual la persona adquiere y desarrolla de manera permanente conocimientos, destrezas y aptitudes, e identifica, genera y asume valores y actitudes para su realización humana y su participación en el trabajo productivo.',
    category: 'Pedagogía'
  },
  {
    term: 'RAP (Resultado de Aprendizaje)',
    shortDefinition: 'Logro medible que evidencia lo que el aprendiz sabe y sabe hacer.',
    fullDefinition: 'Indicadores cualitativos que permiten evaluar las capacidades desarrolladas por el aprendiz en una competencia específica o transversal.',
    category: 'Pedagogía'
  },
  {
    term: 'Ficha de Caracterización',
    shortDefinition: 'Número único de identificación de una cohorte o grupo formativo.',
    fullDefinition: 'Código numérico asignado en el sistema Sofia Plus que identifica de manera única a un grupo de aprendices matriculados en un programa y centro específico.',
    category: 'Administrativo'
  },
  {
    term: 'Sofia Plus',
    shortDefinition: 'Sistema de Gestión y Administración Educativa del SENA.',
    fullDefinition: 'Sistema Optimizado para la Formación Integral del Aprendizaje Activo. Es la plataforma administrativa donde se gestionan inscripciones, matrículas, certificaciones y novedades.',
    category: 'Plataformas'
  },
  {
    term: 'Zajuna',
    shortDefinition: 'Ambiente Virtual de Aprendizaje (LMS) institucional.',
    fullDefinition: 'Plataforma digital para la gestión del aprendizaje en línea, acceso a guías de aprendizaje, foros de discusión y entrega de evidencias.',
    category: 'Plataformas'
  },
  {
    term: 'Guía de Aprendizaje',
    shortDefinition: 'Documento orientador que describe las actividades de formación.',
    fullDefinition: 'Instrumento pedagógico diseñado por los instructores que orienta al aprendiz paso a paso en el desarrollo de actividades para alcanzar los Resultados de Aprendizaje.',
    category: 'Pedagogía'
  },
  {
    term: 'SENNOVA',
    shortDefinition: 'Sistema de Investigación, Desarrollo Tecnológico e Innovación del SENA.',
    fullDefinition: 'Estrategia institucional que agrupa semilleros de investigación, modernización de ambientes, TecnoParques y TecnoAcademias para impulsar la ciencia aplicada en el país.',
    category: 'Institucional'
  },
  {
    term: 'APE (Agencia Pública de Empleo)',
    shortDefinition: 'Servicio público gratuito de intermediación laboral del SENA.',
    fullDefinition: 'Plataforma y red de oficinas que conecta a los buscadores de empleo (aprendices, egresados y ciudadanos) con las vacantes reales ofrecidas por empresas en toda Colombia.',
    category: 'Institucional'
  },
  {
    term: 'Comité de Evaluación y Seguimiento',
    shortDefinition: 'Instancia colegiada para el análisis formativo y disciplinario.',
    fullDefinition: 'Órgano consultivo del Centro de Formación encargado de evaluar el desempeño académico y disciplinario de los aprendices, garantizando el debido proceso y proponiendo medidas formativas.',
    category: 'Administrativo'
  },
  {
    term: 'Apoyo de Sostenimiento FIC',
    shortDefinition: 'Fondo de la Industria de la Construcción para aprendices afines.',
    fullDefinition: 'Auxilio económico especial destinado a aprendices de programas de formación del sector de la construcción que cumplan los requisitos socioeconómicos y académicos.',
    category: 'Institucional'
  },
  {
    term: 'Acuerdo 009 de 2024',
    shortDefinition: 'Nuevo Reglamento del Aprendiz SENA unificado (Diario Oficial 52.947).',
    fullDefinition: 'Estatuto formativo expedido por el Consejo Directivo Nacional que deroga los Acuerdos 007 de 2012, 002 de 2014 y afines. Consta de 48 páginas y 10 capítulos que regulan derechos, deberes, ética con IA, enfoque diferencial y debido proceso.',
    category: 'Administrativo'
  },
  {
    term: 'Ética e Inteligencia Artificial (Acuerdo 009)',
    shortDefinition: 'Obligación de declarar de forma transparente el uso de IA generativa en evidencias.',
    fullDefinition: 'Artículo 11 y 15 del Acuerdo 009 de 2024. Exige que el aprendiz declare las herramientas de IA utilizadas. Prohíbe presentar como propias respuestas o proyectos generados por IA sin citar su origen ni demostrar apropiación cognitiva personal.',
    category: 'Pedagogía'
  },
  {
    term: 'Justicia Restaurativa Formativa',
    shortDefinition: 'Enfoque pedagógico del Acuerdo 009 centrado en reparar el daño y reintegrar al aprendiz.',
    fullDefinition: 'Mecanismo que privilegia el diálogo formativo, la conciliación, planes de mejoramiento pedagógico y voluntariado comunitario frente a la expulsión punitiva tradicional, reforzando la permanencia escolar.',
    category: 'Pedagogía'
  },
  {
    term: 'Recurso de Reposición (5 Días Hábiles)',
    shortDefinition: 'Garantía procesal para impugnar decisiones sancionatorias del Subdirector.',
    fullDefinition: 'Mecanismo legal contemplado en los Artículos 39 y 43 del Acuerdo 009 de 2024. Otorga cinco (5) días hábiles siguientes a la notificación formal para interponer el recurso ante el Subdirector de Centro con efecto suspensivo.',
    category: 'Administrativo'
  }
];
