import { 
  ReglamentoCapitulo, 
  ReglamentoPagina, 
  ReglamentoJSONStructure 
} from '../types/induction';

export const REGLAMENTO_METADATA = {
  documento: 'Acuerdo 009 de 2024 - Reglamento del Aprendiz SENA',
  tituloOficial: 'Por el cual se expide el nuevo Reglamento del Aprendiz del Servicio Nacional de Aprendizaje SENA',
  organoEmisor: 'Consejo Directivo Nacional del SENA',
  fechaExpedicion: '2024',
  publicacionOficial: 'Diario Oficial No. 52.947',
  totalPaginas: 48,
  normasDerogadas: [
    'Acuerdo 007 de 2012 (antiguo Reglamento del Aprendiz)',
    'Acuerdo 002 de 2014 (modificación parcial)',
    'Acuerdo 006 de 2023 (modificación transitoria)',
    'Acuerdo 002 de 2024 (disposiciones previas)'
  ],
  enfoquesTransversales: [
    'Enfoque de Derechos Humanos y Dignidad',
    'Enfoque Diferencial e Inclusión Social',
    'Justicia y Pedagogía Restaurativa',
    'Ética Digital y Uso Responsable de Inteligencia Artificial (IA)',
    'Prevención Integral de Violencias Basadas en Género (VBG)',
    'Salud Mental y Convivencia Formativa'
  ]
};

