import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, AlertCircle } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const { error: loginError } = await login(email, password);
      if (loginError) {
        setError(loginError.message || 'Credenciales incorrectas.');
        setIsLoading(false);
        return;
      }

      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Ocurrió un error inesperado al conectar.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-16 relative">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/dashboard/bikers_back.jpeg"
          alt="Biker Background"
          className="w-full h-full object-cover opacity-15 grayscale brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-biker-black via-biker-black/80 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md biker-card p-8 md:p-12 border border-white/10 shadow-2xl backdrop-blur-md bg-black/80"
      >
        <div className="text-center mb-10">
          <div className="w-full max-w-[280px] mx-auto mb-8">
            <img 
              src="/logo-main.png" 
              alt="Infernal's Logo" 
              className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(230,0,0,0.3)]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/logos/logo_full.png';
              }}
            />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-biker-red/10 border border-biker-red/30 mb-2">
            <Shield className="w-3.5 h-3.5 text-biker-red" />
            <span className="text-biker-red font-mono text-xs uppercase tracking-widest font-bold">
              Acceso Oficial de Miembros
            </span>
          </div>
          <p className="text-gray-400 text-xs mt-2 max-w-xs mx-auto">
            Ingresa tus credenciales para acceder al panel principal y desbloquear La Armería.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-gray-400">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-biker-black border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-biker-red transition-colors placeholder:text-gray-600"
                placeholder="admin@infernalbikers.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-gray-400">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-biker-black border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-biker-red transition-colors placeholder:text-gray-600"
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
                className="bg-biker-red/10 border border-biker-red/30 rounded-lg p-3.5 flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-biker-red shrink-0" />
                <p className="text-xs text-biker-red font-medium">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`biker-btn biker-btn-primary w-full py-4 mt-2 flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-sm ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
