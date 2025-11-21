# 🔧 Configuração Azure for Students

Guia completo para aproveitar seus créditos Azure for Students e fazer deploy do Pet Shop.

## 💰 O que você ganha com Azure for Students

✅ **$100 USD em créditos** (renovável anualmente)  
✅ **12 meses de serviços gratuitos**  
✅ **25+ serviços sempre gratuitos**  
✅ Sem necessidade de cartão de crédito

### Serviços Relevantes para este Projeto:

| Serviço | Gratuito | Pago (com créditos) |
|---------|----------|---------------------|
| **App Service** | Não | ~$13/mês (B1) |
| **Static Web Apps** | ✅ 100GB/mês | Ilimitado |
| **Azure SQL** | Não | ~$5/mês (Basic) |
| **PostgreSQL** | Não | ~$27/mês (B1) |
| **Storage** | ✅ 5GB | + storage |
| **Functions** | ✅ 1M execuções | Mais execuções |
| **DevOps** | ✅ Ilimitado | - |

---

## 📋 Passo 1: Ativar Azure for Students

### 1.1 Acessar Portal
```
https://azure.microsoft.com/pt-br/free/students/
```

### 1.2 Login com Email Institucional
- Use seu email `.edu.br` da universidade
- Microsoft verificará automaticamente
- **Sem necessidade de cartão**

### 1.3 Verificar Créditos
```bash
# No Azure Portal:
1. Acesse portal.azure.com
2. Vá em "Subscriptions"
3. Verifique: $100 USD disponível
```

---

## 🚀 Passo 2: Criar Recursos no Azure

### 2.1 Criar Resource Group

```bash
# Via Azure CLI (instalar: https://aka.ms/InstallAzureCli)
az login

# Criar grupo de recursos
az group create \
  --name petshop-rg \
  --location brazilsouth
```

Ou via Portal:
1. Portal Azure → Resource Groups → Create
2. Nome: `petshop-rg`
3. Região: **Brazil South** (menor latência)

### 2.2 Criar App Service Plan (Backend)

```bash
# Criar plano B1 (Basic)
az appservice plan create \
  --name petshop-plan \
  --resource-group petshop-rg \
  --sku B1 \
  --is-linux
```

**Custo**: ~$13/mês (seus créditos cobrem 7+ meses)

### 2.3 Criar Web App para Backend

```bash
# Criar app Spring Boot
az webapp create \
  --name petshop-backend \
  --resource-group petshop-rg \
  --plan petshop-plan \
  --runtime "JAVA:21-java21"
```

### 2.4 Criar Static Web App (Frontend)

```bash
# Criar Static Web App (GRATUITO)
az staticwebapp create \
  --name petshop-frontend \
  --resource-group petshop-rg \
  --location "East US 2"
```

**Custo**: **GRATUITO** (100GB bandwidth/mês)

### 2.5 Criar PostgreSQL Database

```bash
# Criar servidor PostgreSQL
az postgres flexible-server create \
  --name petshop-db \
  --resource-group petshop-rg \
  --location brazilsouth \
  --admin-user petshop_admin \
  --admin-password "SuaSenhaForte123!" \
  --sku-name Standard_B1ms \
  --tier Burstable \
  --storage-size 32

# Criar database
az postgres flexible-server db create \
  --resource-group petshop-rg \
  --server-name petshop-db \
  --database-name petshop
```

**Custo**: ~$12/mês

---

## 🔐 Passo 3: Configurar Secrets no GitHub

### 3.1 Criar Service Principal

```bash
# Criar SP para GitHub Actions
az ad sp create-for-rbac \
  --name "github-petshop-deploy" \
  --role contributor \
  --scopes /subscriptions/{subscription-id}/resourceGroups/petshop-rg \
  --sdk-auth

# Output (salvar como AZURE_CREDENTIALS no GitHub):
{
  "clientId": "xxx",
  "clientSecret": "xxx",
  "subscriptionId": "xxx",
  "tenantId": "xxx"
}
```

