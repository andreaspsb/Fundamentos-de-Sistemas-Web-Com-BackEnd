# 🧪 Testes - Pet Shop

Área para testes e validações do sistema Pet Shop.

## 📄 Arquivos de Teste

### teste-backend.html
Página de teste para validar integração com a API do backend.

**Funcionalidades:**
- Testa conexão com o backend
- Valida endpoints da API
- Verifica autenticação
- Testa CRUD de entidades

## 🚀 Como Usar

### 1. Iniciar o Backend
```bash
cd backend-springboot
mvn spring-boot:run
```

### 2. Abrir o arquivo de teste
- Método 1: Abrir `teste-backend.html` diretamente no navegador
- Método 2: Usar Live Server no VSCode
- Método 3: Servir com Python:
```bash
cd tests
python3 -m http.server 8001
```

Acessar: http://localhost:8001/teste-backend.html

## ✅ Checklist de Testes

### Backend API
- [ ] Backend rodando em http://localhost:8080
- [ ] Endpoints retornando JSON válido
- [ ] CORS configurado corretamente
- [ ] Validações de dados funcionando
- [ ] Erros retornando status HTTP corretos

### Autenticação
- [ ] Login com credenciais válidas
- [ ] Login com credenciais inválidas
- [ ] Token sendo gerado corretamente
- [ ] Token expirando após 24h
- [ ] Logout limpando sessão

### Entidades CRUD
- [ ] Criar registros
- [ ] Listar registros
- [ ] Buscar por ID
- [ ] Atualizar registros
- [ ] Deletar registros

### Validações
- [ ] CPF único (não permitir duplicado)
- [ ] Email único (não permitir duplicado)
- [ ] Username único (não permitir duplicado)
- [ ] Campos obrigatórios validados
- [ ] Formatos de dados validados (email, CPF, telefone)

### Fluxos Completos
- [ ] Cadastro de cliente + pet + usuário
- [ ] Login do cliente
- [ ] Adicionar produtos ao carrinho
- [ ] Finalizar pedido
- [ ] Ver histórico de pedidos
- [ ] Agendar serviço
- [ ] Ver agendamentos

## 🐛 Testes Conhecidos

### Sucesso ✅
- Login admin/admin123 funciona
- CRUD de produtos funciona
- CRUD de categorias funciona
- CRUD de serviços funciona
- Carrinho localStorage funciona

### Atenção ⚠️
- Banco H2 em memória - dados perdidos ao reiniciar
- Não há cliente criado por padrão no DataInitializer
- Necessário cadastrar cliente antes de criar pedidos
- Data de agendamento deve ser futura

## 📊 Status Esperados

### Sucesso (200-299)
- `200 OK` - Requisição bem-sucedida
- `201 Created` - Recurso criado
- `204 No Content` - Sucesso sem corpo de resposta

### Erro Cliente (400-499)
- `400 Bad Request` - Dados inválidos
- `404 Not Found` - Recurso não encontrado
- `409 Conflict` - Conflito (ex: CPF duplicado)

### Erro Servidor (500-599)
- `500 Internal Server Error` - Erro no servidor

## 🔧 Ferramentas Úteis

### cURL
Testar endpoints via linha de comando:
```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","senha":"admin123"}'

# Listar produtos
curl http://localhost:8080/api/produtos/disponiveis
```

### Postman / Insomnia
Importar coleção de endpoints para testar a API

### Swagger UI
Acessar: http://localhost:8080/swagger-ui.html
- Documentação interativa da API
- Testar endpoints diretamente
- Ver schemas de dados

### H2 Console
Acessar: http://localhost:8080/h2-console
- Ver dados no banco
- Executar queries SQL
- Debug de relacionamentos

## 📝 Notas

- Sempre reiniciar o backend antes de testes importantes
- Limpar localStorage do navegador para testes de autenticação
- Verificar console do navegador para erros JavaScript
- Verificar logs do Spring Boot para erros do backend

---

**Última atualização:** Novembro de 2025
