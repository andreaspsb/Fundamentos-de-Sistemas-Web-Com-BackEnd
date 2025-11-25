import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Badge, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';
import { useCart } from '../contexts/CartContext';
import { useBackend } from '../contexts/BackendContext';
import {
  MainTabParamList,
  HomeStackParamList,
  CartStackParamList,
  OrdersStackParamList,
  ProfileStackParamList,
} from './types';

// Screens
import { HomeScreen } from '../screens/home/HomeScreen';
import { ProductListScreen } from '../screens/home/ProductListScreen';
import { ProductDetailScreen } from '../screens/home/ProductDetailScreen';
import { CartScreen } from '../screens/cart/CartScreen';
import { CheckoutScreen } from '../screens/cart/CheckoutScreen';
import { OrdersScreen } from '../screens/orders/OrdersScreen';
import { OrderDetailScreen } from '../screens/orders/OrderDetailScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { AppointmentsScreen } from '../screens/profile/AppointmentsScreen';
import { BookAppointmentScreen } from '../screens/profile/BookAppointmentScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStackNav = createNativeStackNavigator<HomeStackParamList>();
const CartStackNav = createNativeStackNavigator<CartStackParamList>();
const OrdersStackNav = createNativeStackNavigator<OrdersStackParamList>();
const ProfileStackNav = createNativeStackNavigator<ProfileStackParamList>();

// Componente de indicador do backend no header
function BackendHeaderIndicator() {
  const { currentBackend } = useBackend();

  return (
    <View style={styles.headerBadge}>
      <View style={[styles.headerBadgeDot, { backgroundColor: currentBackend.color }]} />
      <Text style={styles.headerBadgeText}>{currentBackend.icon}</Text>
    </View>
  );
}

const screenOptions = {
  headerStyle: {
    backgroundColor: theme.colors.primary,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: '600' as const,
  },
  headerRight: () => <BackendHeaderIndicator />,
};

function HomeStack() {
  return (
    <HomeStackNav.Navigator screenOptions={screenOptions}>
      <HomeStackNav.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Pet Shop' }}
      />
      <HomeStackNav.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: 'Produtos' }}
      />
      <HomeStackNav.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: 'Produto' }}
      />
    </HomeStackNav.Navigator>
  );
}

function CartStack() {
  return (
    <CartStackNav.Navigator screenOptions={screenOptions}>
      <CartStackNav.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: 'Carrinho' }}
      />
      <CartStackNav.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: 'Finalizar Compra' }}
      />
    </CartStackNav.Navigator>
  );
}

function OrdersStack() {
  return (
    <OrdersStackNav.Navigator screenOptions={screenOptions}>
      <OrdersStackNav.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ title: 'Meus Pedidos' }}
      />
      <OrdersStackNav.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{ title: 'Detalhes do Pedido' }}
      />
    </OrdersStackNav.Navigator>
  );
}

function ProfileStack() {
  return (
    <ProfileStackNav.Navigator screenOptions={screenOptions}>
      <ProfileStackNav.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Meu Perfil' }}
      />
      <ProfileStackNav.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{ title: 'Meus Agendamentos' }}
      />
      <ProfileStackNav.Screen
        name="BookAppointment"
        component={BookAppointmentScreen}
        options={{ title: 'Agendar Serviço' }}
      />
    </ProfileStackNav.Navigator>
  );
}

function CartIconWithBadge({ color, size }: { color: string; size: number }) {
  const { itemCount } = useCart();

  return (
    <View>
      <Icon name="cart" color={color} size={size} />
      {itemCount > 0 && (
        <Badge
          size={16}
          style={{
            position: 'absolute',
            top: -4,
            right: -8,
            backgroundColor: theme.custom.colors.error,
          }}
        >
          {itemCount > 99 ? '99+' : itemCount}
        </Badge>
      )}
    </View>
  );
}

function ProfileIconWithBackendBadge({ color, size }: { color: string; size: number }) {
  const { currentBackend } = useBackend();

  return (
    <View>
      <Icon name="account" color={color} size={size} />
      <View style={[styles.backendBadge, { backgroundColor: currentBackend.color }]}>
        <Text style={styles.backendBadgeText}>{currentBackend.icon}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  headerBadgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  headerBadgeText: {
    fontSize: 14,
    color: '#fff',
  },
  backendBadge: {
    position: 'absolute',
    top: -4,
    right: -10,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.surface,
  },
  backendBadgeText: {
    fontSize: 10,
  },
});

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.custom.colors.disabled,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.custom.colors.border,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartStack}
        options={{
          title: 'Carrinho',
          tabBarIcon: ({ color, size }) => (
            <CartIconWithBadge color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersStack}
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ color, size }) => (
            <Icon name="receipt" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <ProfileIconWithBackendBadge color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
