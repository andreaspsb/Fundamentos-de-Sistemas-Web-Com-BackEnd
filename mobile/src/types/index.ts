// Tipos baseados na API do backend

export interface Cliente {
  id?: number;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  dataNascimento: string;
  sexo: 'M' | 'F' | 'O';
  endereco: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
}

export interface Pet {
  id?: number;
  nome: string;
  tipo: 'cao' | 'gato' | 'passaro' | 'coelho' | 'outro';
  raca: string;
  idade: number;
  peso: number;
  sexo: 'M' | 'F';
  castrado: boolean;
  observacoes?: string;
  temAlergia: boolean;
  precisaMedicacao: boolean;
  comportamentoAgressivo: boolean;
  clienteId: number;
}

export interface Categoria {
  id: number;
  nome: string;
  descricao: string;
  ativa: boolean;
}

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidadeEstoque: number;
  urlImagem?: string;
  ativo: boolean;
  categoriaId: number;
  categoria?: Categoria;
}

export interface Servico {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  duracaoMinutos: number;
  ativo: boolean;
}

export interface ItemCarrinho {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  quantidadeEstoque: number;
  urlImagem?: string;
}

export interface ItemPedido {
  id?: number;
  produtoId: number;
  produto?: Produto;
  quantidade: number;
  precoUnitario: number;
}

export type FormaPagamento = 'PIX' | 'CARTAO_CREDITO' | 'CARTAO_DEBITO' | 'BOLETO' | 'DINHEIRO';

export type StatusPedido = 'PENDENTE' | 'CONFIRMADO' | 'EM_PREPARACAO' | 'ENVIADO' | 'ENTREGUE' | 'CANCELADO';

export interface Pedido {
  id: number;
  clienteId: number;
  cliente?: Cliente;
  dataPedido: string;
  status: StatusPedido;
  formaPagamento: FormaPagamento;
  valorTotal: number;
  observacoes?: string;
  itens: ItemPedido[];
}

export interface CriarPedido {
  clienteId: number;
  formaPagamento: FormaPagamento;
  observacoes?: string;
  itens: {
    produtoId: number;
    quantidade: number;
  }[];
}

export type MetodoAtendimento = 'TELEBUSCA' | 'LOCAL';
export type PortePet = 'PEQUENO' | 'MEDIO' | 'GRANDE';
export type StatusAgendamento = 'AGENDADO' | 'CONFIRMADO' | 'EM_ANDAMENTO' | 'CONCLUIDO' | 'CANCELADO';

export interface Agendamento {
  id: number;
  clienteId: number;
  cliente?: Cliente;
  petId: number;
  pet?: Pet;
  dataAgendamento: string;
  horario: string;
  metodoAtendimento: MetodoAtendimento;
  portePet: PortePet;
  status: StatusAgendamento;
  observacoes?: string;
  servicos: Servico[];
}

export interface CriarAgendamento {
  clienteId: number;
  petId: number;
  dataAgendamento: string;
  horario: string;
  metodoAtendimento: MetodoAtendimento;
  portePet: PortePet;
  observacoes?: string;
  servicoIds: number[];
}

export interface LoginRequest {
  username: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'CLIENTE';
  clienteId?: number;
}

export interface UserData {
  token: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'CLIENTE';
  clienteId?: number;
}

export interface RegisterRequest {
  cliente: Omit<Cliente, 'id'>;
  pet?: Omit<Pet, 'id' | 'clienteId'>;
  username: string;
  senha: string;
}
