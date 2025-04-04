
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface UserWithRole extends User {
  role?: string;
}

interface AuthContextType {
  user: UserWithRole | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for existing session
    const initAuth = async () => {
      setIsLoading(true);
      
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (session?.user) {
        // Fetch the user's profile to get the role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        const userWithRole = { 
          ...session.user,
          role: profile?.role || 'user'
        };
        
        setUser(userWithRole);
        setIsAdmin(profile?.role === 'admin');
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      
      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setSession(session);
          
          if (session?.user) {
            // Fetch the user's profile to get the role
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single();
            
            const userWithRole = { 
              ...session.user,
              role: profile?.role || 'user'
            };
            
            setUser(userWithRole);
            setIsAdmin(profile?.role === 'admin');
          } else {
            setUser(null);
            setIsAdmin(false);
          }
        }
      );
      
      setIsLoading(false);
      
      // Cleanup subscription on unmount
      return () => subscription.unsubscribe();
    };
    
    initAuth();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    isLoading,
    signOut,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
