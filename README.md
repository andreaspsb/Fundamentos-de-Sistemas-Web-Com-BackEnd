# Fundamentos de Sistemas Web - Pet Shop (Full Stack)

Sistema completo de e-commerce e gerenciamento para Pet Shop, desenvolvido com **Spring Boot (Backend)** e **HTML5, CSS3, Bootstrap 5, JavaScript (Frontend)**.

## 📋 Descrição do Projeto

Este projeto consiste em um **sistema full-stack** completo para Pet Shop, incluindo:
- 🛒 **E-commerce** - Catálogo de produtos, carrinho de compras, checkout e pedidos
- 📅 **Agendamento** - Sistema de agendamento de serviços (banho e tosa)
- 👤 **Autenticação** - Login/logout com BCrypt e tokens
- 🔐 **Autorização** - Sistema de roles (ADMIN, CLIENTE)
- 🛠️ **Painel Admin** - CRUD completo de produtos, clientes, agendamentos e pedidos
- 📦 **API REST** - Backend Spring Boot com Swagger/OpenAPI
- 💾 **Banco H2** - Banco de dados em memória com dados iniciais

## 🎯 Funcionalidades

### 🏠 Frontend (Cliente)

#### Página Principal (`index.html`)
- Header com gradiente animado
- Navbar responsiva com menu collapse para mobile
- **Carrossel automático** de promoções com 3 slides
- 4 cards de categorias com efeitos hover
- Footer completo com informações de contato

#### Autenticação e Autorização
- **Login** (`login.html`) - Autenticação com BCrypt e tokens (24h de validade)
- **Cadastro** (`cadastro.html`) - Registro de cliente + pet + usuário (obrigatório)
- **Logout** - Limpeza de sessão e redirecionamento
- **Navbar dinâmica** - Mostra "🔐 Entrar" ou dropdown do usuário
- **Proteção de rotas** - Páginas protegidas redirecionam para login

#### Carrinho de Compras (`carrinho.html`)
- ✅ Visualização de produtos com imagem, quantidade e preço
- ✅ Ajustar quantidade (validação de estoque)
- ✅ Remover itens individuais
- ✅ Limpar carrinho completo
- ✅ Contador no navbar
- ✅ Resumo com subtotal e total
- ✅ Persistência em localStorage

#### Checkout (`checkout.html`)
- ✅ Formulário de endereço e telefone
- ✅ Seleção de forma de pagamento (PIX, Cartão, Boleto)
- ✅ Campo para observações
- ✅ Resumo do pedido
- ✅ Criação de pedido via API (integração com backend)
- ✅ Modal de sucesso após pedido
- ✅ Limpa carrinho automaticamente

#### Meus Pedidos (`meus-pedidos.html`)
- ✅ Lista de todos os pedidos do cliente
- ✅ Cards com: número, data, status, valor, forma de pagamento
- ✅ Modal com detalhes completos do pedido
- ✅ Tabela de itens do pedido
- ✅ Status coloridos (Pendente, Confirmado, Em Preparação, Enviado, Entregue, Cancelado)

### Categorias de Produtos

O sistema apresenta **3 categorias de produtos** integradas com a API:

#### 1. Rações e Alimentação (`/categorias/racoes-alimentacao/`)
- Carregamento dinâmico de produtos via API
- Botão "Adicionar ao Carrinho" com validação de estoque
- Imagens, preços e descrições do banco de dados

#### 2. Acessórios e Brinquedos (`/categorias/acessorios-brinquedos/`)
- Mesma estrutura da categoria anterior
- Integração completa com CarrinhoManager

#### 3. Higiene e Cuidados (`/categorias/higiene-cuidados/`)
- Listagem de produtos de higiene
- Sistema de carrinho integrado

### Serviços e Agendamento (`/servicos/`)

O pet shop oferece serviços de banho e tosa com **sistema de agendamento online integrado à API**:

#### Serviços Disponíveis
- **Banho** - R$ 50,00
- **Tosa** - R$ 40,00
- **Combo Banho + Tosa** - R$ 80,00

