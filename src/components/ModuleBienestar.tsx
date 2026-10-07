import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Heart, DollarSign, Dumbbell, Palette, Users, Sparkles } from 'lucide-react';

interface ModuleBienestarProps {
  onCompleteModule: (moduleId: string) => void;
  isCompleted: boolean;
  onNext: () => void;
}

export const ModuleBienestar: React.FC<ModuleBienestarProps> = ({
  onCompleteModule,
  isCompleted,
  onNext
}) => {
  const [selectedService, setSelectedService] = useState<'sostenimiento' | 'salud' | 'deporte' | 'emprender' | 'ape'>('sostenimiento');

  const handleFinish = () => {
    onCompleteModule('bienestar');
    onNext();
  };

  const services = [
    {
      id: 'sostenimiento',
      title: 'Apoyo de Sostenimiento (Regular y FIC)',
      category: 'Económico',
      icon: <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      desc: 'Auxilio mensual económico para aprendices en condición de vulnerabilidad socioeconómica (estratos 1 y 2, SISBÉN) durante la etapa lectiva y productiva para mitigar gastos de transporte y sustento.',
      requirements: ['Estar matriculado en programa titulado presencial/virtual.', 'Puntaje SISBÉN dentro de los rangos prioritarios.', 'Rendimiento académico al día sin llamados de atención.']
    },
    {
      id: 'salud',
      title: 'Salud Integral y Acompañamiento Psicosocial',
      category: 'Bienestar',
      icon: <Heart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      desc: 'Servicio de enfermería, primeros auxilios, asesoría en salud sexual y reproductiva, prevención del consumo de sustancias y apoyo psicológico ante dificultades emocionales o familiares.',
      requirements: ['Acceso gratuito e irrestricto para todos los aprendices activos en las sedes.', 'Total confidencialidad en la atención psicosocial.']
    },
    {
      id: 'deporte',
      title: 'Deporte, Arte y Recreación Cultural',
      category: 'Vida en Centro',
      icon: <Dumbbell className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      desc: 'Torneos deportivos zonales y nacionales (fútbol, voleibol, baloncesto, atletismo, ajedrez), grupos de danza, teatro, música y encuentros de líderes aprendices.',
      requirements: ['Inscripción en convocatorias de bienestar.', 'Representación con orgullo en los Juegos Nacionales SENA.']
    },
    {
      id: 'emprender',
      title: 'Fondo Emprender y TecnoParques',
      category: 'Innovación',
      icon: <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      desc: 'El fondo de capital semilla no reembolsable más grande de Colombia para financiar planes de negocio de aprendices y egresados, sumado a laboratorios de prototipado 3D, robótica y biotecnología.',
      requirements: ['Tener una idea innovadora y formular el plan con asesoría de la Unidad de Emprendimiento SENA.']
    },
    {
      id: 'ape',
      title: 'Agencia Pública de Empleo (APE)',
      category: 'Empleabilidad',
      icon: <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      desc: 'Intermediación laboral pública, gratuita e indiscriminada que conecta las vacantes formales de empresas colombianas con aprendices y egresados calificados.',
      requirements: ['Crear y mantener actualizada la hoja de vida en el aplicativo ape.sena.edu.co.']
    }
  ];

  const currentService = services.find((s) => s.id === selectedService) || services[0];

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div>
            <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase mb-1">
              Módulo 4 · Desarrollo Humano Integral
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Bienestar al Aprendiz y Ecosistema de Oportunidades
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 max-w-2xl">
              El SENA no solo te forma técnicamente, también te apoya económica, social y humanamente para que culmines con éxito tus metas.
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

        {/* 9 Dimensions Summary */}
        <div className="pt-6 space-y-8">
          <div className="p-5 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 rounded-2xl space-y-2">
            <div className="text-xs font-bold text-emerald-950 dark:text-emerald-300 uppercase tracking-wide flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Las Líneas Estratégicas del Plan de Bienestar</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              El Plan Nacional Integral de Bienestar al Aprendiz acompaña tu permanencia con programas en:
              <strong> Salud Integral</strong>, <strong>Equidad e Inclusión</strong>, <strong>Habilidades Socioemocionales</strong>,
              <strong> Deporte y Recreación</strong>, <strong>Arte y Cultura</strong>, <strong>Liderazgo y Convivencia</strong> y
              <strong> Apoyo Socioeconómico</strong>.
            </p>
          </div>

          {/* Interactive Services Explorer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Buttons list */}
            <div className="lg:col-span-5 space-y-2">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Programas y Servicios Disponibles
              </div>
              {services.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedService(item.id as typeof selectedService)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    selectedService === item.id
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 shadow-2xs ring-1 ring-emerald-500'
                      : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{item.category}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Service Detail Card */}
            <div className="lg:col-span-7 p-6 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-600 text-white rounded-xl">
                  {currentService.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase">
                    {currentService.category}
                  </div>
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                    {currentService.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentService.desc}
              </p>

              <div className="bg-white dark:bg-slate-900/90 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Condiciones y Cómo Acceder:
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4">
                  {currentService.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 italic pt-1">
                Acércate a la oficina de Bienestar al Aprendiz de tu Centro de Formación para conocer las convocatorias vigentes.
              </div>
            </div>
          </div>
        </div>

        {/* Footer Next button */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Apropiación de beneficios de bienestar y permanencia
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
