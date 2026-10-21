import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { AgentStatusBanner } from '../AgentStatusBanner';
import { BuyerPersona, SmartGoal } from '../../types';
import { Plus, Users, Target, Compass, Edit2, Trash2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export const Activity1Estrategia: React.FC = () => {
  const {
    buyerPersonas,
    addBuyerPersona,
    deleteBuyerPersona,
    smartGoals,
    updateSmartGoal,
    addSmartGoal,
    modules,
    saveProgress,
    setActiveTab,
  } = usePlatform();

  const module = modules.find((m) => m.activityNumber === 1);
  const isInstalled = module?.installed ?? true;

  // State for new buyer persona
  const [showNewPersonaModal, setShowNewPersonaModal] = useState(false);
  const [newPersona, setNewPersona] = useState({
    name: '',
    targetGroup: '',
    ageRange: '',
    budgetRange: '',
    preferredDestinations: '',
    painPoints: '',
    motivations: '',
    favoriteChannels: 'WhatsApp, Instagram',
  });

  // State for new goal
  const [showNewGoalModal, setShowNewGoalModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    category: 'Ventas' as const,
    targetValue: 30,
    currentValue: 0,
    unit: '%',
    deadline: '2 meses',
    status: 'en_progreso' as const,
  });

  const handleAddPersona = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPersona.name) return;
    addBuyerPersona({
      name: newPersona.name,
      targetGroup: newPersona.targetGroup,
      ageRange: newPersona.ageRange,
      budgetRange: newPersona.budgetRange,
      preferredDestinations: newPersona.preferredDestinations.split(',').map((s) => s.trim()).filter(Boolean),
      painPoints: newPersona.painPoints.split(',').map((s) => s.trim()).filter(Boolean),
      motivations: newPersona.motivations.split(',').map((s) => s.trim()).filter(Boolean),
      favoriteChannels: newPersona.favoriteChannels.split(',').map((s) => s.trim()).filter(Boolean),
    });
    setNewPersona({
      name: '',
      targetGroup: '',
      ageRange: '',
      budgetRange: '',
      preferredDestinations: '',
      painPoints: '',
      motivations: '',
      favoriteChannels: 'WhatsApp, Instagram',
    });
    setShowNewPersonaModal(false);
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.title) return;
    addSmartGoal(newGoal);
    setNewGoal({
      title: '',
      category: 'Ventas',
      targetValue: 10,
      currentValue: 0,
      unit: '%',
      deadline: '1 mes',
      status: 'en_progreso',
    });
    setShowNewGoalModal(false);
  };

  return (
    <div>
      <AgentStatusBanner
        activityNumber={1}
        title="Investigación y Estrategia"
        subtitle="Módulo inicial: Investigación de mercado, definición de Buyer Personas y establecimiento de objetivos SMART para Viaja con Adri."
        inputs="Objetivos del cliente, público objetivo, análisis de competencia regional, temporadas de viaje y presupuesto."
        outputs="Buyer Persona estructurados, Objetivos SMART con metas medibles y Plan de Contenidos temático."
      />

      <div className={`space-y-8 ${!isInstalled ? 'opacity-60 pointer-events-none' : ''}`}>
        {/* Section 1: Buyer Personas */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-sky-700 font-semibold text-xs tracking-wider uppercase">
                <Users className="w-4 h-4" />
                <span>Audiencia Objetivo & Perfiles</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">Buyer Personas Definidos</h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Soluciona el problema de "Contenido sin rumbo ni público definido con claridad".
              </p>
            </div>
            <button
              onClick={() => setShowNewPersonaModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-sky-700 text-white hover:bg-sky-800 transition cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Buyer Persona</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {buyerPersonas.map((bp) => (
              <div
                key={bp.id}
                className="rounded-lg border border-slate-200 bg-slate-50/50 p-5 hover:border-sky-300 hover:shadow-sm transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{bp.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{bp.targetGroup}</p>
                  </div>
                  <button
                    onClick={() => deleteBuyerPersona(bp.id)}
                    className="text-slate-400 hover:text-red-600 p-1 rounded transition"
                    title="Eliminar perfil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-4 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Rango de Edad:</span>
                    <span className="font-medium text-slate-800">{bp.ageRange}</span>
                  </div>
                  <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Presupuesto Habitual:</span>
                    <span className="font-medium text-slate-800">{bp.budgetRange}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block mb-1 font-medium">Destinos de Interés:</span>
                    <div className="flex flex-wrap gap-1">
                      {bp.preferredDestinations.map((dest, i) => (
                        <span key={i} className="text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded text-[11px]">
                          {dest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 block mb-1 font-medium">Dolores / Objeciones:</span>
                    <ul className="list-disc list-inside text-slate-600 space-y-0.5 text-[11px]">
                      {bp.painPoints.map((pp, i) => (
                        <li key={i}>{pp}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Canales preferidos:</span>
                    <span className="font-medium text-slate-700">{bp.favoriteChannels.join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: SMART Goals */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-sky-700 font-semibold text-xs tracking-wider uppercase">
                <Target className="w-4 h-4" />
                <span>Metas Cuantificables</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">Objetivos SMART de Marketing & Ventas</h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Seguimiento alineado con el proyecto Sena: Incremento del 30% en venta de tiquetes regionales y optimización operativa.
              </p>
            </div>
            <button
              onClick={() => setShowNewGoalModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-sky-700 text-white hover:bg-sky-800 transition cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Objetivo</span>
            </button>
          </div>

          <div className="space-y-4">
            {smartGoals.map((goal) => {
              const percentage = Math.min(
                100,
                Math.round((goal.currentValue / goal.targetValue) * 100)
              );

              return (
                <div
                  key={goal.id}
                  className="rounded-lg border border-slate-200 p-4 hover:border-sky-300 transition bg-slate-50/40"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-semibold text-sky-700">{goal.category}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-slate-500">Plazo: {goal.deadline}</span>
                      </div>
                      <h3 className="font-semibold text-slate-900 text-sm mt-0.5">{goal.title}</h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right text-xs">
                        <div className="font-bold text-slate-900">
                          {goal.unit === 'COP'
                            ? `$${(goal.currentValue / 1000000).toFixed(1)}M / $${(goal.targetValue / 1000000).toFixed(1)}M`
                            : `${goal.currentValue} / ${goal.targetValue} ${goal.unit}`}
                        </div>
                        <div className="text-slate-500 font-medium">{percentage}% completado</div>
                      </div>

                      <div className="w-10 text-center">
                        {goal.status === 'cumplido' ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 inline" />
                        ) : (
                          <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-sky-100 text-sky-800">
                            Activo
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        percentage >= 100 ? 'bg-emerald-500' : 'bg-sky-600'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  {/* Quick adjustments */}
                  <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-200/50">
                    <span className="text-slate-500 text-[11px]">Actualizar progreso rápido:</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          updateSmartGoal({
                            ...goal,
                            currentValue: Math.max(0, goal.currentValue - (goal.unit === 'COP' ? 500000 : 1)),
                          })
                        }
                        className="px-2 py-0.5 rounded border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold"
                      >
                        -
                      </button>
                      <button
                        onClick={() =>
                          updateSmartGoal({
                            ...goal,
                            currentValue: goal.currentValue + (goal.unit === 'COP' ? 500000 : 1),
                            status: goal.currentValue + (goal.unit === 'COP' ? 500000 : 1) >= goal.targetValue ? 'cumplido' : 'en_progreso',
                          })
                        }
                        className="px-2 py-0.5 rounded border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Seasonal & Regional Opportunity Radar */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sky-700 font-semibold text-xs tracking-wider uppercase mb-1">
            <Compass className="w-4 h-4" />
            <span>Diagnóstico Regional & Temporadas de Viaje</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Enfoque de Campañas en Rutas Regionales (Antioquia & Colombia)</h2>
          <p className="text-xs text-slate-600 mt-1 mb-5">
            Estrategia diseñada para revertir la baja de ventas en tiquetes regionales identificada en el proyecto SENA.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-slate-200 bg-sky-50/40">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-800">1. Escapadas Fin de Semana (Cercanos)</span>
              <h4 className="text-sm font-bold text-slate-900 mt-1">Guatapé, Jardín, Jericó y Santa Fe</h4>
              <p className="text-xs text-slate-600 mt-2">
                Público del Valle de Aburrá que busca salidas de 1 a 2 días. La clave es publicar ofertas con transporte directo, precio por persona claro y salidas los sábados.
              </p>
              <div className="mt-3 text-[11px] font-semibold text-sky-700">Meta: 15 reservas semanales</div>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-amber-50/40">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">2. Vuelos Regionales & Conexión</span>
              <h4 className="text-sm font-bold text-slate-900 mt-1">Medellín a Eje Cafetero, Tolima, Urabá y Costa</h4>
              <p className="text-xs text-slate-600 mt-2">
                Eliminar el miedo al cobro de equipaje imprevisto mediante copys transparentes: "Incluye morral 10kg, sin letras chiquitas".
              </p>
              <div className="mt-3 text-[11px] font-semibold text-amber-700">Objetivo: +30% ventas en 2 meses</div>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-emerald-50/40">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">3. Temporadas Altas y Puentes</span>
              <h4 className="text-sm font-bold text-slate-900 mt-1">Diciembre, Vacaciones y Puentes Festivos</h4>
              <p className="text-xs text-slate-600 mt-2">
                Venta anticipada con facilidades de pago o abonos iniciales del 30% a 50%, permitiendo a los clientes asegurar tarifa con antelación.
              </p>
              <div className="mt-3 text-[11px] font-semibold text-emerald-700">Facilidad de reserva y abonos</div>
            </div>
          </div>

          {/* Next Step Banner */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs text-slate-600 mb-3 sm:mb-0">
              <strong className="text-slate-900">Paso siguiente en el flujo:</strong> Con la estrategia y el público definidos, pasa a la <strong>Actividad 2: Creación de Contenido</strong> para generar los guiones y carruseles.
            </div>
            <button
              onClick={() => setActiveTab('act-2')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-700 text-white text-xs font-medium hover:bg-sky-800 transition cursor-pointer"
            >
              <span>Ir a Creación de Contenido</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal: New Buyer Persona */}
      {showNewPersonaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">Crear Nuevo Buyer Persona</h3>
            <p className="text-xs text-slate-500 mt-0.5">Define el perfil de viajero para orientar las publicaciones y anuncios.</p>

            <form onSubmit={handleAddPersona} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Nombre Representativo / Título</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Laura & Amigos (Turismo de Aventura)"
                  value={newPersona.name}
                  onChange={(e) => setNewPersona({ ...newPersona, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Grupo / Perfil</label>
                  <input
                    type="text"
                    placeholder="Ej: Grupos de amigos jóvenes"
                    value={newPersona.targetGroup}
                    onChange={(e) => setNewPersona({ ...newPersona, targetGroup: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Rango de Edad</label>
                  <input
                    type="text"
                    placeholder="Ej: 22 - 32 años"
                    value={newPersona.ageRange}
                    onChange={(e) => setNewPersona({ ...newPersona, ageRange: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Presupuesto Habitual (COP)</label>
                <input
                  type="text"
                  placeholder="Ej: $500.000 - $1.200.000 COP"
                  value={newPersona.budgetRange}
                  onChange={(e) => setNewPersona({ ...newPersona, budgetRange: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Destinos de Preferencia (separados por coma)</label>
                <input
                  type="text"
                  placeholder="Guatapé, San Rafael, Río Claro, Santa Marta"
                  value={newPersona.preferredDestinations}
                  onChange={(e) => setNewPersona({ ...newPersona, preferredDestinations: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Dolores / Temores al viajar (separados por coma)</label>
                <input
                  type="text"
                  placeholder="Precios sorpresa, mala organización, falta de tiempo"
                  value={newPersona.painPoints}
                  onChange={(e) => setNewPersona({ ...newPersona, painPoints: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Motivaciones Principales (separados por coma)</label>
                <input
                  type="text"
                  placeholder="Fotos para Instagram, desconexión, deportes extremos"
                  value={newPersona.motivations}
                  onChange={(e) => setNewPersona({ ...newPersona, motivations: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewPersonaModal(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-sky-700 px-4 py-2 font-semibold text-white hover:bg-sky-800"
                >
                  Guardar Buyer Persona
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: New Smart Goal */}
      {showNewGoalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">Registrar Objetivo SMART</h3>
            <p className="text-xs text-slate-500 mt-0.5">Establece una meta clara, medible y temporal para la agencia.</p>

            <form onSubmit={handleAddGoal} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Título del Objetivo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Aumentar cotizaciones de pasadías en un 25%"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Categoría</label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as any })}
                    className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                  >
                    <option value="Ventas">Ventas</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Atención">Atención</option>
                    <option value="Posicionamiento">Posicionamiento</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Plazo Límite</label>
                  <input
                    type="text"
                    placeholder="Ej: 30 de Noviembre"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Valor Meta</label>
                  <input
                    type="number"
                    value={newGoal.targetValue}
                    onChange={(e) => setNewGoal({ ...newGoal, targetValue: Number(e.target.value) })}
                    className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Unidad</label>
                  <input
                    type="text"
                    placeholder="Ej: %, leads, reservas, COP"
                    value={newGoal.unit}
                    onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewGoalModal(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-sky-700 px-4 py-2 font-semibold text-white hover:bg-sky-800"
                >
                  Guardar Objetivo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
