import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'admin' | 'driver' | 'customer';

interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signOut: () => void; // Added signOut as an alias for logout
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // This is a mock login function - replace with Supabase auth when integrated
  const login = async (email: string, password: string) => {
    // Mock authentication - replace with actual auth logic
    if (email && password) {
      // Simulate role assignment based on email
      let role: UserRole = 'customer';
      if (email.includes('admin')) {
        role = 'admin';
      } else if (email.includes('driver')) {
        role = 'driver';
      }

      setUser({
        id: '1',
        email,
        role,
        name: email.split('@')[0],
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  // Add signOut as an alias for logout
  const signOut = logout;

  return (
    <AuthContext.Provider value={{ user, login, logout, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}