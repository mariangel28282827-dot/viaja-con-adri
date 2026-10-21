import React from 'react';
import { usePlatform } from '../context/PlatformContext';
import { X, ExternalLink, Download, FileText } from 'lucide-react';

export const PdfViewerModal: React.FC = () => {
  const { activePdf, closePdfModal } = usePlatform();

  if (!activePdf) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="flex flex-col h-[90vh] w-full max-w-5xl rounded-xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-700" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">{activePdf.title}</h3>
              <p className="text-[11px] text-slate-500">Documento de Referencia Institucional · Viaja con Adri</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={activePdf.url}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar Archivo</span>
            </a>

            <a
              href={activePdf.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-xs font-semibold text-white"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Abrir en Nueva Pestaña</span>
            </a>

            <button
              onClick={closePdfModal}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content iframe */}
        <div className="flex-1 bg-slate-100 p-2">
          <iframe
            src={activePdf.url}
            title={activePdf.title}
            className="w-full h-full rounded border border-slate-300 bg-white"
          />
        </div>
      </div>
    </div>
  );
};
