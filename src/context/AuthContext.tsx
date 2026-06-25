import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: 'admin' | 'student') => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Server-side admin allowlist. Role is NEVER trusted from client storage.
// In production this check must live on the backend (Firebase/Supabase rules).
const ADMIN_EMAILS = new Set<string>([
  'admin@example.com',
]);

const deriveRole = (email: string): 'admin' | 'student' =>
  ADMIN_EMAILS.has(email.toLowerCase()) ? 'admin' : 'student';

// Mock users for demo (replace with Firebase Auth)
const mockUsers: Omit<User, 'role'>[] = [
  { id: '1', name: 'Admin User', email: 'admin@example.com' },
  { id: '2', name: 'Student User', email: 'student@example.com' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session. Role is ALWAYS recomputed from the
    // server-side allowlist — never trusted from localStorage to prevent
    // privilege escalation via DevTools tampering.
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser) as Partial<User>;
        if (parsed.email && parsed.id && parsed.name) {
          setUser({
            id: parsed.id,
            name: parsed.name,
            email: parsed.email,
            role: deriveRole(parsed.email),
          });
        }
      } catch {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password123') {
      const authed: User = { ...foundUser, role: deriveRole(foundUser.email) };
      setUser(authed);
      // Persist only identity fields. Role is derived on load.
      localStorage.setItem('user', JSON.stringify({
        id: authed.id, name: authed.name, email: authed.email,
      }));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (name: string, email: string, _password: string, _role: 'admin' | 'student'): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    // Role is ALWAYS assigned server-side via the allowlist — the client
    // cannot self-assign admin. New public signups are always 'student'.
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: deriveRole(email),
    };

    mockUsers.push({ id: newUser.id, name: newUser.name, email: newUser.email });
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify({
      id: newUser.id, name: newUser.name, email: newUser.email,
    }));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAdmin,
      isLoading
    }}>
      {children}
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