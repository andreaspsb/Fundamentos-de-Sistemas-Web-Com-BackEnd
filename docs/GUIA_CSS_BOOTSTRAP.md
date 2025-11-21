# 📚 Guia Completo: CSS e Bootstrap 5 - Entendendo Cada Elemento

Este guia explica todos os elementos CSS e Bootstrap utilizados no projeto Pet Shop, ajudando você a compreender como cada recurso funciona.

---

## 📘 **PARTE 1: BOOTSTRAP 5**

Bootstrap é um framework CSS que fornece componentes prontos e responsivos. Você inclui via CDN no `<head>`:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
```

### 🎯 **1. SISTEMA DE GRID (Layout Responsivo)**

O Bootstrap usa um sistema de 12 colunas flexível:

#### **Container**
```html
<div class="container">
```
- **O que faz**: Cria uma área centralizada com largura máxima responsiva
- **Breakpoints**:
  - Mobile: 100% da largura
  - Tablet (≥768px): 720px
  - Desktop (≥992px): 960px
  - Large (≥1200px): 1140px
- **Quando usar**: Para conter o conteúdo principal de qualquer seção

#### **Container-fluid**
```html
<div class="container-fluid">
```
- **O que faz**: Container que ocupa 100% da largura em todos os tamanhos
- **Quando usar**: Na navbar para que ela se estenda por toda a tela

#### **Row (Linha)**
```html
<div class="row">
```
- **O que faz**: Cria uma linha horizontal que contém colunas
- **Importante**: Usa `display: flex` por baixo dos panos
- **Quando usar**: Sempre que quiser organizar conteúdo em colunas

#### **Columns (Colunas)**
```html
<div class="col-md-6 col-lg-3">
```
- **O que faz**: Define quantas das 12 colunas o elemento ocupará
- **Explicação dos breakpoints**:
  - `col-` (sem prefixo): Mobile (sempre, <576px)
  - `col-sm-`: Small (≥576px)
  - `col-md-`: Medium (≥768px)
  - `col-lg-`: Large (≥992px)
  - `col-xl-`: Extra Large (≥1200px)
- **Exemplo prático**:
  ```html
  <div class="col-md-6 col-lg-3">
  ```
  - Em mobile: 100% de largura (1 coluna por linha)
  - Em tablet (md): 50% de largura (2 colunas por linha) 
  - Em desktop (lg): 25% de largura (4 colunas por linha)

#### **Gaps (Espaçamento entre colunas)**
```html
<div class="row g-4">
```
- **O que faz**: Define o espaçamento entre colunas (gutter)
- **Valores**: `g-0` (sem gap), `g-1`, `g-2`, `g-3`, `g-4`, `g-5`
- **Quando usar**: Para controlar o espaço entre cards ou elementos

---

### 🧭 **2. NAVBAR (Barra de Navegação)**

#### **Estrutura Básica**
```html
<nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
```

**Classes explicadas:**
- `navbar`: Classe base para criar uma barra de navegação
- `navbar-expand-lg`: Menu se expande em telas large (≥992px), vira hambúrguer em telas menores
- `navbar-light`: Estilo de cores claras (texto escuro em fundo claro)
  - Alternativa: `navbar-dark` para texto claro em fundo escuro
- `bg-light`: Fundo cinza claro do Bootstrap
- `sticky-top`: Fixa a navbar no topo quando você rola a página
- `shadow-sm`: Adiciona uma sombra pequena (small) embaixo

#### **Brand (Logo/Nome)**
```html
<a class="navbar-brand fw-bold" href="./">
```
- `navbar-brand`: Estiliza o nome/logo da marca
- `fw-bold`: Font weight bold (negrito)
- **Cor definida via CSS customizado** (não mais `text-primary`)

#### **Toggler (Botão Hambúrguer)**
```html
<button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
    <span class="navbar-toggler-icon"></span>
