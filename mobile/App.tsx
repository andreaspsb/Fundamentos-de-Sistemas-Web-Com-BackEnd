import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/contexts/AuthContext';
import { CartProvider } from './src/contexts/CartContext';
import { BackendProvider, useBackend } from './src/contexts/BackendContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { api } from './src/services/api';
import { theme } from './src/theme';

// Componente interno que sincroniza o BackendContext com a API
function AppContent() {
  const { currentBackend } = useBackend();

  // Sincronizar mudanças do contexto com o serviço de API
  useEffect(() => {
    api.setBaseUrl(currentBackend.baseUrl);
  }, [currentBackend]);

  return (
    <AuthProvider>
      <CartProvider>
        <StatusBar style="light" />
        <AppNavigator />
      </CartProvider>
    </AuthProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <BackendProvider>
          <AppContent />
        </BackendProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
