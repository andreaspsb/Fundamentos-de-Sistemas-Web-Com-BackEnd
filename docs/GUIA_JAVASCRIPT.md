# 📚 Guia Completo: JavaScript - Entendendo Cada Elemento

Este guia explica todo o código JavaScript utilizado no projeto Pet Shop, desde conceitos básicos até funcionalidades avançadas.

---

## 📘 **PARTE 1: FUNDAMENTOS JAVASCRIPT**

### 🎯 **1. DOM (Document Object Model)**

O DOM é a representação da estrutura HTML como uma árvore de objetos que o JavaScript pode manipular.

#### **document.getElementById()**
```javascript
const form = document.getElementById('cadastroForm');
```
- **O que faz**: Busca um elemento HTML pelo seu `id`
- **Retorna**: O elemento HTML ou `null` se não encontrar
- **Quando usar**: Quando você sabe o ID exato do elemento
- **Exemplo prático**: Pegar um formulário específico

#### **document.querySelector()**
```javascript
const botao = document.querySelector('button[onclick="calcularResumo()"]');
```
- **O que faz**: Busca o **primeiro** elemento que corresponde ao seletor CSS
- **Aceita**: Qualquer seletor CSS válido
- **Quando usar**: Para buscar por classe, atributo, ou combinações
- **Exemplos**:
  ```javascript
  document.querySelector('.minha-classe')     // Por classe
  document.querySelector('#meu-id')           // Por ID
  document.querySelector('input[type="text"]') // Por atributo
  document.querySelector('div > p')           // Descendente direto
  ```

#### **document.querySelectorAll()**
```javascript
const cards = document.querySelectorAll('.servico-card');
```
- **O que faz**: Busca **todos** os elementos que correspondem ao seletor
- **Retorna**: NodeList (tipo array) com todos os elementos
- **Quando usar**: Quando precisa manipular vários elementos
- **Diferença do getElementById**: Retorna lista vs. elemento único

---

### 🎪 **2. EVENTOS**

Eventos são ações que acontecem no navegador (clique, digitação, etc).

#### **addEventListener()**
```javascript
form.addEventListener('submit', function(event) {
    // código aqui
});
```

**Sintaxe:**
```javascript
elemento.addEventListener(tipo, função, opções);
```

**Tipos de eventos comuns:**
- **Mouse**: `click`, `dblclick`, `mouseenter`, `mouseleave`, `mouseover`
- **Teclado**: `keydown`, `keyup`, `keypress`
- **Formulário**: `submit`, `input`, `change`, `focus`, `blur`
- **Documento**: `DOMContentLoaded`, `load`

**Exemplo completo:**
```javascript
const botao = document.getElementById('meuBotao');

botao.addEventListener('click', function(event) {
    console.log('Botão clicado!');
    console.log('Elemento que foi clicado:', event.target);
});
```

#### **event.preventDefault()**
```javascript
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede comportamento padrão
});
```
- **O que faz**: Cancela a ação padrão do navegador
- **Usos comuns**:
  - Impedir envio de formulário (para validar antes)
  - Impedir link de redirecionar
  - Impedir menu de contexto (botão direito)

#### **event.stopPropagation()**
```javascript
card.addEventListener('click', function(event) {
    event.stopPropagation(); // Para propagação
});
```
- **O que faz**: Impede que o evento "suba" para elementos pais
- **Quando usar**: Quando você tem eventos aninhados e quer evitar que o pai também dispare

---

### 🔄 **3. LOOPS E ITERAÇÃO**

#### **forEach()**
```javascript
cards.forEach(function(card) {
    card.addEventListener('click', () => {
        // código
    });
});
```
- **O que faz**: Executa uma função para cada elemento de um array/NodeList
- **Não retorna** um novo array
- **Quando usar**: Para executar ações em cada elemento

**Sintaxe completa:**
```javascript
array.forEach(function(elemento, index, arrayCompleto) {
    console.log(elemento);   // Item atual
    console.log(index);      // Posição (0, 1, 2...)
    console.log(arrayCompleto); // Array original
});
```

---

### 🎨 **4. MANIPULAÇÃO DE CLASSES CSS**

