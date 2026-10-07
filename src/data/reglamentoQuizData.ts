export interface EvaluationQuestion {
  id: number;
  sectionId: 'principios_derechos' | 'deberes_ia' | 'prohibiciones_faltas' | 'novedades_productiva' | 'procedimiento_debido_proceso';
  sectionName: string;
  sectionNumber: number;
  chapterRomano: string;
  question: string;
  options: string[];
  correctAnswer: number;
  articleCitation: string;
  positiveFeedback: {
    title: string;
    message: string;
    keyConcept: string;
  };
  errorFeedback: {
    title: string;
    whyItFailed: string;
    correctRule: string;
    pedagogicalTip: string;
  };
}

export interface EvaluationSectionConfig {
  id: 'principios_derechos' | 'deberes_ia' | 'prohibiciones_faltas' | 'novedades_productiva' | 'procedimiento_debido_proceso';
  number: number;
  title: string;
  shortTitle: string;
  chapters: string;
  iconName: string;
  description: string;
  color: string;
}

export const EVALUATION_SECTIONS: EvaluationSectionConfig[] = [
  {
    id: 'principios_derechos',
    number: 1,
    title: 'Sección 1: Principios Rectores y Derechos del Aprendiz',
    shortTitle: 'Principios y Derechos',
    chapters: 'Capítulos I y II (Arts. 1 al 9)',
    iconName: 'Scale',
    description: 'Dignidad humana, equidad, inclusión, salud mental y ambientes físicos/digitales.',
    color: 'emerald'
  },
  {
    id: 'deberes_ia',
    number: 2,
    title: 'Sección 2: Deberes, Ética Digital y Uso de Inteligencia Artificial',
    shortTitle: 'Deberes y Ética IA',
    chapters: 'Capítulo III (Arts. 10 al 14)',
    iconName: 'Cpu',
    description: 'Responsabilidad formativa, citación transparente de IA, carné digital y ciberconvivencia.',
    color: 'blue'
  },
  {
    id: 'prohibiciones_faltas',
    number: 3,
    title: 'Sección 3: Prohibiciones y Clasificación de Faltas',
    shortTitle: 'Prohibiciones y Faltas',
    chapters: 'Capítulos IV y VII (Arts. 15 al 18 y 28 al 30)',
    iconName: 'ShieldAlert',
    description: 'Fraude académico, violencias basadas en género, sabotaje y graduación en leves, graves y gravísimas.',
    color: 'rose'
  },
  {
    id: 'novedades_productiva',
    number: 4,
    title: 'Sección 4: Novedades Académicas y Régimen de Etapa Productiva',
    shortTitle: 'Novedades y Práctica',
    chapters: 'Capítulos V y VI (Arts. 19 al 27)',
    iconName: 'Calendar',
    description: 'Traslados, aplazamientos, deserción garantista (3 días), alternativas laborales y bitácoras.',
    color: 'amber'
  },
  {
    id: 'procedimiento_debido_proceso',
    number: 5,
    title: 'Sección 5: Medidas Formativas, Sanciones, Debido Proceso y Representación',
    shortTitle: 'Debido Proceso y Sanciones',
    chapters: 'Capítulos VIII, IX y X (Arts. 31 al 42)',
    iconName: 'HeartHandshake',
    description: 'Justicia restaurativa, planes de mejoramiento, comités, recurso de reposición (5 días) y vocerías.',
    color: 'purple'
  }
];

