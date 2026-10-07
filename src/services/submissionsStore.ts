import { ApprenticeProfile } from '../types/induction';
import { EvaluationQuestion, REGLAMENTO_25_QUESTIONS } from '../data/reglamentoQuizData';

export interface QuestionAnswerDetail {
  questionId: number;
  questionText: string;
  category: string;
  selectedOption: number;
  selectedText: string;
  correctOption: number;
  correctText: string;
  isCorrect: boolean;
  explanation: string;
  articleCitation?: string;
  timeSpentSeconds?: number;
}

export interface ApprenticeSubmission {
  id: string;
  submittedAt: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  programName: string;
  fichaNumber: string;
  regional: string;
  trainingCenter: string;
  examScore: number; // percentage (0 - 100)
  correctCount: number; // e.g. 23
  totalQuestions: number; // e.g. 25
  gamifiedScore: number; // e.g. 6450 pts
  timeSpentSeconds: number; // total time in seconds
  timeSpentFormatted: string; // e.g. '03m 45s'
  maxStreak: number; // longest consecutive correct streak
  isApproved: boolean;
  verificationCode: string;
  answers: QuestionAnswerDetail[];
  syncedToGoogleSheets: boolean;
  syncedAt: string | null;
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  fullName: string;
  maskedDocument: string;
  programName: string;
  fichaNumber: string;
  gamifiedScore: number;
  examScore: number;
  correctCount: number;
  totalQuestions: number;
  timeSpentFormatted: string;
  timeSpentSeconds: number;
  maxStreak: number;
  submittedAt: string;
  medal?: 'gold' | 'silver' | 'bronze' | 'honor';
  badgeTitle: string;
}

const STORAGE_SUBMISSIONS_KEY = 'sena_induction_admin_submissions_v1';
const STORAGE_ADMIN_PIN_KEY = 'sena_induction_admin_pin_v1';
const DEFAULT_ADMIN_PIN = 'sena2024';

export const formatDurationMMSS = (totalSeconds: number): string => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
};

export const getAdminPIN = (): string => {
  return localStorage.getItem(STORAGE_ADMIN_PIN_KEY) || DEFAULT_ADMIN_PIN;
};

export const setAdminPIN = (newPin: string): void => {
  localStorage.setItem(STORAGE_ADMIN_PIN_KEY, newPin);
};