#### **classList.add()**
```javascript
elemento.classList.add('selected');
```
- **O que faz**: Adiciona uma classe ao elemento
- **Pode adicionar múltiplas**: `classList.add('classe1', 'classe2')`

#### **classList.remove()**
```javascript
elemento.classList.remove('selected');
```
- **O que faz**: Remove uma classe do elemento

#### **classList.toggle()**
```javascript
elemento.classList.toggle('ativo');
```
- **O que faz**: 
  - Se a classe existe → remove
  - Se não existe → adiciona
- **Retorna**: `true` se adicionou, `false` se removeu

#### **classList.contains()**
```javascript
if (elemento.classList.contains('ativo')) {
    console.log('Elemento está ativo!');
}
```
- **O que faz**: Verifica se o elemento tem a classe
- **Retorna**: `true` ou `false`

---

### 📦 **5. MANIPULAÇÃO DE ATRIBUTOS**

#### **getAttribute() / setAttribute()**
```javascript
const valor = elemento.getAttribute('data-preco');
elemento.setAttribute('data-preco', '50');
```
- **getAttribute()**: Pega o valor de um atributo
- **setAttribute()**: Define/altera o valor de um atributo

#### **removeAttribute()**
```javascript
elemento.removeAttribute('onclick');
```
- **O que faz**: Remove um atributo do elemento

#### **Data Attributes**
```html
<div data-preco="50" data-servico="banho">
```
```javascript
const preco = elemento.dataset.preco;     // "50"
const servico = elemento.dataset.servico; // "banho"
```
- **Convenção**: `data-*` vira `dataset.*` (sem hífen, camelCase)
- **Exemplo**: `data-meu-valor` → `dataset.meuValor`

---

### ⏰ **6. FUNÇÕES TEMPORAIS**

#### **setTimeout()**
```javascript
setTimeout(function() {
    console.log('Executou após 2 segundos');
}, 2000);
```
- **O que faz**: Executa função **uma vez** após o tempo especificado
- **Tempo**: Milissegundos (1000ms = 1 segundo)
- **Retorna**: ID do timeout (para cancelar depois)

**Com arrow function:**
```javascript
setTimeout(() => {
    console.log('Função executada!');
}, 3000);
```

**Cancelando um setTimeout:**
```javascript
const timeoutId = setTimeout(() => {
    console.log('Isso não vai executar');
}, 5000);

clearTimeout(timeoutId); // Cancela
```

#### **setInterval()**
```javascript
const intervalo = setInterval(function() {
    console.log('Executando a cada 1 segundo');
}, 1000);
```
- **O que faz**: Executa função **repetidamente** no intervalo especificado
- **Continua até**: Ser cancelado com `clearInterval()`
- **Retorna**: ID do intervalo

**Cancelando um setInterval:**
```javascript
const intervalo = setInterval(() => {
    console.log('Tick');
}, 1000);

// Após 5 segundos, para
setTimeout(() => {
    clearInterval(intervalo);
    console.log('Parou!');
}, 5000);
```

---

### 📝 **7. VALIDAÇÃO DE FORMULÁRIOS**

#### **form.checkValidity()**
```javascript
if (form.checkValidity()) {
    console.log('Formulário válido!');
}
```
- **O que faz**: Verifica se todos os campos do formulário são válidos
- **Retorna**: `true` ou `false`
- **Considera**: `required`, `pattern`, `minlength`, `type`, etc.

#### **Propriedades de validação**
```javascript
const input = document.getElementById('email');

console.log(input.validity.valid);        // true/false geral
console.log(input.validity.valueMissing); // Campo obrigatório vazio
console.log(input.validity.typeMismatch); // Tipo errado (ex: email inválido)
console.log(input.validity.patternMismatch); // Não corresponde ao pattern
console.log(input.validationMessage);     // Mensagem de erro
```

#### **setCustomValidity()**
```javascript
if (senha !== confirmaSenha) {
    confirmaSenha.setCustomValidity('As senhas não correspondem');
} else {
    confirmaSenha.setCustomValidity(''); // Limpa erro customizado
}
```
- **O que faz**: Define mensagem de erro personalizada
- **String vazia**: Remove erro customizado

