import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Text,
  Button,
  RadioButton,
  Divider,
  TextInput,
  Snackbar,
  Portal,
  Dialog,
  ActivityIndicator,
} from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../../theme';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import { FormaPagamento } from '../../types';
import { formatCurrency, formatPaymentMethod } from '../../utils/formatters';
import { OrderSummary } from '../../components/cart/OrderSummary';
import { CartStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<CartStackParamList, 'Checkout'>;

const paymentMethods: FormaPagamento[] = [
  'PIX',
  'CARTAO_CREDITO',
  'CARTAO_DEBITO',
  'BOLETO',
  'DINHEIRO',
];

const paymentIcons: Record<FormaPagamento, string> = {
  PIX: '💰',
  CARTAO_CREDITO: '💳',
  CARTAO_DEBITO: '💳',
  BOLETO: '📄',
  DINHEIRO: '💵',
};

export function CheckoutScreen({ navigation }: Props) {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>('PIX');
  const [observacoes, setObservacoes] = useState('');
  const [error, setError] = useState('');
  const [successDialogVisible, setSuccessDialogVisible] = useState(false);
  const [pedidoId, setPedidoId] = useState<number | null>(null);

  async function handleConfirmOrder() {
    if (!user?.clienteId) {
      setError('Usuário não autenticado');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const pedido = await api.createPedido({
        clienteId: user.clienteId,
        formaPagamento,
        observacoes: observacoes.trim() || undefined,
        itens: items.map((item) => ({
          produtoId: item.id,
          quantidade: item.quantidade,
        })),
      });

      // Confirmar o pedido
      await api.confirmarPedido(pedido.id);

      setPedidoId(pedido.id);
      setSuccessDialogVisible(true);
      clearCart();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar pedido');
    } finally {
      setLoading(false);
    }
  }

  function handleSuccessClose() {
    setSuccessDialogVisible(false);
    navigation.getParent()?.navigate('OrdersTab');
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Finalizar Compra</Text>

        {/* Resumo dos itens */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Itens do Pedido</Text>
          {items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <Text style={styles.itemName} numberOfLines={1}>
                {item.quantidade}x {item.nome}
              </Text>
              <Text style={styles.itemPrice}>
                {formatCurrency(item.preco * item.quantidade)}
              </Text>
            </View>
          ))}
        </View>

        <Divider style={styles.divider} />

        {/* Forma de pagamento */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Forma de Pagamento</Text>
          <RadioButton.Group
            value={formaPagamento}
            onValueChange={(value) => setFormaPagamento(value as FormaPagamento)}
          >
            {paymentMethods.map((method) => (
              <View key={method} style={styles.radioRow}>
                <RadioButton.Android value={method} />
                <Text style={styles.radioLabel}>
                  {paymentIcons[method]} {formatPaymentMethod(method)}
                </Text>
              </View>
            ))}
          </RadioButton.Group>
        </View>

        <Divider style={styles.divider} />

        {/* Observações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Observações (opcional)</Text>
          <TextInput
            value={observacoes}
            onChangeText={setObservacoes}
            mode="outlined"
            multiline
            numberOfLines={3}
            placeholder="Ex: Entregar no período da tarde"
            style={styles.observacoesInput}
          />
        </View>

        <Divider style={styles.divider} />

        {/* Resumo do pedido */}
        <OrderSummary subtotal={total} total={total} />
      </ScrollView>

      {/* Botão confirmar */}
      <View style={styles.confirmBar}>
        <Button
          mode="contained"
          icon="check"
          onPress={handleConfirmOrder}
          loading={loading}
          disabled={loading || items.length === 0}
          style={styles.confirmButton}
          contentStyle={styles.confirmButtonContent}
        >
          Confirmar Pedido
        </Button>
      </View>

      {/* Diálogo de sucesso */}
      <Portal>
        <Dialog visible={successDialogVisible} onDismiss={handleSuccessClose}>
          <Dialog.Icon icon="check-circle" color={theme.custom.colors.success} />
          <Dialog.Title style={styles.dialogTitle}>
            Pedido Confirmado!
          </Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>
              Seu pedido #{pedidoId} foi criado com sucesso.
            </Text>
            <Text style={styles.dialogText}>
              Você pode acompanhar o status na aba "Meus Pedidos".
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleSuccessClose}>Ver Pedidos</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

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
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.custom.colors.text,
    marginBottom: 24,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.custom.colors.text,
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    color: theme.custom.colors.textSecondary,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.custom.colors.text,
    marginLeft: 8,
  },
  divider: {
    marginVertical: 16,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  radioLabel: {
    fontSize: 16,
    color: theme.custom.colors.text,
  },
  observacoesInput: {
    backgroundColor: theme.colors.surface,
  },
  confirmBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.custom.colors.border,
  },
  confirmButton: {
    borderRadius: 8,
  },
  confirmButtonContent: {
    paddingVertical: 8,
  },
  dialogTitle: {
    textAlign: 'center',
  },
  dialogText: {
    textAlign: 'center',
    fontSize: 14,
    color: theme.custom.colors.textSecondary,
    marginBottom: 8,
  },
});
