import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  ShieldAlert, 
  Scale, 
  AlertTriangle, 
  FileText, 
  Sparkles, 
  BookOpen, 
  Search, 
  RefreshCw, 
  HeartHandshake,
  Cpu,
  ChevronLeft,
  ExternalLink,
  Layers,
  Check,
  Info
} from 'lucide-react';
import { 
  REGLAMENTO_METADATA, 
  REGLAMENTO_CAPITULOS, 
  REGLAMENTO_PAGINAS_DOCUMENTO, 
  COMPARATIVA_2012_VS_2024 
} from '../data/reglamentoAcuerdo009Data';

interface ModuleReglamentoProps {
  onCompleteModule: (moduleId: string) => void;
  isCompleted: boolean;
  onNext: () => void;
}

export const ModuleReglamento: React.FC<ModuleReglamentoProps> = ({
  onCompleteModule,
  isCompleted,
  onNext
}) => {
  // Navigation tabs (focused on pedagogical learning)
  const [activeTab, setActiveTab] = useState<'capitulos' | 'paginas' | 'buscador' | 'comparativa' | 'casos'>('capitulos');
  
  // Chapter selector
  const [selectedChapterNumber, setSelectedChapterNumber] = useState<number>(1);
  
  // Page selector (1 to 48)
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Search query
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('todos');
  
  // Interactive mini-cases state
  const [selectedCaseAnswers, setSelectedCaseAnswers] = useState<Record<string, number>>({});

  const handleFinish = () => {
    onCompleteModule('reglamento');
    onNext();
  };

  const selectedChapter = useMemo(() => {
    return REGLAMENTO_CAPITULOS.find(c => c.numero === selectedChapterNumber) || REGLAMENTO_CAPITULOS[0];
  }, [selectedChapterNumber]);

  const currentPageData = useMemo(() => {
    return REGLAMENTO_PAGINAS_DOCUMENTO.find(p => p.page === currentPage) || REGLAMENTO_PAGINAS_DOCUMENTO[0];
  }, [currentPage]);

  // Search in all articles
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() && searchCategory === 'todos') {
      return [];
    }

    const q = searchQuery.toLowerCase().trim();
    const allArticles = REGLAMENTO_CAPITULOS.flatMap(c => 
      c.articulos.map(a => ({
        ...a,
        capituloRomano: c.romano,
        capituloTitulo: c.titulo
      }))
    );

    return allArticles.filter(art => {
      const matchesCategory = searchCategory === 'todos' || art.categoria.toLowerCase() === searchCategory.toLowerCase();
      const matchesQuery = !q || 
        art.titulo.toLowerCase().includes(q) ||
        art.resumen.toLowerCase().includes(q) ||
        art.contenidoCompleto.toLowerCase().includes(q) ||
        (art.clave2024 && art.clave2024.toLowerCase().includes(q)) ||
        art.numero.toString() === q ||
        `artículo ${art.numero}`.includes(q) ||
        `articulo ${art.numero}`.includes(q) ||
        `página ${art.pagina}`.includes(q) ||
        `pagina ${art.pagina}`.includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, searchCategory]);

  const miniCasos = [
    {
      id: 'caso1',
      titulo: 'Uso de IA Generativa en Taller de Programación',
      hecho: 'Un aprendiz utilizó un modelo de IA para generar el 100% del código de su entrega de software. En el informe final no citó el modelo ni indicó qué prompts utilizó.',
      pregunta: 'Bajo el Acuerdo 009 de 2024 (Art. 11 y 15), ¿cuál es el dictamen normativo correcto?',
      opciones: [
        {
          texto: 'Es totalmente legal y no requiere mención porque la IA es de dominio público.',
          correcta: false,
          retro: 'Incorrecto. El Artículo 11 obliga a declarar de forma explícita el uso de IA y el Artículo 15 prohíbe simular autoría humana.'
        },
        {
          texto: 'Incurre en falta grave/gravísima por no declarar el uso de la IA y presentarla como de su autoría propia.',
          correcta: true,
          retro: '¡Correcto! El Acuerdo 009 de 2024 estipula que el uso no declarado de IA constituye transgresión a la honestidad académica y falta sancionable.'
        },
        {
          texto: 'Solo amerita que se le pida rehacer el trabajo sin ninguna repercusión.',
          correcta: false,
          retro: 'Incorrecto. Aunque el enfoque es restaurativo, la falta debe registrarse y concertarse un Plan de Mejoramiento formal.'
        }
      ]
    },
    {
      id: 'caso2',
      titulo: 'Inasistencia Injustificada y Garantía de Descargos',
      hecho: 'Una aprendiz acumula 3 días hábiles consecutivos sin asistir al Centro de Formación. El Coordinador quiere cancelar su matrícula inmediatamente.',
      pregunta: 'Bajo el nuevo trámite de deserción del Acuerdo 009 (Art. 24), ¿qué debe hacer la institución?',
      opciones: [
        {
          texto: 'La cancelación debe ser inmediata sin necesidad de avisar al aprendiz.',
          correcta: false,
          retro: 'Falso. Las cancelaciones automáticas fueron erradicadas en el nuevo estatuto garantista.'
        },
        {
          texto: 'Debe notificarla oficialmente por correo y otorgarle tres (3) días hábiles para justificar su inasistencia antes de decidir.',
          correcta: true,
          retro: '¡Excelente! El Artículo 24 exige citación formal obligatoria con 3 días hábiles de término para presentar descargos o soportes de fuerza mayor.'
        },
        {
          texto: 'Esperar 6 meses antes de tomar cualquier decisión de coordinación.',
          correcta: false,
          retro: 'Incorrecto. El plazo se activa con 3 días de inasistencia, pero con requerimiento garantista.'
        }
      ]
    },
    {
      id: 'caso3',
      titulo: 'Interposición del Recurso de Reposición',
      hecho: 'El Subdirector expide una resolución sancionatoria imponiendo condicionamiento de matrícula. El aprendiz considera que hubo un error probatorio en su contra.',
      pregunta: '¿Con qué término legal cuenta el aprendiz para presentar el recurso de reposición (Art. 39 y 43)?',
      opciones: [
        {
          texto: 'Dentro de los cinco (5) días hábiles siguientes a la notificación formal.',
          correcta: true,
          retro: '¡Correcto! El Artículo 39 y 43 del Acuerdo 009 consagran 5 días hábiles para interponer recurso de reposición con efecto suspensivo.'
        },
        {
          texto: 'Solo el mismo día de la notificación.',
          correcta: false,
          retro: 'Falso. El término legal garantista es de cinco días hábiles.'
        },
        {
          texto: 'No existe ningún recurso frente a las decisiones del Subdirector.',
          correcta: false,
          retro: 'Falso. El derecho constitucional de contradicción garantiza el recurso de reposición formal.'
        }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Main Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 transition-colors duration-300 shadow-xs">
        
        {/* Module Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div>
            <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Módulo 3 · Marco Normativo Unificado 2024</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Reglamento del Aprendiz — Acuerdo 009 de 2024
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 max-w-3xl leading-relaxed">
              Estatuto del aprendiz publicado en el <strong>Diario Oficial No. 52.947</strong> (48 páginas). Deroga el Acuerdo 007 de 2012 y unifica derechos, deberes, ética con Inteligencia Artificial, debido proceso garantista y justicia restaurativa.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleDownloadJson}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 rounded-lg transition-colors cursor-pointer"
              title="Descargar estructura completa en JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar .JSON</span>
            </button>

            {isCompleted && (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-2 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-4 h-4" />
                <span>Módulo Aprobado</span>
              </span>
            )}
          </div>
        </div>

        {/* Regulatory Summary Banner */}
        <div className="mt-6 p-4.5 bg-linear-to-r from-emerald-50/90 via-slate-50 to-emerald-50/60 dark:from-emerald-950/40 dark:via-slate-900 dark:to-emerald-950/20 border border-emerald-200 dark:border-emerald-800/80 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div className="space-y-1.5">
            <div className="font-bold text-emerald-950 dark:text-emerald-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
              <span>Estructura Oficial: Acuerdo No. 009 de 2024 (48 Páginas Indexadas)</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Derogatoria expresa de los <strong>Acuerdos 007 de 2012, 002 de 2014, 006 de 2023 y 002 de 2024</strong>. Incorpora regulación pionera sobre Inteligencia Artificial, salud mental, enfoque de género y debido proceso garantista.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="text-center px-3 py-1.5 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 rounded-lg shadow-2xs">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Diario Oficial</span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono">52.947</span>
            </div>
            <div className="text-center px-3 py-1.5 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 rounded-lg shadow-2xs">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Documento</span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono">48 Págs</span>
            </div>
            <div className="text-center px-3 py-1.5 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 rounded-lg shadow-2xs">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Estructura</span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono">10 Capítulos</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 pt-6 border-b border-slate-100 dark:border-slate-800 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('capitulos')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'capitulos'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>01. Capítulos & Artículos</span>
          </button>

          <button
            onClick={() => setActiveTab('paginas')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'paginas'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>02. Lector de 48 Páginas</span>
          </button>

          <button
            onClick={() => setActiveTab('buscador')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'buscador'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>03. Buscador Semántico</span>
          </button>

          <button
            onClick={() => setActiveTab('comparativa')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'comparativa'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>04. Comparativa 2012 vs 2024</span>
          </button>

          <button
            onClick={() => setActiveTab('casos')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'casos'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>05. Casos Prácticos de Aplicación</span>
          </button>
        </div>

        {/* TAB 1: CAPÍTULOS Y ARTÍCULOS */}
        {activeTab === 'capitulos' && (
          <div className="pt-6 space-y-6">
            {/* Chapters Pill Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Selecciona un Capítulo del Acuerdo 009 de 2024:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {REGLAMENTO_CAPITULOS.map(chap => (
                  <button
                    key={chap.numero}
                    onClick={() => setSelectedChapterNumber(chap.numero)}
                    className={`p-2.5 text-left rounded-xl border text-xs transition-all cursor-pointer ${
                      selectedChapterNumber === chap.numero
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 dark:border-emerald-500 text-emerald-950 dark:text-white font-bold ring-1 ring-emerald-500/30'
                        : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono block">
                      {chap.romano}
                    </span>
                    <span className="line-clamp-1 mt-0.5 text-[11px]">
                      {chap.titulo}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Chapter Details */}
            <div className="p-5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700/60 pb-3">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                    {selectedChapter.romano} · {selectedChapter.articulos.length} Artículos
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                    {selectedChapter.titulo}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    {selectedChapter.descripcion}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 self-start sm:self-center shrink-0">
                  <span className="text-[11px] font-mono px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 font-medium">
                    Páginas: {selectedChapter.paginas.join(', ')}
                  </span>
                </div>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {selectedChapter.articulos.map(art => (
                  <div
                    key={art.numero}
                    className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2.5 shadow-2xs hover:border-emerald-300 dark:hover:border-emerald-800 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                        Artículo {art.numero}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                          Pág. {art.pagina}
                        </span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {art.categoria}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                      {art.titulo}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {art.resumen}
                    </p>

                    <div className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-lg border border-slate-100 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed italic">
                      "{art.contenidoCompleto}"
                    </div>

                    {art.clave2024 && (
                      <div className="flex items-start gap-1.5 text-[11px] text-emerald-800 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-100 dark:border-emerald-900/60">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>Novedad 2024:</strong> {art.clave2024}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LECTOR DOCUMENTAL DE 48 PÁGINAS */}
        {activeTab === 'paginas' && (
          <div className="pt-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                  Visor Oficial Página a Página
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  Exploración de las 48 Páginas del Acuerdo 009 de 2024
                </h3>
              </div>

              {/* Page Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage <= 1}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  title="Página anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                  <span>Página</span>
                  <input
                    type="number"
                    min={1}
                    max={48}
                    value={currentPage}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (val >= 1 && val <= 48) setCurrentPage(val);
                    }}
                    className="w-10 text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded py-0.5 text-xs text-emerald-700 dark:text-emerald-400 font-bold"
                  />
                  <span>/ 48</span>
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(48, prev + 1))}
                  disabled={currentPage >= 48}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  title="Página siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Page Reader Card */}
            <div className="bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 relative shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    {currentPage}
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400 block uppercase">
                      {currentPageData.chapter}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {currentPageData.title}
                    </h4>
                  </div>
                </div>

                <span className="text-xs font-mono text-slate-400">
                  Doc. Oficial 48 Págs · SENA 2024
                </span>
              </div>

              {/* Page Content Body */}
              <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Texto oficial transcrito íntegro:</span>
                </div>

                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-serif">
                  {currentPageData.content}
                </p>
              </div>

              {/* Quick Jump Buttons for Notable Pages */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Acceso directo a páginas claves del nuevo reglamento:
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {[
                    { page: 2, label: 'Pág 2: Objeto y Ámbito' },
                    { page: 8, label: 'Pág 8: Debido Proceso' },
                    { page: 9, label: 'Pág 9: Salud Mental' },
                    { page: 12, label: 'Pág 12: Ética e IA' },
                    { page: 13, label: 'Pág 13: Carné Digital' },
                    { page: 17, label: 'Pág 17: Violencias Género' },
                    { page: 25, label: 'Pág 25: Deserción 3 Días' },
                    { page: 27, label: 'Pág 27: Alternativas Etapa' },
                    { page: 33, label: 'Pág 33: Faltas Gravísimas' },
                    { page: 39, label: 'Pág 39: Inhabilidades' },
                    { page: 40, label: 'Pág 40: Justicia Restaurativa' },
                    { page: 44, label: 'Pág 44: Recurso Reposición (5 Días)' }
                  ].map(item => (
                    <button
                      key={item.page}
                      onClick={() => setCurrentPage(item.page)}
                      className={`px-2.5 py-1 rounded-md border text-[11px] transition-colors cursor-pointer ${
                        currentPage === item.page
                          ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-300 dark:hover:border-emerald-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BUSCADOR SEMÁNTICO */}
        {activeTab === 'buscador' && (
          <div className="pt-6 space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar cualquier artículo o término (ej. 'Inteligencia Artificial', 'Deserción', 'Página 25', 'Artículo 11', 'Acoso', 'Reposición')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-2xs"
                />
              </div>

              {/* Category Badges */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {[
                  { id: 'todos', label: 'Todas las Categorías' },
                  { id: 'principios', label: 'Principios' },
                  { id: 'derechos', label: 'Derechos' },
                  { id: 'deberes', label: 'Deberes' },
                  { id: 'prohibiciones', label: 'Prohibiciones' },
                  { id: 'novedades', label: 'Novedades' },
                  { id: 'etapa productiva', label: 'Etapa Productiva' },
                  { id: 'faltas', label: 'Faltas' },
                  { id: 'medidas formativas', label: 'Medidas Formativas' },
                  { id: 'procedimiento', label: 'Debido Proceso' },
                  { id: 'representación', label: 'Representación' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSearchCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg border text-[11px] transition-colors cursor-pointer ${
                      searchCategory === cat.id
                        ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                        : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
              <span>Resultados encontrados: <strong>{searchResults.length}</strong></span>
              <span>Acuerdo 009 de 2024 · 48 Páginas</span>
            </div>

            {/* Results Grid */}
            <div className="space-y-3">
              {searchResults.length > 0 ? (
                searchResults.map(art => (
                  <div
                    key={art.numero}
                    className="p-4 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 hover:border-emerald-300 dark:hover:border-emerald-800 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                          Artículo {art.numero}
                        </span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {art.titulo}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-mono">
                          Pág. {art.pagina}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold uppercase">
                          {art.categoria}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {art.resumen}
                    </p>

                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 font-serif italic">
                      "{art.contenidoCompleto}"
                    </div>

                    {art.clave2024 && (
                      <div className="text-[11px] text-emerald-800 dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-100 dark:border-emerald-900/60 font-medium">
                        ✨ <strong>Novedad 2024:</strong> {art.clave2024}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-8 text-center bg-slate-50 dark:bg-slate-850 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 space-y-2">
                  <Search className="w-8 h-8 text-slate-400 mx-auto opacity-50" />
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    No se encontraron artículos con el criterio de búsqueda "{searchQuery}".
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setSearchCategory('todos'); }}
                    className="text-xs font-semibold text-emerald-600 hover:underline cursor-pointer"
                  >
                    Restablecer filtros de búsqueda
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: COMPARATIVA 2012 VS 2024 */}
        {activeTab === 'comparativa' && (
          <div className="pt-6 space-y-6">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-1 text-xs">
              <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>¿Por qué se expidió el Acuerdo 009 de 2024?</span>
              </span>
              <p className="text-slate-600 dark:text-slate-300">
                El SENA actualizó su reglamento tras 12 años del Acuerdo 007 de 2012 para responder a las nuevas realidades de la Inteligencia Artificial, la salud mental, el enfoque de género, la virtualidad total y las garantías constitucionales del debido proceso.
              </p>
            </div>

            <div className="space-y-4">
              {COMPARATIVA_2012_VS_2024.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3"
                >
                  <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-mono">
                      0{idx + 1}
                    </span>
                    <span>{item.tema}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-white dark:bg-slate-900 border border-red-200 dark:border-red-950 rounded-lg space-y-1">
                      <span className="font-bold text-red-700 dark:text-red-400 flex items-center gap-1">
                        <span>Anterior: Acuerdo 007 de 2012</span>
                      </span>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.acuerdo2012}
                      </p>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-950 rounded-lg space-y-1">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <span>Vigente: Acuerdo 009 de 2024</span>
                      </span>
                      <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                        {item.acuerdo2024}
                      </p>
                    </div>
                  </div>

                  <div className="text-[11px] text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-900/40">
                    <strong>Impacto Formativo:</strong> {item.impacto}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: MICRO-CASOS DE APLICACIÓN */}
        {activeTab === 'casos' && (
          <div className="pt-6 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                Comprobación de Apropiación
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Dilemas del Aprendiz bajo el Acuerdo 009 de 2024
              </h3>
            </div>

            <div className="space-y-6">
              {miniCasos.map(caso => {
                const selected = selectedCaseAnswers[caso.id];

                return (
                  <div
                    key={caso.id}
                    className="p-5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-mono">
                        Dilema Jurídico Formativo
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                        {caso.titulo}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {caso.hecho}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                        {caso.pregunta}
                      </div>

                      <div className="space-y-2">
                        {caso.opciones.map((opt, oIdx) => {
                          const isPicked = selected === oIdx;

                          return (
                            <button
                              key={oIdx}
                              onClick={() => setSelectedCaseAnswers(prev => ({ ...prev, [caso.id]: oIdx }))}
                              className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-start gap-2.5 ${
                                isPicked
                                  ? opt.correcta
                                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-white font-medium'
                                    : 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-950 dark:text-white font-medium'
                                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                              }`}
                            >
                              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span className="flex-1">{opt.texto}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {selected !== undefined && (
                      <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
                        caso.opciones[selected].correcta
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 text-emerald-900 dark:text-emerald-200'
                          : 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 text-rose-900 dark:text-rose-200'
                      }`}>
                        <strong>Dictamen Formativo: </strong>
                        {caso.opciones[selected].retro}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Next button */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Apropiación plena del <strong>Acuerdo 009 de 2024</strong> (Diario Oficial No. 52.947)
          </div>

          <button
            onClick={handleFinish}
            className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs self-stretch sm:self-auto"
          >
            <span>Completar Módulo y Continuar</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