#### Agendamento Online (`/servicos/agendamento.html`)
- ✅ Formulário completo de agendamento
- ✅ Seleção interativa de serviços (cards clicáveis)
- ✅ Validação de data (não permite domingos)
- ✅ Validação de horário (8h às 18h)
- ✅ Campos para dados do cliente e pet
- ✅ Integração com API - criação de agendamento no banco
- ✅ **Requer autenticação** - protegido com AuthManager
- ✅ Confirmação com modal de sucesso

### 🛠️ Painel Administrativo (`/admin/`)

Painel completo para gerenciamento do sistema (requer role ADMIN):

#### Dashboard (`/admin/index.html`)
- 📊 Estatísticas gerais (clientes, pets, agendamentos, pedidos)
- 📈 Cards de gerenciamento com links para CRUDs
- 🎨 Interface moderna com gradiente purple

#### CRUD de Produtos (`/admin/produtos.html`)
- ✅ Listagem completa de produtos
- ✅ Modal para criar/editar produtos
- ✅ Campos: nome, descrição, preço, estoque, imagem, categoria, ativo
- ✅ Exclusão de produtos
- ✅ Integração com API
- ✅ Carregamento de categorias do banco

#### CRUD de Clientes (`/admin/clientes.html`)
- ✅ Listagem de clientes cadastrados
- ✅ Visualização de: nome, email, telefone, CPF
- ✅ Exclusão de clientes

#### CRUD de Agendamentos (`/admin/agendamentos.html`)
- ✅ Listagem de agendamentos
- ✅ Visualização de: cliente, pet, serviço, data, status
- ✅ Exclusão de agendamentos

#### CRUD de Pedidos (`/admin/pedidos.html`)
- ✅ Listagem de pedidos
- ✅ Visualização de: cliente, data, status, total
- ✅ Exclusão de pedidos

### 🔧 Backend (Spring Boot)

#### Entidades (9 totais)
1. **Usuario** - Autenticação (username, senha hash BCrypt, email, role, ativo)
2. **Cliente** - Dados do cliente (nome, CPF, telefone, email, dataNascimento, sexo, endereço)
3. **Pet** - Dados do pet (nome, tipo, raça, idade, peso, sexo, castrado, observações)
4. **Categoria** - Categorias de produtos (nome, descrição, ativo)
5. **Produto** - Produtos da loja (nome, descrição, preço, estoque, urlImagem, categoria, ativo)
6. **Servico** - Serviços oferecidos (nome, descrição, preço, ativo)
7. **Agendamento** - Agendamentos de serviços (cliente, pet, servico, dataHora, metodoEntrega, observações, status)
8. **Pedido** - Pedidos de compra (cliente, dataPedido, status, formaPagamento, valorTotal, observações)
9. **ItemPedido** - Itens do pedido (pedido, produto, quantidade, precoUnitario)

#### API REST Endpoints

**Autenticação (`/api/auth`)**
- `POST /login` - Login (retorna token)
- `POST /registrar` - Registro de usuário
- `GET /validar-token` - Validação de token
- `POST /logout` - Logout

**Clientes (`/api/clientes`)**
- `GET /` - Listar todos
- `GET /{id}` - Buscar por ID
- `POST /` - Criar
- `PUT /{id}` - Atualizar
- `DELETE /{id}` - Excluir

**Produtos (`/api/produtos`)**
- `GET /` - Listar todos
- `GET /{id}` - Buscar por ID
- `GET /categoria/{categoriaId}` - Buscar por categoria
- `POST /` - Criar
- `PUT /{id}` - Atualizar
- `DELETE /{id}` - Excluir

**Pedidos (`/api/pedidos`)**
- `GET /` - Listar todos
- `GET /{id}` - Buscar por ID
- `GET /cliente/{clienteId}` - Buscar por cliente
- `POST /` - Criar pedido
- `POST /{pedidoId}/itens` - Adicionar item
- `DELETE /{pedidoId}/itens/{itemId}` - Remover item
- `POST /{id}/confirmar` - Confirmar pedido
- `PATCH /{id}/status` - Atualizar status
- `POST /{id}/cancelar` - Cancelar pedido

