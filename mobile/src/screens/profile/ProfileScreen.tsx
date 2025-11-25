import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Avatar, Divider, List, RadioButton, ActivityIndicator } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../../theme';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useBackend, BACKENDS, BackendKey } from '../../contexts/BackendContext';
import { Cliente } from '../../types';
import { formatCPF, formatPhone } from '../../utils/formatters';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { ProfileStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;

export function ProfileScreen({ navigation }: Props) {
  const { user, logout } = useAuth();
  const { currentBackend, switchBackend, isLoading: backendLoading } = useBackend();
  const [loading, setLoading] = useState(true);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [switchingBackend, setSwitchingBackend] = useState(false);

  useEffect(() => {
    loadCliente();
  }, []);

  async function loadCliente() {
    if (!user?.clienteId) {
      setLoading(false);
      return;
    }

    try {
      const data = await api.getCliente(user.clienteId);
      setCliente(data);
    } catch (error) {
      console.error('Erro ao carregar cliente:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleBackendChange(backend: BackendKey) {
    if (backend === currentBackend.key) return;
    
    setSwitchingBackend(true);
    try {
      await switchBackend(backend);
    } catch (error) {
      console.error('Erro ao trocar backend:', error);
    } finally {
      setSwitchingBackend(false);
    }
  }

  async function handleLogout() {
    await logout();
  }

  if (loading) {
    return <LoadingScreen />;
  }

  const initials = cliente?.nome
    ?.split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header do perfil */}
      <View style={styles.header}>
        <Avatar.Text size={80} label={initials} style={styles.avatar} />
        <Text style={styles.name}>{cliente?.nome || user?.username}</Text>
        <Text style={styles.email}>{cliente?.email || user?.email}</Text>
      </View>

      {/* Dados do cliente */}
      {cliente && (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Dados Pessoais</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>CPF</Text>
              <Text style={styles.infoValue}>{formatCPF(cliente.cpf)}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Telefone</Text>
              <Text style={styles.infoValue}>{formatPhone(cliente.telefone)}</Text>
            </View>

            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>Endereço</Text>
            
            <Text style={styles.address}>
              {cliente.endereco}, {cliente.numero}
              {cliente.complemento && ` - ${cliente.complemento}`}
            </Text>
            <Text style={styles.address}>
              {cliente.bairro} - {cliente.cidade}
            </Text>
          </Card.Content>
        </Card>
      )}

      {/* Menu de opções */}
      <Card style={styles.card}>
        <List.Item
          title="Meus Agendamentos"
          description="Banho, tosa e outros serviços"
          left={(props) => <List.Icon {...props} icon="calendar" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => navigation.navigate('Appointments')}
        />
        <Divider />
        <List.Item
          title="Agendar Serviço"
          description="Marque um horário para seu pet"
          left={(props) => <List.Icon {...props} icon="calendar-plus" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => navigation.navigate('BookAppointment')}
        />
      </Card>

      {/* Configurações de Backend */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.backendHeader}>
            <Text style={styles.sectionTitle}>Backend da API</Text>
            {(switchingBackend || backendLoading) && (
              <ActivityIndicator size="small" color={theme.colors.primary} />
            )}
          </View>
          <Text style={styles.backendDescription}>
            Escolha qual servidor backend será utilizado para as requisições da API.
          </Text>
          
          <RadioButton.Group 
            onValueChange={(value) => handleBackendChange(value as BackendKey)} 
            value={currentBackend.key}
          >
            {(Object.keys(BACKENDS) as BackendKey[]).map((key) => (
              <View key={key} style={styles.radioItem}>
                <View style={styles.radioRow}>
                  <Text style={styles.backendIcon}>{BACKENDS[key].icon}</Text>
                  <RadioButton.Item
                    label={BACKENDS[key].name}
                    value={key}
                    position="leading"
                    disabled={switchingBackend || backendLoading}
                    style={styles.radioButton}
                    labelStyle={[
                      styles.radioLabel,
                      currentBackend.key === key && { color: BACKENDS[key].color, fontWeight: '600' }
                    ]}
                  />
                </View>
                <Text style={styles.portText}>Porta: {BACKENDS[key].ports.local}</Text>
              </View>
            ))}
          </RadioButton.Group>

          <View style={styles.backendStatus}>
            <View style={[styles.statusDot, { backgroundColor: currentBackend.color }]} />
            <Text style={styles.statusText}>
              {currentBackend.icon} Conectado: {currentBackend.name}
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Botão de logout */}
      <Button
        mode="outlined"
        icon="logout"
        onPress={handleLogout}
        style={styles.logoutButton}
        textColor={theme.custom.colors.error}
      >
        Sair da Conta
      </Button>

      <Text style={styles.version}>Pet Shop Mobile v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.custom.colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: theme.custom.colors.textSecondary,
  },
  card: {
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.custom.colors.textSecondary,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: theme.custom.colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.custom.colors.text,
  },
  divider: {
    marginVertical: 16,
  },
  address: {
    fontSize: 14,
    color: theme.custom.colors.text,
    marginBottom: 4,
  },
  logoutButton: {
    marginTop: 8,
    borderColor: theme.custom.colors.error,
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: theme.custom.colors.disabled,
    marginTop: 24,
    marginBottom: 16,
  },
  backendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  backendDescription: {
    fontSize: 13,
    color: theme.custom.colors.textSecondary,
    marginBottom: 16,
  },
  radioItem: {
    marginBottom: 4,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backendIcon: {
    fontSize: 20,
    marginRight: 4,
  },
  radioButton: {
    paddingLeft: 0,
    flex: 1,
  },
  radioLabel: {
    fontSize: 15,
  },
  portText: {
    fontSize: 12,
    color: theme.custom.colors.disabled,
    marginLeft: 48,
    marginTop: -8,
  },
  backendStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.custom.colors.border,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 13,
    color: theme.custom.colors.textSecondary,
  },
});
