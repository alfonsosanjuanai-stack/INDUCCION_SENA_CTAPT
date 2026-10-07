import React, { useState } from 'react';
import { X, Printer, Check, UserCheck, RefreshCw, QrCode } from 'lucide-react';
import { ApprenticeProfile } from '../types/induction';
import { SENA_REGIONALES, POPULAR_PROGRAMS } from '../data/inductionData';

interface ApprenticeCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ApprenticeProfile;
  onUpdateProfile: (updated: Partial<ApprenticeProfile>) => void;
}

export const ApprenticeCardModal: React.FC<ApprenticeCardModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const [formData, setFormData] = useState({
    fullName: profile.fullName,
    documentType: profile.documentType,
    documentNumber: profile.documentNumber,
    programName: profile.programName,
    fichaNumber: profile.fichaNumber,
    regional: profile.regional,
    trainingCenter: profile.trainingCenter
  });

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              Carné Digital del Aprendiz SENA
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-750 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{isFlipped ? 'Ver Anverso' : 'Ver Reverso'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-750 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Imprimir Carné"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {!isEditing ? (
            <div className="flex flex-col items-center">
              {/* THE CARD */}
              <div
                className={`w-full max-w-md rounded-2xl border-2 border-emerald-600/30 shadow-xl overflow-hidden transition-all duration-300 bg-white ${
                  isFlipped ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white' : ''
                }`}
              >
                {!isFlipped ? (
                  /* FRONT OF CARD */
                  <div>
                    {/* Top Green Band */}
                    <div className="bg-emerald-600 px-5 py-3 text-white flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded bg-white text-emerald-700 font-extrabold flex items-center justify-center text-xs">
                          SENA
                        </div>
                        <div className="leading-tight">
                          <div className="text-[10px] tracking-widest uppercase font-semibold text-emerald-100">
                            Servicio Nacional de Aprendizaje
                          </div>
                          <div className="text-xs font-extrabold">REPÚBLICA DE COLOMBIA</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 bg-emerald-700 rounded text-emerald-100">
                        APRENDIZ
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-5 flex gap-4 items-start">
                      {/* Avatar */}
                      <div className="w-24 h-28 rounded-xl bg-slate-100 border-2 border-emerald-500/20 flex flex-col items-center justify-center text-slate-400 shrink-0 overflow-hidden relative">
                        <UserCheck className="w-10 h-10 text-emerald-600" />
                        <span className="text-[9px] font-semibold text-slate-500 mt-1">Activo</span>
                        <div className="absolute bottom-0 inset-x-0 bg-emerald-600 text-white text-[8px] text-center font-bold py-0.5">
                          2026-I
                        </div>
                      </div>

                      {/* Info */}
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div>
                          <div className="text-[10px] font-semibold text-slate-400 uppercase">Nombre Completo</div>
                          <div className="text-sm font-bold text-slate-900 truncate">
                            {profile.fullName}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <div className="text-[10px] font-semibold text-slate-400 uppercase">Documento</div>
                            <div className="font-mono font-semibold text-slate-800">
                              {profile.documentType} {profile.documentNumber}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] font-semibold text-slate-400 uppercase">Ficha</div>
                            <div className="font-mono font-bold text-emerald-700">
                              {profile.fichaNumber}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] font-semibold text-slate-400 uppercase">Programa de Formación</div>
                          <div className="text-xs font-medium text-slate-800 line-clamp-2">
                            {profile.programName}
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] font-semibold text-slate-400 uppercase">Regional y Centro</div>
                          <div className="text-[11px] text-slate-600 truncate">
                            {profile.regional}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">
                            {profile.trainingCenter}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Barcode / Security strip */}
                    <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <QrCode className="w-5 h-5 text-slate-700" />
                        <span className="font-mono text-[10px] tracking-wider text-slate-600">
                          SENA-APP-{profile.fichaNumber}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-700">
                        Inducción En Curso
                      </span>
                    </div>
                  </div>
                ) : (
                  /* BACK OF CARD */
                  <div className="p-6 space-y-4 text-xs text-slate-200">
                    <div className="border-b border-slate-700 pb-3 flex items-center justify-between">
                      <span className="font-bold text-emerald-400 tracking-wider">CÓDIGO DE INTEGRIDAD</span>
                      <span className="text-[10px] text-slate-400">Acuerdo 009 de 2024</span>
                    </div>

                    <p className="italic text-[11px] leading-relaxed text-slate-300">
                      "Soy Aprendiz del SENA: Asumo con orgullo y honor el compromiso de formarme integralmente
                      para aportar al desarrollo técnico, productivo y social de Colombia, respetando a mis instructores,
                      compañeros y entorno."
                    </p>

                    <div className="space-y-1.5 pt-2 text-[10px] text-slate-300">
                      <div className="font-semibold text-slate-100">Normas del Carné:</div>
                      <div>• Este carné es personal e intransferible.</div>
                      <div>• Debe portarse en lugar visible para ingresar al Centro.</div>
                      <div>• En caso de pérdida, reporte inmediatamente a Coordinación Académica.</div>
                    </div>

                    <div className="pt-3 border-t border-slate-700 text-[10px] flex justify-between text-slate-400">
                      <span>Línea Gratuita: 01 8000 910 270</span>
                      <span>www.sena.edu.co</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action to switch to editing */}
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 underline cursor-pointer"
              >
                Editar mis datos (Nombre, Ficha, Regional, Programa)
              </button>
            </div>
          ) : (
            /* EDIT FORM */
            <form onSubmit={handleSave} className="space-y-4">
              <div className="text-sm font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                Actualizar Información del Aprendiz
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tipo de Documento
                  </label>
                  <select
                    value={formData.documentType}
                    onChange={(e) => setFormData({ ...formData, documentType: e.target.value as ApprenticeProfile['documentType'] })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="CC">Cédula de Ciudadanía (CC)</option>
                    <option value="TI">Tarjeta de Identidad (TI)</option>
                    <option value="CE">Cédula de Extranjería (CE)</option>
                    <option value="PEP">Permiso Especial (PEP / PPT)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Número de Documento
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.documentNumber}
                    onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Número de Ficha
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fichaNumber}
                    onChange={(e) => setFormData({ ...formData, fichaNumber: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Regional SENA
                  </label>
                  <select
                    value={formData.regional}
                    onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {SENA_REGIONALES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Programa de Formación
                  </label>
                  <input
                    type="text"
                    list="programs-list"
                    required
                    value={formData.programName}
                    onChange={(e) => setFormData({ ...formData, programName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <datalist id="programs-list">
                    {POPULAR_PROGRAMS.map((p) => (
                      <option key={p} value={p} />
                    ))}
                  </datalist>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Centro de Formación
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.trainingCenter}
                    onChange={(e) => setFormData({ ...formData, trainingCenter: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Guardar Datos</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
