import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, FlatList, RefreshControl } from 'react-native';
import { Text, Searchbar, Badge } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { theme } from '../../theme';
import { api } from '../../services/api';
import { Categoria, Produto } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { PromoBanner } from '../../components/home/PromoBanner';
import { CategoryCard } from '../../components/home/CategoryCard';
import { ProductCard } from '../../components/products/ProductCard';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { HomeStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const { itemCount, addItem } = useCart();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [produtosDestaque, setProdutosDestaque] = useState<Produto[]>([]);
  const [searchResults, setSearchResults] = useState<Produto[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  async function loadData() {
    try {
      const [cats, prods] = await Promise.all([
        api.getCategorias(),
        api.getProdutos(),
      ]);
      setCategorias(cats);
      // Pegar primeiros 6 produtos como destaque
      setProdutosDestaque(prods.slice(0, 6));
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function handleSearch(query: string) {
    setSearchQuery(query);
    if (query.length >= 2) {
      try {
        const results = await api.searchProdutos(query);
        setSearchResults(results);
      } catch (error) {
        console.error('Erro na busca:', error);
      }
    } else {
      setSearchResults([]);
    }
  }

  function handleCategoryPress(categoria: Categoria) {
    navigation.navigate('ProductList', {
      categoriaId: categoria.id,
      categoriaNome: categoria.nome,
    });
  }

  function handleProductPress(produto: Produto) {
    navigation.navigate('ProductDetail', { produtoId: produto.id });
  }

  function handleAddToCart(produto: Produto) {
    addItem(produto, 1);
  }

  function onRefresh() {
    setRefreshing(true);
    loadData();
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Buscar produtos..."
            onChangeText={handleSearch}
            value={searchQuery}
            style={styles.searchbar}
          />
        </View>
      </View>

      {searchQuery.length >= 2 && searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.searchResults}
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
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <PromoBanner />

          {/* Categorias */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categorias</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
            >
              {categorias.map((categoria) => (
                <CategoryCard
                  key={categoria.id}
                  categoria={categoria}
                  onPress={() => handleCategoryPress(categoria)}
                />
              ))}
            </ScrollView>
          </View>

          {/* Produtos em Destaque */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Produtos em Destaque</Text>
            <FlatList
              data={produtosDestaque}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={styles.productsGrid}
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
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchbar: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.custom.colors.text,
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingRight: 16,
  },
  productsGrid: {
    paddingBottom: 24,
  },
  productWrapper: {
    flex: 1,
    maxWidth: '50%',
  },
  searchResults: {
    padding: 16,
  },
});