export const REGLAMENTO_25_QUESTIONS: EvaluationQuestion[] = [
  // =========================================================================
  // SECCIÓN 1: PRINCIPIOS Y DERECHOS (5 PREGUNTAS)
  // =========================================================================
  {
    id: 1,
    sectionId: 'principios_derechos',
    sectionName: 'Principios y Derechos',
    sectionNumber: 1,
    chapterRomano: 'Capítulo I',
    question: 'Bajo el Acuerdo 009 de 2024, ¿cómo concibe el SENA el rol del Aprendiz en su proceso formativo?',
    options: [
      'Como un receptor pasivo que solo memoriza instrucciones técnicas.',
      'Como protagonista activo de su aprendizaje, sujeto de derechos y agente de transformación social.',
      'Como un trabajador dependiente sin autonomía sobre su proyecto de vida.',
      'Como un usuario eventual subordinado a las decisiones unilaterales del centro.'
    ],
    correctAnswer: 1,
    articleCitation: 'Acuerdo 009 de 2024, Art. 2 (Concepto de Aprendiz SENA)',
    positiveFeedback: {
      title: '¡Apropiación Institucional Impecable!',
      message: 'Comprendes la filosofía central del SENA: el aprendiz es el protagonista de su propio aprendizaje y de la transformación de Colombia.',
      keyConcept: 'El aprendizaje centrado en el aprendiz fomenta pensamiento crítico, autonomía y rigor técnico.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Concepción Tradicional vs. Moderna',
      whyItFailed: 'Considerar al aprendiz como un sujeto pasivo o subordinado desconoce el modelo pedagógico del SENA y el Acuerdo 009.',
      correctRule: 'El Art. 2 define expresamente al aprendiz como el protagonista activo de su proyecto de vida y formación profesional integral.',
      pedagogicalTip: 'Recuerda que en el SENA desarrollas competencias tanto técnicas como ciudadanas y humanas.'
    }
  },
  {
    id: 2,
    sectionId: 'principios_derechos',
    sectionName: 'Principios y Derechos',
    sectionNumber: 1,
    chapterRomano: 'Capítulo I',
    question: '¿Qué validez jurídica y formativa le otorga el nuevo reglamento a los entornos digitales como Zajuna LMS frente a los talleres físicos?',
    options: [
      'Los entornos digitales son considerados únicamente herramientas secundarias sin peso evaluativo.',
      'Idéntica validez formativa y normativa: las plataformas digitales gozan del mismo rigor y valor que los talleres presenciales.',
      'Solo tienen validez si el aprendiz asiste previamente a una sesión presencial en el centro.',
      'Las evidencias en Zajuna son opcionales y no influyen en el juicio de evaluación.'
    ],
    correctAnswer: 1,
    articleCitation: 'Acuerdo 009 de 2024, Art. 4 (Ambientes de Aprendizaje Físicos y Digitales)',
    positiveFeedback: {
      title: '¡Visión Digital Correcta!',
      message: '¡Exacto! El Acuerdo 009 consagró la equivalencia total entre los ambientes presenciales y los entornos tecnológicos institucionales.',
      keyConcept: 'Tus actividades en Zajuna tienen el mismo respaldo legal y académico que una práctica de taller.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Infraestructura Digital Formal',
      whyItFailed: 'Subestimar el entorno virtual es un error común; el SENA no considera las plataformas como anexos secundarios.',
      correctRule: 'El Art. 4 equipara plenamente los ambientes presenciales y virtuales (LMS Zajuna) en exigencia y validez formativa.',
      pedagogicalTip: 'Trata tus ingresos y entregas en Zajuna con la misma seriedad que la asistencia puntual al aula.'
    }
  },
  {
    id: 3,
    sectionId: 'principios_derechos',
    sectionName: 'Principios y Derechos',
    sectionNumber: 1,
    chapterRomano: 'Capítulo II',
    question: 'En el proceso de evaluación del aprendizaje, ¿qué derecho fundamental ampara al aprendiz respecto a sus calificaciones?',
    options: [
      'Aceptar la nota sin posibilidad de solicitar explicaciones al instructor.',
      'Recibir retroalimentación pedagógica motivada y oportuna dentro de los plazos concertados.',
      'Exigir que siempre se le califique con "A" sin importar la evidencia presentada.',
      'Modificar directamente las calificaciones en la plataforma Sofia Plus.'
    ],
    correctAnswer: 1,
    articleCitation: 'Acuerdo 009 de 2024, Art. 5 (Derecho a la Formación Integral de Calidad)',
    positiveFeedback: {
      title: '¡Derecho a la Retroalimentación Asertiva!',
      message: '¡Muy bien! Tienes derecho a conocer el fundamento de cada juicio evaluativo para saber cómo mejorar tus competencias.',
      keyConcept: 'La evaluación en el SENA es formativa: el instructor orienta tus oportunidades de mejora.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Transparencia Evaluativa',
      whyItFailed: 'Asumir que las evaluaciones son inapelables o arbitrarias vulnera tu derecho al debido proceso pedagógico.',
      correctRule: 'El Art. 5 establece el derecho inalienable a recibir retroalimentación constructiva, oportuna y justificada de tus evidencias.',
      pedagogicalTip: 'Siempre puedes concertar con tu instructor la revisión de una evidencia calificada con D.'
    }
  },
  {
    id: 4,
    sectionId: 'principios_derechos',
    sectionName: 'Principios y Derechos',
    sectionNumber: 1,
    chapterRomano: 'Capítulo II',
    question: '¿Qué novedad fundamental introduce el Acuerdo 009 en el catálogo de derechos en relación con el bienestar del aprendiz?',
    options: [
      'La entrega de computadores portátiles de regalo a todos los matriculados.',
      'El derecho explícito al cuidado de la salud mental, estabilidad socioemocional y acompañamiento integral.',
      'La exoneración obligatoria de exámenes finales a quien lo solicite verbalmente.',
      'Permiso indefinido de inasistencia sin justificación médica.'
    ],
    correctAnswer: 1,
    articleCitation: 'Acuerdo 009 de 2024, Art. 8 (Salud Mental y Bienestar Integral)',
    positiveFeedback: {
      title: '¡Pioneros en Salud Mental!',
      message: '¡Excelente! El Acuerdo 009 es pionero en Colombia al reconocer la salud mental y socioemocional como un derecho formativo esencial.',
      keyConcept: 'El SENA cuenta con psicólogos y profesionales de Bienestar para apoyarte en cualquier momento.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Novedad 2024 en Bienestar',
      whyItFailed: 'Confundir derechos de bienestar con beneficios materiales o permisos de inasistencia es un equívoco frecuente.',
      correctRule: 'El Art. 8 consagra la salud mental como derecho humano fundamental, brindando rutas de atención psicosocial institucional.',
      pedagogicalTip: 'Si experimentas estrés, ansiedad o dificultades personales, acude al área de Bienestar de tu Centro.'
    }
  },
  {
    id: 5,
    sectionId: 'principios_derechos',
    sectionName: 'Principios y Derechos',
    sectionNumber: 1,
    chapterRomano: 'Capítulo II',
    question: 'Frente al derecho al debido proceso y defensa técnica (Art. 7), ¿qué principio ampara al aprendiz si es llamado a indagación?',
    options: [
      'Presunción de culpabilidad inmediata por el solo hecho de existir una queja.',
      'Presunción de inocencia, derecho a ser notificado, controvertir pruebas y presentar descargos asistido.',
      'Sanción automática sin necesidad de escucharlo en descargos.',
      'Pérdida inmediata de su carné mientras se investiga el caso.'
    ],
    correctAnswer: 1,
    articleCitation: 'Acuerdo 009 de 2024, Art. 7 (Debido Proceso y Defensa Técnica)',
    positiveFeedback: {
      title: '¡Garantía Constitucional Protegida!',
      message: '¡Correcto! Nadie puede ser sancionado en el SENA sin que se respete el debido proceso consagrado en la Constitución y el Acuerdo 009.',
      keyConcept: 'La presunción de inocencia y el derecho a presentar pruebas son garantías innegociables.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Principio de Inocencia',
      whyItFailed: 'Creer que una simple queja suspende tus derechos vulnera el artículo 29 de la Constitución Política de Colombia.',
      correctRule: 'El Art. 7 garantiza presunción de inocencia, conocimiento oportuno de las pruebas y la doble instancia.',
      pedagogicalTip: 'Siempre tienes derecho a ser escuchado formalmente y a aportar testigos o documentos antes de cualquier decisión.'
    }
  },

  // =========================================================================
  // SECCIÓN 2: DEBERES, ÉTICA DIGITAL Y USO DE IA (5 PREGUNTAS)
  // =========================================================================
  {
    id: 6,
    sectionId: 'deberes_ia',
    sectionName: 'Deberes y Ética IA',
    sectionNumber: 2,
    chapterRomano: 'Capítulo III',
    question: 'Bajo el Artículo 11 del Acuerdo 009 de 2024, ¿cuál es la regla obligatoria al utilizar Inteligencia Artificial Generativa en evidencias formativas?',
    options: [
      'Está totalmente prohibido encender cualquier aplicación de IA bajo pena de expulsión.',
      'Se puede usar libremente sin decir nada al instructor porque es una tecnología global.',
      'Se debe declarar y citar con total transparencia el uso de la IA, preservando la autoría y el pensamiento crítico propio.',
      'Hacer que la IA escriba todo el trabajo pero firmarlo con el nombre del aprendiz.'
    ],
    correctAnswer: 2,
    articleCitation: 'Acuerdo 009 de 2024, Art. 11 (Uso Ético de Tecnologías e Inteligencia Artificial)',
    positiveFeedback: {
      title: '¡Ética Digital al 100%!',
      message: '¡Brillante! El SENA no prohíbe la IA, sino que enseña a usarla con ética, honestidad académica y transparencia en los prompts.',
      keyConcept: 'Declarar el uso de herramientas IA demuestra madurez profesional y rigor investigativo.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Transparencia vs. Ocultamiento',
      whyItFailed: 'Ocultar el uso de IA se tipifica como falta y simulación de autoría. Tampoco está prohibida; la clave es la transparencia.',
      correctRule: 'El Art. 11 exige citar explícitamente cualquier apoyo de modelos de IA, conservando la autoría intelectual propia.',
      pedagogicalTip: 'Si utilizas ChatGPT, Gemini o Copilot, añade una nota metodológica explicando qué prompts usaste y cómo contrastaste la información.'
    }
  },
  {
    id: 7,
    sectionId: 'deberes_ia',
    sectionName: 'Deberes y Ética IA',
    sectionNumber: 2,
    chapterRomano: 'Capítulo III',
    question: 'Respecto al porte del carné institucional según el Artículo 12 del nuevo reglamento:',
    options: [
      'Solo se permite el carné plástico impreso; las aplicaciones móviles están prohibidas.',
      'El carné físico y el carné digital oficial tienen idéntica validez legal para ingresar y permanecer en el SENA.',
      'El aprendiz no tiene obligación de portar ninguna identificación en el centro.',
      'El carné solo es necesario el primer día de inducción.'
    ],
    correctAnswer: 1,
    articleCitation: 'Acuerdo 009 de 2024, Art. 12 (Porte del Carné Institucional Físico o Digital)',
    positiveFeedback: {
      title: '¡Identidad Digital Validada!',
      message: '¡Así es! Puedes presentar tu carné digital institucional desde tu teléfono celular con la misma validez que el carné físico.',
      keyConcept: 'El carné digital SENA agiliza tu ingreso y te acredita oficialmente como aprendiz activo.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Modernización Tecnológica',
      whyItFailed: 'El Acuerdo 009 modernizó las exigencias reconociendo el carné digital con plena validez probatoria.',
      correctRule: 'El Art. 12 confiere el mismo valor formal al carné físico que al carné digital oficial emitido por los sistemas SENA.',
      pedagogicalTip: 'Descarga tu carné digital desde el botón de la barra superior para tenerlo siempre disponible en tu móvil.'
    }
  },
  {
    id: 8,
    sectionId: 'deberes_ia',
    sectionName: 'Deberes y Ética IA',
    sectionNumber: 2,
    chapterRomano: 'Capítulo III',
    question: 'En talleres, laboratorios y ambientes especializados de formación, ¿cuál es el deber del aprendiz frente a la seguridad (Art. 13)?',
    options: [
      'Usar los Elementos de Protección Personal (EPP) solo si el instructor está mirando.',
      'Portar obligatoriamente los EPP exigidos y cumplir con los protocolos de Seguridad y Salud en el Trabajo (SST).',
      'Ingresar con ropa informal deportiva a cualquier taller de maquinaria pesada.',
      'Delegar la responsabilidad del uso de EPP a los compañeros de grupo.'
    ],
    correctAnswer: 1,
    articleCitation: 'Acuerdo 009 de 2024, Art. 13 (Cuidado Ambiental, Patrimonial y Bioseguridad)',
    positiveFeedback: {
      title: '¡Primero la Vida y la Seguridad!',
      message: '¡Excelente! El uso de EPP salva vidas y es un deber inexcusable en todos los ambientes formativos del SENA.',
      keyConcept: 'La cultura de la prevención y SST te prepara para los estándares del mundo laboral real.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Seguridad Ocupacional',
      whyItFailed: 'Omitir los EPP pone en peligro tu integridad física y acarrea medidas formativas o disciplinarias de inmediato.',
      correctRule: 'El Art. 13 obliga al uso estricto y permanente de los EPP según el nivel de riesgo del ambiente de aprendizaje.',
      pedagogicalTip: 'Revisa siempre las normas de bioseguridad del taller antes de encender cualquier equipo o maquinaria.'
    }
  },
  {
    id: 9,
    sectionId: 'deberes_ia',
    sectionName: 'Deberes y Ética IA',
    sectionNumber: 2,
    chapterRomano: 'Capítulo III',
    question: '¿Qué deber impone el Artículo 14 frente a la ciberconvivencia y el respeto en plataformas institucionales y redes sociales?',
    options: [
      'El aprendiz puede publicar burlas en redes sobre compañeros porque las redes son privadas.',
      'Mantener un trato respetuoso, empático y libre de discriminación tanto en espacios físicos como digitales.',
      'Los instructores no pueden exigir respeto en los grupos virtuales de WhatsApp o foros.',
      'La convivencia solo aplica dentro de las cuatro paredes del aula de clase.'
    ],
    correctAnswer: 1,
    articleCitation: 'Acuerdo 009 de 2024, Art. 14 (Convivencia Pacífica y Cero Discriminación)',
    positiveFeedback: {
      title: '¡Cultura de Paz y Respeto!',
      message: '¡Muy bien! El respeto mutuo y la convivencia armónica aplican tanto en el aula presencial como en los foros de Zajuna y chats grupales.',
      keyConcept: 'La ciberconvivencia ética es un sello de calidad humana de todo profesional egresado del SENA.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Ciberconvivencia Formal',
      whyItFailed: 'Creer que en medios digitales no rigen las normas de convivencia es una falta grave que puede tipificarse como ciberacoso.',
      correctRule: 'El Art. 14 extiende el deber de respeto a todos los canales digitales de interacción entre la comunidad del SENA.',
      pedagogicalTip: 'Comunícate en foros y chats con cordialidad, profesionalismo y lenguaje respetuoso.'
    }
  },
  {
    id: 10,
    sectionId: 'deberes_ia',
    sectionName: 'Deberes y Ética IA',
    sectionNumber: 2,
    chapterRomano: 'Capítulo III',
    question: 'En relación con la dedicación horaria y el cumplimiento académico (Art. 10), el aprendiz tiene el deber de:',
    options: [
      'Asistir a clases únicamente cuando tenga evaluaciones finales programadas.',
      'Gestionar con puntualidad su formación, asistir a sesiones y entregar evidencias dentro de los plazos concertados.',
      'Exigir que todas las evidencias se puedan entregar con 3 meses de retraso sin justificación.',
      'Conectarse a Zajuna solo el último día del trimestre académico.'
    ],
    correctAnswer: 1,
    articleCitation: 'Acuerdo 009 de 2024, Art. 10 (Compromiso con el Proceso de Aprendizaje)',
    positiveFeedback: {
      title: '¡Disciplina y Puntualidad SENA!',
      message: '¡Correcto! La puntualidad y la constancia diaria son virtudes que distinguen a los mejores aprendices del país.',
      keyConcept: 'El aprendizaje autónomo requiere planeación semanal y entrega responsable de evidencias.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Gestión del Tiempo',
      whyItFailed: 'Dejar las actividades para el final afecta tu curva de aprendizaje y satura tus compromisos formativos.',
      correctRule: 'El Art. 10 establece el deber de asistencia puntual, participación activa y entrega cronológica de evidencias.',
      pedagogicalTip: 'Organiza un calendario de estudio para cumplir con los tiempos concertados en tu guía de aprendizaje.'
    }
  },

  // =========================================================================
  // SECCIÓN 3: PROHIBICIONES Y CLASIFICACIÓN DE FALTAS (5 PREGUNTAS)
  // =========================================================================
  {
    id: 11,
    sectionId: 'prohibiciones_faltas',
    sectionName: 'Prohibiciones y Faltas',
    sectionNumber: 3,
    chapterRomano: 'Capítulo IV',
    question: 'Bajo el Artículo 15, ¿cuál de las siguientes conductas se califica como fraude académico expresamente prohibido?',
    options: [
      'Consultar libros en la biblioteca digital del SENA para sustentar una hipótesis.',
      'Copiar evidencias de otros aprendices, suplantar compañeros o entregar tareas hechas por IA simulando autoría humana.',
      'Trabajar en equipo concertando las conclusiones con el visto bueno del instructor.',
      'Preguntar dudas al instructor durante la sesión de taller.'
    ],
    correctAnswer: 1,
    articleCitation: 'Acuerdo 009 de 2024, Art. 15 (Prohibiciones Académicas: Fraude y Plagio)',
    positiveFeedback: {
      title: '¡Honestidad Intelectual Garantizada!',
      message: '¡Exacto! El plagio y la suplantación atentan contra la confianza formativa y acarrean consecuencias disciplinarias graves.',
      keyConcept: 'Tus aprendizajes reales valen más que una nota ficticia obtenida mediante copia.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Plagio y Suplantación',
      whyItFailed: 'Presentar trabajo ajeno o automatizado como si fuera creación propia es una transgresión directa a la integridad.',
      correctRule: 'El Art. 15 prohíbe de forma taxativa el plagio, la copia entre aprendices y la suplantación de identidad física o digital.',
      pedagogicalTip: 'Siempre cita las fuentes consultadas y redacta tus propias conclusiones con pensamiento crítico.'
    }
  },
  {
    id: 12,
    sectionId: 'prohibiciones_faltas',
    sectionName: 'Prohibiciones y Faltas',
    sectionNumber: 3,
    chapterRomano: 'Capítulo IV',
    question: '¿Cuál es la postura institucional del SENA frente al acoso sexual y las violencias basadas en género (Arts. 16 y 30)?',
    options: [
      'Se considera una falta leve que se soluciona con una amonestación verbal privada.',
      'Tolerancia cero: constituye falta gravísima que activa protocolos de protección inmediata y sanción disciplinaria severa.',
      'Es un asunto privado que no le compete intervenir a la dirección del Centro de Formación.',
      'Solo se investiga si los hechos ocurrieron un fin de semana fuera de la ciudad.'
    ],
    correctAnswer: 1,
    articleCitation: 'Acuerdo 009 de 2024, Arts. 16 y 30 (Prohibición de Violencias Basadas en Género y Faltas Gravísimas)',
    positiveFeedback: {
      title: '¡Espacios Seguros y Cero Tolerancia!',
      message: '¡Excelente! En el SENA las violencias basadas en género son repudiadas enfáticamente y se castigan con la máxima severidad del reglamento.',
      keyConcept: 'El SENA brinda rutas de apoyo y acompañamiento integral a cualquier persona que sufra discriminación o acoso.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Gravedad de las Violencias de Género',
      whyItFailed: 'Minimizar el acoso o considerarlo falta leve es un error grave: el nuevo estatuto es estricto en la protección a las víctimas.',
      correctRule: 'Los Arts. 16 y 30 tipifican el acoso y las violencias de género como faltas gravísimas no tolerables.',
      pedagogicalTip: 'Si eres víctima o testigo de acoso, acude a la Coordinación Académica o al enlace de Género de tu Centro.'
    }
  },
  {
    id: 13,
    sectionId: 'prohibiciones_faltas',
    sectionName: 'Prohibiciones y Faltas',
    sectionNumber: 3,
    chapterRomano: 'Capítulo IV',
    question: 'Respecto al porte de armas y consumo de sustancias psicoactivas o alcohol (Art. 17), la prohibición aplica:',
    options: [
      'Únicamente dentro de las aulas con puertas cerradas.',
      'En todas las instalaciones del SENA, así como en eventos institucionales, giras técnicas, prácticas y salidas de campo.',
      'Solo los días de semana, pero los fines de semana está permitido ingresar alcohol.',
      'Solo para menores de edad; los mayores de edad están exentos de la norma.'
    ],
    correctAnswer: 1,
    articleCitation: 'Acuerdo 009 de 2024, Art. 17 (Armas, Sustancias Psicoactivas y Bebidas Alcohólicas)',
    positiveFeedback: {
      title: '¡Ambiente Sano y Protector!',
      message: '¡Muy bien! Los centros de formación y cualquier actividad vinculada al SENA son zonas 100% libres de armas y sustancias.',
      keyConcept: 'Cuidar el entorno institucional preserva la vida y la seguridad de miles de jóvenes.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Alcance Espacial de la Prohibición',
      whyItFailed: 'Creer que la prohibición no rige en salidas pedagógicas o giras técnicas es un error que causa cancelación de matrícula.',
      correctRule: 'El Art. 17 prohíbe armas, alcohol y drogas en todas las instalaciones y en cualquier escenario de representación del SENA.',
      pedagogicalTip: 'Mantén siempre una conducta ejemplar cuando representes a tu Centro de Formación.'
    }
  },
  {
    id: 14,
    sectionId: 'prohibiciones_faltas',
    sectionName: 'Prohibiciones y Faltas',
    sectionNumber: 3,
    chapterRomano: 'Capítulo IV',
    question: '¿Cómo clasifica el nuevo reglamento el sabotaje informático, alteración de plataformas o ataques digitales institucionales (Art. 18)?',
    options: [
      'Como una falta disciplinaria gravísima que vulnera la seguridad tecnológica y bienes públicos.',
      'Como un juego tecnológico sin importancia sancionatoria.',
      'Como una falta leve que se subsana reiniciando el computador.',
      'Como una prueba válida de habilidades de hacking ético no autorizada.'
    ],
    correctAnswer: 0,
    articleCitation: 'Acuerdo 009 de 2024, Art. 18 (Sabotaje Tecnológico y Alteración del Orden)',
    positiveFeedback: {
      title: '¡Seguridad de la Información Protegida!',
      message: '¡Exacto! La infraestructura tecnológica institucional del SENA es un bien público vital que debe protegerse rigurosamente.',
      keyConcept: 'Vulnerar o alterar bases de datos institucionales acarrea sanciones disciplinarias y acciones legales.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Seguridad Digital Institucional',
      whyItFailed: 'Manipular sin autorización servidores, bases de datos o la plataforma Zajuna no es una travesura, es un delito informático.',
      correctRule: 'El Art. 18 califica el sabotaje y la alteración tecnológica como conductas gravísimas sancionables.',
      pedagogicalTip: 'Utiliza tus habilidades digitales para innovar y crear soluciones, nunca para vulnerar sistemas.'
    }
  },
  {
    id: 15,
    sectionId: 'prohibiciones_faltas',
    sectionName: 'Prohibiciones y Faltas',
    sectionNumber: 3,
    chapterRomano: 'Capítulo VII',
    question: 'Según los criterios de graduación de faltas (Art. 28 y 29), ¿qué elementos se valoran para calificar una falta en Leve, Grave o Gravísima?',
    options: [
      'Únicamente el estado de ánimo del instructor al momento del hecho.',
      'El perjuicio causado, grado de culpabilidad (dolo o culpa), antecedentes formativos y la voluntad de reparar el daño.',
      'La edad que tenga el aprendiz y su lugar de nacimiento.',
      'Si el aprendiz tiene conocidos en la administración del centro.'
    ],
    correctAnswer: 1,
    articleCitation: 'Acuerdo 009 de 2024, Arts. 28 y 29 (Definición y Criterios de Calificación de Faltas)',
    positiveFeedback: {
      title: '¡Criterio Jurídico y Proporcionalidad!',
      message: '¡Excelente! El Acuerdo 009 establece reglas de proporcionalidad objetiva para no sancionar arbitrariamente.',
      keyConcept: 'La disposición sincera a reconocer el error y reparar el daño influye favorablemente en la valoración formativa.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Calificación Objetiva de Faltas',
      whyItFailed: 'La calificación nunca depende de la subjetividad o el estado de ánimo, sino de criterios legales objetivos y comprobados.',
      correctRule: 'El Art. 29 exige ponderar la naturaleza de los hechos, el perjuicio ocasionado y la conducta previa del aprendiz.',
      pedagogicalTip: 'Si alguna vez cometes un error involuntario, asume tu responsabilidad tempranamente y propón acciones restaurativas.'
    }
  },

  // =========================================================================
  // SECCIÓN 4: NOVEDADES ACADÉMICAS Y ETAPA PRODUCTIVA (5 PREGUNTAS)
  // =========================================================================
  {
    id: 16,
    sectionId: 'novedades_productiva',
    sectionName: 'Novedades y Práctica',
    sectionNumber: 4,
    chapterRomano: 'Capítulo V',
    question: 'Bajo el trámite garantista del Acuerdo 009 (Art. 23), ¿cuántos días hábiles de inasistencia consecutiva injustificada inician el trámite de deserción?',
    options: [
      'Un solo día de inasistencia.',
      'Tres (3) días hábiles consecutivos.',
      'Quince (15) días calendario.',
      'Dos meses seguidos.'
    ],
    correctAnswer: 1,
    articleCitation: 'Acuerdo 009 de 2024, Art. 23 (Deserción Garantista y Debido Proceso)',
    positiveFeedback: {
      title: '¡Plazo Garantista Dominado!',
      message: '¡Así es! Tres (3) días hábiles consecutivos sin soporte activan el llamado preventivo, asegurando el debido proceso.',
      keyConcept: 'El SENA no cancela matrículas a ciegas: te contacta para indagar la causa de tu ausencia.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Plazos de Deserción',
      whyItFailed: 'Confundir el plazo con 1 día o 15 días desconoce el estándar procesal garantista establecido en 2024.',
      correctRule: 'El Art. 23 estipula 3 días hábiles consecutivos de inasistencia injustificada para iniciar el requerimiento oficial.',
      pedagogicalTip: 'Si te enfermas o sufres una calamidad, avisa a tu vocero e instructor en las primeras 24 horas aportando constancia.'
    }
  },
  {
    id: 17,
    sectionId: 'novedades_productiva',
    sectionName: 'Novedades y Práctica',
    sectionNumber: 4,
    chapterRomano: 'Capítulo V',
    question: 'Cuando la Coordinación Académica requiere al aprendiz por presunta deserción, ¿qué plazo tiene para presentar descargos o justificación médica?',
    options: [
      'Debe responder en 30 minutos o queda expulsado.',
      'Tres (3) días hábiles siguientes a la notificación formal para aportar soportes o justificación de fuerza mayor.',
      'No tiene ningún plazo; la cancelación se aplica de forma automática.',
      'Un año escolar completo.'
    ],
    correctAnswer: 1,
    articleCitation: 'Acuerdo 009 de 2024, Art. 23 (Término para Justificar Inasistencia)',
    positiveFeedback: {
      title: '¡Garantía de Descargos Protegida!',
      message: '¡Excelente! Dispones de 3 días hábiles tras la notificación para justificar formalmente tu inasistencia y salvar tu matrícula.',
      keyConcept: 'El debido proceso te brinda el espacio legítimo para explicar motivos médicos o familiares de fuerza mayor.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Procedimiento Garantista',
      whyItFailed: 'Las cancelaciones automáticas fueron prohibidas; siempre existe un término legal para aportar soportes.',
      correctRule: 'El Art. 23 otorga 3 días hábiles para allegar incapacidades médicas o justificaciones antes de cualquier decisión.',
      pedagogicalTip: 'Revisa a diario tu correo institucional registrado en Sofia Plus / Zajuna para no perder notificaciones.'
    }
  },
  {
    id: 18,
    sectionId: 'novedades_productiva',
    sectionName: 'Novedades y Práctica',
    sectionNumber: 4,
    chapterRomano: 'Capítulo V',
    question: 'Por motivos laborales justificados, servicio militar o salud, ¿por cuánto tiempo máximo puede un aprendiz aplazar su formación (Art. 20)?',
    options: [
      'Hasta por dos semanas únicamente.',
      'Hasta por seis (6) meses, prorrogables motivadamente por igual término (máximo 1 año en total).',
      'Por cinco años indefinidos sin necesidad de justificar.',
      'No existe la figura de aplazamiento en el SENA.'
    ],
    correctAnswer: 1,
    articleCitation: 'Acuerdo 009 de 2024, Art. 20 (Aplazamiento de la Formación)',
    positiveFeedback: {
      title: '¡Flexibilidad Formativa Clarificada!',
      message: '¡Correcto! Puedes solicitar aplazamiento formal hasta por 6 meses con opción de prórroga, protegiendo tus competencias aprobadas.',
      keyConcept: 'El aplazamiento formal evita la deserción y te permite retomar cuando se resuelva tu situación.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Tiempos de Aplazamiento',
      whyItFailed: 'El aplazamiento tiene límites estrictos para evitar desactualizaciones en el diseño curricular del programa.',
      correctRule: 'El Art. 20 fija el término de aplazamiento en hasta 6 meses renovables por 6 meses más con justa causa.',
      pedagogicalTip: 'Radica la solicitud de aplazamiento antes de ausentarte para no acumular inasistencias injustificadas.'
    }
  },
  {
    id: 19,
    sectionId: 'novedades_productiva',
    sectionName: 'Novedades y Práctica',
    sectionNumber: 4,
    chapterRomano: 'Capítulo VI',
    question: 'Tras finalizar con éxito la etapa lectiva, ¿de cuánto plazo continuo dispone el aprendiz para legalizar e iniciar su Etapa Productiva (Art. 25)?',
    options: [
      'Solo 15 días calendario.',
      'Hasta dos (2) años continuos posteriores a la culminación de la etapa lectiva.',
      'Diez años sin límite de tiempo.',
      'Debe iniciar al día siguiente exactamente sin excepción.'
    ],
    correctAnswer: 1,
    articleCitation: 'Acuerdo 009 de 2024, Art. 25 (Plazo para Inicio y Registro de Etapa Productiva)',
    positiveFeedback: {
      title: '¡Plazo Legal de Práctica Aprendido!',
      message: '¡Muy bien! Dispones de hasta dos (2) años para formalizar tu etapa productiva antes de que opere la cancelación del registro.',
      keyConcept: 'El SENA te acompaña con la Agencia Pública de Empleo (APE) y Caprendizaje para ubicar tu práctica.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Plazo Límite de Etapa Productiva',
      whyItFailed: 'Dejar pasar más de 2 años sin registrar alternativa acarrea la pérdida de todo el proceso formativo.',
      correctRule: 'El Art. 25 estipula un plazo máximo perentorio de 2 años continuos para iniciar la etapa productiva.',
      pedagogicalTip: 'No esperes al último momento: postúlate a contratos de aprendizaje y proyectos productivos desde la etapa lectiva.'
    }
  },
  {
    id: 20,
    sectionId: 'novedades_productiva',
    sectionName: 'Novedades y Práctica',
    sectionNumber: 4,
    chapterRomano: 'Capítulo VI',
    question: 'Durante el desarrollo de la etapa productiva, ¿con qué periodicidad obligatoria debe el aprendiz remitir sus bitácoras de avance (Art. 26)?',
    options: [
      'Una sola bitácora al finalizar todo el año de práctica.',
      'Cada quince (15) días calendario (bitácoras quincenales concertadas con el instructor).',
      'Diariamente cada dos horas.',
      'No se requieren bitácoras si la empresa paga el salario.'
    ],
    correctAnswer: 1,
    articleCitation: 'Acuerdo 009 de 2024, Art. 26 (Bitácoras Quincenales y Seguimiento a la Etapa Productiva)',
    positiveFeedback: {
      title: '¡Seguimiento Formativo Exitoso!',
      message: '¡Exacto! Las bitácoras quincenales son el puente entre tu jefe coformador, tu instructor de seguimiento y tu proceso de certificación.',
      keyConcept: 'Las bitácoras documentan el cumplimiento real de los Resultados de Aprendizaje en el entorno laboral.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Periodicidad de Bitácoras',
      whyItFailed: 'Omitir las bitácoras quincenales retrasa tu juicio evaluativo y puede comprometer la aprobación de tu práctica.',
      correctRule: 'El Art. 26 exige la entrega quincenal de bitácoras avaladas por la empresa coformadora y revisadas por el instructor.',
      pedagogicalTip: 'Lleva un registro ordenado de tus funciones semanales para diligenciar tu bitácora puntualmente cada 15 días.'
    }
  },

  // =========================================================================
  // SECCIÓN 5: MEDIDAS FORMATIVAS, SANCIONES Y DEBIDO PROCESO (5 PREGUNTAS)
  // =========================================================================
  {
    id: 21,
    sectionId: 'procedimiento_debido_proceso',
    sectionName: 'Debido Proceso y Sanciones',
    sectionNumber: 5,
    chapterRomano: 'Capítulo VIII',
    question: '¿Cuál es la primera medida formativa y pedagógica que contempla el reglamento ante deficiencias académicas o conductuales leves?',
    options: [
      'Expulsión inmediata del Centro de Formación.',
      'Llamado de atención verbal y formulación concertada de un Plan de Mejoramiento Pedagógico.',
      'Demanda penal ante la Fiscalía General de la Nación.',
      'Cobro de una multa económica obligatoria.'
    ],
    correctAnswer: 1,
    articleCitation: 'Acuerdo 009 de 2024, Art. 31 (Medidas Formativas Preventivas y Pedagógicas)',
    positiveFeedback: {
      title: '¡Enfoque Formativo Primero!',
      message: '¡Brillante! El SENA es una entidad educativa: ante fallas iniciales, prioriza el diálogo reflexivo y el mejoramiento antes que el castigo.',
      keyConcept: 'El Plan de Mejoramiento te orienta con actividades concretas para nivelar tus competencias.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Carácter Pedagógico del SENA',
      whyItFailed: 'El SENA no impone multas en dinero ni sanciones desmedidas por faltas leves iniciales.',
      correctRule: 'El Art. 31 privilegia el llamado de atención verbal y la concertación de un plan de mejoramiento guiado.',
      pedagogicalTip: 'Aprovecha el plan de mejoramiento como una oportunidad para reforzar tus destrezas y asegurar tu aprobación.'
    }
  },
  {
    id: 22,
    sectionId: 'procedimiento_debido_proceso',
    sectionName: 'Debido Proceso y Sanciones',
    sectionNumber: 5,
    chapterRomano: 'Capítulo VIII',
    question: '¿Qué gran innovación filosófica del 2024 introduce el Artículo 35 al permitir que el aprendiz repare el daño causado a la comunidad?',
    options: [
      'El modelo de Justicia Retributiva punitiva tradicional.',
      'El Enfoque de Justicia y Pedagogía Restaurativa (disculpas, servicio pedagógico comunitario y reparación concertada).',
      'La obligatoriedad de contratar un abogado particular costoso.',
      'La exoneración absoluta sin asumir ninguna responsabilidad.'
    ],
    correctAnswer: 1,
    articleCitation: 'Acuerdo 009 de 2024, Art. 35 (Enfoque y Acciones Pedagógicas Restaurativas)',
    positiveFeedback: {
      title: '¡Justicia Restaurativa Comprendida!',
      message: '¡Excelente! Esta es una de las mayores transformaciones del Acuerdo 009: reparar el tejido social y restaurar la convivencia.',
      keyConcept: 'Reconocer el error y reparar el impacto comunitario dignifica tanto a quien se equivocó como a la comunidad.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Paradigma Punitivo vs. Restaurativo',
      whyItFailed: 'El Acuerdo 009 superó el enfoque netamente sancionatorio para instaurar la justicia restaurativa solidaria.',
      correctRule: 'El Art. 35 permite concertar acciones restaurativas que reparen el daño y moderen la severidad de una sanción.',
      pedagogicalTip: 'La madurez para pedir disculpas sinceras y colaborar con el Centro es un valor formativo fundamental.'
    }
  },
  {
    id: 23,
    sectionId: 'procedimiento_debido_proceso',
    sectionName: 'Debido Proceso y Sanciones',
    sectionNumber: 5,
    chapterRomano: 'Capítulo IX',
    question: 'En el procedimiento sancionatorio, ¿quién es la única autoridad competente para expedir la resolución de sanción final?',
    options: [
      'El celador o guarda de seguridad del Centro.',
      'El Subdirector del Centro de Formación Profesional mediante acto administrativo motivado.',
      'El representante estudiantil de la ficha.',
      'Cualquier compañero de clase mediante votación informal.'
    ],
    correctAnswer: 1,
    articleCitation: 'Acuerdo 009 de 2024, Art. 33 y 38 (Acto Administrativo Motivado del Subdirector)',
    positiveFeedback: {
      title: '¡Competencia Legal Claramente Identificada!',
      message: '¡Correcto! El Comité solo recomienda; únicamente el Subdirector de Centro tiene la investidura jurídica para emitir una resolución sancionatoria.',
      keyConcept: 'Esta reserva legal garantiza que las decisiones sean examinadas rigurosamente por la máxima autoridad del Centro.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Autoridad Competente',
      whyItFailed: 'Ni los instructores ni los comités pueden imponer sanciones directas por su cuenta; solo emiten recomendaciones.',
      correctRule: 'El Art. 38 radica la competencia sancionatoria exclusivamente en cabeza del Subdirector de Centro.',
      pedagogicalTip: 'Toda sanción debe llegar mediante resolución oficial motivada, nunca a través de avisos informales.'
    }
  },
  {
    id: 24,
    sectionId: 'procedimiento_debido_proceso',
    sectionName: 'Debido Proceso y Sanciones',
    sectionNumber: 5,
    chapterRomano: 'Capítulo IX',
    question: 'Si a un aprendiz se le notifica una resolución sancionatoria con la que no está de acuerdo, ¿qué plazo tiene para interponer Recurso de Reposición (Art. 39)?',
    options: [
      '24 horas exactas o pierde el derecho.',
      'Cinco (5) días hábiles siguientes a la notificación oficial del acto administrativo.',
      'Dos meses calendario.',
      'No tiene derecho a presentar ningún recurso legal.'
    ],
    correctAnswer: 1,
    articleCitation: 'Acuerdo 009 de 2024, Art. 39 (Recurso de Reposición en Cinco Días Hábiles)',
    positiveFeedback: {
      title: '¡Término Procesal Dominado!',
      message: '¡Así es! Tienes cinco (5) días hábiles para radicar tu recurso de reposición con las pruebas o argumentos de defensa que consideres.',
      keyConcept: 'El recurso de reposición suspende la ejecución de la sanción hasta que sea resuelto en derecho.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Plazo del Recurso de Reposición',
      whyItFailed: 'Confundir el plazo legal puede hacer que tu recurso sea declarado extemporáneo.',
      correctRule: 'El Art. 39 otorga un término perentorio de 5 días hábiles contados a partir del día siguiente a la notificación.',
      pedagogicalTip: 'Redacta tu recurso con claridad, fundamentando tus argumentos en los artículos del Acuerdo 009 de 2024.'
    }
  },
  {
    id: 25,
    sectionId: 'procedimiento_debido_proceso',
    sectionName: 'Debido Proceso y Sanciones',
    sectionNumber: 5,
    chapterRomano: 'Capítulo X',
    question: 'Respecto a la representación democrática estudiantil, ¿cuándo y cómo se eligen los Voceros de Ficha (Art. 40)?',
    options: [
      'Los nombra a dedo el Subdirector sin consultar al grupo.',
      'Son elegidos democráticamente por sus propios compañeros durante el primer mes de formación mediante votación.',
      'Se rifan por sorteo entre quienes lleguen temprano el primer día.',
      'Solo pueden ser voceros quienes tengan matrícula de honor previa.'
    ],
    correctAnswer: 1,
    articleCitation: 'Acuerdo 009 de 2024, Art. 40 (Voceros de Ficha y Representación)',
    positiveFeedback: {
      title: '¡Democracia Estudiantil SENA!',
      message: '¡Excelente! Cada grupo elige democráticamente a sus voceros durante el primer mes para liderar y canalizar iniciativas ante la institución.',
      keyConcept: 'El liderazgo de los voceros fortalece la cohesión formativa y promueve el trabajo solidario.'
    },
    errorFeedback: {
      title: 'Identifica el Error: Elección Democrática',
      whyItFailed: 'La vocería nunca se asigna a dedo ni por rifa; es un ejercicio de elección democrática participativa de los aprendices.',
      correctRule: 'El Art. 40 establece la elección por votación de los integrantes de la ficha durante el primer mes lectivo.',
      pedagogicalTip: 'Participa activamente en la elección de voceros o postúlate para liderar a tu equipo con integridad.'
    }
  }
];
