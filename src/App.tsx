/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ModuleIdentity } from './components/ModuleIdentity';
import { ModuleFPI } from './components/ModuleFPI';
import { ModuleReglamento } from './components/ModuleReglamento';
import { ModuleBienestar } from './components/ModuleBienestar';
import { CaseSimulator } from './components/CaseSimulator';
import { QuizCertification } from './components/QuizCertification';
import { DigitalEcosystemDiagram } from './components/DigitalEcosystemDiagram';
import { ApprenticeCardModal } from './components/ApprenticeCardModal';
import { GlossaryModal } from './components/GlossaryModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { Footer } from './components/Footer';
import { ApprenticeProfile } from './types/induction';
import { CheckCircle2, ChevronRight, Award, Compass, BookOpen, Shield, Heart, Network } from 'lucide-react';

const STORAGE_KEY = 'sena_induction_apprentice_v1';
const THEME_STORAGE_KEY = 'sena_induction_theme';

const DEFAULT_PROFILE: ApprenticeProfile = {
  fullName: 'Valentina Gómez Restrepo',
  documentType: 'CC',
  documentNumber: '1020491820',
  programName: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
  fichaNumber: '2894512',
  regional: 'Regional Distrito Capital (Bogotá)',
  trainingCenter: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
  completedModules: ['identidad'],
  examScore: null,
  certifiedAt: null
};

