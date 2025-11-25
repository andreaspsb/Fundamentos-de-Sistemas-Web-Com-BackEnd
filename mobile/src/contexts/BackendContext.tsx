import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Backends disponíveis
export const BACKENDS = {
  SPRINGBOOT: {
    key: 'SPRINGBOOT',
    name: 'Spring Boot',
    icon: '☕',
    color: '#6DB33F',
    ports: {
      local: 8080,
      docker: 8080,
    },
  },
  ASPNET: {
    key: 'ASPNET',
    name: 'ASP.NET Core',
    icon: '🟣',
    color: '#512BD4',
    ports: {
      local: 5000,
      docker: 5000,
    },
  },
} as const;

export type BackendKey = keyof typeof BACKENDS;

interface BackendConfig {
  key: BackendKey;
  name: string;
  icon: string;
  color: string;
  baseUrl: string;
}

interface BackendContextData {
  currentBackend: BackendConfig;
  backends: typeof BACKENDS;
  switchBackend: (key: BackendKey) => Promise<void>;
  isLoading: boolean;
}

const STORAGE_KEY = 'petshop_backend_selected';

const BackendContext = createContext<BackendContextData>({} as BackendContextData);

interface BackendProviderProps {
  children: ReactNode;
}

// Função para determinar a URL base da API
function getApiBaseUrl(backendKey: BackendKey): string {
  const backend = BACKENDS[backendKey];
  
  // Em ambiente web (Expo Web / Docker)
  if (typeof window !== 'undefined' && window.location) {
    const host = window.location.hostname;
    const port = backend.ports.docker;
    return `http://${host}:${port}/api`;
  }
  
  // Em desenvolvimento mobile (Expo Go no emulador Android)
  if (__DEV__) {
    const port = backend.ports.local;
    // Emulador Android usa 10.0.2.2 para localhost
    return `http://10.0.2.2:${port}/api`;
  }
  
  // Produção - Azure App Services
  if (backendKey === 'SPRINGBOOT') {
    return 'https://petshop-backend-spring.azurewebsites.net/api';
  }
  return 'https://petshop-backend-aspnet.azurewebsites.net/api';
}

export function BackendProvider({ children }: BackendProviderProps) {
  const [currentBackendKey, setCurrentBackendKey] = useState<BackendKey>('SPRINGBOOT');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSavedBackend();
  }, []);

  async function loadSavedBackend() {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved && (saved === 'SPRINGBOOT' || saved === 'ASPNET')) {
        setCurrentBackendKey(saved as BackendKey);
      }
    } catch (error) {
      console.error('Erro ao carregar backend salvo:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function switchBackend(key: BackendKey) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, key);
      setCurrentBackendKey(key);
      console.log(`🔄 Backend alterado para: ${BACKENDS[key].name}`);
    } catch (error) {
      console.error('Erro ao salvar backend:', error);
    }
  }

  const currentBackend: BackendConfig = {
    ...BACKENDS[currentBackendKey],
    key: currentBackendKey,
    baseUrl: getApiBaseUrl(currentBackendKey),
  };

  return (
    <BackendContext.Provider
      value={{
        currentBackend,
        backends: BACKENDS,
        switchBackend,
        isLoading,
      }}
    >
      {children}
    </BackendContext.Provider>
  );
}

export function useBackend() {
  const context = useContext(BackendContext);
  if (!context) {
    throw new Error('useBackend deve ser usado dentro de um BackendProvider');
  }
  return context;
}
