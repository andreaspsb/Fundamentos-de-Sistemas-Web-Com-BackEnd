import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Text,
  Button,
  Card,
  Chip,
  RadioButton,
  TextInput,
  SegmentedButtons,
  Snackbar,
  Portal,
  Dialog,
} from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../../theme';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { Pet, Servico, MetodoAtendimento, PortePet } from '../../types';
import { formatCurrency, formatDateForApi } from '../../utils/formatters';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { ProfileStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<ProfileStackParamList, 'BookAppointment'>;

const horarios = [
  '08:00', '09:00', '10:00', '11:00',
  '14:00', '15:00', '16:00', '17:00',
];

export function BookAppointmentScreen({ navigation }: Props) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successDialogVisible, setSuccessDialogVisible] = useState(false);

  // Dados para seleção
  const [pets, setPets] = useState<Pet[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);

  // Seleções do usuário
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [selectedServicoIds, setSelectedServicoIds] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [metodoAtendimento, setMetodoAtendimento] = useState<MetodoAtendimento>('LOCAL');
  const [portePet, setPortePet] = useState<PortePet>('MEDIO');
  const [observacoes, setObservacoes] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    if (!user?.clienteId) {
      setLoading(false);
      return;
    }

    try {
      const [petsData, servicosData] = await Promise.all([
        api.getPetsByCliente(user.clienteId),
        api.getServicos(),
      ]);
      setPets(petsData);
      setServicos(servicosData);

      if (petsData.length > 0) {
        setSelectedPetId(petsData[0].id!);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }

  function toggleServico(servicoId: number) {
    setSelectedServicoIds((prev) =>
      prev.includes(servicoId)
        ? prev.filter((id) => id !== servicoId)
        : [...prev, servicoId]
    );
  }

  function handleDateChange(value: string) {
    // Formata como DD/MM/YYYY
    const numbers = value.replace(/\D/g, '');
    let formatted = '';
    if (numbers.length >= 1) formatted = numbers.substring(0, 2);
    if (numbers.length >= 3) formatted += '/' + numbers.substring(2, 4);
    if (numbers.length >= 5) formatted += '/' + numbers.substring(4, 8);
    setSelectedDate(formatted);
  }

  function getDateForApi(): string {
    const parts = selectedDate.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return '';
  }

  async function handleSubmit() {
    if (!selectedPetId) {
      setError('Selecione um pet');
      return;
    }
    if (selectedServicoIds.length === 0) {
      setError('Selecione pelo menos um serviço');
      return;
    }
    if (!selectedDate || selectedDate.length < 10) {
      setError('Informe a data');
      return;
    }
    if (!selectedTime) {
      setError('Selecione um horário');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await api.createAgendamento({
        clienteId: user!.clienteId!,
        petId: selectedPetId,
        dataAgendamento: getDateForApi(),
        horario: selectedTime + ':00',
        metodoAtendimento,
        portePet,
        observacoes: observacoes.trim() || undefined,
        servicoIds: selectedServicoIds,
      });

      setSuccessDialogVisible(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar agendamento');
    } finally {
      setSubmitting(false);
    }
  }

  function handleSuccessClose() {
    setSuccessDialogVisible(false);
    navigation.navigate('Appointments');
  }

  if (loading) {
    return <LoadingScreen />;
  }

  const totalServicos = servicos
    .filter((s) => selectedServicoIds.includes(s.id))
    .reduce((sum, s) => sum + s.preco, 0);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Agendar Serviço</Text>

        {/* Seleção de Pet */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Selecione o Pet</Text>
            {pets.length === 0 ? (
              <Text style={styles.emptyText}>Nenhum pet cadastrado</Text>
            ) : (
              <RadioButton.Group
                value={selectedPetId?.toString() || ''}
                onValueChange={(value) => setSelectedPetId(parseInt(value))}
              >
                {pets.map((pet) => (
                  <View key={pet.id} style={styles.radioRow}>
                    <RadioButton.Android value={pet.id!.toString()} />
                    <Text style={styles.radioLabel}>
                      {pet.nome} ({pet.tipo})
                    </Text>
                  </View>
                ))}
              </RadioButton.Group>
            )}
          </Card.Content>
        </Card>

        {/* Seleção de Serviços */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Serviços</Text>
            <View style={styles.servicesGrid}>
              {servicos.map((servico) => (
                <Chip
                  key={servico.id}
                  mode={selectedServicoIds.includes(servico.id) ? 'flat' : 'outlined'}
                  selected={selectedServicoIds.includes(servico.id)}
                  onPress={() => toggleServico(servico.id)}
                  style={styles.serviceChip}
                >
                  {servico.nome} - {formatCurrency(servico.preco)}
                </Chip>
              ))}
            </View>
            {totalServicos > 0 && (
              <Text style={styles.totalServicos}>
                Total: {formatCurrency(totalServicos)}
              </Text>
            )}
          </Card.Content>
        </Card>

        {/* Data e Horário */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Data e Horário</Text>
            
            <TextInput
              label="Data (DD/MM/AAAA)"
              value={selectedDate}
              onChangeText={handleDateChange}
              mode="outlined"
              keyboardType="numeric"
              style={styles.dateInput}
            />

            <Text style={styles.timeLabel}>Horário:</Text>
            <View style={styles.timesGrid}>
              {horarios.map((horario) => (
                <Chip
                  key={horario}
                  mode={selectedTime === horario ? 'flat' : 'outlined'}
                  selected={selectedTime === horario}
                  onPress={() => setSelectedTime(horario)}
                  style={styles.timeChip}
                >
                  {horario}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Método e Porte */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Método de Atendimento</Text>
            <SegmentedButtons
              value={metodoAtendimento}
              onValueChange={(value) => setMetodoAtendimento(value as MetodoAtendimento)}
              buttons={[
                { value: 'LOCAL', label: 'No Local' },
                { value: 'TELEBUSCA', label: 'Tele-busca' },
              ]}
              style={styles.segmented}
            />

            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Porte do Pet</Text>
            <SegmentedButtons
              value={portePet}
              onValueChange={(value) => setPortePet(value as PortePet)}
              buttons={[
                { value: 'PEQUENO', label: 'Pequeno' },
                { value: 'MEDIO', label: 'Médio' },
                { value: 'GRANDE', label: 'Grande' },
              ]}
              style={styles.segmented}
            />
          </Card.Content>
        </Card>

        {/* Observações */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Observações (opcional)</Text>
            <TextInput
              value={observacoes}
              onChangeText={setObservacoes}
              mode="outlined"
              multiline
              numberOfLines={3}
              placeholder="Ex: Pet tem medo de secador"
              style={styles.observacoesInput}
            />
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Botão confirmar */}
      <View style={styles.confirmBar}>
        <Button
          mode="contained"
          icon="calendar-check"
          onPress={handleSubmit}
          loading={submitting}
          disabled={submitting}
          style={styles.confirmButton}
          contentStyle={styles.confirmButtonContent}
        >
          Confirmar Agendamento
        </Button>
      </View>

      {/* Diálogo de sucesso */}
      <Portal>
        <Dialog visible={successDialogVisible} onDismiss={handleSuccessClose}>
          <Dialog.Icon icon="check-circle" color={theme.custom.colors.success} />
          <Dialog.Title style={styles.dialogTitle}>
            Agendamento Confirmado!
          </Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>
              Seu agendamento foi criado com sucesso.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleSuccessClose}>Ver Agendamentos</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar
        visible={!!error}
        onDismiss={() => setError('')}
        duration={3000}
        action={{ label: 'OK', onPress: () => setError('') }}
      >
        {error}
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
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.custom.colors.text,
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.custom.colors.text,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
    color: theme.custom.colors.textSecondary,
    fontStyle: 'italic',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  radioLabel: {
    fontSize: 16,
    color: theme.custom.colors.text,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  serviceChip: {
    marginBottom: 4,
  },
  totalServicos: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
    marginTop: 12,
    textAlign: 'right',
  },
  dateInput: {
    backgroundColor: theme.colors.surface,
    marginBottom: 16,
  },
  timeLabel: {
    fontSize: 14,
    color: theme.custom.colors.textSecondary,
    marginBottom: 8,
  },
  timesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeChip: {
    marginBottom: 4,
  },
  segmented: {
    marginBottom: 8,
  },
  observacoesInput: {
    backgroundColor: theme.colors.surface,
  },
  confirmBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.custom.colors.border,
  },
  confirmButton: {
    borderRadius: 8,
  },
  confirmButtonContent: {
    paddingVertical: 8,
  },
  dialogTitle: {
    textAlign: 'center',
  },
  dialogText: {
    textAlign: 'center',
    fontSize: 14,
    color: theme.custom.colors.textSecondary,
  },
});
