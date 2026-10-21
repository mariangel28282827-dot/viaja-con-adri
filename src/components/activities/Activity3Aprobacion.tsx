import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { AgentStatusBanner } from '../AgentStatusBanner';
import { ContentPiece } from '../../types';
import { CheckCircle2, XCircle, Clock, Calendar as CalendarIcon, Eye, ArrowRight, Check, AlertCircle } from 'lucide-react';

const DAYS_OF_WEEK = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export const Activity3Aprobacion: React.FC = () => {
  const { contentPieces, updateContentPiece, modules, setActiveTab } = usePlatform();
  const module = modules.find((m) => m.activityNumber === 3);
  const isInstalled = module?.installed ?? true;

  const [selectedPieceForPreview, setSelectedPieceForPreview] = useState<ContentPiece | null>(null);
  const [filterPlatform, setFilterPlatform] = useState<string>('Todas');

  const pendingPieces = contentPieces.filter((p) => p.status === 'Pendiente Aprobación');
  const approvedPieces = contentPieces.filter((p) => p.status === 'Aprobado' || p.status === 'Programado' || p.status === 'Publicado');

  const handleApprove = (piece: ContentPiece) => {
    updateContentPiece({
      ...piece,
      status: 'Aprobado',
      reviewerNotes: 'Aprobado por Dirección General (Adriana Osorio). Listo para pauta/programación.',
    });
  };

  const handleReject = (piece: ContentPiece) => {
    const reason = window.prompt('Indica el motivo o ajuste solicitado para la pieza:');
    if (reason !== null) {
      updateContentPiece({
        ...piece,
        status: 'Rechazado',
        reviewerNotes: reason || 'Requiere ajustes en el desglose de tarifa o equipaje.',
      });
    }
  };

  const handleSchedule = (piece: ContentPiece, date: string, time: string) => {
    updateContentPiece({
      ...piece,
      status: 'Programado',
      scheduledDate: date,
      scheduledTime: time,
    });
  };

  const filteredApprovedPieces = approvedPieces.filter((p) => {
    if (filterPlatform === 'Todas') return true;
    return p.platform === filterPlatform;
  });

  return (
    <div>
      <AgentStatusBanner
        activityNumber={3}
        title="Aprobación y Programación"
        subtitle="Módulo de control de calidad: Revisión de piezas por la dirección de la agencia y calendario editorial programado."
        inputs="Piezas creadas en la Actividad 2, especificaciones de destinos de Viaja con Adri, lineamientos de calidad."
        outputs="Publicaciones aprobadas por Adriana Osorio y programadas en el calendario semanal/mensual."
      />

      <div className={`space-y-8 ${!isInstalled ? 'opacity-60 pointer-events-none' : ''}`}>
        {/* Pending Review Box */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Bandeja de Aprobación Editorial</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                Piezas Pendientes de Revisión ({pendingPieces.length})
              </h2>
              <p className="text-xs text-slate-600">
                Garantiza que toda publicación cumpla con el estándar de honestidad, puntualidad y precios reales de Viaja con Adri.
              </p>
            </div>
          </div>

          {pendingPieces.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-xs text-slate-500">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              ¡Excelente! No hay piezas pendientes de revisión en este momento. Todas han sido aprobadas o programadas.
            </div>
          ) : (
            <div className="space-y-3">
              {pendingPieces.map((piece) => (
                <div
                  key={piece.id}
                  className="rounded-lg border border-amber-200 bg-amber-50/30 p-4 transition hover:bg-amber-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-sky-800">{piece.platform}</span>
                      <span className="text-slate-300">·</span>
                      <span className="font-medium text-slate-700">{piece.type}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500">{piece.destination} ({piece.destinationType})</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{piece.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2">{piece.caption}</p>
                    <div className="text-[11px] text-emerald-800 font-medium pt-1">
                      Tarifa: {piece.priceText} | Equipaje: {piece.baggageIncluded}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedPieceForPreview(piece)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Previsualizar</span>
                    </button>
                    <button
                      onClick={() => handleReject(piece)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Pedir Ajustes</span>
                    </button>
                    <button
                      onClick={() => handleApprove(piece)}
                      className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-semibold rounded-md bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Aprobar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Editorial Calendar Grid */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700">
                <CalendarIcon className="w-4 h-4" />
                <span>Parrilla Editorial Automatizada</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">Calendario de Publicaciones Semanales</h2>
              <p className="text-xs text-slate-600">
                Asegura la constancia semanal requerida para no depender de la improvisación de una sola persona.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs self-start sm:self-auto">
              {['Todas', 'Instagram', 'Facebook', 'TikTok', 'WhatsApp'].map((plat) => (
                <button
                  key={plat}
                  onClick={() => setFilterPlatform(plat)}
                  className={`px-3 py-1 rounded-md font-medium transition cursor-pointer ${
                    filterPlatform === plat ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {plat}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule Slots */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredApprovedPieces.map((piece) => (
              <div
                key={piece.id}
                className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 flex flex-col justify-between hover:border-sky-300 transition"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-sky-800">{piece.platform}</span>
                    <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                      {piece.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm">{piece.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{piece.caption}</p>

                  <div className="mt-3 rounded border border-slate-200 bg-white p-2.5 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Fecha Programada:</span>
                      <span className="font-semibold text-slate-800">{piece.scheduledDate || '2026-10-25'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Hora de Publicación:</span>
                      <span className="font-semibold text-slate-800">{piece.scheduledTime || '12:00 PM'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Alcance Estimado:</span>
                      <span className="font-semibold text-sky-700">~{piece.estimatedReach || 3500} personas</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setSelectedPieceForPreview(piece)}
                    className="text-sky-700 hover:text-sky-800 font-medium inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver simulación</span>
                  </button>
                  <span className="text-[11px] text-slate-400">Revisado por Adri</span>
                </div>
              </div>
            ))}
          </div>

          {/* Next Step Banner */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs text-slate-600 mb-3 sm:mb-0">
              <strong className="text-slate-900">Siguiente etapa:</strong> Una vez aprobadas y programadas, activa las campañas en la <strong>Actividad 4: Publicación y Pauta</strong>.
            </div>
            <button
              onClick={() => setActiveTab('act-4')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-700 text-white text-xs font-medium hover:bg-sky-800 transition cursor-pointer"
            >
              <span>Ir a Publicación y Pauta</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Preview */}
      {selectedPieceForPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div>
                <span className="text-xs font-semibold text-sky-700 uppercase">Simulación de Anuncio</span>
                <h3 className="text-lg font-bold text-slate-900">{selectedPieceForPreview.title}</h3>
              </div>
              <button
                onClick={() => setSelectedPieceForPreview(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Social mockup card */}
            <div className="rounded-xl border border-slate-300 bg-white overflow-hidden shadow-sm">
              <div className="p-3 border-b border-slate-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-sky-800 text-white flex items-center justify-center font-bold text-xs">
                  VA
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900">viajacon.adri</div>
                  <div className="text-[10px] text-slate-500">Medellín, Colombia · Publicidad</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-sky-900 to-slate-900 p-6 text-white text-center">
                <span className="text-xs font-semibold text-sky-300 uppercase tracking-widest">
                  {selectedPieceForPreview.destinationType}
                </span>
                <h2 className="text-xl font-extrabold mt-1">{selectedPieceForPreview.destination}</h2>
                <div className="my-3 inline-block bg-amber-500 text-slate-950 px-3 py-1 rounded font-bold text-sm">
                  {selectedPieceForPreview.priceText}
                </div>
                <p className="text-xs text-sky-100 font-medium">
                  {selectedPieceForPreview.baggageIncluded}
                </p>
              </div>

              <div className="p-4 text-xs space-y-2">
                <div className="font-bold text-slate-900">
                  viajacon.adri <span className="font-normal text-slate-800">{selectedPieceForPreview.caption}</span>
                </div>
                <div className="p-2 rounded bg-sky-50 text-sky-900 font-semibold border border-sky-100">
                  📲 {selectedPieceForPreview.cta}
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelectedPieceForPreview(null)}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-medium cursor-pointer"
              >
                Cerrar Previsualización
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
