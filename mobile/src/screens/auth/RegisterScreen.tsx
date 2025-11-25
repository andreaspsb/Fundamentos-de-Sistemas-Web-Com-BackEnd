import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  SegmentedButtons,
  Snackbar,
  Divider,
} from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../../theme';
import { useAuth } from '../../contexts/AuthContext';
import { AuthStackParamList } from '../../navigation/types';
import { Cliente } from '../../types';
import { formatCPF, formatPhone, unformatCPF, unformatPhone } from '../../utils/formatters';
import { validateCliente } from '../../utils/validators';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Dados do cliente
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState<'M' | 'F' | 'O'>('M');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');

  // Dados de acesso
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleCPFChange(value: string) {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      setCpf(formatCPF(numbers));
    }
  }

  function handlePhoneChange(value: string) {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      setTelefone(formatPhone(numbers));
    }
  }

  function handleDateChange(value: string) {
    // Formata como DD/MM/YYYY
    const numbers = value.replace(/\D/g, '');
    let formatted = '';
    if (numbers.length >= 1) formatted = numbers.substring(0, 2);
    if (numbers.length >= 3) formatted += '/' + numbers.substring(2, 4);
    if (numbers.length >= 5) formatted += '/' + numbers.substring(4, 8);
    setDataNascimento(formatted);
  }

  function generateUsername() {
    if (nome.trim()) {
      const parts = nome.trim().toLowerCase().split(' ');
      const suggested = parts[0] + (parts[parts.length - 1] !== parts[0] ? parts[parts.length - 1] : '');
      setUsername(suggested.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
    }
  }

  async function handleRegister() {
    // Validar senha
    if (senha.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return;
    }
    if (senha !== confirmaSenha) {
      setError('As senhas não conferem');
      return;
    }

    // Converter data para formato API
    const dateParts = dataNascimento.split('/');
    const dataFormatada = dateParts.length === 3
      ? `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
      : '';

    const cliente: Omit<Cliente, 'id'> = {
      nome: nome.trim(),
      cpf: unformatCPF(cpf),
      telefone: unformatPhone(telefone),
      email: email.trim(),
      dataNascimento: dataFormatada,
      sexo,
      endereco: endereco.trim(),
      numero: numero.trim(),
      complemento: complemento.trim() || undefined,
      bairro: bairro.trim(),
      cidade: cidade.trim(),
    };

    // Validar cliente
    const validation = validateCliente(cliente);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setError('Corrija os erros no formulário');
      return;
    }

    setLoading(true);
    setError('');
    setErrors({});

    try {
      await register(cliente, username.trim(), senha);
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer cadastro');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Preencha seus dados para se cadastrar</Text>

        {/* Dados Pessoais */}
        <Text style={styles.sectionTitle}>Dados Pessoais</Text>

        <TextInput
          label="Nome completo *"
          value={nome}
          onChangeText={setNome}
          onBlur={generateUsername}
          mode="outlined"
          error={!!errors.nome}
          style={styles.input}
        />
        {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

        <TextInput
          label="CPF *"
          value={cpf}
          onChangeText={handleCPFChange}
          mode="outlined"
          keyboardType="numeric"
          error={!!errors.cpf}
          style={styles.input}
        />
        {errors.cpf && <Text style={styles.errorText}>{errors.cpf}</Text>}

        <TextInput
          label="Telefone *"
          value={telefone}
          onChangeText={handlePhoneChange}
          mode="outlined"
          keyboardType="phone-pad"
          error={!!errors.telefone}
          style={styles.input}
        />
        {errors.telefone && <Text style={styles.errorText}>{errors.telefone}</Text>}

        <TextInput
          label="Email *"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          error={!!errors.email}
          style={styles.input}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          label="Data de nascimento (DD/MM/AAAA) *"
          value={dataNascimento}
          onChangeText={handleDateChange}
          mode="outlined"
          keyboardType="numeric"
          error={!!errors.dataNascimento}
          style={styles.input}
        />
        {errors.dataNascimento && <Text style={styles.errorText}>{errors.dataNascimento}</Text>}

        <Text style={styles.label}>Sexo</Text>
        <SegmentedButtons
          value={sexo}
          onValueChange={(value) => setSexo(value as 'M' | 'F' | 'O')}
          buttons={[
            { value: 'M', label: 'Masculino' },
            { value: 'F', label: 'Feminino' },
            { value: 'O', label: 'Outro' },
          ]}
          style={styles.segmented}
        />

        <Divider style={styles.divider} />

        {/* Endereço */}
        <Text style={styles.sectionTitle}>Endereço</Text>

        <TextInput
          label="Endereço *"
          value={endereco}
          onChangeText={setEndereco}
          mode="outlined"
          error={!!errors.endereco}
          style={styles.input}
        />
        {errors.endereco && <Text style={styles.errorText}>{errors.endereco}</Text>}

        <View style={styles.row}>
          <TextInput
            label="Número *"
            value={numero}
            onChangeText={setNumero}
            mode="outlined"
            keyboardType="numeric"
            error={!!errors.numero}
            style={[styles.input, styles.smallInput]}
          />
          <TextInput
            label="Complemento"
            value={complemento}
            onChangeText={setComplemento}
            mode="outlined"
            style={[styles.input, styles.largeInput]}
          />
        </View>

        <TextInput
          label="Bairro *"
          value={bairro}
          onChangeText={setBairro}
          mode="outlined"
          error={!!errors.bairro}
          style={styles.input}
        />
        {errors.bairro && <Text style={styles.errorText}>{errors.bairro}</Text>}

        <TextInput
          label="Cidade *"
          value={cidade}
          onChangeText={setCidade}
          mode="outlined"
          error={!!errors.cidade}
          style={styles.input}
        />
        {errors.cidade && <Text style={styles.errorText}>{errors.cidade}</Text>}

        <Divider style={styles.divider} />

        {/* Dados de Acesso */}
        <Text style={styles.sectionTitle}>Dados de Acesso</Text>

        <TextInput
          label="Nome de usuário *"
          value={username}
          onChangeText={setUsername}
          mode="outlined"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />

        <TextInput
          label="Senha *"
          value={senha}
          onChangeText={setSenha}
          mode="outlined"
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          style={styles.input}
        />

        <TextInput
          label="Confirmar senha *"
          value={confirmaSenha}
          onChangeText={setConfirmaSenha}
          mode="outlined"
          secureTextEntry={!showPassword}
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleRegister}
          loading={loading}
          disabled={loading}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Cadastrar
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          Já tem conta? Entrar
        </Button>
      </ScrollView>

      <Snackbar
        visible={!!error}
        onDismiss={() => setError('')}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => setError(''),
        }}
      >
        {error}
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: theme.custom.colors.textSecondary,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.custom.colors.text,
    marginBottom: 16,
    marginTop: 8,
  },
  input: {
    marginBottom: 12,
    backgroundColor: theme.colors.surface,
  },
  label: {
    fontSize: 14,
    color: theme.custom.colors.textSecondary,
    marginBottom: 8,
  },
  segmented: {
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  smallInput: {
    flex: 1,
  },
  largeInput: {
    flex: 2,
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  backButton: {
    marginTop: 16,
    marginBottom: 32,
  },
  errorText: {
    fontSize: 12,
    color: theme.custom.colors.error,
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 4,
  },
});