---

### 🔍 **8. MANIPULAÇÃO DE STRINGS**

#### **replace()**
```javascript
let cpf = '12345678900';
cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
// Resultado: "123.456.789-00"
```
- **O que faz**: Substitui parte da string
- **Aceita**: String literal ou RegEx

#### **Regex básico para máscaras**
```javascript
// Remove tudo que não é número
let valor = '(11) 98765-4321';
valor = valor.replace(/\D/g, ''); // "11987654321"

// \D = tudo que NÃO é dígito
// \d = dígitos (0-9)
// g = global (todas as ocorrências)
```

---

## 📘 **PARTE 2: CÓDIGO DO PROJETO EXPLICADO**

### 🎠 **1. CARROSSEL (script.js)**

```javascript
// ========================================
// JavaScript para o Carrossel de Promoções
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎠 Carrossel carregado!');
    
    const carrossel = document.querySelector('#carouselPromocoes');
    
    if (carrossel) {
        const bsCarousel = new bootstrap.Carousel(carrossel, {
            interval: 4000,
            ride: 'carousel'
        });
        
        console.log('✅ Carrossel inicializado com rotação automática a cada 4 segundos');
    }
});
```

**Explicação linha por linha:**

1. **DOMContentLoaded**: 
   - Espera o HTML estar completamente carregado
   - Garante que os elementos existam antes de manipulá-los
   - Alternativa: colocar script no final do `<body>`

2. **querySelector('#carouselPromocoes')**:
   - Busca o elemento do carrossel pelo ID
   - Retorna `null` se não encontrar

3. **if (carrossel)**:
   - Verifica se o elemento existe
   - Evita erros em páginas que não têm carrossel

4. **new bootstrap.Carousel()**:
   - Cria instância do carrossel do Bootstrap
   - `interval: 4000`: Troca de slide a cada 4 segundos (4000ms)
   - `ride: 'carousel'`: Inicia automaticamente

**Função Temporal Usada:**
- Internamente, o Bootstrap usa `setInterval()` para rotação automática

---

### 📋 **2. FORMULÁRIO DE CADASTRO (cadastro.js)**

#### **Estrutura Principal**
```javascript
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('cadastroForm');
  
  if (!form) return; // Se não existe, sai da função
  
  console.log('📋 Formulário de cadastro carregado!');
  
  // Aplicar máscaras nos campos
  aplicarMascaras();
  
  // Validação do formulário
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (form.checkValidity()) {
      processarCadastro();
    } else {
      mostrarErrosValidacao();
    }
    
    form.classList.add('was-validated');
  }, false);
  
  // Limpar validação ao resetar
  form.addEventListener('reset', function() {
    form.classList.remove('was-validated');
    document.getElementById('sucessoMsg').style.display = 'none';
    console.log('🔄 Formulário resetado');
  });
});
```

**Detalhes importantes:**

1. **Early return**: `if (!form) return;`
   - Sai da função se o formulário não existe
   - Previne erros em outras páginas

2. **event.preventDefault()**: 
   - Impede o envio padrão do formulário
   - Permite validação customizada antes de enviar

3. **event.stopPropagation()**:
   - Impede que o evento suba para elementos pais
   - Evita múltiplos disparos

4. **form.checkValidity()**:
   - Valida todos os campos de uma vez
   - Retorna `true` se tudo estiver OK

5. **form.classList.add('was-validated')**:
   - Ativa estilos de validação do Bootstrap
   - Mostra visual de campos válidos/inválidos

---

#### **Máscaras de Entrada**
```javascript
function aplicarMascaras() {
  // Máscara de CPF
  const cpfInput = document.getElementById('cpf');
  cpfInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      e.target.value = value;
    }
  });
  
  // Máscara de Telefone
  const telefoneInput = document.getElementById('telefone');
  telefoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      value = value.replace(/(\d{2})(\d)/, '($1) $2');
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
      e.target.value = value;
    }
  });
}
```

**Como funciona a máscara:**

1. **Evento 'input'**:
   - Dispara a cada caractere digitado
   - Inclui colar texto, backspace, etc.

