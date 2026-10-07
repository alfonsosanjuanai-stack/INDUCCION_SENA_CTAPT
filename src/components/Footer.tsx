import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center text-white text-xs font-black">
                S
              </div>
              <span>SENA Colombia</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Servicio Nacional de Aprendizaje SENA. Adscrito al Ministerio del Trabajo de la República de Colombia.
              Educación técnica y tecnológica pública, gratuita y de calidad.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-white font-bold">Líneas de Atención</div>
            <div>• Bogotá D.C.: (601) 343 0111</div>
            <div>• Línea Gratuita Nacional: 01 8000 910 270</div>
            <div>• Línea Empresarial: 01 8000 910 682</div>
            <div>• Horario: Lunes a Viernes 7:00 a.m. a 7:00 p.m.</div>
          </div>

          <div className="space-y-2">
            <div className="text-white font-bold">Portales Institucionales</div>
            <div>
              <a href="https://www.sena.edu.co" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                Portal Oficial SENA (www.sena.edu.co)
              </a>
            </div>
            <div>
              <a href="https://zajuna.sena.edu.co" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                Zajuna LMS (Ambiente Virtual)
              </a>
            </div>
            <div>
              <a href="https://oferta.senasofiaplus.edu.co" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                Sofia Plus (Gestión Académica)
              </a>
            </div>
            <div>
              <a href="https://ape.sena.edu.co" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                Agencia Pública de Empleo (APE)
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-white font-bold">Identidad & Cobertura</div>
            <div>• 33 Direcciones Regionales</div>
            <div>• 117 Centros de Formación Profesional</div>
            <div>• Sede Principal: Calle 57 No. 8 - 69, Bogotá D.C.</div>
            <div>• Personería Jurídica: Decreto Ley 118 de 1957</div>
            {onOpenAdmin && (
              <div className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="text-[11px] text-slate-500 hover:text-emerald-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Portal Administrativo / Instructor</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Servicio Nacional de Aprendizaje SENA. Plataforma Formativa de Inducción para Aprendices.
          </div>
          <div className="flex items-center gap-3">
            <span>Primero la Vida</span>
            <span aria-hidden="true">·</span>
            <span>Trabajo Digno</span>
            <span aria-hidden="true">·</span>
            <span>Justicia Social</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
