import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Icon } from 'react-native-paper';
import { theme } from '../../theme';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon = 'package-variant',
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Icon source={icon} size={64} color={theme.custom.colors.disabled} />
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      {actionLabel && onAction && (
        <Button mode="contained" onPress={onAction} style={styles.button}>
          {actionLabel}
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.custom.colors.text,
    marginTop: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: theme.custom.colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
  },
});
