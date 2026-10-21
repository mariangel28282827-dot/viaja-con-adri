import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { AgentStatusBanner } from '../AgentStatusBanner';
import { BarChart3, TrendingUp, CheckCircle, AlertCircle, FileText, Download, Printer, RefreshCw, Layers } from 'lucide-react';

export const Activity7MedicionReporte: React.FC = () => {
  const { leads, campaigns, contentPieces, modules, saveProgress } = usePlatform();
  const module = modules.find((m) => m.activityNumber === 7);
  const isInstalled = module?.installed ?? true;

  // Commercial Targets (from SENA presentation: Meta $10M COP)
  const targetSalesCOP = 10000000;
  const confirmedLeads = leads.filter((l) => l.status === 'Reserva Confirmada');
  const actualSalesCOP = confirmedLeads.reduce(
    (acc, l) => acc + (l.quoteAmountCOP || l.budgetCOP),
    0
  );

  // SENA Formula: Ventas reales / Ventas proyectadas * 100
  const effectivenessRate = Math.min(
    100,
    Math.round((actualSalesCOP / targetSalesCOP) * 100)
  );

  const totalSpentCOP = campaigns.reduce((acc, c) => acc + c.spentCOP, 0);
  const totalLeadsCount = leads.length;
  const avgCPL = totalLeadsCount > 0 ? Math.round(totalSpentCOP / totalLeadsCount) : 0;
  const conversionRate = totalLeadsCount > 0 ? Math.round((confirmedLeads.length / totalLeadsCount) * 100) : 0;

  // Breakdown by channel
  const channels = ['WhatsApp', 'Instagram DM', 'TikTok', 'Formulario Web'];
  const channelData = channels.map((ch) => {
    const channelLeads = leads.filter((l) => l.channel === ch);
    const channelConfirmed = channelLeads.filter((l) => l.status === 'Reserva Confirmada');
    const channelSales = channelConfirmed.reduce(
      (acc, l) => acc + (l.quoteAmountCOP || l.budgetCOP),
      0
    );
    return {
      channel: ch,
      leads: channelLeads.length,
      confirmed: channelConfirmed.length,
      sales: channelSales,
    };
  });

  return (
    <div>
      <AgentStatusBanner
        activityNumber={7}
        title="Medición y Reporte"
        subtitle="Módulo de analítica: Indicador de efectividad del gerente (SENA), métricas de pauta y ciclo de mejora continua PHVA."
        inputs="Métricas de redes sociales, pauta digital de Meta/TikTok, base de leads captados y ventas registradas."
        outputs="Informe mensual gerencial consolidado, indicadores de calidad y plan de mejoras para el siguiente ciclo."
      />

      <div className={`space-y-8 ${!isInstalled ? 'opacity-60 pointer-events-none' : ''}`}>
        {/* SENA Management Effectiveness Indicator Hero Card */}
        <div className="rounded-xl border border-sky-200 bg-gradient-to-br from-sky-900 via-sky-800 to-slate-900 p-6 text-white shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-300">
                Indicador Clave de Efectividad Comercial (SENA - Formulación Oficial)
              </span>
              <h2 className="text-2xl font-black mt-1">Cumplimiento del Plan de Ventas</h2>
              <p className="text-xs text-sky-200 mt-1 max-w-xl">
                <strong>Fórmula:</strong> (Ventas reales / Ventas proyectadas) × 100. Dirigido por Adriana Osorio para evaluar el desempeño de la gestión comercial de Viaja con Adri.
              </p>
            </div>

            <div className="text-right shrink-0 bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/20">
              <div className="text-4xl font-extrabold text-amber-400">{effectivenessRate}%</div>
              <div className="text-xs text-sky-100 font-medium mt-0.5">
                {effectivenessRate >= 90 ? 'Meta alcanzada / Excelente' : 'Cercano a la meta mensual'}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-sky-700/60 pt-4 text-xs">
            <div>
              <span className="text-sky-300">Meta Proyectada:</span>
              <div className="text-lg font-bold mt-0.5">${(targetSalesCOP / 1000000).toFixed(1)}M COP</div>
            </div>
            <div>
              <span className="text-sky-300">Ventas Reales Alcanzadas:</span>
              <div className="text-lg font-bold text-emerald-400 mt-0.5">
                ${(actualSalesCOP / 1000000).toFixed(2)}M COP
              </div>
            </div>
            <div>
              <span className="text-sky-300">Diferencia para Meta:</span>
              <div className="text-lg font-bold text-amber-300 mt-0.5">
                ${Math.max(0, targetSalesCOP - actualSalesCOP).toLocaleString('es-CO')} COP
              </div>
            </div>
          </div>

          <div className="mt-4 w-full bg-sky-950/80 rounded-full h-3 overflow-hidden p-0.5 border border-sky-600/40">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-700"
              style={{ width: `${effectivenessRate}%` }}
            />
          </div>
        </div>

        {/* 4 Process Quality Indicators (Characterization table 5.2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">Tiempo 1ª Respuesta</span>
            <div className="text-2xl font-bold text-emerald-600 mt-1">2.4 min</div>
            <div className="text-xs text-slate-600 mt-1">Meta de calidad: &lt; 5 min</div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">Costo por Lead (CPL)</span>
            <div className="text-2xl font-bold text-sky-700 mt-1">
              ${avgCPL.toLocaleString('es-CO')} <span className="text-xs font-normal text-slate-500">COP</span>
            </div>
            <div className="text-xs text-slate-600 mt-1">Inversión promedio por prospecto</div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">Tasa de Conversión</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">{conversionRate}%</div>
            <div className="text-xs text-emerald-700 font-medium mt-1">
              {confirmedLeads.length} de {totalLeadsCount} leads cerrados
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">Piezas Publicadas / Aprobadas</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">{contentPieces.length}</div>
            <div className="text-xs text-slate-600 mt-1">Garantiza constancia editorial</div>
          </div>
        </div>

        {/* Sales by Channel Table */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-1">Rendimiento Comercial por Canal Digital</h3>
          <p className="text-xs text-slate-600 mb-4">
            Identifica qué canal y campaña genera realmente reservas confirmadas (soluciona el dolor "Falta de datos").
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                  <th className="p-3">Canal Digital</th>
                  <th className="p-3">Leads Registrados</th>
                  <th className="p-3">Reservas Confirmadas</th>
                  <th className="p-3">Tasa Conversión</th>
                  <th className="p-3 text-right">Facturación Generada (COP)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {channelData.map((cd, idx) => {
                  const conv = cd.leads > 0 ? Math.round((cd.confirmed / cd.leads) * 100) : 0;
                  return (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-slate-800">{cd.channel}</td>
                      <td className="p-3 text-slate-600">{cd.leads}</td>
                      <td className="p-3 text-emerald-700 font-semibold">{cd.confirmed}</td>
                      <td className="p-3 font-medium text-slate-700">{conv}%</td>
                      <td className="p-3 text-right font-bold text-slate-900">
                        ${cd.sales.toLocaleString('es-CO')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Deming Cycle Improvement Plan (Ciclo de Deming / PHVA) */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700 mb-1">
            <Layers className="w-4 h-4" />
            <span>Mejora Continua</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">Plan de Acción y Ciclo de Deming</h3>
          <p className="text-xs text-slate-600 mb-6">
            Alineado con las directrices de calidad de la caracterización institucional.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg border border-slate-200 bg-sky-50/40 p-4">
              <span className="text-xs font-bold text-sky-800 uppercase">1. PLANEAR</span>
              <h4 className="text-sm font-bold text-slate-900 mt-1">Demanda Regional</h4>
              <p className="text-xs text-slate-600 mt-1">
                Analizar la demanda de tiquetes y pasadías de fin de semana en Antioquia. Definir tarifas con equipaje garantizado.
              </p>
              <div className="mt-3 text-[11px] text-sky-700 font-semibold">Estado: Planificado</div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-emerald-50/40 p-4">
              <span className="text-xs font-bold text-emerald-800 uppercase">2. HACER</span>
              <h4 className="text-sm font-bold text-slate-900 mt-1">Ejecución & Contenido</h4>
              <p className="text-xs text-slate-600 mt-1">
                Publicar semanalmente en redes mostrando precios por trayecto. Respuestas inmediatas por WhatsApp asistidas por IA.
              </p>
              <div className="mt-3 text-[11px] text-emerald-700 font-semibold">Estado: En ejecución</div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-amber-50/40 p-4">
              <span className="text-xs font-bold text-amber-800 uppercase">3. VERIFICAR</span>
              <h4 className="text-sm font-bold text-slate-900 mt-1">Auditoría de Métricas</h4>
              <p className="text-xs text-slate-600 mt-1">
                Comparar ventas planificadas ($10M) vs reales ($9.25M). Medir tasa de respuesta y retroalimentación de clientes.
              </p>
              <div className="mt-3 text-[11px] text-amber-700 font-semibold">Estado: Verificado (92.5%)</div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-purple-50/40 p-4">
              <span className="text-xs font-bold text-purple-800 uppercase">4. ACTUAR EN MEJORA</span>
              <h4 className="text-sm font-bold text-slate-900 mt-1">Optimizaciones Activas</h4>
              <p className="text-xs text-slate-600 mt-1">
                Ajustar presupuesto hacia WhatsApp Directo. Ampliar convenios hoteleros en Guatapé y Jericó para abaratar costes.
              </p>
              <div className="mt-3 text-[11px] text-purple-700 font-semibold">Estado: En implementación</div>
            </div>
          </div>
        </div>

        {/* Printable Monthly Executive Report */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Informe Mensual Ejecutivo para Dirección General</h3>
              <p className="text-xs text-slate-600">
                Documento de balance mensual listo para presentación ante Adriana Osorio y el equipo SENA.
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-white hover:bg-slate-900 transition cursor-pointer self-start sm:self-auto"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Exportar Informe</span>
            </button>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs space-y-2 text-slate-700">
            <p>
              <strong>Resumen de Gestión (Octubre 2026):</strong> Durante el periodo evaluado, se logró un cumplimiento del <strong>{effectivenessRate}%</strong> de la meta comercial, generando <strong>${actualSalesCOP.toLocaleString('es-CO')} COP</strong> en ventas reales.
            </p>
            <p>
              La implementación del agente de atención redujo el tiempo de espera de los viajeros de más de 2 horas a <strong>2.4 minutos</strong>, evitando la fuga de prospectos en WhatsApp. Las campañas de rutas regionales en Antioquia arrojaron un Costo por Lead de <strong>${avgCPL.toLocaleString('es-CO')} COP</strong>, dentro de los márgenes de alta rentabilidad.
            </p>
            <p className="font-semibold text-slate-900 pt-1">
              Responsable de Evaluación: Adriana Osorio Sánchez · Directora General Viaja con Adri
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
