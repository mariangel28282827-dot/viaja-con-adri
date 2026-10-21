import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { AgentStatusBanner } from '../AgentStatusBanner';
import { ContentPiece } from '../../types';
import { Sparkles, FileText, Send, Video, Image, Check, Copy, ArrowRight, Trash2, Calendar } from 'lucide-react';

const REGIONAL_TEMPLATES = [
  {
    destination: 'Guatapé & Piedra del Peñol',
    destinationType: 'Regional' as const,
    type: 'Reel' as const,
    priceText: '$189.000 COP por persona',
    baggageIncluded: 'Morral de mano 10kg incluido',
    conditions: 'Salida sábado 6:30 AM desde Medellín, retorno 6:00 PM. Desayuno y paseo en barco incluidos.',
    hook: '¿Buscando el mejor plan para este fin de semana sin salir de Antioquia?',
    caption: '¡Guatapé te espera con sus colores y la vista más espectacular desde la cima de la Piedra del Peñol! En Viaja con Adri nos encargamos de todo: transporte con aire acondicionado, guía profesional y paseo panorámico en lancha. ¡Cero estrés, pura diversión!',
    cta: 'Escribe GUATAPE al WhatsApp 3176229851 o dale clic al botón del perfil para asegurar tus puestos.',
  },
  {
    destination: 'Jardín Colonial & Café de Origen',
    destinationType: 'Regional' as const,
    type: 'Carrusel' as const,
    priceText: '$345.000 COP (2 días / 1 noche)',
    baggageIncluded: 'Maleta de 15kg + morral personal',
    conditions: 'Hotel colonial en el parque principal, tour campesino del café y asistencia médica.',
    hook: 'Despierta con aroma a café recién tostado en el pueblo más fotogénico de Antioquia.',
    caption: 'Regálate un respiro entre trucheras, cascadas y calles llenas de flores. Nuestro plan a Jardín incluye noche en hotel colonial con desayuno campesino y un recorrido auténtico por cafetales tradicionales.',
    cta: 'Cupos limitados para el próximo puente festivo. Consulta disponibilidad por WhatsApp.',
  },
  {
    destination: 'Tiquetes San Andrés Islas',
    destinationType: 'Nacional' as const,
    type: 'TikTok' as const,
    priceText: '$680.000 COP ida y vuelta',
    baggageIncluded: 'Artículo personal de 10kg sin costo oculto',
    conditions: 'Vuelos directos desde Medellín Rionegro. Asesoría completa en trámites y tarjeta de turismo.',
    hook: '¡El mar de los 7 colores te llama y estas tarifas no duran para siempre!',
    caption: '¡Viaja con la tranquilidad de que tu tarifa es transparente! En Viaja con Adri te asesoramos paso a paso para que no pagues de más en el aeropuerto. Vuela directo desde Medellín con tu equipaje personal garantizado.',
    cta: 'Escribe SAN ANDRES en comentarios o envíanos un DM para reservar tus fechas.',
  },
];

