# 🚀 Guia de Deploy - Pet Shop Full Stack

Guia completo para fazer deploy do sistema Pet Shop em produção.

## 📋 Índice

- [Pré-requisitos](#pré-requisitos)
- [Deploy do Backend](#deploy-do-backend)
  - [Heroku](#heroku)
  - [Railway](#railway)
  - [AWS Elastic Beanstalk](#aws-elastic-beanstalk)
  - [Render](#render)
- [Deploy do Frontend](#deploy-do-frontend)
  - [Vercel](#vercel)
  - [Netlify](#netlify)
  - [GitHub Pages](#github-pages)
- [Configuração de Banco de Dados](#configuração-de-banco-de-dados)
  - [PostgreSQL](#postgresql)
  - [MySQL](#mysql)
- [Configurações de Produção](#configurações-de-produção)
- [Checklist de Deploy](#checklist-de-deploy)

---

## 🎯 Pré-requisitos

- Conta nos serviços de hospedagem escolhidos
- Git instalado e configurado
- Código no GitHub/GitLab
- Variáveis de ambiente configuradas

## ☕ Deploy do Backend

### 1. Heroku

**Vantagens:** Fácil deploy, PostgreSQL grátis, CI/CD automático  
**Desvantagens:** Sleep após 30 min de inatividade (plano free)

#### Passo a Passo:

1. **Instalar Heroku CLI:**
```bash
# Linux
curl https://cli-assets.heroku.com/install.sh | sh

# macOS
brew tap heroku/brew && brew install heroku

# Windows
# Baixar instalador em: https://devcenter.heroku.com/articles/heroku-cli
```

2. **Login no Heroku:**
```bash
heroku login
```

3. **Criar aplicação:**
```bash
cd backend-springboot
heroku create petshop-backend
```

4. **Adicionar PostgreSQL:**
```bash
heroku addons:create heroku-postgresql:mini
```

5. **Configurar variáveis de ambiente:**
```bash
heroku config:set SPRING_PROFILES_ACTIVE=prod
heroku config:set JWT_SECRET=seu_secret_super_seguro_aqui
```

6. **Criar `Procfile` na raiz do backend:**
```
web: java -Dserver.port=$PORT -Dspring.profiles.active=prod -jar target/petshop-backend-0.0.1-SNAPSHOT.jar
```

7. **Criar `system.properties`:**
```
java.runtime.version=21
```

8. **Fazer deploy:**
```bash
git add .
git commit -m "Configuração para Heroku"
git push heroku main
```

9. **Abrir aplicação:**
```bash
heroku open
```

---

### 2. Railway

**Vantagens:** Deploy super fácil, $5 grátis/mês, PostgreSQL incluído  
**Desvantagens:** Limite de $5 no plano free

#### Passo a Passo:

1. Acesse [railway.app](https://railway.app)
2. Conecte com GitHub
3. Clique em "New Project" → "Deploy from GitHub repo"
4. Selecione o repositório
5. Railway detecta automaticamente o Spring Boot
6. Adicione PostgreSQL: "New" → "Database" → "PostgreSQL"
7. Configure variáveis de ambiente:
   - `SPRING_PROFILES_ACTIVE=prod`
   - `DATABASE_URL` (gerado automaticamente)
8. Deploy automático a cada push!

**URL gerada:** `https://petshop-backend-production.up.railway.app`

---

### 3. AWS Elastic Beanstalk

**Vantagens:** Escalável, profissional, integração AWS  
**Desvantagens:** Complexo, pode ter custos

#### Passo a Passo:

1. **Instalar EB CLI:**
```bash
pip install awsebcli
```

2. **Inicializar:**
```bash
cd backend-springboot
eb init -p java-21 petshop-backend --region us-east-1
```

3. **Criar ambiente:**
```bash
eb create petshop-prod --database.engine postgres
```

4. **Fazer deploy:**
```bash
mvn clean package
eb deploy
```

5. **Abrir aplicação:**
```bash
eb open
```

---

### 4. Render

**Vantagens:** Simples, PostgreSQL grátis, SSL automático  
**Desvantagens:** Cold start no plano free

#### Passo a Passo:

1. Acesse [render.com](https://render.com)
2. Conecte com GitHub
3. "New" → "Web Service"
4. Selecione o repositório
5. Configure:
   - **Name:** `petshop-backend`
   - **Root Directory:** `backend-springboot`
   - **Build Command:** `mvn clean package -DskipTests`
   - **Start Command:** `java -jar target/petshop-backend-0.0.1-SNAPSHOT.jar`
   - **Instance Type:** Free
6. Adicione PostgreSQL: "New" → "PostgreSQL" → "Free"
7. Conecte banco ao web service
8. Deploy automático!

---

## 🎨 Deploy do Frontend

### 1. Vercel

**Vantagens:** Deploy instantâneo, CDN global, domínio grátis  
**Melhor para:** Frontend estático

#### Passo a Passo:

1. Instalar Vercel CLI:
```bash
npm install -g vercel
```

2. Fazer deploy:
```bash
cd frontend
vercel --prod
```

**OU via Interface Web:**
1. Acesse [vercel.com](https://vercel.com)
2. Conecte com GitHub
3. "New Project" → Selecione repositório
4. Configure:
   - **Framework Preset:** Other
   - **Root Directory:** `frontend`
   - **Build Command:** (deixar vazio)
   - **Output Directory:** `.`
5. Deploy!

**URL gerada:** `https://petshop-frontend.vercel.app`

#### Configurar variáveis de ambiente:
```bash
# Criar arquivo frontend/.env.production
VITE_API_URL=https://petshop-backend-production.up.railway.app/api
```

---

### 2. Netlify

**Vantagens:** Simples, formulários grátis, redirects fáceis  
**Melhor para:** Sites estáticos e SPAs

#### Passo a Passo:

1. **Via Drag & Drop:**
   - Acesse [netlify.com](https://netlify.com)
   - Arraste a pasta `frontend/` para o site

2. **Via GitHub:**
   - "New site from Git" → GitHub
   - Selecione repositório
   - Configure:
     - **Base directory:** `frontend`
     - **Build command:** (vazio)
     - **Publish directory:** `frontend`
   - Deploy!

3. **Criar `frontend/netlify.toml`:**
```toml
[build]
  base = "frontend"
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**URL gerada:** `https://petshop-frontend.netlify.app`

---

### 3. GitHub Pages

**Vantagens:** Grátis, integrado com GitHub  
**Desvantagens:** Apenas sites estáticos

#### Passo a Passo:

1. **Criar branch `gh-pages`:**
```bash
git checkout -b gh-pages
```

2. **Mover conteúdo do frontend para raiz:**
```bash
git filter-branch --subdirectory-filter frontend -- --all
```

3. **Push:**
```bash
git push origin gh-pages
```

4. **Configurar no GitHub:**
   - Settings → Pages
   - Source: `gh-pages` branch
   - Save

**URL:** `https://andreaspsb.github.io/Fundamentos-de-Sistemas-Web-Com-BackEnd/`

---

## 🗄️ Configuração de Banco de Dados

### PostgreSQL (Recomendado para Produção)

#### 1. Atualizar `pom.xml`:
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

#### 2. Criar `application-prod.properties`:
```properties
# Banco de dados
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false

# Porta
server.port=${PORT:8080}

# CORS (ajustar com sua URL do frontend)
cors.allowed-origins=${FRONTEND_URL:https://petshop-frontend.vercel.app}
```

#### 3. Atualizar `CorsConfig.java`:
```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Value("${cors.allowed-origins}")
    private String allowedOrigins;
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(allowedOrigins.split(","))
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

#### 4. Configurar variáveis de ambiente:
```bash
# Heroku
heroku config:set DATABASE_URL=postgres://user:pass@host:5432/dbname
heroku config:set FRONTEND_URL=https://petshop-frontend.vercel.app

# Railway (automático)
# Render (automático)
```

---

### MySQL

#### 1. Adicionar dependência:
```xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```

#### 2. Configurar `application-prod.properties`:
```properties
spring.datasource.url=jdbc:mysql://${DB_HOST}:3306/${DB_NAME}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

---

## ⚙️ Configurações de Produção

### 1. Atualizar `api-config.js` (Frontend)

```javascript
const API_CONFIG = {
  BASE_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:8080/api'
    : 'https://petshop-backend-production.up.railway.app/api',
  // ... resto do código
};
```

### 2. Implementar JWT (Recomendado)

#### Adicionar dependência:
```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.3</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>
```

### 3. Configurar HTTPS

Todos os serviços mencionados (Heroku, Railway, Render, Vercel, Netlify) fornecem **SSL/HTTPS automático e gratuito**.

### 4. Variáveis de Ambiente

**Backend:**
```bash
SPRING_PROFILES_ACTIVE=prod
DATABASE_URL=postgres://...
JWT_SECRET=seu_secret_super_seguro
FRONTEND_URL=https://seu-frontend.vercel.app
PORT=8080
```

**Frontend (se usar build):**
```bash
VITE_API_URL=https://seu-backend.railway.app/api
```

---

## ✅ Checklist de Deploy

### Antes do Deploy:

- [ ] Remover todos os `console.log()` do JavaScript
- [ ] Configurar `application-prod.properties`
- [ ] Atualizar CORS com URLs de produção
- [ ] Trocar H2 por PostgreSQL
- [ ] Adicionar validações e tratamento de erros
- [ ] Implementar JWT (recomendado)
- [ ] Testar localmente com perfil `prod`
- [ ] Criar backup do código

### Backend:

- [ ] Deploy do backend funcionando
- [ ] Banco de dados conectado
- [ ] Dados iniciais criados (DataInitializer)
- [ ] Endpoints testados via Swagger
- [ ] CORS configurado corretamente
- [ ] Variáveis de ambiente configuradas
- [ ] Logs funcionando

### Frontend:

- [ ] Deploy do frontend funcionando
- [ ] API_CONFIG apontando para backend de produção
- [ ] Login funcionando
- [ ] Carrinho funcionando
- [ ] Checkout criando pedidos
- [ ] Admin acessível apenas com login
- [ ] Links relativos funcionando

### Pós-Deploy:

- [ ] Testar fluxo completo: cadastro → login → compra
- [ ] Testar admin panel
- [ ] Verificar performance
- [ ] Configurar domínio personalizado (opcional)
- [ ] Configurar monitoramento (opcional)
- [ ] Documentar URLs de produção no README

---

## 🔧 Troubleshooting

### Backend não inicia:
```bash
# Ver logs
heroku logs --tail
# ou
railway logs
```

### CORS Error:
- Verificar `CorsConfig.java`
- Adicionar URL do frontend em `allowed-origins`
- Verificar se HTTPS/HTTP estão corretos

### Banco não conecta:
- Verificar `DATABASE_URL` nas variáveis de ambiente
- Verificar credenciais
- Testar conexão manualmente

### Frontend não encontra API:
- Verificar `api-config.js`
- Verificar se backend está rodando
- Abrir console do navegador e verificar erros

---

## 📚 Recursos Adicionais

- [Spring Boot em Produção](https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html)
- [Heroku Java Support](https://devcenter.heroku.com/articles/getting-started-with-java)
- [Railway Docs](https://docs.railway.app/)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)

---

## 🎉 Deploy Completo!

Após seguir este guia, seu sistema estará rodando em produção:

- **Backend:** `https://petshop-backend.railway.app`
- **Frontend:** `https://petshop-frontend.vercel.app`
- **Swagger:** `https://petshop-backend.railway.app/swagger-ui.html`

**Parabéns! 🚀**

---

**Desenvolvido por:** Andreas Paulus Scherdien Berwaldt  
**Data:** Novembro de 2025  
**Projeto:** Fundamentos de Sistemas Web - PUCRS Online
