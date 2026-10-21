import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { AgentStatusBanner } from '../AgentStatusBanner';
import { AdCampaign } from '../../types';
import { Megaphone, DollarSign, Target, Link as LinkIcon, Check, Plus, ArrowRight, Play, Pause, ExternalLink } from 'lucide-react';

export const Activity4Pauta: React.FC = () => {
  const { campaigns, addCampaign, updateCampaign, deleteCampaign, modules, setActiveTab } = usePlatform();
  const module = modules.find((m) => m.activityNumber === 4);
  const isInstalled = module?.installed ?? true;

  // New campaign modal state
  const [showNewCampModal, setShowNewCampModal] = useState(false);
  const [newCamp, setNewCamp] = useState({
    name: '',
    channel: 'Meta Ads (IG/FB)' as AdCampaign['channel'],
    budgetCOP: 500000,
    targetAudience: 'Medellín y Valle de Aburrá, 22-45 años interesados en viajes de fin de semana',
    geographicZone: 'Medellín +25km',
    startDate: new Date().toISOString().slice(0, 10),
    endDate: '2026-11-20',
    targetCostPerLead: 3000,
    utmCampaign: 'pauta_regional_nov2026',
  });

  // WhatsApp generator state
  const [waDestination, setWaDestination] = useState('Guatapé');
  const [waUtm, setWaUtm] = useState('meta_ads_regional');
  const [copiedLink, setCopiedLink] = useState(false);

  const totalBudget = campaigns.reduce((acc, c) => acc + c.budgetCOP, 0);
  const totalSpent = campaigns.reduce((acc, c) => acc + c.spentCOP, 0);
  const totalLeads = campaigns.reduce((acc, c) => acc + c.leadsGenerated, 0);
  const avgCPL = totalLeads > 0 ? Math.round(totalSpent / totalLeads) : 0;

  const generatedWhatsAppLink = `https://wa.me/573176229851?text=${encodeURIComponent(
    `Hola Viaja con Adri, vi la promoción de ${waDestination} en redes y deseo recibir la cotización detallada con fechas disponibles. [Ref: ${waUtm}]`
  )}`;

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCamp.name) return;

    addCampaign({
      ...newCamp,
      spentCOP: 0,
      status: 'Activa',
      clicks: 0,
      leadsGenerated: 0,
      actualCostPerLead: 0,
    });

    setNewCamp({
      name: '',
      channel: 'Meta Ads (IG/FB)',
      budgetCOP: 500000,
      targetAudience: '',
      geographicZone: 'Medellín +25km',
      startDate: new Date().toISOString().slice(0, 10),
      endDate: '2026-11-20',
      targetCostPerLead: 3000,
      utmCampaign: '',
    });
    setShowNewCampModal(false);
  };

  const copyWaLink = () => {
    navigator.clipboard.writeText(generatedWhatsAppLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div>
      <AgentStatusBanner
        activityNumber={4}
        title="Publicación y Pauta Digital"
        subtitle="Módulo de paid media: Inversión publicitaria segmentada, control de presupuesto y enlaces con trazabilidad a WhatsApp."
        inputs="Piezas publicitarias aprobadas, presupuesto de pauta en COP, criterios de segmentación regional y nacional."
        outputs="Anuncios activos en Meta Ads (Instagram/Facebook) y TikTok, enlaces con UTM y tráfico calificado a WhatsApp."
      />

      <div className={`space-y-8 ${!isInstalled ? 'opacity-60 pointer-events-none' : ''}`}>
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">Presupuesto Asignado</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              ${(totalBudget / 1000000).toFixed(2)}M <span className="text-xs font-normal text-slate-500">COP</span>
            </div>
            <div className="text-xs text-slate-600 mt-1">Gasto actual: ${(totalSpent / 1000000).toFixed(2)}M COP</div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">Leads Generados</span>
            <div className="text-2xl font-bold text-sky-700 mt-1">{totalLeads}</div>
            <div className="text-xs text-slate-600 mt-1">Consultas directas a WhatsApp y DM</div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">Costo Promedio / Lead (CPL)</span>
            <div className="text-2xl font-bold text-emerald-600 mt-1">
              ${avgCPL.toLocaleString('es-CO')} <span className="text-xs font-normal text-slate-500">COP</span>
            </div>
            <div className="text-xs text-emerald-700 mt-1 font-medium">Meta óptima: &lt; $3.500 COP</div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">Campañas Activas</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">{campaigns.filter((c) => c.status === 'Activa').length}</div>
            <div className="text-xs text-slate-600 mt-1">Meta Ads & TikTok en curso</div>
          </div>
        </div>

        {/* Campaign Management Table */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700">
                <Megaphone className="w-4 h-4" />
                <span>Gestor de Campañas Activas</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">Control de Inversión y Segmentación</h2>
              <p className="text-xs text-slate-600">
                Soluciona el dolor de "Inversión sin segmentación ni medición de resultados".
              </p>
            </div>

            <button
              onClick={() => setShowNewCampModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-sky-700 text-white hover:bg-sky-800 transition cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Campaña de Pauta</span>
            </button>
          </div>

          <div className="space-y-4">
            {campaigns.map((camp) => {
              const budgetUsagePercent = Math.min(100, Math.round((camp.spentCOP / camp.budgetCOP) * 100));

              return (
                <div
                  key={camp.id}
                  className="rounded-lg border border-slate-200 bg-slate-50/40 p-5 hover:border-sky-300 transition"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-semibold text-sky-800">{camp.channel}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-slate-500">UTM: {camp.utmCampaign}</span>
                        <span className="text-slate-300">·</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                            camp.status === 'Activa' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {camp.status}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-base">{camp.name}</h3>
                      <p className="text-xs text-slate-600">{camp.targetAudience}</p>
                      <div className="text-xs text-slate-500">
                        <strong>Zona geográfica:</strong> {camp.geographicZone} | Fechas: {camp.startDate} al {camp.endDate}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center text-xs shrink-0 bg-white p-3 rounded-lg border border-slate-200">
                      <div>
                        <div className="text-slate-400 text-[11px]">Clics</div>
                        <div className="font-bold text-slate-900 text-sm">{camp.clicks}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-[11px]">Leads</div>
                        <div className="font-bold text-sky-700 text-sm">{camp.leadsGenerated}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-[11px]">CPL Real</div>
                        <div className="font-bold text-emerald-600 text-sm">
                          ${camp.actualCostPerLead ? camp.actualCostPerLead.toLocaleString('es-CO') : 0}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Budget bar */}
                  <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex-1 max-w-md">
                      <div className="flex justify-between text-slate-600 text-[11px] mb-1">
                        <span>Gasto: ${camp.spentCOP.toLocaleString('es-CO')} COP ({budgetUsagePercent}%)</span>
                        <span>Presupuesto: ${camp.budgetCOP.toLocaleString('es-CO')} COP</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full ${
                            budgetUsagePercent > 90 ? 'bg-amber-500' : 'bg-sky-600'
                          }`}
                          style={{ width: `${budgetUsagePercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateCampaign({
                            ...camp,
                            status: camp.status === 'Activa' ? 'Pausada' : 'Activa',
                          })
                        }
                        className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer"
                      >
                        {camp.status === 'Activa' ? (
                          <>
                            <Pause className="w-3.5 h-3.5" />
                            <span>Pausar</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5" />
                            <span>Reanudar</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() =>
                          updateCampaign({
                            ...camp,
                            spentCOP: camp.spentCOP + 25000,
                            clicks: camp.clicks + 45,
                            leadsGenerated: camp.leadsGenerated + 6,
                            actualCostPerLead: Math.round((camp.spentCOP + 25000) / (camp.leadsGenerated + 6)),
                          })
                        }
                        className="px-2.5 py-1 text-[11px] font-semibold text-sky-700 bg-sky-50 border border-sky-200 rounded hover:bg-sky-100 cursor-pointer"
                        title="Simular 1 día de tráfico y captación"
                      >
                        + Simular Tráfico
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* WhatsApp Link Generator with UTMs */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <LinkIcon className="w-4 h-4" />
            <span>Herramienta de Captación Directa</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Generador de Enlaces Rastreados a WhatsApp Business</h2>
          <p className="text-xs text-slate-600 mb-5">
            Genera enlaces directos con mensaje predeterminado y etiqueta de campaña para que cada lead entre automáticamente calificado al WhatsApp de Viaja con Adri (3176229851).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Destino a Promocionar</label>
              <select
                value={waDestination}
                onChange={(e) => setWaDestination(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-900 focus:border-sky-500 focus:outline-none"
              >
                <option value="Guatapé y Piedra del Peñol">Guatapé y Piedra del Peñol (Regional)</option>
                <option value="Jardín y Jericó">Jardín y Jericó (Regional)</option>
                <option value="Santa Fe de Antioquia">Santa Fe de Antioquia (Regional)</option>
                <option value="Tiquetes San Andrés">Tiquetes San Andrés (Nacional)</option>
                <option value="Paquete Eje Cafetero">Paquete Eje Cafetero (Nacional)</option>
                <option value="Cancún Todo Incluido">Cancún Todo Incluido (Internacional)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Campaña / UTM de Origen</label>
              <input
                type="text"
                value={waUtm}
                onChange={(e) => setWaUtm(e.target.value)}
                placeholder="Ej: meta_ads_regional_oct26"
                className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-900 focus:border-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4 p-4 rounded-lg bg-emerald-50/60 border border-emerald-200">
            <span className="text-xs font-semibold text-emerald-900 block mb-1">Enlace Directo Generado:</span>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="text"
                readOnly
                value={generatedWhatsAppLink}
                className="w-full rounded border border-emerald-300 bg-white p-2 text-xs text-slate-800 font-mono"
              />
              <button
                type="button"
                onClick={copyWaLink}
                className="inline-flex items-center gap-1 px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shrink-0 cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copiado</span>
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>Copiar Enlace</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-emerald-800 mt-2">
              Al hacer clic, el viajero abrirá WhatsApp con el mensaje: "Hola Viaja con Adri, vi la promoción de {waDestination}...".
            </p>
          </div>

          {/* Workflow step button */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs text-slate-600 mb-3 sm:mb-0">
              <strong className="text-slate-900">Siguiente etapa:</strong> Los clics en estos anuncios llegan como mensajes directos a la <strong>Actividad 5: Atención y Captación de Leads</strong>.
            </div>
            <button
              onClick={() => setActiveTab('act-5')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-700 text-white text-xs font-medium hover:bg-sky-800 transition cursor-pointer"
            >
              <span>Ir a Atención y Leads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal: New Campaign */}
      {showNewCampModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">Crear Campaña de Pauta</h3>
            <p className="text-xs text-slate-500 mt-0.5">Configura la inversión publicitaria para rutas regionales o nacionales.</p>

            <form onSubmit={handleCreateCampaign} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Nombre de la Campaña</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Campaña Tiquetes Regionales Medellín - Noviembre"
                  value={newCamp.name}
                  onChange={(e) => setNewCamp({ ...newCamp, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Plataforma</label>
                  <select
                    value={newCamp.channel}
                    onChange={(e) => setNewCamp({ ...newCamp, channel: e.target.value as any })}
                    className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                  >
                    <option value="Meta Ads (IG/FB)">Meta Ads (Instagram & FB)</option>
                    <option value="TikTok Ads">TikTok Ads</option>
                    <option value="WhatsApp Ads">Click-to-WhatsApp Ads</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Presupuesto (COP)</label>
                  <input
                    type="number"
                    step="50000"
                    value={newCamp.budgetCOP}
                    onChange={(e) => setNewCamp({ ...newCamp, budgetCOP: Number(e.target.value) })}
                    className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Segmentación de Audiencia</label>
                <input
                  type="text"
                  placeholder="Ej: Familias y parejas 25-50 años con interés en turismo local"
                  value={newCamp.targetAudience}
                  onChange={(e) => setNewCamp({ ...newCamp, targetAudience: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Zona Geográfica</label>
                  <input
                    type="text"
                    value={newCamp.geographicZone}
                    onChange={(e) => setNewCamp({ ...newCamp, geographicZone: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Costo por Lead Objetivo (COP)</label>
                  <input
                    type="number"
                    value={newCamp.targetCostPerLead}
                    onChange={(e) => setNewCamp({ ...newCamp, targetCostPerLead: Number(e.target.value) })}
                    className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Etiqueta UTM / Trazabilidad</label>
                <input
                  type="text"
                  placeholder="Ej: pauta_regionales_antioquia"
                  value={newCamp.utmCampaign}
                  onChange={(e) => setNewCamp({ ...newCamp, utmCampaign: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewCampModal(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-sky-700 px-4 py-2 font-semibold text-white hover:bg-sky-800"
                >
                  Activar Campaña
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
