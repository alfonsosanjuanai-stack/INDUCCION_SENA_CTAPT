import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/inductionData';
import { CheckCircle2, XCircle, AlertCircle, RefreshCw, ChevronRight, Award } from 'lucide-react';

interface CaseSimulatorProps {
  onCompleteModule: (moduleId: string) => void;
  isCompleted: boolean;
  onNext: () => void;
}

export const CaseSimulator: React.FC<CaseSimulatorProps> = ({
  onCompleteModule,
  isCompleted,
  onNext
}) => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [completedCases, setCompletedCases] = useState<string[]>([]);

  const activeCase = CASE_STUDIES[currentCaseIndex];

  const handleSelectOption = (optionId: string) => {
    if (submitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    setSubmitted(true);

    const chosenOption = activeCase.options.find((o) => o.id === selectedOptionId);
    if (chosenOption && chosenOption.isCorrect) {
      if (!completedCases.includes(activeCase.id)) {
        const nextCompleted = [...completedCases, activeCase.id];
        setCompletedCases(nextCompleted);
        if (nextCompleted.length === CASE_STUDIES.length) {
          onCompleteModule('simulador');
        }
      }
    }
  };

  const handleNextCase = () => {
    setSelectedOptionId(null);
    setSubmitted(false);
    if (currentCaseIndex < CASE_STUDIES.length - 1) {
      setCurrentCaseIndex(currentCaseIndex + 1);
    } else {
      setCurrentCaseIndex(0);
    }
  };

  const handleReset = () => {
    setSelectedOptionId(null);
    setSubmitted(false);
  };

  const selectedOptionObj = activeCase.options.find((o) => o.id === selectedOptionId);

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div>
            <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase mb-1">
              Simulador Interactivo de Convivencia y Reglamento
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Toma de Decisiones y Dilemas del Aprendiz
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 max-w-2xl">
              Enfrenta situaciones reales que ocurren en los centros de formación y pon a prueba tu criterio ético y conocimiento del Reglamento del Aprendiz (Acuerdo 009 de 2024).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
              Casos superados: <strong className="text-slate-900 dark:text-white">{completedCases.length}</strong> / {CASE_STUDIES.length}
            </span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Superado</span>
              </span>
            )}
          </div>
        </div>

        {/* Case Stepper Indicators */}
        <div className="pt-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            {CASE_STUDIES.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => {
                  setCurrentCaseIndex(idx);
                  setSelectedOptionId(null);
                  setSubmitted(false);
                }}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentCaseIndex === idx
                    ? 'bg-slate-900 dark:bg-emerald-600 text-white ring-2 ring-emerald-500'
                    : completedCases.includes(c.id)
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400">
            Caso {currentCaseIndex + 1} de {CASE_STUDIES.length}
          </div>
        </div>

        {/* Active Case Content */}
        <div className="pt-6 space-y-6">
          <div className="p-6 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide">
              <AlertCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Situación Problemática</span>
            </div>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">
              {activeCase.title}
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {activeCase.scenario}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
              ¿Cuál es la conducta y consecuencia correcta según el reglamento?
            </div>

            <div className="space-y-2.5">
              {activeCase.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                let optionStyle = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 dark:bg-slate-800/90 hover:border-slate-300 dark:hover:border-slate-600';

                if (isSelected && !submitted) {
                  optionStyle = 'border-emerald-600 dark:border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/60 ring-1 ring-emerald-600';
                } else if (submitted) {
                  if (opt.isCorrect) {
                    optionStyle = 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 ring-1 ring-emerald-600';
                  } else if (isSelected && !opt.isCorrect) {
                    optionStyle = 'border-rose-400 dark:border-rose-600 bg-rose-50 dark:bg-rose-950/60 ring-1 ring-rose-400';
                  } else {
                    optionStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={submitted}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {submitted ? (
                        opt.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        ) : isSelected ? (
                          <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600" />
                        )
                      ) : (
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300 dark:border-slate-600'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      {opt.text}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Section when submitted */}
          {submitted && selectedOptionObj && (
            <div
              className={`p-5 rounded-xl border space-y-2 ${
                selectedOptionObj.isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-950 dark:text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                {selectedOptionObj.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>¡Análisis Jurídico Correcto!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span>Análisis Erróneo o Incompleto</span>
                  </>
                )}
              </div>

              <p className="text-xs sm:text-sm leading-relaxed">
                {selectedOptionObj.explanation}
              </p>

              <div className="text-[11px] font-semibold pt-1 border-t border-slate-200/40 dark:border-slate-700/60">
                Sustento Normativo: {selectedOptionObj.regulationArticle}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <div>
              {submitted && !selectedOptionObj?.isCorrect && (
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reintentar este caso</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {!submitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={!selectedOptionId}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors cursor-pointer"
                >
                  Confirmar Decisión
                </button>
              ) : (
                <button
                  onClick={handleNextCase}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Siguiente Caso</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Final Completion Banner */}
        {completedCases.length >= CASE_STUDIES.length && (
          <div className="mt-8 p-5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>¡Excelente labor! Has resuelto todos los casos del simulador</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Demostraste un dominio claro de los límites éticos y normativos del reglamento del aprendiz.
              </p>
            </div>

            <button
              onClick={onNext}
              className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Ir a Evaluación Final y Certificación
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
