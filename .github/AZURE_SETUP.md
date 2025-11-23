# 🔧 Configuração Azure for Students - Guia Completo

Guia passo a passo para configurar e fazer deploy do Pet Shop no Microsoft Azure usando sua conta Azure for Students.

---

## 📑 Índice

1. [Introdução ao Azure for Students](#-introdução-ao-azure-for-students)
2. [Ativação da Conta](#-passo-1-ativar-azure-for-students)
3. [Instalação de Ferramentas](#-passo-2-instalar-ferramentas-necessárias)
4. [Criação de Recursos](#-passo-3-criar-recursos-no-azure)
5. [Configuração do Backend](#-passo-4-configurar-backend-spring-boot)
6. [Configuração do Frontend](#-passo-5-configurar-frontend-static-web-apps)
7. [Configuração do Banco de Dados](#-passo-6-configurar-banco-de-dados)
8. [GitHub Actions e CI/CD](#-passo-7-configurar-github-actions-cicd)
9. [Monitoramento e Logs](#-passo-8-monitoramento-e-logs)
10. [Otimização de Custos](#-passo-9-otimização-de-custos)
11. [Troubleshooting](#-troubleshooting-problemas-comuns)
12. [Alternativas Gratuitas](#-alternativas-completamente-gratuitas)

---

## 💰 Introdução ao Azure for Students

### O que você ganha com Azure for Students

✅ **$100 USD em créditos Azure** (renovável anualmente enquanto for estudante)  
✅ **12 meses de serviços gratuitos populares** (após os créditos)  
✅ **25+ serviços sempre gratuitos** (sem limite de tempo)  
✅ **Sem necessidade de cartão de crédito** para ativação  
✅ **Acesso a ferramentas de desenvolvedor** (Visual Studio, GitHub, etc)  
✅ **Certificações gratuitas** Microsoft Learn

### Serviços Relevantes para este Projeto

| Serviço | Tier Gratuito | Tier Pago (com créditos) | Recomendação |
|---------|---------------|--------------------------|--------------|
| **App Service** | ❌ Não | ~$13/mês (B1 Basic) | ✅ Para Backend Spring Boot |
| **Static Web Apps** | ✅ 100GB/mês | Ilimitado | ✅ **IDEAL** para Frontend |
| **Azure SQL** | ❌ Não | ~$5/mês (Basic) | ⚠️ Caro para projeto acadêmico |
| **PostgreSQL** | ❌ Não | ~$12-27/mês | ⚠️ Considere alternativas |
| **MySQL Flexible** | ❌ Não | ~$12/mês (Burstable) | ⚠️ Considere alternativas |
| **Storage Account** | ✅ 5GB LRS | + storage | ✅ Para arquivos estáticos |
| **Azure Functions** | ✅ 1M execuções | Ilimitado | ✅ Para APIs leves |
| **Application Insights** | ✅ 5GB/mês | + logs | ✅ **Essencial** para monitoramento |
| **Container Instances** | ❌ Não | ~$10/mês | 💡 Alternativa ao App Service |
| **Azure DevOps** | ✅ Ilimitado | - | ✅ CI/CD gratuito |

### 💡 Estimativa de Custos Mensais

**Opção 1: Usando Créditos (~$25-35/mês)**
- App Service B1: $13
- PostgreSQL Flexible (Burstable B1ms): $12
- Static Web Apps: GRATUITO
- Application Insights: GRATUITO (até 5GB)
- **Total: ~$25/mês** = 4 meses com $100

**Opção 2: Maximizando Gratuitos (~$13/mês)**
- App Service B1: $13
- **Banco externo gratuito** (Neon, Supabase, ElephantSQL)
- Static Web Apps: GRATUITO
- Application Insights: GRATUITO
- **Total: ~$13/mês** = 7+ meses com $100

**Opção 3: 100% Gratuito (Fora do Azure)**
- Railway/Render (Backend): GRATUITO
- Vercel/Netlify (Frontend): GRATUITO
- Neon.tech (PostgreSQL): GRATUITO
- **Total: $0/mês** = Preserva 100% dos créditos Azure

---

## 🎓 Passo 1: Ativar Azure for Students

### 1.1 Pré-requisitos

- ✅ **Email institucional ativo** (`.edu`, `.edu.br`, ou domínio da sua universidade)
- ✅ **Ser estudante universitário ativo**
- ✅ **Não ter usado Azure for Students anteriormente**

> **💡 Dica:** Se você não tem email institucional, pode usar o **GitHub Student Developer Pack** que inclui Azure, ou solicitar à sua universidade.

### 1.2 Acessar o Portal de Ativação

**URL:** https://azure.microsoft.com/pt-br/free/students/

**Passos:**

1. Clique em **"Ativar agora"** ou **"Começar gratuitamente"**
2. Faça login com sua **Conta Microsoft**
   - Se não tiver, crie uma em: https://signup.live.com
   - ⚠️ **Importante:** Use o mesmo email em que você quer receber os benefícios

3. **Verificação Acadêmica Automática:**
   - Microsoft verificará automaticamente seu status de estudante
   - Isso pode levar de alguns segundos a 2-3 dias úteis
   - Você receberá um email de confirmação

4. **Verificação Manual (se automática falhar):**
   - Você será solicitado a enviar um dos seguintes documentos:
     - Comprovante de matrícula
     - Carteirinha de estudante (frente e verso)
     - Declaração da instituição
   - Envie uma foto clara do documento
   - Aguarde aprovação (geralmente 1-3 dias úteis)

### 1.3 Verificar Ativação e Créditos

Após aprovação, acesse o **Portal Azure:**

**URL:** https://portal.azure.com

**Verifique seus créditos:**

1. No portal, clique no ícone **"💰 Custo Management + Billing"** no menu lateral
2. Ou acesse diretamente: **Subscriptions** → **Azure for Students**
3. Você verá:
   - ✅ **Saldo atual:** $100.00
   - ✅ **Data de expiração:** 12 meses da ativação
   - ✅ **Status:** Ativo

**Captura de tela esperada:**
```
Azure for Students
Status: Active
Credit remaining: $100.00
Expiration date: [Data daqui 12 meses]
```

> **⚠️ Atenção:** Os créditos expiram em 12 meses **mesmo se não forem usados**. Use-os para aprender e construir projetos!

### 1.4 Ativar Outros Benefícios (Opcional)

**GitHub Student Developer Pack:**
- **URL:** https://education.github.com/pack
- **Benefícios:** $100 DigitalOcean, $200 Heroku, domínios grátis, etc.

**JetBrains Student License:**
- **URL:** https://www.jetbrains.com/community/education/
- **Benefícios:** IntelliJ IDEA Ultimate, WebStorm, etc.

---

## 🛠️ Passo 2: Instalar Ferramentas Necessárias

### 2.1 Azure CLI (Command Line Interface)

**Por que instalar?** Permite criar e gerenciar recursos Azure via terminal, muito mais rápido que pelo portal web.

#### 🐧 Linux (Ubuntu/Debian)

```bash
# Método 1: Script oficial (recomendado)
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Método 2: Repositório apt
curl -sL https://packages.microsoft.com/keys/microsoft.asc | \
    gpg --dearmor | \
    sudo tee /etc/apt/trusted.gpg.d/microsoft.gpg > /dev/null

AZ_REPO=$(lsb_release -cs)
echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ $AZ_REPO main" | \
    sudo tee /etc/apt/sources.list.d/azure-cli.list

sudo apt-get update
sudo apt-get install azure-cli
```

#### 🍎 macOS

```bash
# Usando Homebrew (recomendado)
brew update && brew install azure-cli

# Ou usando script oficial
curl -L https://aka.ms/InstallAzureCli | bash
```

#### 🪟 Windows

**Opção 1: Instalador MSI (mais fácil)**
- Baixe: https://aka.ms/installazurecliwindows
- Execute o instalador
- Reinicie o terminal

**Opção 2: PowerShell (automático)**
```powershell
Invoke-WebRequest -Uri https://aka.ms/installazurecliwindows -OutFile .\AzureCLI.msi
Start-Process msiexec.exe -Wait -ArgumentList '/I AzureCLI.msi /quiet'
rm .\AzureCLI.msi
```

#### ✅ Verificar Instalação

```bash
# Verificar versão
az --version

# Deve aparecer algo como:
# azure-cli 2.54.0
# ...
```

### 2.2 Login no Azure CLI

```bash
# Login interativo (abrirá navegador)
az login

# Se estiver em servidor remoto/sem GUI
az login --use-device-code
```

**O que acontece:**
1. Abre o navegador automaticamente
2. Você faz login com sua conta Microsoft (estudante)
3. Terminal confirma login com suas subscrições

**Verificar subscription ativa:**
```bash
# Listar subscriptions
az account list --output table

# Deve mostrar "Azure for Students" como "True" na coluna "IsDefault"

# Se tiver múltiplas subscriptions, definir a correta:
az account set --subscription "Azure for Students"
```

### 2.3 Instalar Git (se ainda não tiver)

```bash
# Ubuntu/Debian
sudo apt-get install git

# macOS
brew install git

# Windows
# Baixar em: https://git-scm.com/download/win
```

### 2.4 Instalar Extensões do Azure CLI (Opcional mas útil)

```bash
# Extensão para Azure Static Web Apps
az extension add --name staticwebapp

# Extensão para Azure Functions
az extension add --name functionapp

# Extensão para deploy de containers
az extension add --name containerapp
```

---

## 🏗️ Passo 3: Criar Recursos no Azure

Agora vamos criar todos os recursos necessários para hospedar o Pet Shop.

### 3.1 Definir Variáveis de Configuração

Para facilitar, vamos definir variáveis que serão reutilizadas:

```bash
# Configurações gerais
RESOURCE_GROUP="petshop-rg"
LOCATION="brazilsouth"          # Menor latência para Brasil
APP_NAME="petshop"              # Nome base (será sufixado)

# Nomes dos recursos (devem ser únicos globalmente)
BACKEND_NAME="${APP_NAME}-backend-$RANDOM"
FRONTEND_NAME="${APP_NAME}-frontend"
DB_SERVER_NAME="${APP_NAME}-db-$RANDOM"
DB_NAME="petshopdb"
DB_ADMIN_USER="petshop_admin"
DB_ADMIN_PASSWORD="SuaSenhaForte123!@#"  # Troque por senha forte!

# Exibir valores
echo "Resource Group: $RESOURCE_GROUP"
echo "Backend App: $BACKEND_NAME"
echo "Frontend App: $FRONTEND_NAME"
echo "Database Server: $DB_SERVER_NAME"
```

> **⚠️ Importante:** Anote esses valores! Você precisará deles depois.

### 3.2 Criar Resource Group

O **Resource Group** é um container lógico para todos os recursos do projeto.

```bash
# Criar Resource Group
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION

# Verificar criação
az group show --name $RESOURCE_GROUP --output table
```

**Saída esperada:**
```
Name          Location      Status
------------  ------------  ---------
petshop-rg    brazilsouth   Succeeded
```

**🎯 Alternativa via Portal Web:**
1. Acesse: https://portal.azure.com
2. Pesquise "Resource groups" na barra de busca
3. Clique em **"+ Create"**
4. Preencha:
   - **Subscription:** Azure for Students
   - **Resource group:** `petshop-rg`
   - **Region:** Brazil South
5. Clique em **"Review + create"** → **"Create"**

### 3.3 Criar App Service Plan (Plano de Hospedagem)

O **App Service Plan** define os recursos computacionais (CPU, RAM) do backend.

**Opção 1: Tier B1 (Basic) - Recomendado para Produção (~$13/mês)**

```bash
az appservice plan create \
  --name "${APP_NAME}-plan" \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku B1 \
  --is-linux

# Verificar
az appservice plan show \
  --name "${APP_NAME}-plan" \
  --resource-group $RESOURCE_GROUP \
  --output table
```

**Especificações B1:**
- ✅ **1 vCPU** (100 ACU)
- ✅ **1.75 GB RAM**
- ✅ **10 GB Storage**
- ✅ **99.95% SLA**
- ✅ **SSL/TLS gratuito**
- ✅ **Domínio personalizado**

**Opção 2: Tier F1 (Free) - Para Testes (~$0/mês)**

```bash
az appservice plan create \
  --name "${APP_NAME}-plan-free" \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku F1 \
  --is-linux
```

**Limitações F1:**
- ⚠️ **60 minutos de CPU por dia**
- ⚠️ **1 GB RAM compartilhada**
- ⚠️ **1 GB Storage**
- ⚠️ **Sem SSL personalizado**
- ⚠️ **Sem SLA**
- ⚠️ **App "dorme" após 20min de inatividade**

> **💡 Recomendação:** Use F1 para testes iniciais, depois mude para B1 para produção.

### 3.4 Criar Web App para Backend Spring Boot

```bash
# Criar Web App com Java 21
az webapp create \
  --name $BACKEND_NAME \
  --resource-group $RESOURCE_GROUP \
  --plan "${APP_NAME}-plan" \
  --runtime "JAVA:21-java21"

# Verificar
az webapp show \
  --name $BACKEND_NAME \
  --resource-group $RESOURCE_GROUP \
  --query "{Name:name, State:state, URL:defaultHostName}" \
  --output table
```

**Saída esperada:**
```
Name                      State     URL
------------------------  --------  ------------------------------------
petshop-backend-12345     Running   petshop-backend-12345.azurewebsites.net
```

**🌐 Testar:** Abra `https://<seu-backend>.azurewebsites.net` no navegador.
- Você verá uma página padrão do Azure (esperado por enquanto)

**🎯 Alternativa via Portal Web:**
1. No portal, pesquise **"App Services"**
2. Clique **"+ Create"** → **"Web App"**
3. Preencha:
   - **Resource Group:** petshop-rg
   - **Name:** petshop-backend-12345 (único)
   - **Publish:** Code
   - **Runtime stack:** Java 21
   - **Java web server stack:** Java SE (Embedded Web Server)
   - **Operating System:** Linux
   - **Region:** Brazil South
   - **App Service Plan:** petshop-plan (B1)
4. **Review + create** → **Create**

### 3.5 Criar Static Web App para Frontend

**Azure Static Web Apps** é **100% GRATUITO** e perfeito para hospedar o frontend HTML/CSS/JS.

```bash
# Criar Static Web App
az staticwebapp create \
  --name $FRONTEND_NAME \
  --resource-group $RESOURCE_GROUP \
  --location "eastus2"  # Static Web Apps tem regiões limitadas

# Obter deployment token (necessário depois)
az staticwebapp secrets list \
  --name $FRONTEND_NAME \
  --resource-group $RESOURCE_GROUP \
  --query "properties.apiKey" \
  --output tsv
```

**⚠️ Importante:** Copie e salve o token retornado. Você precisará adicionar como secret no GitHub.

**Saída esperada:**
```
https://petshop-frontend-<hash>.azurestaticapps.net
```

**🎯 Alternativa via Portal Web + GitHub:**
1. No portal, pesquise **"Static Web Apps"**
2. Clique **"+ Create"**
3. Preencha:
   - **Resource Group:** petshop-rg
   - **Name:** petshop-frontend
   - **Plan type:** Free
   - **Region:** East US 2
   - **Deployment source:** GitHub
4. **Autentique com GitHub**
5. Selecione:
   - **Organization:** seu-usuario
   - **Repository:** Fundamentos-de-Sistemas-Web-Com-BackEnd
   - **Branch:** main
   - **Build Presets:** Custom
   - **App location:** `/frontend`
   - **Api location:** (deixe vazio)
   - **Output location:** (deixe vazio)
6. **Review + create** → **Create**

**O que acontece:**
- Azure cria um GitHub Actions workflow automaticamente
- Workflow faz deploy a cada push na branch `main`
- Frontend fica disponível em: `https://petshop-frontend-<hash>.azurestaticapps.net`

### 3.6 Criar Banco de Dados PostgreSQL

**Opção 1: Azure Database for PostgreSQL Flexible Server (~$12/mês)**

```bash
# Criar servidor PostgreSQL
az postgres flexible-server create \
  --name $DB_SERVER_NAME \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --admin-user $DB_ADMIN_USER \
  --admin-password $DB_ADMIN_PASSWORD \
  --sku-name Standard_B1ms \
  --tier Burstable \
  --version 16 \
  --storage-size 32 \
  --public-access 0.0.0.0

# Configurar firewall (permitir Azure services)
az postgres flexible-server firewall-rule create \
  --resource-group $RESOURCE_GROUP \
  --name $DB_SERVER_NAME \
  --rule-name AllowAzureServices \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0

# Criar database
az postgres flexible-server db create \
  --resource-group $RESOURCE_GROUP \
  --server-name $DB_SERVER_NAME \
  --database-name $DB_NAME

# Obter connection string
echo "jdbc:postgresql://${DB_SERVER_NAME}.postgres.database.azure.com:5432/${DB_NAME}?sslmode=require"
```

**Especificações B1ms:**
- ✅ **1 vCore Burstable**
- ✅ **2 GB RAM**
- ✅ **32 GB Storage**
- ✅ **Backup automático (7 dias)**
- ✅ **Alta disponibilidade opcional**
- **Custo:** ~$12/mês

**Opção 2: Usar Banco de Dados Externo Gratuito (Recomendado para economizar créditos)**

Em vez de usar Azure Database, use um dos seguintes **serviços gratuitos**:

| Serviço | Storage Gratuito | Recursos | URL |
|---------|------------------|----------|-----|
| **Neon.tech** | 3 GB | Postgres 16, Branching | https://neon.tech |
| **Supabase** | 500 MB | Postgres + Auth + Storage | https://supabase.com |
| **ElephantSQL** | 20 MB | Postgres 15 | https://elephantsql.com |
| **Aiven** | 1 projeto | Postgres, MySQL, etc | https://aiven.io |
| **Railway** | $5 crédito/mês | Postgres, MySQL, Redis | https://railway.app |

**💡 Recomendação:** Use **Neon.tech** - tem 3GB gratuitos, Postgres 16, e é muito rápido.

**Como criar no Neon.tech:**
1. Acesse: https://neon.tech
2. Faça login com GitHub
3. Create Project → Nome: `petshop-db`
4. Copie a **Connection String** (JDBC format):
   ```
   jdbc:postgresql://ep-xxx.us-east-2.aws.neon.tech/petshopdb?sslmode=require&user=petshop_admin&password=xxx
   ```
5. Use essa string no backend!

---

## ⚙️ Passo 4: Configurar Backend Spring Boot

---

## ⚙️ Passo 4: Configurar Backend

O projeto possui **dois backends alternativos**:
- ☕ **Spring Boot (Java 21)** - Mais completo e maduro
- 🟣 **ASP.NET Core (.NET 8)** - Implementação alternativa

Você pode escolher **um ou ambos** para deploy. O frontend possui um sistema de toggle para alternar entre eles.

---

## 4.A - Configurar Backend Spring Boot

### 4.A.1 Criar Perfil de Produção (`application-prod.properties`)

Crie o arquivo `backend-springboot/src/main/resources/application-prod.properties`:

```properties
# ============================================
# CONFIGURAÇÃO DE PRODUÇÃO - AZURE
# ============================================

# Server Configuration
server.port=${PORT:8080}

# Database Configuration
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=false

# SQL Initialization (desabilitar em produção)
spring.sql.init.mode=never

# H2 Console (desabilitar em produção)
spring.h2.console.enabled=false

# Logging
logging.level.root=INFO
logging.level.com.petshop=INFO
logging.level.org.hibernate.SQL=WARN

# CORS Configuration
cors.allowed-origins=${FRONTEND_URL}

# JWT Configuration (se implementar JWT)
jwt.secret=${JWT_SECRET:your-256-bit-secret-key-change-this-in-production}
jwt.expiration=86400000

# File Upload (se implementar)
spring.servlet.multipart.max-file-size=5MB
spring.servlet.multipart.max-request-size=5MB

# Actuator (monitoramento)
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=when-authorized

# Application Info
spring.application.name=PetShop API
info.app.name=PetShop API
info.app.description=Sistema de E-commerce para Pet Shop
info.app.version=1.0.0
```

### 4.A.2 Adicionar Dependência do PostgreSQL

Edite `backend-springboot/pom.xml` e adicione (se ainda não tiver):

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

### 4.A.3 Configurar Variáveis de Ambiente no Azure (Spring Boot)

**Via Azure CLI:**

```bash
# Configurar variáveis de ambiente
az webapp config appsettings set \
  --name $BACKEND_NAME \
  --resource-group $RESOURCE_GROUP \
  --settings \
    SPRING_PROFILES_ACTIVE=prod \
    DATABASE_URL="jdbc:postgresql://${DB_SERVER_NAME}.postgres.database.azure.com:5432/${DB_NAME}?sslmode=require" \
    DB_USERNAME="$DB_ADMIN_USER" \
    DB_PASSWORD="$DB_ADMIN_PASSWORD" \
    FRONTEND_URL="https://${FRONTEND_NAME}.azurestaticapps.net" \
    JWT_SECRET="$(openssl rand -base64 32)"

# Verificar
az webapp config appsettings list \
  --name $BACKEND_NAME \
  --resource-group $RESOURCE_GROUP \
  --output table
```

**Via Portal Web:**

1. Acesse: https://portal.azure.com
2. Vá em **App Services** → **petshop-backend-xxxxx**
3. No menu lateral, clique em **Configuration** (Configuração)
4. Clique em **"+ New application setting"**
5. Adicione cada variável:

| Name | Value | Exemplo |
|------|-------|---------|
| `SPRING_PROFILES_ACTIVE` | `prod` | `prod` |
| `DATABASE_URL` | JDBC URL | `jdbc:postgresql://petshop-db-12345.postgres...` |
| `DB_USERNAME` | Nome do admin | `petshop_admin` |
| `DB_PASSWORD` | Senha | `SuaSenhaForte123!@#` |
| `FRONTEND_URL` | URL do frontend | `https://petshop-frontend.azurestaticapps.net` |
| `JWT_SECRET` | Secret aleatório | `gerar com openssl rand -base64 32` |

6. Clique em **"Save"** no topo
7. **Reinicie o app** para aplicar as mudanças

### 4.A.4 Configurar CORS Dinamicamente (Spring Boot)

Atualize ou crie `backend-springboot/src/main/java/com/petshop/config/CorsConfig.java`:

```java
package com.petshop.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Value("${cors.allowed-origins:http://localhost:5500}")
    private String allowedOrigins;
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String[] origins = allowedOrigins.split(",");
        
        registry.addMapping("/api/**")
                .allowedOrigins(origins)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

### 4.A.5 Build e Deploy Manual - Spring Boot (Primeira Vez)

**Opção 1: Deploy via Maven Plugin**

Adicione ao `pom.xml`:

```xml
<plugin>
    <groupId>com.microsoft.azure</groupId>
    <artifactId>azure-webapp-maven-plugin</artifactId>
    <version>2.12.0</version>
    <configuration>
        <schemaVersion>v2</schemaVersion>
        <subscriptionId>${AZURE_SUBSCRIPTION_ID}</subscriptionId>
        <resourceGroup>petshop-rg</resourceGroup>
        <appName>${BACKEND_NAME}</appName>
        <region>brazilsouth</region>
        <runtime>
            <os>Linux</os>
            <javaVersion>Java 21</javaVersion>
            <webContainer>Java SE</webContainer>
        </runtime>
        <deployment>
            <resources>
                <resource>
                    <directory>${project.basedir}/target</directory>
                    <includes>
                        <include>*.jar</include>
                    </includes>
                </resource>
            </resources>
        </deployment>
    </configuration>
</plugin>
```

```bash
cd backend-springboot

# Build
mvn clean package -DskipTests

# Deploy
mvn azure-webapp:deploy
```

**Opção 2: Deploy via Azure CLI**

```bash
cd backend-springboot

# Build
mvn clean package -DskipTests

# Deploy JAR
az webapp deploy \
  --resource-group $RESOURCE_GROUP \
  --name $BACKEND_NAME \
  --src-path target/petshop-api-0.0.1-SNAPSHOT.jar \
  --type jar

# Verificar logs
az webapp log tail \
  --name $BACKEND_NAME \
  --resource-group $RESOURCE_GROUP
```

**Opção 3: Deploy via FTP/FTPS**

```bash
# Obter credenciais FTP
az webapp deployment list-publishing-credentials \
  --name $BACKEND_NAME \
  --resource-group $RESOURCE_GROUP

# Usar FileZilla ou similar para enviar JAR para:
# /home/site/wwwroot/app.jar
```

### 4.A.6 Verificar Deploy (Spring Boot)

```bash
# Verificar status
az webapp show \
  --name $BACKEND_NAME \
  --resource-group $RESOURCE_GROUP \
  --query state

# Ver logs em tempo real
az webapp log tail \
  --name $BACKEND_NAME \
  --resource-group $RESOURCE_GROUP

# Testar endpoint
curl https://${BACKEND_NAME}.azurewebsites.net/api/produtos
```

**Esperado:**
```json
[
  {
    "id": 1,
    "nome": "Ração Premium",
    ...
  }
]
```

### 4.A.7 Habilitar Logs de Aplicação (Spring Boot)

```bash
# Habilitar logs do aplicativo
az webapp log config \
  --name $BACKEND_NAME \
  --resource-group $RESOURCE_GROUP \
  --application-logging filesystem \
  --level information

# Ver logs HTTP
az webapp log config \
  --name $BACKEND_NAME \
  --resource-group $RESOURCE_GROUP \
  --web-server-logging filesystem
```

---

## 4.B - Configurar Backend ASP.NET Core

### 4.B.1 Criar Perfil de Produção (`appsettings.Production.json`)

Crie o arquivo `backend-aspnet/PetshopApi/appsettings.Production.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "${DATABASE_URL}"
  },
  "Jwt": {
    "SecretKey": "${JWT_SECRET}",
    "Issuer": "PetshopApi",
    "Audience": "PetshopFrontend",
    "ExpirationMinutes": "1440"
  },
  "Cors": {
    "AllowedOrigins": [
      "${FRONTEND_URL}"
    ]
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Information"
    }
  },
  "AllowedHosts": "*",
  "ApplicationInsights": {
    "ConnectionString": "${APPLICATIONINSIGHTS_CONNECTION_STRING}"
  }
}
```

### 4.B.2 Criar Web App para ASP.NET Core

```bash
# Definir variáveis
BACKEND_ASPNET_NAME="${APP_NAME}-aspnet-$RANDOM"

# Criar Web App com .NET 8
az webapp create \
  --name $BACKEND_ASPNET_NAME \
  --resource-group $RESOURCE_GROUP \
  --plan "${APP_NAME}-plan" \
  --runtime "DOTNETCORE:8.0"

# Verificar
az webapp show \
  --name $BACKEND_ASPNET_NAME \
  --resource-group $RESOURCE_GROUP \
  --query "{Name:name, State:state, URL:defaultHostName}" \
  --output table
```

### 4.B.3 Configurar Variáveis de Ambiente (ASP.NET Core)

**Converter PostgreSQL JDBC para formato .NET:**

```bash
# JDBC: jdbc:postgresql://host:5432/dbname?sslmode=require
# .NET: Host=host;Port=5432;Database=dbname;Username=user;Password=pass;SSL Mode=Require

# Exemplo de conversão
DB_HOST="${DB_SERVER_NAME}.postgres.database.azure.com"
CONNECTION_STRING="Host=${DB_HOST};Port=5432;Database=${DB_NAME};Username=${DB_ADMIN_USER};Password=${DB_ADMIN_PASSWORD};SSL Mode=Require;Trust Server Certificate=true"

# Configurar variáveis
az webapp config appsettings set \
  --name $BACKEND_ASPNET_NAME \
  --resource-group $RESOURCE_GROUP \
  --settings \
    ASPNETCORE_ENVIRONMENT=Production \
    DATABASE_URL="$CONNECTION_STRING" \
    JWT_SECRET="$(openssl rand -base64 32)" \
    FRONTEND_URL="https://${FRONTEND_NAME}.azurestaticapps.net"

# Verificar
az webapp config appsettings list \
  --name $BACKEND_ASPNET_NAME \
  --resource-group $RESOURCE_GROUP \
  --output table
```

**Via Portal Web:**

| Name | Value | Exemplo |
|------|-------|---------|
| `ASPNETCORE_ENVIRONMENT` | `Production` | `Production` |
| `DATABASE_URL` | Connection string ADO.NET | `Host=petshop-db.postgres...` |
| `JWT_SECRET` | Secret aleatório | `gerar com openssl` |
| `FRONTEND_URL` | URL do frontend | `https://petshop-frontend.azurestaticapps.net` |

### 4.B.4 Atualizar Configuração CORS e Database

Edite `backend-aspnet/PetshopApi/Program.cs` para ler variáveis de ambiente:

```csharp
// Adicione após builder.Services.AddDbContext:
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (connectionString?.Contains("${DATABASE_URL}") == true)
{
    connectionString = Environment.GetEnvironmentVariable("DATABASE_URL") 
                      ?? throw new InvalidOperationException("DATABASE_URL not set");
}

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

// Configurar CORS dinamicamente
var frontendUrl = Environment.GetEnvironmentVariable("FRONTEND_URL") 
                 ?? builder.Configuration["Cors:AllowedOrigins:0"]!;

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(frontendUrl.Split(','))
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// JWT Secret dinâmico
var jwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET") 
               ?? builder.Configuration["Jwt:SecretKey"]!;

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtSecret))
        };
    });
```

### 4.B.5 Adicionar PostgreSQL Provider

Edite `backend-aspnet/PetshopApi/PetshopApi.csproj`:

```xml
<ItemGroup>
  <!-- Já existente: SQLite -->
  <PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite" Version="8.0.0" />
  
  <!-- ADICIONAR: PostgreSQL para produção -->
  <PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL" Version="8.0.0" />
</ItemGroup>
```

### 4.B.6 Build e Deploy Manual - ASP.NET Core (Primeira Vez)

**Opção 1: Via Azure CLI (Zip Deploy)**

```bash
cd backend-aspnet/PetshopApi

# Publicar aplicação
dotnet publish -c Release -o ./publish

# Criar ZIP
cd publish
zip -r ../app.zip .
cd ..

# Deploy
az webapp deploy \
  --resource-group $RESOURCE_GROUP \
  --name $BACKEND_ASPNET_NAME \
  --src-path app.zip \
  --type zip

# Ver logs
az webapp log tail \
  --name $BACKEND_ASPNET_NAME \
  --resource-group $RESOURCE_GROUP
```

**Opção 2: Via GitHub Actions (Recomendado)**

Será configurado no Passo 7.

**Opção 3: Via Visual Studio / VS Code Azure Extension**

1. Instale a extensão "Azure App Service" no VS Code
2. Clique com botão direito no projeto
3. "Deploy to Web App..."
4. Selecione sua subscription e Web App

### 4.B.7 Verificar Deploy (ASP.NET Core)

```bash
# Verificar status
az webapp show \
  --name $BACKEND_ASPNET_NAME \
  --resource-group $RESOURCE_GROUP \
  --query state

# Testar endpoint
curl https://${BACKEND_ASPNET_NAME}.azurewebsites.net/api/produtos

# Ver logs
az webapp log tail \
  --name $BACKEND_ASPNET_NAME \
  --resource-group $RESOURCE_GROUP
```

**Esperado:**
```json
[
  {
    "id": 1,
    "nome": "Ração Premium",
    "preco": 89.90,
    ...
  }
]
```

### 4.B.8 Criar Health Check Endpoint

Adicione em `Program.cs`:

```csharp
// Antes de app.Run()
app.MapGet("/health", () => Results.Ok(new 
{ 
    status = "Healthy", 
    timestamp = DateTime.UtcNow,
    environment = builder.Environment.EnvironmentName,
    database = "Connected" // Adicione verificação real do banco
}));
```

Teste: `curl https://${BACKEND_ASPNET_NAME}.azurewebsites.net/health`

---

## 4.C - Comparação e Escolha de Backend

### Qual Backend Escolher para Produção?

| Critério | Spring Boot ☕ | ASP.NET Core 🟣 |
|----------|----------------|-----------------|
| **Maturidade do Projeto** | ⭐⭐⭐⭐⭐ Completo | ⭐⭐⭐ Parcial |
| **Funcionalidades** | Todas implementadas | Implementação básica |
| **Documentação** | Swagger completo | Swagger completo |
| **Performance** | Excelente | Excelente |
| **Consumo Memória** | ~512MB | ~300MB (mais leve) |
| **Startup Time** | ~15s | ~5s (mais rápido) |
| **Custo Azure** | Igual | Igual |
| **Suporte PostgreSQL** | Nativo (JPA) | Nativo (EF Core) |
| **Recomendação** | ✅ **Produção** | 📚 Estudo/Alternativa |

### Deploy Simultâneo (Ambos os Backends)

Você pode fazer deploy dos **dois backends simultaneamente**:

```bash
# Backend Spring Boot
BACKEND_SPRING_URL="https://petshop-backend-spring-12345.azurewebsites.net"

# Backend ASP.NET Core
BACKEND_ASPNET_URL="https://petshop-backend-aspnet-67890.azurewebsites.net"
```

No frontend, configure o toggle em `js/api-config.js`:

```javascript
const API_CONFIG = {
  SPRING_BOOT_URL: 'https://petshop-backend-spring-12345.azurewebsites.net/api',
  ASPNET_URL: 'https://petshop-backend-aspnet-67890.azurewebsites.net/api',
  
  // Alternar entre backends
  BASE_URL: localStorage.getItem('selectedBackend') === 'aspnet' 
    ? this.ASPNET_URL 
    : this.SPRING_BOOT_URL,
  
  // ... resto da configuração
};
```

---

## 🎨 Passo 5: Configurar Frontend (Static Web Apps)

### 5.1 Atualizar `api-config.js` para Produção

Edite `frontend/js/api-config.js`:

```javascript
const API_CONFIG = {
  // Detectar ambiente automaticamente
  BASE_URL: (() => {
    const hostname = window.location.hostname;
    
    // Desenvolvimento local
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:8080/api';
    }
    
    // Produção Azure
    return 'https://petshop-backend-12345.azurewebsites.net/api';
  })(),
  
  TIMEOUT: 30000,
  
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/registrar',
      VALIDATE: '/auth/validar-token',
      LOGOUT: '/auth/logout'
    },
    PRODUTOS: '/produtos',
    CATEGORIAS: '/categorias',
    SERVICOS: '/servicos',
    CLIENTES: '/clientes',
    PEDIDOS: '/pedidos',
    AGENDAMENTOS: '/agendamentos'
  }
};
```

**💡 Melhor abordagem:** Use variáveis de ambiente do build:

```javascript
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  // ...
};
```

### 5.2 Criar Arquivo de Configuração do Static Web App

Crie `frontend/staticwebapp.config.json`:

```json
{
  "routes": [
    {
      "route": "/api/*",
      "allowedRoles": ["anonymous"]
    },
    {
      "route": "/admin/*",
      "allowedRoles": ["authenticated"]
    },
    {
      "route": "/*",
      "serve": "/index.html",
      "statusCode": 200
    }
  ],
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/css/*", "/js/*", "/images/*"]
  },
  "responseOverrides": {
    "404": {
      "rewrite": "/index.html",
      "statusCode": 200
    }
  },
  "globalHeaders": {
    "content-security-policy": "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data:",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block"
  },
  "mimeTypes": {
    ".json": "application/json",
    ".js": "text/javascript",
    ".css": "text/css",
    ".html": "text/html"
  }
}
```

### 5.3 Deploy via GitHub Actions (Automático)

Se você criou o Static Web App via portal conectado ao GitHub, o workflow já foi criado automaticamente em `.github/workflows/azure-static-web-apps-*.yml`.

**Se não foi criado automaticamente,** crie `.github/workflows/deploy-frontend.yml`:

```yaml
name: Deploy Frontend to Azure Static Web Apps

on:
  push:
    branches:
      - main
    paths:
      - 'frontend/**'
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Frontend
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true

      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/frontend"
          api_location: ""
          output_location: ""

  close_pull_request:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close Pull Request
    steps:
      - name: Close Pull Request
        id: closepullrequest
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          action: "close"
```

### 5.4 Adicionar Secret no GitHub

1. Vá no seu repositório no GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Clique **"New repository secret"**
4. Nome: `AZURE_STATIC_WEB_APPS_API_TOKEN`
5. Value: (o token que você obteve no Passo 3.5)
6. **Add secret**

### 5.5 Testar Frontend

Após o deploy (automático via GitHub Actions):

1. Acesse: `https://<seu-frontend>.azurestaticapps.net`
2. Teste o login
3. Adicione produtos ao carrinho
4. Verifique console do navegador (F12) para erros de CORS

---

## 🗄️ Passo 6: Configurar Banco de Dados

### 6.1 Inicializar Schema e Dados

**Opção 1: Deixar o Hibernate criar (ddl-auto=update)**

Já configurado em `application-prod.properties`:
```properties
spring.jpa.hibernate.ddl-auto=update
```

Ao iniciar, o Spring Boot criará automaticamente as tabelas.

**Opção 2: Executar script SQL manualmente**

Crie `database/init-prod.sql`:

```sql
-- Criação das tabelas (caso necessário)
CREATE TABLE IF NOT EXISTS categoria (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS produto (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    estoque INTEGER NOT NULL DEFAULT 0,
    url_imagem VARCHAR(500),
    ativo BOOLEAN DEFAULT TRUE,
    categoria_id BIGINT REFERENCES categoria(id)
);

-- ... outras tabelas ...

-- Dados iniciais
INSERT INTO categoria (nome, descricao, ativo) VALUES
('Rações e Alimentação', 'Alimentos para seu pet', true),
('Higiene e Cuidados', 'Produtos de higiene', true),
('Acessórios e Brinquedos', 'Brinquedos e acessórios', true)
ON CONFLICT DO NOTHING;

-- ... outros dados ...
```

**Executar via Azure CLI:**

```bash
# Conectar ao banco
az postgres flexible-server execute \
  --name $DB_SERVER_NAME \
  --admin-user $DB_ADMIN_USER \
  --admin-password "$DB_ADMIN_PASSWORD" \
  --database-name $DB_NAME \
  --file-path database/init-prod.sql
```

**Ou via cliente PostgreSQL:**

```bash
# Instalar cliente (se necessário)
sudo apt-get install postgresql-client

# Conectar
psql "postgresql://${DB_ADMIN_USER}:${DB_ADMIN_PASSWORD}@${DB_SERVER_NAME}.postgres.database.azure.com:5432/${DB_NAME}?sslmode=require"

# Executar script
\i database/init-prod.sql
```

### 6.2 Backup e Restore

**Criar backup:**

```bash
# Via pg_dump
pg_dump "postgresql://${DB_ADMIN_USER}:${DB_ADMIN_PASSWORD}@${DB_SERVER_NAME}.postgres.database.azure.com:5432/${DB_NAME}?sslmode=require" > backup-$(date +%Y%m%d).sql

# Ou via Azure CLI
az postgres flexible-server backup list \
  --resource-group $RESOURCE_GROUP \
  --server-name $DB_SERVER_NAME
```

**Restore backup:**

```bash
psql "postgresql://${DB_ADMIN_USER}:${DB_ADMIN_PASSWORD}@${DB_SERVER_NAME}.postgres.database.azure.com:5432/${DB_NAME}?sslmode=require" < backup-20251123.sql
```

**Backup automático:**

Azure PostgreSQL Flexible Server já faz backup automático (7 dias de retenção por padrão).

---

## 🤖 Passo 7: Configurar GitHub Actions (CI/CD)

---

## 🤖 Passo 7: Configurar GitHub Actions (CI/CD)

### 7.1 Criar Service Principal para Autenticação

```bash
# Obter Subscription ID
SUBSCRIPTION_ID=$(az account show --query id --output tsv)
echo "Subscription ID: $SUBSCRIPTION_ID"

# Criar Service Principal
az ad sp create-for-rbac \
  --name "github-petshop-deploy" \
  --role contributor \
  --scopes /subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RESOURCE_GROUP \
  --sdk-auth

# Output (COPIE E SALVE!):
{
  "clientId": "xxx",
  "clientSecret": "xxx",
  "subscriptionId": "xxx",
  "tenantId": "xxx",
  "activeDirectoryEndpointUrl": "...",
  "resourceManagerEndpointUrl": "..."
}
```

> **⚠️ Importante:** Copie todo o JSON retornado. Você precisará dele no próximo passo.

### 7.2 Adicionar Secrets no GitHub

Acesse seu repositório no GitHub e vá em:
**Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Adicione os seguintes secrets:

| Nome do Secret | Valor | Onde obter |
|----------------|-------|------------|
| `AZURE_CREDENTIALS` | JSON completo | Output do comando `az ad sp create-for-rbac` |
| `AZURE_WEBAPP_NAME` | Nome do backend | `petshop-backend-12345` |
| `AZURE_STATIC_WEB_APPS_API_TOKEN` | Token do Static Web App | Comando do Passo 3.5 ou Portal Azure |
| `DATABASE_URL` | JDBC URL | `jdbc:postgresql://...` |
| `DB_USERNAME` | Username do banco | `petshop_admin` |
| `DB_PASSWORD` | Senha do banco | Sua senha forte |
| `JWT_SECRET` | Secret do JWT | `openssl rand -base64 32` |
| `FRONTEND_URL` | URL do frontend | `https://petshop-frontend.azurestaticapps.net` |

### 7.3 Criar Workflow de CI (Testes)

Crie `.github/workflows/ci.yml`:

```yaml
name: CI - Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test-backend:
    name: Test Backend (Spring Boot)
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Set up JDK 21
      uses: actions/setup-java@v4
      with:
        java-version: '21'
        distribution: 'temurin'
        cache: maven
    
    - name: Run tests
      working-directory: ./backend-springboot
      run: mvn clean test
    
    - name: Generate test report
      if: always()
      uses: dorny/test-reporter@v1
      with:
        name: Backend Test Results
        path: backend-springboot/target/surefire-reports/*.xml
        reporter: java-junit
        fail-on-error: false
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        files: ./backend-springboot/target/site/jacoco/jacoco.xml
        flags: backend

  test-aspnet:
    name: Test Backend (ASP.NET Core)
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Setup .NET
      uses: actions/setup-dotnet@v4
      with:
        dotnet-version: '8.0.x'
    
    - name: Restore dependencies
      working-directory: ./backend-aspnet/PetshopApi
      run: dotnet restore
    
    - name: Run tests
      working-directory: ./backend-aspnet/PetshopApi.Tests
      run: dotnet test --no-restore --verbosity normal
```

### 7.4 Criar Workflow de CD para Backend Spring Boot

Crie `.github/workflows/cd-backend-spring.yml`:

```yaml
name: CD - Deploy Backend to Azure

on:
  push:
    branches:
      - main
    paths:
      - 'backend-springboot/**'
  workflow_dispatch:

env:
  AZURE_WEBAPP_NAME: ${{ secrets.AZURE_WEBAPP_NAME }}
  JAVA_VERSION: '21'

jobs:
  build-and-deploy:
    name: Build and Deploy Spring Boot
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Set up JDK ${{ env.JAVA_VERSION }}
      uses: actions/setup-java@v4
      with:
        java-version: ${{ env.JAVA_VERSION }}
        distribution: 'temurin'
        cache: maven
    
    - name: Build with Maven
      working-directory: ./backend-springboot
      run: mvn clean package -DskipTests
    
    - name: Login to Azure
      uses: azure/login@v1
      with:
        creds: ${{ secrets.AZURE_CREDENTIALS }}
    
    - name: Deploy to Azure Web App
      uses: azure/webapps-deploy@v2
      with:
        app-name: ${{ env.AZURE_WEBAPP_NAME }}
        package: './backend-springboot/target/*.jar'
    
    - name: Set environment variables
      uses: azure/appservice-settings@v1
      with:
        app-name: ${{ env.AZURE_WEBAPP_NAME }}
        app-settings-json: |
          [
            {
              "name": "SPRING_PROFILES_ACTIVE",
              "value": "prod"
            },
            {
              "name": "DATABASE_URL",
              "value": "${{ secrets.DATABASE_URL }}"
            },
            {
              "name": "DB_USERNAME",
              "value": "${{ secrets.DB_USERNAME }}"
            },
            {
              "name": "DB_PASSWORD",
              "value": "${{ secrets.DB_PASSWORD }}"
            },
            {
              "name": "FRONTEND_URL",
              "value": "${{ secrets.FRONTEND_URL }}"
            },
            {
              "name": "JWT_SECRET",
              "value": "${{ secrets.JWT_SECRET }}"
            }
          ]
    
    - name: Verify deployment
      run: |
        echo "Aguardando inicialização..."
        sleep 30
        curl -f https://${{ env.AZURE_WEBAPP_NAME }}.azurewebsites.net/api/produtos || exit 1
    
    - name: Logout from Azure
      run: az logout
```

### 7.5 Criar Workflow de CD para Backend ASP.NET Core

Crie `.github/workflows/cd-backend-aspnet.yml`:

```yaml
name: CD - Deploy ASP.NET Core Backend to Azure

on:
  push:
    branches:
      - main
    paths:
      - 'backend-aspnet/**'
  workflow_dispatch:

env:
  AZURE_WEBAPP_NAME_ASPNET: ${{ secrets.AZURE_WEBAPP_NAME_ASPNET }}
  DOTNET_VERSION: '8.0.x'

jobs:
  build-and-deploy:
    name: Build and Deploy ASP.NET Core
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Setup .NET ${{ env.DOTNET_VERSION }}
      uses: actions/setup-dotnet@v4
      with:
        dotnet-version: ${{ env.DOTNET_VERSION }}
    
    - name: Restore dependencies
      working-directory: ./backend-aspnet/PetshopApi
      run: dotnet restore
    
    - name: Build
      working-directory: ./backend-aspnet/PetshopApi
      run: dotnet build --configuration Release --no-restore
    
    - name: Publish
      working-directory: ./backend-aspnet/PetshopApi
      run: dotnet publish -c Release -o ./publish
    
    - name: Login to Azure
      uses: azure/login@v1
      with:
        creds: ${{ secrets.AZURE_CREDENTIALS }}
    
    - name: Deploy to Azure Web App
      uses: azure/webapps-deploy@v2
      with:
        app-name: ${{ env.AZURE_WEBAPP_NAME_ASPNET }}
        package: './backend-aspnet/PetshopApi/publish'
    
    - name: Set environment variables
      uses: azure/appservice-settings@v1
      with:
        app-name: ${{ env.AZURE_WEBAPP_NAME_ASPNET }}
        app-settings-json: |
          [
            {
              "name": "ASPNETCORE_ENVIRONMENT",
              "value": "Production"
            },
            {
              "name": "DATABASE_URL",
              "value": "${{ secrets.DATABASE_URL_DOTNET }}"
            },
            {
              "name": "JWT_SECRET",
              "value": "${{ secrets.JWT_SECRET }}"
            },
            {
              "name": "FRONTEND_URL",
              "value": "${{ secrets.FRONTEND_URL }}"
            }
          ]
    
    - name: Verify deployment
      run: |
        echo "Aguardando inicialização..."
        sleep 30
        curl -f https://${{ env.AZURE_WEBAPP_NAME_ASPNET }}.azurewebsites.net/health || exit 1
    
    - name: Logout from Azure
      run: az logout
```

### 7.6 Adicionar Secrets Adicionais para ASP.NET Core

No GitHub, adicione os seguintes secrets adicionais:

| Nome do Secret | Valor | Descrição |
|----------------|-------|-----------|
| `AZURE_WEBAPP_NAME_ASPNET` | Nome do Web App ASP.NET | `petshop-aspnet-67890` |
| `DATABASE_URL_DOTNET` | Connection String ADO.NET | `Host=...;Port=5432;Database=...` |

> **💡 Nota:** `DATABASE_URL_DOTNET` usa formato ADO.NET, diferente do JDBC usado no Spring Boot.

### 7.7 Deploy Frontend (já criado automaticamente)

O workflow do Static Web App já foi criado automaticamente no Passo 5.3.

Verifique em `.github/workflows/azure-static-web-apps-*.yml`.

### 7.8 Testar Workflows

```bash
# Commit e push
git add .
git commit -m "ci: adicionar workflows GitHub Actions para Azure"
git push origin main

# Acompanhar execução
# Vá em: https://github.com/<seu-usuario>/<seu-repo>/actions
```

---

## 📊 Passo 8: Monitoramento e Logs

### 8.1 Configurar Application Insights

**Via Azure CLI:**

```bash
# Criar Application Insights
az monitor app-insights component create \
  --app petshop-insights \
  --location $LOCATION \
  --resource-group $RESOURCE_GROUP

# Obter Instrumentation Key
INSTRUMENTATION_KEY=$(az monitor app-insights component show \
  --app petshop-insights \
  --resource-group $RESOURCE_GROUP \
  --query instrumentationKey \
  --output tsv)

echo "Instrumentation Key: $INSTRUMENTATION_KEY"

# Conectar ao App Service
az webapp config appsettings set \
  --name $BACKEND_NAME \
  --resource-group $RESOURCE_GROUP \
  --settings APPINSIGHTS_INSTRUMENTATIONKEY=$INSTRUMENTATION_KEY
```

**Via Portal:**

1. Acesse o **App Service** → **petshop-backend**
2. Menu lateral → **Application Insights**
3. Clique **"Turn on Application Insights"**
4. Selecione **"Create new resource"**
5. Nome: `petshop-insights`
6. **Apply** → **Yes** (confirmar restart)

### 8.2 Adicionar Dependência no Spring Boot

Edite `backend-springboot/pom.xml`:

```xml
<dependency>
    <groupId>com.microsoft.azure</groupId>
    <artifactId>applicationinsights-spring-boot-starter</artifactId>
    <version>3.4.19</version>
</dependency>
```

Adicione em `application-prod.properties`:

```properties
# Application Insights
azure.application-insights.instrumentation-key=${APPINSIGHTS_INSTRUMENTATIONKEY}
azure.application-insights.enabled=true
```

### 8.3 Ver Logs em Tempo Real

**Via Azure CLI:**

```bash
# Logs do aplicativo
az webapp log tail \
  --name $BACKEND_NAME \
  --resource-group $RESOURCE_GROUP

# Filtrar erros
az webapp log tail \
  --name $BACKEND_NAME \
  --resource-group $RESOURCE_GROUP | grep ERROR
```

**Via Portal:**

1. **App Service** → **petshop-backend**
2. Menu lateral → **Log stream**
3. Selecione **"Application Logs"**

### 8.4 Configurar Alertas

**Via Portal:**

1. **App Service** → **petshop-backend**
2. Menu lateral → **Alerts**
3. Clique **"+ Create alert rule"**

**Alertas recomendados:**

| Métrica | Condição | Limiar | Ação |
|---------|----------|--------|------|
| **CPU Percentage** | Greater than | 80% | Email |
| **Memory Percentage** | Greater than | 85% | Email |
| **Http Server Errors** (5xx) | Greater than | 10 | Email + SMS |
| **Response Time** | Greater than | 3000ms | Email |
| **Failed Requests** | Greater than | 5 | Email |

### 8.5 Visualizar Métricas no Application Insights

**Via Portal:**

1. Acesse **Application Insights** → **petshop-insights**
2. **Application Map** - Visualizar dependências
3. **Performance** - Tempos de resposta
4. **Failures** - Erros e exceções
5. **Live Metrics** - Métricas em tempo real
6. **Logs** - Query logs com Kusto

**Exemplos de queries (Kusto Query Language):**

```kusto
// Top 10 endpoints mais lentos
requests
| where timestamp > ago(24h)
| summarize avg(duration), count() by operation_Name
| order by avg_duration desc
| take 10

// Erros nas últimas 24h
exceptions
| where timestamp > ago(24h)
| summarize count() by type, outerMessage
| order by count_ desc

// Usuários ativos
customEvents
| where timestamp > ago(24h)
| summarize dcount(user_Id)
```

### 8.6 Configurar Log Analytics (opcional)

```bash
# Criar Log Analytics Workspace
az monitor log-analytics workspace create \
  --resource-group $RESOURCE_GROUP \
  --workspace-name petshop-logs \
  --location $LOCATION

# Conectar ao App Service
WORKSPACE_ID=$(az monitor log-analytics workspace show \
  --resource-group $RESOURCE_GROUP \
  --workspace-name petshop-logs \
  --query customerId \
  --output tsv)

az monitor diagnostic-settings create \
  --name app-service-logs \
  --resource /subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RESOURCE_GROUP/providers/Microsoft.Web/sites/$BACKEND_NAME \
  --workspace $WORKSPACE_ID \
  --logs '[{"category": "AppServiceHTTPLogs", "enabled": true}]'
```

---

## 💡 Passo 9: Otimização de Custos

### 9.1 Monitorar Custos em Tempo Real

**Via Portal:**

1. **Cost Management + Billing**
2. **Cost analysis**
3. Selecione **Resource Group**: `petshop-rg`
4. Veja gastos por recurso

**Via Azure CLI:**

```bash
# Ver custos do mês atual
az consumption usage list \
  --start-date $(date -d "$(date +%Y-%m-01)" +%Y-%m-%d) \
  --end-date $(date +%Y-%m-%d) \
  --query "[].{Resource:instanceName, Cost:pretaxCost, Date:usageStart}" \
  --output table

# Criar alerta de orçamento
az consumption budget create \
  --amount 50 \
  --budget-name petshop-budget \
  --category Cost \
  --resource-group $RESOURCE_GROUP \
  --time-grain Monthly \
  --time-period start=2025-11-01 end=2026-11-01
```

### 9.2 Otimizações Recomendadas

**1. Usar Tier F1 para desenvolvimento:**

```bash
# Mudar para F1 (gratuito)
az appservice plan update \
  --name "${APP_NAME}-plan" \
  --resource-group $RESOURCE_GROUP \
  --sku F1
```

**2. Auto-shutdown em horários de baixo uso:**

```bash
# Criar Logic App para shutdown/startup automático
# Parar App Service às 23h (horário de Brasília)
# Iniciar às 7h

# Ou fazer manual:
az webapp stop --name $BACKEND_NAME --resource-group $RESOURCE_GROUP
az webapp start --name $BACKEND_NAME --resource-group $RESOURCE_GROUP
```

**3. Usar banco externo gratuito:**

- **Neon.tech** - 3GB PostgreSQL gratuito
- **Supabase** - 500MB PostgreSQL gratuito
- **ElephantSQL** - 20MB PostgreSQL gratuito

Isso economiza ~$12/mês do Azure PostgreSQL.

**4. Usar Azure Container Instances (mais barato que App Service):**

```bash
# Criar container (~$10/mês vs $13 App Service)
az container create \
  --resource-group $RESOURCE_GROUP \
  --name petshop-backend-container \
  --image <sua-imagem-docker> \
  --cpu 1 \
  --memory 1.5 \
  --dns-name-label petshop-backend \
  --ports 8080 \
  --environment-variables \
    SPRING_PROFILES_ACTIVE=prod \
    DATABASE_URL=$DATABASE_URL
```

**5. Habilitar Auto-scaling apenas se necessário:**

Por padrão, deixe em 1 instância. Só aumente se tiver muitos usuários simultâneos.

### 9.3 Análise de Custos

**Custos atuais (estimados):**

| Recurso | Tier | Custo/mês | Necessário? |
|---------|------|-----------|-------------|
| App Service (B1) | Pago | ~$13 | ✅ Sim (backend) |
| PostgreSQL (B1ms) | Pago | ~$12 | ⚠️ Use alternativa gratuita |
| Static Web Apps | Free | $0 | ✅ Sim (frontend) |
| Application Insights | Free | $0 | ✅ Sim (< 5GB logs) |
| Storage Account | Free | $0 | 📦 Opcional |
| **TOTAL** | | **~$25/mês** | |

**Com otimizações:**

| Recurso | Tier | Custo/mês | Economia |
|---------|------|-----------|----------|
| App Service (F1) | Free | $0 | ✅ -$13 |
| Neon.tech PostgreSQL | Free | $0 | ✅ -$12 |
| Static Web Apps | Free | $0 | ✅ $0 |
| **TOTAL** | | **$0/mês** | **$25/mês** |

> **💰 Resultado:** Economiza 100% dos créditos Azure para outros projetos!

---

## 🔧 Troubleshooting (Problemas Comuns)

### Problema 1: Backend não inicia (Application Error)

**Sintomas:**
- Acesso à URL retorna "Application Error"
- Logs mostram `java.lang.OutOfMemoryError`

**Solução:**

```bash
# Aumentar memória da JVM
az webapp config appsettings set \
  --name $BACKEND_NAME \
  --resource-group $RESOURCE_GROUP \
  --settings JAVA_OPTS="-Xms256m -Xmx512m"

# Ou mudar para tier superior
az appservice plan update \
  --name "${APP_NAME}-plan" \
  --resource-group $RESOURCE_GROUP \
  --sku B2  # 2 vCPU, 3.5GB RAM
```

### Problema 2: Erro de CORS no Frontend

**Sintomas:**
```
Access to fetch at 'https://backend.azurewebsites.net/api/produtos' from origin 'https://frontend.azurestaticapps.net' has been blocked by CORS policy
```

**Solução:**

```bash
# Verificar variável FRONTEND_URL no backend
az webapp config appsettings list \
  --name $BACKEND_NAME \
  --resource-group $RESOURCE_GROUP | grep FRONTEND_URL

# Atualizar se necessário
az webapp config appsettings set \
  --name $BACKEND_NAME \
  --resource-group $RESOURCE_GROUP \
  --settings FRONTEND_URL="https://petshop-frontend.azurestaticapps.net,https://petshop-frontend-xxx.azurestaticapps.net"

# Reiniciar app
az webapp restart --name $BACKEND_NAME --resource-group $RESOURCE_GROUP
```

### Problema 3: Banco de Dados não conecta

**Sintomas:**
```
org.postgresql.util.PSQLException: Connection refused
```

**Solução:**

```bash
# 1. Verificar firewall do PostgreSQL
az postgres flexible-server firewall-rule list \
  --resource-group $RESOURCE_GROUP \
  --name $DB_SERVER_NAME

# 2. Permitir Azure Services
az postgres flexible-server firewall-rule create \
  --resource-group $RESOURCE_GROUP \
  --name $DB_SERVER_NAME \
  --rule-name AllowAzure \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0

# 3. Testar conexão manualmente
psql "postgresql://${DB_ADMIN_USER}:${DB_ADMIN_PASSWORD}@${DB_SERVER_NAME}.postgres.database.azure.com:5432/${DB_NAME}?sslmode=require"
```

### Problema 4: GitHub Actions falha no deploy

**Sintomas:**
```
Error: Login failed with Error: No subscriptions found for <user>
```

**Solução:**

```bash
# 1. Recriar Service Principal
az ad sp create-for-rbac \
  --name "github-petshop-deploy-new" \
  --role contributor \
  --scopes /subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RESOURCE_GROUP \
  --sdk-auth

# 2. Atualizar secret AZURE_CREDENTIALS no GitHub

# 3. Re-run workflow
```

### Problema 5: App Service muito lento

**Sintomas:**
- Respostas lentas (> 3s)
- Timeouts frequentes

**Soluções:**

```bash
# 1. Aumentar tier
az appservice plan update \
  --name "${APP_NAME}-plan" \
  --resource-group $RESOURCE_GROUP \
  --sku B2

# 2. Habilitar Always On (evita cold start)
az webapp config set \
  --name $BACKEND_NAME \
  --resource-group $RESOURCE_GROUP \
  --always-on true

# 3. Ajustar pool de conexões do banco
# Em application-prod.properties:
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
```

### Problema 6: Logs não aparecem

**Solução:**

```bash
# Habilitar logging
az webapp log config \
  --name $BACKEND_NAME \
  --resource-group $RESOURCE_GROUP \
  --application-logging filesystem \
  --level information \
  --web-server-logging filesystem

# Ver logs
az webapp log tail --name $BACKEND_NAME --resource-group $RESOURCE_GROUP
```

---

## 🎁 Alternativas COMPLETAMENTE Gratuitas

Se quiser preservar 100% dos créditos Azure para outros projetos ou aprendizado:

### Backend (API REST)

| Serviço | Recursos Gratuitos | Limitações | Recomendação |
|---------|-------------------|------------|--------------|
| **Railway** | $5/mês de crédito | 500h/mês (suficiente) | ⭐⭐⭐⭐⭐ |
| **Render** | Instância gratuita | Sleep após 15min inatividade | ⭐⭐⭐⭐ |
| **Fly.io** | 3 VMs gratuitas | 256MB RAM cada | ⭐⭐⭐⭐ |
| **Cyclic** | Ilimitado | 100 requisições/min | ⭐⭐⭐ |
| **Oracle Cloud** | Always Free | 4 ARM cores, 24GB RAM | ⭐⭐⭐⭐⭐ (complexo) |

### Frontend (Estático)

| Serviço | Bandwidth Gratuito | Build Time | Recomendação |
|---------|-------------------|------------|--------------|
| **Vercel** | 100GB/mês | Ilimitado | ⭐⭐⭐⭐⭐ |
| **Netlify** | 100GB/mês | 300min/mês | ⭐⭐⭐⭐⭐ |
| **GitHub Pages** | Ilimitado | Via Actions | ⭐⭐⭐⭐ |
| **Cloudflare Pages** | Ilimitado | 500 builds/mês | ⭐⭐⭐⭐⭐ |
| **Surge.sh** | Ilimitado | CLI simples | ⭐⭐⭐ |

### Banco de Dados (PostgreSQL)

| Serviço | Storage Gratuito | Conexões | Recomendação |
|---------|------------------|----------|--------------|
| **Neon.tech** | 3 GB | Ilimitadas | ⭐⭐⭐⭐⭐ |
| **Supabase** | 500 MB | 60 simultâneas | ⭐⭐⭐⭐⭐ |
| **ElephantSQL** | 20 MB | 5 simultâneas | ⭐⭐⭐ |
| **Aiven** | 1 projeto | Ilimitadas | ⭐⭐⭐⭐ |
| **Railway** | Incluído no crédito | Ilimitadas | ⭐⭐⭐⭐ |

### Stack Recomendada (100% Gratuita)

```
Frontend: Vercel ou Netlify
Backend: Railway ou Fly.io
Database: Neon.tech
```

**Vantagens:**
- ✅ $0/mês permanentemente
- ✅ Sem sleep/cold start (Railway Hobby Plan)
- ✅ SSL/HTTPS automático
- ✅ Deploy via Git (CI/CD)
- ✅ Logs e métricas
- ✅ Domínio personalizado gratuito

**Como migrar:**

```bash
# 1. Deploy backend no Railway
# Acesse: https://railway.app
# Conecte GitHub → Deploy

# 2. Deploy frontend no Vercel
vercel --prod

# 3. Criar banco no Neon.tech
# Copiar connection string
# Atualizar variáveis de ambiente no Railway
```

---

## ✅ Checklist Final de Deploy

### Antes do Deploy

- [ ] Código testado localmente
- [ ] `application-prod.properties` criado
- [ ] CORS configurado corretamente
- [ ] Dependência do PostgreSQL adicionada
- [ ] Dados iniciais prontos (DataInitializer)
- [ ] Secrets sensíveis em variáveis de ambiente (não no código)
- [ ] `.gitignore` atualizado

### Recursos Azure Criados

- [ ] Resource Group criado
- [ ] App Service Plan criado (B1 ou F1)
- [ ] Web App (Backend) criado
- [ ] Static Web App (Frontend) criado
- [ ] PostgreSQL database criado (ou alternativa externa)
- [ ] Application Insights configurado
- [ ] Firewall do banco configurado

### Configurações Aplicadas

- [ ] Variáveis de ambiente no App Service
- [ ] CORS com URL do frontend
- [ ] Secrets adicionados no GitHub
- [ ] Workflows GitHub Actions criados
- [ ] SSL/HTTPS ativo (automático)
- [ ] Logs habilitados
- [ ] Alertas configurados

### Deploy e Testes

- [ ] Backend deployado com sucesso
- [ ] Frontend deployado com sucesso
- [ ] Banco de dados inicializado
- [ ] Endpoints testados via Swagger
- [ ] Login funcionando
- [ ] Carrinho funcionando
- [ ] Checkout criando pedidos
- [ ] Admin panel acessível
- [ ] Logs sendo capturados

### Pós-Deploy

- [ ] URLs documentadas no README
- [ ] Monitoramento de custos ativo
- [ ] Backup do banco configurado
- [ ] Domínio personalizado (opcional)
- [ ] SEO otimizado (opcional)
- [ ] Analytics configurado (opcional)

---

## 📚 Recursos Adicionais

### Documentação Oficial Azure

- [Azure for Students](https://aka.ms/azureforstudents) - Portal de estudante
- [Azure App Service - Java](https://learn.microsoft.com/azure/app-service/quickstart-java) - Deploy Spring Boot
- [Azure Static Web Apps](https://learn.microsoft.com/azure/static-web-apps/) - Deploy frontend
- [Azure PostgreSQL](https://learn.microsoft.com/azure/postgresql/) - Banco de dados
- [Azure CLI Reference](https://learn.microsoft.com/cli/azure/) - Comandos CLI
- [GitHub Actions + Azure](https://learn.microsoft.com/azure/developer/github/github-actions) - CI/CD

### Cursos Gratuitos Microsoft Learn

- [Azure Fundamentals](https://learn.microsoft.com/training/paths/azure-fundamentals/) - AZ-900
- [Deploy Java Apps to Azure](https://learn.microsoft.com/training/paths/deploy-java-apps-azure/)
- [Host a web app with Azure App Service](https://learn.microsoft.com/training/modules/host-a-web-app-with-azure-app-service/)
- [Publish an app to Azure with GitHub Actions](https://learn.microsoft.com/training/modules/github-actions-cd/)

### Ferramentas Úteis

- [Azure Storage Explorer](https://azure.microsoft.com/features/storage-explorer/) - Gerenciar Storage
- [Azure Data Studio](https://docs.microsoft.com/sql/azure-data-studio/) - Cliente SQL
- [Postman](https://www.postman.com/) - Testar APIs
- [VS Code Azure Extensions](https://marketplace.visualstudio.com/search?term=azure&target=VSCode) - Integração IDE

### Comunidade

- [Azure Community](https://techcommunity.microsoft.com/t5/azure/ct-p/Azure)
- [Stack Overflow - Azure](https://stackoverflow.com/questions/tagged/azure)
- [Reddit - r/AZURE](https://www.reddit.com/r/AZURE/)
- [Microsoft Q&A](https://docs.microsoft.com/answers/products/azure)

---

## 🎉 Parabéns!

Você configurou com sucesso o deploy completo do Pet Shop no Microsoft Azure!

### URLs do Projeto

**Se você fez deploy apenas do Spring Boot:**
- **Frontend:** `https://petshop-frontend-<hash>.azurestaticapps.net`
- **Backend Spring Boot:** `https://petshop-backend-<id>.azurewebsites.net`
- **Swagger Spring Boot:** `https://petshop-backend-<id>.azurewebsites.net/swagger-ui.html`

**Se você fez deploy dos dois backends:**
- **Frontend:** `https://petshop-frontend-<hash>.azurestaticapps.net`
- **Backend Spring Boot:** `https://petshop-backend-spring-<id>.azurewebsites.net`
- **Backend ASP.NET Core:** `https://petshop-backend-aspnet-<id>.azurewebsites.net`
- **Swagger Spring Boot:** `https://petshop-backend-spring-<id>.azurewebsites.net/swagger-ui.html`
- **Swagger ASP.NET Core:** `https://petshop-backend-aspnet-<id>.azurewebsites.net/swagger`

### 📊 Comparação de Custos - Dois Backends

| Configuração | Custo/mês | Duração com $100 |
|--------------|-----------|------------------|
| **1 Backend (Spring Boot)** | ~$25 | 4 meses |
| **2 Backends (Spring + ASP.NET)** | ~$38 | 2.5 meses |
| **1 Backend + Banco externo** | ~$13 | 7+ meses |
| **2 Backends + Banco externo** | ~$26 | 3.5 meses |
- **Application Insights:** Portal Azure

### 📊 Monitoramento de Custos

Acesse: https://portal.azure.com → **Cost Management + Billing**

**Lembre-se:** Você tem $100 USD para usar em 12 meses. Monitore regularmente!

### 🎓 Próximos Passos

1. ✅ Adicionar domínio personalizado
2. ✅ Implementar CI/CD completo
3. ✅ Adicionar testes automatizados
4. ✅ Configurar backup automático
5. ✅ Otimizar performance
6. ✅ Adicionar CDN para assets
7. ✅ Implementar cache com Redis

---

**Desenvolvido por:** Andreas Paulus Scherdien Berwaldt  
**Instituição:** PUCRS Online  
**Disciplina:** Fundamentos de Sistemas Web  
**Data:** Novembro de 2025  

**Repositório:** https://github.com/andreaspsb/Fundamentos-de-Sistemas-Web-Com-BackEnd

---

**💡 Dúvidas?** Consulte a [documentação do Azure](https://docs.microsoft.com/azure/) ou abra uma [issue no GitHub](https://github.com/andreaspsb/Fundamentos-de-Sistemas-Web-Com-BackEnd/issues).

**📧 Suporte Azure for Students:** azureforeducation@microsoft.com
