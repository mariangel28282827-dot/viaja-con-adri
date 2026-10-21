import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { AgentStatusBanner } from '../AgentStatusBanner';
import { Lead } from '../../types';
import { MessageSquare, Zap, Clock, Users, Plus, ArrowRight, ShieldCheck, Flame, ThermometerSnowflake, CheckCircle2 } from 'lucide-react';

export const Activity5AtencionLeads: React.FC = () => {
  const { leads, addLead, updateLead, deleteLead, modules, setActiveTab } = usePlatform();
  const module = modules.find((m) => m.activityNumber === 5);
  const isInstalled = module?.installed ?? true;

  const [selectedLead, setSelectedLead] = useState<Lead | null>(leads[0] || null);
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [filterChannel, setFilterChannel] = useState<string>('Todos');

  // New Lead Form State
  const [newLeadData, setNewLeadData] = useState({
    fullName: '',
    phone: '',
    email: '',
    channel: 'WhatsApp' as Lead['channel'],
    destinationOfInterest: 'Guatapé & Piedra del Peñol',
    destinationCategory: 'Regional' as Lead['destinationCategory'],
    budgetCOP: 800000,
    travelDate: '2026-11-15',
    passengersCount: 2,
    temperature: 'Caliente' as Lead['temperature'],
    status: 'Nuevo' as Lead['status'],
    assignedTo: 'Adriana Osorio',
    notes: 'Solicita cotización de fin de semana con transporte.',
  });

  // Simulated Chatbot responses
  const [chatMessageInput, setChatMessageInput] = useState('');
  const [simulatedChatHistory, setSimulatedChatHistory] = useState([
    {
      sender: 'client',
      text: '¡Hola! Vi la promoción de Guatapé en Instagram y quiero saber cuánto cuesta para 4 personas este fin de semana.',
      time: '13:01',
    },
    {
      sender: 'bot',
      text: '¡Hola! 🌞 Gracias por comunicarte con Viaja con Adri. Con gusto te ayudamos. Nuestro plan a Guatapé tiene una tarifa especial de $189.000 COP por persona e incluye transporte ida y regreso, desayuno campesino y paseo panorámico en barco. ¿Para qué fecha exacta te gustaría viajar?',
      time: '13:02',
    },
    {
      sender: 'client',
      text: 'Sería para el próximo sábado. ¿Qué equipaje podemos llevar?',
      time: '13:04',
    },
    {
      sender: 'bot',
      text: '¡Perfecto! Incluye tu morral personal de hasta 10kg sin ningún cobro adicional. ¿Deseas que un asesor humano te envíe la reserva oficial?',
      time: '13:04',
    },
  ]);

  const handleSendSimulatedMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessageInput.trim()) return;

    const userMsg = chatMessageInput;
    const timeNow = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

    setSimulatedChatHistory((prev) => [
      ...prev,
      { sender: 'client', text: userMsg, time: timeNow },
    ]);
    setChatMessageInput('');

    // Instant bot response
    setTimeout(() => {
      setSimulatedChatHistory((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `¡Excelente consulta! He registrado tu requerimiento sobre "${userMsg}". Adriana Osorio y nuestro equipo están preparando tu cotización formal.`,
          time: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 800);
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadData.fullName || !newLeadData.phone) return;

    addLead(newLeadData);
    setNewLeadData({
      fullName: '',
      phone: '',
      email: '',
      channel: 'WhatsApp',
      destinationOfInterest: '',
      destinationCategory: 'Regional',
      budgetCOP: 500000,
      travelDate: '2026-11-20',
      passengersCount: 2,
      temperature: 'Caliente',
      status: 'Nuevo',
      assignedTo: 'Adriana Osorio',
      notes: '',
    });
    setShowNewLeadModal(false);
  };

  const filteredLeads = leads.filter((l) => {
    if (filterChannel === 'Todos') return true;
    return l.channel === filterChannel;
  });

  return (
    <div>
      <AgentStatusBanner
        activityNumber={5}
        title="Atención y Captación de Leads"
        subtitle="Módulo de respuesta rápida: Chatbot multicanal de respuesta en menos de 3 minutos y calificador de prospectos."
        inputs="Consultas directas en WhatsApp, mensajes de Instagram Direct, comentarios en publicaciones, formularios web."
        outputs="Leads calificados por destino, fecha y presupuesto, registrados centralmente en el CRM de Viaja con Adri."
      />

      <div className={`space-y-8 ${!isInstalled ? 'opacity-60 pointer-events-none' : ''}`}>
        {/* Anti-Slop Value Metric Header */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">Tiempo Promedio de Respuesta</span>
            <div className="text-2xl font-bold text-emerald-600 mt-1 flex items-center gap-1.5">
              <span>2.4 min</span>
              <span className="text-xs font-normal text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                -98% vs proceso manual previo
              </span>
            </div>
            <div className="text-xs text-slate-600 mt-1">Antes: 2 a 4 horas (provocaba pérdida de clientes)</div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">Leads Atendidos Centralmente</span>
            <div className="text-2xl font-bold text-sky-700 mt-1">{leads.length}</div>
            <div className="text-xs text-slate-600 mt-1">100% registrados con destino y presupuesto</div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">Temperatura Caliente / Alta Intención</span>
            <div className="text-2xl font-bold text-amber-600 mt-1">
              {leads.filter((l) => l.temperature === 'Caliente').length} prospectos
            </div>
            <div className="text-xs text-slate-600 mt-1">Listos para cotización formal y cierre</div>
          </div>
        </div>

        {/* 2-column layout: Central Lead Inbox & Live Chatbot Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Central Lead Inbox (7 cols) */}
          <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Bandeja Unificada de Leads ({leads.length})</h3>
                <p className="text-xs text-slate-600">Registro centralizado para no perder ninguna consulta comercial.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowNewLeadModal(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-sky-700 text-white hover:bg-sky-800 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nuevo Lead</span>
                </button>
              </div>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-1 mb-4 text-xs">
              {['Todos', 'WhatsApp', 'Instagram DM', 'TikTok', 'Formulario Web'].map((ch) => (
                <button
                  key={ch}
                  onClick={() => setFilterChannel(ch)}
                  className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                    filterChannel === ch ? 'bg-sky-700 text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`rounded-lg border p-3.5 cursor-pointer transition ${
                    selectedLead?.id === lead.id
                      ? 'border-sky-500 bg-sky-50/40 shadow-xs'
                      : 'border-slate-200 bg-slate-50/40 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-semibold text-slate-900">{lead.fullName}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-slate-500">{lead.channel}</span>
                      </div>
                      <div className="text-xs text-sky-800 font-medium mt-0.5">
                        Interés: {lead.destinationOfInterest} ({lead.destinationCategory})
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-right">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                          lead.temperature === 'Caliente'
                            ? 'bg-red-100 text-red-800'
                            : lead.temperature === 'Tibio'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {lead.temperature === 'Caliente' && <Flame className="w-3 h-3 text-red-600" />}
                        {lead.temperature}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-200/50">
                    <span>Tel: {lead.phone} | {lead.passengersCount} personas</span>
                    <span className="font-semibold text-slate-700">
                      Presupuesto: ${lead.budgetCOP.toLocaleString('es-CO')} COP
                    </span>
                    <span className="text-emerald-700 font-medium">Estado: {lead.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Chatbot Simulation & Lead Detail (5 cols) */}
          <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    💬
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Asistente WhatsApp Business</h4>
                    <span className="text-[10px] text-emerald-700 font-medium">● Activo 24/7 · Respuesta &lt; 1 min</span>
                  </div>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  Simulador de Atención
                </span>
              </div>

              {/* Chat messages */}
              <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1 text-xs mb-3">
                {simulatedChatHistory.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.sender === 'client' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-2.5 ${
                        msg.sender === 'client'
                          ? 'bg-sky-700 text-white rounded-br-none'
                          : 'bg-emerald-50 text-slate-800 border border-emerald-100 rounded-bl-none'
                      }`}
                    >
                      <p className="text-xs">{msg.text}</p>
                      <span
                        className={`text-[9px] block text-right mt-1 ${
                          msg.sender === 'client' ? 'text-sky-200' : 'text-slate-400'
                        }`}
                      >
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendSimulatedMsg} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Escribe como cliente para probar el bot..."
                  value={chatMessageInput}
                  onChange={(e) => setChatMessageInput(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-300 p-2 text-xs text-slate-900 focus:border-sky-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Probar
                </button>
              </form>
            </div>

            {/* Quick action to send selected lead to Sales Closing */}
            {selectedLead && (
              <div className="mt-5 p-3 rounded-lg border border-sky-200 bg-sky-50/50 text-xs">
                <div className="font-semibold text-slate-900 mb-1">Lead Seleccionado: {selectedLead.fullName}</div>
                <div className="text-slate-600 mb-2">
                  Destino: <strong>{selectedLead.destinationOfInterest}</strong> | Presupuesto: <strong>${selectedLead.budgetCOP.toLocaleString('es-CO')} COP</strong>
                </div>
                <button
                  onClick={() => {
                    updateLead({ ...selectedLead, status: 'Cotización Enviada' });
                    setActiveTab('act-6');
                  }}
                  className="w-full py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-lg font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Pasar a Cotización y Cierre de Venta</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Workflow step button */}
        <div className="flex flex-col sm:flex-row items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs text-slate-600 mb-3 sm:mb-0">
            <strong className="text-slate-900">Siguiente etapa:</strong> Transforma estos leads calificados en reservas pagadas en la <strong>Actividad 6: Seguimiento y Cierre de Venta</strong>.
          </div>
          <button
            onClick={() => setActiveTab('act-6')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-700 text-white text-xs font-medium hover:bg-sky-800 transition cursor-pointer"
          >
            <span>Ir a Seguimiento y Cierre de Venta</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Modal: New Manual Lead */}
      {showNewLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">Registrar Nuevo Lead</h3>
            <p className="text-xs text-slate-500 mt-0.5">Ingresa los datos del cliente potencial para el CRM.</p>

            <form onSubmit={handleCreateLead} className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Laura Mejía"
                    value={newLeadData.fullName}
                    onChange={(e) => setNewLeadData({ ...newLeadData, fullName: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Teléfono / WhatsApp</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: 3119876543"
                    value={newLeadData.phone}
                    onChange={(e) => setNewLeadData({ ...newLeadData, phone: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Canal de Ingreso</label>
                  <select
                    value={newLeadData.channel}
                    onChange={(e) => setNewLeadData({ ...newLeadData, channel: e.target.value as any })}
                    className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                  >
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Instagram DM">Instagram DM</option>
                    <option value="Facebook">Facebook</option>
                    <option value="TikTok">TikTok</option>
                    <option value="Formulario Web">Formulario Web</option>
                    <option value="Presencial">Presencial (Oficina)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Temperatura del Prospecto</label>
                  <select
                    value={newLeadData.temperature}
                    onChange={(e) => setNewLeadData({ ...newLeadData, temperature: e.target.value as any })}
                    className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                  >
                    <option value="Caliente">Caliente (Listo para comprar)</option>
                    <option value="Tibio">Tibio (Comparando opciones)</option>
                    <option value="Frío">Frío (Solo pidiendo precio)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Destino de Interés</label>
                <input
                  type="text"
                  placeholder="Ej: Guatapé, San Andrés, Cancún, Santa Marta"
                  value={newLeadData.destinationOfInterest}
                  onChange={(e) => setNewLeadData({ ...newLeadData, destinationOfInterest: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Categoría Destino</label>
                  <select
                    value={newLeadData.destinationCategory}
                    onChange={(e) => setNewLeadData({ ...newLeadData, destinationCategory: e.target.value as any })}
                    className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                  >
                    <option value="Regional">Regional (Antioquia)</option>
                    <option value="Nacional">Nacional</option>
                    <option value="Internacional">Internacional</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Presupuesto Estimado</label>
                  <input
                    type="number"
                    step="50000"
                    value={newLeadData.budgetCOP}
                    onChange={(e) => setNewLeadData({ ...newLeadData, budgetCOP: Number(e.target.value) })}
                    className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Nº Viajeros</label>
                  <input
                    type="number"
                    min="1"
                    value={newLeadData.passengersCount}
                    onChange={(e) => setNewLeadData({ ...newLeadData, passengersCount: Number(e.target.value) })}
                    className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Notas / Requerimiento Específico</label>
                <textarea
                  rows={2}
                  placeholder="Detalles sobre hotel, transporte, restricciones de fechas..."
                  value={newLeadData.notes}
                  onChange={(e) => setNewLeadData({ ...newLeadData, notes: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewLeadModal(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-sky-700 px-4 py-2 font-semibold text-white hover:bg-sky-800"
                >
                  Guardar Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
