import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Briefcase, Rocket, Microscope, Building, GraduationCap, Award, HelpCircle } from 'lucide-react';
import { PRODUCTIVE_ALTERNATIVES } from '../data/inductionData';
import { ProductiveAlternative } from '../types/induction';

interface ModuleFPIProps {
  onCompleteModule: (moduleId: string) => void;
  isCompleted: boolean;
  onNext: () => void;
}

export const ModuleFPI: React.FC<ModuleFPIProps> = ({
  onCompleteModule,
  isCompleted,
  onNext
}) => {
  const [selectedAlternative, setSelectedAlternative] = useState<ProductiveAlternative>(PRODUCTIVE_ALTERNATIVES[0]);
  const [diagnosticAnswer, setDiagnosticAnswer] = useState<string | null>(null);

  const getAlternativeIcon = (name: string) => {
    switch (name) {
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Microscope': return <Microscope className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Building': return <Building className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      default: return <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  const handleFinish = () => {
    onCompleteModule('fpi');
    onNext();
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div>
            <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase mb-1">
              Módulo 2 · Pedagogía Institucional
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Formación Profesional Integral (FPI) y Etapas
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 max-w-2xl">
              Aprende cómo funciona el modelo por competencias del SENA, la transición de la Etapa Lectiva a la Etapa Productiva y las modalidades legales para graduarte.
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

        {/* FPI Pillars Grid */}
        <div className="pt-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Pilar 1</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Saber (Conocimiento)</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Fundamentos científicos, principios técnicos, conceptos de ingeniería y normatividad vigente aplicada al sector.
              </p>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Pilar 2</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Saber Hacer (Destreza Técnica)</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Práctica real en talleres, laboratorios y proyectos formativos aplicando tecnologías modernas y herramientas productivas.
              </p>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Pilar 3</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Saber Ser & Convivir (Actitud)</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ética profesional, trabajo colaborativo, liderazgo social, comunicación asertiva y respeto ambiental.
              </p>
            </div>
          </div>

          {/* Lectiva vs Productiva Comparison Bar */}
          <div className="p-6 bg-emerald-950 dark:bg-slate-950 text-white rounded-2xl space-y-4 border border-emerald-900/60 dark:border-slate-800">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Ruta Formativa del Aprendiz
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs">
                    1
                  </div>
                  <h3 className="text-lg font-bold">Etapa Lectiva (Apropiación)</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Desarrollada en los ambientes de aprendizaje del Centro SENA y en la plataforma virtual Zajuna.
                  Se compone de <strong>Guías de Aprendizaje</strong>, actividades prácticas, trabajo por proyectos y alcance paulatino de los Resultados de Aprendizaje (RAP).
                </p>
              </div>

              <div className="space-y-3 lg:border-l lg:border-slate-800 lg:pl-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs">
                    2
                  </div>
                  <h3 className="text-lg font-bold">Etapa Productiva (Aplicación Real)</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  El aprendiz aplica sus competencias en el entorno productivo real durante un periodo de 6 meses (para técnicos y tecnólogos).
                  Cuenta con el acompañamiento de un <strong>Instructor de Seguimiento</strong> asignado por el Centro.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Stage Visualizer & Recommender */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
            {/* Left: Alternativas Selector */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>Alternativas de Etapa Productiva</span>
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400">Haz clic para ver detalles</span>
              </div>

              <div className="space-y-2">
                {PRODUCTIVE_ALTERNATIVES.map((alt) => (
                  <button
                    key={alt.id}
                    onClick={() => setSelectedAlternative(alt)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      selectedAlternative.id === alt.id
                        ? 'bg-emerald-50/90 dark:bg-emerald-950/60 border-emerald-500 ring-1 ring-emerald-500 shadow-2xs'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shrink-0">
                        {getAlternativeIcon(alt.iconName)}
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {alt.title}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {alt.idealFor}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Practical Image */}
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 aspect-16/9 relative">
                <img
                  src="/src/assets/images/sena_productive_stage_1791319811051.jpg"
                  alt="Aprendiz en etapa productiva"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-3 text-white text-[11px]">
                  Experiencia práctica real en empresas e industrias colombianas.
                </div>
              </div>
            </div>

            {/* Right: Selected Alternative Inspector & Recommender Diagnostic */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-600 text-white rounded-xl">
                    {getAlternativeIcon(selectedAlternative.iconName)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase">
                      Detalle de la Alternativa
                    </div>
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                      {selectedAlternative.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedAlternative.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-white dark:bg-slate-900/90 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Requisitos Clave:</div>
                    <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4">
                      {selectedAlternative.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white dark:bg-slate-900/90 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="text-xs font-bold text-emerald-900 dark:text-emerald-400">Beneficios para el Aprendiz:</div>
                    <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4">
                      {selectedAlternative.benefits.map((ben, i) => (
                        <li key={i}>{ben}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Interactive Quick Recommender */}
              <div className="p-5 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                  <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>¿Cuál alternativa se adapta mejor a tu perfil?</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Selecciona tu situación actual para ver la recomendación inmediata:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => {
                      setDiagnosticAnswer('empresa');
                      setSelectedAlternative(PRODUCTIVE_ALTERNATIVES[0]);
                    }}
                    className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                      diagnosticAnswer === 'empresa'
                        ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-900 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    "Quiero patrocinio mensual en una empresa"
                  </button>

                  <button
                    onClick={() => {
                      setDiagnosticAnswer('trabajo');
                      setSelectedAlternative(PRODUCTIVE_ALTERNATIVES[1]);
                    }}
                    className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                      diagnosticAnswer === 'trabajo'
                        ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-900 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    "Ya trabajo en el sector y coincide con mis estudios"
                  </button>

                  <button
                    onClick={() => {
                      setDiagnosticAnswer('emprender');
                      setSelectedAlternative(PRODUCTIVE_ALTERNATIVES[2]);
                    }}
                    className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                      diagnosticAnswer === 'emprender'
                        ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-900 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    "Tengo una idea innovadora y quiero crear empresa"
                  </button>

                  <button
                    onClick={() => {
                      setDiagnosticAnswer('investigar');
                      setSelectedAlternative(PRODUCTIVE_ALTERNATIVES[3]);
                    }}
                    className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                      diagnosticAnswer === 'investigar'
                        ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-900 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    "Quiero investigar en laboratorios y tecnología"
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Next button */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Apropiación de etapas de formación profesional
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
