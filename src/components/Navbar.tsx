import React from 'react';
import { usePlatform } from '../context/PlatformContext';
import { Save, FileText, RotateCcw, Download, Sparkles, CheckCircle2, ChevronDown, BookOpen } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { modules, lastSaved, saveProgress, resetToDefaults, openPdfModal, setActiveTab } = usePlatform();
  const installedCount = modules.filter((m) => m.installed).length;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-900 to-sky-700 font-black text-white shadow-sm">
            <span className="text-sm tracking-tight">VA</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold tracking-tight text-slate-900">
                Viaja con Adri
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-semibold text-sky-800">Marketing Digital</span>
            </div>
            <p className="text-[11px] text-slate-500">Agencia de Viajes y Turismo · Medellín</p>
          </div>
        </div>

        {/* Action Controls: Manual, PDF Docs, Modules Badge, Guardar Avances */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Manual de Usuario Button */}
          <button
            onClick={() => setActiveTab('manual')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-800 hover:bg-sky-100 transition cursor-pointer"
            title="Abrir el Manual de Usuario completo"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-700" />
            <span className="hidden sm:inline">Manual de Usuario</span>
          </button>

          {/* Attached PDFs dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-sky-700" />
              <span className="hidden md:inline">Documentos Originales</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-1 hidden w-72 rounded-xl border border-slate-200 bg-white p-2 shadow-lg group-hover:block z-50">
              <span className="block px-2 py-1 text-[10px] font-bold uppercase text-slate-400">
                Archivos PDF de Referencia
              </span>

              <button
                onClick={() =>
                  openPdfModal(
                    '/assets/aistudio/Proceso_Marketing_Digital_Viaja_con_Adri_c59dfbf4.pdf',
                    'Proceso de Marketing Digital - Viaja con Adri'
                  )
                }
                className="w-full text-left rounded-lg p-2 text-xs hover:bg-sky-50 text-slate-800 flex flex-col cursor-pointer"
              >
                <span className="font-semibold text-sky-900">1. Proceso de Marketing Digital</span>
                <span className="text-[10px] text-slate-500">Flujograma, 7 módulos y problemas</span>
              </button>

              <button
                onClick={() =>
                  openPdfModal(
                    '/assets/aistudio/FICHADECARACTERIZACIONVIAJACONADRI__1__d9dee91c.pdf',
                    'Ficha de Caracterización (Calidad / PHVA)'
                  )
                }
                className="w-full text-left rounded-lg p-2 text-xs hover:bg-sky-50 text-slate-800 flex flex-col cursor-pointer"
              >
                <span className="font-semibold text-sky-900">2. Ficha de Caracterización</span>
                <span className="text-[10px] text-slate-500">Matriz PHVA, insumos y proveedores</span>
              </button>

              <button
                onClick={() =>
                  openPdfModal(
                    '/assets/aistudio/Presentaci_n_5125e352.pdf',
                    'Presentación SENA - Viaja con Adri'
                  )
                }
                className="w-full text-left rounded-lg p-2 text-xs hover:bg-sky-50 text-slate-800 flex flex-col cursor-pointer"
              >
                <span className="font-semibold text-sky-900">3. Presentación Proyecto SENA</span>
                <span className="text-[10px] text-slate-500">Ciclo Deming, FODA, rutas regionales</span>
              </button>
            </div>
          </div>

          {/* Module count pill */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-slate-700">{installedCount}/7</span>
            <span className="text-slate-500">Módulos</span>
          </div>

          {/* Reset button */}
          <button
            onClick={resetToDefaults}
            title="Restablecer a datos originales de Viaja con Adri"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Core Button 2: Guardar Avances */}
          <button
            onClick={() => saveProgress()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-700 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-sky-800 transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Avances</span>
          </button>
        </div>
      </div>
    </header>
  );
};