2. **replace(/\D/g, '')**:
   - `/\D/` = tudo que NÃO é dígito
   - `g` = global (todas as ocorrências)
   - Remove pontos, hífens, parênteses, etc.

3. **Aplicação de formato**:
   ```javascript
   // CPF: 123.456.789-00
   value = value.replace(/(\d{3})(\d)/, '$1.$2');  // 123.4
   value = value.replace(/(\d{3})(\d)/, '$1.$2');  // 123.456.7
   value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // 123.456.789-00
   ```
   - `(\d{3})` = captura 3 dígitos
   - `$1` = primeiro grupo capturado
   - `$2` = segundo grupo capturado

4. **Limitação de tamanho**:
   - `if (value.length <= 11)` evita passar de 11 dígitos no CPF

---

#### **Processamento com Funções Temporais**
```javascript
function processarCadastro() {
  console.log('📤 Processando cadastro...');
  
  const botaoEnviar = document.querySelector('button[type="submit"]');
  const textoOriginal = botaoEnviar.innerHTML;
  
  // Desabilita botão e mostra loading
  botaoEnviar.disabled = true;
  botaoEnviar.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processando...';
  
  // ⏰ setTimeout - Executa UMA VEZ após 2 segundos
  setTimeout(function() {
    botaoEnviar.disabled = false;
    botaoEnviar.innerHTML = textoOriginal;
    
    mostrarSucesso();
    
    const toast = new bootstrap.Toast(document.getElementById('toastNotificacao'));
    toast.show();
    
    iniciarContadorRegressivo();
  }, 2000); // 2000ms = 2 segundos
}
```

**Função Temporal #1: setTimeout()**
- **Propósito**: Simular processamento/envio ao servidor
- **Duração**: 2 segundos
- **Execuções**: Uma única vez
- **Efeito**: Loading → Sucesso

---

#### **Contador Regressivo**
```javascript
function iniciarContadorRegressivo() {
  let segundos = 8;
  const elementoContador = document.getElementById('contador');
  
  if (!elementoContador) return;
  
  elementoContador.textContent = segundos;
  
  // ⏰ setInterval - Executa REPETIDAMENTE a cada 1 segundo
  const intervalo = setInterval(function() {
    segundos--;
    elementoContador.textContent = segundos;
    
    if (segundos <= 0) {
      clearInterval(intervalo); // Para o intervalo
      console.log('⏰ Contador finalizado!');
    }
  }, 1000); // 1000ms = 1 segundo
}
```

**Função Temporal #2: setInterval()**
- **Propósito**: Contador regressivo visual
- **Intervalo**: 1 segundo
- **Execuções**: 8 vezes (até contador chegar a 0)
- **Parada**: `clearInterval()` quando `segundos <= 0`

**Fluxo completo:**
1. Usuário clica em "Enviar"
2. Botão vira "Processando..." (loading)
3. **Após 2s**: Mostra mensagem de sucesso
4. Inicia contador de 8 segundos
5. **A cada 1s**: Decrementa o contador
6. **Após 8s**: Para o intervalo

---

### 📅 **3. AGENDAMENTO (agendamento.js)**

#### **Configuração de Data Mínima**
```javascript
function configurarDataMinima() {
  const inputData = document.getElementById('data');
  if (!inputData) return;
  
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  
  const dataMinima = `${ano}-${mes}-${dia}`;
  inputData.setAttribute('min', dataMinima);
  
  console.log('📅 Data mínima configurada:', dataMinima);
}
```

**Explicação:**

1. **new Date()**:
   - Cria objeto com data/hora atual
   - Exemplo: `Wed Nov 20 2025 14:30:00`

2. **getFullYear()**: Retorna ano (2025)

3. **getMonth()**:
   - Retorna mês (0-11, Janeiro=0)
   - **+1**: Corrige para 1-12

4. **padStart(2, '0')**:
   - Adiciona zeros à esquerda até ter 2 caracteres
   - `"5"` → `"05"`
   - `"12"` → `"12"`

5. **Template string**: `` `${ano}-${mes}-${dia}` ``
   - Interpolação de variáveis
   - Resultado: `"2025-11-20"`