export const Activity2Contenido: React.FC = () => {
  const { contentPieces, addContentPiece, deleteContentPiece, updateContentPiece, modules, setActiveTab } = usePlatform();
  const module = modules.find((m) => m.activityNumber === 2);
  const isInstalled = module?.installed ?? true;

  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form state for creating custom piece
  const [formData, setFormData] = useState({
    title: '',
    type: 'Reel' as ContentPiece['type'],
    destination: 'Santa Fe de Antioquia',
    destinationType: 'Regional' as ContentPiece['destinationType'],
    priceText: '$145.000 COP',
    baggageIncluded: 'Morral de mano 10kg',
    conditions: 'Transporte ida y regreso desde Medellín, almuerzo típico y piscina.',
    hook: '',
    caption: '',
    cta: 'Escríbenos a nuestro WhatsApp 3176229851 para apartar tu cupo.',
    platform: 'Instagram' as ContentPiece['platform'],
    scheduledDate: new Date().toISOString().slice(0, 10),
    scheduledTime: '12:00 PM',
  });

  const handleApplyTemplate = (tpl: typeof REGIONAL_TEMPLATES[0]) => {
    setFormData({
      ...formData,
      title: `Plan ${tpl.destination} (${tpl.type})`,
      destination: tpl.destination,
      destinationType: tpl.destinationType,
      type: tpl.type,
      priceText: tpl.priceText,
      baggageIncluded: tpl.baggageIncluded,
      conditions: tpl.conditions,
      hook: tpl.hook,
      caption: tpl.caption,
      cta: tpl.cta,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.caption) return;

    addContentPiece({
      ...formData,
      status: 'Pendiente Aprobación',
      estimatedReach: formData.type === 'TikTok' ? 6000 : 3500,
    });

    setFormData({
      title: '',
      type: 'Reel',
      destination: 'Guatapé & Peñol',
      destinationType: 'Regional',
      priceText: '$180.000 COP',
      baggageIncluded: 'Morral de mano 10kg',
      conditions: '',
      hook: '',
      caption: '',
      cta: 'Escríbenos a nuestro WhatsApp 3176229851.',
      platform: 'Instagram',
      scheduledDate: new Date().toISOString().slice(0, 10),
      scheduledTime: '12:00 PM',
    });
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div>
      <AgentStatusBanner
        activityNumber={2}
        title="Creación de Contenido"
        subtitle="Módulo creativo: Redacción de guiones, carruseles y piezas con desglose transparente de precios y equipaje."
        inputs="Plan de contenidos, catálogo de destinos y paquetes turísticos de Viaja con Adri, tono de marca cálido y confiable."
        outputs="Textos publicitarios, guiones para Reels/TikTok, carruseles de paquetes y piezas listas para revisión editorial."
      />

      <div className={`space-y-8 ${!isInstalled ? 'opacity-60 pointer-events-none' : ''}`}>
        {/* Templates quick launcher */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Asistente de Redacción Rápida</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">Plantillas de Rutas Regionales (Ciclo Deming)</h2>
              <p className="text-xs text-slate-600">
                Soluciona el dolor de "Creación manual sin calendario". Carga al instante guiones estructurados con gancho y detalles claros.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {REGIONAL_TEMPLATES.map((tpl, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-slate-200 bg-slate-50/60 p-4 hover:border-sky-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-sky-800">{tpl.destinationType}</span>
                    <span>{tpl.type}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{tpl.destination}</h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 italic">"{tpl.hook}"</p>
                  <div className="mt-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                    {tpl.priceText} · {tpl.baggageIncluded}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleApplyTemplate(tpl)}
                  className="mt-3 w-full py-1.5 text-xs font-medium text-sky-700 bg-white border border-sky-200 rounded-md hover:bg-sky-50 transition cursor-pointer"
                >
                  Cargar esta plantilla en el editor
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Content Creator Form */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sky-700 font-semibold text-xs tracking-wider uppercase mb-1">
            <FileText className="w-4 h-4" />
            <span>Editor de Pieza Promocional</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Crear o Redactar Nueva Pieza</h2>
          <p className="text-xs text-slate-600 mb-6">
            Asegura el formato exigido: <strong>Precio por trayecto</strong>, <strong>Condiciones</strong> y <strong>Equipaje incluido</strong>.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block font-medium text-slate-700 mb-1">Título de la Pieza / Campaña</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Pasadía Santa Fe de Antioquia con Almuerzo y Piscina"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Red Social Principal</label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value as any })}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-slate-900 focus:border-sky-500 focus:outline-none"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="TikTok">TikTok</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Formato</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-slate-900 focus:border-sky-500 focus:outline-none"
                >
                  <option value="Reel">Reel / Video Corto</option>
                  <option value="Carrusel">Carrusel Descriptivo</option>
                  <option value="Post Feed">Post Imagen Única</option>
                  <option value="TikTok">TikTok Orgánico / Pauta</option>
                  <option value="Story">Historia Temporal</option>
                  <option value="WhatsApp Status">Estado de WhatsApp</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Destino Turístico</label>
                <input
                  type="text"
                  placeholder="Ej: Guatapé, Jardín, Jericó, San Andrés"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Tipo de Destino</label>
                <select
                  value={formData.destinationType}
                  onChange={(e) => setFormData({ ...formData, destinationType: e.target.value as any })}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-slate-900 focus:border-sky-500 focus:outline-none"
                >
                  <option value="Regional">Regional (Antioquia / Cercanos)</option>
                  <option value="Nacional">Nacional (Colombia)</option>
                  <option value="Internacional">Internacional</option>
                </select>
              </div>
            </div>

            {/* Price & Baggage & Conditions row (Deming cycle specifics) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-sky-50/40 p-3.5 rounded-lg border border-sky-100">
              <div>
                <label className="block font-semibold text-sky-900 mb-1">1. Precio por Trayecto / Persona</label>
                <input
                  type="text"
                  placeholder="Ej: $189.000 COP por persona"
                  value={formData.priceText}
                  onChange={(e) => setFormData({ ...formData, priceText: e.target.value })}
                  className="w-full rounded-lg border border-sky-200 bg-white p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-sky-900 mb-1">2. Equipaje Incluido</label>
                <input
                  type="text"
                  placeholder="Ej: Morral de mano 10kg sin costo"
                  value={formData.baggageIncluded}
                  onChange={(e) => setFormData({ ...formData, baggageIncluded: e.target.value })}
                  className="w-full rounded-lg border border-sky-200 bg-white p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-sky-900 mb-1">3. Condiciones Claras</label>
                <input
                  type="text"
                  placeholder="Ej: Salidas sábados, transporte ida y regreso"
                  value={formData.conditions}
                  onChange={(e) => setFormData({ ...formData, conditions: e.target.value })}
                  className="w-full rounded-lg border border-sky-200 bg-white p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Hook, Caption and CTA */}
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Gancho de Entrada (Primeros 3 segundos para atrapar la atención)
              </label>
              <input
                type="text"
                placeholder="Ej: ¿Pensando qué hacer este puente? Mira este plan imperdible a solo 2 horas de Medellín..."
                value={formData.hook}
                onChange={(e) => setFormData({ ...formData, hook: e.target.value })}
                className="w-full rounded-lg border border-slate-300 p-2.5 text-slate-900 focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Cuerpo del Mensaje / Copy Persuasivo (Storytelling y beneficios)
              </label>
              <textarea
                rows={3}
                required
                placeholder="Escribe el texto completo para el post o guión del video..."
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                className="w-full rounded-lg border border-slate-300 p-2.5 text-slate-900 focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Llamado a la Acción (CTA con enlace a WhatsApp 3176229851)
              </label>
              <input
                type="text"
                value={formData.cta}
                onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                className="w-full rounded-lg border border-slate-300 p-2.5 text-slate-900 focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-[11px] text-slate-500">
                La pieza se creará con estado <span className="font-semibold text-amber-700">"Pendiente Aprobación"</span> para revisión de Adriana Osorio en la Actividad 3.
              </span>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-sky-700 px-5 py-2.5 font-semibold text-white shadow-sm hover:bg-sky-800 transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Generar Pieza y Enviar a Aprobación</span>
              </button>
            </div>
          </form>
        </div>

        {/* Existing Content Pieces Grid */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Banco de Piezas Creadas ({contentPieces.length})</h3>
              <p className="text-xs text-slate-600">Material redactado listo para revisión editorial y publicación.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contentPieces.map((piece) => (
              <div
                key={piece.id}
                className="rounded-lg border border-slate-200 bg-slate-50/30 p-4 hover:border-sky-300 hover:shadow-xs transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-sky-800">{piece.platform} · {piece.type}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        piece.status === 'Aprobado' || piece.status === 'Programado'
                          ? 'bg-emerald-100 text-emerald-800'
                          : piece.status === 'Pendiente Aprobación'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {piece.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm">{piece.title}</h4>
                  <div className="text-xs text-slate-500 mt-0.5">Destino: {piece.destination} ({piece.destinationType})</div>

                  {piece.hook && (
                    <div className="mt-2 text-xs bg-white border border-slate-200 p-2 rounded text-slate-700">
                      <strong className="text-sky-700">Gancho:</strong> "{piece.hook}"
                    </div>
                  )}

                  <p className="mt-2 text-xs text-slate-600 line-clamp-3 whitespace-pre-line">{piece.caption}</p>

                  <div className="mt-3 p-2 bg-sky-50/60 rounded text-[11px] text-sky-900 space-y-0.5 border border-sky-100">
                    <div><strong>Tarifa:</strong> {piece.priceText}</div>
                    <div><strong>Equipaje:</strong> {piece.baggageIncluded}</div>
                    {piece.conditions && <div><strong>Condiciones:</strong> {piece.conditions}</div>}
                  </div>

                  <div className="mt-2 text-[11px] text-slate-500">
                    <strong>CTA:</strong> {piece.cta}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(`${piece.caption}\n\n${piece.cta}`, piece.id)}
                      className="inline-flex items-center gap-1 text-slate-600 hover:text-sky-700 px-2 py-1 rounded border border-slate-200 bg-white"
                      title="Copiar texto completo"
                    >
                      {copiedId === piece.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {piece.status === 'Pendiente Aprobación' && (
                      <button
                        onClick={() => updateContentPiece({ ...piece, status: 'Aprobado' })}
                        className="px-2 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded hover:bg-emerald-100 cursor-pointer"
                      >
                        Aprobar
                      </button>
                    )}
                    <button
                      onClick={() => deleteContentPiece(piece.id)}
                      className="text-slate-400 hover:text-red-600 p-1 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Workflow step button */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs text-slate-600 mb-3 sm:mb-0">
              <strong className="text-slate-900">Siguiente etapa:</strong> Revisa y aprueba estas piezas en el calendario en la <strong>Actividad 3: Aprobación y Programación</strong>.
            </div>
            <button
              onClick={() => setActiveTab('act-3')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-700 text-white text-xs font-medium hover:bg-sky-800 transition cursor-pointer"
            >
              <span>Ir a Aprobación y Calendario</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
