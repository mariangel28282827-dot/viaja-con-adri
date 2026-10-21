import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AgentModule,
  BuyerPersona,
  SmartGoal,
  ContentPiece,
  AdCampaign,
  Lead,
  ProblemItem,
  CharacterizationEntry,
  ProcessGeneralInfo,
} from '../types';
import {
  initialModules,
  initialProcessInfo,
  initialCharacterizationEntries,
  initialProblems,
  initialBuyerPersonas,
  initialSmartGoals,
  initialContentPieces,
  initialCampaigns,
  initialLeads,
} from '../data/initialData';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface PlatformContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  modules: AgentModule[];
  toggleModuleInstall: (id: string) => void;
  setAllModulesInstall: (install: boolean) => void;
  updateModule: (module: AgentModule) => void;
  processInfo: ProcessGeneralInfo;
  updateProcessInfo: (info: ProcessGeneralInfo) => void;
  characterizationEntries: CharacterizationEntry[];
  addCharacterizationEntry: (entry: Omit<CharacterizationEntry, 'id'>) => void;
  updateCharacterizationEntry: (entry: CharacterizationEntry) => void;
  deleteCharacterizationEntry: (id: string) => void;
  problems: ProblemItem[];
  updateProblem: (problem: ProblemItem) => void;
  buyerPersonas: BuyerPersona[];
  addBuyerPersona: (persona: Omit<BuyerPersona, 'id'>) => void;
  updateBuyerPersona: (persona: BuyerPersona) => void;
  deleteBuyerPersona: (id: string) => void;
  smartGoals: SmartGoal[];
  addSmartGoal: (goal: Omit<SmartGoal, 'id'>) => void;
  updateSmartGoal: (goal: SmartGoal) => void;
  deleteSmartGoal: (id: string) => void;
  contentPieces: ContentPiece[];
  addContentPiece: (piece: Omit<ContentPiece, 'id'>) => void;
  updateContentPiece: (piece: ContentPiece) => void;
  deleteContentPiece: (id: string) => void;
  campaigns: AdCampaign[];
  addCampaign: (campaign: Omit<AdCampaign, 'id'>) => void;
  updateCampaign: (campaign: AdCampaign) => void;
  deleteCampaign: (id: string) => void;
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'lastContact'> & Partial<Pick<Lead, 'createdAt' | 'lastContact'>>) => void;
  updateLead: (lead: Lead) => void;
  deleteLead: (id: string) => void;
  lastSaved: string | null;
  saveProgress: (customMsg?: string) => void;
  resetToDefaults: () => void;
  toasts: ToastInfo[];
  removeToast: (id: string) => void;
  openPdfModal: (pdfUrl: string, title: string) => void;
  activePdf: { url: string; title: string } | null;
  closePdfModal: () => void;
}