</button>
```
- `navbar-toggler`: Estiliza o botão hambúrguer
- `data-bs-toggle="collapse"`: Atributo que diz "ao clicar, abra/feche"
- `data-bs-target="#navbarNav"`: Qual elemento será expandido/colapsado
- `navbar-toggler-icon`: Ícone de 3 linhas (hambúrguer)

#### **Collapse (Menu Colapsável)**
```html
<div class="collapse navbar-collapse" id="navbarNav">
```
- `collapse`: Esconde o elemento inicialmente em telas pequenas
- `navbar-collapse`: Comportamento específico para navbar

#### **Nav Items (Itens do Menu)**
```html
<ul class="navbar-nav ms-auto">
    <li class="nav-item">
        <a class="nav-link active" href="./">Home</a>
    </li>
</ul>
```
- `navbar-nav`: Lista de navegação
- `ms-auto`: Margin start (esquerda) automático → empurra menu para direita
- `nav-item`: Cada item da lista
- `nav-link`: Link de navegação
- `active`: Marca o link da página atual

---

### 🎠 **3. CAROUSEL (Carrossel)**

#### **Estrutura Completa**
```html
<div id="carouselPromocoes" class="carousel slide" data-bs-ride="carousel">
```
- `carousel`: Classe base do carrossel
- `slide`: Adiciona animação de deslize entre slides
- `data-bs-ride="carousel"`: Inicia automaticamente ao carregar
- `id="carouselPromocoes"`: Identificador único para controles

#### **Indicators (Indicadores)**
```html
<div class="carousel-indicators">
    <button data-bs-target="#carouselPromocoes" data-bs-slide-to="0" class="active"></button>
    <button data-bs-target="#carouselPromocoes" data-bs-slide-to="1"></button>
</div>
```
- **O que faz**: Aqueles pontinhos na parte inferior que mostram qual slide está ativo
- `carousel-indicators`: Container dos indicadores
- `data-bs-slide-to="0"`: Qual slide este botão ativa (começa em 0)
- `active`: Marca o indicador do slide atual

#### **Inner (Conteúdo dos Slides)**
```html
<div class="carousel-inner">
    <div class="carousel-item active">
        <img src="..." class="d-block w-100" alt="...">
        <div class="carousel-caption">
            <h3>Título</h3>
            <p>Descrição</p>
        </div>
    </div>
</div>
```
- `carousel-inner`: Container de todos os slides
- `carousel-item`: Cada slide individual
- `active`: Primeiro slide visível (obrigatório em pelo menos um)
- `d-block`: Display block
- `w-100`: Width 100% (ocupa toda largura)
- `carousel-caption`: Texto sobre a imagem

#### **Controls (Setas de Navegação)**
```html
<button class="carousel-control-prev" data-bs-target="#carouselPromocoes" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"></span>
    <span class="visually-hidden">Anterior</span>
</button>
```
- `carousel-control-prev`: Seta esquerda (anterior)
- `carousel-control-next`: Seta direita (próximo)
- `visually-hidden`: Esconde texto visualmente, mas leitores de tela leem

---

### 🃏 **4. CARDS (Cartões)**

#### **Estrutura Básica**
```html
<div class="card h-100 shadow-sm hover-card">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Título</h5>
        <p class="card-text">Descrição</p>
        <a href="#" class="btn btn-primary">Botão</a>
    </div>
