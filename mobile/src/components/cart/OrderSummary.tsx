import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { theme } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

interface OrderSummaryProps {
  subtotal: number;
  frete?: number;
  desconto?: number;
  total: number;
}

export function OrderSummary({
  subtotal,
  frete = 0,
  desconto = 0,
  total,
}: OrderSummaryProps) {
  const freteGratis = subtotal >= 150;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo do Pedido</Text>
      <Divider style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>{formatCurrency(subtotal)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Frete</Text>
        {freteGratis ? (
          <Text style={styles.freeShipping}>Grátis</Text>
        ) : (
          <Text style={styles.value}>{formatCurrency(frete)}</Text>
        )}
      </View>

      {desconto > 0 && (
        <View style={styles.row}>
          <Text style={styles.label}>Desconto</Text>
          <Text style={styles.discount}>-{formatCurrency(desconto)}</Text>
        </View>
      )}

      <Divider style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
      </View>

      {!freteGratis && (
        <Text style={styles.freeShippingHint}>
          Faltam {formatCurrency(150 - subtotal)} para frete grátis!
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.custom.colors.text,
    marginBottom: 8,
  },
  divider: {
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: theme.custom.colors.textSecondary,
  },
  value: {
    fontSize: 14,
    color: theme.custom.colors.text,
  },
  freeShipping: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.custom.colors.success,
  },
  discount: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.custom.colors.success,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.custom.colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  freeShippingHint: {
    fontSize: 12,
    color: theme.custom.colors.accent,
    textAlign: 'center',
    marginTop: 8,
  },
});
