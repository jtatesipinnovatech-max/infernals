import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, User as UserIcon, Bike } from 'lucide-react';

export const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [bike, setBike] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isRegister) {
        const { error } = await register(email, password, {
          name,
          bike_model: bike,
          role: 'member',
          rank: 'Prospect'
        });
        if (error) {
          alert(error.message);
        } else {
          alert('¡Registro exitoso! Por favor verifica tu correo o inicia sesión.');
          setIsRegister(false);
        }
      } else {
        const { error } = await login(email, password);
        if (error) {
          alert(error.message);
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error inesperado');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=2000"
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
          <p className="text-gray-500 text-sm">{isRegister ? 'Únete a la hermandad' : 'Bienvenido de nuevo'}</p>
          <p className="text-gray-500 text-xs mt-1">Ingresa tus credenciales para acceder al círculo interno.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegister && (
            <>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-gray-500">Nombre Completo</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-biker-black border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-biker-red transition-colors"
                    placeholder="Juan Pérez"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-gray-500">Tu Máquina</label>
                <div className="relative">
                  <Bike className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <input
                    type="text"
                    value={bike}
                    onChange={(e) => setBike(e.target.value)}
                    className="w-full bg-biker-black border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-biker-red transition-colors"
                    placeholder="ej. Harley Fat Boy"
                  />
                </div>
              </div>
            </>
          )}

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
                placeholder="rider@infernalbikers.com"
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

          <button type="submit" className="biker-btn biker-btn-primary w-full py-4 mt-4">
            {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm text-gray-500 hover:text-biker-red transition-colors"
          >
            {isRegister ? '¿Ya eres miembro? Inicia sesión' : "¿No tienes cuenta? Únete a nosotros"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
