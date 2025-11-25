import { NavigatorScreenParams } from '@react-navigation/native';

// Auth Stack
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  CartTab: NavigatorScreenParams<CartStackParamList>;
  OrdersTab: NavigatorScreenParams<OrdersStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

// Home Stack
export type HomeStackParamList = {
  Home: undefined;
  ProductList: { categoriaId: number; categoriaNome: string };
  ProductDetail: { produtoId: number };
};

// Cart Stack
export type CartStackParamList = {
  Cart: undefined;
  Checkout: undefined;
};

// Orders Stack
export type OrdersStackParamList = {
  Orders: undefined;
  OrderDetail: { pedidoId: number };
};

// Profile Stack
export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  Appointments: undefined;
  AppointmentDetail: { agendamentoId: number };
  BookAppointment: undefined;
};

// Root Navigator
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

// Declaração global para navegação tipada
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
