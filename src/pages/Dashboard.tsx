import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../AuthContext';
import { Shield, CreditCard, Settings, History, Wallet, Camera, Loader2 } from 'lucide-react';
import { MemberCard } from '../components/MemberCard';
import { supabase } from '../lib/supabase';

export const Dashboard = () => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  if (!user) return null;

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

      setAvatarUrl(publicUrl);
      alert('¡Imagen subida con éxito!');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <div className="biker-card p-8 text-center relative group">
            <div className="w-32 h-32 bg-biker-gray border-2 border-biker-red rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden relative">
              <img 
                src={avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
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
            <h2 className="text-2xl mb-1">{user.name}</h2>
            <span className="text-biker-red font-mono text-sm uppercase tracking-widest block mb-4">{user.rank}</span>
            <div className="flex justify-center gap-2">
              <span className="bg-white/5 px-3 py-1 rounded-full text-xs text-gray-400 border border-white/10">
                {user.bike_model || "Custom Bobber"}
              </span>
            </div>
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

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
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
        </div>

      </div>
    </div>
  );
};

const ShoppingBag = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);