**Agendamentos (`/api/agendamentos`)**
- `GET /` - Listar todos
- `GET /{id}` - Buscar por ID
- `GET /cliente/{clienteId}` - Buscar por cliente
- `POST /` - Criar
- `PUT /{id}` - Atualizar
- `DELETE /{id}` - Excluir

**Categorias (`/api/categorias`)**
- `GET /` - Listar todas
- `GET /{id}` - Buscar por ID

**Serviços (`/api/servicos`)**
- `GET /` - Listar todos
- `GET /{id}` - Buscar por ID

#### Dados Iniciais (DataInitializer)

O sistema cria automaticamente ao iniciar:
- ✅ **3 Categorias** (Rações, Higiene, Acessórios)
- ✅ **6 Produtos** (2 por categoria com estoque)
- ✅ **3 Serviços** (Banho, Tosa, Combo)
- ✅ **1 Usuário Admin** (admin/admin123 com senha hash BCrypt)

## 📁 Estrutura do Projeto

```
/
├── frontend/                            # 🎨 Frontend (Cliente)
│   ├── admin/                           # Painel administrativo
│   │   ├── index.html                   # Dashboard admin
│   │   ├── produtos.html                # CRUD produtos
│   │   ├── clientes.html                # Gestão clientes
│   │   ├── agendamentos.html            # Gestão agendamentos
│   │   └── pedidos.html                 # Gestão pedidos
│   ├── categorias/                      # Páginas de categorias
│   │   ├── racoes-alimentacao/
│   │   ├── acessorios-brinquedos/
│   │   └── higiene-cuidados/
│   ├── servicos/                        # Serviços e agendamento
│   │   ├── index.html                   # Lista de serviços
│   │   └── agendamento.html             # Formulário de agendamento
│   ├── css/
│   │   └── style.css                    # Estilos customizados
│   ├── js/
│   │   ├── api-config.js                # Configuração da API
│   │   ├── auth.js                      # AuthManager (autenticação)
│   │   ├── carrinho.js                  # CarrinhoManager (carrinho)
│   │   ├── produtos.js                  # Gestão de produtos
│   │   ├── cadastro.js                  # Lógica de cadastro
│   │   ├── agendamento.js               # Lógica de agendamento
│   │   └── script.js                    # Scripts gerais
│   ├── index.html                       # Página inicial
│   ├── login.html                       # Página de login
│   ├── cadastro.html                    # Cadastro de cliente
│   ├── carrinho.html                    # Carrinho de compras
│   ├── checkout.html                    # Finalização de compra
│   └── meus-pedidos.html                # Histórico de pedidos
│
├── backend-springboot/                  # ☕ Backend (API REST)
│   ├── src/
│   │   └── main/
│   │       ├── java/com/petshop/
│   │       │   ├── PetshopApplication.java
│   │       │   ├── config/              # Configurações (CORS, DataInitializer)
│   │       │   ├── controller/          # Controllers REST (7)
│   │       │   ├── dto/                 # Data Transfer Objects (6+)
│   │       │   ├── model/               # Entidades JPA (9)
│   │       │   ├── repository/          # Repositórios Spring Data (9)
│   │       │   └── service/             # Lógica de negócio (5)
│   │       └── resources/
│   │           └── application.properties
│   ├── pom.xml                          # Maven dependencies
│   ├── README.md                        # 📚 Documentação completa da API
│   └── target/                          # Build artifacts (ignorado)
│
├── docs/                                # 📖 Documentação
│   ├── ACESSIBILIDADE.md                # Conformidade WCAG 2.1
│   ├── GUIA_CSS_BOOTSTRAP.md            # Guia de estilos
│   ├── GUIA_JAVASCRIPT.md               # Guia de JavaScript
│   └── INTEGRACAO_FRONTEND_BACKEND.md   # Guia de integração
│
├── tests/                               # 🧪 Testes
│   ├── teste-backend.html               # Teste de integração com API
│   └── README.md                        # Documentação de testes
│
├── .gitignore                           # Arquivos ignorados pelo Git
└── README.md                            # 📄 Este arquivo
    │       │   ├── repository/
    │       │   │   ├── UsuarioRepository.java
    │       │   │   ├── ClienteRepository.java
    │       │   │   ├── PetRepository.java
    │       │   │   ├── CategoriaRepository.java
    │       │   │   ├── ProdutoRepository.java
    │       │   │   ├── ServicoRepository.java
    │       │   │   ├── AgendamentoRepository.java
    │       │   │   └── PedidoRepository.java
    │       │   ├── service/
    │       │   │   ├── AuthService.java
    │       │   │   ├── ClienteService.java
    │       │   │   ├── ProdutoService.java
    │       │   │   ├── PedidoService.java
    │       │   │   └── AgendamentoService.java
    │       │   └── dto/
    │       │       ├── LoginDTO.java
    │       │       ├── PedidoRequestDTO.java
    │       │       ├── PedidoResponseDTO.java
    │       │       ├── ItemPedidoRequestDTO.java
    │       │       └── ItemPedidoDTO.java
    │       └── resources/
    │           └── application.properties
    └── target/
```

