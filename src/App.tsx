/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PlatformProvider, usePlatform } from './context/PlatformContext';
import { Navbar } from './components/Navbar';
import { ActivityTabs } from './components/ActivityTabs';
import { DashboardOverview } from './components/DashboardOverview';
import { CaracterizacionSheet } from './components/CaracterizacionSheet';
import { ProblemasSoluciones } from './components/ProblemasSoluciones';
import { ModuloManager } from './components/ModuloManager';
import { Activity1Estrategia } from './components/activities/Activity1Estrategia';
import { Activity2Contenido } from './components/activities/Activity2Contenido';
import { Activity3Aprobacion } from './components/activities/Activity3Aprobacion';
import { Activity4Pauta } from './components/activities/Activity4Pauta';
import { Activity5AtencionLeads } from './components/activities/Activity5AtencionLeads';
import { Activity6CierreVentas } from './components/activities/Activity6CierreVentas';
import { Activity7MedicionReporte } from './components/activities/Activity7MedicionReporte';
import { ManualUsuario } from './components/ManualUsuario';
import { PdfViewerModal } from './components/PdfViewerModal';
import { ToastContainer } from './components/ToastContainer';

const MainContent: React.FC = () => {
  const { activeTab } = usePlatform();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'caracterizacion':
        return <CaracterizacionSheet />;
      case 'problemas':
        return <ProblemasSoluciones />;
      case 'modulos':
        return <ModuloManager />;
      case 'manual':
        return <ManualUsuario />;
      case 'act-1':
        return <Activity1Estrategia />;
      case 'act-2':
        return <Activity2Contenido />;
      case 'act-3':
        return <Activity3Aprobacion />;
      case 'act-4':
        return <Activity4Pauta />;
      case 'act-5':
        return <Activity5AtencionLeads />;
      case 'act-6':
        return <Activity6CierreVentas />;
      case 'act-7':
        return <Activity7MedicionReporte />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      {renderActiveView()}
    </main>
  );
};

export default function App() {
  return (
    <PlatformProvider>
      <div className="min-h-screen bg-slate-50/70 text-slate-900 font-sans antialiased flex flex-col justify-between">
        <div>
          <Navbar />
          <ActivityTabs />
          <MainContent />
        </div>

        {/* Institutional Footer */}
        <footer className="mt-12 border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-bold text-slate-800">Viaja con Adri · Agencia de Viajes y Turismo</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Medellín, Antioquia, Colombia · Directora: Adriana Osorio Sánchez · Tel: 3176229851
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span>Código: MK-cp-01</span>
              <span aria-hidden="true">·</span>
              <span>Metodología PHVA (Deming)</span>
              <span aria-hidden="true">·</span>
              <span>Proyecto SENA Valle de Aburrá</span>
            </div>
          </div>
        </footer>

        {/* Global Modals & Notifications */}
        <PdfViewerModal />
        <ToastContainer />
      </div>
    </PlatformProvider>
  );
}
