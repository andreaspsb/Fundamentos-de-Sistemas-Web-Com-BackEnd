import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { theme } from '../../theme';
import { Categoria } from '../../types';

interface CategoryCardProps {
  categoria: Categoria;
  onPress: () => void;
  icon?: string;
}

const categoryIcons: Record<string, string> = {
  'Rações e Alimentação': '🍖',
  'Acessórios e Brinquedos': '🎾',
  'Higiene e Cuidados': '🛁',
  'Medicamentos': '💊',
  'Camas e Casinhas': '🏠',
};

export function CategoryCard({ categoria, onPress }: CategoryCardProps) {
  const icon = categoryIcons[categoria.nome] || '🐾';

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.name} numberOfLines={2}>
            {categoria.nome}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 100,
    marginRight: 12,
    backgroundColor: theme.colors.surface,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  name: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.custom.colors.text,
    textAlign: 'center',
  },
});