</div>
```

**Classes explicadas:**
- `card`: Container principal do cartão
- `h-100`: Height 100% → todos os cards ficam da mesma altura
- `shadow-sm`: Sombra pequena
- `card-img-top`: Imagem no topo do card
- `card-body`: Conteúdo do card (padding automático)
- `card-title`: Título estilizado
- `card-text`: Texto do corpo
- `text-center`: Alinha texto ao centro

---

### 🔘 **5. BUTTONS (Botões)**

```html
<button class="btn btn-primary w-100">Texto</button>
```

**Variações de cor:**
- `btn-primary`: Azul (ação principal)
- `btn-secondary`: Cinza (ação secundária)
- `btn-success`: Verde (sucesso)
- `btn-danger`: Vermelho (perigo)
- `btn-warning`: Amarelo (aviso)
- `btn-info`: Azul claro (informação)
- `btn-light`: Claro
- `btn-dark`: Escuro

**Variações de estilo:**
- `btn-outline-primary`: Apenas borda, fundo transparente
- `btn-lg`: Botão grande
- `btn-sm`: Botão pequeno
- `w-100`: Width 100% (ocupa toda largura)

---

### 📝 **6. FORMS (Formulários)**

#### **Form Control (Inputs)**
```html
<input type="text" class="form-control" id="nome" required>
<div class="invalid-feedback">Mensagem de erro</div>
```
- `form-control`: Estiliza inputs, textareas e selects
- `invalid-feedback`: Mensagem de erro (aparece quando input é inválido)
- `valid-feedback`: Mensagem de sucesso

#### **Form Label**
```html
<label for="nome" class="form-label">Nome *</label>
```
- `form-label`: Estiliza labels de formulários
- `for="nome"`: Conecta o label ao input com `id="nome"`

#### **Form Select**
```html
<select class="form-select" id="tipo">
    <option value="">Selecione...</option>
</select>
```
- `form-select`: Estiliza dropdowns (select)

#### **Form Check (Checkboxes e Radios)**
```html
<div class="form-check">
    <input class="form-check-input" type="checkbox" id="check1">
    <label class="form-check-label" for="check1">Opção</label>
</div>
```
- `form-check`: Container
- `form-check-input`: Estiliza checkbox/radio
- `form-check-label`: Label para checkbox/radio

#### **Validação**
```html
<form class="was-validated" novalidate>
```
- `was-validated`: Ativa estilos de validação
- `novalidate`: Desabilita validação padrão do navegador (para usar validação customizada)

---

### 🎨 **7. UTILITÁRIOS (Classes de Ajuda)**

#### **Spacing (Espaçamento)**
```html
<div class="mt-3 mb-4 p-2">
```
**Sistema:** `{property}{sides}-{size}`

**Properties (Propriedades):**
- `m`: margin
- `p`: padding

**Sides (Lados):**
- `t`: top (topo)
- `b`: bottom (inferior)
- `s`: start (esquerda em LTR)
- `e`: end (direita em LTR)
- `x`: horizontal (left + right)
- `y`: vertical (top + bottom)
- (sem letra): todos os lados

**Sizes (Tamanhos):**
- `0`: 0
- `1`: 0.25rem (4px)
- `2`: 0.5rem (8px)
- `3`: 1rem (16px)
- `4`: 1.5rem (24px)
- `5`: 3rem (48px)
- `auto`: automático

**Exemplos:**
- `mt-3`: margin-top: 1rem
- `mb-4`: margin-bottom: 1.5rem
- `py-5`: padding-top e padding-bottom: 3rem
- `ms-auto`: margin-left: auto (empurra para direita)

#### **Typography (Tipografia)**
```html
<h1 class="display-4 fw-bold text-center">
```
- `display-1` a `display-6`: Títulos grandes e destacados
- `lead`: Texto de destaque (maior que normal)
- `fw-bold`: Font weight bold (negrito)
- `fw-normal`: Font weight normal
- `fw-light`: Font weight light (fino)
- `text-center`: Alinha texto ao centro
- `text-start`: Alinha à esquerda
- `text-end`: Alinha à direita
- `text-muted`: Texto acinzentado

#### **Colors (Cores de Texto)**
```html
<p class="text-primary">
```
- `text-primary`: Azul
- `text-secondary`: Cinza
- `text-success`: Verde
- `text-danger`: Vermelho
- `text-warning`: Amarelo
- `text-info`: Azul claro
- `text-white`: Branco
- `text-dark`: Preto

#### **Background Colors**
```html
<div class="bg-primary text-white">
```
- `bg-primary`, `bg-secondary`, `bg-success`, etc.
- `bg-light`: Fundo claro
- `bg-dark`: Fundo escuro

#### **Display**
```html
<div class="d-none d-md-block">
```
- `d-none`: Display none (esconde)
- `d-block`: Display block
- `d-flex`: Display flex
- `d-inline`: Display inline
- Adicione breakpoints: `d-md-block` (mostra apenas em tablets+)

#### **Flex Utilities**
```html
<div class="d-flex justify-content-center align-items-center">
```
- `justify-content-center`: Centraliza horizontalmente
- `justify-content-between`: Espaça elementos igualmente
- `align-items-center`: Centraliza verticalmente
- `flex-column`: Muda direção para coluna

#### **Borders e Rounded**
```html
<div class="rounded shadow-sm border">
```
- `rounded`: Bordas arredondadas
- `rounded-circle`: Círculo perfeito
- `shadow-sm`: Sombra pequena
- `shadow`: Sombra média
- `shadow-lg`: Sombra grande
- `border`: Adiciona borda
- `border-0`: Remove borda

---

### 🎭 **8. ALERTS (Alertas)**

```html
<div class="alert alert-success alert-dismissible" role="alert">
    <h4 class="alert-heading">Título</h4>
    <p>Mensagem</p>
    <button class="btn-close" data-bs-dismiss="alert"></button>
