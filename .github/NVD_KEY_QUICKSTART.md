# ⚡ Quick Start - Chave NVD NIST

## 🎯 Onde Usar a Chave?

```
┌─────────────────────────────────────────────────────────────┐
│                    GITHUB REPOSITORY                        │
│                                                             │
│  Settings → Secrets and variables → Actions                │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  New repository secret                                │ │
│  │                                                       │ │
│  │  Name:  NVD_API_KEY                                  │ │
│  │  Value: [cole sua chave aqui]                        │ │
│  │                                                       │ │
│  │  [Add secret]                                         │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## ✅ Passo a Passo (3 minutos)

### 1️⃣ Adicionar Secret no GitHub

```bash
1. Vá para: https://github.com/SEU_USUARIO/SEU_REPO/settings/secrets/actions
2. Clique em "New repository secret"
3. Name: NVD_API_KEY
4. Value: [sua chave obtida do NVD NIST]
5. Clique em "Add secret"
```

### 2️⃣ Verificar Configuração

A chave já está configurada no workflow:

```yaml
# Arquivo: .github/workflows/security-scan.yml (linha 91)
- name: Run OWASP Dependency Check
  env:
    NVD_API_KEY: ${{ secrets.NVD_API_KEY }}  ← Lê do GitHub Secrets
  run: |
    mvn org.owasp:dependency-check-maven:check \
      -DnvdApiKey=${NVD_API_KEY}  ← Usa a chave
```

### 3️⃣ Testar

```bash
# Fazer push para disparar o workflow
git push origin main

# Ir para: Actions → Security Scan → Ver logs
# Deve aparecer: "NVD API Key detected - using authenticated access"
```

## 📊 Fluxo de Uso

```
┌──────────────┐
│  Você faz    │
│     PUSH     │
└──────┬───────┘
       │
       v
┌──────────────────────────────────────────┐
│  GitHub Actions inicia Security Scan     │
└──────┬───────────────────────────────────┘
       │
       v
┌──────────────────────────────────────────┐
│  Lê o secret NVD_API_KEY                 │
└──────┬───────────────────────────────────┘
       │
       v
┌──────────────────────────────────────────┐
│  OWASP Dependency Check baixa CVE data   │
│  usando a chave (mais rápido!)           │
└──────┬───────────────────────────────────┘
       │
       v
┌──────────────────────────────────────────┐
│  Gera relatório de vulnerabilidades      │
│  em: target/dependency-check-report.html │
└──────────────────────────────────────────┘
```

## 🔍 Como Saber se Funcionou?

### ✅ SUCESSO (com chave configurada)
```log
[INFO] Checking for updates
[INFO] NVD API Key detected - using authenticated access
[INFO] Downloaded 150KB of CVE data in 2 seconds
[INFO] Processing dependencies...
[INFO] Dependency-Check completed
```

### ❌ SEM CHAVE (mais lento)
```log
[INFO] Checking for updates
[WARNING] No NVD API Key - using unauthenticated access (slow)
[WARNING] Rate limit may apply
[INFO] Downloaded 150KB of CVE data in 45 seconds
[INFO] Processing dependencies...
```

## 🚀 Benefícios da Chave

| Sem Chave | Com Chave |
|-----------|-----------|
| ⏱️ ~5 minutos | ⚡ ~30 segundos |
| 🚫 Rate limiting | ✅ Sem limites |
| ❌ Timeouts | ✅ Estável |
| 📉 Dados desatualizados | 📈 Dados atualizados |

## 📚 Links Úteis

- 🔑 [Solicitar chave NVD](https://nvd.nist.gov/developers/request-an-api-key)
- 📖 [Documentação completa](./NVD_API_KEY_SETUP.md)
- 🔧 [OWASP Dependency Check](https://jeremylong.github.io/DependencyCheck/)

---

**💡 Dica:** A chave é **gratuita** e válida indefinidamente!