## 🚀 Como Executar

### Pré-requisitos

- **Java 21** (OpenJDK ou Oracle JDK)
- **Maven 3.8+**
- **Navegador moderno** (Chrome, Firefox, Edge)

### 1. Iniciar o Backend (Spring Boot)

```bash
# Navegar para o diretório do backend
cd backend-springboot

# Compilar o projeto
mvn clean compile

# Executar o servidor Spring Boot
mvn spring-boot:run
```

O backend estará disponível em: **http://localhost:8080**

Documentação da API (Swagger): **http://localhost:8080/swagger-ui.html**

### 2. Iniciar o Frontend

#### Opção A: Live Server (VS Code) - Recomendado
1. Instale a extensão "Live Server" no VS Code
2. Abra a pasta `frontend/` no VS Code
3. Clique com botão direito em `index.html`
4. Selecione "Open with Live Server"

#### Opção B: Servidor HTTP Python
```bash
# Na pasta frontend
cd frontend
python3 -m http.server 5500
```
Acesse: **http://localhost:5500**

#### Opção C: Abrir diretamente
- Navegue até `frontend/` e abra `index.html` no navegador
- **Nota:** Algumas funcionalidades podem não funcionar devido a restrições CORS

### 3. Acessar o Sistema

**Frontend:** http://localhost:5500 (Live Server) ou http://localhost:5500 (Python)  
**Backend API:** http://localhost:8080  
**Swagger UI:** http://localhost:8080/swagger-ui.html  
**H2 Console:** http://localhost:8080/h2-console  
- JDBC URL: `jdbc:h2:mem:petshopdb`
- Username: `sa`
- Password: (deixar em branco)

### 4. Credenciais Padrão

**Admin:**
- Username: `admin`
- Senha: `admin123`

**Nota:** Para acessar o painel admin, faça login com essas credenciais.

## 🛠️ Tecnologias Utilizadas

### Backend
- **Java 21** - Linguagem de programação
- **Spring Boot 3.2.0** - Framework Java
- **Spring Data JPA** - Persistência de dados
- **H2 Database** - Banco de dados em memória
- **Spring Security Crypto** - BCrypt para hash de senhas
- **Swagger/OpenAPI** - Documentação automática da API
- **Maven** - Gerenciamento de dependências
- **Lombok** - Redução de boilerplate

### Frontend
- **HTML5** - Estrutura semântica das páginas
- **CSS3** - Estilos customizados, animações e transições
- **Bootstrap 5.3.0** - Framework CSS responsivo (via CDN)
- **JavaScript (Vanilla)** - Interatividade e integração com API
- **Bootstrap Icons** - Ícones
- **Unsplash** - Imagens externas de alta qualidade