export const REGLAMENTO_CAPITULOS: ReglamentoCapitulo[] = [
  {
    numero: 1,
    romano: 'Capítulo I',
    titulo: 'Disposiciones Generales, Principios y Definiciones',
    descripcion: 'Establece el objeto del reglamento, el campo de aplicación en todas las sedes y modalidades del SENA, los principios rectores y la definición de aprendiz.',
    paginas: [1, 2, 3, 4, 5],
    articulos: [
      {
        numero: 1,
        titulo: 'Objeto y Campo de Aplicación',
        pagina: 2,
        categoria: 'Principios',
        resumen: 'Regula los derechos, deberes, prohibiciones, faltas, medidas formativas y el debido proceso para todas las personas matriculadas en el SENA en cualquier modalidad (presencial, virtual o a distancia).',
        contenidoCompleto: 'El presente Acuerdo tiene por objeto regular los derechos, deberes, prohibiciones, faltas y medidas formativas aplicables a los aprendices del Servicio Nacional de Aprendizaje SENA en todos los niveles, programas y modalidades de formación profesional integral.',
        clave2024: 'Aplica universalmente a modalidades presenciales, virtuales, duales y a distancia en todo el territorio nacional.'
      },
      {
        numero: 2,
        titulo: 'Concepto de Aprendiz SENA',
        pagina: 3,
        categoria: 'Principios',
        resumen: 'El aprendiz es el protagonista de su propio aprendizaje, sujeto activo de derechos y deberes, orientado al desarrollo de competencias técnicas, sociales y humanas.',
        contenidoCompleto: 'Se considera aprendiz a toda persona natural matriculada en los programas de formación laboral o tecnológica del SENA, comprometida con su proyecto de vida, la apropiación del conocimiento y la transformación social de Colombia.',
        clave2024: 'Reconoce al aprendiz como agente de cambio social, innovación tecnológica y sostenibilidad.'
      },
      {
        numero: 3,
        titulo: 'Principios Rectores del Aprendizaje',
        pagina: 4,
        categoria: 'Principios',
        resumen: 'Dignidad humana, libertad de pensamiento, equidad, no discriminación, transparencia, debido proceso, rigor pedagógico y sostenibilidad ambiental.',
        contenidoCompleto: 'La formación en el SENA se fundamenta en el respeto a la dignidad humana, la universalidad, la solidaridad, el diálogo constructivo y el libre desarrollo de la personalidad con responsabilidad social.',
        clave2024: 'Incorpora el principio de sostenibilidad ecológica y el respeto irrestricto a la diversidad étnica y de género.'
      },
      {
        numero: 4,
        titulo: 'Ambientes de Aprendizaje Físicos y Digitales',
        pagina: 5,
        categoria: 'Principios',
        resumen: 'Se definen como ambientes de aprendizaje los talleres, aulas, laboratorios, TecnoParques, entornos virtuales (Zajuna LMS) y espacios productivos donde interactúan instructores y aprendices.',
        contenidoCompleto: 'Son escenarios pedagógicos donde se articula la teoría y la práctica. Los entornos digitales y plataformas virtuales gozan de la misma validez formativa y normativa que las instalaciones físicas.',
        clave2024: 'Equiparación normativa total entre ambientes físicos de formación y plataformas digitales institucionales.'
      }
    ]
  },
  {
    numero: 2,
    romano: 'Capítulo II',
    titulo: 'Derechos del Aprendiz SENA',
    descripcion: 'Catálogo de derechos fundamentales, académicos, de bienestar, representación democrática, acceso tecnológico y protección integral.',
    paginas: [6, 7, 8, 9, 10],
    articulos: [
      {
        numero: 5,
        titulo: 'Derecho a la Formación Integral de Calidad',
        pagina: 6,
        categoria: 'Derechos',
        resumen: 'Recibir una formación profesional integral con instructores calificados, materiales adecuados, infraestructura segura y metodologías activas.',
        contenidoCompleto: 'El aprendiz tiene derecho a acceder a programas formativos pertinentes, actualizados tecnológicamente y orientados por instructores idóneos, con retroalimentación oportuna en sus procesos evaluativos.',
        clave2024: 'Garantía explícita de retroalimentación pedagógica motivada y dentro de los plazos concertados.'
      },
      {
        numero: 6,
        titulo: 'Acceso a Tecnologías y Conectividad',
        pagina: 7,
        categoria: 'Derechos',
        resumen: 'Disponer de conectividad en centros, acceso a la plataforma LMS Zajuna, bases de datos digitales, software educativo y bibliotecas institucionales.',
        contenidoCompleto: 'Acceder a las herramientas tecnológicas, licencias educativas, laboratorios de cómputo y plataformas digitales que el SENA dispone para el desarrollo del plan curricular.',
        clave2024: 'Reconocimiento del acceso digital como habilitador fundamental del derecho a la educación técnica.'
      },
      {
        numero: 7,
        titulo: 'Debido Proceso y Defensa Técnica',
        pagina: 8,
        categoria: 'Derechos',
        resumen: 'Presunción de inocencia, derecho a ser notificado, ser escuchado en descargos, controvertir pruebas y presentar recursos de ley.',
        contenidoCompleto: 'En todo procedimiento formativo o sancionatorio se garantizará el debido proceso consagrado en el artículo 29 de la Constitución Política, asegurando la contradicción y la doble instancia administrativa.',
        clave2024: 'Claridad en términos probatorios y garantía plena del derecho a la defensa.'
      },
      {
        numero: 8,
        titulo: 'Cuidado de la Salud Mental y Bienestar Integral',
        pagina: 9,
        categoria: 'Derechos',
        resumen: 'Acceso a los programas de bienestar al aprendiz: apoyo psicosocial, actividades deportivas, culturales, salud preventiva y estímulos.',
        contenidoCompleto: 'Gozar de los beneficios del Plan Nacional de Bienestar al Aprendiz, incluyendo acompañamiento en salud emocional, apoyo socioeconómico y participación recreativa sin discriminación.',
        clave2024: 'Consagración pionera de la salud mental y la estabilidad socioemocional como derecho formativo fundamental.'
      },
      {
        numero: 9,
        titulo: 'Libertad de Expresión y Representación Democrática',
        pagina: 10,
        categoria: 'Derechos',
        resumen: 'Elegir y ser elegido como vocero de ficha, representante de Centro de Formación y participar en comités consultivos.',
        contenidoCompleto: 'Expresar libremente sus opiniones con respeto por la comunidad, así como postularse y participar en los mecanismos de elección democrática estudiantil del SENA.',
        clave2024: 'Garantías institucionales para la libre vocería y protección contra represalias por opiniones constructivas.'
      }
    ]
  },
  {
    numero: 3,
    romano: 'Capítulo III',
    titulo: 'Deberes del Aprendiz SENA',
    descripcion: 'Obligaciones académicas, cívicas, de convivencia, seguridad ocupacional y uso ético y transparente de las tecnologías e Inteligencia Artificial.',
    paginas: [11, 12, 13, 14, 15],
    articulos: [
      {
        numero: 10,
        titulo: 'Compromiso con el Proceso de Aprendizaje',
        pagina: 11,
        categoria: 'Deberes',
        resumen: 'Asistir con puntualidad, participar activamente en sesiones presenciales o virtuales, desarrollar las guías y entregar evidencias a tiempo.',
        contenidoCompleto: 'Cumplir con las actividades curriculares programadas, mantener una comunicación asertiva con instructores y compañeros y gestionar su aprendizaje autónomo con dedicación.',
        clave2024: 'Exige ingreso y participación continua en plataformas LMS concertadas (Zajuna).'
      },
      {
        numero: 11,
        titulo: 'Uso Ético de Tecnologías e Inteligencia Artificial',
        pagina: 12,
        categoria: 'Deberes',
        resumen: 'Garantizar la autoría propia de las evidencias formativas. Citar y declarar con total transparencia cualquier apoyo recibido por herramientas de IA.',
        contenidoCompleto: 'El aprendiz debe ejercer un uso honesto y responsable de las tecnologías digitales, bases de datos y sistemas de inteligencia artificial generativa. Toda utilización de modelos de IA en proyectos debe ser declarada explícitamente, preservando la autenticidad del pensamiento crítico y las competencias individuales.',
        clave2024: 'Artículo emblemático del Acuerdo 009 de 2024 que regula el uso pedagógico y ético de la Inteligencia Artificial.'
      },
      {
        numero: 12,
        titulo: 'Porte Obligatorio del Carné Institucional (Físico o Digital)',
        pagina: 13,
        categoria: 'Deberes',
        resumen: 'Portar el carné en lugar visible o presentar la credencial digital oficial al ingresar y permanecer en las instalaciones del SENA.',
        contenidoCompleto: 'Portar el carné oficial que lo acredita como aprendiz activo durante su permanencia en el Centro de Formación, eventos institucionales y visitas empresariales, presentándolo ante el personal de seguridad y funcionarios.',
        clave2024: 'Validez formal idéntica entre el carné físico plástico y el carné digital institucional emitido por el sistema SENA.'
      },
      {
        numero: 13,
        titulo: 'Cuidado Ambiental, Patrimonial y Bioseguridad',
        pagina: 14,
        categoria: 'Deberes',
        resumen: 'Preservar las máquinas, herramientas, instalaciones y recursos naturales. Utilizar de forma obligatoria los Elementos de Protección Personal (EPP).',
        contenidoCompleto: 'Hacer uso racional de los bienes, equipos y suministros puestos a su disposición; respetar las directrices de Seguridad y Salud en el Trabajo (SST) y participar en la gestión ambiental de residuos.',
        clave2024: 'Obligatoriedad de protocolos SST específicos según el nivel de riesgo de cada taller o laboratorio.'
      },
      {
        numero: 14,
        titulo: 'Convivencia Pacífica y Cero Discriminación',
        pagina: 15,
        categoria: 'Deberes',
        resumen: 'Tratar con dignidad, empatía y respeto a toda la comunidad institucional; abstenerse de cualquier manifestación de intolerancia o violencia.',
        contenidoCompleto: 'Propiciar un clima de respeto y tolerancia hacia instructores, personal administrativo, compañeros y visitantes, rechazando todo acto de discriminación por razones de raza, credo, orientación sexual o condición socioeconómica.',
        clave2024: 'Cultura de paz y prevención activa de hostigamiento presencial o en redes sociales (ciberconvivencia).'
      }
    ]
  },
  {
    numero: 4,
    romano: 'Capítulo IV',
    titulo: 'Prohibiciones del Aprendiz SENA',
    descripcion: 'Conductas taxativamente prohibidas en el ámbito académico, disciplinario, digital e institucional.',
    paginas: [16, 17, 18, 19, 20],
    articulos: [
      {
        numero: 15,
        titulo: 'Prohibiciones Académicas: Fraude, Plagio y Suplantación',
        pagina: 16,
        categoria: 'Prohibiciones',
        resumen: 'Copiar evidencias ajenas, cometer plagio, generar respuestas automatizadas por IA simulando autoría humana o permitir ser suplantado.',
        contenidoCompleto: 'Queda terminantemente prohibido plagiar documentos, presentar evidencias de otros aprendices, suplantar la identidad de compañeros en evaluaciones o recurrir a inteligencia artificial para generar tareas sin autorización ni atribución metodológica.',
        clave2024: 'Tipificación expresa del plagio digital y la simulación académica mediante IA generativa.'
      },
      {
        numero: 16,
        titulo: 'Prohibición de Violencias Basadas en Género y Acoso',
        pagina: 17,
        categoria: 'Prohibiciones',
        resumen: 'Incurrir en acoso sexual, ciberacoso, intimidación, hostigamiento, lenguaje discriminatorio o violencia de género en cualquier espacio.',
        contenidoCompleto: 'Se prohíbe realizar actos de acoso sexual, verbal, físico o digital contra cualquier miembro de la comunidad SENA, así como ejercer actos de discriminación o agresiones fundadas en el género o la orientación sexual.',
        clave2024: 'Tolerancia cero: activa inmediatamente el protocolo de protección integral a la víctima y calificación como falta gravísima.'
      },
      {
        numero: 17,
        titulo: 'Armas, Sustancias Psicoactivas y Bebidas Alcohólicas',
        pagina: 18,
        categoria: 'Prohibiciones',
        resumen: 'Ingresar, consumir o comercializar licor, estupefacientes o portar armas u objetos cortopunzantes en las sedes institucionales.',
        contenidoCompleto: 'Ingresar al Centro de Formación bajo el efecto de sustancias psicoactivas o alcohol, portar armas de fuego o blancas, o comerciar sustancias prohibidas dentro de los predios del SENA.',
        clave2024: 'Aplica igualmente en eventos deportivos, salidas de campo y giras técnicas del SENA.'
      },
      {
        numero: 18,
        titulo: 'Alteración del Orden y Sabotaje Tecnológico',
        pagina: 19,
        categoria: 'Prohibiciones',
        resumen: 'Obstaculizar el desarrollo normal de clases, dañar software institucional, alterar plataformas o suplantar accesos digitales.',
        contenidoCompleto: 'Impedir el acceso a ambientes de aprendizaje, intervenir sin autorización redes o servidores institucionales, o destruir bienes públicos.',
        clave2024: 'Sanciona severamente el ciberataque o sabotaje contra la infraestructura de Zajuna, Sofia Plus o redes SENA.'
      }
    ]
  },
  {
    numero: 5,
    romano: 'Capítulo V',
    titulo: 'Trámites de Novedades Académicas y Administrativas',
    descripcion: 'Procedimientos y plazos para traslados, aplazamientos, reingresos, retiro voluntario y el debido proceso en caso de deserción.',
    paginas: [21, 22, 23, 24, 25],
    articulos: [
      {
        numero: 19,
        titulo: 'Traslado de Centro, Jornada o Programa',
        pagina: 21,
        categoria: 'Novedades',
        resumen: 'Solicitud motivada a través de la plataforma institucional sujeta a existencia de cupo y compatibilidad de diseño curricular.',
        contenidoCompleto: 'El aprendiz podrá solicitar traslado cuando medien razones justificadas de cambio de domicilio o fuerza mayor, siempre que el programa se encuentre activo y exista disponibilidad de cupo en el Centro receptor.',
        clave2024: 'Trámite 100% digitalizado con respuesta motivada del Subdirector de Centro.'
      },
      {
        numero: 20,
        titulo: 'Aplazamiento de la Formación',
        pagina: 22,
        categoria: 'Novedades',
        resumen: 'Suspensión temporal justificada de la matrícula hasta por seis (6) meses prorrogables por igual término por motivos de salud, laborales o servicio militar.',
        contenidoCompleto: 'El aprendiz podrá solicitar el aplazamiento de su proceso formativo por causas debidamente fundamentadas. El término máximo será de seis meses, con posibilidad de prórroga motivada por un término igual.',
        clave2024: 'Claridad en términos de prórroga y conservación de competencias aprobadas en el sistema.'
      },
      {
        numero: 21,
        titulo: 'Reingreso Formal a la Formación',
        pagina: 23,
        categoria: 'Novedades',
        resumen: 'Solicitud formal antes del vencimiento del término de aplazamiento para incorporarse a una ficha vigente del mismo programa.',
        contenidoCompleto: 'El aprendiz que haya obtenido aplazamiento deberá solicitar su reingreso con al menos un mes de anticipación al vencimiento del periodo autorizado, sujeto a la oferta activa del programa.',
        clave2024: 'Mecanismo ágil de homologación en caso de actualización del diseño curricular.'
      },
      {
        numero: 22,
        titulo: 'Retiro Voluntario y Cancelación Solicitada',
        pagina: 24,
        categoria: 'Novedades',
        resumen: 'Manifestación expresa, libre e informada del aprendiz de desvincularse del programa; no acarrea sanción disciplinaria.',
        contenidoCompleto: 'El aprendiz puede solicitar su retiro voluntario formalmente. No generará sanción disciplinaria, permitiendo su postulación futura con arreglo a las directrices de admisión vigentes.',
        clave2024: 'Distingue con claridad el retiro voluntario informado de la deserción sancionable.'
      },
      {
        numero: 23,
        titulo: 'Deserción Garantista: 3 Días Hábiles y Debido Proceso',
        pagina: 25,
        categoria: 'Novedades',
        resumen: 'Se configura tras tres (3) días hábiles consecutivos de inasistencia no justificada. El Centro debe requerir formalmente al aprendiz antes de declarar la deserción.',
        contenidoCompleto: 'La deserción se configura cuando el aprendiz injustificadamente no asiste durante tres (3) días hábiles consecutivos, o no reporta avances en 15 días en modalidad virtual. El Coordinador Académico debe notificar al aprendiz requiriéndolo para que justifique su ausencia dentro de los tres (3) días hábiles siguientes; si no comparece o la justificación no es procedente, se expide acto motivado de cancelación de matrícula.',
        clave2024: 'Elimina cancelaciones automáticas arbitrarias: exige requerimiento formal previo y término perentorio para justificación médica o de fuerza mayor.'
      }
    ]
  },
  {
    numero: 6,
    romano: 'Capítulo VI',
    titulo: 'Etapa Productiva: Alternativas, Registro y Evaluación',
    descripcion: 'Régimen de la etapa práctica, modalidades autorizadas, plazos de concertación, bitácoras periódicas y evaluación de resultados.',
    paginas: [26, 27, 28, 29, 30],
    articulos: [
      {
        numero: 24,
        titulo: 'Naturaleza y Modalidades de la Etapa Productiva',
        pagina: 26,
        categoria: 'Etapa Productiva',
        resumen: 'Espacio de aplicación directa de competencias. Alternativas: Contrato de Aprendizaje, Vínculo Laboral, Proyecto Productivo, Pasantía, SENNOVA y Monitorías.',
        contenidoCompleto: 'La etapa productiva permite al aprendiz transferir, complementar y consolidar sus conocimientos y destrezas en un entorno productivo real o simulado.',
        clave2024: 'Ampliación y formalización de la alternativa SENNOVA de investigación e innovación tecnológica.'
      },
      {
        numero: 25,
        titulo: 'Plazo para Inicio y Registro de la Alternativa',
        pagina: 27,
        categoria: 'Etapa Productiva',
        resumen: 'El aprendiz dispone de hasta dos (2) años continuos posteriores a la finalización de la etapa lectiva para legalizar su etapa productiva.',
        contenidoCompleto: 'Al culminar la etapa lectiva, el aprendiz debe registrar formalmente su alternativa de etapa productiva en un término no mayor a dos (2) años. El incumplimiento injustificado causará cancelación de matrícula.',
        clave2024: 'Seguimiento automatizado y alertas preventivas antes de cumplirse el plazo límite.'
      },
      {
        numero: 26,
        titulo: 'Bitácoras Quincenales y Visitas de Seguimiento',
        pagina: 28,
        categoria: 'Etapa Productiva',
        resumen: 'Entrega obligatoria de bitácoras de actividades cada 15 días y realización de al menos dos visitas de seguimiento por el instructor asignado.',
        contenidoCompleto: 'El aprendiz debe diligenciar y remitir quincenalmente el formato oficial de bitácora que describe las actividades desarrolladas, firmado por su jefe inmediato y concertado con el instructor de seguimiento.',
        clave2024: 'Radicación de bitácoras por canal virtual institucional con firma electrónica.'
      },
      {
        numero: 27,
        titulo: 'Evaluación y Certificación de la Etapa Productiva',
        pagina: 29,
        categoria: 'Etapa Productiva',
        resumen: 'Evaluación cualitativa: Aprobado (A) o No Aprobado (D), requisito indispensable para la graduación y expedición del título profesional.',
        contenidoCompleto: 'El instructor de seguimiento, en conjunto con el ente coformador, emite el juicio evaluativo final. La aprobación exitosa habilita el trámite de certificación académica.',
        clave2024: 'Ruta pedagógica de mejoramiento antes de declarar una etapa productiva como No Aprobada.'
      }
    ]
  },
  {
    numero: 7,
    romano: 'Capítulo VII',
    titulo: 'Faltas Académicas y Disciplinarias',
    descripcion: 'Tipificación de infracciones, criterios para su calificación en Leves, Graves y Gravísimas, y circunstancias atenuantes o agravantes.',
    paginas: [31, 32, 33, 34, 35],
    articulos: [
      {
        numero: 28,
        titulo: 'Definición y Clasificación de las Faltas',
        pagina: 31,
        categoria: 'Faltas',
        resumen: 'Las faltas son acciones u omisiones que transgreden deberes o prohibiciones. Se clasifican en Académicas y Disciplinarias, graduándose en Leves, Graves o Gravísimas.',
        contenidoCompleto: 'Se consideran faltas las conductas contrarias al régimen del aprendiz que afecten el normal desarrollo de la formación, la convivencia armónica o los bienes institucionales.',
        clave2024: 'Enfoque de proporcionalidad estricta entre la conducta y la consecuencia jurídica.'
      },
      {
        numero: 29,
        titulo: 'Criterios de Calificación de la Falta',
        pagina: 32,
        categoria: 'Faltas',
        resumen: 'Daño causado, grado de culpabilidad (dolo o culpa), reincidencia, impacto en la comunidad formativa y confesión espontánea.',
        contenidoCompleto: 'Para calificar la gravedad de la falta se valorarán: la naturaleza de los hechos, el perjuicio ocasionado, los antecedentes formativos del aprendiz y su disposición a reparar el daño.',
        clave2024: 'Ponderación obligatoria de la voluntad restaurativa demostrada por el aprendiz.'
      },
      {
        numero: 30,
        titulo: 'Catálogo de Faltas Gravísimas Taxativas',
        pagina: 33,
        categoria: 'Faltas',
        resumen: 'Acoso sexual, violencia física, porte de armas, narcotráfico, suplantación o fraude sistemático con IA, y falsedad en documentos.',
        contenidoCompleto: 'Constituyen faltas gravísimas: el acoso sexual y las violencias de género; la comercialización o consumo de sustancias ilícitas; la agresión física o verbal grave; el uso fraudulento de inteligencia artificial para burlar la acreditación académica y la falsificación de certificados o identidades.',
        clave2024: 'Inclusión directa de violencias de género y fraude con IA dentro del catálogo de faltas gravísimas.'
      }
    ]
  },
  {
    numero: 8,
    romano: 'Capítulo VIII',
    titulo: 'Medidas Formativas, Sanciones y Enfoque Restaurativo',
    descripcion: 'Medidas preventivas, pedagógicas, sanciones disciplinarias y acciones restaurativas orientadas a reparar el daño social.',
    paginas: [36, 37, 38, 39, 40],
    articulos: [
      {
        numero: 31,
        titulo: 'Medidas Formativas Preventivas y Pedagógicas',
        pagina: 36,
        categoria: 'Medidas Formativas',
        resumen: 'Llamado de atención verbal y formulación concertada de un Plan de Mejoramiento Pedagógico con actividades formativas concretas.',
        contenidoCompleto: 'Las medidas formativas tienen carácter pedagógico y orientador. Buscan que el aprendiz reflexione, asuma compromisos de superación y subsane deficiencias académicas o de convivencia.',
        clave2024: 'Prioridad formativa absoluta antes de acudir al procedimiento sancionatorio.'
      },
      {
        numero: 32,
        titulo: 'El Plan de Mejoramiento Pedagógico Concertado',
        pagina: 37,
        categoria: 'Medidas Formativas',
        resumen: 'Instrumento escrito con metas, evidencias, plazos y tutoría personalizada para alcanzar resultados de aprendizaje pendientes.',
        contenidoCompleto: 'Documento concertado entre el instructor y el aprendiz, con visto bueno de la coordinación académica, que fija actividades pedagógicas complementarias y fecha límite de evaluación.',
        clave2024: 'Límite temporal prudencial para su ejecución y seguimiento objetivo.'
      },
      {
        numero: 33,
        titulo: 'Medidas Sancionatorias Disciplinarias',
        pagina: 38,
        categoria: 'Medidas Formativas',
        resumen: 'Llamado de atención escrito con copia a la hoja de vida, Condicionamiento de matrícula y Cancelación de matrícula con inhabilidad.',
        contenidoCompleto: 'Las sanciones proceden ante faltas graves o gravísimas, o tras el incumplimiento del plan de mejoramiento. Son impuestas exclusivamente por el Subdirector de Centro mediante acto administrativo motivado.',
        clave2024: 'Reserva legal de la sanción únicamente en cabeza del Subdirector de Centro.'
      },
      {
        numero: 34,
        titulo: 'Cancelación de Matrícula e Inhabilidad Graduada',
        pagina: 39,
        categoria: 'Medidas Formativas',
        resumen: 'Pérdida definitiva del cupo con inhabilidad para ingresar al SENA entre seis (6) meses y tres (3) años según la gravedad de la falta.',
        contenidoCompleto: 'Sanción máxima que extingue el vínculo formativo del aprendiz con el SENA. El acto administrativo determinará el periodo de inhabilidad institucional aplicable.',
        clave2024: 'Inhabilidades graduadas y proporcionadas, sujetas a recursos administrativos de ley.'
      },
      {
        numero: 35,
        titulo: 'Enfoque y Acciones Pedagógicas Restaurativas',
        pagina: 40,
        categoria: 'Medidas Formativas',
        resumen: 'Acciones de reparación comunitaria, disculpas públicas, campañas de convivencia y voluntariado pedagógico en el Centro.',
        contenidoCompleto: 'El nuevo reglamento prioriza la justicia restaurativa: el aprendiz que reconozca su falta puede concertar compromisos de reparación a la comunidad formativa, reduciendo la severidad de la sanción aplicable.',
        clave2024: 'Novedad estructural del 2024: transformación del modelo punitivo tradicional en un modelo educativo restaurativo.'
      }
    ]
  },
  {
    numero: 9,
    romano: 'Capítulo IX',
    titulo: 'Procedimiento Sancionatorio, Comité y Debido Proceso',
    descripcion: 'Ruta procedimental completa, funciones del Comité de Evaluación y Seguimiento, descargos, pruebas y recurso de reposición.',
    paginas: [41, 42, 43, 44, 45],
    articulos: [
      {
        numero: 36,
        titulo: 'Comité de Evaluación y Seguimiento',
        pagina: 41,
        categoria: 'Procedimiento',
        resumen: 'Órgano asesor colegiado conformado por coordinador, instructores, representante de aprendices y profesional de bienestar.',
        contenidoCompleto: 'El Comité analiza los casos remitidos por faltas graves o bajo rendimiento persistente, escucha los descargos del aprendiz y emite recomendación motivada al Subdirector de Centro.',
        clave2024: 'Participación obligatoria del representante o vocero estudiantil con voz activa.'
      },
      {
        numero: 37,
        titulo: 'Ruta Procesal: Queja, Citación y Descargos',
        pagina: 42,
        categoria: 'Procedimiento',
        resumen: 'Radicación de queja motivada, citación formal por correo institucional con al menos 3 días de anticipación, y sesión de descargos.',
        contenidoCompleto: 'La citación debe especificar los hechos, pruebas recaudadas y presunta falta imputada. El aprendiz puede comparecer asistido, aportar testigos y pruebas documentales o digitales.',
        clave2024: 'Nulidad absoluta de cualquier trámite que omita la notificación formal o el traslado de pruebas.'
      },
      {
        numero: 38,
        titulo: 'Acto Administrativo Motivado del Subdirector',
        pagina: 43,
        categoria: 'Procedimiento',
        resumen: 'Decisión formal emitida por el Subdirector de Centro dentro de los términos legales, acogiendo o modificando la recomendación del Comité.',
        contenidoCompleto: 'El Subdirector resuelve mediante resolución motivada que se notifica personalmente o por correo electrónico institucional al aprendiz, indicando los recursos que proceden.',
        clave2024: 'Motivación jurídica y probatoria rigurosa en cada resolución.'
      },
      {
        numero: 39,
        titulo: 'Recurso de Reposición en Cinco (5) Días Hábiles',
        pagina: 44,
        categoria: 'Procedimiento',
        resumen: 'El aprendiz tiene 5 días hábiles a partir de la notificación para interponer recurso de reposición ante el Subdirector de Centro.',
        contenidoCompleto: 'Contra la resolución sancionatoria procede el recurso de reposición interpuesto por escrito o medio digital dentro de los cinco (5) días hábiles siguientes a la notificación legal, resolviéndose en los términos del CPACA.',
        clave2024: 'Plazo garantista claro de cinco (5) días hábiles con efecto suspensivo hasta fallo final.'
      }
    ]
  },
  {
    numero: 10,
    romano: 'Capítulo X',
    titulo: 'Representación de Aprendices, Vocerías y Liderazgo',
    descripcion: 'Elección democrática de voceros de ficha, representantes de Centro, derechos, deberes y causales de revocatoria de mandato.',
    paginas: [46, 47, 48],
    articulos: [
      {
        numero: 40,
        titulo: 'Voceros de Ficha y Líderes de Grupo',
        pagina: 46,
        categoria: 'Representación',
        resumen: 'Elegidos democráticamente por sus compañeros durante el primer mes de formación para actuar como interlocutores ante el equipo ejecutor.',
        contenidoCompleto: 'Cada ficha elegirá un vocero principal y un suplente para canalizar inquietudes, dinamizar proyectos y fomentar el liderazgo solidario en el grupo formativo.',
        clave2024: 'Reconocimiento de mérito y horas de liderazgo formativo para los voceros destacados.'
      },
      {
        numero: 41,
        titulo: 'Representante de los Aprendices del Centro',
        pagina: 47,
        categoria: 'Representación',
        resumen: 'Máxima instancia de representación estudiantil en el Centro de Formación, elegido por voto universal, secreto y digital.',
        contenidoCompleto: 'El Representante de Aprendices integra el Comité de Evaluación y Seguimiento, el Comité de Bienestar y los escenarios institucionales de diálogo con la Dirección General.',
        clave2024: 'Garantías institucionales de tiempo, conectividad y movilidad para cumplir su labor de representación.'
      },
      {
        numero: 42,
        titulo: 'Revocatoria del Mandato y Disposiciones Finales',
        pagina: 48,
        categoria: 'Representación',
        resumen: 'Procedimiento democrático cuando el vocero o representante incumpla deberes o incurra en faltas sancionables.',
        contenidoCompleto: 'El mandato de vocero o representante podrá ser revocado por votación calificada de sus representados o por incurrir en sanción disciplinaria. El Acuerdo 009 de 2024 rige a partir de su publicación en el Diario Oficial No. 52.947 y deroga expresamente las normas precedentes.',
        clave2024: 'Cláusula de vigencia y derogatoria expresa de los Acuerdos 007 de 2012 y reformas intermedias.'
      }
    ]
  }
];