</div>
```
- `alert`: Classe base
- `alert-success`: Alerta verde (sucesso)
- `alert-danger`: Alerta vermelho (erro)
- `alert-warning`: Alerta amarelo (aviso)
- `alert-dismissible`: Permite fechar o alerta
- `btn-close`: Botão X para fechar

---

## 🎨 **PARTE 2: CSS CUSTOMIZADO**

Agora vamos entender o CSS que escrevemos no arquivo `style.css`:

### 🔧 **1. VARIÁVEIS CSS**

```css
:root {
  --primary-color: #0d6efd;
  --secondary-color: #ffc107;
  --success-color: #198754;
  --dark-color: #212529;
  --text-color: #333;
}
```

**O que são:**
- Variáveis reutilizáveis em todo o CSS
- Definidas em `:root` (raiz do documento)
- Usadas com `var(--nome-da-variavel)`

**Por que usar:**
- Manutenção fácil: muda em um lugar, aplica em todos
- Consistência de cores no site
- Facilita temas (claro/escuro)

**Como usar:**
```css
.meu-elemento {
  color: var(--primary-color);
}
```

---

### 🌀 **2. TRANSIÇÕES**

```css
* {
  transition: all 0.3s ease;
}
```

**O que faz:**
- Aplica transição suave em TODAS as mudanças de estilo
- `all`: Transiciona todas as propriedades
- `0.3s`: Duração de 0.3 segundos
- `ease`: Curva de animação (começa devagar, acelera, termina devagar)

**Outras opções:**
- `ease-in`: Começa devagar
- `ease-out`: Termina devagar
- `linear`: Velocidade constante
- `ease-in-out`: Suave no início e fim

**Transição específica:**
```css
.botao {
  transition: background-color 0.3s ease, transform 0.2s ease;
}
```
Transiciona apenas `background-color` e `transform`.

---

### 🎴 **3. HOVER EFFECTS (Efeitos ao Passar o Mouse)**

```css
.hover-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.hover-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2) !important;
}
```

**Explicação linha por linha:**
- `transition`: Prepara animação suave
- `cursor: pointer`: Muda cursor para "mãozinha"
- `:hover`: Pseudo-classe ativada ao passar mouse
- `transform: translateY(-10px)`: Move elemento 10px para CIMA (Y negativo = sobe)
- `box-shadow`: Sombra
  - `0`: Deslocamento horizontal
  - `8px`: Deslocamento vertical
  - `20px`: Desfoque (blur)
  - `rgba(0,0,0,0.2)`: Cor preta com 20% de opacidade
- `!important`: Força aplicação (sobrescreve outras regras)

---

### 🔗 **4. PSEUDO-ELEMENTOS (::before e ::after)**

```css
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: width 0.3s ease, left 0.3s ease;
}

