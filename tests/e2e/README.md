# Testes Playwright - Pet Shop

Suite completa de testes E2E usando Playwright para o sistema Pet Shop.

## 📋 Suites de Testes

### 1. **auth.spec.js** - Autenticação
- ✅ Login com credenciais válidas
- ✅ Login com credenciais inválidas
- ✅ Logout e limpeza de sessão
- ✅ Redirecionamento para login (páginas protegidas)
- ✅ Persistência de sessão

### 2. **carrinho.spec.js** - Carrinho de Compras
- ✅ Adicionar produtos
- ✅ Visualizar carrinho
- ✅ Atualizar quantidade
- ✅ Remover produtos
- ✅ Limpar carrinho
- ✅ Validação de estoque
- ✅ Persistência em localStorage

### 3. **cadastro.spec.js** - Cadastro
- ✅ Formulário completo
- ✅ Validações de campos
- ✅ Auto-sugestão de username
- ✅ Máscaras (CPF, telefone)
- ✅ Validação de email
- ✅ Seleção de espécie do pet
- ✅ Responsividade

### 4. **navigation.spec.js** - Navegação
- ✅ Links do menu
- ✅ Logo para home
- ✅ Menu mobile
- ✅ Footer em todas as páginas
- ✅ Navegação por teclado
- ✅ Carrossel

### 5. **acessibilidade.spec.js** - Acessibilidade
- ✅ Alt text em imagens
- ✅ Labels em formulários
- ✅ Navegação por teclado
- ✅ ARIA labels
- ✅ Focus visível
- ✅ Contraste de cores
- ✅ Hierarquia de headings

## 🚀 Como Executar

### Pré-requisitos

```bash
# Instalar Node.js 18+ (se não tiver)
# Instalar dependências
npm install
```

### Executar Testes

```bash
# Todos os testes (headless)
npm test

# Com interface gráfica
npm run test:headed

# Interface UI interativa
npm run test:ui

# Debug mode
npm run test:debug

# Apenas Chromium
npm run test:chromium

# Apenas Firefox
npm run test:firefox

# Apenas WebKit (Safari)
npm run test:webkit

# Apenas testes mobile
npm run test:mobile

# Ver relatório HTML
npm run test:report
```

### Gerar Testes Automaticamente

```bash
# Codegen - grava suas ações e gera código
npm run test:codegen
```

## 📊 Browsers Testados

- ✅ **Chromium** (Chrome, Edge)
- ✅ **Firefox**
- ✅ **WebKit** (Safari)
- ✅ **Mobile Chrome** (Pixel 5)
- ✅ **Mobile Safari** (iPhone 12)

## 🎯 Executar Testes Específicos

```bash
# Apenas autenticação
npx playwright test auth

# Apenas carrinho
npx playwright test carrinho

# Apenas cadastro
npx playwright test cadastro

# Arquivo específico
npx playwright test tests/e2e/navigation.spec.js

# Teste específico por nome
npx playwright test -g "deve fazer login"
```

## 📸 Screenshots e Vídeos

Os testes capturam automaticamente:
- **Screenshots** - Em caso de falha
- **Vídeos** - Na primeira tentativa de retry
- **Traces** - Para debug detalhado

Localizados em: `test-results/` e `playwright-report/`

## 🔧 Configuração

Arquivo: `playwright.config.js`

**Principais configurações:**
- **Timeout:** 30 segundos por teste
- **Retries:** 2 tentativas em CI
- **Workers:** Execução paralela
- **Base URL:** http://localhost:5500
- **Web Server:** Inicia automaticamente frontend

## ⚙️ CI/CD

### GitHub Actions

Crie `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 18
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npm test
    - uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

## 📝 Boas Práticas Implementadas

### 1. **Page Object Model**
- Testes organizados por funcionalidade
- Fácil manutenção

### 2. **Isolamento de Testes**
```javascript
test.beforeEach(async ({ page }) => {
  // Limpar estado antes de cada teste
  await page.evaluate(() => localStorage.clear());
});
```

### 3. **Waits Inteligentes**
```javascript
// Auto-waiting do Playwright
await page.click('button'); // Espera automaticamente
await page.waitForSelector('.produto-card');
```

### 4. **Asserções Robustas**
```javascript
await expect(page.locator('.navbar')).toContainText('admin');
```

### 5. **Parallel Execution**
- Testes independentes
- Execução mais rápida

## 🐛 Debug

### Modo Debug
```bash
npm run test:debug
```

Abre Playwright Inspector:
- Pause em cada ação
- Step through
- Inspect page

### Trace Viewer
```bash
npx playwright show-trace test-results/.../trace.zip
```

Visualização completa:
- Network
- Console
- Screenshots
- DOM snapshots

## 📈 Métricas de Qualidade

### Cobertura Atual:
- ✅ **50+ testes** implementados
- ✅ **5 browsers** testados
- ✅ **2 viewports mobile**
- ✅ **100% das páginas principais** cobertas
- ✅ **Acessibilidade** validada

### Fluxos Críticos Testados:
1. Autenticação completa
2. Carrinho de compras
3. Cadastro de cliente
4. Navegação geral
5. Acessibilidade WCAG

## 🚧 Próximos Testes a Implementar

- [ ] Checkout completo (requer backend rodando)
- [ ] Agendamento de serviços
- [ ] Meus pedidos
- [ ] Admin CRUD
- [ ] Testes de API
- [ ] Testes de performance
- [ ] Testes de segurança

## 📚 Recursos

- [Playwright Docs](https://playwright.dev/)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-test)
- [Trace Viewer](https://playwright.dev/docs/trace-viewer)

## 🆘 Troubleshooting

### Testes falhando?

1. **Backend rodando?**
```bash
cd backend-springboot
mvn spring-boot:run
```

2. **Frontend acessível?**
```bash
cd frontend
python3 -m http.server 5500
```

3. **Dependências instaladas?**
```bash
npm install
npx playwright install --with-deps
```

4. **Porta 5500 ocupada?**
```bash
# Mudar porta em playwright.config.js
baseURL: 'http://localhost:8000'
```

---

**Criado por:** Andreas Paulus Scherdien Berwaldt  
**Data:** Novembro de 2025  
**Framework:** Playwright
