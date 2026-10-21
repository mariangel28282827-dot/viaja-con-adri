import React from 'react';
import { usePlatform } from '../context/PlatformContext';
import { ProblemItem } from '../types';
import { AlertCircle, CheckCircle2, ArrowRight, ShieldAlert, Sparkles, TrendingUp, Save } from 'lucide-react';

export const ProblemasSoluciones: React.FC = () => {
  const { problems, updateProblem, setActiveTab, saveProgress } = usePlatform();

  const solvedCount = problems.filter((p) => p.status === 'Solucionado').length;
  const inProgressCount = problems.filter((p) => p.status === 'En Proceso').length;

  const getStageActivityTab = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'estrategia':
        return 'act-1';
      case 'contenido':
        return 'act-2';
      case 'pauta':
        return 'act-4';
      case 'atención':
        return 'act-5';
      case 'seguimiento':
        return 'act-6';
      case 'medición':
        return 'act-7';
      default:
        return 'act-2';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Matriz de Diagnóstico & Soluciones</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
            Centro de Solución de Problemas del Área
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Aborda sistemáticamente los dolores críticos documentados en el diagnóstico institucional de Viaja con Adri.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <div className="font-bold text-slate-900">
              {solvedCount} de {problems.length} Solucionados
            </div>
            <div className="text-slate-500 font-medium">
              {Math.round((solvedCount / problems.length) * 100)}% de efectividad de resolución
            </div>
          </div>

          <button
            onClick={() => saveProgress('Estado de problemas y soluciones guardado exitosamente')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-sky-700 text-white hover:bg-sky-800 shadow-sm transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Avances</span>
          </button>
        </div>
      </div>

      {/* Summary Alert Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-800 uppercase">Dolores Solucionados</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">{solvedCount}</div>
          <p className="text-[11px] text-emerald-800 mt-1">
            Respuestas tardías, creación artesanal y falta de medición resueltos por software.
          </p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-800 uppercase">En Implementación Activa</span>
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-700 mt-1">{inProgressCount}</div>
          <p className="text-[11px] text-amber-800 mt-1">
            Campaña regional para incrementar +30% ventas en rutas de Antioquia.
          </p>
        </div>

        <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-sky-800 uppercase">Impacto Operativo</span>
            <TrendingUp className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold text-sky-800 mt-1">+98%</div>
          <p className="text-[11px] text-sky-800 mt-1">
            Aceleración en tiempo de respuesta a viajeros y seguimiento de leads.
          </p>
        </div>
      </div>

      {/* Problems & Solutions List */}
      <div className="space-y-4">
        {problems.map((prob) => {
          const targetTab = getStageActivityTab(prob.stage);

          return (
            <div
              key={prob.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-sky-300 transition"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded">
                      Etapa: {prob.stage}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span
                      className={`text-[11px] font-semibold ${
                        prob.impactLevel === 'Crítico'
                          ? 'text-red-700'
                          : prob.impactLevel === 'Alto'
                          ? 'text-amber-700'
                          : 'text-slate-600'
                      }`}
                    >
                      Impacto: {prob.impactLevel}
                    </span>
                  </div>

                  {/* Problem & Consequence (from PDF) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-red-50/40 border border-red-100">
                      <strong className="text-red-900 block mb-0.5">Problema Actual Identificado:</strong>
                      <p className="text-slate-700">{prob.problem}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-amber-50/40 border border-amber-100">
                      <strong className="text-amber-900 block mb-0.5">Consecuencia Comercial:</strong>
                      <p className="text-slate-700">{prob.consequence}</p>
                    </div>
                  </div>

                  {/* Platform Solution */}
                  <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-100 text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-emerald-900 mb-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Solución Implementada en la Plataforma:</span>
                    </div>
                    <p className="text-slate-800 leading-relaxed">{prob.platformSolution}</p>
                    <div className="mt-1.5 text-[11px] text-emerald-700 font-medium">
                      <strong>Métrica de Mejora:</strong> {prob.metricImproved}
                    </div>
                  </div>
                </div>

                {/* Right controls: Status selector and shortcut button */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-end gap-3 shrink-0">
                  <div className="text-right w-full sm:w-auto">
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">
                      Estado de Resolución:
                    </label>
                    <select
                      value={prob.status}
                      onChange={(e) =>
                        updateProblem({ ...prob, status: e.target.value as any })
                      }
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                        prob.status === 'Solucionado'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : prob.status === 'En Proceso'
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-slate-100 text-slate-800 border-slate-300'
                      }`}
                    >
                      <option value="Solucionado">Solucionado</option>
                      <option value="En Proceso">En Proceso</option>
                      <option value="Mitigado">Mitigado</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setActiveTab(targetTab)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-700 text-white text-xs font-medium hover:bg-sky-800 transition cursor-pointer"
                  >
                    <span>Ir al Módulo de Solución</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
