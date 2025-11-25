import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { storage } from '../services/storage';
import { ItemCarrinho, Produto } from '../types';

interface CartContextData {
  items: ItemCarrinho[];
  itemCount: number;
  total: number;
  addItem: (produto: Produto, quantidade?: number) => void;
  removeItem: (produtoId: number) => void;
  updateQuantity: (produtoId: number, quantidade: number) => void;
  clearCart: () => void;
  getItemQuantity: (produtoId: number) => number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<ItemCarrinho[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    saveCart();
  }, [items]);

  async function loadCart() {
    try {
      const savedCart = await storage.getCart<ItemCarrinho>();
      if (savedCart && savedCart.length > 0) {
        setItems(savedCart);
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    }
  }

  async function saveCart() {
    try {
      await storage.setCart(items);
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
    }
  }

  function addItem(produto: Produto, quantidade: number = 1) {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === produto.id);

      if (existingItem) {
        // Atualiza quantidade se já existe
        const newQuantity = existingItem.quantidade + quantidade;
        
        // Valida estoque
        if (newQuantity > produto.quantidadeEstoque) {
          return currentItems;
        }

        return currentItems.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: newQuantity }
            : item
        );
      }

      // Adiciona novo item
      if (quantidade > produto.quantidadeEstoque) {
        return currentItems;
      }

      const newItem: ItemCarrinho = {
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        quantidade,
        quantidadeEstoque: produto.quantidadeEstoque,
        urlImagem: produto.urlImagem,
      };

      return [...currentItems, newItem];
    });
  }

  function removeItem(produtoId: number) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== produtoId));
  }

  function updateQuantity(produtoId: number, quantidade: number) {
    if (quantidade <= 0) {
      removeItem(produtoId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id === produtoId) {
          // Valida estoque
          const newQuantity = Math.min(quantidade, item.quantidadeEstoque);
          return { ...item, quantidade: newQuantity };
        }
        return item;
      })
    );
  }

  function clearCart() {
    setItems([]);
    storage.clearCart();
  }

  function getItemQuantity(produtoId: number): number {
    const item = items.find((i) => i.id === produtoId);
    return item?.quantidade || 0;
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantidade, 0);
  const total = items.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        total,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}
