import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Crown, Compass, HeartHandshake, Share2, Users, CheckCircle2, 
  XCircle, AlertTriangle, Search, PhoneCall, ShieldCheck, 
  Sparkles, Calendar, ExternalLink, Image as ImageIcon,
  Check, ArrowRight, DollarSign, Flag, Radio, Truck
} from 'lucide-react';

// --- LÍDER GENERAL VIEW ---
export const LiderGeneralView = () => {
  const [prospects, setProspects] = useState([
    { id: 1, name: 'Carlos Mendoza', bike: 'Yamaha FZ25', plate: 'XYZ-789', date: 'Hace 2 horas', status: 'pending' },
    { id: 2, name: 'Mariana Ríos', bike: 'KTM Duke 390', plate: 'ABC-123', date: 'Ayer', status: 'pending' },
    { id: 3, name: 'Andrés Gómez', bike: 'Royal Enfield 650', plate: 'PQR-456', date: 'Hace 3 días', status: 'approved' },
  ]);

  const [leaders, setLeaders] = useState([
    { name: 'Juan Carlos Tatés', role: 'Líder General', rank: 'Presidente' },
    { name: 'David Bermúdez', role: 'Director Operativo', rank: 'Comandante de Ruta' },
    { name: 'Ana María Torres', role: 'Coordinadora de Bienestar', rank: 'Oficial de Salud' },
    { name: 'Camilo Rojas', role: 'Coordinador de Redes Sociales', rank: 'Media Officer' },
  ]);

  const handleApprove = (id: number) => {
    setProspects(prospects.map(p => p.id === id ? { ...p, status: 'approved' } : p));
  };

  const handleReject = (id: number) => {
    setProspects(prospects.map(p => p.id === id ? { ...p, status: 'rejected' } : p));
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="biker-card p-6 bg-gradient-to-r from-amber-900/20 via-biker-gray to-biker-black border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-500 shrink-0">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">PANEL DE LÍDER GENERAL</h3>
              <span className="px-2 py-0.5 text-[10px] uppercase font-mono tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">Alto Mando</span>
            </div>
            <p className="text-gray-400 text-xs mt-1">Supervisión estratégica, dirección institucional y gestión de directivos.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg font-mono text-amber-400">
            Cierre Fiscal: <strong className="text-white">Al Día</strong>
          </span>
        </div>
      </div>

      {/* Metric Summaries */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="biker-card p-5 border border-white/5">
          <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-1">Miembros Activos</p>
          <p className="text-3xl font-bold text-white">128 <span className="text-xs font-normal text-emerald-400">+4 este mes</span></p>
        </div>
        <div className="biker-card p-5 border border-white/5">
          <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-1">Fondo General</p>
          <p className="text-3xl font-bold text-emerald-400">$12,450,000 <span className="text-[10px] text-gray-500">COP</span></p>
        </div>
        <div className="biker-card p-5 border border-white/5">
          <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-1">Eventos del Mes</p>
          <p className="text-3xl font-bold text-amber-400">9 <span className="text-xs font-normal text-gray-400">Programados</span></p>
        </div>
        <div className="biker-card p-5 border border-white/5">
          <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-1">Estado de la Mesa</p>
          <p className="text-xl font-bold text-emerald-500 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> 100% Operativa
          </p>
        </div>
      </div>

      {/* Main Action Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Module 1: Aprobación de Prospectos */}
        <div className="biker-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h4 className="text-lg font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-500" /> Aprobación de Solicitudes
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

        {/* Module 2: Equipo Directivo del Club */}
        <div className="biker-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h4 className="text-lg font-bold flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" /> Mesa Directiva del Club
            </h4>
            <span className="text-xs font-mono text-gray-400">4 Asignaciones</span>
          </div>

          <div className="space-y-3">
            {leaders.map((leader, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm text-white">{leader.name}</p>
                  <p className="text-xs text-amber-400 font-mono uppercase tracking-wider mt-0.5">{leader.role}</p>
                </div>
                <span className="text-xs text-gray-400 bg-black/40 px-3 py-1 rounded-lg border border-white/10 font-mono">
                  {leader.rank}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- DIRECTOR OPERATIVO VIEW ---
export const DirectorOperativoView = () => {
  const [checklist, setChecklist] = useState([
    { id: '1', label: 'Ruta y puntos de reabastecimiento verificados', done: true },
    { id: '2', label: 'Vehículo de apoyo (Carroescoba) asignado y equipado', done: true },
    { id: '3', label: 'Botiquín de primeros auxilios y kit de parches completo', done: false },
    { id: '4', label: 'Frecuencia de radios VHF y grupo WhatsApp de seguridad listo', done: true },
    { id: '5', label: 'Punteros y barredores de ruta confirmados', done: false },
  ]);

  const [routeRoles, setRouteRoles] = useState([
    { name: 'David Bermúdez', role: 'Puntero Principal', bike: 'KTM Super Duke 1290' },
    { name: 'Oscar Ramírez', role: 'Barredor / Cierre', bike: 'BMW R1250 GS' },
    { name: 'Héctor Fabio', role: 'Conductor Carroescoba', bike: 'Camioneta Apoyo' },
    { name: 'Johan Biker', role: 'Apoyo de Intersecciones', bike: 'Yamaha MT-09' }
  ]);

  const toggleCheck = (id: string) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="biker-card p-6 bg-gradient-to-r from-blue-900/20 via-biker-gray to-biker-black border border-blue-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-center text-blue-400 shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">PANEL DE DIRECTOR OPERATIVO</h3>
              <span className="px-2 py-0.5 text-[10px] uppercase font-mono tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">Comando de Ruta</span>
            </div>
            <p className="text-gray-400 text-xs mt-1">Logística de rodadas, seguridad vial, vehículos de apoyo y asignación de puestos.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-lg font-mono flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> Frecuencia: <strong>148.500 MHz</strong>
          </span>
        </div>
      </div>

      {/* Operational Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="biker-card p-5 border border-white/5">
          <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-1">Próxima Rodada</p>
          <p className="text-lg font-bold text-white">Rodada KM 30 - Nocturna</p>
          <p className="text-xs text-blue-400 font-mono mt-1">10 de Agosto • 20:30 PM</p>
        </div>
        <div className="biker-card p-5 border border-white/5">
          <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-1">Listos en Checklist</p>
          <p className="text-2xl font-bold text-blue-400">
            {checklist.filter(c => c.done).length} / {checklist.length} <span className="text-xs font-normal text-gray-400">Verificados</span>
          </p>
        </div>
        <div className="biker-card p-5 border border-white/5">
          <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-1">Vehículo de Apoyo</p>
          <p className="text-lg font-bold text-emerald-400 flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-400" /> Asignado (Placa HJK-908)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Module 1: Pre-Flight Checklist de Rodada */}
        <div className="biker-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h4 className="text-lg font-bold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" /> Protocolo de Seguridad en Ruta
            </h4>
            <span className="text-xs font-mono text-gray-400">Rodada del 10 Ago</span>
          </div>

          <div className="space-y-3">
            {checklist.map((item) => (
              <div 
                key={item.id} 
                onClick={() => toggleCheck(item.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  item.done 
                    ? 'bg-blue-500/10 border-blue-500/30 text-white' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                }`}
              >
                <span className="text-xs font-medium pr-4">{item.label}</span>
                <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                  item.done ? 'bg-blue-500 text-white' : 'border border-gray-600'
                }`}>
                  {item.done && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module 2: Asignación de Roles de Ruta */}
        <div className="biker-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h4 className="text-lg font-bold flex items-center gap-2">
              <Flag className="w-5 h-5 text-blue-400" /> Dispositivos y Encabezado de Ruta
            </h4>
            <span className="text-xs font-mono text-blue-400">4 Asignados</span>
          </div>

          <div className="space-y-3">
            {routeRoles.map((r, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm text-white">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.bike}</p>
                </div>
                <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20">
                  {r.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COORDINADORA DE BIENESTAR VIEW ---
export const CoordinadoraBienestarView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const membersHealth = [
    { name: 'Juan Carlos Tatés', plate: 'IC-001', blood: 'O+', eps: 'Sura', emergencyName: 'María Tatés (Esposa)', emergencyPhone: '+57 315 888 9900' },
    { name: 'David Bermúdez', plate: 'XYZ-789', blood: 'A+', eps: 'Sanitas', emergencyName: 'Carlos Bermúdez (Hermano)', emergencyPhone: '+57 300 444 2211' },
    { name: 'Ana María Torres', plate: 'ABC-123', blood: 'O-', eps: 'Sura', emergencyName: 'Felipe Torres (Padre)', emergencyPhone: '+57 312 999 3344' },
    { name: 'Camilo Rojas', plate: 'PQR-456', blood: 'B+', eps: 'Compensar', emergencyName: 'Laura Rojas (Hermana)', emergencyPhone: '+57 318 222 1100' },
  ];

  const filteredMembers = membersHealth.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.blood.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const birthdays = [
    { name: 'Carlos Mendoza', day: '14 de Agosto', age: '32 años', bike: 'Yamaha FZ25' },
    { name: 'Mariana Ríos', day: '22 de Agosto', age: '28 años', bike: 'KTM Duke 390' },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="biker-card p-6 bg-gradient-to-r from-emerald-900/20 via-biker-gray to-biker-black border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400 shrink-0">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">PANEL DE BIENESTAR SOCIAL</h3>
              <span className="px-2 py-0.5 text-[10px] uppercase font-mono tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">Atención Integral</span>
            </div>
            <p className="text-gray-400 text-xs mt-1">Fichas médicas de emergencia SOS, fechas especiales y fondo de apoyo solidario.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg font-mono">
            Fondo de Solidaridad: <strong className="text-white">$1,850,000 COP</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Module 1: Buscador de Ficha Médica SOS (2 cols) */}
        <div className="lg:col-span-2 biker-card p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h4 className="text-lg font-bold flex items-center gap-2">
                <Search className="w-5 h-5 text-emerald-400" /> Búsqueda Rápida SOS de Ruta
              </h4>
              <p className="text-xs text-gray-500">Consulta inmediata por Placa, Nombre o Tipo de Sangre</p>
            </div>
            <div className="relative">
              <input 
                type="text"
                placeholder="Buscar placa o nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-xs text-white pl-9 outline-none focus:border-emerald-500 w-full sm:w-56"
              />
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="space-y-3">
            {filteredMembers.map((m, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-white">{m.name}</span>
                    <span className="ml-2 font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{m.plate}</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-red-400 bg-red-500/10 px-3 py-1 rounded-lg border border-red-500/20">
                    RH: {m.blood}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs text-gray-400">
                  <p><span className="text-gray-500">EPS:</span> {m.eps}</p>
                  <p className="flex items-center gap-1">
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-gray-500">Contacto SOS:</span> <strong className="text-white">{m.emergencyName}</strong> ({m.emergencyPhone})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module 2: Cumpleaños del Mes & Fondo (1 col) */}
        <div className="biker-card p-6 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h4 className="text-lg font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" /> Cumpleaños de Agosto
            </h4>
            <p className="text-xs text-gray-500">Integración de la hermandad</p>
          </div>

          <div className="space-y-3">
            {birthdays.map((b, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-sm text-white">{b.name}</p>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{b.day}</span>
                </div>
                <p className="text-xs text-gray-400">{b.bike} • {b.age}</p>
                <button className="w-full mt-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 py-1.5 rounded-lg text-xs font-medium transition-colors">
                  Enviar Mensaje de Hermandad
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COORDINADOR DE REDES SOCIALES VIEW ---
export const CoordinadorRedesView = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Flyer Oficial Agosto 2026', platform: 'Instagram & Facebook', date: '01 de Agosto', status: 'published' },
    { id: 2, title: 'Reel Promocional Rodada KM 30', platform: 'TikTok & Instagram', date: '08 de Agosto', status: 'pending' },
    { id: 3, title: 'Cubrimiento en Vivo Día de Jetski', platform: 'Instagram Stories', date: '17 de Agosto', status: 'pending' },
    { id: 4, title: 'Fotografías Oficiales del Club', platform: 'Facebook Album', date: '21 de Agosto', status: 'pending' },
  ]);

  const togglePost = (id: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, status: p.status === 'published' ? 'pending' : 'published' } : p));
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="biker-card p-6 bg-gradient-to-r from-purple-900/20 via-biker-gray to-biker-black border border-purple-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/30 rounded-xl flex items-center justify-center text-purple-400 shrink-0">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">PANEL DE COMUNICACIONES Y MEDIOS</h3>
              <span className="px-2 py-0.5 text-[10px] uppercase font-mono tracking-widest bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">Social Media</span>
            </div>
            <p className="text-gray-400 text-xs mt-1">Calendario de publicaciones, distribución de flyers y métricas de redes sociales.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <a href="/images/Cronogramas/cronograma_agosto_v3.png" target="_blank" rel="noreferrer" className="biker-btn biker-btn-outline text-xs py-2 px-3 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5" /> Ver Cronograma Activo
          </a>
        </div>
      </div>

      {/* Social Impact Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="biker-card p-5 border border-white/5">
          <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-1">TikTok Followers</p>
          <p className="text-2xl font-bold text-white">18.4K <span className="text-xs font-normal text-emerald-400">+1.2K este mes</span></p>
        </div>
        <div className="biker-card p-5 border border-white/5">
          <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-1">Instagram Reach</p>
          <p className="text-2xl font-bold text-purple-400">42.5K <span className="text-xs font-normal text-gray-400">Impresiones</span></p>
        </div>
        <div className="biker-card p-5 border border-white/5">
          <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-1">Facebook Community</p>
          <p className="text-2xl font-bold text-blue-400">8.9K <span className="text-xs font-normal text-gray-400">Miembros en grupo</span></p>
        </div>
      </div>

      {/* Module 1: Calendario Editorial y Publicaciones */}
      <div className="biker-card p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h4 className="text-lg font-bold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-400" /> Cronograma de Contenido y Flyers
          </h4>
          <span className="text-xs font-mono text-purple-400">
            {posts.filter(p => p.status === 'published').length} de {posts.length} publicados
          </span>
        </div>

        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-sm text-white">{post.title}</p>
                <p className="text-xs text-gray-400">{post.platform} • <span className="font-mono text-purple-300">{post.date}</span></p>
              </div>
              <button 
                onClick={() => togglePost(post.id)}
                className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-all border flex items-center justify-center gap-1.5 shrink-0 ${
                  post.status === 'published' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20' 
                    : 'bg-purple-500/10 text-purple-300 border-purple-500/30 hover:bg-purple-500/20'
                }`}
              >
                {post.status === 'published' ? <Check className="w-3.5 h-3.5" /> : null}
                {post.status === 'published' ? 'Publicado' : 'Marcar Publicado'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