6. **setAttribute('min', dataMinima)**:
   - Define data mínima no input
   - Navegador bloqueia datas anteriores

---

#### **Cards Clicáveis (Seleção de Serviços)**
```javascript
function configurarCardsServicos() {
  const cards = document.querySelectorAll('.servico-card');
  
  cards.forEach(card => {
    card.addEventListener('click', function() {
      const checkbox = this.querySelector('input[type="checkbox"]');
      
      // Toggle do checkbox
      checkbox.checked = !checkbox.checked;
      
      // Toggle da classe visual
      if (checkbox.checked) {
        this.classList.add('selected');
      } else {
        this.classList.remove('selected');
      }
      
      // Limpa mensagens de erro
      limparErroServico();
    });
    
    // Previne que clique no checkbox dispare 2 vezes
    const checkbox = card.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });
}
```

**Conceitos importantes:**

1. **this**: 
   - Dentro do event listener, refere-se ao elemento que disparou o evento
   - Neste caso, o `.servico-card` clicado

2. **querySelector() vs querySelectorAll()**:
   - `this.querySelector()`: Busca DENTRO do card atual
   - Não busca em todos os cards, só no clicado

3. **Toggle manual**:
   ```javascript
   checkbox.checked = !checkbox.checked;
   ```
   - Se está marcado → desmarca
   - Se está desmarcado → marca
   - `!` inverte o valor booleano

4. **stopPropagation() no checkbox**:
   - Sem isso: clicar no checkbox dispara 2 eventos
     1. Evento do checkbox
     2. Evento do card pai (propagação)
   - Com isso: para após o primeiro evento

**Fluxo de clique:**
```
1. Usuário clica no card
2. Pega o checkbox dentro dele
3. Inverte estado do checkbox (checked/unchecked)
4. Adiciona/remove classe 'selected' (efeito visual CSS)
5. Limpa mensagem de erro se houver
```

---

#### **Validação de Domingo**
```javascript
function validarFormulario() {
  // ... outras validações ...
  
  // Verificar se não é domingo
  const dataSelecionada = new Date(inputData.value + 'T00:00:00');
  const diaSemana = dataSelecionada.getDay();
  
  if (diaSemana === 0) { // 0 = Domingo
    mostrarErro('A loja não funciona aos domingos. Por favor, escolha outra data.');
    inputData.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return false;
  }
  
  return true;
}
```

**getDay():**
- Retorna dia da semana (0-6)
- 0 = Domingo
- 1 = Segunda
- 2 = Terça
- ... 
- 6 = Sábado

**scrollIntoView():**
- Rola a página até o elemento ficar visível
- `behavior: 'smooth'`: Scroll suave (animado)
- `block: 'center'`: Centraliza elemento na tela

---

#### **URLSearchParams (Pré-seleção)**
```javascript
function preencherServicoURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const servicoParam = urlParams.get('servico');
  
  if (servicoParam) {
    console.log('🔗 Serviço da URL:', servicoParam);
    
    // Mapeia parâmetro para checkbox ID
    const mapeamento = {
      'banho': 'servicoBanho',
      'tosa': 'servicoTosa',
      'completo': 'servicoCompleto'
    };
    
    const checkboxId = mapeamento[servicoParam];
    
    if (checkboxId) {
      const checkbox = document.getElementById(checkboxId);
      const card = checkbox.closest('.servico-card');
      
      // Marca checkbox e adiciona classe
      checkbox.checked = true;
      card.classList.add('selected');
      
      console.log('✅ Serviço pré-selecionado:', servicoParam);
    }
  }
}
```

**Como funciona:**

1. **URL com parâmetro**:
   ```
   http://localhost:8000/servicos/agendamento.html?servico=banho
   ```

2. **window.location.search**:
   - Retorna a query string: `"?servico=banho"`

3. **new URLSearchParams()**:
   - Objeto para manipular parâmetros de URL
   - Parse automático da query string

4. **urlParams.get('servico')**:
   - Pega o valor do parâmetro `servico`
   - Retorna: `"banho"`, `"tosa"`, ou `"completo"`