const STORAGE_KEY = 'viaja_con_adri_platform_data_v1';

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [modules, setModules] = useState<AgentModule[]>(initialModules);
  const [processInfo, setProcessInfo] = useState<ProcessGeneralInfo>(initialProcessInfo);
  const [characterizationEntries, setCharacterizationEntries] = useState<CharacterizationEntry[]>(initialCharacterizationEntries);
  const [problems, setProblems] = useState<ProblemItem[]>(initialProblems);
  const [buyerPersonas, setBuyerPersonas] = useState<BuyerPersona[]>(initialBuyerPersonas);
  const [smartGoals, setSmartGoals] = useState<SmartGoal[]>(initialSmartGoals);
  const [contentPieces, setContentPieces] = useState<ContentPiece[]>(initialContentPieces);
  const [campaigns, setCampaigns] = useState<AdCampaign[]>(initialCampaigns);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);
  const [activePdf, setActivePdf] = useState<{ url: string; title: string } | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.modules) setModules(parsed.modules);
        if (parsed.processInfo) setProcessInfo(parsed.processInfo);
        if (parsed.characterizationEntries) setCharacterizationEntries(parsed.characterizationEntries);
        if (parsed.problems) setProblems(parsed.problems);
        if (parsed.buyerPersonas) setBuyerPersonas(parsed.buyerPersonas);
        if (parsed.smartGoals) setSmartGoals(parsed.smartGoals);
        if (parsed.contentPieces) setContentPieces(parsed.contentPieces);
        if (parsed.campaigns) setCampaigns(parsed.campaigns);
        if (parsed.leads) setLeads(parsed.leads);
        if (parsed.lastSaved) setLastSaved(parsed.lastSaved);
      }
    } catch (e) {
      console.error('Error loading saved state:', e);
    }
  }, []);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const saveProgress = (customMsg?: string) => {
    const now = new Date();
    const formatted = now.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const stateToSave = {
      modules,
      processInfo,
      characterizationEntries,
      problems,
      buyerPersonas,
      smartGoals,
      contentPieces,
      campaigns,
      leads,
      lastSaved: formatted,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      setLastSaved(formatted);
      addToast(customMsg || `¡Avances guardados con éxito a las ${formatted}!`, 'success');
    } catch (e) {
      console.error('Failed to save state:', e);
      addToast('Error al guardar en el almacenamiento local.', 'warning');
    }
  };

  const resetToDefaults = () => {
    if (window.confirm('¿Deseas restaurar todos los datos a la configuración inicial del proceso de Viaja con Adri?')) {
      setModules(initialModules);
      setProcessInfo(initialProcessInfo);
      setCharacterizationEntries(initialCharacterizationEntries);
      setProblems(initialProblems);
      setBuyerPersonas(initialBuyerPersonas);
      setSmartGoals(initialSmartGoals);
      setContentPieces(initialContentPieces);
      setCampaigns(initialCampaigns);
      setLeads(initialLeads);
      localStorage.removeItem(STORAGE_KEY);
      const now = new Date().toLocaleTimeString('es-CO');
      setLastSaved(now);
      addToast('Se restablecieron los datos predeterminados de Viaja con Adri.', 'info');
    }
  };

  const toggleModuleInstall = (id: string) => {
    setModules((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const newState = !m.installed;
          addToast(
            newState
              ? `Módulo "${m.name}" instalado y activado correctamente.`
              : `Módulo "${m.name}" desinstalado.`,
            newState ? 'success' : 'info'
          );
          return { ...m, installed: newState, lastUpdated: 'Reciente' };
        }
        return m;
      })
    );
  };

  const setAllModulesInstall = (install: boolean) => {
    setModules((prev) =>
      prev.map((m) => ({
        ...m,
        installed: install,
        lastUpdated: 'Reciente',
      }))
    );
    addToast(
      install
        ? 'Todos los módulos y agentes han sido instalados exitosamente.'
        : 'Todos los módulos han sido desinstalados.',
      install ? 'success' : 'info'
    );
  };

  const updateModule = (updated: AgentModule) => {
    setModules((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
  };

  const updateProcessInfo = (info: ProcessGeneralInfo) => {
    setProcessInfo(info);
  };

  const addCharacterizationEntry = (entry: Omit<CharacterizationEntry, 'id'>) => {
    const newEntry: CharacterizationEntry = {
      ...entry,
      id: 'char-' + Date.now(),
    };
    setCharacterizationEntries((prev) => [...prev, newEntry]);
    addToast('Actividad agregada a la caracterización.', 'success');
  };

  const updateCharacterizationEntry = (entry: CharacterizationEntry) => {
    setCharacterizationEntries((prev) =>
      prev.map((c) => (c.id === entry.id ? entry : c))
    );
  };

  const deleteCharacterizationEntry = (id: string) => {
    setCharacterizationEntries((prev) => prev.filter((c) => c.id !== id));
    addToast('Fila de caracterización eliminada.', 'info');
  };

  const updateProblem = (problem: ProblemItem) => {
    setProblems((prev) =>
      prev.map((p) => (p.id === problem.id ? problem : p))
    );
    addToast('Estado del problema actualizado.', 'success');
  };

  const addBuyerPersona = (persona: Omit<BuyerPersona, 'id'>) => {
    const newP: BuyerPersona = { ...persona, id: 'bp-' + Date.now() };
    setBuyerPersonas((prev) => [...prev, newP]);
    addToast('Buyer Persona creado exitosamente.', 'success');
  };

  const updateBuyerPersona = (persona: BuyerPersona) => {
    setBuyerPersonas((prev) =>
      prev.map((p) => (p.id === persona.id ? persona : p))
    );
  };

  const deleteBuyerPersona = (id: string) => {
    setBuyerPersonas((prev) => prev.filter((p) => p.id !== id));
    addToast('Buyer Persona eliminado.', 'info');
  };

  const addSmartGoal = (goal: Omit<SmartGoal, 'id'>) => {
    const newG: SmartGoal = { ...goal, id: 'goal-' + Date.now() };
    setSmartGoals((prev) => [...prev, newG]);
    addToast('Objetivo SMART registrado.', 'success');
  };

  const updateSmartGoal = (goal: SmartGoal) => {
    setSmartGoals((prev) =>
      prev.map((g) => (g.id === goal.id ? goal : g))
    );
  };

  const deleteSmartGoal = (id: string) => {
    setSmartGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const addContentPiece = (piece: Omit<ContentPiece, 'id'>) => {
    const newPiece: ContentPiece = { ...piece, id: 'cp-' + Date.now() };
    setContentPieces((prev) => [newPiece, ...prev]);
    addToast('Pieza de contenido creada con éxito.', 'success');
  };

  const updateContentPiece = (piece: ContentPiece) => {
    setContentPieces((prev) =>
      prev.map((cp) => (cp.id === piece.id ? piece : cp))
    );
  };

  const deleteContentPiece = (id: string) => {
    setContentPieces((prev) => prev.filter((cp) => cp.id !== id));
    addToast('Pieza eliminada.', 'info');
  };

  const addCampaign = (campaign: Omit<AdCampaign, 'id'>) => {
    const newC: AdCampaign = { ...campaign, id: 'camp-' + Date.now() };
    setCampaigns((prev) => [newC, ...prev]);
    addToast('Campaña publicitaria activada.', 'success');
  };

  const updateCampaign = (campaign: AdCampaign) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === campaign.id ? campaign : c))
    );
  };

  const deleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  const addLead = (lead: Omit<Lead, 'id' | 'createdAt' | 'lastContact'> & Partial<Pick<Lead, 'createdAt' | 'lastContact'>>) => {
    const newL: Lead = {
      ...lead,
      id: 'lead-' + Date.now(),
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      lastContact: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setLeads((prev) => [newL, ...prev]);
    addToast('Nuevo lead registrado en el CRM.', 'success');
  };

  const updateLead = (lead: Lead) => {
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? lead : l)));
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    addToast('Lead eliminado.', 'info');
  };

  const openPdfModal = (pdfUrl: string, title: string) => {
    setActivePdf({ url: pdfUrl, title });
  };

  const closePdfModal = () => {
    setActivePdf(null);
  };

  return (
    <PlatformContext.Provider
      value={{
        activeTab,
        setActiveTab,
        modules,
        toggleModuleInstall,
        setAllModulesInstall,
        updateModule,
        processInfo,
        updateProcessInfo,
        characterizationEntries,
        addCharacterizationEntry,
        updateCharacterizationEntry,
        deleteCharacterizationEntry,
        problems,
        updateProblem,
        buyerPersonas,
        addBuyerPersona,
        updateBuyerPersona,
        deleteBuyerPersona,
        smartGoals,
        addSmartGoal,
        updateSmartGoal,
        deleteSmartGoal,
        contentPieces,
        addContentPiece,
        updateContentPiece,
        deleteContentPiece,
        campaigns,
        addCampaign,
        updateCampaign,
        deleteCampaign,
        leads,
        addLead,
        updateLead,
        deleteLead,
        lastSaved,
        saveProgress,
        resetToDefaults,
        toasts,
        removeToast,
        openPdfModal,
        activePdf,
        closePdfModal,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};
