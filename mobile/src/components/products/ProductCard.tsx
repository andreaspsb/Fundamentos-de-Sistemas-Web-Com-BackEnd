import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { theme } from '../../theme';
import { Produto } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface ProductCardProps {
  produto: Produto;
  onPress: () => void;
  onAddToCart?: () => void;
}

export function ProductCard({ produto, onPress, onAddToCart }: ProductCardProps) {
  const hasStock = produto.quantidadeEstoque > 0;

  return (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        {produto.urlImagem ? (
          <Image
            source={{ uri: produto.urlImagem }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>🐾</Text>
          </View>
        )}
        {!hasStock && (
          <View style={styles.outOfStockBadge}>
            <Text style={styles.outOfStockText}>Esgotado</Text>
          </View>
        )}
      </View>
      <Card.Content style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {produto.nome}
        </Text>
        <Text style={styles.price}>{formatCurrency(produto.preco)}</Text>
        {hasStock && (
          <Text style={styles.stock}>
            {produto.quantidadeEstoque} em estoque
          </Text>
        )}
      </Card.Content>
      {onAddToCart && hasStock && (
        <Card.Actions style={styles.actions}>
          <IconButton
            icon="cart-plus"
            mode="contained"
            iconColor="#fff"
            containerColor={theme.colors.primary}
            size={20}
            onPress={onAddToCart}
          />
        </Card.Actions>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 4,
    backgroundColor: theme.colors.surface,
  },
  imageContainer: {
    position: 'relative',
    height: 120,
    backgroundColor: '#f1f5f9',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
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
    fontSize: 40,
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: theme.custom.colors.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  outOfStockText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    paddingTop: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.custom.colors.text,
    minHeight: 40,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.primary,
    marginTop: 4,
  },
  stock: {
    fontSize: 12,
    color: theme.custom.colors.textSecondary,
    marginTop: 2,
  },
  actions: {
    justifyContent: 'flex-end',
    paddingTop: 0,
  },
});
