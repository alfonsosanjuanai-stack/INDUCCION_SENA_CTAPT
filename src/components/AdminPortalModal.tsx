import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  FileSpreadsheet, 
  ExternalLink, 
  Lock, 
  Unlock, 
  Search, 
  RefreshCw, 
  Download, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  LogOut, 
  Users, 
  Award, 
  TrendingUp, 
  Calendar, 
  Key, 
  Check, 
  FileText,
  AlertTriangle,
  UploadCloud,
  ChevronRight,
  Trophy,
  Flame,
  Timer
} from 'lucide-react';
import { User } from 'firebase/auth';
import { 
  initAuth, 
  googleSignIn, 
  logout, 
  getAccessToken 
} from '../services/authService';
import { 
  getOrCreateInductionSpreadsheet, 
  appendApprenticeRecord, 
  fetchApprenticeRecords, 
  getSavedSpreadsheetId,
  SheetLearnerRow
} from '../services/googleSheetsService';
import { 
  getAllSubmissions, 
  deleteSubmission, 
  markSubmissionsAsSynced, 
  exportSubmissionsAsCSV, 
  getAdminPIN, 
  setAdminPIN,
  getGamifiedLeaderboard,
  LeaderboardEntry,
  ApprenticeSubmission,
  QuestionAnswerDetail
} from '../services/submissionsStore';
import { GoogleSignInButton } from './GoogleSignInButton';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  // Auth & PIN State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('sena_admin_logged_in') === 'true';
  });
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);

  // New PIN modal / state
  const [showChangePin, setShowChangePin] = useState<boolean>(false);
  const [newPin, setNewPin] = useState<string>('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState<boolean>(false);

  // Active view tab in admin
  const [adminTab, setAdminTab] = useState<'submissions' | 'leaderboard' | 'drive' | 'security'>('submissions');

  // Submissions State
  const [submissions, setSubmissions] = useState<ApprenticeSubmission[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'failed' | 'unsynced'>('all');
  const [selectedSubmissionForDetail, setSelectedSubmissionForDetail] = useState<ApprenticeSubmission | null>(null);

  // Google Sheets Admin State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);
  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [sheetRecords, setSheetRecords] = useState<SheetLearnerRow[]>([]);
  const [isLoadingSheet, setIsLoadingSheet] = useState<boolean>(false);

  // Load submissions & leaderboard
  const reloadSubmissions = () => {
    const list = getAllSubmissions();
    setSubmissions(list);
    setLeaderboard(getGamifiedLeaderboard());
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      reloadSubmissions();
      setSpreadsheetId(getSavedSpreadsheetId());
    }
  }, [isOpen, isAuthenticated]);

  // Auth listener for Google Drive sync
  useEffect(() => {
    if (!isOpen || !isAuthenticated) return;

    setIsAuthLoading(true);
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
        setIsAuthLoading(false);
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
        setIsAuthLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [isOpen, isAuthenticated]);

  // Load sheet records when token available
  useEffect(() => {
    if (adminTab === 'drive' && accessToken && spreadsheetId) {
      loadSheetData(accessToken, spreadsheetId);
    }
  }, [adminTab, accessToken, spreadsheetId]);

  const loadSheetData = async (token: string, sId: string) => {
    setIsLoadingSheet(true);
    try {
      const records = await fetchApprenticeRecords(token, sId, 'Aprendices');
      setSheetRecords(records);
    } catch (err) {
      console.warn('Error loading remote sheet data:', err);
    } finally {
      setIsLoadingSheet(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPIN = getAdminPIN();
    if (pinInput.trim() === currentPIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem('sena_admin_logged_in', 'true');
      setPinError(null);
      setPinInput('');
      reloadSubmissions();
    } else {
      setPinError('PIN de seguridad incorrecto. Intente nuevamente.');
    }
  };

  const handleLogoutAdmin = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('sena_admin_logged_in');
    setPinInput('');
    setPinError(null);
  };

  const handleChangePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length < 4) {
      setPinError('El PIN debe tener al menos 4 caracteres.');
      return;
    }
    setAdminPIN(newPin);
    setPinChangeSuccess(true);
    setTimeout(() => {
      setShowChangePin(false);
      setPinChangeSuccess(false);
      setNewPin('');
    }, 1500);
  };

  // Google Sign In for Admin
  const handleGoogleSignIn = async () => {
    try {
      setSyncMessage(null);
      const authResult = await googleSignIn();
      if (authResult) {
        setCurrentUser(authResult.user);
        setAccessToken(authResult.accessToken);

        // Fetch or create spreadsheet
        if (authResult.accessToken) {
          const sheetInfo = await getOrCreateInductionSpreadsheet(authResult.accessToken);
          setSpreadsheetId(sheetInfo.spreadsheetId);
          await loadSheetData(authResult.accessToken, sheetInfo.spreadsheetId);
        }
      }
    } catch (err: any) {
      setSyncMessage({
        type: 'error',
        text: err.message || 'Error al autenticarse con Google.'
      });
    }
  };

  const handleGoogleLogout = async () => {
    await logout();
    setCurrentUser(null);
    setAccessToken(null);
  };

  // Bulk Sync to Google Sheets
  const handleSyncAllSubmissions = async () => {
    if (!accessToken) {
      setSyncMessage({
        type: 'error',
        text: 'Primero debe conectar su cuenta de Google como Administrador.'
      });
      return;
    }

    setIsSyncing(true);
    setSyncMessage(null);

    try {
      // 1. Get or create sheet
      const sheetInfo = await getOrCreateInductionSpreadsheet(accessToken);
      setSpreadsheetId(sheetInfo.spreadsheetId);

      // 2. Filter unsynced submissions or sync all
      const unsynced = submissions.filter((s) => !s.syncedToGoogleSheets);
      const toSync = unsynced.length > 0 ? unsynced : submissions;

      if (toSync.length === 0) {
        setSyncMessage({
          type: 'success',
          text: 'No hay respuestas registradas para sincronizar.'
        });
        setIsSyncing(false);
        return;
      }

      let successCount = 0;
      const syncedIds: string[] = [];

      for (const item of toSync) {
        try {
          await appendApprenticeRecord(accessToken, sheetInfo.spreadsheetId, {
            fullName: item.fullName,
            documentType: item.documentType,
            documentNumber: item.documentNumber,
            programName: item.programName,
            fichaNumber: item.fichaNumber,
            regional: item.regional,
            trainingCenter: item.trainingCenter,
            examScore: item.examScore,
            certifiedAt: item.submittedAt,
            verificationCode: item.verificationCode,
            registeredByEmail: currentUser?.email || 'Admin SENA'
          }, sheetInfo.sheetName);

          syncedIds.push(item.id);
          successCount++;
        } catch (itemErr) {
          console.error('Error syncing record:', item.fullName, itemErr);
        }
      }

      // Mark locally
      markSubmissionsAsSynced(syncedIds);
      reloadSubmissions();

      // Refresh remote records
      await loadSheetData(accessToken, sheetInfo.spreadsheetId);

      setSyncMessage({
        type: 'success',
        text: `¡Sincronización completada! Se guardaron ${successCount} registros en su Google Sheet institucional.`
      });
    } catch (err: any) {
      setSyncMessage({
        type: 'error',
        text: `Error de sincronización: ${err.message || 'No fue posible escribir en Google Sheets.'}`
      });
    } finally {
      setIsSyncing(false);
    }
  };

  if (!isOpen) return null;

  // Filter submissions
  const filteredSubmissions = submissions.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !query ||
      item.fullName.toLowerCase().includes(query) ||
      item.documentNumber.includes(query) ||
      item.fichaNumber.includes(query) ||
      item.programName.toLowerCase().includes(query);

    if (!matchesSearch) return false;

    if (filterStatus === 'approved') return item.isApproved;
    if (filterStatus === 'failed') return !item.isApproved;
    if (filterStatus === 'unsynced') return !item.syncedToGoogleSheets;
    return true;
  });

  // Calculate Metrics
  const totalSubmissions = submissions.length;
  const approvedCount = submissions.filter((s) => s.isApproved).length;
  const failedCount = totalSubmissions - approvedCount;
  const averageScore = totalSubmissions > 0 
    ? Math.round(submissions.reduce((acc, s) => acc + s.examScore, 0) / totalSubmissions) 
    : 0;
  const syncedCount = submissions.filter((s) => s.syncedToGoogleSheets).length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* MODAL HEADER */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600 rounded-lg text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold">Portal Administrativo SENA</h2>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Acceso Restringido
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Seguridad de Información · Control de Respuestas · Integración Privada Google Drive
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogoutAdmin}
                className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                title="Cerrar Sesión Administrativa"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Bloquear</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* BODY CONTENT */}
        {!isAuthenticated ? (
          /* ============================================================ */
          /* 1. SECURITY LOGIN GATE (PIN REQUIRED)                        */
          /* ============================================================ */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Verificación de Administrador
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Por políticas de protección de datos personales (Habeas Data) y seguridad institucional, las respuestas de los aprendices y la hoja de cálculo de Google Drive son de acceso confidencial.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="w-full space-y-4">
              <div className="space-y-1 text-left">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>PIN o Clave de Seguridad:</span>
                  <span className="text-[11px] font-normal text-slate-400">Predeterminado: <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-emerald-600 font-mono">sena2024</code></span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setPinError(null);
                    }}
                    placeholder="Ingrese su PIN de Administrador"
                    autoFocus
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono tracking-widest text-center"
                  />
                  <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                </div>
                {pinError && (
                  <p className="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1 mt-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{pinError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>Ingresar al Panel de Control</span>
              </button>
            </form>

            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-[11px] text-amber-800 dark:text-amber-300 text-left space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Seguridad de la Información Garantizada</span>
              </div>
              <p>
                Los aprendices no tienen acceso a esta pantalla ni podrán ver la URL de su hoja de cálculo. Solo quienes tengan este PIN podrán consultar las evaluaciones y sincronizar con Drive.
              </p>
            </div>
          </div>
        ) : (
          /* ============================================================ */
          /* 2. AUTHENTICATED ADMINISTRATOR DASHBOARD                     */
          /* ============================================================ */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Top Navigation Bar */}
            <div className="px-5 pt-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => setAdminTab('submissions')}
                  className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
                    adminTab === 'submissions'
                      ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900 shadow-2xs'
                      : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Respuestas de Aprendices ({submissions.length})</span>
                </button>

                <button
                  onClick={() => setAdminTab('leaderboard')}
                  className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
                    adminTab === 'leaderboard'
                      ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900 shadow-2xs'
                      : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  <span>Ranking Gamificado ({leaderboard.length})</span>
                </button>

                <button
                  onClick={() => setAdminTab('drive')}
                  className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
                    adminTab === 'drive'
                      ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900 shadow-2xs'
                      : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Hoja de Cálculo en Google Drive</span>
                </button>

                <button
                  onClick={() => setAdminTab('security')}
                  className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
                    adminTab === 'security'
                      ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900 shadow-2xs'
                      : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Ajustes & Seguridad</span>
                </button>
              </div>

              {/* Status indicator */}
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 pb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium">Sesión Administrador Activa</span>
              </div>
            </div>

            {/* TAB 1: SUBMISSIONS MANAGEMENT & DETAILED RESPONSES */}
            {adminTab === 'submissions' && (
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {/* Metric Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-blue-500" />
                      <span>Evaluados</span>
                    </div>
                    <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                      {totalSubmissions}
                    </div>
                  </div>

                  <div className="p-3.5 bg-emerald-50/60 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Aprobados</span>
                    </div>
                    <div className="text-xl font-extrabold text-emerald-900 dark:text-emerald-300 mt-1">
                      {approvedCount}
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                      <span>Promedio</span>
                    </div>
                    <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                      {averageScore}%
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
                      <span>En Drive</span>
                    </div>
                    <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                      {syncedCount} / {totalSubmissions}
                    </div>
                  </div>
                </div>

                {/* Filter and Action Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar por nombre, documento o ficha..."
                        className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as any)}
                      className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none"
                    >
                      <option value="all">Todos ({totalSubmissions})</option>
                      <option value="approved">Aprobados ({approvedCount})</option>
                      <option value="failed">No Aprobados ({failedCount})</option>
                      <option value="unsynced">Pendientes de Drive ({totalSubmissions - syncedCount})</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => exportSubmissionsAsCSV(submissions)}
                      disabled={submissions.length === 0}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                      title="Descargar archivo CSV compatible con Excel"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      <span>Descargar CSV</span>
                    </button>

                    <button
                      onClick={() => setAdminTab('drive')}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Sincronizar a Google Sheets"
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Sincronizar Drive</span>
                    </button>

                    <button
                      onClick={reloadSubmissions}
                      className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                      title="Actualizar lista"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Submissions Table */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-850 shadow-2xs">
                  {filteredSubmissions.length === 0 ? (
                    <div className="p-10 text-center space-y-2">
                      <Users className="w-8 h-8 text-slate-400 mx-auto" />
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {totalSubmissions === 0 
                          ? 'Aún no hay pruebas de inducción presentadas' 
                          : 'No se encontraron resultados con los filtros actuales'}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Cuando un aprendiz complete y califique su prueba en el módulo de certificación, su registro y respuestas aparecerán aquí inmediatamente.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-700">
                          <tr>
                            <th className="px-3 py-3">Fecha</th>
                            <th className="px-3 py-3">Aprendiz</th>
                            <th className="px-3 py-3">Documento</th>
                            <th className="px-3 py-3">Ficha & Programa</th>
                            <th className="px-3 py-3 text-center">Calificación</th>
                            <th className="px-3 py-3 text-center">Puntos Ranking</th>
                            <th className="px-3 py-3 text-center">Tiempo</th>
                            <th className="px-3 py-3 text-center">Estado</th>
                            <th className="px-3 py-3 text-center">Drive</th>
                            <th className="px-3 py-3 text-right">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-normal">
                          {filteredSubmissions.map((sub) => (
                            <tr key={sub.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                              <td className="px-3 py-3 text-slate-500 whitespace-nowrap">
                                {new Date(sub.submittedAt).toLocaleDateString('es-CO', {
                                  day: '2-digit',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </td>
                              <td className="px-3 py-3 font-semibold text-slate-900 dark:text-white">
                                {sub.fullName}
                              </td>
                              <td className="px-3 py-3 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                                {sub.documentType} {sub.documentNumber}
                              </td>
                              <td className="px-3 py-3 text-slate-600 dark:text-slate-300 max-w-[180px] truncate" title={`${sub.fichaNumber} - ${sub.programName}`}>
                                <span className="font-semibold text-slate-800 dark:text-slate-200">{sub.fichaNumber}</span>
                                <div className="text-[11px] text-slate-500 truncate">{sub.programName}</div>
                              </td>
                              <td className="px-3 py-3 text-center font-bold text-slate-900 dark:text-white">
                                <div>{sub.examScore}%</div>
                                <div className="text-[10px] text-slate-500 font-normal">
                                  {sub.correctCount ?? Math.round((sub.examScore / 100) * 25)}/25
                                </div>
                              </td>
                              <td className="px-3 py-3 text-center font-bold text-emerald-600 dark:text-emerald-400">
                                {sub.gamifiedScore ? `${sub.gamifiedScore.toLocaleString()} pts` : '-'}
                              </td>
                              <td className="px-3 py-3 text-center font-mono text-slate-600 dark:text-slate-300 text-[11px]">
                                {sub.timeSpentFormatted || '-'}
                              </td>
                              <td className="px-3 py-3 text-center">
                                {sub.isApproved ? (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                                    <CheckCircle2 className="w-3 h-3" /> Aprobado
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-800">
                                    <XCircle className="w-3 h-3" /> No Aprobó
                                  </span>
                                )}
                              </td>
                              <td className="px-3 py-3 text-center">
                                {sub.syncedToGoogleSheets ? (
                                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded" title="Sincronizado a Google Sheet">
                                    Sincronizado
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded" title="Pendiente de enviar a Google Sheet">
                                    Pendiente
                                  </span>
                                )}
                              </td>
                              <td className="px-3 py-3 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => setSelectedSubmissionForDetail(sub)}
                                    className="px-2 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 rounded border border-emerald-200 dark:border-emerald-800 flex items-center gap-1 cursor-pointer"
                                    title="Ver desglose de respuestas pregunta por pregunta"
                                  >
                                    <Eye className="w-3 h-3" />
                                    <span>Respuestas</span>
                                  </button>

                                  <button
                                    onClick={() => {
                                      if (confirm(`¿Eliminar el registro de ${sub.fullName}?`)) {
                                        deleteSubmission(sub.id);
                                        reloadSubmissions();
                                      }
                                    }}
                                    className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                                    title="Eliminar este registro"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: LEADERBOARD GAMIFICADO (EXCLUSIVO ADMIN / VISOR) */}
            {adminTab === 'leaderboard' && (
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-bold text-amber-950 dark:text-amber-200 flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-600" />
                      <span>Cuadro de Honor y Ranking Gamificado Institucional</span>
                    </h3>
                    <p className="text-xs text-amber-800 dark:text-amber-400">
                      Clasificación automatizada basada en puntos por aciertos en las 25 preguntas del Acuerdo 009 de 2024, velocidad de respuesta y rachas sin errores.
                    </p>
                  </div>

                  <button
                    onClick={reloadSubmissions}
                    className="px-3 py-1.5 text-xs font-bold text-amber-900 dark:text-amber-200 bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 rounded-lg flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
                    <span>Actualizar Ranking</span>
                  </button>
                </div>

                {/* Leaderboard Table */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-850 shadow-2xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-700">
                        <tr>
                          <th className="px-4 py-3 text-center">Posición</th>
                          <th className="px-4 py-3">Aprendiz</th>
                          <th className="px-4 py-3">Documento</th>
                          <th className="px-4 py-3">Ficha & Programa</th>
                          <th className="px-4 py-3 text-center">Puntos Gamificados</th>
                          <th className="px-4 py-3 text-center">Aciertos (25)</th>
                          <th className="px-4 py-3 text-center">Tiempo</th>
                          <th className="px-4 py-3 text-center">Racha</th>
                          <th className="px-4 py-3 text-right">Insignia</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {leaderboard.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-4 py-3 text-center whitespace-nowrap font-bold">
                              {item.rank === 1 ? '🥇 1º Puesto' : item.rank === 2 ? '🥈 2º Puesto' : item.rank === 3 ? '🥉 3º Puesto' : `#${item.rank}`}
                            </td>
                            <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                              {item.fullName}
                            </td>
                            <td className="px-4 py-3 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                              {item.maskedDocument}
                            </td>
                            <td className="px-4 py-3 max-w-[200px] truncate">
                              <span className="font-semibold text-slate-800 dark:text-slate-200">{item.fichaNumber}</span>
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
                            <td className="px-4 py-3 text-center font-bold text-amber-600">
                              {item.maxStreak}x
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

            {/* TAB 2: GOOGLE DRIVE & SPREADSHEET MANAGEMENT (EXCLUSIVE ADMIN) */}
            {adminTab === 'drive' && (
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                
                {/* Security Announcement */}
                <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-start gap-3">
                  <div className="p-2 bg-emerald-600 text-white rounded-lg shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-300">
                      Entorno Seguro para el Administrador
                    </h4>
                    <p className="text-xs text-emerald-800 dark:text-emerald-400 leading-relaxed">
                      El acceso a su cuenta de Google y el enlace directo a la hoja de cálculo están completamente protegidos bajo esta sesión administrativa. Los aprendices realizan sus pruebas sin ver ninguna URL ni permisos sobre sus archivos en Google Drive.
                    </p>
                  </div>
                </div>

                {/* Google Connection Card */}
                <div className="p-5 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                        <span>Conexión con Google Drive & Google Sheets</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Almacena el registro oficial de inducción en una hoja de cálculo institucional dentro de su Google Drive personal/institucional.
                      </p>
                    </div>

                    <div>
                      {currentUser ? (
                        <div className="flex items-center gap-2">
                          <div className="text-right text-xs">
                            <div className="font-semibold text-slate-900 dark:text-white">{currentUser.displayName || 'Administrador'}</div>
                            <div className="text-slate-500 text-[11px]">{currentUser.email}</div>
                          </div>
                          <button
                            onClick={handleGoogleLogout}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                            title="Desconectar cuenta Google"
                          >
                            <LogOut className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <GoogleSignInButton
                          onClick={handleGoogleSignIn}
                          disabled={isAuthLoading}
                          text="Conectar Google Drive"
                        />
                      )}
                    </div>
                  </div>

                  {/* Sync status messages */}
                  {syncMessage && (
                    <div className={`p-3 rounded-lg text-xs font-medium flex items-center gap-2 ${
                      syncMessage.type === 'success' 
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                    }`}>
                      {syncMessage.type === 'success' ? <Check className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                      <span>{syncMessage.text}</span>
                    </div>
                  )}

                  {/* Spreadsheet Details */}
                  {spreadsheetId && (
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                          <span>Hoja de Cálculo Activa:</span>
                          <span className="text-emerald-700 dark:text-emerald-400">Registro de Inducción SENA - Aprendices</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          ID: {spreadsheetId}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://docs.google.com/spreadsheets/d/${spreadsheetId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                        >
                          <FileSpreadsheet className="w-3.5 h-3.5" />
                          <span>Abrir en Google Drive</span>
                          <ExternalLink className="w-3 h-3 ml-0.5" />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Bulk Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={handleSyncAllSubmissions}
                      disabled={isSyncing || !currentUser}
                      className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <UploadCloud className={`w-4 h-4 ${isSyncing ? 'animate-bounce' : ''}`} />
                      <span>{isSyncing ? 'Sincronizando con Drive...' : 'Sincronizar Todas las Evaluaciones'}</span>
                    </button>

                    <button
                      onClick={() => exportSubmissionsAsCSV(submissions)}
                      className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Descargar Copia de Seguridad (CSV)</span>
                    </button>
                  </div>
                </div>

                {/* Remote Google Sheet preview if loaded */}
                {sheetRecords.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        Registros Almacenados en Google Sheets ({sheetRecords.length})
                      </span>
                      {accessToken && spreadsheetId && (
                        <button
                          onClick={() => loadSheetData(accessToken, spreadsheetId)}
                          disabled={isLoadingSheet}
                          className="text-emerald-600 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <RefreshCw className={`w-3 h-3 ${isLoadingSheet ? 'animate-spin' : ''}`} />
                          <span>Refrescar</span>
                        </button>
                      )}
                    </div>

                    <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto max-h-60 bg-white dark:bg-slate-850">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold sticky top-0">
                          <tr>
                            <th className="px-3 py-2">Fecha</th>
                            <th className="px-3 py-2">Nombre</th>
                            <th className="px-3 py-2">Doc</th>
                            <th className="px-3 py-2">Programa</th>
                            <th className="px-3 py-2">Ficha</th>
                            <th className="px-3 py-2 text-center">Puntaje</th>
                            <th className="px-3 py-2 text-center">Estado</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {sheetRecords.slice(0, 15).map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="px-3 py-2 text-slate-500 whitespace-nowrap">{row.fecha}</td>
                              <td className="px-3 py-2 font-medium text-slate-900 dark:text-white">{row.nombre}</td>
                              <td className="px-3 py-2 font-mono text-[11px]">{row.numDoc}</td>
                              <td className="px-3 py-2 truncate max-w-[150px]">{row.programa}</td>
                              <td className="px-3 py-2 font-mono">{row.ficha}</td>
                              <td className="px-3 py-2 text-center font-bold">{row.puntaje}</td>
                              <td className="px-3 py-2 text-center">
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                                  {row.estado}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: SECURITY SETTINGS */}
            {adminTab === 'security' && (
              <div className="flex-1 overflow-y-auto p-5 max-w-xl mx-auto space-y-6">
                <div className="p-5 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Key className="w-4 h-4 text-emerald-600" />
                      <span>Cambio de PIN Administrativo</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Actualice el PIN de acceso al panel para impedir que usuarios o aprendices ingresen a este módulo.
                    </p>
                  </div>

                  <form onSubmit={handleChangePinSubmit} className="space-y-3 pt-2">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Nuevo PIN de Administrador (Mínimo 4 caracteres):
                      </label>
                      <input
                        type="text"
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value)}
                        placeholder="Ejemplo: 49201 o senaDocente2026"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                      />
                    </div>

                    {pinChangeSuccess && (
                      <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>¡PIN de administrador actualizado correctamente!</span>
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={newPin.length < 4}
                      className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-lg transition-colors cursor-pointer"
                    >
                      Guardar Nuevo PIN
                    </button>
                  </form>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Cumplimiento Legal & Habeas Data (Ley 1581 de 2012)</span>
                  </div>
                  <p>
                    Este prototipo almacena los nombres, números de documento y calificaciones exclusivamente en la memoria segura local y en su Google Drive autorizado por OAuth. Ningún tercero ni ningún otro aprendiz tiene visibilidad de estos registros sin el PIN del Administrador.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODAL: QUESTION-BY-QUESTION DETAIL VIEW FOR A SELECTED APPRENTICE */}
        {selectedSubmissionForDetail && (
          <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[88vh]">
              
              {/* Detail Header */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    Auditoría de Evaluación Individual
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {selectedSubmissionForDetail.fullName}
                  </h3>
                  <div className="text-xs text-slate-500 font-mono">
                    {selectedSubmissionForDetail.documentType} {selectedSubmissionForDetail.documentNumber} · Ficha {selectedSubmissionForDetail.fichaNumber}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Calificación</div>
                    <div className={`text-base font-extrabold ${
                      selectedSubmissionForDetail.isApproved ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {selectedSubmissionForDetail.examScore}%
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedSubmissionForDetail(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Questions Breakdown List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {selectedSubmissionForDetail.answers.map((ans, qIdx) => (
                  <div
                    key={ans.questionId}
                    className={`p-4 rounded-xl border text-xs space-y-2 transition-all ${
                      ans.isCorrect
                        ? 'border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/40 dark:bg-emerald-950/20'
                        : 'border-rose-200 dark:border-rose-800/80 bg-rose-50/40 dark:bg-rose-950/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        Pregunta {qIdx + 1} ({ans.category})
                      </span>
                      <span className={`inline-flex items-center gap-1 font-bold ${
                        ans.isCorrect ? 'text-emerald-600' : 'text-rose-600'
                      }`}>
                        {ans.isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        <span>{ans.isCorrect ? 'Correcta' : 'Incorrecta'}</span>
                      </span>
                    </div>

                    <p className="font-semibold text-slate-900 dark:text-white">
                      {ans.questionText}
                    </p>

                    <div className="space-y-1 pt-1">
                      <div className="flex items-start gap-1.5">
                        <span className="text-slate-500 font-medium shrink-0">Respuesta elegida:</span>
                        <span className={`font-semibold ${
                          ans.isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
                        }`}>
                          {ans.selectedText}
                        </span>
                      </div>

                      {!ans.isCorrect && (
                        <div className="flex items-start gap-1.5">
                          <span className="text-slate-500 font-medium shrink-0">Respuesta correcta:</span>
                          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                            {ans.correctText}
                          </span>
                        </div>
                      )}

                      <div className="text-[11px] text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200/50 dark:border-slate-800/50 mt-1">
                        <span className="font-semibold">Fundamento:</span> {ans.explanation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detail Footer */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedSubmissionForDetail(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer"
                >
                  Cerrar Detalle
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