5. **Objeto de mapeamento**:
   ```javascript
   const mapeamento = {
     'banho': 'servicoBanho',
     'tosa': 'servicoTosa',
     'completo': 'servicoCompleto'
   };
   ```
   - Traduz valor da URL para ID do checkbox
   - Exemplo: `'banho'` → `'servicoBanho'`

6. **closest('.servico-card')**:
   - Busca o elemento pai mais próximo com a classe
   - Sobe na árvore DOM até encontrar

**Fluxo completo:**
```
URL: ?servico=banho
    ↓
URLSearchParams extrai: "banho"
    ↓
Mapeamento converte: "banho" → "servicoBanho"
    ↓
Pega checkbox: <input id="servicoBanho">
    ↓
Pega card pai: <div class="servico-card">
    ↓
Marca checkbox e adiciona classe
    ↓
Serviço pré-selecionado visualmente!
```

---

#### **Processamento do Agendamento**
```javascript
function processarAgendamento() {
  console.log('📅 Processando agendamento...');
  
  // ⏰ setTimeout - Executa UMA VEZ após 1.5 segundos
  setTimeout(function() {
    // Scroll para o topo (onde está mensagem de sucesso)
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Mostra mensagem de sucesso
    const sucessoMsg = document.getElementById('sucessoMsg');
    sucessoMsg.style.display = 'block';
    
    // Reseta formulário
    form.reset();
    form.classList.remove('was-validated');
    
    // Remove seleções visuais
    limparSelecaoCards();
    
    console.log('✅ Agendamento confirmado!');
  }, 1500); // 1500ms = 1.5 segundos
}
```

**Função Temporal #3: setTimeout()**
- **Propósito**: Delay antes de mostrar sucesso
- **Duração**: 1.5 segundos
- **Execuções**: Uma única vez
- **Efeito**: Simula processamento no servidor

**window.scrollTo():**
- Rola a janela para posição específica
- `top: 0`: Topo da página
- `behavior: 'smooth'`: Scroll animado

---

### 🔄 **4. FUNÇÃO TEMPORAL #4: Carrossel Bootstrap**

Embora não escrevamos diretamente, o Bootstrap usa internamente:

```javascript
// Dentro do Bootstrap (simplificado)
function iniciarCarrossel() {
  const intervalo = setInterval(() => {
    proximoSlide();
  }, 4000);
}
```

**Resumo das 4 funções temporais:**
1. ✅ **Carrossel** - `setInterval(4000)` - Rotação automática
2. ✅ **Cadastro loading** - `setTimeout(2000)` - Simulação de envio
3. ✅ **Contador regressivo** - `setInterval(1000)` - Countdown 8s
4. ✅ **Agendamento** - `setTimeout(1500)` - Delay processamento

---

## 🎓 **CONCEITOS AVANÇADOS**

### 🎯 **1. Arrow Functions**

**Sintaxe tradicional:**
```javascript
setTimeout(function() {
    console.log('Executou');
}, 1000);
```

**Arrow function:**
```javascript
setTimeout(() => {
    console.log('Executou');
}, 1000);
```

**Com parâmetros:**
```javascript
cards.forEach((card, index) => {
    console.log(`Card ${index}:`, card);
});
```

**Diferenças principais:**
- Sintaxe mais curta
- `this` se comporta diferente (léxico)
- Não pode ser usada como construtor

---

### 🔗 **2. Encadeamento (Method Chaining)**

```javascript
const checkbox = card.querySelector('input[type="checkbox"]')
                     .closest('.servico-card')
                     .classList
                     .add('selected');
```

Cada método retorna algo que permite chamar o próximo método.

---

### 📦 **3. Destructuring**

```javascript
// Array destructuring
const [primeiro, segundo] = ['A', 'B', 'C'];
console.log(primeiro); // "A"
console.log(segundo);  // "B"

// Object destructuring
const usuario = { nome: 'João', idade: 25 };
const { nome, idade } = usuario;
console.log(nome);  // "João"
console.log(idade); // 25
```

---

### 🎨 **4. Template Literals**