.nav-link:hover::after {
  width: 80%;
  left: 10%;
}
```

**O que acontece:**
1. Cria uma linha invisível (`width: 0`) abaixo do link
2. Linha começa no centro (`left: 50%`)
3. Ao passar o mouse:
   - Linha cresce para 80% da largura
   - Se reposiciona para começar em 10% (centralizando)
4. Efeito: linha animada que aparece de baixo

**content: ''**: Obrigatório em ::before e ::after (pode ser vazio)

---

### 🎬 **5. KEYFRAMES (Animações Customizadas)**

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeInUp 0.6s ease;
}
```

**Como funciona:**
1. `@keyframes fadeInUp`: Define a animação
2. `from`: Estado inicial (invisível e 30px abaixo)
3. `to`: Estado final (visível e posição original)
4. `animation: fadeInUp 0.6s ease`: Aplica a animação
   - Nome da animação
   - Duração: 0.6 segundos
   - Curva: ease

**Outra animação (gradiente animado):**
```css
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

header {
  background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 50%, #ffc107 100%);
  animation: gradientShift 10s ease infinite;
  background-size: 200% 200%;
}
```
- `0%`, `50%`, `100%`: Pontos da animação
- `infinite`: Loop infinito
- `background-size: 200% 200%`: Dobra tamanho para permitir movimento

---

### 🖼️ **6. POSITION (Posicionamento)**

```css
.nav-link::after {
  position: absolute;
  bottom: 0;
  left: 50%;
}
```

**Tipos de position:**

**static (padrão):**
- Fluxo normal do documento
- Não aceita top, left, right, bottom

**relative:**
- Posicionado relativo à sua posição original
- Aceita top, left, right, bottom
- Não sai do fluxo (mantém espaço)

**absolute:**
- Posicionado relativo ao ancestral com `position: relative`
- Sai do fluxo (não ocupa espaço)
- Usado para elementos flutuantes

**fixed:**
- Posicionado relativo à viewport (janela)
- Fica fixo mesmo ao rolar a página
- Exemplo: navbar fixa

**sticky:**
- Híbrido entre relative e fixed
- Fica relative até certo ponto, depois vira fixed
- Usado em: `sticky-top` do Bootstrap

---

### 🎭 **7. SELETORES AVANÇADOS**

```css
/* Elemento com classe */
.card:hover .card-img-top {
  transform: scale(1.1);
}
```
**Significado:** Quando passar mouse no `.card`, aplica efeito no `.card-img-top` que está dentro dele.

```css
/* Todos os elementos */
* {
  transition: all 0.3s ease;
}
```

```css
/* Pseudo-classe */
.nav-link.active {
  color: #ffffff !important;
}
```
**Significado:** Link que tem AMBAS as classes (`.nav-link` E `.active`)

---

### 📐 **8. FLEXBOX (usado no Bootstrap, mas útil entender)**

```css
.d-flex {
  display: flex;
}

.justify-content-center {
  justify-content: center; /* Centraliza horizontalmente */
}

.align-items-center {
  align-items: center; /* Centraliza verticalmente */
}
```

**Propriedades principais:**
- `flex-direction`: row | column (direção dos itens)
- `justify-content`: Alinhamento no eixo principal
  - `flex-start`, `center`, `flex-end`, `space-between`, `space-around`
- `align-items`: Alinhamento no eixo transversal
- `flex-wrap`: wrap | nowrap (quebra linha ou não)

---

### 🌈 **9. GRADIENTES**

```css
header {
  background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 50%, #ffc107 100%);
}
```

