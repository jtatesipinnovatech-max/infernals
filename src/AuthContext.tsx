import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from './types';
import { supabase } from './lib/supabase';

interface AuthContextType {
  user: User | null;
  session: any | null;
  login: (email: string, password: string) => Promise<{ error: any }>;
  register: (email: string, password: string, metadata: any) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const buildUserFromSupabase = (sUser: any, profile?: any): User => {
  const metadata = sUser?.user_metadata || {};
  const email = sUser?.email || '';
  
  let role = profile?.role || metadata.role;
  if (!role) {
    if (email === 'jtates.ipinnovatech@gmail.com' || email.includes('admin')) {
      role = 'lider_general';
    } else {
      role = 'member';
    }
  }

  return {
    id: sUser.id,
    name: profile?.full_name || metadata.full_name || metadata.name || email.split('@')[0] || 'Oficial Biker',
    email: profile?.email || email,
    role: role as any,
    rank: profile?.rank || metadata.rank || (role === 'lider_general' ? 'Líder General' : 'Oficial Biker'),
    bike_model: profile?.bike_model || metadata.bike_model || 'Motocicleta Oficial',
    avatar_url: profile?.avatar_url || metadata.avatar_url,
    joined_at: sUser.created_at || new Date().toISOString()
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session from Supabase
    const getInitialSession = async () => {
      try {
        const { data: { session: supaSession } } = await supabase.auth.getSession();
        if (supaSession?.user) {
          setSession(supaSession);
          let profile = null;
          try {
            const { data: prof } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', supaSession.user.id)
              .single();
            profile = prof;
          } catch (e) {
            // Profile table query optional
          }

          const builtUser = buildUserFromSupabase(supaSession.user, profile);
          setUser(builtUser);
        } else {
          // Check saved local session fallback if present
          const savedSession = localStorage.getItem('biker_session');
          if (savedSession) {
            try {
              const parsed = JSON.parse(savedSession);
              if (parsed?.user) {
                setUser(parsed.user);
                setSession(parsed.session || parsed);
              }
            } catch (e) {
              localStorage.removeItem('biker_session');
            }
          }
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for Supabase auth state changes
    let subscription: any = null;
    try {
      const res = supabase.auth.onAuthStateChange(async (_event, supaSession) => {
        if (supaSession?.user) {
          setSession(supaSession);
          let profile = null;
          try {
            const { data: prof } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', supaSession.user.id)
              .single();
            profile = prof;
          } catch (e) {
            // Profile table query optional
          }

          const builtUser = buildUserFromSupabase(supaSession.user, profile);
          setUser(builtUser);
        } else if (_event === 'SIGNED_OUT') {
          setUser(null);
          setSession(null);
          localStorage.removeItem('biker_session');
        }
      });
      subscription = res.data?.subscription;
    } catch (err) {
      console.warn('Supabase auth listener disabled:', err);
    }

    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      }
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.user) {
        setUser(data.user);
        setSession(data.session || { user: data.user, token: data.token });
        localStorage.setItem('biker_session', JSON.stringify({ user: data.user, session: data.session || data.token }));
        return { error: null };
      } else {
        return { error: new Error(data?.error || 'Correo o contraseña incorrectos. Verifica tus datos en Supabase.') };
      }
    } catch (e: any) {
      console.error('Server login API error:', e);
      return { error: new Error('Error al conectar con el servidor de autenticación.') };
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
        return { error: new Error(data?.error || 'Error al registrar usuario en Supabase.') };
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
    try {
      await supabase.auth.signOut();
    } catch (e) {
      // Ignore
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, login, register, logout, isAuthenticated: !!session }}>
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

