import React from 'react';
import { usePlatform } from '../context/PlatformContext';
import { Download, Trash2, CheckCircle2, AlertTriangle, Save, Sparkles, RefreshCw } from 'lucide-react';

interface AgentStatusBannerProps {
  activityNumber: number;
  title: string;
  subtitle: string;
  inputs: string;
  outputs: string;
}

export const AgentStatusBanner: React.FC<AgentStatusBannerProps> = ({
  activityNumber,
  title,
  subtitle,
  inputs,
  outputs,
}) => {
  const { modules, toggleModuleInstall, saveProgress } = usePlatform();
  const module = modules.find((m) => m.activityNumber === activityNumber);

  if (!module) return null;

  return (
    <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Title & Agent info */}
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-700">
            <span>Actividad {activityNumber} del Proceso</span>
            <span aria-hidden="true">·</span>
            <span>Viaja con Adri</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
          <p className="mt-0.5 text-sm text-slate-600">{subtitle}</p>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
            <span className="font-medium text-slate-800">Agente asignado:</span>
            <span>{module.name}</span>
            <span aria-hidden="true" className="text-slate-300">|</span>
            <span className="font-medium text-slate-800">Versión:</span>
            <span>v{module.version}</span>
            <span aria-hidden="true" className="text-slate-300">|</span>
            <span className="font-medium text-slate-800">Rol:</span>
            <span>{module.role}</span>
          </div>
        </div>

        {/* Action Buttons: 1 Instalar / Desinstalar, 2 Guardar Avances */}
        <div className="flex flex-wrap items-center gap-2.5 sm:self-start lg:self-center">
          {/* Button 1: Instalar / Desinstalar */}
          {module.installed ? (
            <button
              onClick={() => toggleModuleInstall(module.id)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50/70 px-3.5 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100 hover:border-red-300 cursor-pointer"
              title="Desinstalar módulo y pausar automatizaciones de esta actividad"
            >
              <Trash2 className="h-4 w-4 text-red-600" />
              <span>Desinstalar Módulo</span>
            </button>
          ) : (
            <button
              onClick={() => toggleModuleInstall(module.id)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 cursor-pointer"
              title="Instalar y activar este módulo/agente"
            >
              <Download className="h-4 w-4" />
              <span>Instalar Módulo</span>
            </button>
          )}

          {/* Button 2: Guardar Avances */}
          <button
            onClick={() => saveProgress(`Avances de Actividad ${activityNumber} (${title}) guardados exitosamente`)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-800 cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>Guardar Avances</span>
          </button>
        </div>
      </div>

      {/* Inputs / Outputs bar directly from PDF Table 5.1 */}
      <div className="mt-4 grid grid-cols-1 gap-2 border-t border-slate-100 pt-3 md:grid-cols-2 text-xs">
        <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg">
          <span className="font-semibold text-slate-700 shrink-0">Entradas del Módulo:</span>
          <span className="text-slate-600">{inputs}</span>
        </div>
        <div className="flex items-start gap-2 bg-sky-50/50 p-2.5 rounded-lg border border-sky-100">
          <span className="font-semibold text-sky-900 shrink-0">Salidas esperadas:</span>
          <span className="text-sky-800">{outputs}</span>
        </div>
      </div>

      {/* Uninstalled Warning Banner if uninstalled */}
      {!module.installed && (
        <div className="mt-4 flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
            <span>
              <strong>Módulo actualmente desinstalado:</strong> Las herramientas y automatizaciones están en modo de solo lectura o pausadas. Haz clic en "Instalar Módulo" para activarlo.
            </span>
          </div>
          <button
            onClick={() => toggleModuleInstall(module.id)}
            className="ml-3 shrink-0 rounded bg-amber-700 px-3 py-1 text-xs font-medium text-white hover:bg-amber-800 cursor-pointer"
          >
            Instalar ahora
          </button>
        </div>
      )}
    </div>
  );
};
