import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Network } from 'lucide-react';
import { ApprenticeProfile } from '../types/induction';

interface HeroSectionProps {
  profile: ApprenticeProfile;
  onStartJourney: () => void;
  onOpenCard: () => void;
  onOpenEcosystem: () => void;
  progressPercentage: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onStartJourney,
  onOpenCard,
  onOpenEcosystem,
  progressPercentage
}) => {

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
              <span>Inducción Institucional SENA 2026</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-slate-500 dark:text-slate-400 font-normal">Formación Profesional Integral</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight text-balance leading-tight">
              Bienvenido al SENA: Donde Colombia Aprende y Transforma su Futuro
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Inicia tu viaje como aprendiz. Conoce la mística institucional, los símbolos de nuestra patria,
              el reglamento que rige nuestra convivencia, las oportunidades de bienestar y las etapas para titularte con excelencia.
            </p>

            {/* Personalized Apprentice Banner */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Aprendiz Activo · Ficha <span className="font-mono text-slate-700 dark:text-slate-300">{profile.fichaNumber}</span>
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {profile.fullName}
                </div>
                <div className="text-xs text-emerald-700 dark:text-emerald-400 truncate max-w-md">
                  {profile.programName}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
                <button
                  onClick={onOpenCard}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700/80 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg shadow-2xs transition-colors cursor-pointer"
                >
                  Personalizar Datos
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartJourney}
                className="px-6 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Comenzar Proceso de Inducción</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenEcosystem}
                className="px-4 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 border border-slate-300 dark:border-slate-700 rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <Network className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Mapa del Ecosistema Digital</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 px-3 py-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Certificado oficial descargable al finalizar</span>
              </div>
            </div>

            {/* Institutional Trust Markers */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="font-semibold text-slate-700 dark:text-slate-200">33 Regionales</span>
              <span aria-hidden="true">·</span>
              <span>117 Centros de Formación</span>
              <span aria-hidden="true">·</span>
              <span>Educación 100% Gratuita</span>
              <span aria-hidden="true">·</span>
              <span>Fundado en 1957</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Institutional Asset */}
          <div className="lg:col-span-5 relative space-y-3">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 dark:border-slate-700/80 bg-slate-100 dark:bg-slate-800 aspect-16/10 lg:aspect-4/3 transition-all duration-300">
              <img
                src="/src/assets/images/sena_digital_ecosystem_holo_1791322968657.jpg"
                alt="Ecosistema tecnológico y formación del aprendiz SENA"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-300 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Red Tecnológica de Servidores, Zajuna LMS y Sofia Plus</span>
                </div>
                <p className="text-sm font-semibold text-slate-100">
                  "Toda la infraestructura tecnológica del Estado al servicio de tu talento y formación integral."
                </p>
                <span className="text-xs text-slate-300 mt-1">
                  Ecosistema de Formación Profesional 4.0 · SENA Colombia
                </span>
              </div>
            </div>

            {/* Quick Floating Induction Progress Card */}
            <div className="p-3 bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs flex items-center justify-between">
              <div className="text-xs">
                <div className="font-semibold text-slate-900 dark:text-white">Estado de tu Inducción</div>
                <div className="text-slate-500 dark:text-slate-400">Progreso formativo: <strong className="text-emerald-700 dark:text-emerald-400">{progressPercentage}%</strong></div>
              </div>
              <div className="w-28 bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-emerald-600 dark:bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
