import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Button, Chip, Snackbar, IconButton } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../../theme';
import { api } from '../../services/api';
import { Produto } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/formatters';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { HomeStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductDetail'>;

export function ProductDetailScreen({ route, navigation }: Props) {
  const { produtoId } = route.params;
  const { addItem, getItemQuantity } = useCart();
  const [loading, setLoading] = useState(true);
  const [produto, setProduto] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState(1);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    loadProduto();
  }, [produtoId]);

  async function loadProduto() {
    try {
      const data = await api.getProduto(produtoId);
      setProduto(data);
      navigation.setOptions({ title: data.nome });
    } catch (error) {
      console.error('Erro ao carregar produto:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleAddToCart() {
    if (produto) {
      addItem(produto, quantidade);
      setSnackbarVisible(true);
    }
  }

  function incrementQuantity() {
    if (produto && quantidade < produto.quantidadeEstoque) {
      setQuantidade(quantidade + 1);
    }
  }

  function decrementQuantity() {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  }

  if (loading || !produto) {
    return <LoadingScreen />;
  }

  const hasStock = produto.quantidadeEstoque > 0;
  const cartQuantity = getItemQuantity(produto.id);
  const availableStock = produto.quantidadeEstoque - cartQuantity;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Imagem */}
        <View style={styles.imageContainer}>
          {produto.urlImagem ? (
            <Image
              source={{ uri: produto.urlImagem }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>🐾</Text>
            </View>
          )}
        </View>

        {/* Informações */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{produto.nome}</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatCurrency(produto.preco)}</Text>
            {hasStock ? (
              <Chip icon="check" mode="flat" style={styles.stockChip}>
                {produto.quantidadeEstoque} em estoque
              </Chip>
            ) : (
              <Chip icon="close" mode="flat" style={styles.outOfStockChip}>
                Esgotado
              </Chip>
            )}
          </View>

          <Text style={styles.descriptionTitle}>Descrição</Text>
          <Text style={styles.description}>{produto.descricao}</Text>

          {produto.categoria && (
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryLabel}>Categoria:</Text>
              <Chip mode="outlined" style={styles.categoryChip}>
                {produto.categoria.nome}
              </Chip>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Barra de ação fixa */}
      {hasStock && (
        <View style={styles.actionBar}>
          <View style={styles.quantityContainer}>
            <IconButton
              icon="minus"
              mode="outlined"
              size={20}
              onPress={decrementQuantity}
              disabled={quantidade <= 1}
            />
            <Text style={styles.quantity}>{quantidade}</Text>
            <IconButton
              icon="plus"
              mode="outlined"
              size={20}
              onPress={incrementQuantity}
              disabled={quantidade >= availableStock}
            />
          </View>

          <Button
            mode="contained"
            icon="cart-plus"
            onPress={handleAddToCart}
            style={styles.addButton}
            contentStyle={styles.addButtonContent}
            disabled={availableStock <= 0}
          >
            Adicionar
          </Button>
        </View>
      )}

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        action={{
          label: 'Ver Carrinho',
          onPress: () => {
            navigation.getParent()?.navigate('CartTab');
          },
        }}
      >
        Produto adicionado ao carrinho!
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
    paddingBottom: 100,
  },
  imageContainer: {
    height: 300,
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
    fontSize: 80,
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.custom.colors.text,
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  stockChip: {
    backgroundColor: '#dcfce7',
  },
  outOfStockChip: {
    backgroundColor: '#fef2f2',
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.custom.colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: theme.custom.colors.textSecondary,
    lineHeight: 22,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  categoryLabel: {
    fontSize: 14,
    color: theme.custom.colors.textSecondary,
    marginRight: 8,
  },
  categoryChip: {
    backgroundColor: theme.colors.surface,
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.custom.colors.border,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  quantity: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 12,
    minWidth: 30,
    textAlign: 'center',
  },
  addButton: {
    flex: 1,
    borderRadius: 8,
  },
  addButtonContent: {
    paddingVertical: 8,
  },
});
