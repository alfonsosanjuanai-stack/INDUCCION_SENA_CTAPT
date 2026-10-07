import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Printer, 
  Award, 
  ShieldCheck, 
  Timer, 
  Flame, 
  Zap, 
  Trophy, 
  User, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  AlertTriangle, 
  BookOpen, 
  Clock, 
  Scale, 
  Cpu, 
  ShieldAlert, 
  Calendar, 
  HeartHandshake, 
  Medal, 
  Crown,
  ChevronRight,
  TrendingUp,
  FileSpreadsheet,
  Check
} from 'lucide-react';
import { ApprenticeProfile } from '../types/induction';
import { 
  REGLAMENTO_25_QUESTIONS, 
  EVALUATION_SECTIONS, 
  EvaluationQuestion,
  EvaluationSectionConfig 
} from '../data/reglamentoQuizData';
import { 
  recordGamifiedSubmission, 
  getGamifiedLeaderboard, 
  LeaderboardEntry,
  formatDurationMMSS,
  QuestionAnswerDetail
} from '../services/submissionsStore';

interface QuizCertificationProps {
  profile: ApprenticeProfile;
  onCertificationApproved: (score: number) => void;
  onOpenCard: () => void;
}

type QuizPhase = 'registration' | 'testing' | 'results' | 'leaderboard';

