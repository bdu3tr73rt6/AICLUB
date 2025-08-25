import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '../types';
import { supabase } from '../lib/supabase';
import { AuthError, Session, User as SupabaseUser } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signup: (userData: Partial<User> & { password: string }) => Promise<{ error: AuthError | null }>;
  logout: () => Promise<{ error: AuthError | null }>;
  loading: boolean;
  session: Session | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const formatUser = (supabaseUser: SupabaseUser): User => {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email!,
    firstName: supabaseUser.user_metadata?.firstName || '',
    lastName: supabaseUser.user_metadata?.lastName || '',
    avatar: supabaseUser.user_metadata?.avatar_url,
    accountType: supabaseUser.user_metadata?.accountType || 'student',
    createdAt: new Date(supabaseUser.created_at),
  };
};

export const useAuthProvider = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session ? formatUser(session.user) : null);
      setLoading(false);
    };

    getInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session ? formatUser(session.user) : null);
        if (loading) setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [loading]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    return { error };
  };

  const signup = async (userData: Partial<User> & { password: string }) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: userData.email!,
      password: userData.password!,
      options: {
        data: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          accountType: userData.accountType,
        },
        emailRedirectTo: `${window.location.origin}/`
      },
    });
    setLoading(false);
    return { error };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    session,
    login,
    signup,
    logout,
    loading,
  };
};

export { AuthContext };
