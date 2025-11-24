# 🔑 Configuração da Chave NVD NIST

Este documento explica como configurar sua chave da API do NVD (National Vulnerability Database) do NIST para o **OWASP Dependency Check**.

---

## 📋 O que é a Chave NVD?

A chave da API do NVD permite que o OWASP Dependency Check:
- ✅ **Baixe dados de vulnerabilidades mais rapidamente** (sem rate limiting)
- ✅ **Acesse informações atualizadas de CVEs**
- ✅ **Evite timeouts** durante a análise de segurança
- ✅ **Melhore a performance** do scan de dependências

**Sem a chave:** O scan funciona, mas é **muito mais lento** e pode ter falhas por timeout.

---

## 🔐 Passo 1: Adicionar a Chave no GitHub

### 1.1 Acesse as Configurações do Repositório

1. Vá para o seu repositório no GitHub
2. Clique em **Settings** (⚙️ Configurações)
3. No menu lateral esquerdo, clique em **Secrets and variables** → **Actions**

### 1.2 Criar o Secret

1. Clique no botão **New repository secret**
2. Preencha os campos:
   - **Name:** `NVD_API_KEY`
   - **Value:** Cole sua chave da API do NVD (exemplo: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)
3. Clique em **Add secret**

### 1.3 Verificar

Você deverá ver o secret listado como:
```
NVD_API_KEY
```

**⚠️ IMPORTANTE:** A chave ficará oculta (••••••••) após salvar. Isso é normal por segurança!

---

## ⚙️ Passo 2: Como a Chave é Usada

A chave já está configurada no workflow `.github/workflows/security-scan.yml`:

```yaml
- name: Run OWASP Dependency Check
  working-directory: ./backend-springboot
  env:
    NVD_API_KEY: ${{ secrets.NVD_API_KEY }}
  run: |
    mvn org.owasp:dependency-check-maven:check \
      -DnvdApiKey=${NVD_API_KEY} \
      -DfailBuildOnCVSS=7 \
      -DsuppressionFile=owasp-suppressions.xml || true
```

**O que acontece:**
1. O workflow lê o secret `NVD_API_KEY` do GitHub
2. Passa a chave como variável de ambiente
3. O Maven usa a chave no parâmetro `-DnvdApiKey`
4. O OWASP Dependency Check baixa dados do NVD usando a chave

---

## 🧪 Passo 3: Testar Localmente (Opcional)

Se você quiser rodar o scan localmente com sua chave:

### 3.1 Criar arquivo `.env` (não commitar!)

Adicione ao `.gitignore`:
```bash
echo ".env" >> .gitignore
```

Crie o arquivo `.env`:
```bash
NVD_API_KEY=sua-chave-aqui
```

### 3.2 Rodar o scan

```bash
cd backend-springboot
export NVD_API_KEY=$(cat ../.env | grep NVD_API_KEY | cut -d '=' -f2)
mvn org.owasp:dependency-check-maven:check -DnvdApiKey=${NVD_API_KEY}
```

### 3.3 Ver o relatório

O relatório HTML será gerado em:
```
backend-springboot/target/dependency-check-report.html
```

Abra no navegador para ver as vulnerabilidades encontradas.

---

## 📊 Passo 4: Verificar se Está Funcionando

### 4.1 Fazer Push e Verificar Actions

1. Faça commit e push das alterações:
   ```bash
   git add .github/workflows/security-scan.yml
   git commit -m "feat: adicionar suporte para NVD API Key"
   git push
   ```

2. Vá para **Actions** no GitHub
3. Procure pelo workflow **Security Scan**
4. Clique no último run

### 4.2 Verificar Logs

No job **OWASP Dependency Check**, você deve ver logs como:

```
[INFO] Checking for updates
[INFO] NVD API Key detected - using authenticated access
[INFO] Downloaded CVE data successfully
[INFO] Processing dependencies...
```

**✅ Sucesso:** Se aparecer "NVD API Key detected"  
**❌ Erro:** Se aparecer "Rate limit exceeded" ou timeouts

---

## 🔄 Quando o Scan Roda Automaticamente?

O workflow de segurança (`security-scan.yml`) roda:

- ✅ A cada **push** na branch `main` ou `develop`
- ✅ Em cada **Pull Request** para `main`
- ✅ **Toda segunda-feira às 9h** (scan agendado)

---

## 🛠️ Troubleshooting

### Problema: "Context access might be invalid: NVD_API_KEY"

**Solução:** Este é apenas um **aviso do linter do GitHub Actions**, não é um erro real. O código funcionará corretamente.

Se quiser remover o aviso, você pode adicionar permissões:
```yaml
permissions:
  contents: read
  security-events: write
```

---

### Problema: "NVD API Key not found"

**Causas possíveis:**
1. Secret não foi criado no GitHub
2. Nome do secret está errado (deve ser exatamente `NVD_API_KEY`)
3. Workflow não tem permissão para ler secrets

**Solução:**
1. Verifique em Settings → Secrets → Actions
2. Confirme que o nome é `NVD_API_KEY` (case-sensitive)
3. Tente re-criar o secret

---

### Problema: "Invalid API key"

**Causas possíveis:**
1. Chave copiada incorretamente (espaços extras)
2. Chave expirada ou revogada
3. Chave ainda não ativada

**Solução:**
1. Verifique a chave no site do NVD
2. Solicite uma nova chave se necessário
3. Aguarde alguns minutos após criar a chave (pode demorar para ativar)

---

## 📚 Recursos Adicionais

- 🔗 [Solicitar chave NVD](https://nvd.nist.gov/developers/request-an-api-key)
- 🔗 [OWASP Dependency Check Docs](https://jeremylong.github.io/DependencyCheck/dependency-check-maven/)
- 🔗 [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

---

## ✅ Checklist Final

- [ ] Chave NVD obtida no site do NIST
- [ ] Secret `NVD_API_KEY` criado no GitHub
- [ ] Workflow `security-scan.yml` atualizado
- [ ] Push realizado e Actions executando
- [ ] Logs confirmam "NVD API Key detected"
- [ ] Relatório de vulnerabilidades gerado com sucesso

---

**🎉 Pronto!** Seu projeto agora tem scan de vulnerabilidades otimizado com a chave NVD NIST!
