import * as SecureStore from 'expo-secure-store';

const KEYS = {
  AUTH_TOKEN: 'petshop_auth_token',
  USER_DATA: 'petshop_user_data',
  CART: 'petshop_carrinho',
};

export const storage = {
  // Token de autenticação
  async setToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(KEYS.AUTH_TOKEN, token);
  },

  async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(KEYS.AUTH_TOKEN);
  },

  async removeToken(): Promise<void> {
    await SecureStore.deleteItemAsync(KEYS.AUTH_TOKEN);
  },

  // Dados do usuário
  async setUserData(data: object): Promise<void> {
    await SecureStore.setItemAsync(KEYS.USER_DATA, JSON.stringify(data));
  },

  async getUserData<T>(): Promise<T | null> {
    const data = await SecureStore.getItemAsync(KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
  },

  async removeUserData(): Promise<void> {
    await SecureStore.deleteItemAsync(KEYS.USER_DATA);
  },

  // Carrinho
  async setCart(cart: object[]): Promise<void> {
    await SecureStore.setItemAsync(KEYS.CART, JSON.stringify(cart));
  },

  async getCart<T>(): Promise<T[] | null> {
    const data = await SecureStore.getItemAsync(KEYS.CART);
    return data ? JSON.parse(data) : null;
  },

  async clearCart(): Promise<void> {
    await SecureStore.deleteItemAsync(KEYS.CART);
  },

  // Limpar tudo (logout)
  async clearAll(): Promise<void> {
    await Promise.all([
      SecureStore.deleteItemAsync(KEYS.AUTH_TOKEN),
      SecureStore.deleteItemAsync(KEYS.USER_DATA),
      SecureStore.deleteItemAsync(KEYS.CART),
    ]);
  },
};
