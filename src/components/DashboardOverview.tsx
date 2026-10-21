import React from 'react';
import { usePlatform } from '../context/PlatformContext';
import { ArrowRight, CheckCircle2, AlertCircle, Compass, Users, Sparkles, Megaphone, MessageSquare, DollarSign, BarChart3, Save, Layers, Download, Trash2, FileText, ChevronRight } from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const {
    modules,
    leads,
    campaigns,
    contentPieces,
    problems,
    setActiveTab,
    saveProgress,
    toggleModuleInstall,
    setAllModulesInstall,
    openPdfModal,
  } = usePlatform();

  const installedCount = modules.filter((m) => m.installed).length;
  const solvedProblemsCount = problems.filter((p) => p.status === 'Solucionado').length;
  const totalLeads = leads.length;
  const confirmedLeads = leads.filter((l) => l.status === 'Reserva Confirmada');
  const totalSalesCOP = confirmedLeads.reduce(
    (acc, l) => acc + (l.quoteAmountCOP || l.budgetCOP),
    0
  );

  const FLOW_STEPS = [
    {
      num: 1,
      id: 'act-1',
      title: '1. Investigación y Estrategia',
      role: 'Buyer Persona & Metas SMART',
      icon: Compass,
      moduleId: 'mod-1',
      summary: 'Define audiencias, temporadas altas/bajas de Colombia y metas cuantificables.',
    },
    {
      num: 2,
      id: 'act-2',
      title: '2. Creación de Contenido',
      role: 'Redactor & Guionista',
      icon: Sparkles,
      moduleId: 'mod-2',
      summary: 'Genera guiones para Reels/TikTok con tarifas transparentes y equipaje incluido.',
    },
    {
      num: 3,
      id: 'act-3',
      title: '3. Aprobación y Programación',
      role: 'Control Editorial Adri',
      icon: CheckCircle2,
      moduleId: 'mod-3',
      summary: 'Revisión por Adriana Osorio y calendario semanal automatizado.',
    },
    {
      num: 4,
      id: 'act-4',
      title: '4. Publicación y Pauta',
      role: 'Paid Media & UTMs',
      icon: Megaphone,
      moduleId: 'mod-4',
      summary: 'Meta Ads & TikTok con segmentación en Medellín y enlaces rastreados a WhatsApp.',
    },
    {
      num: 5,
      id: 'act-5',
      title: '5. Atención y Captación',
      role: 'Chatbot Inmediato < 3min',
      icon: MessageSquare,
      moduleId: 'mod-5',
      summary: 'Respuesta automática de consultas, scoring de temperatura y bandeja de leads.',
    },
    {
      num: 6,
      id: 'act-6',
      title: '6. Seguimiento y Cierre',
      role: 'CRM Comercial & Cotizador',
      icon: DollarSign,
      moduleId: 'mod-6',
      summary: 'Cotizaciones formales y registro de abonos bancarios de reservas.',
    },
    {
      num: 7,
      id: 'act-7',
      title: '7. Medición y Reporte',
      role: 'Analítica & Ciclo Deming',
      icon: BarChart3,
      moduleId: 'mod-7',
      summary: 'Indicador de Efectividad del Gerente (SENA) y plan de mejoras continuo.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Presentation Banner */}
      <div className="rounded-xl border border-sky-200 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-6 text-white shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
              <span>Agencia de Viajes & Turismo · Medellín, Colombia</span>
              <span aria-hidden="true">·</span>
              <span>Fundada en 2020</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              Viaja con Adri · Plataforma de Gestión de Marketing Digital
            </h1>
            <p className="text-sm text-sky-100 max-w-2xl leading-relaxed">
              Sistema integral para caracterizar el proceso, coordinar los 7 módulos de actividades con agentes de IA,
              resolver los problemas críticos del área y monitorear el cumplimiento de metas comerciales.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-sky-200">
              <div>
                <strong className="text-white">Líder del Proceso:</strong> Adriana Osorio Sánchez (Directora General)
              </div>
              <div className="hidden sm:inline" aria-hidden="true">·</div>
              <div>
                <strong className="text-white">Código de Calidad:</strong> MK-cp-01 / Versión 01
              </div>
              <div className="hidden sm:inline" aria-hidden="true">·</div>
              <div>
                <strong className="text-white">Módulos Instalados:</strong> {installedCount}/7 Activos
              </div>
            </div>
          </div>

          {/* Quick Hero Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => saveProgress('Avances generales guardados correctamente en la plataforma')}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-sky-500 transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Avances Generales</span>
            </button>

            <button
              onClick={() => setActiveTab('caracterizacion')}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-sky-400/50 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 transition cursor-pointer"
            >
              <FileText className="w-4 h-4 text-sky-300" />
              <span>Ver Ficha de Caracterización</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Cumplimiento de Ventas (SENA)</span>
          <div className="text-2xl font-bold text-sky-700 mt-1">
            {Math.round((totalSalesCOP / 10000000) * 100)}%
          </div>
          <div className="text-xs text-slate-600 mt-1">
            ${(totalSalesCOP / 1000000).toFixed(2)}M de $10M COP meta
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Problemas del Área Resueltos</span>
          <div className="text-2xl font-bold text-emerald-600 mt-1">
            {solvedProblemsCount} de {problems.length}
          </div>
          <div className="text-xs text-slate-600 mt-1">
            {Math.round((solvedProblemsCount / problems.length) * 100)}% de mitigación activa
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Tiempo de Respuesta</span>
          <div className="text-2xl font-bold text-emerald-600 mt-1">2.4 min</div>
          <div className="text-xs text-slate-600 mt-1">Reducido desde 180 min gracias a IA</div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Leads Registrados en CRM</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{totalLeads}</div>
          <div className="text-xs text-slate-600 mt-1">{confirmedLeads.length} reservas confirmadas</div>
        </div>
      </div>

      {/* Flujograma del Proceso (From Page 2 of PDF) */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700">
              <Layers className="w-4 h-4" />
              <span>Flujograma Oficial del Proceso</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Los 7 Módulos de Actividades de Marketing Digital
            </h2>
            <p className="text-xs text-slate-600">
              Cada paso del flujo cuenta con una pestaña dedicada y un agente de software instalable/desinstalable.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAllModulesInstall(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instalar Todos</span>
            </button>
            <button
              onClick={() => setAllModulesInstall(false)}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-600" />
              <span>Desinstalar Todos</span>
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="space-y-3">
          {FLOW_STEPS.map((step, idx) => {
            const mod = modules.find((m) => m.id === step.moduleId);
            const isInstalled = mod?.installed ?? true;
            const StepIcon = step.icon;

            return (
              <div
                key={step.id}
                className={`rounded-lg border p-4 transition flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isInstalled
                    ? 'border-slate-200 bg-slate-50/50 hover:border-sky-300 hover:bg-sky-50/20'
                    : 'border-slate-200 bg-slate-100/60 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                      isInstalled
                        ? 'bg-sky-700 text-white shadow-xs'
                        : 'bg-slate-300 text-slate-600'
                    }`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm">{step.title}</h3>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs font-medium text-slate-500">{step.role}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          isInstalled
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {isInstalled ? 'Módulo Instalado' : 'Desinstalado'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{step.summary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  {/* Instalar / Desinstalar toggle */}
                  {mod && (
                    <button
                      onClick={() => toggleModuleInstall(mod.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition cursor-pointer border ${
                        isInstalled
                          ? 'border-red-200 bg-white text-red-700 hover:bg-red-50'
                          : 'border-emerald-300 bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {isInstalled ? 'Desinstalar' : 'Instalar'}
                    </button>
                  )}

                  <button
                    onClick={() => setActiveTab(step.id)}
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-sky-700 text-white hover:bg-sky-800 transition cursor-pointer"
                  >
                    <span>Abrir Actividad</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick link cards to Characterization & Problems */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onClick={() => setActiveTab('caracterizacion')}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-sky-300 hover:shadow-xs transition cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700 mb-1">
              <FileText className="w-4 h-4" />
              <span>Documento Normativo</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Ficha de Caracterización Oficial PHVA</h3>
            <p className="text-xs text-slate-600 mt-1">
              Consulta la ficha técnica formal (GH-cp-01 / MK-cp-01) con proveedores, insumos, actividades del ciclo de Deming, productos y clientes.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-sky-700 font-semibold">
            <span>Gestionar Ficha de Caracterización</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div
          onClick={() => setActiveTab('problemas')}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-sky-300 hover:shadow-xs transition cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Diagnóstico de Dolores</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Centro de Solución de Problemas del Área</h3>
            <p className="text-xs text-slate-600 mt-1">
              Revisa cómo la plataforma soluciona los 6 dolores críticos: Tiempo, Constancia, Leads perdidos, Falta de datos, Mensajes genéricos y Rutas Regionales.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-amber-700 font-semibold">
            <span>Ver Matriz de Soluciones y Estados</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
