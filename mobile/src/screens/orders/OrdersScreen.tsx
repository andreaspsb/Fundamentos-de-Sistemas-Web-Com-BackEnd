import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text, Card, Chip } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { theme } from '../../theme';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { Pedido } from '../../types';
import {
  formatCurrency,
  formatDate,
  formatOrderStatus,
  getOrderStatusColor,
} from '../../utils/formatters';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { EmptyState } from '../../components/common/EmptyState';
import { OrdersStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<OrdersStackParamList, 'Orders'>;

export function OrdersScreen({ navigation }: Props) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadPedidos();
    }, [])
  );

  async function loadPedidos() {
    if (!user?.clienteId) {
      setLoading(false);
      return;
    }

    try {
      const data = await api.getPedidosByCliente(user.clienteId);
      // Ordenar por data decrescente
      data.sort((a, b) => new Date(b.dataPedido).getTime() - new Date(a.dataPedido).getTime());
      setPedidos(data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  function onRefresh() {
    setRefreshing(true);
    loadPedidos();
  }

  function handlePedidoPress(pedido: Pedido) {
    navigation.navigate('OrderDetail', { pedidoId: pedido.id });
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (pedidos.length === 0) {
    return (
      <EmptyState
        icon="receipt"
        title="Nenhum pedido encontrado"
        description="Você ainda não fez nenhum pedido"
        actionLabel="Ver Produtos"
        onAction={() => navigation.getParent()?.navigate('HomeTab')}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <Text style={styles.title}>Meus Pedidos</Text>
        }
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => handlePedidoPress(item)}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <Text style={styles.orderId}>Pedido #{item.id}</Text>
                <Chip
                  mode="flat"
                  style={[
                    styles.statusChip,
                    { backgroundColor: getOrderStatusColor(item.status) + '20' },
                  ]}
                  textStyle={{ color: getOrderStatusColor(item.status) }}
                >
                  {formatOrderStatus(item.status)}
                </Chip>
              </View>

              <Text style={styles.date}>{formatDate(item.dataPedido)}</Text>

              <View style={styles.cardFooter}>
                <Text style={styles.itemCount}>
                  {item.itens?.length || 0} {(item.itens?.length || 0) === 1 ? 'item' : 'itens'}
                </Text>
                <Text style={styles.total}>{formatCurrency(item.valorTotal)}</Text>
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  list: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.custom.colors.text,
    marginBottom: 16,
  },
  card: {
    marginBottom: 12,
    backgroundColor: theme.colors.surface,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.custom.colors.text,
  },
  statusChip: {
    height: 28,
  },
  date: {
    fontSize: 14,
    color: theme.custom.colors.textSecondary,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.custom.colors.border,
  },
  itemCount: {
    fontSize: 14,
    color: theme.custom.colors.textSecondary,
  },
  total: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.primary,
  },
});