### Arquitetura
- **API REST** - Comunicação cliente-servidor
- **SPA parcial** - JavaScript carrega dados dinamicamente
- **localStorage** - Persistência de carrinho e autenticação no client-side
- **CORS habilitado** - Permite chamadas cross-origin
- **DTO Pattern** - Separação entre entidades e dados da API

## 📝 Características Técnicas

### Backend (Spring Boot)

#### Segurança
- ✅ **BCrypt** - Hash de senhas com força 10
- ✅ **Tokens** - Autenticação baseada em tokens (Base64: username:timestamp)
- ✅ **Validação de token** - Tokens expiram após 24 horas
- ✅ **Roles** - ADMIN e CLIENTE com permissões diferentes
- ✅ **CORS** - Configuração para aceitar requisições do frontend

#### Persistência
- ✅ **JPA/Hibernate** - ORM para mapeamento objeto-relacional
- ✅ **H2 Database** - Banco em memória para desenvolvimento
- ✅ **Cascade** - Operações em cascata para relacionamentos
- ✅ **Validações** - Bean Validation com anotações (@NotNull, @Size, @Email)

#### API REST
- ✅ **Controllers** - 7 controllers REST
- ✅ **Services** - Camada de negócio separada
- ✅ **Repositories** - Spring Data JPA
- ✅ **DTOs** - Separação de entidades e dados da API
- ✅ **Swagger** - Documentação automática da API
- ✅ **ResponseEntity** - Controle de status HTTP

### Frontend (JavaScript)

#### Autenticação
- ✅ **AuthManager** - Classe centralizada para autenticação
- ✅ **localStorage** - Persistência de token e dados do usuário
- ✅ **Proteção de rotas** - Páginas protegidas redirecionam para login
- ✅ **Navbar dinâmica** - Mostra estado de autenticação
- ✅ **Relative paths** - Navegação funciona em qualquer subdiretório

#### Carrinho de Compras
- ✅ **CarrinhoManager** - Classe centralizada para gestão do carrinho
- ✅ **Validação de estoque** - Impede adicionar mais que o disponível
- ✅ **Contador no navbar** - Badge atualizado em tempo real
- ✅ **Persistência** - Carrinho salvo em localStorage
- ✅ **Toast notifications** - Feedback visual ao usuário

#### Integração com API
- ✅ **Fetch API** - Requisições HTTP assíncronas
- ✅ **async/await** - Código mais limpo
- ✅ **Error handling** - try/catch em todas as chamadas
- ✅ **Loading states** - Spinners durante carregamento
- ✅ **Dynamic rendering** - Conteúdo carregado do backend

## 📊 Estatísticas do Projeto

### Frontend
- **Páginas HTML**: 15+
- **Arquivos JavaScript**: 6
- **Arquivos CSS**: 1 (+ Bootstrap CDN)
- **Linhas de Código JS**: ~2000+
- **Linhas de CSS**: ~300

### Backend
- **Entidades JPA**: 9
- **Controllers REST**: 7
- **Services**: 5
- **Repositories**: 9
- **DTOs**: 6+
- **Endpoints API**: 40+
- **Linhas de Código Java**: ~3000+

### Funcionalidades
- ✅ Sistema de autenticação completo
- ✅ Carrinho de compras funcional
- ✅ Checkout integrado com backend
- ✅ Histórico de pedidos
- ✅ Agendamento de serviços
- ✅ Painel administrativo com CRUDs
- ✅ Validação de estoque
- ✅ Cálculo automático de totais
- ✅ Proteção de rotas por role

## 🔐 Segurança

- ✅ **BCrypt** - Senhas nunca armazenadas em texto plano
- ✅ **Tokens** - Autenticação baseada em tokens com validade
- ✅ **Validação** - Input validation no backend e frontend
- ✅ **CORS** - Configurado corretamente para produção
- ✅ **SQL Injection** - Protegido via JPA/Hibernate
- ✅ **XSS** - Prevenido via escape de HTML no frontend

## 🎯 Fluxos Principais

