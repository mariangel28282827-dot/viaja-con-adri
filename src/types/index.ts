export interface AgentModule {
  id: string;
  activityNumber: number;
  name: string;
  role: string;
  description: string;
  installed: boolean;
  version: string;
  lastUpdated: string;
  config: {
    autoRun: boolean;
    notifications: boolean;
    sensitivity?: string;
  };
}

export interface BuyerPersona {
  id: string;
  name: string;
  targetGroup: string;
  ageRange: string;
  budgetRange: string;
  preferredDestinations: string[];
  painPoints: string[];
  motivations: string[];
  favoriteChannels: string[];
}

export interface SmartGoal {
  id: string;
  title: string;
  category: 'Ventas' | 'Marketing' | 'Atención' | 'Posicionamiento';
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  status: 'en_progreso' | 'cumplido' | 'atrasado';
}

export interface ContentPiece {
  id: string;
  title: string;
  type: 'Reel' | 'Carrusel' | 'Post Feed' | 'Story' | 'TikTok' | 'WhatsApp Status';
  destination: string;
  destinationType: 'Regional' | 'Nacional' | 'Internacional';
  priceText: string;
  baggageIncluded: string;
  conditions: string;
  hook: string;
  caption: string;
  cta: string;
  scheduledDate: string;
  scheduledTime: string;
  platform: 'Instagram' | 'Facebook' | 'TikTok' | 'WhatsApp';
  status: 'Borrador' | 'Pendiente Aprobación' | 'Aprobado' | 'Programado' | 'Publicado' | 'Rechazado';
  reviewerNotes?: string;
  estimatedReach?: number;
}

export interface AdCampaign {
  id: string;
  name: string;
  channel: 'Meta Ads (IG/FB)' | 'TikTok Ads' | 'WhatsApp Ads';
  budgetCOP: number;
  spentCOP: number;
  targetAudience: string;
  geographicZone: string;
  startDate: string;
  endDate: string;
  status: 'Activa' | 'Pausada' | 'Finalizada';
  clicks: number;
  leadsGenerated: number;
  targetCostPerLead: number;
  actualCostPerLead: number;
  utmCampaign: string;
}

export interface Lead {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  channel: 'WhatsApp' | 'Instagram DM' | 'Facebook' | 'TikTok' | 'Formulario Web' | 'Presencial';
  destinationOfInterest: string;
  destinationCategory: 'Regional' | 'Nacional' | 'Internacional';
  budgetCOP: number;
  travelDate: string;
  passengersCount: number;
  temperature: 'Caliente' | 'Tibio' | 'Frío';
  status: 'Nuevo' | 'En Asesoría' | 'Cotización Enviada' | 'En Negociación' | 'Reserva Confirmada' | 'Perdido';
  assignedTo: string;
  createdAt: string;
  lastContact: string;
  notes: string;
  quoteAmountCOP?: number;
  depositAmountCOP?: number;
}

export interface ProblemItem {
  id: string;
  stage: string;
  problem: string;
  consequence: string;
  platformSolution: string;
  status: 'Solucionado' | 'En Proceso' | 'Mitigado';
  impactLevel: 'Alto' | 'Medio' | 'Crítico';
  metricImproved: string;
}

export interface CharacterizationEntry {
  id: string;
  fasePHVA: 'PLANEAR' | 'HACER' | 'VERIFICAR' | 'ACTUAR';
  proveedorInterno: string;
  proveedorExterno: string;
  insumos: string;
  actividad: string;
  responsable: string;
  productos: string;
  clienteInterno: string;
  clienteExterno: string;
}

export interface ProcessGeneralInfo {
  code: string;
  version: string;
  effectiveDate: string;
  processName: string;
  objective: string;
  scope: string;
  responsibleLeader: string;
  processType: string;
  tools: string[];
  indicators: string[];
  frequency: {
    content: string;
    attention: string;
    reporting: string;
  };
}
