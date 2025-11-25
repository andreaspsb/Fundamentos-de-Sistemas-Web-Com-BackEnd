import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '../../theme';

const { width } = Dimensions.get('window');

export function PromoBanner() {
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.title}>🐾 Pet Shop</Text>
        <Text style={styles.subtitle}>Tudo para seu melhor amigo!</Text>
        <Text style={styles.promo}>Frete grátis acima de R$ 150</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  banner: {
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
  },
  promo: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
});
