import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { AgentStatusBanner } from '../AgentStatusBanner';
import { Lead } from '../../types';
import { CheckCircle2, DollarSign, FileText, Send, Printer, UserCheck, ArrowRight, Plus, AlertTriangle } from 'lucide-react';

const PIPELINE_COLUMNS: Array<{ title: string; status: Lead['status'] }> = [
  { title: 'Nuevo Lead', status: 'Nuevo' },
  { title: 'En Asesoría', status: 'En Asesoría' },
  { title: 'Cotización Enviada', status: 'Cotización Enviada' },
  { title: 'En Negociación', status: 'En Negociación' },
  { title: 'Reserva Confirmada', status: 'Reserva Confirmada' },
];

export const Activity6CierreVentas: React.FC = () => {
  const { leads, updateLead, modules, setActiveTab } = usePlatform();
  const module = modules.find((m) => m.activityNumber === 6);
  const isInstalled = module?.installed ?? true;

  // Selected lead for active quotation
  const [activeQuotationLead, setActiveQuotationLead] = useState<Lead | null>(leads[0] || null);

  // Quotation form state
  const [quoteDetails, setQuoteDetails] = useState({
    transportCOP: 380000,
    lodgingCOP: 420000,
    toursCOP: 150000,
    insuranceCOP: 45000,
    notes: 'Incluye seguro de asistencia médica contra imprevistos y morral 10kg.',
  });

  const totalQuote =
    quoteDetails.transportCOP +
    quoteDetails.lodgingCOP +
    quoteDetails.toursCOP +
    quoteDetails.insuranceCOP;

  const suggestedDeposit = Math.round(totalQuote * 0.5);

  const handleApplyQuote = () => {
    if (!activeQuotationLead) return;
    updateLead({
      ...activeQuotationLead,
      quoteAmountCOP: totalQuote,
      status: 'Cotización Enviada',
      notes: `${activeQuotationLead.notes || ''} | Cotización formal generada por $${totalQuote.toLocaleString('es-CO')} COP.`,
    });
  };

  const handleRegisterPayment = (lead: Lead) => {
    const amountStr = window.prompt(
      `Registrar abono de reserva para ${lead.fullName} (Total cotizado: $${(lead.quoteAmountCOP || 0).toLocaleString('es-CO')} COP):`,
      (lead.depositAmountCOP || suggestedDeposit).toString()
    );

    if (amountStr !== null) {
      const amount = Number(amountStr);
      updateLead({
        ...lead,
        depositAmountCOP: amount,
        status: 'Reserva Confirmada',
        notes: `${lead.notes || ''} | Abono confirmado de $${amount.toLocaleString('es-CO')} COP recibido por transferencia.`,
      });
    }
  };

  const confirmedReservations = leads.filter((l) => l.status === 'Reserva Confirmada');
  const totalClosedSalesCOP = confirmedReservations.reduce(
    (acc, l) => acc + (l.quoteAmountCOP || l.budgetCOP),
    0
  );

  return (
    <div>
      <AgentStatusBanner
        activityNumber={6}
        title="Seguimiento y Cierre de Venta"
        subtitle="Módulo comercial: Pipeline Kanban de ventas, generador de cotizaciones formales y registro de abonos."
        inputs="Leads calificados en la Actividad 5, cotizaciones de vuelos, hoteles y tarifas aliadas de Viaja con Adri."
        outputs="Cotizaciones personalizadas enviadas, itinerarios confirmados, abonos registrados y reservas cerradas."
      />

      <div className={`space-y-8 ${!isInstalled ? 'opacity-60 pointer-events-none' : ''}`}>
        {/* KPI metrics row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">Ventas Cerradas / Facturadas</span>
            <div className="text-2xl font-bold text-emerald-600 mt-1">
              ${(totalClosedSalesCOP / 1000000).toFixed(2)}M <span className="text-xs font-normal text-slate-500">COP</span>
            </div>
            <div className="text-xs text-slate-600 mt-1">{confirmedReservations.length} reservas confirmadas</div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">Leads en Pipeline Activo</span>
            <div className="text-2xl font-bold text-sky-700 mt-1">
              {leads.filter((l) => l.status !== 'Perdido' && l.status !== 'Reserva Confirmada').length}
            </div>
            <div className="text-xs text-slate-600 mt-1">Con cotización o asesoría en proceso</div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">Meta Comercial Mensual</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">$10.000.000 COP</div>
            <div className="text-xs text-slate-600 mt-1">
              Cumplimiento actual: {Math.round((totalClosedSalesCOP / 10000000) * 100)}%
            </div>
          </div>
        </div>

        {/* Commercial Pipeline Kanban */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700">
                <UserCheck className="w-4 h-4" />
                <span>Flujo de Conversión</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">Embudo Comercial & Pipeline de Reservas</h2>
              <p className="text-xs text-slate-600">
                Soluciona el dolor de "Leads sin registro ni seguimiento sistemático".
              </p>
            </div>
          </div>

          {/* Kanban columns */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 overflow-x-auto pb-2">
            {PIPELINE_COLUMNS.map((col) => {
              const colLeads = leads.filter((l) => l.status === col.status);

              return (
                <div key={col.status} className="bg-slate-50 rounded-lg p-3 border border-slate-200 min-w-[200px]">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 text-xs">
                    <span className="font-bold text-slate-800">{col.title}</span>
                    <span className="bg-white border border-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-semibold text-[11px]">
                      {colLeads.length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {colLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => setActiveQuotationLead(lead)}
                        className={`rounded-md p-2.5 border text-xs cursor-pointer transition ${
                          activeQuotationLead?.id === lead.id
                            ? 'bg-sky-50 border-sky-400 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-sky-300'
                        }`}
                      >
                        <div className="font-bold text-slate-900">{lead.fullName}</div>
                        <div className="text-[11px] text-sky-800 font-medium truncate mt-0.5">
                          {lead.destinationOfInterest}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1">
                          Viaje: {lead.travelDate || 'Por definir'} ({lead.passengersCount} pax)
                        </div>

                        {lead.quoteAmountCOP ? (
                          <div className="mt-1.5 text-[11px] font-bold text-emerald-700">
                            Cotizado: ${lead.quoteAmountCOP.toLocaleString('es-CO')}
                          </div>
                        ) : (
                          <div className="mt-1.5 text-[10px] text-slate-400">
                            Presupuesto: ${lead.budgetCOP.toLocaleString('es-CO')}
                          </div>
                        )}

                        {/* Quick state change menu */}
                        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLead({ ...lead, status: e.target.value as any })}
                            className="bg-slate-100 rounded border border-slate-200 px-1 py-0.5 text-slate-700 text-[10px]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="Nuevo">Nuevo</option>
                            <option value="En Asesoría">En Asesoría</option>
                            <option value="Cotización Enviada">Cotización</option>
                            <option value="En Negociación">Negociación</option>
                            <option value="Reserva Confirmada">Confirmada</option>
                            <option value="Perdido">Perdido</option>
                          </select>

                          {lead.status !== 'Reserva Confirmada' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRegisterPayment(lead);
                              }}
                              className="text-emerald-700 font-semibold hover:underline"
                            >
                              + Cobrar
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quotation Generator & Printable Ticket / Voucher */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700">
                <FileText className="w-4 h-4" />
                <span>Generador Oficial de Cotizaciones</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                Cotización Formal: Viaja con Adri
              </h2>
              <p className="text-xs text-slate-600">
                Garantiza tarifas transparentes sin cargos imprevistos para evitar que el cliente desista.
              </p>
            </div>

            {activeQuotationLead && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir / PDF</span>
                </button>
                <button
                  type="button"
                  onClick={handleApplyQuote}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg bg-sky-700 text-white hover:bg-sky-800 transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Guardar y Enviar al Cliente</span>
                </button>
              </div>
            )}
          </div>

          {activeQuotationLead ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Form Controls (5 cols) */}
              <div className="lg:col-span-5 space-y-3 text-xs bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm">Desglose de Tarifas de la Cotización</h4>

                <div>
                  <label className="block text-slate-600 mb-1">Cliente Receptor</label>
                  <input
                    type="text"
                    disabled
                    value={`${activeQuotationLead.fullName} (${activeQuotationLead.phone})`}
                    className="w-full rounded border border-slate-300 bg-white p-2 font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Destino e Itinerario</label>
                  <input
                    type="text"
                    value={activeQuotationLead.destinationOfInterest}
                    onChange={(e) =>
                      setActiveQuotationLead({
                        ...activeQuotationLead,
                        destinationOfInterest: e.target.value,
                      })
                    }
                    className="w-full rounded border border-slate-300 bg-white p-2 text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1">Tiquetes / Transporte (COP)</label>
                    <input
                      type="number"
                      step="10000"
                      value={quoteDetails.transportCOP}
                      onChange={(e) =>
                        setQuoteDetails({ ...quoteDetails, transportCOP: Number(e.target.value) })
                      }
                      className="w-full rounded border border-slate-300 bg-white p-2 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Alojamiento / Hotel (COP)</label>
                    <input
                      type="number"
                      step="10000"
                      value={quoteDetails.lodgingCOP}
                      onChange={(e) =>
                        setQuoteDetails({ ...quoteDetails, lodgingCOP: Number(e.target.value) })
                      }
                      className="w-full rounded border border-slate-300 bg-white p-2 text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1">Tours / Entradas (COP)</label>
                    <input
                      type="number"
                      step="10000"
                      value={quoteDetails.toursCOP}
                      onChange={(e) =>
                        setQuoteDetails({ ...quoteDetails, toursCOP: Number(e.target.value) })
                      }
                      className="w-full rounded border border-slate-300 bg-white p-2 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Seguro de Asistencia (COP)</label>
                    <input
                      type="number"
                      step="5000"
                      value={quoteDetails.insuranceCOP}
                      onChange={(e) =>
                        setQuoteDetails({ ...quoteDetails, insuranceCOP: Number(e.target.value) })
                      }
                      className="w-full rounded border border-slate-300 bg-white p-2 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Notas y Condiciones del Paquete</label>
                  <textarea
                    rows={2}
                    value={quoteDetails.notes}
                    onChange={(e) => setQuoteDetails({ ...quoteDetails, notes: e.target.value })}
                    className="w-full rounded border border-slate-300 bg-white p-2 text-slate-900"
                  />
                </div>
              </div>

              {/* Formal Quotation Voucher Preview (7 cols) */}
              <div className="lg:col-span-7 rounded-xl border border-sky-300 bg-white p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                    <div>
                      <div className="text-xl font-black text-sky-900 tracking-tight">Viaja con Adri</div>
                      <div className="text-[11px] text-slate-500">Agencia de Viajes & Turismo · Medellín, Colombia</div>
                      <div className="text-[10px] text-slate-400">NIT: 101718293-1 · WhatsApp: 3176229851</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-bold text-sky-800 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded">
                        COTIZACIÓN OFICIAL
                      </span>
                      <div className="text-[10px] text-slate-500 mt-1">Fecha: {new Date().toLocaleDateString('es-CO')}</div>
                    </div>
                  </div>

                  {/* Client Data */}
                  <div className="my-4 grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div>
                      <span className="text-slate-400 text-[10px] block">CLIENTE</span>
                      <span className="font-bold text-slate-900">{activeQuotationLead.fullName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">CONTACTO</span>
                      <span className="font-medium text-slate-700">{activeQuotationLead.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">DESTINO PROPUESTO</span>
                      <span className="font-semibold text-sky-900">{activeQuotationLead.destinationOfInterest}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">NÚMERO DE PASAJEROS</span>
                      <span className="font-medium text-slate-700">{activeQuotationLead.passengersCount} personas</span>
                    </div>
                  </div>

                  {/* Itemized Table */}
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 text-left">
                        <th className="py-2">Concepto / Servicio</th>
                        <th className="py-2 text-right">Valor COP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-2 text-slate-800">Transporte / Vuelos (con equipaje de mano garantizado)</td>
                        <td className="py-2 text-right font-medium">${quoteDetails.transportCOP.toLocaleString('es-CO')}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-slate-800">Alojamiento seleccionado con desayuno</td>
                        <td className="py-2 text-right font-medium">${quoteDetails.lodgingCOP.toLocaleString('es-CO')}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-slate-800">Tours guiados y actividades programadas</td>
                        <td className="py-2 text-right font-medium">${quoteDetails.toursCOP.toLocaleString('es-CO')}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-slate-800">Póliza de asistencia médica y seguro de viaje</td>
                        <td className="py-2 text-right font-medium">${quoteDetails.insuranceCOP.toLocaleString('es-CO')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="pt-4 border-t border-slate-200 mt-4">
                  <div className="flex justify-between items-center text-sm font-bold text-slate-900">
                    <span>TOTAL DEL PAQUETE:</span>
                    <span className="text-xl text-sky-900">${totalQuote.toLocaleString('es-CO')} COP</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-emerald-700 font-semibold mt-1">
                    <span>Abono para reservar (50%):</span>
                    <span>${suggestedDeposit.toLocaleString('es-CO')} COP</span>
                  </div>

                  <p className="text-[10px] text-slate-500 mt-3 italic border-t border-slate-100 pt-2">
                    {quoteDetails.notes}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 text-xs text-slate-500">
              Selecciona un lead del embudo para generar su cotización formal.
            </div>
          )}

          {/* Workflow step button */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs text-slate-600 mb-3 sm:mb-0">
              <strong className="text-slate-900">Siguiente etapa:</strong> Revisa el cumplimiento de metas comerciales y la efectividad general en la <strong>Actividad 7: Medición y Reporte</strong>.
            </div>
            <button
              onClick={() => setActiveTab('act-7')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-700 text-white text-xs font-medium hover:bg-sky-800 transition cursor-pointer"
            >
              <span>Ir a Medición y Reporte</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
