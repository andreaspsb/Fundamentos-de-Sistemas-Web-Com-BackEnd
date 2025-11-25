// Validadores baseados no frontend web

/**
 * Valida CPF
 */
export function validateCPF(cpf: string): boolean {
  const numbers = cpf.replace(/\D/g, '');
  
  if (numbers.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(numbers)) return false;
  
  // Valida dígitos verificadores
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(numbers.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(numbers.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(numbers.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(numbers.charAt(10))) return false;
  
  return true;
}

/**
 * Valida email
 */
export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida telefone (10 ou 11 dígitos)
 */
export function validatePhone(phone: string): boolean {
  const numbers = phone.replace(/\D/g, '');
  return numbers.length >= 10 && numbers.length <= 11;
}

/**
 * Valida senha (mínimo 6 caracteres)
 */
export function validatePassword(password: string): boolean {
  return password.length >= 6;
}

/**
 * Valida nome (mínimo 3 caracteres)
 */
export function validateName(name: string): boolean {
  return name.trim().length >= 3;
}

/**
 * Valida data de nascimento (deve ter pelo menos 18 anos)
 */
export function validateBirthDate(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  
  let age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    age--;
  }
  
  return age >= 18;
}

/**
 * Valida campos obrigatórios
 */
export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Valida formulário de cliente
 */
export interface ClienteValidation {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateCliente(cliente: {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  dataNascimento: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
}): ClienteValidation {
  const errors: Record<string, string> = {};
  
  if (!validateName(cliente.nome)) {
    errors.nome = 'Nome deve ter pelo menos 3 caracteres';
  }
  
  if (!validateCPF(cliente.cpf)) {
    errors.cpf = 'CPF inválido';
  }
  
  if (!validatePhone(cliente.telefone)) {
    errors.telefone = 'Telefone inválido';
  }
  
  if (!validateEmail(cliente.email)) {
    errors.email = 'Email inválido';
  }
  
  if (!cliente.dataNascimento) {
    errors.dataNascimento = 'Data de nascimento é obrigatória';
  }
  
  if (!validateRequired(cliente.endereco)) {
    errors.endereco = 'Endereço é obrigatório';
  }
  
  if (!validateRequired(cliente.numero)) {
    errors.numero = 'Número é obrigatório';
  }
  
  if (!validateRequired(cliente.bairro)) {
    errors.bairro = 'Bairro é obrigatório';
  }
  
  if (!validateRequired(cliente.cidade)) {
    errors.cidade = 'Cidade é obrigatória';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Valida formulário de pet
 */
export function validatePet(pet: {
  nome: string;
  tipo: string;
  raca: string;
  idade: number;
  peso: number;
}): ClienteValidation {
  const errors: Record<string, string> = {};
  
  if (!pet.nome || pet.nome.length < 2) {
    errors.nome = 'Nome deve ter pelo menos 2 caracteres';
  }
  
  if (!pet.tipo) {
    errors.tipo = 'Tipo é obrigatório';
  }
  
  if (!pet.raca) {
    errors.raca = 'Raça é obrigatória';
  }
  
  if (pet.idade < 0 || pet.idade > 30) {
    errors.idade = 'Idade deve estar entre 0 e 30';
  }
  
  if (pet.peso < 0.1 || pet.peso > 100) {
    errors.peso = 'Peso deve estar entre 0.1 e 100 kg';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