export const QuizCertification: React.FC<QuizCertificationProps> = ({
  profile,
  onCertificationApproved,
  onOpenCard
}) => {
  // Phase state
  const [phase, setPhase] = useState<QuizPhase>('registration');

  // Apprentice Registration Form State (Unification with Google Sheet structure)
  const [formData, setFormData] = useState({
    fullName: profile.fullName || 'Valentina Gómez Restrepo',
    documentType: profile.documentType || 'CC',
    documentNumber: profile.documentNumber || '1020491820',
    programName: profile.programName || 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    fichaNumber: profile.fichaNumber || '2894512',
    regional: profile.regional || 'Regional Distrito Capital (Bogotá)',
    trainingCenter: profile.trainingCenter || 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)'
  });

  // Current Question Index (0 to 24)
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);

  // User Answers state: questionId -> selectedOption index
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  
  // Feedback state for current question: 'unanswered' | 'correct' | 'incorrect'
  const [evaluatedStatus, setEvaluatedStatus] = useState<Record<number, boolean>>({});

  // Gamification engine state
  const [gamifiedScore, setGamifiedScore] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [lastPointsEarned, setLastPointsEarned] = useState<{ base: number; speedBonus: number; streakMultiplier: number; total: number } | null>(null);

  // Live Timer State (in seconds)
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Animation trigger states
  const [shakeAnimation, setShakeAnimation] = useState<boolean>(false);
  const [pulseSuccessAnimation, setPulseSuccessAnimation] = useState<boolean>(false);

  // Leaderboard data
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);

  // Final summary calculation
  const totalQuestions = REGLAMENTO_25_QUESTIONS.length;
  const currentQuestion: EvaluationQuestion = REGLAMENTO_25_QUESTIONS[currentQuestionIdx];
  const currentSection = EVALUATION_SECTIONS.find(s => s.id === currentQuestion.sectionId) || EVALUATION_SECTIONS[0];

  // Timer Effect
  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning]);

  // Load Leaderboard on mount
  useEffect(() => {
    setLeaderboard(getGamifiedLeaderboard());
  }, []);

  // Start Exam
  const handleStartExam = (e: React.FormEvent) => {
    e.preventDefault();
    setPhase('testing');
    setIsTimerRunning(true);
    setElapsedSeconds(0);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setEvaluatedStatus({});
    setGamifiedScore(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setQuestionStartTime(Date.now());
  };

  // Handle Option Select (Immediate evaluation & gamification)
  const handleSelectOption = (optionIdx: number) => {
    if (userAnswers[currentQuestion.id] !== undefined) return; // already answered

    const now = Date.now();
    const secondsTaken = Math.max(1, Math.round((now - questionStartTime) / 1000));
    const isCorrect = optionIdx === currentQuestion.correctAnswer;

    // Record answer
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIdx
    }));

    setEvaluatedStatus(prev => ({
      ...prev,
      [currentQuestion.id]: isCorrect
    }));

    if (isCorrect) {
      // SUCCESS LOGIC & GAMIFICATION
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      // Streak multiplier: 1x, 1.2x, 1.5x, 2.0x
      let multiplier = 1.0;
      if (newStreak >= 4) multiplier = 2.0;
      else if (newStreak === 3) multiplier = 1.5;
      else if (newStreak === 2) multiplier = 1.2;

      // Speed bonus: if answered in <= 12 seconds, get up to 60 bonus pts
      let speedBonus = 0;
      if (secondsTaken <= 7) speedBonus = 60;
      else if (secondsTaken <= 15) speedBonus = 35;
      else if (secondsTaken <= 25) speedBonus = 15;

      const basePoints = 200;
      const pointsWon = Math.round(basePoints * multiplier) + speedBonus;

      setGamifiedScore(prev => prev + pointsWon);
      setLastPointsEarned({
        base: basePoints,
        speedBonus,
        streakMultiplier: multiplier,
        total: pointsWon
      });

      // Visual animations
      setPulseSuccessAnimation(true);
      setTimeout(() => setPulseSuccessAnimation(false), 900);

      // Confetti burst for combos
      if (newStreak >= 3) {
        try {
          confetti({
            particleCount: newStreak >= 5 ? 70 : 35,
            spread: 60,
            origin: { y: 0.7 }
          });
        } catch {
          // ignore fallback
        }
      }
    } else {
      // ERROR LOGIC
      setCurrentStreak(0);
      setLastPointsEarned(null);
      setShakeAnimation(true);
      setTimeout(() => setShakeAnimation(false), 600);
    }
  };

  // Next Question
  const handleNextQuestion = () => {
    if (currentQuestionIdx < totalQuestions - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setQuestionStartTime(Date.now());
      setLastPointsEarned(null);
    } else {
      handleFinishExam();
    }
  };

  // Finish Exam & Save Data
  const handleFinishExam = () => {
    setIsTimerRunning(false);

    // Compute results
    let correct = 0;
    const detailedAnswers: QuestionAnswerDetail[] = REGLAMENTO_25_QUESTIONS.map(q => {
      const chosen = userAnswers[q.id] ?? -1;
      const isRight = chosen === q.correctAnswer;
      if (isRight) correct++;
      return {
        questionId: q.id,
        questionText: q.question,
        category: q.sectionName,
        selectedOption: chosen,
        selectedText: chosen >= 0 ? q.options[chosen] || 'Sin responder' : 'Sin responder',
        correctOption: q.correctAnswer,
        correctText: q.options[q.correctAnswer],
        isCorrect: isRight,
        explanation: q.articleCitation
      };
    });

    const finalPercentage = Math.round((correct / totalQuestions) * 100);

    // Completion bonus if passed
    let finalGamifiedScore = gamifiedScore;
    if (finalPercentage >= 80) {
      finalGamifiedScore += 1000; // Passed bonus
    }
    if (correct === totalQuestions) {
      finalGamifiedScore += 2000; // Perfect score bonus
    }

    setGamifiedScore(finalGamifiedScore);

    // Save to unified submission store (matching Google Sheets logic)
    const activeProfile: ApprenticeProfile = {
      ...profile,
      fullName: formData.fullName,
      documentType: formData.documentType as any,
      documentNumber: formData.documentNumber,
      programName: formData.programName,
      fichaNumber: formData.fichaNumber,
      regional: formData.regional,
      trainingCenter: formData.trainingCenter,
      examScore: finalPercentage,
      certifiedAt: finalPercentage >= 80 ? new Date().toISOString() : null
    };

    const submission = recordGamifiedSubmission(
      activeProfile,
      correct,
      totalQuestions,
      finalGamifiedScore,
      elapsedSeconds,
      maxStreak,
      detailedAnswers
    );

    // Update parent certification if approved
    if (finalPercentage >= 80) {
      onCertificationApproved(finalPercentage);
      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch {
        // ignore
      }
    }

    // Refresh Leaderboard and find user rank
    const updatedLeaderboard = getGamifiedLeaderboard();
    setLeaderboard(updatedLeaderboard);
    const myRankIdx = updatedLeaderboard.findIndex(item => item.id === submission.id);
    if (myRankIdx >= 0) {
      setUserRank(myRankIdx + 1);
    }

    setPhase('results');
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  // Section Icon Helper
  const renderSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scale': return <Scale className="w-4 h-4" />;
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'ShieldAlert': return <ShieldAlert className="w-4 h-4" />;
      case 'Calendar': return <Calendar className="w-4 h-4" />;
      case 'HeartHandshake': return <HeartHandshake className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const verificationCode = `SENA-IND-2026-${formData.documentNumber.slice(-4)}-${formData.fichaNumber.slice(-4)}`;
  const currentDateFormatted = new Date().toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const correctAnswersCount = Object.keys(userAnswers).filter(
    qId => userAnswers[Number(qId)] === REGLAMENTO_25_QUESTIONS.find(q => q.id === Number(qId))?.correctAnswer
  ).length;

  const currentScorePercentage = Math.round((correctAnswersCount / totalQuestions) * 100);

  return (
    <div className="space-y-8">

      {/* ========================================================================= */}
      {/* 1. REGISTRATION PHASE: INPUT APPRENTICE DATA BEFORE STARTING              */}
      {/* ========================================================================= */}
      {phase === 'registration' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 max-w-4xl mx-auto transition-all">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
              <Trophy className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Evaluación Gamificada Oficial · Acuerdo 009 de 2024</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
              Certificación de Inducción SENA con Ranking Gamificado
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Ingresa tus datos personales antes de iniciar. Esta evaluación consta de <strong className="text-emerald-700 dark:text-emerald-400">25 preguntas (5 por cada sección del reglamento)</strong>, con refuerzo pedagógico inmediato, cronómetro de velocidad y asignación de puntos para el ranking institucional.
            </p>
          </div>

          {/* 5 Regulation Sections Preview Cards */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Estructura del Examen: 5 Secciones × 5 Preguntas</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Total: 25 Preguntas</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {EVALUATION_SECTIONS.map((sec) => (
                <div 
                  key={sec.id}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                      {renderSectionIcon(sec.iconName)}
                      <span>Sección 0{sec.number}</span>
                    </span>
                    <span className="text-[10px] font-semibold bg-white dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      5 Preguntas
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                    {sec.shortTitle}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {sec.description}
                  </p>
                </div>
              ))}

              {/* Gamification Rules Badge */}
              <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 space-y-1.5 sm:col-span-2 lg:col-span-1">
                <div className="text-[11px] font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>Reglas del Ranking</span>
                </div>
                <div className="text-[11px] text-amber-900 dark:text-amber-200 space-y-1">
                  <div>• <strong>+200 pts</strong> por acierto correcto.</div>
                  <div>• <strong>Multiplicador de Racha:</strong> hasta 2.0x seguidos sin fallar.</div>
                  <div>• <strong>Bono de Velocidad:</strong> +60 pts si respondes rápido y bien.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Apprentice Identification Form */}
          <form onSubmit={handleStartExam} className="space-y-5 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
              <User className="w-4 h-4 text-emerald-600" />
              <span>Verifica o Ingresa tus Datos para el Registro Oficial (Hoja de Cálculo):</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Nombre Completo del Aprendiz: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Ej: Valentina Gómez Restrepo"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1 col-span-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Tipo Doc:
                  </label>
                  <select
                    value={formData.documentType}
                    onChange={(e) => setFormData({ ...formData, documentType: e.target.value as 'CC' | 'TI' | 'CE' | 'PEP' })}
                    className="w-full px-2 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="CC">CC</option>
                    <option value="TI">TI</option>
                    <option value="CE">CE</option>
                    <option value="PEP">PEP</option>
                  </select>
                </div>

                <div className="space-y-1 col-span-2">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Número de Documento: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.documentNumber}
                    onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                    placeholder="1020491820"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Programa de Formación: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.programName}
                  onChange={(e) => setFormData({ ...formData, programName: e.target.value })}
                  placeholder="Tecnólogo en Análisis y Desarrollo de Software"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Número de Ficha: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fichaNumber}
                  onChange={(e) => setFormData({ ...formData, fichaNumber: e.target.value })}
                  placeholder="2894512"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Regional SENA:
                </label>
                <input
                  type="text"
                  value={formData.regional}
                  onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
                  placeholder="Regional Distrito Capital"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Centro de Formación Profesional:
                </label>
                <input
                  type="text"
                  value={formData.trainingCenter}
                  onChange={(e) => setFormData({ ...formData, trainingCenter: e.target.value })}
                  placeholder="CEET - Centro de Electricidad y Telecomunicaciones"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setPhase('leaderboard')}
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1.5 cursor-pointer order-2 sm:order-1"
              >
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Ver Ranking Actual de Aprendices</span>
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer order-1 sm:order-2"
              >
                <span>Iniciar Evaluación Gamificada (25 Preguntas)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TESTING PHASE: INTERACTIVE 25-QUESTIONS WITH LIVE TIMER & FEEDBACK     */}
      {/* ========================================================================= */}
      {phase === 'testing' && (
        <div className="space-y-6 max-w-4xl mx-auto">
          
          {/* Top Live Bar: Timer, Score, Streak and Section Progress */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
            
            {/* Live Stopwatch */}
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400">
                <Timer className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Tiempo Empleado</div>
                <div className="text-base sm:text-lg font-mono font-black text-slate-950 dark:text-white">
                  {formatDurationMMSS(elapsedSeconds)}
                </div>
              </div>
            </div>

            {/* Gamified Live Score & Streak */}
            <div className="flex items-center gap-4">
              {/* Streak Badge */}
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
                currentStreak >= 3 
                  ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 font-bold scale-105 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                <Flame className={`w-4 h-4 ${currentStreak >= 3 ? 'text-amber-500 animate-bounce' : 'text-slate-400'}`} />
                <span className="text-xs">Racha: {currentStreak}x</span>
              </div>

              {/* Total Points */}
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Puntos Ranking</div>
                <div className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">
                  {gamifiedScore.toLocaleString()} <span className="text-xs font-bold">pts</span>
                </div>
              </div>
            </div>

            {/* Overall Progress */}
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Pregunta</div>
              <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                {currentQuestionIdx + 1} <span className="text-xs text-slate-400 font-normal">de {totalQuestions}</span>
              </div>
            </div>
          </div>

          {/* Section Breadcrumb Pill Indicator */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            {EVALUATION_SECTIONS.map((sec) => {
              const isActive = sec.id === currentQuestion.sectionId;
              const isPassed = currentQuestionIdx > (sec.number * 5 - 1);

              return (
                <div
                  key={sec.id}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : isPassed
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                      : 'bg-white dark:bg-slate-850 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 opacity-60'
                  }`}
                >
                  {renderSectionIcon(sec.iconName)}
                  <span>{sec.shortTitle}</span>
                  {isPassed && <Check className="w-3.5 h-3.5 text-emerald-600 ml-1" />}
                </div>
              );
            })}
          </div>

          {/* QUESTION CARD */}
          <div 
            className={`bg-white dark:bg-slate-900 border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 transition-all duration-300 ${
              shakeAnimation 
                ? 'animate-shake border-rose-400 dark:border-rose-700 shadow-rose-100 dark:shadow-rose-950/20' 
                : pulseSuccessAnimation
                ? 'border-emerald-400 dark:border-emerald-600 ring-2 ring-emerald-500/20'
                : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            {/* Question Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>{currentSection.title}</span>
                  <span>·</span>
                  <span>{currentQuestion.chapterRomano}</span>
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {currentQuestion.articleCitation}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  Pregunta {((currentQuestionIdx % 5) + 1)} de 5 de esta sección
                </span>
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white leading-relaxed">
              {currentQuestion.question}
            </h3>

            {/* Multiple Choice Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((optText, optIdx) => {
                const hasAnswered = userAnswers[currentQuestion.id] !== undefined;
                const isSelected = userAnswers[currentQuestion.id] === optIdx;
                const isCorrect = optIdx === currentQuestion.correctAnswer;

                let optionStyles = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200 hover:shadow-xs';

                if (hasAnswered) {
                  if (isCorrect) {
                    optionStyles = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/30';
                  } else if (isSelected && !isCorrect) {
                    optionStyles = 'border-rose-400 bg-rose-50 dark:bg-rose-950/70 text-rose-950 dark:text-rose-200 ring-2 ring-rose-500/20';
                  } else {
                    optionStyles = 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 opacity-40 text-slate-500';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={hasAnswered}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${optionStyles}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1 leading-snug">{optText}</span>
                    
                    {hasAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    {hasAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* ========================================================= */}
            {/* INSTANT REINFORCEMENT: POSITIVE OR PEDAGOGICAL ERROR CARD */}
            {/* ========================================================= */}
            {userAnswers[currentQuestion.id] !== undefined && (
              <div className="pt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {userAnswers[currentQuestion.id] === currentQuestion.correctAnswer ? (
                  /* REFUERZO POSITIVO */
                  <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-extrabold text-sm sm:text-base">
                        <Sparkles className="w-5 h-5 text-emerald-600 animate-spin-slow" />
                        <span>{currentQuestion.positiveFeedback.title}</span>
                      </div>

                      {lastPointsEarned && (
                        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-black text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700 shadow-xs">
                          <Zap className="w-3.5 h-3.5 text-amber-500" />
                          <span>+{lastPointsEarned.total} pts</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed font-medium">
                      {currentQuestion.positiveFeedback.message}
                    </p>

                    <div className="p-3 bg-white/80 dark:bg-slate-900/60 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-300">
                      <strong>Fundamento Normativo:</strong> {currentQuestion.positiveFeedback.keyConcept}
                    </div>
                  </div>
                ) : (
                  /* REFUERZO PEDAGÓGICO DE IDENTIFICACIÓN DEL ERROR */
                  <div className="p-5 rounded-2xl bg-rose-50/90 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 space-y-3">
                    <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-extrabold text-sm sm:text-base">
                      <AlertTriangle className="w-5 h-5 text-rose-600" />
                      <span>{currentQuestion.errorFeedback.title}</span>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-800/60 space-y-1">
                        <span className="font-bold text-rose-700 dark:text-rose-400">¿En qué fallaste?</span>
                        <p className="text-slate-700 dark:text-slate-300">{currentQuestion.errorFeedback.whyItFailed}</p>
                      </div>

                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-200 dark:border-emerald-800/60 space-y-1">
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">¿Qué dice la norma del SENA?</span>
                        <p className="text-emerald-950 dark:text-emerald-200">{currentQuestion.errorFeedback.correctRule}</p>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-400 italic pt-1">
                        💡 <strong>Consejo formativo:</strong> {currentQuestion.errorFeedback.pedagogicalTip}
                      </p>
                    </div>
                  </div>
                )}

                {/* Next Button */}
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>{currentQuestionIdx < totalQuestions - 1 ? 'Siguiente Pregunta' : 'Finalizar y Calificar'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. RESULTS & OFFICIAL CERTIFICATE PHASE                                   */}
      {/* ========================================================================= */}
      {phase === 'results' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 max-w-4xl mx-auto transition-all">
          
          {/* Results Summary Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
            <div className="space-y-1">
              <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Resultados de la Evaluación Gamificada</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
                {currentScorePercentage >= 80 
                  ? '¡Felicitaciones! Has aprobado con éxito la Inducción SENA'
                  : 'Has completado la evaluación formativa'}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setPhase('leaderboard')}
                className="px-3.5 py-2 text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>Ver Mi Posición en Ranking</span>
              </button>

              <button
                onClick={handlePrintCertificate}
                className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir / PDF</span>
              </button>

              <button
                onClick={onOpenCard}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
              >
                Ver Carné Digital
              </button>
            </div>
          </div>

          {/* Gamified Score Summary Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-[11px] font-bold text-slate-500 uppercase">Calificación</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                {currentScorePercentage}%
              </div>
              <div className="text-[11px] text-slate-500 font-medium">{correctAnswersCount} de {totalQuestions} aciertos</div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-center">
              <div className="text-[11px] font-bold text-emerald-700 uppercase">Puntos Totales</div>
              <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-0.5">
                {gamifiedScore.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-600 font-medium">Gamificación SENA</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-[11px] font-bold text-slate-500 uppercase">Tiempo Total</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5 font-mono">
                {formatDurationMMSS(elapsedSeconds)}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Cronómetro Oficial</div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-center">
              <div className="text-[11px] font-bold text-amber-700 uppercase">Racha Máxima</div>
              <div className="text-2xl font-black text-amber-700 dark:text-amber-400 mt-0.5">
                {maxStreak}x
              </div>
              <div className="text-[11px] text-amber-600 font-medium">Sin fallar seguidas</div>
            </div>
          </div>

          {/* OFFICIAL INSTITUTIONAL CERTIFICATE FRAME */}
          <div className="p-2 sm:p-6 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border-2 border-emerald-600/30 dark:border-emerald-500/30">
            <div className="p-6 sm:p-12 bg-white rounded-xl shadow-lg border-4 border-double border-emerald-700/40 relative overflow-hidden text-center space-y-6 text-slate-900">
              
              {/* Institutional Header */}
              <div className="space-y-1">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center shadow-md">
                  S
                </div>
                <div className="text-[11px] uppercase tracking-widest text-slate-500 font-bold">
                  República de Colombia
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-emerald-900 tracking-tight">
                  SERVICIO NACIONAL DE APRENDIZAJE — SENA
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  Dirección de Formación Profesional · Sistema Nacional de Aprendizaje
                </div>
              </div>

              {/* Certificate Title & Student Data */}
              <div className="py-2 space-y-1">
                <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  HACE CONSTAR QUE EL (LA) APRENDIZ
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-serif tracking-tight">
                  {formData.fullName}
                </div>
                <div className="text-xs text-slate-600 font-mono">
                  Identificado(a) con {formData.documentType} No. {formData.documentNumber}
                </div>
              </div>

              <div className="max-w-xl mx-auto text-xs text-slate-700 leading-relaxed font-serif">
                Culminó y aprobó satisfactoriamente el proceso de <strong>Inducción Institucional y Apropiación Normativa del Acuerdo 009 de 2024</strong> (Reglamento del Aprendiz SENA), demostrando competencia en sus 5 secciones temáticas, ética en el uso de tecnologías e Inteligencia Artificial, y compromiso con la comunidad formativa.
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2 max-w-2xl mx-auto text-left text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Programa:</div>
                  <div className="font-bold text-slate-900 truncate" title={formData.programName}>{formData.programName}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Ficha:</div>
                  <div className="font-mono font-bold text-slate-900">{formData.fichaNumber}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Puntaje Final:</div>
                  <div className="font-bold text-emerald-700">{currentScorePercentage}% ({correctAnswersCount}/25)</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Tiempo:</div>
                  <div className="font-mono font-bold text-slate-900">{formatDurationMMSS(elapsedSeconds)}</div>
                </div>
              </div>

              {/* Verification & Signatures */}
              <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="text-left text-[11px] text-slate-500 space-y-0.5">
                  <div><strong>Código de Verificación:</strong> {verificationCode}</div>
                  <div><strong>Fecha de Expedición:</strong> {currentDateFormatted}</div>
                </div>
                <div className="text-right text-[11px] text-slate-600">
                  <div className="font-bold text-slate-900">Subdirección de Centro & Coordinación Académica</div>
                  <div>Sistema de Gestión Formativa SENA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Institutional Confirmation Notice */}
          <div className="p-4 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-start gap-3 text-xs">
            <div className="p-2 bg-emerald-600 text-white rounded-lg shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <div className="font-bold text-emerald-950 dark:text-emerald-300">
                Constancia Oficial Registrada en el Sistema Institucional
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Tus respuestas, calificación del {currentScorePercentage}% y tiempo de {formatDurationMMSS(elapsedSeconds)} han sido guardados en el registro administrativo de inducción. El instructor podrá consultar tus resultados y sincronizarlos con la hoja de cálculo institucional.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setPhase('registration')}
              className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Presentar evaluación nuevamente con otro aprendiz</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. LEADERBOARD PHASE (GAMIFIED RANKING VIEW)                              */}
      {/* ========================================================================= */}
      {phase === 'leaderboard' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 max-w-4xl mx-auto transition-all">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
            <div className="space-y-1">
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Salón de Honor y Competitividad Sana</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
                Ranking Gamificado de Aprendices SENA
              </h2>
              <p className="text-xs text-slate-500">
                Posiciones calculadas por puntos totales, precisión normativa en el Acuerdo 009 de 2024 y velocidad de respuesta.
              </p>
            </div>

            <button
              onClick={() => setPhase(userAnswers[1] !== undefined ? 'results' : 'registration')}
              className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la Evaluación</span>
            </button>
          </div>

          {/* PODIUM TOP 3 */}
          {leaderboard.length >= 3 && (
            <div className="grid grid-cols-3 gap-3 pt-4 items-end max-w-2xl mx-auto">
              
              {/* 2nd Place - Silver */}
              <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center space-y-2 order-1">
                <div className="w-8 h-8 mx-auto rounded-full bg-slate-300 dark:bg-slate-600 text-slate-800 dark:text-white font-black text-sm flex items-center justify-center">
                  2
                </div>
                <Medal className="w-6 h-6 text-slate-400 mx-auto" />
                <div className="font-bold text-xs text-slate-900 dark:text-white truncate">{leaderboard[1].fullName}</div>
                <div className="text-xs font-black text-emerald-600">{leaderboard[1].gamifiedScore.toLocaleString()} pts</div>
                <div className="text-[10px] text-slate-500 font-mono">{leaderboard[1].timeSpentFormatted}</div>
              </div>

              {/* 1st Place - Gold */}
              <div className="p-5 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-400 dark:border-amber-600 text-center space-y-2.5 order-2 -translate-y-2 shadow-md">
                <div className="w-10 h-10 mx-auto rounded-full bg-amber-400 text-amber-950 font-black text-base flex items-center justify-center shadow-xs">
                  1
                </div>
                <Crown className="w-7 h-7 text-amber-500 mx-auto" />
                <div className="font-extrabold text-sm text-slate-950 dark:text-white truncate">{leaderboard[0].fullName}</div>
                <div className="text-sm font-black text-emerald-700 dark:text-emerald-400">{leaderboard[0].gamifiedScore.toLocaleString()} pts</div>
                <div className="text-[11px] text-amber-800 dark:text-amber-300 font-bold">{leaderboard[0].badgeTitle}</div>
                <div className="text-[10px] text-slate-500 font-mono">{leaderboard[0].timeSpentFormatted}</div>
              </div>

              {/* 3rd Place - Bronze */}
              <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-center space-y-2 order-3">
                <div className="w-8 h-8 mx-auto rounded-full bg-amber-600 text-white font-black text-sm flex items-center justify-center">
                  3
                </div>
                <Medal className="w-6 h-6 text-amber-700 mx-auto" />
                <div className="font-bold text-xs text-slate-900 dark:text-white truncate">{leaderboard[2].fullName}</div>
                <div className="text-xs font-black text-emerald-600">{leaderboard[2].gamifiedScore.toLocaleString()} pts</div>
                <div className="text-[10px] text-slate-500 font-mono">{leaderboard[2].timeSpentFormatted}</div>
              </div>
            </div>
          )}

          {/* Full Leaderboard Table */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-850 shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-center">Posición</th>
                    <th className="px-4 py-3">Aprendiz</th>
                    <th className="px-4 py-3">Ficha & Programa</th>
                    <th className="px-4 py-3 text-center">Puntos Gamificados</th>
                    <th className="px-4 py-3 text-center">Precisión</th>
                    <th className="px-4 py-3 text-center">Tiempo</th>
                    <th className="px-4 py-3 text-right">Insignia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {leaderboard.map((item) => (
                    <tr 
                      key={item.id}
                      className={`hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors ${
                        item.fullName === formData.fullName ? 'bg-emerald-50/50 dark:bg-emerald-950/30 font-bold' : ''
                      }`}
                    >
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        {item.rank === 1 ? '🥇 1º' : item.rank === 2 ? '🥈 2º' : item.rank === 3 ? '🥉 3º' : `#${item.rank}`}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900 dark:text-white">{item.fullName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{item.maskedDocument}</div>
                      </td>
                      <td className="px-4 py-3 max-w-[200px] truncate">
                        <div className="font-semibold text-slate-700 dark:text-slate-300">{item.fichaNumber}</div>
                        <div className="text-[11px] text-slate-500 truncate">{item.programName}</div>
                      </td>
                      <td className="px-4 py-3 text-center font-black text-emerald-600 dark:text-emerald-400">
                        {item.gamifiedScore.toLocaleString()} pts
                      </td>
                      <td className="px-4 py-3 text-center font-semibold">
                        {item.examScore}% ({item.correctCount}/{item.totalQuestions})
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-slate-600 dark:text-slate-300">
                        {item.timeSpentFormatted}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          {item.badgeTitle}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