**Explicação:**
- `linear-gradient`: Gradiente linear
- `135deg`: Ângulo (diagonal)
- `#0d6efd 0%`: Azul no início
- `#0a58ca 50%`: Azul escuro no meio
- `#ffc107 100%`: Amarelo no fim

**Outras opções:**
```css
/* Gradiente radial */
background: radial-gradient(circle, blue, red);

/* Múltiplos pontos */
background: linear-gradient(to right, red 0%, yellow 50%, green 100%);
```

---

### 📦 **10. BOX-SHADOW (Sombras)**

```css
.card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
```

**Sintaxe:**
```css
box-shadow: [horizontal] [vertical] [blur] [spread] [color];
```

**Valores:**
- `0`: Deslocamento horizontal (0 = centralizado)
- `10px`: Deslocamento vertical (positivo = para baixo)
- `25px`: Blur (desfoque)
- `0`: Spread (tamanho da sombra) - opcional
- `rgba(0,0,0,0.15)`: Cor (preto com 15% de opacidade)

**Exemplos:**
```css
/* Sombra à direita */
box-shadow: 5px 0 10px rgba(0,0,0,0.1);

/* Múltiplas sombras */
box-shadow: 0 2px 5px rgba(0,0,0,0.1), 0 5px 15px rgba(0,0,0,0.2);

/* Sombra interna */
box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
```

---

### 🖱️ **11. CURSOR**

```css
.hover-card {
  cursor: pointer;
}
```

**Opções:**
- `default`: Seta padrão
- `pointer`: Mãozinha (link)
- `text`: Cursor de texto (I)
- `move`: Cruz de movimento
- `not-allowed`: Proibido
- `grab`: Mão aberta
- `grabbing`: Mão fechada

---

### 📱 **12. MEDIA QUERIES (Responsividade)**

```css
@media (max-width: 768px) {
  .display-4 {
    font-size: 2rem;
  }
  
  .card-img-top {
    height: 200px !important;
  }
}
```

**O que faz:**
- Aplica estilos apenas quando condição é verdadeira
- `max-width: 768px`: Telas até 768px (tablets e celulares)
- `min-width: 992px`: Telas a partir de 992px (desktops)

**Breakpoints comuns:**
- 576px: Celulares
- 768px: Tablets
- 992px: Desktops
- 1200px: Telas grandes

---

### 🎨 **13. OBJECT-FIT (Ajuste de Imagens)**

```css
.carousel-image-wrapper img {
  height: 400px;
  object-fit: cover;
  object-position: center;
}
```

**object-fit:**
- `cover`: Cobre área toda, corta excesso (mantém proporção)
- `contain`: Cabe toda imagem, pode sobrar espaço
- `fill`: Estica imagem (distorce)
- `none`: Tamanho original
- `scale-down`: Menor entre none e contain

**object-position:**
- `center`: Centraliza a imagem
- `top`: Alinha ao topo
- `left`: Alinha à esquerda

---

### 🔄 **14. TRANSFORM (Transformações)**

```css
.hover-card:hover {
  transform: translateY(-10px);
}

.card:hover .card-img-top {
  transform: scale(1.1);
}
```

**Funções de transform:**
- `translate(x, y)`: Move elemento
  - `translateX(10px)`: Move horizontalmente
  - `translateY(-10px)`: Move verticalmente
- `scale(n)`: Aumenta/diminui tamanho
  - `scale(1.1)`: 110% do tamanho
  - `scale(0.5)`: 50% do tamanho
- `rotate(deg)`: Rotaciona
  - `rotate(45deg)`: Rotaciona 45 graus
- `skew(deg)`: Inclina

**Múltiplas transformações:**
```css
transform: translateX(10px) rotate(45deg) scale(1.2);
```

---

### 🌐 **15. SCROLLBAR CUSTOMIZADA**

```css
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--secondary-color);
}
```

