import React from 'react';
import { usePlatform } from '../context/PlatformContext';
import { AgentModule } from '../types';
import { Download, Trash2, CheckCircle2, AlertTriangle, Settings, RefreshCw, Save, ShieldCheck, Sparkles, Layers } from 'lucide-react';

export const ModuloManager: React.FC = () => {
  const { modules, toggleModuleInstall, setAllModulesInstall, updateModule, saveProgress, setActiveTab } = usePlatform();

  const installedCount = modules.filter((m) => m.installed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-700">
            <Layers className="w-4 h-4" />
            <span>Centro de Agentes de Software & IA</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
            Gestión de Módulos: Instalar y Desinstalar
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Activa o desinstala individualmente los agentes de inteligencia artificial y herramientas que atienden cada etapa del proceso.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setAllModulesInstall(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Instalar Todos los Módulos</span>
          </button>

          <button
            onClick={() => setAllModulesInstall(false)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
            <span>Desinstalar Todos</span>
          </button>

          <button
            onClick={() => saveProgress('Estado de instalación de módulos guardado')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-sky-700 text-white hover:bg-sky-800 shadow-sm transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Avances</span>
          </button>
        </div>
      </div>

      {/* Status banner */}
      <div className="rounded-lg border border-slate-200 bg-sky-50/50 p-4 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-700 shrink-0" />
          <span>
            <strong>Estado del Sistema:</strong> {installedCount} de {modules.length} módulos instalados y operando en segundo plano.
          </span>
        </div>
        <span className="font-semibold text-sky-900">
          Arquitectura: Agentes de software modulares para Viaja con Adri
        </span>
      </div>

      {/* Modules Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {modules.map((mod) => (
          <div
            key={mod.id}
            className={`rounded-xl border p-5 transition flex flex-col justify-between ${
              mod.installed
                ? 'border-slate-200 bg-white shadow-sm hover:border-sky-300'
                : 'border-slate-200 bg-slate-50/60 opacity-75'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-sky-800">
                    <span>Actividad {mod.activityNumber}</span>
                    <span className="text-slate-300">·</span>
                    <span>v{mod.version}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">{mod.name}</h3>
                  <div className="text-xs text-slate-500 font-medium">{mod.role}</div>
                </div>

                <div className="shrink-0">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold ${
                      mod.installed
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {mod.installed ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Instalado</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5 text-slate-500" />
                        <span>Desinstalado</span>
                      </>
                    )}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mt-2">{mod.description}</p>

              {/* Module Configurations */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Ejecución automática en segundo plano:</span>
                  <input
                    type="checkbox"
                    checked={mod.config.autoRun}
                    onChange={(e) =>
                      updateModule({
                        ...mod,
                        config: { ...mod.config, autoRun: e.target.checked },
                      })
                    }
                    className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Notificaciones de eventos y alertas:</span>
                  <input
                    type="checkbox"
                    checked={mod.config.notifications}
                    onChange={(e) =>
                      updateModule({
                        ...mod,
                        config: { ...mod.config, notifications: e.target.checked },
                      })
                    }
                    className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Última sincronización: {mod.lastUpdated}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions: Instalar / Desinstalar Button */}
            <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
              <button
                onClick={() => setActiveTab(`act-${mod.activityNumber}`)}
                className="text-xs font-semibold text-sky-700 hover:text-sky-800 cursor-pointer"
              >
                Abrir Pestaña de la Actividad →
              </button>

              {mod.installed ? (
                <button
                  onClick={() => toggleModuleInstall(mod.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100 transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-600" />
                  <span>Desinstalar Módulo</span>
                </button>
              ) : (
                <button
                  onClick={() => toggleModuleInstall(mod.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 shadow-xs transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Instalar Módulo</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