### Fluxo de Compra
1. Cliente navega pelos produtos
2. Adiciona produtos ao carrinho (validação de estoque)
3. Visualiza carrinho e ajusta quantidades
4. Clica em "Finalizar Compra"
5. Sistema verifica autenticação (redireciona para login se necessário)
6. Preenche dados de entrega e pagamento
7. Confirma pedido
8. Backend cria pedido e itens
9. Modal de sucesso exibido
10. Carrinho limpo automaticamente
11. Cliente pode ver pedido em "Meus Pedidos"

### Fluxo de Cadastro
1. Cliente acessa página de cadastro
2. Preenche dados pessoais e do pet
3. Sistema valida e cria cliente + pet
4. Solicita criação de usuário (OBRIGATÓRIO)
5. Auto-sugere username baseado no nome
6. Valida senha (mínimo 6 caracteres)
7. Backend cria usuário com senha hash BCrypt
8. Redireciona para login
9. Cliente faz login e pode usar o sistema

### Fluxo de Agendamento
1. Cliente acessa página de serviços
2. Clica em "Agendar" ou acessa diretamente
3. Sistema verifica autenticação
4. Seleciona serviço(s), data, horário
5. Preenche dados do pet
6. Backend valida e cria agendamento
7. Confirmação exibida

## 📚 Documentação Adicional

### 📖 Guias Disponíveis
- **[docs/ACESSIBILIDADE.md](docs/ACESSIBILIDADE.md)** - Conformidade WCAG 2.1
- **[docs/GUIA_CSS_BOOTSTRAP.md](docs/GUIA_CSS_BOOTSTRAP.md)** - Guia de estilos e componentes
- **[docs/GUIA_JAVASCRIPT.md](docs/GUIA_JAVASCRIPT.md)** - Guia de JavaScript e boas práticas
- **[docs/INTEGRACAO_FRONTEND_BACKEND.md](docs/INTEGRACAO_FRONTEND_BACKEND.md)** - Guia de integração
- **[docs/DEPLOY.md](docs/DEPLOY.md)** - 🚀 Guia completo de deploy em produção
- **[backend-springboot/README.md](backend-springboot/README.md)** - Documentação completa da API
- **[tests/README.md](tests/README.md)** - Guia de testes e validações

### 🔗 Recursos Online
- **Swagger UI** - http://localhost:8080/swagger-ui.html (API interativa)
- **H2 Console** - http://localhost:8080/h2-console (Banco de dados)

## 🚧 Melhorias Futuras

### Backend
- [ ] Implementar JWT (JSON Web Tokens)
- [ ] Implementar refresh tokens
- [ ] Migrar para PostgreSQL em produção
- [ ] Adicionar paginação nas listagens
- [ ] Implementar filtros avançados
- [ ] Upload de imagens de produtos
- [ ] Notificações por email
- [ ] Relatórios e dashboards
- [ ] Testes unitários e integração
- [ ] Docker e Docker Compose
- [ ] CI/CD com GitHub Actions

### Frontend
- [ ] Adicionar filtros e busca nas páginas admin
- [ ] Gráficos no dashboard admin (Chart.js)
- [ ] Botões de alteração de status (pedidos/agendamentos)
- [ ] Sistema de avaliações de produtos
- [ ] Lista de desejos (wishlist)
- [ ] Histórico de navegação
- [ ] Comparador de produtos
- [ ] Chat de suporte

### Infraestrutura
- [ ] Deploy em cloud (ver [docs/DEPLOY.md](docs/DEPLOY.md))
- [ ] Monitoramento e logs (Sentry, New Relic)
- [ ] Cache com Redis
- [ ] CDN para imagens
- [ ] Backup automatizado
- [ ] Arquitetura de microsserviços

## 📄 Licença

Projeto educacional - Fundamentos de Sistemas Web - PUCRS Online

---

**Desenvolvido por:** Andreas Paulus Scherdien Berwaldt  
**Instituição:** PUCRS Online  
**Disciplina:** Fundamentos de Sistemas Web  
**Data:** Novembro de 2025
