# Pet Shop Mobile 📱

Aplicativo mobile para o Pet Shop desenvolvido com React Native e Expo.

## 🚀 Tecnologias

- **React Native** com Expo
- **TypeScript** para tipagem estática
- **React Navigation** para navegação
- **React Native Paper** para componentes UI (Material Design)
- **Axios** para requisições HTTP
- **Expo SecureStore** para armazenamento seguro

## 📱 Funcionalidades

### Cliente
- ✅ Login e Cadastro
- ✅ Navegação por categorias de produtos
- ✅ Busca de produtos
- ✅ Detalhes do produto
- ✅ Carrinho de compras
- ✅ Checkout com múltiplas formas de pagamento
- ✅ Histórico de pedidos
- ✅ Acompanhamento de status do pedido
- ✅ Agendamento de serviços (banho, tosa)
- ✅ Visualização de agendamentos
- ✅ Perfil do usuário

## 🏗️ Estrutura do Projeto

```
mobile/
├── App.tsx                 # Componente raiz
├── src/
│   ├── theme.ts            # Configuração do tema
│   ├── types/              # Definições de tipos TypeScript
│   ├── services/           # Serviços (API, Storage)
│   ├── contexts/           # Contextos React (Auth, Cart)
│   ├── navigation/         # Configuração de navegação
│   ├── screens/            # Telas do aplicativo
│   │   ├── auth/           # Login, Cadastro
│   │   ├── home/           # Home, Produtos
│   │   ├── cart/           # Carrinho, Checkout
│   │   ├── orders/         # Pedidos
│   │   └── profile/        # Perfil, Agendamentos
│   ├── components/         # Componentes reutilizáveis
│   └── utils/              # Funções utilitárias
```

## 🛠️ Instalação

### Desenvolvimento Local
```bash
# Navegar para a pasta mobile
cd mobile

# Instalar dependências
npm install

# Iniciar o projeto
npx expo start
```

### Com Docker
```bash
# Na raiz do projeto, subir todos os serviços
docker-compose up -d

# O app mobile estará disponível em:
# http://localhost:8081
```

## 📲 Executando

### Emulador Android
```bash
npm run android
```

### Emulador iOS (apenas macOS)
```bash
npm run ios
```

### Expo Go (dispositivo físico)
1. Instale o app Expo Go no celular
2. Execute `npx expo start`
3. Escaneie o QR Code

## ⚙️ Configuração da API

O app detecta automaticamente o ambiente:

| Ambiente | URL da API |
|----------|------------|
| Docker (Web) | `http://localhost:8080/api` |
| Emulador Android | `http://10.0.2.2:8080/api` |
| Produção | `https://api.petshop.com/api` |

Para alterar manualmente, edite o arquivo `src/services/api.ts`.

### Conectando com dispositivo físico

Para testar em dispositivo físico na mesma rede:

1. Descubra o IP da sua máquina (ex: `192.168.1.100`)
2. Altere a URL no `api.ts`:
   ```typescript
   const API_BASE_URL = 'http://192.168.1.100:8080/api';
   ```
3. Certifique-se que o backend está acessível nesse IP

## 🔐 Autenticação

O app utiliza JWT (JSON Web Token) para autenticação:
- Token armazenado de forma segura com Expo SecureStore
- Renovação automática ao expirar
- Logout limpa todos os dados sensíveis

## 🛒 Carrinho

- Persistência local com SecureStore
- Validação de estoque em tempo real
- Atualização de quantidade com limites

## 📦 Dependências Principais

```json
{
  "react-native-paper": "^5.x",
  "@react-navigation/native": "^6.x",
  "@react-navigation/native-stack": "^6.x",
  "@react-navigation/bottom-tabs": "^6.x",
  "axios": "^1.x",
  "expo-secure-store": "^12.x"
}
```

## 🎨 Tema

As cores seguem o padrão do frontend web:
- **Primary**: `#2563eb` (Azul)
- **Secondary**: `#10b981` (Verde)
- **Accent**: `#f59e0b` (Laranja)
- **Error**: `#ef4444` (Vermelho)

## 📱 Screenshots

*Em breve*

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.