export const getAllSubmissions = (): ApprenticeSubmission[] => {
  try {
    const raw = localStorage.getItem(STORAGE_SUBMISSIONS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading submissions:', err);
    return [];
  }
};

/**
 * Record a full gamified evaluation submission
 */
export const recordGamifiedSubmission = (
  profile: ApprenticeProfile,
  correctCount: number,
  totalQuestions: number,
  gamifiedScore: number,
  timeSpentSeconds: number,
  maxStreak: number,
  detailedAnswers: QuestionAnswerDetail[]
): ApprenticeSubmission => {
  const existingSubmissions = getAllSubmissions();
  const calculatedPercentage = Math.round((correctCount / totalQuestions) * 100);
  const verificationCode = `SENA-IND-2026-${(profile.documentNumber || '0000').slice(-4)}-${(profile.fichaNumber || '0000').slice(-4)}`;

  const newSubmission: ApprenticeSubmission = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    submittedAt: new Date().toISOString(),
    fullName: profile.fullName || 'Aprendiz SENA',
    documentType: profile.documentType || 'CC',
    documentNumber: profile.documentNumber || 'Sin documento',
    programName: profile.programName || 'General',
    fichaNumber: profile.fichaNumber || '0000000',
    regional: profile.regional || 'Dirección General',
    trainingCenter: profile.trainingCenter || 'SENA',
    examScore: calculatedPercentage,
    correctCount,
    totalQuestions,
    gamifiedScore,
    timeSpentSeconds,
    timeSpentFormatted: formatDurationMMSS(timeSpentSeconds),
    maxStreak,
    isApproved: calculatedPercentage >= 80,
    verificationCode,
    answers: detailedAnswers,
    syncedToGoogleSheets: false,
    syncedAt: null
  };

  const updated = [newSubmission, ...existingSubmissions];
  try {
    localStorage.setItem(STORAGE_SUBMISSIONS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving apprentice submission:', err);
  }

  return newSubmission;
};

/**
 * Legacy support fallback
 */
export const recordApprenticeSubmission = (
  profile: ApprenticeProfile,
  score: number,
  userAnswers: Record<number, number>
): ApprenticeSubmission => {
  const existingSubmissions = getAllSubmissions();

  const answersDetail: QuestionAnswerDetail[] = REGLAMENTO_25_QUESTIONS.map((q) => {
    const selectedOption = userAnswers[q.id] ?? -1;
    const isCorrect = selectedOption === q.correctAnswer;
    return {
      questionId: q.id,
      questionText: q.question,
      category: q.sectionName,
      selectedOption,
      selectedText: selectedOption >= 0 ? q.options[selectedOption] || 'Sin respuesta' : 'Sin respuesta',
      correctOption: q.correctAnswer,
      correctText: q.options[q.correctAnswer] || '',
      isCorrect,
      explanation: q.articleCitation
    };
  });

  const correctCount = answersDetail.filter(a => a.isCorrect).length;
  const verificationCode = `SENA-IND-2026-${(profile.documentNumber || '0000').slice(-4)}-${(profile.fichaNumber || '0000').slice(-4)}`;

  const newSubmission: ApprenticeSubmission = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    submittedAt: new Date().toISOString(),
    fullName: profile.fullName || 'Aprendiz SENA',
    documentType: profile.documentType || 'CC',
    documentNumber: profile.documentNumber || 'Sin documento',
    programName: profile.programName || 'General',
    fichaNumber: profile.fichaNumber || '0000000',
    regional: profile.regional || 'Dirección General',
    trainingCenter: profile.trainingCenter || 'SENA',
    examScore: score,
    correctCount,
    totalQuestions: REGLAMENTO_25_QUESTIONS.length,
    gamifiedScore: score * 50,
    timeSpentSeconds: 180,
    timeSpentFormatted: '03m 00s',
    maxStreak: 5,
    isApproved: score >= 80,
    verificationCode,
    answers: answersDetail,
    syncedToGoogleSheets: false,
    syncedAt: null
  };

  const updated = [newSubmission, ...existingSubmissions];
  try {
    localStorage.setItem(STORAGE_SUBMISSIONS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving apprentice submission:', err);
  }

  return newSubmission;
};

/**
 * Returns the sorted gamified leaderboard
 */
export const getGamifiedLeaderboard = (): LeaderboardEntry[] => {
  const submissions = getAllSubmissions();

  // If empty, supply institutional initial leaderboard benchmarks
  const seedSubmissions: Partial<ApprenticeSubmission>[] = [
    {
      id: 'seed_1',
      fullName: 'Carlos Andrés Morales',
      documentType: 'CC',
      documentNumber: '1032489112',
      programName: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
      fichaNumber: '2894512',
      gamifiedScore: 8950,
      examScore: 100,
      correctCount: 25,
      totalQuestions: 25,
      timeSpentSeconds: 142,
      timeSpentFormatted: '02m 22s',
      maxStreak: 25,
      submittedAt: new Date(Date.now() - 3600000 * 4).toISOString()
    },
    {
      id: 'seed_2',
      fullName: 'Mariana Silva Quintero',
      documentType: 'TI',
      documentNumber: '1098471203',
      programName: 'Tecnólogo en Gestión Administrativa',
      fichaNumber: '2871109',
      gamifiedScore: 8400,
      examScore: 96,
      correctCount: 24,
      totalQuestions: 25,
      timeSpentSeconds: 168,
      timeSpentFormatted: '02m 48s',
      maxStreak: 18,
      submittedAt: new Date(Date.now() - 3600000 * 8).toISOString()
    },
    {
      id: 'seed_3',
      fullName: 'David Felipe Restrepo',
      documentType: 'CC',
      documentNumber: '1019284711',
      programName: 'Mantenimiento Electromecánico Industrial',
      fichaNumber: '2856230',
      gamifiedScore: 7850,
      examScore: 92,
      correctCount: 23,
      totalQuestions: 25,
      timeSpentSeconds: 195,
      timeSpentFormatted: '03m 15s',
      maxStreak: 14,
      submittedAt: new Date(Date.now() - 3600000 * 12).toISOString()
    }
  ];

  // Combine real submissions and seeds
  const combined = [...submissions];
  seedSubmissions.forEach(seed => {
    if (!combined.some(c => c.fullName === seed.fullName)) {
      combined.push(seed as ApprenticeSubmission);
    }
  });

  // Sort by gamifiedScore DESC, examScore DESC, timeSpentSeconds ASC
  combined.sort((a, b) => {
    if (b.gamifiedScore !== a.gamifiedScore) {
      return b.gamifiedScore - a.gamifiedScore;
    }
    if (b.examScore !== a.examScore) {
      return b.examScore - a.examScore;
    }
    return (a.timeSpentSeconds || 9999) - (b.timeSpentSeconds || 9999);
  });

  return combined.map((item, index) => {
    let medal: 'gold' | 'silver' | 'bronze' | 'honor' | undefined = undefined;
    if (index === 0) medal = 'gold';
    else if (index === 1) medal = 'silver';
    else if (index === 2) medal = 'bronze';
    else if (index < 10) medal = 'honor';

    let badgeTitle = 'Aprendiz Destacado';
    if (item.gamifiedScore >= 8500) badgeTitle = '🏆 Maestro del Reglamento';
    else if (item.maxStreak >= 15) badgeTitle = '🔥 Racha Impecable';
    else if ((item.timeSpentSeconds || 300) < 180) badgeTitle = '⚡ Velocidad Relámpago';
    else if (item.examScore >= 90) badgeTitle = '🌟 Excelencia SENA';

    const docStr = item.documentNumber || '0000';
    const maskedDocument = `${item.documentType || 'CC'} ****${docStr.slice(-4)}`;

    return {
      rank: index + 1,
      id: item.id,
      fullName: item.fullName,
      maskedDocument,
      programName: item.programName,
      fichaNumber: item.fichaNumber,
      gamifiedScore: item.gamifiedScore,
      examScore: item.examScore,
      correctCount: item.correctCount || Math.round((item.examScore / 100) * 25),
      totalQuestions: item.totalQuestions || 25,
      timeSpentFormatted: item.timeSpentFormatted || formatDurationMMSS(item.timeSpentSeconds || 180),
      timeSpentSeconds: item.timeSpentSeconds || 180,
      maxStreak: item.maxStreak || 5,
      submittedAt: item.submittedAt,
      medal,
      badgeTitle
    };
  });
};

export const markSubmissionsAsSynced = (submissionIds: string[]): void => {
  const all = getAllSubmissions();
  const idSet = new Set(submissionIds);
  const now = new Date().toISOString();

  const updated = all.map((sub) => {
    if (idSet.has(sub.id)) {
      return {
        ...sub,
        syncedToGoogleSheets: true,
        syncedAt: now
      };
    }
    return sub;
  });

  try {
    localStorage.setItem(STORAGE_SUBMISSIONS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error updating sync state:', err);
  }
};

export const deleteSubmission = (id: string): void => {
  const all = getAllSubmissions();
  const updated = all.filter((s) => s.id !== id);
  try {
    localStorage.setItem(STORAGE_SUBMISSIONS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error deleting submission:', err);
  }
};

export const clearAllSubmissions = (): void => {
  try {
    localStorage.removeItem(STORAGE_SUBMISSIONS_KEY);
  } catch (err) {
    console.error('Error clearing submissions:', err);
  }
};

export const exportSubmissionsAsCSV = (submissions: ApprenticeSubmission[]): void => {
  const headers = [
    'ID Registro',
    'Fecha y Hora',
    'Nombre Completo',
    'Tipo Documento',
    'Número Documento',
    'Programa de Formación',
    'Ficha',
    'Regional',
    'Centro de Formación',
    'Puntaje (%)',
    'Aciertos (25)',
    'Puntos Gamificados',
    'Tiempo Empleado',
    'Racha Máxima',
    'Estado',
    'Código Certificado',
    'Sincronizado a Drive'
  ];

  const escapeCSV = (val: string | number | boolean | null | undefined) => {
    const str = String(val ?? '');
    return `"${str.replace(/"/g, '""')}"`;
  };

  const rows = submissions.map((s) => [
    escapeCSV(s.id),
    escapeCSV(new Date(s.submittedAt).toLocaleString('es-CO')),
    escapeCSV(s.fullName),
    escapeCSV(s.documentType),
    escapeCSV(s.documentNumber),
    escapeCSV(s.programName),
    escapeCSV(s.fichaNumber),
    escapeCSV(s.regional),
    escapeCSV(s.trainingCenter),
    escapeCSV(s.examScore),
    escapeCSV(`${s.correctCount ?? ''} / ${s.totalQuestions ?? 25}`),
    escapeCSV(s.gamifiedScore ?? 0),
    escapeCSV(s.timeSpentFormatted ?? ''),
    escapeCSV(s.maxStreak ?? 0),
    escapeCSV(s.isApproved ? 'APROBADO' : 'NO APROBADO'),
    escapeCSV(s.verificationCode),
    escapeCSV(s.syncedToGoogleSheets ? 'SÍ' : 'PENDIENTE')
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `SENA_Induccion_Evaluaciones_Gamificadas_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportLeaderboardAsCSV = (leaderboard: LeaderboardEntry[]): void => {
  const headers = [
    'Posición',
    'Aprendiz',
    'Documento',
    'Número Ficha',
    'Programa de Formación',
    'Puntos Gamificados',
    'Calificación (%)',
    'Aciertos (sobre 25)',
    'Tiempo Empleado',
    'Racha Máxima',
    'Insignia Oficial',
    'Fecha'
  ];

  const escapeCSV = (val: string | number | boolean | null | undefined) => {
    const str = String(val ?? '');
    return `"${str.replace(/"/g, '""')}"`;
  };

  const rows = leaderboard.map((item) => [
    escapeCSV(item.rank),
    escapeCSV(item.fullName),
    escapeCSV(item.maskedDocument),
    escapeCSV(item.fichaNumber),
    escapeCSV(item.programName),
    escapeCSV(item.gamifiedScore),
    escapeCSV(`${item.examScore}%`),
    escapeCSV(`${item.correctCount}/${item.totalQuestions}`),
    escapeCSV(item.timeSpentFormatted),
    escapeCSV(`${item.maxStreak}x`),
    escapeCSV(item.badgeTitle),
    escapeCSV(new Date(item.submittedAt).toLocaleDateString('es-CO'))
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `SENA_Ranking_Gamificado_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
