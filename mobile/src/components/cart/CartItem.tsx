import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { theme } from '../../theme';
import { ItemCarrinho } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface CartItemProps {
  item: ItemCarrinho;
  onUpdateQuantity: (quantidade: number) => void;
  onRemove: () => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const subtotal = item.preco * item.quantidade;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {item.urlImagem ? (
          <Image
            source={{ uri: item.urlImagem }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>🐾</Text>
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {item.nome}
        </Text>
        <Text style={styles.price}>{formatCurrency(item.preco)}</Text>
        <Text style={styles.subtotal}>
          Subtotal: {formatCurrency(subtotal)}
        </Text>
      </View>

      <View style={styles.actions}>
        <View style={styles.quantityContainer}>
          <IconButton
            icon="minus"
            size={16}
            mode="outlined"
            onPress={() => onUpdateQuantity(item.quantidade - 1)}
          />
          <Text style={styles.quantity}>{item.quantidade}</Text>
          <IconButton
            icon="plus"
            size={16}
            mode="outlined"
            onPress={() => onUpdateQuantity(item.quantidade + 1)}
            disabled={item.quantidade >= item.quantidadeEstoque}
          />
        </View>
        <IconButton
          icon="trash-can-outline"
          size={20}
          iconColor={theme.custom.colors.error}
          onPress={onRemove}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f1f5f9',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 30,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.custom.colors.text,
  },
  price: {
    fontSize: 14,
    color: theme.custom.colors.textSecondary,
    marginTop: 4,
  },
  subtotal: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
    marginTop: 4,
  },
  actions: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 8,
    minWidth: 24,
    textAlign: 'center',
  },
});
