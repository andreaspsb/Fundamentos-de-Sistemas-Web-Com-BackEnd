import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../../theme';
import { api } from '../../services/api';
import { Produto } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { ProductCard } from '../../components/products/ProductCard';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { EmptyState } from '../../components/common/EmptyState';
import { HomeStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductList'>;

export function ProductListScreen({ route, navigation }: Props) {
  const { categoriaId, categoriaNome } = route.params;
  const { addItem } = useCart();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    navigation.setOptions({ title: categoriaNome });
    loadProdutos();
  }, [categoriaId]);

  async function loadProdutos() {
    try {
      const data = await api.getProdutosByCategoria(categoriaId);
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  function handleProductPress(produto: Produto) {
    navigation.navigate('ProductDetail', { produtoId: produto.id });
  }

  function handleAddToCart(produto: Produto) {
    addItem(produto, 1);
  }

  function onRefresh() {
    setRefreshing(true);
    loadProdutos();
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (produtos.length === 0) {
    return (
      <EmptyState
        icon="package-variant"
        title="Nenhum produto encontrado"
        description="Esta categoria ainda não possui produtos disponíveis."
        actionLabel="Voltar"
        onAction={() => navigation.goBack()}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View style={styles.productWrapper}>
            <ProductCard
              produto={item}
              onPress={() => handleProductPress(item)}
              onAddToCart={() => handleAddToCart(item)}
            />
          </View>
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
    padding: 12,
  },
  productWrapper: {
    flex: 1,
    maxWidth: '50%',
  },
});
