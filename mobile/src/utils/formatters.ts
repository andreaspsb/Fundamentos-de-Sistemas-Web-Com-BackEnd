// Formatadores baseados no frontend web

/**
 * Formata valor para moeda brasileira
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Formata CPF: 000.000.000-00
 */
export function formatCPF(cpf: string): string {
  const numbers = cpf.replace(/\D/g, '');
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Remove formatação do CPF
 */
export function unformatCPF(cpf: string): string {
  return cpf.replace(/\D/g, '');
}

/**
 * Formata telefone: (00) 00000-0000 ou (00) 0000-0000
 */
export function formatPhone(phone: string): string {
  const numbers = phone.replace(/\D/g, '');
  if (numbers.length === 11) {
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
}

/**
 * Remove formatação do telefone
 */
export function unformatPhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

/**
 * Formata data para exibição: DD/MM/YYYY
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('pt-BR');
}

/**
 * Formata data para API: YYYY-MM-DD
 */
export function formatDateForApi(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Formata horário: HH:MM
 */
export function formatTime(time: string): string {
  return time.substring(0, 5);
}

/**
 * Formata status do pedido para exibição
 */
export function formatOrderStatus(status: string): string {
  const statusMap: Record<string, string> = {
    PENDENTE: 'Pendente',
    CONFIRMADO: 'Confirmado',
    EM_PREPARACAO: 'Em Preparação',
    ENVIADO: 'Enviado',
    ENTREGUE: 'Entregue',
    CANCELADO: 'Cancelado',
  };
  return statusMap[status] || status;
}

/**
 * Retorna cor do status do pedido
 */
export function getOrderStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    PENDENTE: '#f59e0b',      // Amarelo
    CONFIRMADO: '#3b82f6',    // Azul
    EM_PREPARACAO: '#8b5cf6', // Roxo
    ENVIADO: '#10b981',       // Verde
    ENTREGUE: '#059669',      // Verde escuro
    CANCELADO: '#ef4444',     // Vermelho
  };
  return colorMap[status] || '#64748b';
}

/**
 * Formata status do agendamento para exibição
 */
export function formatAppointmentStatus(status: string): string {
  const statusMap: Record<string, string> = {
    AGENDADO: 'Agendado',
    CONFIRMADO: 'Confirmado',
    EM_ANDAMENTO: 'Em Andamento',
    CONCLUIDO: 'Concluído',
    CANCELADO: 'Cancelado',
  };
  return statusMap[status] || status;
}

/**
 * Retorna cor do status do agendamento
 */
export function getAppointmentStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    AGENDADO: '#f59e0b',      // Amarelo
    CONFIRMADO: '#3b82f6',    // Azul
    EM_ANDAMENTO: '#8b5cf6',  // Roxo
    CONCLUIDO: '#10b981',     // Verde
    CANCELADO: '#ef4444',     // Vermelho
  };
  return colorMap[status] || '#64748b';
}

/**
 * Formata forma de pagamento para exibição
 */
export function formatPaymentMethod(method: string): string {
  const methodMap: Record<string, string> = {
    PIX: 'PIX',
    CARTAO_CREDITO: 'Cartão de Crédito',
    CARTAO_DEBITO: 'Cartão de Débito',
    BOLETO: 'Boleto',
    DINHEIRO: 'Dinheiro',
  };
  return methodMap[method] || method;
}

/**
 * Formata tipo de pet para exibição
 */
export function formatPetType(type: string): string {
  const typeMap: Record<string, string> = {
    cao: 'Cão',
    gato: 'Gato',
    passaro: 'Pássaro',
    coelho: 'Coelho',
    outro: 'Outro',
  };
  return typeMap[type] || type;
}

/**
 * Formata porte do pet para exibição
 */
export function formatPetSize(size: string): string {
  const sizeMap: Record<string, string> = {
    PEQUENO: 'Pequeno',
    MEDIO: 'Médio',
    GRANDE: 'Grande',
  };
  return sizeMap[size] || size;
}

/**
 * Formata método de atendimento para exibição
 */
export function formatServiceMethod(method: string): string {
  const methodMap: Record<string, string> = {
    TELEBUSCA: 'Tele-busca',
    LOCAL: 'No Local',
  };
  return methodMap[method] || method;
}