### 3.2 Adicionar Secrets no GitHub

Vá em: `Settings → Secrets and variables → Actions → New repository secret`

| Nome | Valor | Onde obter |
|------|-------|------------|
| `AZURE_CREDENTIALS` | JSON do SP | Comando acima |
| `AZURE_STATIC_WEB_APPS_API_TOKEN` | Token do Static Web App | Portal Azure → Static Web App → Overview |
| `AZURE_DB_URL` | `jdbc:postgresql://...` | Portal Azure → PostgreSQL |
| `AZURE_DB_USERNAME` | `petshop_admin` | Definido na criação |
| `AZURE_DB_PASSWORD` | Sua senha | Definida na criação |
| `SONAR_TOKEN` | Token SonarCloud | sonarcloud.io (opcional) |

---

## ⚙️ Passo 4: Configurar Backend para Produção

### 4.1 Criar `application-prod.properties`

```bash
# Em backend-springboot/src/main/resources/
```

```properties
# Database
spring.datasource.url=${AZURE_DB_URL}
spring.datasource.username=${AZURE_DB_USERNAME}
spring.datasource.password=${AZURE_DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=update

# Azure específico
server.port=8080
spring.jpa.show-sql=false

# Security
jwt.secret=${JWT_SECRET}
jwt.expiration=86400000

# CORS
app.cors.allowed-origins=https://petshop-frontend.azurestaticapps.net
```

### 4.2 Configurar Environment Variables no Azure

```bash
# Configurar variáveis de ambiente
az webapp config appsettings set \
  --name petshop-backend \
  --resource-group petshop-rg \
  --settings \
    SPRING_PROFILES_ACTIVE=prod \
    AZURE_DB_URL="jdbc:postgresql://petshop-db.postgres.database.azure.com:5432/petshop" \
    AZURE_DB_USERNAME=petshop_admin \
    AZURE_DB_PASSWORD="SuaSenhaForte123!" \
    JWT_SECRET="seu-secret-jwt-super-seguro-256-bits"
```

---

## 🎯 Passo 5: Deploy Manual (Primeira Vez)

### 5.1 Deploy Backend

```bash
# Build local
cd backend-springboot
mvn clean package -DskipTests

# Deploy via Azure CLI
az webapp deploy \
  --resource-group petshop-rg \
  --name petshop-backend \
  --src-path target/petshop-0.0.1-SNAPSHOT.jar \
  --type jar
```

### 5.2 Deploy Frontend

```bash
# Instalar SWA CLI
npm install -g @azure/static-web-apps-cli

# Deploy
cd frontend
swa deploy \
  --app-location . \
  --api-location "" \
  --output-location "" \
  --deployment-token <SEU_TOKEN>
```

---

## 🤖 Passo 6: Configurar CI/CD Automático

### 6.1 Workflow já criado

Os arquivos `.github/workflows/` já estão prontos:
- ✅ `ci-tests.yml` - Testa em cada push
- ✅ `cd-azure.yml` - Deploy automático
- ✅ `security-scan.yml` - Scan de segurança

### 6.2 Ativar Workflows

```bash
# Fazer commit dos workflows
git add .github/
git commit -m "ci: adicionar workflows GitHub Actions + Azure"
git push origin main

# GitHub Actions começará automaticamente
```

### 6.3 Ajustar Nomes no Workflow

Edite `.github/workflows/cd-azure.yml`:

```yaml
env:
  AZURE_WEBAPP_NAME: petshop-backend    # Seu nome do App Service
```

---

## 📊 Passo 7: Monitoramento e Logs

### 7.1 Application Insights (GRATUITO)

```bash
# Criar Application Insights
az monitor app-insights component create \
  --app petshop-insights \
  --location brazilsouth \
  --resource-group petshop-rg
```

### 7.2 Ver Logs em Tempo Real

