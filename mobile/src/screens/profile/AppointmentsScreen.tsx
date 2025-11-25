import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text, Card, Chip } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { theme } from '../../theme';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { Agendamento } from '../../types';
import {
  formatDate,
  formatTime,
  formatAppointmentStatus,
  getAppointmentStatusColor,
  formatServiceMethod,
} from '../../utils/formatters';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { EmptyState } from '../../components/common/EmptyState';
import { ProfileStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Appointments'>;

export function AppointmentsScreen({ navigation }: Props) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadAgendamentos();
    }, [])
  );

  async function loadAgendamentos() {
    if (!user?.clienteId) {
      setLoading(false);
      return;
    }

    try {
      const data = await api.getAgendamentosByCliente(user.clienteId);
      // Ordenar por data decrescente
      data.sort((a, b) => 
        new Date(b.dataAgendamento).getTime() - new Date(a.dataAgendamento).getTime()
      );
      setAgendamentos(data);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  function onRefresh() {
    setRefreshing(true);
    loadAgendamentos();
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (agendamentos.length === 0) {
    return (
      <EmptyState
        icon="calendar-blank"
        title="Nenhum agendamento"
        description="Você ainda não tem agendamentos"
        actionLabel="Agendar Serviço"
        onAction={() => navigation.navigate('BookAppointment')}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={agendamentos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.date}>{formatDate(item.dataAgendamento)}</Text>
                  <Text style={styles.time}>{formatTime(item.horario)}</Text>
                </View>
                <Chip
                  mode="flat"
                  style={[
                    styles.statusChip,
                    { backgroundColor: getAppointmentStatusColor(item.status) + '20' },
                  ]}
                  textStyle={{ color: getAppointmentStatusColor(item.status) }}
                >
                  {formatAppointmentStatus(item.status)}
                </Chip>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Pet:</Text>
                <Text style={styles.value}>{item.pet?.nome || '-'}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Atendimento:</Text>
                <Text style={styles.value}>{formatServiceMethod(item.metodoAtendimento)}</Text>
              </View>

              <View style={styles.servicesContainer}>
                <Text style={styles.label}>Serviços:</Text>
                <View style={styles.servicesList}>
                  {item.servicos?.map((servico) => (
                    <Chip key={servico.id} mode="outlined" style={styles.serviceChip}>
                      {servico.nome}
                    </Chip>
                  ))}
                </View>
              </View>
            </Card.Content>
          </Card>
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
    padding: 16,
  },
  card: {
    marginBottom: 12,
    backgroundColor: theme.colors.surface,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  date: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.custom.colors.text,
  },
  time: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  statusChip: {
    height: 28,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: theme.custom.colors.textSecondary,
    marginRight: 8,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.custom.colors.text,
  },
  servicesContainer: {
    marginTop: 8,
  },
  servicesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  serviceChip: {
    backgroundColor: theme.colors.surface,
  },
});
