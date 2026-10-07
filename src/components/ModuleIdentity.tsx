import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, CheckCircle2, ChevronRight, Shield, Flag, Compass, Award } from 'lucide-react';
import { SYMBOL_HOTSPOTS, HYMN_STANZAS, INSTITUTIONAL_VALUES } from '../data/inductionData';
import { senaHymnAudio } from '../utils/audioHymn';

interface ModuleIdentityProps {
  onCompleteModule: (moduleId: string) => void;
  isCompleted: boolean;
  onNext: () => void;
}

export const ModuleIdentity: React.FC<ModuleIdentityProps> = ({
  onCompleteModule,
  isCompleted,
  onNext
}) => {
  const [selectedHotspot, setSelectedHotspot] = useState<string>('caduceo');
  const [activeTab, setActiveTab] = useState<'historia' | 'mision' | 'simbolos' | 'himno'>('historia');
  
  // Audio hymn state
  const [isPlayingHymn, setIsPlayingHymn] = useState(false);
  const [currentHymnStanzaIndex, setCurrentHymnStanzaIndex] = useState(0);

  useEffect(() => {
    senaHymnAudio.setCallbacks(
      () => {
        const stanza = senaHymnAudio.getCurrentStanza();
        setCurrentHymnStanzaIndex(stanza);
      },
      (playing) => {
        setIsPlayingHymn(playing);
      }
    );

    return () => {
      senaHymnAudio.pause();
    };
  }, []);

  const togglePlayHymn = () => {
    if (isPlayingHymn) {
      senaHymnAudio.pause();
    } else {
      senaHymnAudio.play();
    }
  };

  const resetHymn = () => {
    senaHymnAudio.stop();
    setCurrentHymnStanzaIndex(0);
  };

  const handleFinish = () => {
    onCompleteModule('identidad');
    onNext();
  };

  const currentHotspotData = SYMBOL_HOTSPOTS.find((h) => h.id === selectedHotspot) || SYMBOL_HOTSPOTS[0];

  return (
    <div className="space-y-8">
      {/* Module Title & Introduction */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div>
            <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase mb-1">
              Módulo 1 · Apropiación Institucional
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Identidad, Historia y Mística SENA
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 max-w-2xl">
              Descubre los orígenes del SENA, el significado de sus insignias patrias, sus valores y el compromiso social que transforma a Colombia desde 1957.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isCompleted && (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-4 h-4" />
                <span>Módulo Aprobado</span>
              </span>
            )}
          </div>
        </div>

        {/* Inner Navigation Tabs */}
        <div className="flex items-center gap-2 pt-6 border-b border-slate-100 dark:border-slate-800 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('historia')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'historia'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            01. Origen e Historia
          </button>
          <button
            onClick={() => setActiveTab('mision')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'mision'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            02. Misión, Visión & Valores
          </button>
          <button
            onClick={() => setActiveTab('simbolos')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'simbolos'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            03. Símbolos Institucionales
          </button>
          <button
            onClick={() => setActiveTab('himno')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'himno'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            04. Himno Interactivo
          </button>
        </div>

        {/* Tab 1: Historia */}
        {activeTab === 'historia' && (
          <div className="pt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  La gran visión de Rodolfo Martínez Tono (1957)
                </h3>
                <p>
                  El <strong>Servicio Nacional de Aprendizaje (SENA)</strong> nació el <strong>21 de junio de 1957</strong> durante el gobierno de la Junta Militar, mediante el <strong>Decreto Ley 118</strong>. Su creación fue fruto de la iniciativa del ilustre cartagenero <strong>Rodolfo Martínez Tono</strong>, quien concibió una entidad tripartita (trabajadores, empleadores y Estado) dedicada a calificar laboralmente a la fuerza trabajadora del país.
                </p>
                <p>
                  Desde sus inicios en salones prestados de la Universidad de América en Bogotá, el SENA comenzó a capacitar obreros en mecánica, construcción y comercio. En menos de tres años, la entidad ya contaba con sedes en las principales ciudades de Colombia.
                </p>

                <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 rounded-xl space-y-2">
                  <div className="font-bold text-emerald-950 dark:text-emerald-300 text-xs uppercase tracking-wide">
                    Evolución Clave en el Tiempo
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-100">1957 - 1970</div>
                      <div className="text-slate-600 dark:text-slate-400">Fundación, centros pioneros y consolidación de la formación tripartita.</div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-100">1980 - 2000</div>
                      <div className="text-slate-600 dark:text-slate-400">Llegada de la computación, Ley 789 de 2002 y contrato de aprendizaje.</div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-100">Hoy (2026)</div>
                      <div className="text-slate-600 dark:text-slate-400">SENNOVA, TecnoParques, plataformas virtuales como Zajuna y formación en IA.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase">
                  <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Dato Curioso Institucional</span>
                </div>
                <blockquote className="italic text-xs text-slate-700 dark:text-slate-300 border-l-2 border-emerald-600 dark:border-emerald-500 pl-3">
                  "El nombre SENA fue propuesto por Rodolfo Martínez Tono en homenaje al río Sena en París, Francia, donde el fundador se inspiró estudiando modelos europeos de formación técnica."
                </blockquote>
                <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="font-semibold text-slate-900 dark:text-slate-100">Presencia Nacional:</div>
                  <div>• 33 Direcciones Regionales en todos los departamentos.</div>
                  <div>• 117 Centros de Formación Profesional.</div>
                  <div>• Cientos de Aulas Móviles terrestres y fluviales.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Misión, Visión y Valores */}
        {activeTab === 'mision' && (
          <div className="pt-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide">
                  <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Misión Oficial</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  El SENA está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la <strong>formación profesional integral</strong> para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.
                </p>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide">
                  <Flag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Visión Oficial</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  El SENA se consolidará como una entidad referente nacional e internacional de formación profesional integral, reconocida por su innovación, pertinencia con las demandas del sector productivo, inclusión social y su aporte a la paz y la soberanía alimentaria y tecnológica de Colombia.
                </p>
              </div>
            </div>

            {/* Institutional Values Grid */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Los 7 Valores Éticos del Aprendiz SENA
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {INSTITUTIONAL_VALUES.map((val) => (
                  <div
                    key={val.name}
                    className="p-4 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-emerald-300 dark:hover:border-emerald-500 transition-colors space-y-2 shadow-2xs"
                  >
                    <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
                      <span>{val.name}</span>
                      <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">
                      {val.description}
                    </p>
                    <div className="text-[11px] text-emerald-800 dark:text-emerald-400 font-medium italic pt-1">
                      "{val.quote}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Símbolos Institucionales */}
        {activeTab === 'simbolos' && (
          <div className="pt-6 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Shield visual with interactive Hotspots */}
              <div className="lg:col-span-6 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md bg-slate-100 dark:bg-slate-800 aspect-4/3">
                  <img
                    src="/src/assets/images/sena_symbols_shield_1791319799279.jpg"
                    alt="Escudo y Símbolos del SENA"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Interactive Hotspot Buttons overlay */}
                  <div className="absolute inset-0 bg-slate-900/10 pointer-events-none" />

                  {/* Hotspot 1: Caduceo */}
                  <button
                    onClick={() => setSelectedHotspot('caduceo')}
                    className={`absolute top-[28%] right-[22%] px-2.5 py-1 text-[11px] font-bold rounded-lg shadow-md transition-all cursor-pointer ${
                      selectedHotspot === 'caduceo'
                        ? 'bg-emerald-600 text-white ring-2 ring-white scale-105'
                        : 'bg-white/95 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    1. Caduceo
                  </button>

                  {/* Hotspot 2: Piñón */}
                  <button
                    onClick={() => setSelectedHotspot('pinon')}
                    className={`absolute top-[52%] left-[30%] px-2.5 py-1 text-[11px] font-bold rounded-lg shadow-md transition-all cursor-pointer ${
                      selectedHotspot === 'pinon'
                        ? 'bg-emerald-600 text-white ring-2 ring-white scale-105'
                        : 'bg-white/95 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    2. Piñón Industrial
                  </button>

                  {/* Hotspot 3: Café */}
                  <button
                    onClick={() => setSelectedHotspot('cafe')}
                    className={`absolute bottom-[20%] right-[32%] px-2.5 py-1 text-[11px] font-bold rounded-lg shadow-md transition-all cursor-pointer ${
                      selectedHotspot === 'cafe'
                        ? 'bg-emerald-600 text-white ring-2 ring-white scale-105'
                        : 'bg-white/95 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    3. Café y Campo
                  </button>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
                  Haz clic en los puntos interactivos del escudo para descubrir qué sector económico representa cada elemento.
                </div>
              </div>

              {/* Hotspot Details Card */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-6 bg-slate-50 dark:bg-slate-800/80 border border-emerald-200/80 dark:border-emerald-800/80 rounded-2xl space-y-3">
                  <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                    {currentHotspotData.sector}
                  </div>
                  <h4 className="text-lg font-bold text-slate-950 dark:text-white">
                    {currentHotspotData.name}
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {currentHotspotData.meaning}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-2 border-t border-slate-200 dark:border-slate-700">
                    {currentHotspotData.details}
                  </p>
                </div>

                {/* Secondary symbols */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Flag className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>La Bandera del SENA</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      De color blanco puro que simboliza la paz, tranquilidad y libertad, llevando en el centro el escudo institucional verde.
                    </p>
                  </div>

                  <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>El Logosímbolo</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Representa un ser humano que camina firme hacia adelante en los senderos del futuro y la autorrealización personal y técnica.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Himno del SENA */}
        {activeTab === 'himno' && (
          <div className="pt-6 space-y-6">
            {/* Audio Controls Bar */}
            <div className="p-4 sm:p-5 bg-slate-900 dark:bg-slate-950 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <Volume2 className="w-4 h-4" />
                  <span>Sintetizador Ceremonial Web Audio</span>
                </div>
                <div className="text-sm font-bold text-white">
                  Himno Oficial del SENA (Letra: Luis Alfredo Sánchez / Música: Daniel Marlez)
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlayHymn}
                  className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
                    isPlayingHymn
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {isPlayingHymn ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pausar Melodía</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Reproducir Melodía</span>
                    </>
                  )}
                </button>

                <button
                  onClick={resetHymn}
                  className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                  title="Reiniciar Himno"
                  aria-label="Reiniciar Himno"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Hymn Stanzas Karaoke Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {HYMN_STANZAS.map((stanza) => {
                const isCurrent = isPlayingHymn && currentHymnStanzaIndex === (stanza.type === 'CORO' ? 0 : 1);

                return (
                  <div
                    key={stanza.id}
                    className={`p-5 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-emerald-50/90 dark:bg-emerald-950/60 border-emerald-500 shadow-sm ring-1 ring-emerald-500'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3 text-xs font-bold">
                      <span className={stanza.type === 'CORO' ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}>
                        {stanza.type} {stanza.number ? `· ${stanza.number}` : ''}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] text-emerald-800 dark:text-emerald-300 font-semibold animate-pulse">
                          ● Cantando ahora
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 font-serif text-sm text-slate-800 dark:text-slate-200 leading-relaxed italic">
                      {stanza.lines.map((line, lineIdx) => (
                        <div key={lineIdx}>{line}</div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer completion action */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Apropiación de símbolos y valores del aprendiz
          </div>

          <button
            onClick={handleFinish}
            className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Completar Módulo y Continuar</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