```javascript
const nome = 'João';
const idade = 25;

// Forma antiga
const mensagem = 'Olá, ' + nome + '! Você tem ' + idade + ' anos.';

// Template literal
const mensagem = `Olá, ${nome}! Você tem ${idade} anos.`;

// Multilinhas
const html = `
    <div>
        <h1>${titulo}</h1>
        <p>${descricao}</p>
    </div>
`;
```

---

### 🔄 **5. Operador Ternário**

```javascript
// If/else tradicional
let status;
if (ativo) {
    status = 'Online';
} else {
    status = 'Offline';
}

// Operador ternário
const status = ativo ? 'Online' : 'Offline';
```

**Sintaxe:** `condição ? valorSeTrue : valorSeFalse`

---

### 🎯 **6. Short-circuit Evaluation**

```javascript
// && (AND)
const form = document.getElementById('form');
form && form.submit(); // Só executa submit() se form existir

// || (OR) - Valor padrão
const nome = usuario.nome || 'Anônimo';
// Se usuario.nome existir, usa ele
// Se não, usa 'Anônimo'

// ?? (Nullish coalescing) - Mais moderno
const idade = usuario.idade ?? 18;
// Só usa 18 se idade for null ou undefined
// 0 e '' são considerados válidos
```

---

## 📊 **BOAS PRÁTICAS**

### ✅ **DOs (Faça):**

1. **Use 'const' e 'let', nunca 'var'**
   ```javascript
   const PI = 3.14;     // Não muda
   let contador = 0;    // Pode mudar
   ```

2. **Nomes descritivos**
   ```javascript
   ✅ const botaoEnviar = document.querySelector('...');
   ❌ const btn = document.querySelector('...');
   ```

3. **Previna erros com validações**
   ```javascript
   if (!form) return; // Early return
   ```

4. **Use console.log para debug**
   ```javascript
   console.log('📅 Data selecionada:', data);
   console.log('✅ Validação OK');
   ```

5. **Comente código complexo**
   ```javascript
   // Máscara CPF: 123.456.789-00
   value = value.replace(/(\d{3})(\d)/, '$1.$2');
   ```

### ❌ **DON'Ts (Evite):**

1. **Variáveis globais desnecessárias**
   ```javascript
   ❌ let dados; // Global
   function processar() {
       dados = pegarDados();
   }
   
   ✅ function processar() {
       const dados = pegarDados(); // Local
   }
   ```

2. **innerHTML sem sanitização**
   ```javascript
   ❌ div.innerHTML = userInput; // XSS vulnerability
   ✅ div.textContent = userInput; // Seguro
   ```

3. **setTimeout/setInterval sem cleanup**
   ```javascript
   ❌ setInterval(() => { ... }, 1000); // Nunca para
   
   ✅ const intervalo = setInterval(() => { ... }, 1000);
       clearInterval(intervalo); // Para quando necessário
   ```

4. **Modificar arrays durante loop**
   ```javascript
   ❌ for (let i = 0; i < arr.length; i++) {
       arr.splice(i, 1); // Problema!
   }
   ```

---

## 🚀 **EXERCÍCIOS PRÁTICOS**

### **1. Cronômetro**
Crie um cronômetro que:
- Conta de 0 para cima
- Botão Start/Pause
- Botão Reset
- Use `setInterval()`

### **2. Validador de Email**
Crie uma função que:
- Valide formato de email
- Mostre feedback visual
- Use Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

### **3. Lista de Tarefas**
Crie uma todo list que:
- Adicione itens
- Marque como completo
- Delete itens
- Use `localStorage` para persistir

---

## 📚 **RECURSOS PARA CONTINUAR**

- **MDN JavaScript**: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript
- **JavaScript.info**: https://javascript.info/
- **Eloquent JavaScript**: https://eloquentjavascript.net/
- **FreeCodeCamp**: https://www.freecodecamp.org/
- **Exercism JavaScript Track**: https://exercism.org/tracks/javascript

---

**💡 Dica Final:** JavaScript é uma linguagem que se aprende **fazendo**. Abra o Console do DevTools (F12 → Console) e experimente os comandos! Tente modificar os valores, quebre coisas de propósito para entender os erros, e divirta-se programando! 🎉
