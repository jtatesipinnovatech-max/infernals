import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from './types';

interface AuthContextType {
  user: User | null;
  session: any | null;
  login: (email: string, password?: string) => Promise<{ error: any }>;
  register: (email: string, password: string, metadata: any) => Promise<{ error: any }>;
  updateUser: (partial: Partial<User>) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export const normalizeOfficerUser = (u: any): User => {
  if (!u) return u;
  const email = (u.email || '').trim().toLowerCase();
  const rawName = (u.name || '').trim();

  // 1. Juanse / Líder General
  if (
    email === 'juanse@infernals.com' || 
    email.includes('juanse') || 
    rawName.toLowerCase().includes('juanse') ||
    email === 'jtates.ipinnovatech@gmail.com' || 
    email.includes('admin@infernalbikers')
  ) {
    return {
      ...u,
      id: u.id || 'usr_juanse',
      email: email || 'juanse@infernals.com',
      name: 'Juanse',
      role: 'lider_general',
      rank: 'Líder General / Presidente',
      bike_model: 'Yamaha MT-03',
      avatar_url: '/images/admins/me.jpg'
    };
  }

  // 2. Jhoana / Gestión y Bienestar
  if (
    email === 'jhoana@infernals.com' || 
    email.includes('jhoana') || 
    rawName.toLowerCase().includes('jhoana') ||
    email.includes('bienestar')
  ) {
    return {
      ...u,
      id: u.id || 'usr_jhoana',
      email: email || 'jhoana@infernals.com',
      name: 'Jhoana',
      role: 'coordinadora_bienestar',
      rank: 'Líder - Gestión y Bienestar',
      bike_model: 'CFMOTO 250nk',
      avatar_url: '/images/admins/jhoana.jpeg'
    };
  }

  // 3. Edward / Manager de Redes
  if (
    email === 'edward@infernals.com' || 
    email.includes('edward') || 
    rawName.toLowerCase().includes('edward') ||
    email.includes('redes')
  ) {
    return {
      ...u,
      id: u.id || 'usr_edward',
      email: email || 'edward@infernals.com',
      name: 'Edward',
      role: 'coordinador_redes',
      rank: 'Líder - Manager de Redes',
      bike_model: 'Pulsar 160',
      avatar_url: '/images/admins/Edward.jpeg'
    };
  }

  // 4. Sthefanie / Coordinadora de Experiencias
  if (
    email === 'sthefanie@infernals.com' || 
    email.includes('sthefanie') || 
    email.includes('laurenth') || 
    rawName.toLowerCase().includes('sthefanie') ||
    rawName.toLowerCase().includes('laurenth')
  ) {
    return {
      ...u,
      id: u.id || 'usr_sthefanie',
      email: email || 'sthefanie@infernals.com',
      name: 'Laurenth Sthefanie',
      role: 'coordinadora_experiencias',
      rank: 'Admin - Coordinadora de Experiencias',
      bike_model: 'Hero Hunk 125R',
      avatar_url: '/images/admins/Sthefanie.jpg'
    };
  }

  return u;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('biker_session');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.user) {
          const normalized = normalizeOfficerUser(parsed.user);
          localStorage.setItem('biker_session', JSON.stringify({ ...parsed, user: normalized }));
          return normalized;
        }
      }
    } catch (e) {
      // Ignore
    }
    return null;
  });

  const [session, setSession] = useState<any | null>(() => {
    try {
      const saved = localStorage.getItem('biker_session');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed?.session || parsed?.token || parsed;
      }
    } catch (e) {
      // Ignore
    }
    return null;
  });

  const [loading, setLoading] = useState(false);

  // Sync to local storage if user changes
  const updateUser = (data: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      const savedSession = localStorage.getItem('biker_session');
      let currentSession = session;
      if (savedSession) {
        try {
          const parsed = JSON.parse(savedSession);
          currentSession = parsed.session || currentSession;
        } catch (e) {}
      }
      localStorage.setItem('biker_session', JSON.stringify({ user: updated, session: currentSession }));
      return updated;
    });
  };

  const login = async (email: string, password?: string) => {
    const trimmedEmail = email.trim();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, password: password || 'admin123' })
      });

      const data = await res.json();

      if (res.ok && data.user) {
        const loggedUser: User = normalizeOfficerUser(data.user);
        const loggedSession = data.session || { token: data.token, user_id: loggedUser.id };
        setUser(loggedUser);
        setSession(loggedSession);
        localStorage.setItem('biker_session', JSON.stringify({ user: loggedUser, session: loggedSession }));
        return { error: null };
      } else {
        return { error: new Error(data?.error || 'Correo o contraseña incorrectos.') };
      }
    } catch (e: any) {
      console.error('Server login API error:', e);
      // Fallback local login for resilience
      const normalizedEmail = trimmedEmail.toLowerCase();
      let role: UserRole = 'member';
      let rank = 'Miembro Activo';
      let name = normalizedEmail.split('@')[0];
      let bike_model = 'Harley-Davidson Fat Boy';
      let avatar_url: string | undefined = undefined;

      const rawUser: User = {
        id: 'usr_' + Date.now(),
        name,
        email: normalizedEmail,
        role,
        rank,
        bike_model,
        avatar_url,
        joined_at: new Date().toISOString()
      };

      const fallbackUser: User = normalizeOfficerUser(rawUser);
      const fallbackSession = { token: 'token_' + Date.now(), user_id: fallbackUser.id };

      setUser(fallbackUser);
      setSession(fallbackSession);
      localStorage.setItem('biker_session', JSON.stringify({ user: fallbackUser, session: fallbackSession }));
      return { error: null };
    }
  };

  const register = async (email: string, password: string, metadata: any) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: metadata?.full_name || metadata?.name || email.split('@')[0],
          email,
          password,
          bike_model: metadata?.bike_model
        })
      });

      const data = await res.json();
      if (res.ok) {
        return { error: null };
      } else {
        return { error: new Error(data?.error || 'Error al registrar usuario.') };
      }
    } catch (e: any) {
      console.error('Server register API error:', e);
      return { error: new Error('Error al conectar con el servidor para el registro.') };
    }
  };

  const logout = async () => {
    localStorage.removeItem('biker_session');
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, login, register, updateUser, logout, isAuthenticated: !!user && !!session }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
