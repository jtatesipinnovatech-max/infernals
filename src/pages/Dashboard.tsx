import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../AuthContext';
import { 
  Shield, CreditCard, Settings, History, Camera, Loader2, 
  Crown, Compass, HeartHandshake, Share2, Sparkles, UserCheck 
} from 'lucide-react';
import { MemberCard } from '../components/MemberCard';
import { 
  LiderGeneralView, 
  DirectorOperativoView, 
  CoordinadoraBienestarView, 
  CoordinadorRedesView,
  CoordinadoraExperienciasView
} from '../components/RoleDashboards';

export const Dashboard = () => {
  const { user, updateUser } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user?.avatar_url || null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    bike_model: user?.bike_model || ''
  });
  const [updating, setUpdating] = useState(false);

  // Determine user role and permissions
  const userEmail = (user?.email || '').trim().toLowerCase();
  const userRole = user?.role || 'member';

  const isLiderGeneral = userRole === 'lider_general' || 
    userEmail === 'juanse@infernals.com' || 
    userEmail.includes('juanse') || 
    userEmail === 'jtates.ipinnovatech@gmail.com';

  const isJhoana = userRole === 'coordinadora_bienestar' || 
    userEmail === 'jhoana@infernals.com' || 
    userEmail.includes('jhoana');

  const isEdward = userRole === 'coordinador_redes' || 
    userEmail === 'edward@infernals.com' || 
    userEmail.includes('edward');

  const isSthefanie = userRole === 'coordinadora_experiencias' || 
    userEmail === 'sthefanie@infernals.com' || 
    userEmail.includes('sthefanie') || 
    userEmail.includes('laurenth');

  // Active view for Juanse (default is lider_general)
  const [activeRoleView, setActiveRoleView] = useState<string>('lider_general');

  if (!user) return null;

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUpdating(true);
      
      updateUser({
        name: editForm.name,
        bike_model: editForm.bike_model
      });

      try {
        await fetch('/api/user/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: user.id, email: user.email, name: editForm.name, bike_model: editForm.bike_model })
        });
      } catch (err) {
        // Local state already updated
      }

      setIsEditing(false);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Debes seleccionar una imagen para subir.');
      }

      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result as string;
        setAvatarUrl(base64Url);
        updateUser({ avatar_url: base64Url });
        
        fetch('/api/user/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: user.id, email: user.email, avatar_url: base64Url })
        }).catch(() => {});
        
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error: any) {
      alert(error.message);
      setUploading(false);
    }
  };

  // Determine member ID code for digital card
  const memberId = isLiderGeneral 
    ? 'IC-2026-0001' 
    : isJhoana 
    ? 'IC-2026-0002' 
    : isEdward 
    ? 'IC-2026-0003' 
    : isSthefanie 
    ? 'IC-2026-0004' 
    : 'IC-2026-0482';

  const isLeader = isLiderGeneral || isJhoana || isEdward || isSthefanie || userRole === 'director_operativo';

  // --- 1. LEADER VIEW: FULL WIDTH DYNAMIC WORKSTATION (Sin tarjeta de membresía lateral) ---
  if (isLeader) {
    return (
      <div className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1750px] w-full mx-auto space-y-6">
        
        {/* Header Ejecutivo Horizontal del Líder */}
        <div className="biker-card p-5 bg-gradient-to-r from-biker-gray via-black to-black border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="relative group shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-biker-gray border-2 border-biker-red rounded-full overflow-hidden relative shadow-lg shadow-biker-red/20">
                <img 
                  src={avatarUrl || user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
                <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  {uploading ? <Loader2 className="w-6 h-6 text-white animate-spin" /> : <Camera className="w-6 h-6 text-white" />}
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleUpload} 
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">{user.name}</h1>
                <span className="px-2.5 py-0.5 text-[10px] uppercase font-mono tracking-widest bg-biker-red/20 text-biker-red border border-biker-red/30 rounded-full font-bold">
                  {user.rank}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 font-mono">
                <span className="bg-white/5 px-2.5 py-0.5 rounded text-gray-300 border border-white/10">
                  🏍️ {user.bike_model || "Yamaha MT-03"}
                </span>
                <span>{user.email}</span>
              </div>
            </div>
          </div>

          {/* Acciones de Perfil y Badges */}
          <div className="flex items-center gap-3 self-end md:self-center">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 flex items-center gap-1.5 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" /> {isEditing ? 'Cerrar Edición' : 'Editar Perfil'}
            </button>
            <div className="hidden sm:flex flex-col text-right font-mono text-[10px] text-gray-500 border-l border-white/10 pl-3">
              <span className="text-emerald-400 font-bold">● MESA DIRECTIVA OFICIAL</span>
              <span>Periodo 2026 Activo</span>
            </div>
          </div>
        </div>

        {/* Formulario desplegable si da click en Editar */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="biker-card p-6 border border-biker-red/30 bg-[#0e0e0e]"
          >
            <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end text-xs font-mono">
              <div>
                <label className="text-gray-400 block mb-1">Nombre Oficial</label>
                <input 
                  type="text" 
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-biker-red"
                  required
                />
              </div>
              <div>
                <label className="text-gray-400 block mb-1">Modelo de Moto</label>
                <input 
                  type="text" 
                  value={editForm.bike_model}
                  onChange={(e) => setEditForm({ ...editForm, bike_model: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-biker-red"
                  placeholder="Ej: Yamaha MT-03"
                />
              </div>
              <div className="flex gap-2">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-gray-400 py-2 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={updating}
                  className="flex-1 bg-biker-red hover:bg-red-700 text-white font-bold py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {updating ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Barra de Mando Directivo (Exclusiva para Juanse) */}
        {isLiderGeneral && (
          <div className="biker-card p-4 border border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-black to-black shadow-xl space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <Crown className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-white font-bold">
                  Barra de Mando Directivo • Mando Supremo
                </h3>
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                Acceso Total de Mando e Inspección
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'lider_general', name: 'Líder General', sub: 'Mando Supremo', icon: Crown, color: 'text-amber-400' },
                { id: 'coordinadora_bienestar', name: 'Bienestar', sub: 'Jhoana', icon: HeartHandshake, color: 'text-emerald-400' },
                { id: 'coordinador_redes', name: 'Redes', sub: 'Edward', icon: Share2, color: 'text-purple-400' },
                { id: 'coordinadora_experiencias', name: 'Experiencias', sub: 'Sthefanie', icon: Sparkles, color: 'text-rose-400' },
                { id: 'director_operativo', name: 'Operativo', sub: 'Rutas', icon: Compass, color: 'text-blue-400' },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeRoleView === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveRoleView(tab.id)}
                    className={`p-3 rounded-xl text-left transition-all border flex items-center gap-2.5 ${
                      isActive
                        ? 'bg-biker-red text-white border-biker-red font-bold shadow-lg shadow-biker-red/25'
                        : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-black/30 text-white' : 'bg-black/40 ' + tab.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-mono uppercase tracking-wider truncate font-bold">{tab.name}</p>
                      <p className="text-[10px] text-gray-400 font-mono truncate">{tab.sub}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* WORKSTATION A PANTALLA COMPLETA */}
        <div className="w-full">
          {isLiderGeneral ? (
            activeRoleView === 'coordinadora_bienestar' ? (
              <CoordinadoraBienestarView />
            ) : activeRoleView === 'coordinador_redes' ? (
              <CoordinadorRedesView />
            ) : activeRoleView === 'coordinadora_experiencias' ? (
              <CoordinadoraExperienciasView />
            ) : activeRoleView === 'director_operativo' ? (
              <DirectorOperativoView />
            ) : (
              <LiderGeneralView />
            )
          ) : isJhoana ? (
            <CoordinadoraBienestarView />
          ) : isEdward ? (
            <CoordinadorRedesView />
          ) : isSthefanie ? (
            <CoordinadoraExperienciasView />
          ) : (
            <DirectorOperativoView />
          )}
        </div>
      </div>
    );
  }

  // --- 2. STANDARD MEMBER VIEW (Mantiene la tarjeta digital lateral y resumen personal) ---
  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Profile Sidebar + Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Profile Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <div className="biker-card p-8 text-center relative group">
            <div className="w-32 h-32 bg-biker-gray border-2 border-biker-red rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden relative shadow-lg shadow-biker-red/10">
              <img 
                src={avatarUrl || user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                alt="Avatar"
                className="w-full h-full object-cover"
              />
              <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                {uploading ? <Loader2 className="w-8 h-8 text-white animate-spin" /> : <Camera className="w-8 h-8 text-white" />}
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleUpload} 
                  disabled={uploading}
                />
              </label>
            </div>

            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="space-y-4 text-left">
                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-mono tracking-widest mb-1 block">Nombre Oficial</label>
                  <input 
                    type="text" 
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-biker-red outline-none"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-mono tracking-widest mb-1 block">Modelo de Moto</label>
                  <input 
                    type="text" 
                    value={editForm.bike_model}
                    onChange={(e) => setEditForm({ ...editForm, bike_model: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-biker-red outline-none"
                    placeholder="Ej: Yamaha MT-03"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-xs py-2 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    disabled={updating}
                    className="flex-1 bg-biker-red hover:bg-red-700 text-white text-xs py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {updating ? 'Guardando...' : 'Guardar'}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="text-2xl font-black uppercase tracking-tight mb-1 text-white">{user.name}</h2>
                <span className="text-biker-red font-mono text-xs uppercase tracking-widest block font-bold mb-4">{user.rank}</span>
                <div className="flex justify-center gap-2 mb-4">
                  <span className="bg-white/5 px-3 py-1 rounded-full text-xs text-gray-300 font-mono border border-white/10">
                    {user.bike_model || "Yamaha MT-03"}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-gray-500 mb-4">{user.email}</p>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-xs text-gray-500 hover:text-white flex items-center gap-1 mx-auto transition-colors"
                >
                  <Settings className="w-3 h-3" /> Editar Perfil
                </button>
              </>
            )}
          </div>

          <div className="biker-card p-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6">Membresía Oficial Digital</h3>
            <MemberCard 
              name={user.name}
              rank={user.rank}
              memberId={memberId}
              expiry="12/26"
            />
          </div>
        </div>

        {/* Right Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="biker-card p-6 flex items-center gap-6">
              <div className="w-12 h-12 bg-biker-red/10 rounded-xl flex items-center justify-center">
                <CreditCard className="text-biker-red w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">Estado de Cuotas</p>
                <p className="text-xl font-bold text-emerald-500">Al Día</p>
              </div>
            </div>
            <div className="biker-card p-6 flex items-center gap-6">
              <div className="w-12 h-12 bg-biker-red/10 rounded-xl flex items-center justify-center">
                <History className="text-biker-red w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">Kilómetros Registrados</p>
                <p className="text-xl font-bold">12,482 km</p>
              </div>
            </div>
          </div>

          <div className="biker-card p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold">Centro Financiero</h3>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded">Activo</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-biker-black rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-white">Cuota Mensual Oficial</p>
                    <p className="text-xs text-gray-500">Registrado al día en el sistema</p>
                  </div>
                </div>
                <span className="font-mono text-emerald-500 font-bold">-$45.000 COP</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
