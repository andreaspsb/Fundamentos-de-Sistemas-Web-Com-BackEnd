import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../../theme';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { CartItem } from '../../components/cart/CartItem';
import { OrderSummary } from '../../components/cart/OrderSummary';
import { EmptyState } from '../../components/common/EmptyState';
import { CartStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<CartStackParamList, 'Cart'>;

export function CartScreen({ navigation }: Props) {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  function handleCheckout() {
    if (!isAuthenticated) {
      // Navegar para login
      navigation.getParent()?.getParent()?.navigate('Auth');
      return;
    }
    navigation.navigate('Checkout');
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon="cart-outline"
        title="Seu carrinho está vazio"
        description="Adicione produtos para continuar com a compra"
        actionLabel="Ver Produtos"
        onAction={() => navigation.getParent()?.navigate('HomeTab')}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Meu Carrinho</Text>
            <Button
              mode="text"
              textColor={theme.custom.colors.error}
              onPress={clearCart}
            >
              Limpar
            </Button>
          </View>
        }
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
            onRemove={() => removeItem(item.id)}
          />
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <OrderSummary subtotal={total} total={total} />
          </View>
        }
      />

      <View style={styles.checkoutBar}>
        <Button
          mode="contained"
          icon="cart-check"
          onPress={handleCheckout}
          style={styles.checkoutButton}
          contentStyle={styles.checkoutButtonContent}
        >
          Finalizar Compra
        </Button>
      </View>
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
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.custom.colors.text,
  },
  footer: {
    marginTop: 16,
  },
  checkoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.custom.colors.border,
  },
  checkoutButton: {
    borderRadius: 8,
  },
  checkoutButtonContent: {
    paddingVertical: 8,
  },
});
