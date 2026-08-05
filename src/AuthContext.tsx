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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            setUser({
              id: profile.id,
              name: profile.full_name || session.user.email?.split('@')[0] || 'Biker',
              email: profile.email || session.user.email!,
              role: profile.role as any,
              rank: profile.rank,
              bike_model: profile.bike_model,
              avatar_url: profile.avatar_url,
              joined_at: session.user.created_at
            });
          }
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Check saved local session if present
    const savedSession = localStorage.getItem('biker_session');
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        setUser(parsed.user);
        setSession(parsed);
      } catch (e) {
        localStorage.removeItem('biker_session');
      }
    }

    // Listen for auth changes
    let subscription: any = null;
    try {
      const res = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session) {
          setSession(session);
          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile) {
              const u: User = {
                id: profile.id,
                name: profile.full_name || session.user.email?.split('@')[0] || 'Biker',
                email: profile.email || session.user.email!,
                role: profile.role as any,
                rank: profile.rank,
                bike_model: profile.bike_model,
                avatar_url: profile.avatar_url,
                joined_at: session.user.created_at
              };
              setUser(u);
            }
          }
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
    // 1. Try server API authentication
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        const loggedUser: User = {
          id: String(data.user.id),
          name: data.user.name,
          email,
          role: data.user.role || (email.includes('admin') || email === 'jtates.ipinnovatech@gmail.com' ? 'admin' : 'member'),
          rank: data.user.rank || 'Oficial',
          joined_at: data.user.joined_at || new Date().toISOString(),
        };
        const localSess = { user: loggedUser, token: data.token };
        setUser(loggedUser);
        setSession(localSess);
        localStorage.setItem('biker_session', JSON.stringify(localSess));
        return { error: null };
      }
    } catch (e) {
      console.warn('API login call failed, trying Supabase or fallback');
    }

    // 2. Try Supabase login if configured
    try {
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      if (!error && data?.session) {
        return { error: null };
      }
    } catch (e) {
      console.warn('Supabase login failed');
    }

    // 3. Admin / Demo Fallback credentials for previewing Admin panel
    if (
      email === 'jtates.ipinnovatech@gmail.com' ||
      email === 'admin@infernalbikers.com' ||
      email.startsWith('admin')
    ) {
      const loggedUser: User = {
        id: '1',
        name: email === 'jtates.ipinnovatech@gmail.com' ? 'Admin Officer' : 'Club Admin',
        email,
        role: 'admin',
        rank: 'Presidente',
        joined_at: new Date().toISOString(),
      };
      const localSess = { user: loggedUser, token: 'demo_token' };
      setUser(loggedUser);
      setSession(localSess);
      localStorage.setItem('biker_session', JSON.stringify(localSess));
      return { error: null };
    }

    return { error: new Error('Credenciales incorrectas. Acceso denegado.') };
  };

  const register = async (email: string, password: string, metadata: any) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: metadata?.full_name || email.split('@')[0], email, password, bike_model: metadata?.bike_model })
      });
      if (res.ok) {
        return { error: null };
      }
    } catch (e) {
      console.warn('API register error');
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: metadata }
      });
      return { error };
    } catch (e) {
      return { error: e };
    }
  };

  const logout = async () => {
    localStorage.removeItem('biker_session');
    setUser(null);
    setSession(null);
    try {
      await supabase.auth.signOut();
    } catch (e) {
      // Ignore if supabase not connected
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
