import { MD3LightTheme, configureFonts } from 'react-native-paper';

// Cores baseadas no frontend web (frontend/css/styles.css)
const colors = {
  primary: '#2563eb',      // Azul principal
  primaryDark: '#1d4ed8',  // Azul escuro
  secondary: '#10b981',    // Verde
  accent: '#f59e0b',       // Laranja/Amarelo
  error: '#ef4444',        // Vermelho
  warning: '#f59e0b',      // Amarelo
  success: '#10b981',      // Verde
  info: '#3b82f6',         // Azul info
  background: '#f8fafc',   // Fundo claro
  surface: '#ffffff',      // Superfície branca
  text: '#1e293b',         // Texto escuro
  textSecondary: '#64748b', // Texto secundário
  border: '#e2e8f0',       // Bordas
  disabled: '#94a3b8',     // Desabilitado
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    primaryContainer: colors.primaryDark,
    secondary: colors.secondary,
    secondaryContainer: colors.secondary,
    tertiary: colors.accent,
    error: colors.error,
    background: colors.background,
    surface: colors.surface,
    onPrimary: '#ffffff',
    onSecondary: '#ffffff',
    onBackground: colors.text,
    onSurface: colors.text,
    outline: colors.border,
    surfaceVariant: '#f1f5f9',
  },
  custom: {
    colors,
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
    },
  },
};

export type AppTheme = typeof theme;