// 48 structured pages matching the official 48-page PDF converted to JSON
export const REGLAMENTO_PAGINAS_DOCUMENTO: ReglamentoPagina[] = [
  {
    page: 1,
    chapter: 'Preámbulo y Encabezado',
    title: 'Acuerdo 009 de 2024 - Consejo Directivo Nacional del SENA',
    content: 'Por el cual se expide el nuevo Reglamento del Aprendiz del Servicio Nacional de Aprendizaje SENA. El Consejo Directivo Nacional en uso de sus facultades legales, en especial las conferidas por la Ley 119 de 1994, expide el marco normativo unificado para la comunidad de aprendices de Colombia.'
  },
  {
    page: 2,
    chapter: 'Capítulo I',
    title: 'Artículo 1 - Objeto, Ámbito de Aplicación y Compromiso Institucional',
    content: 'El presente reglamento rige para todas las personas naturales matriculadas en el SENA en programas laborales, técnicos y tecnológicos, en modalidades presencial, virtual y a distancia en las 33 regionales y 118 centros de formación.'
  },
  {
    page: 3,
    chapter: 'Capítulo I',
    title: 'Artículo 2 - Naturaleza del Aprendiz y Perfil del Egresado SENA',
    content: 'Se define al aprendiz como ciudadano autónomo, crítico, solidario y líder, constructor de paz e innovación. La formación profesional integral abarca el saber, el hacer y el ser como pilares inseparables de su desempeño.'
  },
  {
    page: 4,
    chapter: 'Capítulo I',
    title: 'Artículo 3 - Principios Rectores: Dignidad, Equidad y Sostenibilidad',
    content: 'Principios rectores de la formación: 1. Primacía de la dignidad humana. 2. Libertad de cátedra y pensamiento con rigor ético. 3. Diversidad e inclusión social. 4. Sostenibilidad ambiental y justicia ecológica. 5. Debido proceso garantista.'
  },
  {
    page: 5,
    chapter: 'Capítulo I',
    title: 'Artículo 4 - Ambientes de Formación y Equivalencia Digital (Zajuna)',
    content: 'Son ambientes de aprendizaje las aulas, talleres, fincas agropecuarias, laboratorios de biotecnología, TecnoParques, TecnoAcademias y la plataforma virtual Zajuna LMS. Los espacios virtuales tienen plena validez formativa y jurídica.'
  },
  {
    page: 6,
    chapter: 'Capítulo II',
    title: 'Artículo 5 - Derechos Académicos y Calidad de la Formación',
    content: 'El aprendiz tiene derecho a inducción integral, acceso a planes curriculares vigentes, asesoría de instructores calificados, materiales de formación oportunos y evaluación diagnóstica, formativa y sumativa con retroalimentación oportuna.'
  },
  {
    page: 7,
    chapter: 'Capítulo II',
    title: 'Artículo 6 - Derecho a la Conectividad, Plataformas y Recursos Digitales',
    content: 'Acceso equitativo a internet en sedes del SENA, cuentas de correo institucional, plataformas LMS (Zajuna), repositorios bibliográficos digitales, laboratorios remotos y software con licencias formativas vigentes.'
  },
  {
    page: 8,
    chapter: 'Capítulo II',
    title: 'Artículo 7 - Garantía Constitucional del Debido Proceso y Defensa',
    content: 'En todas las actuaciones administrativas o disciplinarias, el aprendiz tiene derecho a la presunción de inocencia, a conocer los cargos que se le imputan, a presentar descargos y pruebas, y a ser notificado por canales oficiales.'
  },
  {
    page: 9,
    chapter: 'Capítulo II',
    title: 'Artículo 8 - Bienestar Integral, Salud Mental y Acompañamiento Psicosocial',
    content: 'Derecho a beneficiarse de las líneas estratégicas de bienestar: acompañamiento psicológico y socioemocional, prevención en salud, participación en torneos deportivos, talleres artísticos, convocatorias de apoyos de sostenimiento y monitorías.'
  },
  {
    page: 10,
    chapter: 'Capítulo II',
    title: 'Artículo 9 - Libertad de Expresión, Vocería y Participación Democrática',
    content: 'Libertad para expresar ideas, elegir y ser elegido vocero de ficha o representante de aprendices, integrar semilleros de investigación SENNOVA y comités del Centro de Formación sin coacción alguna.'
  },
  {
    page: 11,
    chapter: 'Capítulo III',
    title: 'Artículo 10 - Deberes Formativos y Compromiso con el Aprendizaje Autónomo',
    content: 'Cumplir los horarios formativos concertados, desarrollar y subir oportunamente las evidencias a Zajuna LMS, consultar fuentes bibliográficas confiables y participar activamente en el trabajo colaborativo en equipo.'
  },
  {
    page: 12,
    chapter: 'Capítulo III',
    title: 'Artículo 11 - Uso Ético de la Inteligencia Artificial y Honestidad Académica',
    content: 'El aprendiz debe declarar explícitamente el uso de herramientas de Inteligencia Artificial generativa en sus proyectos. Se prohíbe presentar como propias respuestas íntegras de IA o atajos algorítmicos que suplanten el aprendizaje real.'
  },
  {
    page: 13,
    chapter: 'Capítulo III',
    title: 'Artículo 12 - Porte Obligatorio del Carné Institucional Físico o Digital',
    content: 'Portar el carné oficial del aprendiz en lugar visible en todas las sedes del SENA. El carné digital emitido por el sistema institucional tiene igual fuerza identificatoria y debe ser exhibido a solicitud del personal de seguridad.'
  },
  {
    page: 14,
    chapter: 'Capítulo III',
    title: 'Artículo 13 - Seguridad y Salud en el Trabajo (SST) y Conservación Ecológica',
    content: 'Utilizar obligatoriamente los EPP (overol, botas dieléctricas, gafas de protección, guantes) en talleres y laboratorios. Respetar los puntos ecológicos, clasificar residuos y promover el ahorro de agua y energía.'
  },
  {
    page: 15,
    chapter: 'Capítulo III',
    title: 'Artículo 14 - Convivencia Pacífica, Empatía y Ciberconvivencia',
    content: 'Tratar con respeto a compañeros, instructores y funcionarios. En redes sociales y grupos virtuales vinculados a la formación, mantener un lenguaje profesional y respetuoso libre de insultos, rumores o matoneo digital.'
  },
  {
    page: 16,
    chapter: 'Capítulo IV',
    title: 'Artículo 15 - Prohibición de Plagio, Copia y Fraude Digital',
    content: 'Prohibición de copiar evidencias, presentar tesis o proyectos ajenos, falsificar firmas en bitácoras o asistencia, o utilizar IA para resolver exámenes sin autorización explícita de la guía pedagógica.'
  },
  {
    page: 17,
    chapter: 'Capítulo IV',
    title: 'Artículo 16 - Cero Tolerancia a Violencias de Género y Acoso Sexual',
    content: 'Se prohíbe cualquier insinuación sexual no consentida, tocamientos indebidos, comentarios lascivos, persecución, violencia verbal o física hacia mujeres, diversidades sexuales o cualquier persona. Se activa la ruta inmediata de género.'
  },
  {
    page: 18,
    chapter: 'Capítulo IV',
    title: 'Artículo 17 - Prohibición de Armas, Sustancias Psicoactivas y Alcohol',
    content: 'Ingresar portando cualquier tipo de arma de fuego, cortopunzante o artefacto explosivo. Distribuir, comprar, consumir o ingresar bajo los efectos de alcohol o drogas psicotrópicas a los predios de la institución.'
  },
  {
    page: 19,
    chapter: 'Capítulo IV',
    title: 'Artículo 18 - Prohibición de Sabotaje Informático y Daño a la Infraestructura',
    content: 'Alterar contraseñas ajenas, vulnerar la seguridad de la red institucional, inyectar malware, dañar computadores o herramientas de los talleres, o utilizar la infraestructura para apuestas ilegales o comercio ilícito.'
  },
  {
    page: 20,
    chapter: 'Capítulo IV',
    title: 'Artículo 19 - Prohibición de Proselitismo Político Partidista',
    content: 'Usar las instalaciones o canales virtuales del SENA para hacer campaña política partidista electoral, recaudar fondos electorales o presionar a compañeros en favor de aspiraciones proselitistas particulares.'
  },
  {
    page: 21,
    chapter: 'Capítulo V',
    title: 'Artículo 20 - Régimen de Traslado de Centro o Jornada',
    content: 'El aprendiz puede radicar solicitud motivada de traslado cuando demuestre cambio de ciudad de residencia o razones de fuerza mayor, siempre que exista cupo y el diseño curricular en el Centro de destino sea compatible.'
  },
  {
    page: 22,
    chapter: 'Capítulo V',
    title: 'Artículo 21 - Aplazamiento de Matrícula: Plazos y Prórrogas',
    content: 'Suspensión temporal del proceso formativo por hasta seis (6) meses continuos, prorrogable por seis (6) meses adicionales por razones de salud, servicio militar, maternidad/paternidad o fuerza mayor comprobada.'
  },
  {
    page: 23,
    chapter: 'Capítulo V',
    title: 'Artículo 22 - Reingreso Formal a la Formación Profesional',
    content: 'Debe ser solicitado por escrito antes de vencerse el plazo del aplazamiento. El Centro verificará la disponibilidad de una ficha en el mismo trimestre y coordinará homologación si hubo cambio de plan curricular.'
  },
  {
    page: 24,
    chapter: 'Capítulo V',
    title: 'Artículo 23 - Retiro Voluntario Definitivo y Registro',
    content: 'Comunicación libre del aprendiz desvinculándose formalmente del programa. No genera sanción disciplinaria ni inhabilidad, liberando el cupo para otros aspirantes en convocatorias de formación.'
  },
  {
    page: 25,
    chapter: 'Capítulo V',
    title: 'Artículo 24 - Deserción: Trámite Garantista y Requerimiento de Descargos',
    content: 'Se configura con tres (3) días hábiles continuos de inasistencia injustificada o 15 días continuos sin conexión en modalidad virtual. El Coordinador Académico debe enviar citación oficial por correo dando 3 días hábiles para presentar descargos antes de cancelar matrícula.'
  },
  {
    page: 26,
    chapter: 'Capítulo VI',
    title: 'Artículo 25 - Finalidad y Concertación de la Etapa Productiva',
    content: 'Fase de aplicación práctica donde el aprendiz demuestra sus competencias en el sector productivo. Debe corresponder estrictamente al perfil de egreso del programa formativo.'
  },
  {
    page: 27,
    chapter: 'Capítulo VI',
    title: 'Artículo 26 - Catálogo de Alternativas de Etapa Productiva',
    content: '1. Contrato de Aprendizaje (Ley 789 de 2002). 2. Vínculo laboral vigente afín. 3. Proyecto productivo con Fondo Emprender. 4. Semilleros SENNOVA I+D. 5. Pasantía en entidad pública o privada. 6. Monitorías institucionales SENA.'
  },
  {
    page: 28,
    chapter: 'Capítulo VI',
    title: 'Artículo 27 - Plazo Máximo de Dos Años para Legalización',
    content: 'El aprendiz tiene hasta dos (2) años continuos tras culminar su etapa lectiva para legalizar y concertar su alternativa de etapa productiva. Expirado este plazo sin causa justificada se extingue el derecho a titulación.'
  },
  {
    page: 29,
    chapter: 'Capítulo VI',
    title: 'Artículo 28 - Bitácoras Quincenales y Visitas del Instructor',
    content: 'El aprendiz debe cargar cada 15 días su formato de bitácora en la plataforma digital. El instructor de seguimiento realiza dos visitas (concertación y cierre) evaluando el desempeño del aprendiz con la empresa.'
  },
  {
    page: 30,
    chapter: 'Capítulo VI',
    title: 'Artículo 29 - Juicio Evaluativo de la Etapa Productiva',
    content: 'La etapa productiva se evalúa con juicio cualitativo de Aprobado (A) o No Aprobado (D). Si se detectan deficiencias superables, se concierta un plan de mejoramiento antes de tomar una decisión definitiva.'
  },
  {
    page: 31,
    chapter: 'Capítulo VII',
    title: 'Artículo 30 - Concepto y Tipos de Faltas (Académicas y Disciplinarias)',
    content: 'Las faltas son vulneraciones a los deberes o incursión en prohibiciones. Faltas académicas: relacionadas con el aprendizaje y evidencias. Faltas disciplinarias: atentan contra la convivencia, la ley, el respeto o el patrimonio institucional.'
  },
  {
    page: 32,
    chapter: 'Capítulo VII',
    title: 'Artículo 31 - Criterios de Graduación: Leves, Graves y Gravísimas',
    content: 'Para determinar la gravedad se analiza: reiteración, daño causado a personas o bienes, grado de dolo o culpa, aprovechamiento de la confianza, y la disposición a reparar o conciliar amistosamente.'
  },
  {
    page: 33,
    chapter: 'Capítulo VII',
    title: 'Artículo 32 - Catálogo Taxativo de Faltas Gravísimas en el Acuerdo 009',
    content: 'Son gravísimas: Violencia basada en género, acoso sexual, fraude sistemático con IA o suplantación, comercializar drogas, ingresar armas, hurtar equipos del SENA y falsificar certificaciones o documentos oficiales.'
  },
  {
    page: 34,
    chapter: 'Capítulo VII',
    title: 'Artículo 33 - Faltas Graves contra la Convivencia y el Aprendizaje',
    content: 'Inasistencias reiteradas injustificadas, agresión verbal a miembros de la comunidad, daño culposo a maquinaria por negligencia en SST, y desatender compromisos suscritos en planes de mejoramiento.'
  },
  {
    page: 35,
    chapter: 'Capítulo VII',
    title: 'Artículo 34 - Faltas Leves y Llamados de Atención Preventivos',
    content: 'Llegadas tarde esporádicas, no portar visiblemente el carné por olvido ocasional, descuidar el aseo básico del puesto de trabajo o pequeñas distracciones en ambientes formativos.'
  },
  {
    page: 36,
    chapter: 'Capítulo VIII',
    title: 'Artículo 35 - Medidas Formativas Pedagógicas y Preventivas',
    content: 'El nuevo reglamento prioriza el diálogo pedagógico: 1. Llamado de atención verbal reflexivo. 2. Plan de Mejoramiento Pedagógico con compromisos claros y medibles.'
  },
  {
    page: 37,
    chapter: 'Capítulo VIII',
    title: 'Artículo 36 - El Plan de Mejoramiento Pedagógico como Herramienta Formativa',
    content: 'Documento concertado entre el aprendiz y el instructor, donde se definen evidencias de nivelación y competencias a subsanar en un plazo no mayor a 30 días calendario.'
  },
  {
    page: 38,
    chapter: 'Capítulo VIII',
    title: 'Artículo 37 - Medidas Sancionatorias Disciplinarias Graduadas',
    content: 'Ante faltas graves o reincidencia: 1. Llamado de atención escrito con copia a la hoja de vida. 2. Condicionamiento de matrícula con plan de seguimiento estricto.'
  },
  {
    page: 39,
    chapter: 'Capítulo VIII',
    title: 'Artículo 38 - Cancelación de Matrícula e Inhabilidad Institucional',
    content: 'Pérdida del carácter de aprendiz e inhabilidad para inscribirse en programas del SENA por término de seis (6) meses hasta tres (3) años, reservada a faltas gravísimas comprobadas bajo debido proceso.'
  },
  {
    page: 40,
    chapter: 'Capítulo VIII',
    title: 'Artículo 39 - Justicia y Pedagogía Restaurativa en el Acuerdo 009',
    content: 'Novedad de 2024: el aprendiz que reconoce una falta disciplinaria puede acogerse a medidas restaurativas como voluntariado comunitario, reparación de bienes, conferencias pedagógicas o mediación de paz escolar.'
  },
  {
    page: 41,
    chapter: 'Capítulo IX',
    title: 'Artículo 40 - Conformación del Comité de Evaluación y Seguimiento',
    content: 'Integrado por: Coordinador Académico, Coordinador Misional, un instructor del área técnica, el vocero o representante de aprendices, y el orientador de Bienestar al Aprendiz.'
  },
  {
    page: 42,
    chapter: 'Capítulo IX',
    title: 'Artículo 41 - Apertura de Proceso, Citación Oficial y Descargos',
    content: 'El proceso inicia con informe motivado. Se cita al aprendiz por correo institucional con 3 días hábiles de anticipación indicando hechos, pruebas y normas infringidas. Se celebra audiencia garantista de descargos.'
  },
  {
    page: 43,
    chapter: 'Capítulo IX',
    title: 'Artículo 42 - Concepto Motivado del Comité y Resolución del Subdirector',
    content: 'El Comité delibera y emite recomendación técnica al Subdirector de Centro. El Subdirector expide resolución motivada dentro de los 10 días hábiles siguientes acogiendo o modulando la medida.'
  },
  {
    page: 44,
    chapter: 'Capítulo IX',
    title: 'Artículo 43 - Notificación Personal y Recurso de Reposición',
    content: 'La resolución se notifica formalmente al aprendiz. Contra ella procede el Recurso de Reposición dentro de los cinco (5) días hábiles siguientes a la notificación, el cual suspende la medida hasta decisión definitiva.'
  },
  {
    page: 45,
    chapter: 'Capítulo IX',
    title: 'Artículo 44 - Firmeza y Ejecutoria de los Actos Sancionatorios',
    content: 'El acto administrativo cobra firmeza una vez resuelto el recurso de reposición o cuando haya vencido el término legal de 5 días hábiles sin que el aprendiz haya interpuesto el recurso.'
  },
  {
    page: 46,
    chapter: 'Capítulo X',
    title: 'Artículo 45 - Vocerías de Ficha: Elección y Rol de Liderazgo',
    content: 'Cada grupo de formación elige libremente durante el primer mes un vocero principal y un suplente. Son los voceros quienes articulan inquietudes del grupo con los instructores y coordinaciones.'
  },
  {
    page: 47,
    chapter: 'Capítulo X',
    title: 'Artículo 46 - Representación de Centro y Democracia Estudiantil',
    content: 'Elección anual por sufragio universal de los aprendices para elegir a su representante de Centro ante el Consejo de Centro, Comité de Bienestar y mesas de concertación con la Dirección General.'
  },
  {
    page: 48,
    chapter: 'Capítulo X',
    title: 'Artículo 47 y 48 - Revocatoria de Mandato, Vigencia y Derogatoria',
    content: 'El mandato de los representantes y voceros puede ser revocado democráticamente por causal grave. El presente Acuerdo 009 de 2024 rige a partir de su publicación en el Diario Oficial 52.947 y deroga expresamente los Acuerdos 007 de 2012, 002 de 2014, 006 de 2023 y 002 de 2024.'
  }
];

