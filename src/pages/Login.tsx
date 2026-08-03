import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Shield, Lock, Mail, User as UserIcon, Bike, AlertCircle } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, logout, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated && (user?.role === 'admin' || user?.role === 'officer')) {
      navigate('/admin/eventos');
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const { error: loginError } = await login(email, password);
      if (loginError) {
        setError('Credenciales incorrectas. Acceso denegado.');
        setIsLoading(false);
        return;
      }

      // The useEffect will handle redirection, but we should check here too
      // to show an error if they are NOT an admin/officer
      const { data: { user: authUser } } = await supabase.auth.getUser();
      const isAdminEmail = authUser?.email === 'jtates.ipinnovatech@gmail.com';
      const role = isAdminEmail ? 'admin' : (authUser?.user_metadata?.role || 'member');

      if (role !== 'admin' && role !== 'officer') {
        setError('No tienes permisos de administrador para acceder a este panel.');
        await logout(); // Log them out if they aren't authorized for admin
      } else {
        navigate('/admin/eventos');
      }
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error inesperado. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="absolute inset-0 z-0">
        <img
          src="https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/admins/admins.png"
          alt="Biker Background"
          className="w-full h-full object-cover opacity-10 grayscale"
          referrerPolicy="no-referrer"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md biker-card p-8 md:p-12"
      >
        <div className="text-center mb-10">
          <div className="w-full max-w-[280px] mx-auto mb-8">
            <img 
              src="/logo-main.png" 
              alt="Infernal's Logo" 
              className="w-full h-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://www.svgrepo.com/show/415020/skull.svg';
              }}
            />
          </div>
          <p className="text-gray-500 text-sm">Acceso Administrativo</p>
          <p className="text-gray-500 text-xs mt-1">Ingresa tus credenciales para gestionar los eventos del club.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-gray-500">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-biker-black border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-biker-red transition-colors"
                placeholder="admin@infernalbikers.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-gray-500">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-biker-black border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-biker-red transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-biker-red/10 border border-biker-red/20 rounded-lg p-4 flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-biker-red shrink-0" />
                <p className="text-sm text-biker-red font-medium">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`biker-btn biker-btn-primary w-full py-4 mt-4 flex items-center justify-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Iniciando...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
