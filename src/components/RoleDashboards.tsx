import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Crown, Compass, HeartHandshake, Share2, Users, CheckCircle2, 
  XCircle, AlertTriangle, Search, PhoneCall, ShieldCheck, 
  Sparkles, Calendar, ExternalLink, Image as ImageIcon,
  Check, ArrowRight, DollarSign, Flag, Radio, Truck,
  Hotel, Utensils, Award, PartyPopper, Video, Film, Eye, Download,
  Activity, Stethoscope, Gift, ClipboardCheck
} from 'lucide-react';
import { LiderGeneralExecutiveDashboard } from './LiderGeneralExecutiveDashboard';
import { BienestarExecutiveDashboard } from './BienestarExecutiveDashboard';
import { RedesExecutiveDashboard } from './RedesExecutiveDashboard';

// --- 1. LÍDER GENERAL VIEW (Juanse) ---
export const LiderGeneralView = () => {
  const [prospects, setProspects] = useState([
    { id: 1, name: 'Carlos Mendoza', bike: 'Yamaha FZ25', plate: 'XYZ-789', date: 'Hace 2 horas', status: 'pending' },
    { id: 2, name: 'Mariana Ríos', bike: 'KTM Duke 390', plate: 'ABC-123', date: 'Ayer', status: 'pending' },
    { id: 3, name: 'Andrés Gómez', bike: 'Royal Enfield 650', plate: 'PQR-456', date: 'Hace 3 días', status: 'approved' },
  ]);

  const [leaders] = useState([
    { name: 'Juanse', role: 'Líder General', rank: 'Presidente / Mando Supremo', bike: 'Yamaha MT-03', status: 'Activo' },
    { name: 'Jhoana', role: 'Líder de Bienestar', rank: 'Gestión y Bienestar', bike: 'CFMOTO 250nk', status: 'Activa' },
    { name: 'Edward', role: 'Líder de Redes', rank: 'Manager de Redes', bike: 'Pulsar 160', status: 'Activo' },
    { name: 'Laurenth Sthefanie', role: 'Coordinadora de Experiencias', rank: 'Admin de Experiencias', bike: 'Hero Hunk 125R', status: 'Activa' },
    { name: 'David Bermúdez', role: 'Director Operativo', rank: 'Comandante de Ruta', bike: 'BMW R 1250 GS', status: 'Activo' },
  ]);

  const handleApprove = (id: number) => {
    setProspects(prospects.map(p => p.id === id ? { ...p, status: 'approved' } : p));
  };

  const handleReject = (id: number) => {
    setProspects(prospects.map(p => p.id === id ? { ...p, status: 'rejected' } : p));
  };

  return (
    <div className="space-y-10">
      {/* Dashboard Ejecutivo Financiero y de Miembros 2026 */}
      <LiderGeneralExecutiveDashboard />

      {/* Main Action Modules: Solicitudes y Consejo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-white/10">
        {/* Module 1: Aprobación de Prospectos */}
        <div className="biker-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h4 className="text-lg font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-500" /> Aprobación de Solicitudes y Prospectos
            </h4>
            <span className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
              {prospects.filter(p => p.status === 'pending').length} pendientes
            </span>
          </div>

          <div className="space-y-3">
            {prospects.map((prospect) => (
              <div key={prospect.id} className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-sm text-white">{prospect.name}</p>
                  <p className="text-xs text-gray-400">{prospect.bike} • <span className="font-mono text-amber-400">{prospect.plate}</span></p>
                  <p className="text-[10px] text-gray-500 font-mono mt-1">{prospect.date}</p>
                </div>
                {prospect.status === 'pending' ? (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleApprove(prospect.id)}
                      className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" /> Aprobar
                    </button>
                    <button 
                      onClick={() => handleReject(prospect.id)}
                      className="px-3 py-1.5 bg-biker-red/10 hover:bg-biker-red/20 text-biker-red border border-biker-red/30 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Rechazar
                    </button>
                  </div>
                ) : (
                  <span className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full border ${
                    prospect.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'
                  }`}>
                    {prospect.status === 'approved' ? 'Aprobado' : 'Rechazado'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Module 2: Consejo de Mesa y Mandos */}
        <div className="biker-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h4 className="text-lg font-bold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-500" /> Mesa de Oficiales y Directivos
            </h4>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              5 Mandos
            </span>
          </div>

          <div className="space-y-3">
            {leaders.map((leader, i) => (
              <div key={i} className="p-3.5 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm text-white">{leader.name}</p>
                  <p className="text-xs text-amber-400/90 font-mono">{leader.rank} • <span className="text-gray-400">{leader.bike}</span></p>
                </div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">
                  {leader.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 2. GESTIÓN Y BIENESTAR VIEW (Jhoana) ---
export const CoordinadoraBienestarView = () => {
  const [filterMembers, setFilterMembers] = useState([
    { id: 1, name: 'Cristian Valencia', bike: 'Pulsar NS200', plate: 'KLE-89F', rodadas: 4, attendance: true, conduct: 'Excelente', status: 'Filtro Activo' },
    { id: 2, name: 'Sebastián Caicedo', bike: 'Yamaha MT-03', plate: 'OPQ-12D', rodadas: 2, attendance: true, conduct: 'Buena', status: 'Filtro Inicial' },
    { id: 3, name: 'Felipe Henao', bike: 'Suzuki Gixxer 250', plate: 'TRX-44C', rodadas: 5, attendance: false, conduct: 'Pendiente Revisión', status: 'Última Evaluación' },
    { id: 4, name: 'Daniela Restrepo', bike: 'KTM Duke 250', plate: 'MNB-77A', rodadas: 3, attendance: true, conduct: 'Excelente', status: 'Filtro Activo' },
  ]);

  const toggleAttendance = (id: number) => {
    setFilterMembers(filterMembers.map(m => m.id === id ? { ...m, attendance: !m.attendance } : m));
  };

  return (
    <div className="space-y-10">
      {/* Dashboard Ejecutivo de Bienestar, Crecimiento y Actividades 2026 */}
      <BienestarExecutiveDashboard />

      {/* Módulo Operativo Complementario: Integrantes de Filtro y Asistencia In Situ */}
      <div className="biker-card p-6 space-y-6 border border-emerald-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <h4 className="text-lg font-bold flex items-center gap-2 text-white">
              <ClipboardCheck className="w-5 h-5 text-emerald-400" /> Evaluación de Integrantes en Filtro & Asistencia In Situ
            </h4>
            <p className="text-xs text-gray-400">Verificación de compromiso en ruta y conducta para ascenso a Miembro Oficial</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 self-start sm:self-auto">
            {filterMembers.length} en evaluación
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filterMembers.map((m) => (
            <div key={m.id} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-sm text-white">{m.name}</p>
                  <p className="text-xs text-gray-400">{m.bike} • <span className="font-mono text-emerald-400">{m.plate}</span></p>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10">
                  {m.status}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 font-mono">Rodadas: <strong className="text-white">{m.rodadas}/6</strong></span>
                  <span className="text-gray-400 font-mono">Conducta: <strong className="text-emerald-400">{m.conduct}</strong></span>
                </div>
                <button
                  onClick={() => toggleAttendance(m.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 border ${
                    m.attendance 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30' 
                      : 'bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20'
                  }`}
                >
                  {m.attendance ? <Check className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  {m.attendance ? 'Asistió' : 'Ausente'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 3. MANAGER DE REDES VIEW (Edward) ---
export const CoordinadorRedesView = () => {
  return (
    <div className="space-y-10">
      <RedesExecutiveDashboard />
    </div>
  );
};

// --- 4. COORDINADORA DE EXPERIENCIAS VIEW (Sthefanie / Laurenth) ---
export const CoordinadoraExperienciasView = () => {
  const [celebrations] = useState([
    { name: 'Carlos Mendoza', date: '14 de Noviembre', event: 'Cumpleaños Biker', gift: 'Gorra Oficial Infernal\'s', status: 'Listo' },
    { name: 'Mariana Ríos', date: '22 de Noviembre', event: 'Cumpleaños Biker', gift: 'Parche de Honor', status: 'En preparación' },
    { name: 'Aniversario de la Legión', date: 'Diciembre 2026', event: 'Gran Integración Nacional', gift: 'Placa Conmemorativa', status: 'Planeación' },
  ]);

  const [lodgings] = useState([
    { place: 'Guatapé - Antioquia', hotel: 'Hotel Campestre Piedra del Peñol', capacity: '35 Motos / 50 Personas', rate: 'Convenio $85.000 COP/noche', status: 'Confirmado' },
    { place: 'Lago Calima - Darién', hotel: 'Cabañas y Zona Náutica Calima', capacity: '25 Motos / 40 Personas', rate: 'Convenio Biker $70.000 COP', status: 'Apartado' },
    { place: 'Ginebra - Valle', hotel: 'Finca Ecoturística Los Guayacanes', capacity: '40 Motos / 60 Personas', rate: 'Convenio Pasadía $35.000 COP', status: 'Activo' },
  ]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="biker-card p-6 bg-gradient-to-r from-rose-900/20 via-biker-gray to-biker-black border border-rose-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center justify-center text-rose-400 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">PANEL DE EXPERIENCIAS E INTEGRACIÓN</h3>
              <span className="px-2 py-0.5 text-[10px] uppercase font-mono tracking-widest bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full">Sthefanie / Laurenth</span>
            </div>
            <p className="text-gray-400 text-xs mt-1">Creando momentos, liderando espacios y promoviendo experiencias memorables para la hermandad.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="text-xs bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1.5 rounded-lg font-mono">
            Experiencias: <strong className="text-white">100% Hermandad</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Module 1: Hospedajes y Convenios de Ruta */}
        <div className="biker-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h4 className="text-lg font-bold flex items-center gap-2">
                <Hotel className="w-5 h-5 text-rose-400" /> Logística de Hospedaje & Convenios
              </h4>
              <p className="text-xs text-gray-500">Reservas seguras para rodadas nacionales de largo trayecto</p>
            </div>
            <span className="text-xs font-mono text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-md border border-rose-500/20">
              3 Convenios
            </span>
          </div>

          <div className="space-y-3">
            {lodgings.map((lodging, idx) => (
              <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-sm text-white">{lodging.place}</p>
                    <p className="text-xs text-rose-300">{lodging.hotel}</p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {lodging.status}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-gray-400">
                  <span className="font-mono text-gray-400">{lodging.capacity}</span>
                  <span className="font-mono font-bold text-emerald-400">{lodging.rate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module 2: Celebraciones, Cumpleaños y Dinámicas */}
        <div className="biker-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h4 className="text-lg font-bold flex items-center gap-2">
                <PartyPopper className="w-5 h-5 text-rose-400" /> Cumpleaños & Momentos Especiales
              </h4>
              <p className="text-xs text-gray-500">Reconocimientos de la legión y entregas de parches</p>
            </div>
            <span className="text-xs font-mono text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-md border border-rose-500/20">
              Próximos
            </span>
          </div>

          <div className="space-y-3">
            {celebrations.map((c, idx) => (
              <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-sm text-white">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.event} • <span className="text-rose-300 font-mono">{c.date}</span></p>
                  <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-400" /> {c.gift}
                  </p>
                </div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 bg-white/5 text-gray-300 border border-white/10 rounded-md shrink-0">
                  {c.status}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-rose-900/10 border border-rose-500/20 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Utensils className="w-5 h-5 text-rose-400" />
              <div>
                <p className="text-xs font-bold text-rose-300">Puntos Gastronómicos Oficiales</p>
                <p className="text-[11px] text-gray-400">Selección de miradores y restaurantes para rodadas</p>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Al Día
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- 5. DIRECCIÓN OPERATIVA VIEW (David Bermúdez / Rutas) ---
export const DirectorOperativoView = () => {
  return (
    <div className="space-y-8">
      <div className="biker-card p-6 bg-gradient-to-r from-blue-900/20 via-biker-gray to-biker-black border border-blue-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-center text-blue-400 shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">PANEL DE DIRECCIÓN OPERATIVA</h3>
              <span className="px-2 py-0.5 text-[10px] uppercase font-mono tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">Rutas & Logística</span>
            </div>
            <p className="text-gray-400 text-xs mt-1">Estrategia de trayectos, vehículo de soporte en carretera y seguridad vial.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="biker-card p-6 space-y-4">
          <h4 className="text-lg font-bold flex items-center gap-2 text-white border-b border-white/10 pb-3">
            <Truck className="w-5 h-5 text-blue-400" /> Camioneta de Apoyo y Rescate
          </h4>
          <p className="text-xs text-gray-400">Estado operativo del vehículo escoba de la legión para remolque y herramientas de emergencia.</p>
          <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Unidad:</span>
              <span className="text-white font-mono font-bold">Toyota Hilux 4x4 (Soporte Biker)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Herramientas:</span>
              <span className="text-emerald-400 font-mono">Kit Mecánico Completo + Winche</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Canal de Radio:</span>
              <span className="text-blue-400 font-mono">Canal 4 (UHF 462.5625 MHz)</span>
            </div>
          </div>
        </div>

        <div className="biker-card p-6 space-y-4">
          <h4 className="text-lg font-bold flex items-center gap-2 text-white border-b border-white/10 pb-3">
            <Radio className="w-5 h-5 text-blue-400" /> Formación y Punteros de Ruta
          </h4>
          <p className="text-xs text-gray-400">Asignación de roles de seguridad para rodada grupal en doble columna y bloqueo de intersecciones.</p>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex justify-between items-center">
              <div>
                <p className="font-bold text-white">Puntero / Guía Principal</p>
                <p className="text-[11px] text-gray-400">Comandante de Ruta</p>
              </div>
              <span className="text-emerald-400 font-mono">Confirmado</span>
            </div>
            <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex justify-between items-center">
              <div>
                <p className="font-bold text-white">Tapa Intersecciones</p>
                <p className="text-[11px] text-gray-400">2 Motos de Bloqueo Ágil</p>
              </div>
              <span className="text-emerald-400 font-mono">Asignados</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