export default function App() {
  const [profile, setProfile] = useState<ApprenticeProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEFAULT_PROFILE;
  });

  // Dark Mode State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [isBlurTransitioning, setIsBlurTransitioning] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [isCardModalOpen, setIsCardModalOpen] = useState<boolean>(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState<boolean>(false);

  // Sync dark mode class with DOM
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Save profile changes to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // safe fallback
    }
  }, [profile]);

  // Handle Dark Mode Toggle with smooth blur transition
  const handleToggleDarkMode = () => {
    // 1. Activate blur transition
    setIsBlurTransitioning(true);

    // 2. Perform switch
    setTimeout(() => {
      setDarkMode((prev) => {
        const next = !prev;
        try {
          localStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light');
        } catch {
          // ignore
        }
        if (next) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return next;
      });
    }, 100);

    // 3. Resolve blur smoothly
    setTimeout(() => {
      setIsBlurTransitioning(false);
    }, 450);
  };

  const handleUpdateProfile = (updated: Partial<ApprenticeProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...updated
    }));
  };

  const handleCompleteModule = (moduleId: string) => {
    setProfile((prev) => {
      if (prev.completedModules.includes(moduleId)) {
        return prev;
      }
      return {
        ...prev,
        completedModules: [...prev.completedModules, moduleId]
      };
    });
  };

  const handleCertificationApproved = (score: number) => {
    setProfile((prev) => ({
      ...prev,
      examScore: score,
      certifiedAt: new Date().toISOString(),
      completedModules: Array.from(new Set([...prev.completedModules, 'evaluacion']))
    }));
  };

  // 6 total induction stages: identidad, fpi, ecosistema, reglamento, bienestar, simulador
  const allModules = ['identidad', 'fpi', 'ecosistema', 'reglamento', 'bienestar', 'simulador'];
  const completedCount = allModules.filter((m) => profile.completedModules.includes(m)).length;
  const progressPercentage = Math.round((completedCount / allModules.length) * 100);

  const inductionRouteSteps = [
    {
      id: 'identidad',
      title: 'Módulo 1: Identidad y Símbolos',
      subtitle: 'Historia de 1957, Valores y Escudo',
      icon: <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
    },
    {
      id: 'fpi',
      title: 'Módulo 2: Modelo Pedagógico FPI',
      subtitle: 'Etapa Lectiva y Productiva',
      icon: <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
    },
    {
      id: 'ecosistema',
      title: 'Ecosistema Tecnológico Digital',
      subtitle: 'Servidores, Zajuna LMS y Red Cloud',
      icon: <Network className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
    },
    {
      id: 'reglamento',
      title: 'Módulo 3: Reglamento del Aprendiz',
      subtitle: 'Derechos, Deberes y Debido Proceso',
      icon: <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
    },
    {
      id: 'bienestar',
      title: 'Módulo 4: Bienestar y Apoyos',
      subtitle: 'Apoyo Sostenimiento, Salud y APE',
      icon: <Heart className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
    },
    {
      id: 'simulador',
      title: 'Módulo 5: Simulador de Casos',
      subtitle: 'Dilemas Éticos y Decisiones Reales',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
    },
    {
      id: 'evaluacion',
      title: 'Certificación de Inducción',
      subtitle: 'Evaluación Final y Carné Oficial',
      icon: <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative`}>
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCard={() => setIsCardModalOpen(true)}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
        progressPercentage={progressPercentage}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Main Content Area with Blur Transition Filter */}
      <main
        className={`flex-1 transition-[filter,opacity] duration-450 ease-out ${
          isBlurTransitioning ? 'filter blur-[7px] opacity-85 scale-[0.998]' : 'filter blur-0 opacity-100 scale-100'
        }`}
      >
        {activeTab === 'inicio' && (
          <div>
            <HeroSection
              profile={profile}
              onStartJourney={() => setActiveTab('identidad')}
              onOpenCard={() => setIsCardModalOpen(true)}
              onOpenEcosystem={() => setActiveTab('ecosistema')}
              progressPercentage={progressPercentage}
            />

            {/* Induction Roadmap Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                      Ruta Formativa de Inducción
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white mt-1">
                      Los 5 Ejes de la Apropiación Institucional
                    </h2>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Completa cada módulo para habilitar tu certificación oficial
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {inductionRouteSteps.map((step, idx) => {
                    const isDone = profile.completedModules.includes(step.id);

                    return (
                      <div
                        key={step.id}
                        onClick={() => setActiveTab(step.id)}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group hover:shadow-md ${
                          isDone
                            ? 'bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-800 ring-1 ring-emerald-500/20'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/60 transition-colors">
                              {step.icon}
                            </div>
                            {isDone ? (
                              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Aprobado</span>
                              </span>
                            ) : (
                              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                                Pendiente
                              </span>
                            )}
                          </div>

                          <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                              Etapa 0{idx + 1}
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                              {step.title}
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                              {step.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          <span>{isDone ? 'Revisar módulo' : 'Iniciar módulo'}</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Individual Modules */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'identidad' && (
            <ModuleIdentity
              onCompleteModule={handleCompleteModule}
              isCompleted={profile.completedModules.includes('identidad')}
              onNext={() => setActiveTab('fpi')}
            />
          )}

          {activeTab === 'fpi' && (
            <ModuleFPI
              onCompleteModule={handleCompleteModule}
              isCompleted={profile.completedModules.includes('fpi')}
              onNext={() => setActiveTab('ecosistema')}
            />
          )}

          {activeTab === 'ecosistema' && (
            <DigitalEcosystemDiagram
              onCompleteModule={handleCompleteModule}
              isCompleted={profile.completedModules.includes('ecosistema')}
              onNext={() => setActiveTab('reglamento')}
            />
          )}

          {activeTab === 'reglamento' && (
            <ModuleReglamento
              onCompleteModule={handleCompleteModule}
              isCompleted={profile.completedModules.includes('reglamento')}
              onNext={() => setActiveTab('bienestar')}
            />
          )}

          {activeTab === 'bienestar' && (
            <ModuleBienestar
              onCompleteModule={handleCompleteModule}
              isCompleted={profile.completedModules.includes('bienestar')}
              onNext={() => setActiveTab('simulador')}
            />
          )}

          {activeTab === 'simulador' && (
            <CaseSimulator
              onCompleteModule={handleCompleteModule}
              isCompleted={profile.completedModules.includes('simulador')}
              onNext={() => setActiveTab('evaluacion')}
            />
          )}

          {activeTab === 'evaluacion' && (
            <QuizCertification
              profile={profile}
              onCertificationApproved={handleCertificationApproved}
              onOpenCard={() => setIsCardModalOpen(true)}
            />
          )}
        </div>
      </main>

      {/* Global Modals */}
      <ApprenticeCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
      />

      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      {/* Secure Administrator Portal (Protected with PIN, responses audit & private Google Drive sync) */}
      <AdminPortalModal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
      />

      {/* Institutional Footer */}
      <Footer onOpenAdmin={() => setIsAdminPortalOpen(true)} />
    </div>
  );
}