```bash
# Logs do backend
az webapp log tail \
  --name petshop-backend \
  --resource-group petshop-rg

# Ou via Portal:
# Azure Portal → App Service → Log stream
```

### 7.3 Configurar Alertas

Portal Azure → Monitor → Alerts:
- CPU > 80%
- Memory > 80%
- Response time > 3s
- HTTP 5xx errors

---

## 💡 Dicas para Economizar Créditos

### Opção 1: Usar Tier GRATUITO
```bash
# App Service F1 (GRATUITO, mas limitado)
az appservice plan create \
  --name petshop-plan-free \
  --resource-group petshop-rg \
  --sku F1
```
**Limitações**: 60 min CPU/dia, 1GB RAM

### Opção 2: Auto-shutdown (Desenvolvimento)
```bash
# Desligar App Service quando não estiver usando
az webapp stop \
  --name petshop-backend \
  --resource-group petshop-rg

# Ligar novamente
az webapp start \
  --name petshop-backend \
  --resource-group petshop-rg
```

### Opção 3: Container Instances (mais barato)
```bash
# Rodar em container (~$10/mês)
az container create \
  --resource-group petshop-rg \
  --name petshop-backend-container \
  --image petshop-backend:latest \
  --cpu 1 \
  --memory 1.5 \
  --ports 8080
```

---

## 🎓 Alternativas COMPLETAMENTE GRATUITAS

Se quiser preservar 100% dos créditos para outros projetos:

### Backend:
1. **Railway** - 500h/mês gratuito
2. **Render** - Instância gratuita (sleep após 15min)
3. **Heroku** - Eco Dynos $5/mês (ou gratuito com limitações)
4. **Oracle Cloud** - Always Free Tier (ARM instances)

### Frontend:
1. **Vercel** - Ilimitado gratuito ✅
2. **Netlify** - 100GB/mês gratuito ✅
3. **GitHub Pages** - Ilimitado ✅
4. **Cloudflare Pages** - Ilimitado ✅

### Database:
1. **Neon.tech** - PostgreSQL gratuito (3GB)
2. **PlanetScale** - MySQL gratuito (5GB)
3. **Supabase** - PostgreSQL gratuito (500MB)
4. **ElephantSQL** - PostgreSQL gratuito (20MB)

---

## 📚 Recursos Adicionais

### Documentação:
- [Azure for Students](https://aka.ms/azureforstudents)
- [Azure App Service Java](https://learn.microsoft.com/azure/app-service/quickstart-java)
- [Static Web Apps](https://learn.microsoft.com/azure/static-web-apps/)
- [Azure CLI Reference](https://learn.microsoft.com/cli/azure/)

### Cursos Gratuitos:
- [Microsoft Learn - Azure Fundamentals](https://learn.microsoft.com/training/paths/azure-fundamentals/)
- [Deploy Java Apps](https://learn.microsoft.com/training/paths/deploy-java-apps-azure/)

### Monitoramento de Custos:
```bash
# Ver consumo de créditos
az consumption usage list \
  --start-date 2025-11-01 \
  --end-date 2025-11-30

# Ou Portal:
# Cost Management + Billing → Cost analysis
```

---

## ✅ Checklist Final

- [ ] Azure for Students ativado
- [ ] Resource Group criado
- [ ] App Service para backend criado
- [ ] Static Web App para frontend criado
- [ ] PostgreSQL database criado
- [ ] Secrets configurados no GitHub
- [ ] `application-prod.properties` criado
- [ ] Environment variables configuradas
- [ ] Workflows testados
- [ ] Application Insights configurado
- [ ] Alertas de custo configurados

---

**Custo Estimado Mensal:**
- App Service B1: $13
- PostgreSQL B1ms: $12
- Static Web Apps: **GRATUITO**
- Application Insights: **GRATUITO**
- **TOTAL: ~$25/mês** (4 meses com $100)

**Ou usar opções gratuitas e economizar 100% dos créditos! 🎉**
