import React, { useState } from 'react';
import { usePlatform } from '../context/PlatformContext';
import { CharacterizationEntry } from '../types';
import { FileText, Save, Plus, Printer, Edit2, Trash2, Check, Download, ExternalLink, HelpCircle } from 'lucide-react';

export const CaracterizacionSheet: React.FC = () => {
  const {
    processInfo,
    updateProcessInfo,
    characterizationEntries,
    addCharacterizationEntry,
    updateCharacterizationEntry,
    deleteCharacterizationEntry,
    saveProgress,
    openPdfModal,
  } = usePlatform();

  const [editingInfo, setEditingInfo] = useState(false);
  const [tempInfo, setTempInfo] = useState(processInfo);

  // New entry modal
  const [showAddEntryModal, setShowAddEntryModal] = useState(false);
  const [newEntry, setNewEntry] = useState<Omit<CharacterizationEntry, 'id'>>({
    fasePHVA: 'PLANEAR',
    proveedorInterno: 'Gerencia',
    proveedorExterno: 'Aliados turísticos',
    insumos: '',
    actividad: '',
    responsable: 'Adriana Osorio',
    productos: '',
    clienteInterno: 'Comercial',
    clienteExterno: 'Viajeros',
  });

  const handleSaveInfo = () => {
    updateProcessInfo(tempInfo);
    setEditingInfo(false);
    saveProgress('Información general de caracterización actualizada');
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.actividad) return;
    addCharacterizationEntry(newEntry);
    setNewEntry({
      fasePHVA: 'PLANEAR',
      proveedorInterno: 'Gerencia',
      proveedorExterno: 'Aliados turísticos',
      insumos: '',
      actividad: '',
      responsable: 'Adriana Osorio',
      productos: '',
      clienteInterno: 'Comercial',
      clienteExterno: 'Viajeros',
    });
    setShowAddEntryModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-700">
            <FileText className="w-4 h-4" />
            <span>Sistema Integrado de Calidad & Procesos</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
            Ficha de Caracterización del Proceso
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Estandarización institucional del área de Marketing Digital bajo la metodología PHVA (Planear - Hacer - Verificar - Actuar).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() =>
              openPdfModal(
                '/assets/aistudio/FICHADECARACTERIZACIONVIAJACONADRI__1__d9dee91c.pdf',
                'Ficha de Caracterización Oficial (PDF Original)'
              )
            }
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-sky-600" />
            <span>Ver PDF Original Adjunto</span>
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Ficha</span>
          </button>

          <button
            onClick={() => saveProgress('Ficha de Caracterización guardada exitosamente')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-sky-700 text-white hover:bg-sky-800 shadow-sm transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Avances de Ficha</span>
          </button>
        </div>
      </div>

      {/* Process Header Table (Standard ISO / SENA format) */}
      <div className="rounded-xl border border-slate-300 bg-white shadow-sm overflow-hidden text-xs">
        {/* Institutional header bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 border-b border-slate-300 bg-slate-50 text-slate-800">
          <div className="p-4 border-b md:border-b-0 md:border-r border-slate-300 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-900 text-white font-black text-sm flex items-center justify-center">
              VA
            </div>
            <div>
              <div className="font-extrabold text-sm text-sky-900">Viaja con Adri</div>
              <div className="text-[10px] text-slate-500">Agencia de Viajes y Turismo</div>
            </div>
          </div>

          <div className="p-4 md:col-span-2 border-b md:border-b-0 md:border-r border-slate-300 text-center flex flex-col justify-center">
            <div className="font-bold text-sm text-slate-900 uppercase">
              CARACTERIZACIÓN DEL PROCESO: MARKETING DIGITAL
            </div>
            <div className="text-[11px] text-slate-500">Sistema de Gestión de la Calidad y Mercadeo</div>
          </div>

          <div className="p-3 text-[11px] space-y-1 flex flex-col justify-center bg-slate-100/60">
            <div>
              <span className="font-semibold text-slate-700">Código:</span> {processInfo.code}
            </div>
            <div>
              <span className="font-semibold text-slate-700">Versión:</span> {processInfo.version}
            </div>
            <div>
              <span className="font-semibold text-slate-700">Vigencia:</span> {processInfo.effectiveDate}
            </div>
          </div>
        </div>

        {/* General Process Attributes */}
        <div className="p-5 space-y-3.5 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="font-bold text-slate-900 uppercase tracking-wider text-xs">
              Descripción General del Proceso
            </span>
            <button
              onClick={() => {
                setTempInfo(processInfo);
                setEditingInfo(!editingInfo);
              }}
              className="text-sky-700 hover:text-sky-800 font-semibold text-xs inline-flex items-center gap-1 cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{editingInfo ? 'Cancelar Edición' : 'Editar Información'}</span>
            </button>
          </div>

          {editingInfo ? (
            <div className="space-y-3 pt-2 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Objetivo del Proceso</label>
                <textarea
                  rows={2}
                  value={tempInfo.objective}
                  onChange={(e) => setTempInfo({ ...tempInfo, objective: e.target.value })}
                  className="w-full rounded border border-slate-300 p-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Alcance del Proceso</label>
                <textarea
                  rows={2}
                  value={tempInfo.scope}
                  onChange={(e) => setTempInfo({ ...tempInfo, scope: e.target.value })}
                  className="w-full rounded border border-slate-300 p-2 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Líder o Responsable</label>
                  <input
                    type="text"
                    value={tempInfo.responsibleLeader}
                    onChange={(e) => setTempInfo({ ...tempInfo, responsibleLeader: e.target.value })}
                    className="w-full rounded border border-slate-300 p-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tipología</label>
                  <input
                    type="text"
                    value={tempInfo.processType}
                    onChange={(e) => setTempInfo({ ...tempInfo, processType: e.target.value })}
                    className="w-full rounded border border-slate-300 p-2 text-slate-900"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={handleSaveInfo}
                  className="px-4 py-2 bg-sky-700 text-white rounded font-semibold cursor-pointer"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <div>
                  <span className="font-bold text-slate-700 block">OBJETIVO DEL PROCESO:</span>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">{processInfo.objective}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-700 block">ALCANCE DEL PROCESO:</span>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">{processInfo.scope}</p>
                </div>
              </div>

              <div className="space-y-2 border-t md:border-t-0 md:border-l md:pl-4 border-slate-200">
                <div>
                  <span className="font-bold text-slate-700">RESPONSABLE O LÍDER:</span>
                  <span className="text-slate-800 ml-1.5">{processInfo.responsibleLeader}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700">TIPOLOGÍA:</span>
                  <span className="text-slate-800 ml-1.5">{processInfo.processType}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 block mb-1">FRECUENCIA OPERATIVA:</span>
                  <ul className="list-disc list-inside text-slate-600 space-y-0.5 text-[11px]">
                    <li>Contenido: {processInfo.frequency.content}</li>
                    <li>Atención: {processInfo.frequency.attention}</li>
                    <li>Reporte: {processInfo.frequency.reporting}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main PHVA Characterization Table */}
      <div className="rounded-xl border border-slate-300 bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
              Matriz PHVA Detallada del Proceso (Planear - Hacer - Verificar - Actuar)
            </h3>
            <p className="text-xs text-slate-500">
              Registra Proveedores, Insumos, Actividades, Responsables, Salidas y Clientes de Viaja con Adri.
            </p>
          </div>

          <button
            onClick={() => setShowAddEntryModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-sky-700 text-white hover:bg-sky-800 transition cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar Fila PHVA</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-300 bg-slate-100 text-slate-700 font-bold uppercase text-[11px]">
                <th className="p-3 border-r border-slate-300 w-24">Fase PHVA</th>
                <th className="p-3 border-r border-slate-300 w-44">Proveedor (Int / Ext)</th>
                <th className="p-3 border-r border-slate-300 w-48">Insumos</th>
                <th className="p-3 border-r border-slate-300">Actividades</th>
                <th className="p-3 border-r border-slate-300 w-36">Responsable</th>
                <th className="p-3 border-r border-slate-300 w-48">Productos / Salidas</th>
                <th className="p-3 border-r border-slate-300 w-36">Cliente / Usuario</th>
                <th className="p-3 text-center w-16">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {characterizationEntries.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/70 transition">
                  <td className="p-3 border-r border-slate-200 font-bold">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.fasePHVA === 'PLANEAR'
                          ? 'bg-sky-100 text-sky-800'
                          : row.fasePHVA === 'HACER'
                          ? 'bg-emerald-100 text-emerald-800'
                          : row.fasePHVA === 'VERIFICAR'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {row.fasePHVA}
                    </span>
                  </td>

                  <td className="p-3 border-r border-slate-200">
                    <div className="font-semibold text-slate-800">{row.proveedorInterno}</div>
                    {row.proveedorExterno && (
                      <div className="text-[11px] text-slate-500 mt-0.5">{row.proveedorExterno}</div>
                    )}
                  </td>

                  <td className="p-3 border-r border-slate-200 text-slate-700">{row.insumos}</td>

                  <td className="p-3 border-r border-slate-200 font-medium text-slate-900 leading-relaxed">
                    {row.actividad}
                  </td>

                  <td className="p-3 border-r border-slate-200 text-slate-800 font-medium">
                    {row.responsable}
                  </td>

                  <td className="p-3 border-r border-slate-200 text-sky-900 font-medium">
                    {row.productos}
                  </td>

                  <td className="p-3 border-r border-slate-200">
                    <div className="text-slate-800 font-semibold">{row.clienteInterno}</div>
                    {row.clienteExterno && (
                      <div className="text-[11px] text-slate-500 mt-0.5">{row.clienteExterno}</div>
                    )}
                  </td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => deleteCharacterizationEntry(row.id)}
                      className="text-slate-400 hover:text-red-600 p-1 rounded transition"
                      title="Eliminar fila"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Characterization Entry */}
      {showAddEntryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">Agregar Actividad a la Caracterización</h3>
            <p className="text-xs text-slate-500 mt-0.5">Ingresa los elementos del flujo PHVA.</p>

            <form onSubmit={handleAddEntry} className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Fase PHVA</label>
                  <select
                    value={newEntry.fasePHVA}
                    onChange={(e) => setNewEntry({ ...newEntry, fasePHVA: e.target.value as any })}
                    className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                  >
                    <option value="PLANEAR">PLANEAR</option>
                    <option value="HACER">HACER</option>
                    <option value="VERIFICAR">VERIFICAR</option>
                    <option value="ACTUAR">ACTUAR</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Responsable</label>
                  <input
                    type="text"
                    required
                    value={newEntry.responsable}
                    onChange={(e) => setNewEntry({ ...newEntry, responsable: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Proveedor Interno</label>
                  <input
                    type="text"
                    value={newEntry.proveedorInterno}
                    onChange={(e) => setNewEntry({ ...newEntry, proveedorInterno: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Proveedor Externo</label>
                  <input
                    type="text"
                    value={newEntry.proveedorExterno}
                    onChange={(e) => setNewEntry({ ...newEntry, proveedorExterno: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Insumos Necesarios</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Tarifas actualizadas, calendario, requerimientos del cliente"
                  value={newEntry.insumos}
                  onChange={(e) => setNewEntry({ ...newEntry, insumos: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Descripción de la Actividad</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ej: Creación de piezas con desglose de precios y equipaje incluido..."
                  value={newEntry.actividad}
                  onChange={(e) => setNewEntry({ ...newEntry, actividad: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Productos / Salidas Obtenidas</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Publicaciones aprobadas, cotización formal, reserva cerrada"
                  value={newEntry.productos}
                  onChange={(e) => setNewEntry({ ...newEntry, productos: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Cliente Interno</label>
                  <input
                    type="text"
                    value={newEntry.clienteInterno}
                    onChange={(e) => setNewEntry({ ...newEntry, clienteInterno: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Cliente Externo</label>
                  <input
                    type="text"
                    value={newEntry.clienteExterno}
                    onChange={(e) => setNewEntry({ ...newEntry, clienteExterno: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2 text-slate-900 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddEntryModal(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-sky-700 px-4 py-2 font-semibold text-white hover:bg-sky-800"
                >
                  Guardar Fila
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
