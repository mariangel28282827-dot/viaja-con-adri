import React from 'react';
import { usePlatform } from '../context/PlatformContext';
import {
  Compass,
  Sparkles,
  CheckCircle2,
  Megaphone,
  MessageSquare,
  DollarSign,
  BarChart3,
  FileText,
  AlertCircle,
  Layers,
  LayoutDashboard,
  BookOpen,
} from 'lucide-react';

export const ActivityTabs: React.FC = () => {
  const { activeTab, setActiveTab, modules } = usePlatform();

  const getModuleInstalled = (actNum: number) => {
    const mod = modules.find((m) => m.activityNumber === actNum);
    return mod?.installed ?? true;
  };

  const PRIMARY_TABS = [
    { id: 'dashboard', label: 'Visión General', icon: LayoutDashboard },
    { id: 'caracterizacion', label: 'Ficha de Caracterización', icon: FileText },
    { id: 'problemas', label: 'Solución de Problemas', icon: AlertCircle },
    { id: 'modulos', label: 'Gestión de Módulos', icon: Layers },
    { id: 'manual', label: 'Manual de Usuario', icon: BookOpen },
  ];

  const ACTIVITY_TABS = [
    { id: 'act-1', num: 1, label: '1. Estrategia', icon: Compass },
    { id: 'act-2', num: 2, label: '2. Contenido', icon: Sparkles },
    { id: 'act-3', num: 3, label: '3. Aprobación', icon: CheckCircle2 },
    { id: 'act-4', num: 4, label: '4. Pauta Digital', icon: Megaphone },
    { id: 'act-5', num: 5, label: '5. Atención Leads', icon: MessageSquare },
    { id: 'act-6', num: 6, label: '6. Cierre Ventas', icon: DollarSign },
    { id: 'act-7', num: 7, label: '7. Medición', icon: BarChart3 },
  ];

  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Row 1: Global / System Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pt-2 pb-1 border-b border-slate-100 no-scrollbar">
          {PRIMARY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-300' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Row 2: The 7 Activity Tabs ("para cada actividad generar una pestaña diferente") */}
        <div className="flex items-center gap-1 overflow-x-auto py-2 no-scrollbar">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-2 shrink-0 hidden sm:inline">
            Actividades:
          </span>

          {ACTIVITY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isInstalled = getModuleInstalled(tab.num);

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-sky-700 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{tab.label}</span>

                {/* Dot indicating installed vs uninstalled */}
                <span
                  title={isInstalled ? 'Módulo Instalado y Activo' : 'Módulo Desinstalado'}
                  className={`w-1.5 h-1.5 rounded-full ml-0.5 ${
                    isInstalled ? (isActive ? 'bg-emerald-300' : 'bg-emerald-500') : 'bg-slate-300'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
