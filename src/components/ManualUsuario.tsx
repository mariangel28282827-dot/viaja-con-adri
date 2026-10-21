import React, { useState } from 'react';
import { usePlatform } from '../context/PlatformContext';
import {
  BookOpen,
  Printer,
  Download,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Save,
  Trash2,
  FileText,
  Layers,
  ArrowRight,
  Search,
  ExternalLink,
} from 'lucide-react';

export const ManualUsuario: React.FC = () => {
  const { setActiveTab, openPdfModal } = usePlatform();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('todos');

  const SECTIONS = [
    { id: 'todos', label: 'Todo el Manual' },
    { id: 'botones', label: '1. Botones Clave (Instalar / Guardar)' },
    { id: 'flujo', label: '2. Flujo de las 7 Actividades' },
    { id: 'caracterizacion', label: '3. Ficha de Caracterización PHVA' },
    { id: 'problemas', label: '4. Centro de Solución de Problemas' },
    { id: 'faq', label: '5. Preguntas Frecuentes' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-700">
            <BookOpen className="w-4 h-4" />
            <span>Guía Oficial y Documentación del Sistema</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
            Manual de Usuario · Plataforma Viaja con Adri
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Instrucciones completas para operar el proceso de Marketing Digital, la Caracterización PHVA y la resolución de problemas.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Imprimir Manual</span>
          </button>

          <a
            href="/MANUAL_DE_USUARIO.md"
            download="MANUAL_DE_USUARIO_VIAJA_CON_ADRI.md"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-sky-700 text-white hover:bg-sky-800 transition cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Archivo Markdown</span>
          </a>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto no-scrollbar">
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition shrink-0 cursor-pointer ${
                activeSection === sec.id
                  ? 'bg-sky-700 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Buscar en el manual..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50/50 pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Section 1: Botones Clave (Instalar / Desinstalar y Guardar Avances) */}
      {(activeSection === 'todos' || activeSection === 'botones') && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-800 border-b border-slate-100 pb-2">
            <Layers className="w-4 h-4 text-sky-600" />
            <span>1. Guía de Uso de los Botones Principales</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Button 1: Instalar y Desinstalar */}
            <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4 space-y-2.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-md bg-emerald-100 text-emerald-800 font-bold">
                  <Download className="w-4 h-4" />
                </span>
                <span className="p-1.5 rounded-md bg-red-100 text-red-800 font-bold">
                  <Trash2 className="w-4 h-4" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  Botones de "Instalar" y "Desinstalar Módulo"
                </h3>
              </div>

              <p className="text-slate-700 leading-relaxed">
                Cada una de las 7 actividades del proceso de Viaja con Adri cuenta con un agente o módulo de software asignado.
              </p>

              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>
                  <strong>Dónde encontrarlos:</strong> En el banner superior de cada actividad y en la pestaña de <em>"Gestión de Módulos"</em>.
                </li>
                <li>
                  <strong>Al pulsar "Desinstalar":</strong> El agente se suspende, ahorrando recursos operativos. La actividad pasa a modo pausado.
                </li>
                <li>
                  <strong>Al pulsar "Instalar":</strong> El agente se activa inmediatamente, habilitando el generador creativo, chatbot, CRM o reportes.
                </li>
                <li>
                  <strong>Instalación masiva:</strong> Puedes instalar o desinstalar todos los módulos simultáneamente en el Centro de Módulos.
                </li>
              </ul>

              <button
                onClick={() => setActiveTab('modulos')}
                className="mt-2 text-xs font-semibold text-sky-700 hover:text-sky-800 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Ir al Gestor de Módulos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Button 2: Guardar Avances */}
            <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4 space-y-2.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-md bg-sky-100 text-sky-800 font-bold">
                  <Save className="w-4 h-4" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  Botón de "Guardar Avances"
                </h3>
              </div>

              <p className="text-slate-700 leading-relaxed">
                Garantiza que ningún cambio, cotización, nuevo lead o pieza publicitaria se pierda al recargar el navegador.
              </p>

              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>
                  <strong>Dónde encontrarlo:</strong> Visible permanentemente en la barra superior (Navbar) con la hora del último guardado, y dentro de cada pestaña.
                </li>
                <li>
                  <strong>Al pulsar "Guardar Avances":</strong> Todos los datos se sincronizan y almacenan en el <code className="text-[11px] bg-slate-200 px-1 py-0.5 rounded">localStorage</code> de forma persistente.
                </li>
                <li>
                  <strong>Confirmación visual:</strong> Recibirás un mensaje flotante verde (*toast*) indicando la hora exacta del guardado.
                </li>
                <li>
                  <strong>Restablecer:</strong> Si deseas regresar a los valores originales de Viaja con Adri, presiona el icono de retroceso en el Navbar.
                </li>
              </ul>

              <div className="mt-2 p-2 rounded bg-sky-50 text-[11px] text-sky-800 border border-sky-100">
                💡 Consejo: Guarda tus avances después de redactar una nueva pieza o generar una cotización formal.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Las 7 Actividades */}
      {(activeSection === 'todos' || activeSection === 'flujo') && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-800 border-b border-slate-100 pb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>2. Guía Detallada de las 7 Actividades del Proceso</span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">
                  Actividad 1: Investigación y Estrategia
                </h4>
                <button
                  onClick={() => setActiveTab('act-1')}
                  className="text-sky-700 font-semibold hover:underline"
                >
                  Abrir Actividad 1 →
                </button>
              </div>
              <p className="text-slate-600 mt-1">
                <strong>Propósito:</strong> Define claramente a quién nos dirigimos (Buyer Personas), las metas SMART cuantificables (como +30% en ventas regionales) y el análisis de temporadas de viaje en Colombia.
              </p>
              <div className="mt-2 text-slate-500 text-[11px]">
                <strong>Entradas:</strong> Objetivos de la agencia, público, temporadas | <strong>Salidas:</strong> Buyer personas y objetivos SMART.
              </div>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">
                  Actividad 2: Creación de Contenido
                </h4>
                <button
                  onClick={() => setActiveTab('act-2')}
                  className="text-sky-700 font-semibold hover:underline"
                >
                  Abrir Actividad 2 →
                </button>
              </div>
              <p className="text-slate-600 mt-1">
                <strong>Propósito:</strong> Redactar guiones para Reels/TikTok y carruseles para rutas regionales (Guatapé, Jardín, Jericó, Santa Fe) y nacionales. Cumple con la regla del Ciclo Deming: <em>Tarifa por trayecto + Condiciones + Equipaje incluido sin sorpresas</em>.
              </p>
              <div className="mt-2 text-slate-500 text-[11px]">
                <strong>Entradas:</strong> Plan de contenidos, paquetes turísticos | <strong>Salidas:</strong> Guiones y publicaciones listas para revisión.
              </div>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">
                  Actividad 3: Aprobación y Programación
                </h4>
                <button
                  onClick={() => setActiveTab('act-3')}
                  className="text-sky-700 font-semibold hover:underline"
                >
                  Abrir Actividad 3 →
                </button>
              </div>
              <p className="text-slate-600 mt-1">
                <strong>Propósito:</strong> Bandeja de visto bueno de la Dirección (Adriana Osorio). Permite previsualizar cómo se verá el post en Instagram y programa las publicaciones en la parrilla semanal en los mejores horarios.
              </p>
              <div className="mt-2 text-slate-500 text-[11px]">
                <strong>Entradas:</strong> Piezas creadas | <strong>Salidas:</strong> Contenido aprobado y programado.
              </div>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">
                  Actividad 4: Publicación y Pauta Digital
                </h4>
                <button
                  onClick={() => setActiveTab('act-4')}
                  className="text-sky-700 font-semibold hover:underline"
                >
                  Abrir Actividad 4 →
                </button>
              </div>
              <p className="text-slate-600 mt-1">
                <strong>Propósito:</strong> Control del presupuesto publicitario en Meta Ads y TikTok Ads con segmentación precisa en Medellín y Valle de Aburrá, además de un generador de enlaces rastreados con UTM hacia WhatsApp Business.
              </p>
              <div className="mt-2 text-slate-500 text-[11px]">
                <strong>Entradas:</strong> Piezas aprobadas, presupuesto COP | <strong>Salidas:</strong> Anuncios activos y clics rastreados a WhatsApp.
              </div>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">
                  Actividad 5: Atención y Captación de Leads
                </h4>
                <button
                  onClick={() => setActiveTab('act-5')}
                  className="text-sky-700 font-semibold hover:underline"
                >
                  Abrir Actividad 5 →
                </button>
              </div>
              <p className="text-slate-600 mt-1">
                <strong>Propósito:</strong> Atención inmediata multicanal con Chatbot que responde en menos de 3 minutos, calificando la temperatura del prospecto (Caliente, Tibio, Frío) para evitar que compre en otra agencia.
              </p>
              <div className="mt-2 text-slate-500 text-[11px]">
                <strong>Entradas:</strong> Mensajes de WhatsApp, DM, formularios | <strong>Salidas:</strong> Leads calificados en el CRM.
              </div>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">
                  Actividad 6: Seguimiento y Cierre de Venta
                </h4>
                <button
                  onClick={() => setActiveTab('act-6')}
                  className="text-sky-700 font-semibold hover:underline"
                >
                  Abrir Actividad 6 →
                </button>
              </div>
              <p className="text-slate-600 mt-1">
                <strong>Propósito:</strong> Pipeline comercial Kanban, generador formal de cotizaciones con desglose detallado (transporte, hotel, tours, póliza) y cobro del 50% de abono de reserva.
              </p>
              <div className="mt-2 text-slate-500 text-[11px]">
                <strong>Entradas:</strong> Leads calificados, cotizaciones | <strong>Salidas:</strong> Reservas confirmadas y pagos registrados.
              </div>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">
                  Actividad 7: Medición y Reporte
                </h4>
                <button
                  onClick={() => setActiveTab('act-7')}
                  className="text-sky-700 font-semibold hover:underline"
                >
                  Abrir Actividad 7 →
                </button>
              </div>
              <p className="text-slate-600 mt-1">
                <strong>Propósito:</strong> Tablero de control con el <em>Indicador de Efectividad Gerencial del SENA</em> ((Ventas reales / Ventas proyectadas) × 100), evaluación del Costo por Lead y reporte mensual imprimible para la Dirección.
              </p>
              <div className="mt-2 text-slate-500 text-[11px]">
                <strong>Entradas:</strong> Métricas de redes, pauta, leads y ventas | <strong>Salidas:</strong> Informe mensual y plan de mejoras PHVA.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 3: Caracterización y Calidad */}
      {(activeSection === 'todos' || activeSection === 'caracterizacion') && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-800 border-b border-slate-100 pb-2">
            <FileText className="w-4 h-4 text-sky-600" />
            <span>3. Ficha de Caracterización Oficial (Norma PHVA)</span>
          </div>

          <div className="text-xs text-slate-700 space-y-2">
            <p>
              La pestaña <strong>"Ficha de Caracterización"</strong> formaliza el proceso bajo las directrices del Sistema Integrado de Gestión de Calidad (código MK-cp-01 / GH-cp-01):
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block mb-1">Estructura PHVA:</strong>
                <p className="text-slate-600">
                  Cada actividad está clasificada en <strong>PLANEAR</strong> (estrategia y calendario), <strong>HACER</strong> (creación, pauta y atención), <strong>VERIFICAR</strong> (auditoría de métricas) y <strong>ACTUAR</strong> (planes de mejora).
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block mb-1">Edición y Personalización:</strong>
                <p className="text-slate-600">
                  Puedes editar la descripción general del proceso o agregar nuevas filas de actividades con sus proveedores, insumos, productos y clientes respectivos.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('caracterizacion')}
                className="text-xs font-semibold text-sky-700 hover:text-sky-800 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Ver la Ficha de Caracterización Completa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section 4: Problemas y Soluciones */}
      {(activeSection === 'todos' || activeSection === 'problemas') && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 border-b border-slate-100 pb-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>4. Solución a los Problemas Actuales del Proceso</span>
          </div>

          <div className="text-xs text-slate-700 space-y-3">
            <p>
              La plataforma ataca directamente las 6 causas raíz que frenaban el crecimiento de la agencia:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                    <th className="p-2.5">Dolor Original</th>
                    <th className="p-2.5">Consecuencia Comercial</th>
                    <th className="p-2.5">Solución en la Plataforma</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">Tiempo excesivo</td>
                    <td className="p-2.5 text-slate-600">Horas perdidas que se podrían dedicar a vender</td>
                    <td className="p-2.5 text-emerald-800 font-medium">Asistente creativo y plantillas automatizadas</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">Falta de constancia</td>
                    <td className="p-2.5 text-slate-600">Dependencia de una sola persona y publicaciones irregulares</td>
                    <td className="p-2.5 text-emerald-800 font-medium">Calendario editorial semanal programado</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">Leads perdidos</td>
                    <td className="p-2.5 text-slate-600">Consultas sin responder a tiempo (&gt;2 horas)</td>
                    <td className="p-2.5 text-emerald-800 font-medium">Chatbot con respuesta en &lt; 3 minutos y bandeja unificada</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">Falta de datos</td>
                    <td className="p-2.5 text-slate-600">Decisiones basadas en intuición sin saber el ROI</td>
                    <td className="p-2.5 text-emerald-800 font-medium">Tablero de métricas con CPL y ventas por canal</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">Mensajes genéricos</td>
                    <td className="p-2.5 text-slate-600">Se ofrece lo mismo a todos sin personalizar</td>
                    <td className="p-2.5 text-emerald-800 font-medium">Calificador por presupuesto y cotizaciones dinámicas</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">Baja venta regional</td>
                    <td className="p-2.5 text-slate-600">Desconocimiento de tarifas y miedo a cobros de equipaje</td>
                    <td className="p-2.5 text-emerald-800 font-medium">Copys con tarifa por trayecto, condiciones y equipaje garantizado</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Section 5: FAQ */}
      {(activeSection === 'todos' || activeSection === 'faq') && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-800 border-b border-slate-100 pb-2">
            <HelpCircle className="w-4 h-4 text-sky-600" />
            <span>5. Preguntas Frecuentes & Soporte</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block font-bold mb-1">
                ¿Dónde se guardan los datos ingresados en la plataforma?
              </strong>
              <p className="text-slate-600">
                Se guardan de forma segura y permanente en el almacenamiento local de tu navegador (<code className="text-[11px] bg-slate-200 px-1 py-0.5 rounded">localStorage</code>) cada vez que haces clic en <strong>Guardar Avances</strong>.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block font-bold mb-1">
                ¿Puedo ver los documentos PDF originales del SENA y de Viaja con Adri?
              </strong>
              <p className="text-slate-600">
                Sí. En el botón <strong>"Documentos Originales"</strong> ubicado en el Navbar superior puedes abrir o descargar los archivos originales: el Proceso de Marketing Digital, la Ficha de Caracterización y la Presentación del SENA.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block font-bold mb-1">
                ¿Cómo imprimo una cotización formal para un cliente?
              </strong>
              <p className="text-slate-600">
                En la <strong>Actividad 6: Cierre de Venta</strong>, selecciona el lead deseado, ajusta los valores del desglose y haz clic en el botón <strong>"Imprimir / PDF"</strong>. El sistema formateará el comprobante oficial con el logo y datos de Viaja con Adri.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
