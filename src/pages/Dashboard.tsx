import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../AuthContext';
import { Shield, CreditCard, Settings, History, Wallet, Camera, Loader2, Crown, Compass, HeartHandshake, Share2, UserCheck } from 'lucide-react';
import { MemberCard } from '../components/MemberCard';
import { supabase } from '../lib/supabase';
import { 
  LiderGeneralView, 
  DirectorOperativoView, 
  CoordinadoraBienestarView, 
  CoordinadorRedesView 
} from '../components/RoleDashboards';
import { UserRole } from '../types';

export const Dashboard = () => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    bike_model: user?.bike_model || ''
  });
  const [updating, setUpdating] = useState(false);

  // Active role view state for leaders/admins
  const initialRoleView: string = user?.role === 'member' ? 'member' : (user?.role || 'lider_general');
  const [activeRoleView, setActiveRoleView] = useState<string>(initialRoleView);

  if (!user) return null;

  const isLeadershipUser = user.role === 'admin' || user.role === 'officer' || user.role === 'lider_general' || user.role === 'director_operativo' || user.role === 'coordinadora_bienestar' || user.role === 'coordinador_redes';

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUpdating(true);
      
      // Actualizar tabla de perfiles
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          full_name: editForm.name,
          bike_model: editForm.bike_model
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // También actualizar metadata de auth para consistencia
      await supabase.auth.updateUser({
        data: { 
          full_name: editForm.name,
          bike_model: editForm.bike_model
        }
      });
      
      setIsEditing(false);
      alert('¡Perfil actualizado con éxito!');
      window.location.reload(); // Recargar para ver cambios
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
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('club-assets')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('club-assets')
        .getPublicUrl(filePath);

      // Actualizar tabla de perfiles
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Actualizar metadata de auth
      await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });

      setAvatarUrl(publicUrl);
      alert('¡Foto de perfil actualizada con éxito!');
      window.location.reload();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Role View Selector for Administrators and Club Leaders */}
      {isLeadershipUser && (
        <div className="biker-card p-4 border border-biker-red/20 bg-black/60 backdrop-blur">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-biker-red" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                Mando de Líderes y Directivos
              </h2>
              <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                Acreditado
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Selecciona el panel directivo para visualizar las herramientas específicas de cada cargo:
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'lider_general', name: 'Líder General', icon: Crown, color: 'hover:border-amber-500/50 text-amber-400' },
              { id: 'director_operativo', name: 'Director Operativo', icon: Compass, color: 'hover:border-blue-500/50 text-blue-400' },
              { id: 'coordinadora_bienestar', name: 'Coordinadora de Bienestar', icon: HeartHandshake, color: 'hover:border-emerald-500/50 text-emerald-400' },
              { id: 'coordinador_redes', name: 'Coordinador de Redes', icon: Share2, color: 'hover:border-purple-500/50 text-purple-400' },
              { id: 'member', name: 'Vista de Miembro', icon: UserCheck, color: 'hover:border-gray-500/50 text-gray-300' }
            ].map((role) => {
              const Icon = role.icon;
              const isActive = activeRoleView === role.id || (activeRoleView === 'admin' && role.id === 'lider_general') || (activeRoleView === 'officer' && role.id === 'lider_general');
              return (
                <button
                  key={role.id}
                  onClick={() => setActiveRoleView(role.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all border ${role.color} ${
                    isActive
                      ? 'bg-biker-red text-white border-biker-red font-bold shadow-lg shadow-biker-red/20'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {role.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Profile Sidebar + Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <div className="biker-card p-8 text-center relative group">
            <div className="w-32 h-32 bg-biker-gray border-2 border-biker-red rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden relative">
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
                  <label className="text-[10px] text-gray-500 uppercase font-mono tracking-widest mb-1 block">Nombre Real</label>
                  <input 
                    type="text" 
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-biker-red outline-none"
                    placeholder="Tu nombre real"
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
                    placeholder="Ej: Custom Bobber"
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
                <h2 className="text-2xl mb-1">{user.name}</h2>
                <span className="text-biker-red font-mono text-sm uppercase tracking-widest block mb-4">{user.rank}</span>
                <div className="flex justify-center gap-2 mb-4">
                  <span className="bg-white/5 px-3 py-1 rounded-full text-xs text-gray-400 border border-white/10">
                    {user.bike_model || "Custom Bobber"}
                  </span>
                </div>
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
            <h3 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-6">Membresía Digital</h3>
            <MemberCard 
              name={user.name}
              rank={user.rank}
              memberId="IC-2026-0482"
              expiry="12/26"
            />
          </div>
        </div>

        {/* Dynamic Main Content based on Selected Active Role View */}
        <div className="lg:col-span-2 space-y-8">
          {activeRoleView === 'director_operativo' ? (
            <DirectorOperativoView />
          ) : activeRoleView === 'coordinadora_bienestar' ? (
            <CoordinadoraBienestarView />
          ) : activeRoleView === 'coordinador_redes' ? (
            <CoordinadorRedesView />
          ) : activeRoleView === 'lider_general' || activeRoleView === 'admin' || activeRoleView === 'officer' ? (
            <LiderGeneralView />
          ) : (
            <>
              {/* Stats Grid */}
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

              {/* Financial Section */}
              <div className="biker-card p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl">Centro Financiero</h3>
                  <button className="text-sm text-biker-red hover:underline">Ver Historial Completo</button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-biker-black rounded-lg flex items-center justify-center">
                        <Settings className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium">Cuota Mensual - Marzo</p>
                        <p className="text-xs text-gray-500">Pagado automáticamente el 1 de mar, 2026</p>
                      </div>
                    </div>
                    <span className="font-mono text-emerald-500">-$45.00</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-biker-black rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium">Tienda del Club: Chaleco de Cuero</p>
                        <p className="text-xs text-gray-500">24 de feb, 2026</p>
                      </div>
                    </div>
                    <span className="font-mono text-emerald-500">-$189.99</span>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-white/5 flex gap-4">
                  <button className="biker-btn biker-btn-primary flex-1">Contribuir al Fondo</button>
                  <button className="biker-btn biker-btn-outline flex-1">Descargar Reporte</button>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

const ShoppingBag = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);