export const REGLAMENTO_ACUERDO_009_JSON: ReglamentoJSONStructure = {
  documento: 'Acuerdo 009 de 2024 - Reglamento del Aprendiz SENA',
  total_paginas: 48,
  entidad: 'Servicio Nacional de Aprendizaje SENA - Consejo Directivo Nacional',
  fecha_expedicion: '2024',
  diario_oficial: 'Diario Oficial No. 52.947',
  deroga: 'Acuerdos 007 de 2012, 002 de 2014, 006 de 2023 y 002 de 2024',
  capitulos: REGLAMENTO_CAPITULOS,
  paginas: REGLAMENTO_PAGINAS_DOCUMENTO
};

export const COMPARATIVA_2012_VS_2024 = [
  {
    tema: 'Inteligencia Artificial y Ética Digital',
    acuerdo2012: 'No contemplaba la inteligencia artificial ni pautas sobre autoría de código o textos sintéticos.',
    acuerdo2024: 'Regulación expresa: exige declaración y atribución transparente del uso de IA generativa en evidencias. El plagio o suplantación mediante IA se tipifica como falta gravísima.',
    impacto: 'Garantiza la autenticidad del aprendizaje técnico mientras promueve la alfabetización digital ética.'
  },
  {
    tema: 'Violencias Basadas en Género y Acoso',
    acuerdo2012: 'Mención general a la convivencia sin protocolos diferenciados contra violencias de género ni ciberacoso.',
    acuerdo2024: 'Tolerancia cero con tipificación directa como falta gravísima. Rutas de atención inmediata, protección prioritaria a la víctima y confidencialidad.',
    impacto: 'Espacios formativos libres de discriminación y seguros para mujeres y diversidades.'
  },
  {
    tema: 'Salud Mental y Bienestar',
    acuerdo2012: 'Enfoque asistencial centrado en subsidios económicos y actividades deportivas tradicionales.',
    acuerdo2024: 'Consagración de la salud mental y emocional como derecho formativo. Acompañamiento psicosocial obligatorio e integral.',
    impacto: 'Reconoce que el rendimiento formativo requiere bienestar psicológico y estabilidad emocional.'
  },
  {
    tema: 'Enfoque Restaurativo vs Punitivo',
    acuerdo2012: 'Énfasis punitivo directo: queja, comité y sanción disciplinaria inmediata.',
    acuerdo2024: 'Prioridad formativa y pedagógica restaurativa: mediación escolar, planes de mejoramiento y reparación comunitaria del daño.',
    impacto: 'Promueve la permanencia escolar y la reintegración del aprendiz en lugar de la expulsión automática.'
  },
  {
    tema: 'Carné Institucional y Modernización',
    acuerdo2012: 'Porte obligatorio únicamente del carné físico de plástico.',
    acuerdo2024: 'Validez plena y vinculante del carné digital en dispositivos móviles, equiparado legalmente al carné físico.',
    impacto: 'Agilidad de acceso, sostenibilidad ecológica y modernización tecnológica de los centros.'
  },
  {
    tema: 'Deserción y Debido Proceso',
    acuerdo2012: 'Declaratoria rápida de deserción que generaba cancelaciones automáticas cuestionadas.',
    acuerdo2024: 'Ruta garantista: 3 días de inasistencia activan requerimiento obligatorio con 3 días hábiles adicionales para descargos antes de cancelar matrícula.',
    impacto: 'Blindaje constitucional del derecho a la defensa y prevención de la deserción por causas médicas justificadas.'
  }
];
