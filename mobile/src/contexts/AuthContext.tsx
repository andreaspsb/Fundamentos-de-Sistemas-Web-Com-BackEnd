import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';
import { storage } from '../services/storage';
import { UserData, LoginRequest, Cliente } from '../types';

interface AuthContextData {
  user: UserData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (cliente: Omit<Cliente, 'id'>, username: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredData();
  }, []);

  async function loadStoredData() {
    try {
      const token = await storage.getToken();
      const userData = await storage.getUserData<UserData>();

      if (token && userData) {
        // Validar token
        const isValid = await api.validateToken();
        if (isValid) {
          setUser(userData);
        } else {
          await storage.clearAll();
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      await storage.clearAll();
    } finally {
      setIsLoading(false);
    }
  }

  async function login(credentials: LoginRequest) {
    try {
      const response = await api.login(credentials);
      
      const userData: UserData = {
        token: response.token,
        username: response.username,
        email: response.email,
        role: response.role,
        clienteId: response.clienteId,
      };

      await storage.setToken(response.token);
      await storage.setUserData(userData);
      
      setUser(userData);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao fazer login';
      throw new Error(message);
    }
  }

  async function register(cliente: Omit<Cliente, 'id'>, username: string, senha: string) {
    try {
      const response = await api.register({ cliente, username, senha });
      
      const userData: UserData = {
        token: response.token,
        username: response.username,
        email: response.email,
        role: response.role,
        clienteId: response.clienteId,
      };

      await storage.setToken(response.token);
      await storage.setUserData(userData);
      
      setUser(userData);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao fazer cadastro';
      throw new Error(message);
    }
  }

  async function logout() {
    await storage.clearAll();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