**Partes da scrollbar:**
- `::-webkit-scrollbar`: A barra toda
- `::-webkit-scrollbar-track`: O trilho (fundo)
- `::-webkit-scrollbar-thumb`: A parte que você arrasta
- `::-webkit-scrollbar-thumb:hover`: Thumb ao passar mouse

**Nota:** Funciona apenas em navegadores Chromium (Chrome, Edge, Opera)

---

### 🎯 **16. ESTADOS DE SELEÇÃO (Cards Clicáveis)**

```css
.servico-card {
  cursor: pointer;
  border: 2px solid #dee2e6;
}

.servico-card.selected {
  border: 3px solid #0d6efd;
  background-color: #e7f3ff;
  box-shadow: 0 8px 20px rgba(13, 110, 253, 0.3);
}

.servico-card.selected::after {
  content: '✓';
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #0d6efd;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

**O que acontece:**
1. Card normal tem borda cinza fina
2. Ao ser selecionado (classe `.selected` adicionada via JS):
   - Borda fica azul e mais grossa
   - Fundo fica azul clarinho
   - Adiciona sombra azul
3. Pseudo-elemento `::after` cria um círculo azul com ✓
   - `content: '✓'`: Checkmark
   - `border-radius: 50%`: Transforma quadrado em círculo
   - `display: flex` + `align-items` + `justify-content`: Centraliza o ✓

---

## 🎓 **BOAS PRÁTICAS**

### ✅ **DOs (Faça isso):**

1. **Use classes reutilizáveis**
   ```html
   <button class="btn btn-primary">OK</button>
   ```

2. **Combine Bootstrap com CSS customizado**
   ```html
   <div class="card hover-card">
   ```

3. **Use variáveis CSS**
   ```css
   color: var(--primary-color);
   ```

4. **Mobile-first**
   ```css
   /* Primeiro mobile */
   .elemento { font-size: 14px; }
   
   /* Depois desktop */
   @media (min-width: 768px) {
     .elemento { font-size: 16px; }
   }
   ```

5. **Nomes de classes descritivos**
   ```css
   .servico-card { }
   .hover-card { }
   ```

### ❌ **DON'Ts (Evite isso):**

1. **Inline styles**
   ```html
   ❌ <div style="color: red;">
   ✅ <div class="text-danger">
   ```

2. **IDs para styling** (use classes)
   ```css
   ❌ #meuElemento { }
   ✅ .meu-elemento { }
   ```

3. **!important excessivo**
   ```css
   ❌ color: red !important;
   ✅ Seja mais específico no seletor
   ```

4. **Magic numbers** (use variáveis)
   ```css
   ❌ padding: 17px;
   ✅ padding: var(--spacing-md);
   ```

---

## 🚀 **EXERCÍCIOS PRÁTICOS**

Teste seu conhecimento:

1. **Crie um card que:**
   - Tenha sombra
   - Suba 5px ao passar o mouse
   - Imagem escale 110%
   - Transição suave

2. **Faça uma navbar que:**
   - Fique fixa no topo
   - Vire hambúrguer em mobile
   - Links tenham linha animada embaixo

3. **Construa um botão que:**
   - Seja azul normalmente
   - Fique verde ao passar mouse
   - Tenha transição de 0.3s
   - Aumente 5% de tamanho no hover

---

## 📚 **RECURSOS PARA CONTINUAR APRENDENDO**

- **Bootstrap Docs**: https://getbootstrap.com/docs/5.3/
- **MDN CSS**: https://developer.mozilla.org/pt-BR/docs/Web/CSS
- **CSS Tricks**: https://css-tricks.com/
- **Flexbox Froggy**: https://flexboxfroggy.com/ (jogo para aprender flexbox)
- **Grid Garden**: https://cssgridgarden.com/ (jogo para aprender grid)

---

**💡 Dica Final:** A melhor forma de aprender é **praticando**! Abra o DevTools do navegador (F12), inspecione elementos e experimente mudar valores para ver o que acontece.
