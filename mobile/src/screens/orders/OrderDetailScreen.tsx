import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Chip, Divider, Button, Snackbar } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../../theme';
import { api } from '../../services/api';
import { Pedido } from '../../types';
import {
  formatCurrency,
  formatDate,
  formatOrderStatus,
  getOrderStatusColor,
  formatPaymentMethod,
} from '../../utils/formatters';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { OrdersStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<OrdersStackParamList, 'OrderDetail'>;

export function OrderDetailScreen({ route, navigation }: Props) {
  const { pedidoId } = route.params;
  const [loading, setLoading] = useState(true);
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPedido();
  }, [pedidoId]);

  async function loadPedido() {
    try {
      const data = await api.getPedido(pedidoId);
      setPedido(data);
      navigation.setOptions({ title: `Pedido #${data.id}` });
    } catch (error) {
      console.error('Erro ao carregar pedido:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancelOrder() {
    if (!pedido) return;

    setCancelling(true);
    try {
      await api.cancelarPedido(pedido.id);
      await loadPedido();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao cancelar pedido');
    } finally {
      setCancelling(false);
    }
  }

  if (loading || !pedido) {
    return <LoadingScreen />;
  }

  const canCancel = ['PENDENTE', 'CONFIRMADO'].includes(pedido.status);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Status */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.statusContainer}>
              <Text style={styles.statusLabel}>Status do Pedido</Text>
              <Chip
                mode="flat"
                style={[
                  styles.statusChip,
                  { backgroundColor: getOrderStatusColor(pedido.status) + '20' },
                ]}
                textStyle={[
                  styles.statusChipText,
                  { color: getOrderStatusColor(pedido.status) },
                ]}
              >
                {formatOrderStatus(pedido.status)}
              </Chip>
            </View>
          </Card.Content>
        </Card>

        {/* Informações do pedido */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Informações do Pedido</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Número:</Text>
              <Text style={styles.infoValue}>#{pedido.id}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Data:</Text>
              <Text style={styles.infoValue}>{formatDate(pedido.dataPedido)}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Pagamento:</Text>
              <Text style={styles.infoValue}>
                {formatPaymentMethod(pedido.formaPagamento)}
              </Text>
            </View>

            {pedido.observacoes && (
              <View style={styles.observacoesContainer}>
                <Text style={styles.infoLabel}>Observações:</Text>
                <Text style={styles.observacoes}>{pedido.observacoes}</Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Itens do pedido */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Itens do Pedido</Text>
            
            {pedido.itens?.map((item, index) => (
              <View key={index}>
                <View style={styles.itemRow}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>
                      {item.quantidade}x {item.produto?.nome || `Produto #${item.produtoId}`}
                    </Text>
                    <Text style={styles.itemPrice}>
                      {formatCurrency(item.precoUnitario)} cada
                    </Text>
                  </View>
                  <Text style={styles.itemSubtotal}>
                    {formatCurrency(item.precoUnitario * item.quantidade)}
                  </Text>
                </View>
                {index < pedido.itens.length - 1 && <Divider style={styles.itemDivider} />}
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Total */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatCurrency(pedido.valorTotal)}</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Botão cancelar */}
        {canCancel && (
          <Button
            mode="outlined"
            icon="close-circle"
            textColor={theme.custom.colors.error}
            style={styles.cancelButton}
            onPress={handleCancelOrder}
            loading={cancelling}
            disabled={cancelling}
          >
            Cancelar Pedido
          </Button>
        )}
      </ScrollView>

      <Snackbar
        visible={!!error}
        onDismiss={() => setError('')}
        duration={3000}
        action={{ label: 'OK', onPress: () => setError('') }}
      >
        {error}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.custom.colors.text,
  },
  statusChip: {
    height: 32,
  },
  statusChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.custom.colors.text,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: theme.custom.colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.custom.colors.text,
  },
  observacoesContainer: {
    marginTop: 8,
  },
  observacoes: {
    fontSize: 14,
    color: theme.custom.colors.text,
    marginTop: 4,
    fontStyle: 'italic',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.custom.colors.text,
  },
  itemPrice: {
    fontSize: 12,
    color: theme.custom.colors.textSecondary,
    marginTop: 2,
  },
  itemSubtotal: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.custom.colors.text,
    marginLeft: 16,
  },
  itemDivider: {
    marginVertical: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.custom.colors.text,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  cancelButton: {
    borderColor: theme.custom.colors.error,
    marginBottom: 24,
  },
});
