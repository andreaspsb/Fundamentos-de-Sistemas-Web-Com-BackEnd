// ========================================
// Gerenciamento de Carrinho de Compras
// ========================================

/**
 * Classe para gerenciar o carrinho de compras
 */
class CarrinhoManager {
  
  static CARRINHO_KEY = 'petshop_carrinho';

  /**
   * Adiciona produto ao carrinho
   */
  static adicionarProduto(produto, quantidade = 1) {
    const carrinho = this.getCarrinho();
    
    // Verificar se produto já está no carrinho
    const itemExistente = carrinho.find(item => item.id === produto.id);
    
    if (itemExistente) {
      // Atualizar quantidade
      itemExistente.quantidade += quantidade;
      
      // Verificar estoque
      if (itemExistente.quantidade > produto.quantidadeEstoque) {
        itemExistente.quantidade = produto.quantidadeEstoque;
        alert(`⚠️ Quantidade ajustada para o estoque disponível: ${produto.quantidadeEstoque}`);
      }
    } else {
      // Adicionar novo item
      carrinho.push({
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        quantidade: quantidade,
        quantidadeEstoque: produto.quantidadeEstoque,
        urlImagem: produto.urlImagem
      });
    }
    
    this.salvarCarrinho(carrinho);
    this.atualizarContador();
    
    console.log('🛒 Produto adicionado ao carrinho:', produto.nome);
    
    // Mostrar toast de sucesso
    this.mostrarToast(`✅ ${produto.nome} adicionado ao carrinho!`);
    
    return true;
  }

  /**
   * Remove produto do carrinho
   */
  static removerProduto(produtoId) {
    let carrinho = this.getCarrinho();
    carrinho = carrinho.filter(item => item.id !== produtoId);
    this.salvarCarrinho(carrinho);
    this.atualizarContador();
    
    console.log('🗑️ Produto removido do carrinho:', produtoId);
  }

  /**
   * Atualiza quantidade de um produto
   */
  static atualizarQuantidade(produtoId, novaQuantidade) {
    const carrinho = this.getCarrinho();
    const item = carrinho.find(item => item.id === produtoId);
    
    if (item) {
      if (novaQuantidade <= 0) {
        this.removerProduto(produtoId);
      } else if (novaQuantidade > item.quantidadeEstoque) {
        alert(`⚠️ Estoque disponível: ${item.quantidadeEstoque}`);
        item.quantidade = item.quantidadeEstoque;
      } else {
        item.quantidade = novaQuantidade;
      }
      
      this.salvarCarrinho(carrinho);
      this.atualizarContador();
    }
  }

  /**
   * Retorna o carrinho
   */
  static getCarrinho() {
    const carrinho = localStorage.getItem(this.CARRINHO_KEY);
    return carrinho ? JSON.parse(carrinho) : [];
  }

  /**
   * Salva o carrinho
   */
  static salvarCarrinho(carrinho) {
    localStorage.setItem(this.CARRINHO_KEY, JSON.stringify(carrinho));
  }

  /**
   * Limpa o carrinho
   */
  static limparCarrinho() {
    localStorage.removeItem(this.CARRINHO_KEY);
    this.atualizarContador();
    console.log('🗑️ Carrinho limpo');
  }

  /**
   * Calcula o total do carrinho
   */
  static getTotal() {
    const carrinho = this.getCarrinho();
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  }

  /**
   * Retorna quantidade total de itens
   */
  static getQuantidadeTotal() {
    const carrinho = this.getCarrinho();
    return carrinho.reduce((total, item) => total + item.quantidade, 0);
  }

  /**
   * Atualiza contador do carrinho na navbar
   */
  static atualizarContador() {
    const quantidade = this.getQuantidadeTotal();
    let badge = document.getElementById('carrinhoContador');
    
    if (!badge && quantidade > 0) {
      // Criar badge se não existir
      const carrinhoLink = document.querySelector('a[href*="carrinho"]');
      if (carrinhoLink) {
        badge = document.createElement('span');
        badge.id = 'carrinhoContador';
        badge.className = 'badge bg-danger rounded-pill ms-1';
        carrinhoLink.appendChild(badge);
      }
    }
    
    if (badge) {
      if (quantidade > 0) {
        badge.textContent = quantidade;
        badge.style.display = 'inline';
      } else {
        badge.style.display = 'none';
      }
    }
  }

  /**
   * Adiciona link do carrinho na navbar
   */
  static adicionarLinkCarrinho() {
    const navbar = document.querySelector('.navbar-nav.ms-auto');
    if (!navbar) return;
    
    // Verificar se já existe
    if (document.querySelector('a[href*="carrinho"]')) return;
    
    const carrinhoPath = AuthManager ? AuthManager.getRelativePath('carrinho.html') : 'carrinho.html';
    
    const carrinhoItem = document.createElement('li');
    carrinhoItem.className = 'nav-item';
    carrinhoItem.innerHTML = `
      <a class="nav-link position-relative" href="${carrinhoPath}">
        🛒 Carrinho
        <span id="carrinhoContador" class="badge bg-danger rounded-pill ms-1" style="display: none;">0</span>
      </a>
    `;
    
    // Adicionar antes do último item (Login/User)
    const lastItem = navbar.lastElementChild;
    navbar.insertBefore(carrinhoItem, lastItem);
    
    this.atualizarContador();
  }

  /**
   * Mostra toast de notificação
   */
  static mostrarToast(mensagem) {
    // Criar toast se não existir
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toastContainer';
      toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      document.body.appendChild(toastContainer);
    }
    
    const toastId = 'toast_' + Date.now();
    const toastHTML = `
      <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header bg-success text-white">
          <strong class="me-auto">Carrinho</strong>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          ${mensagem}
        </div>
      </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toast.show();
    
    // Remover após fechar
    toastElement.addEventListener('hidden.bs.toast', () => {
      toastElement.remove();
    });
  }
}

// Expor para uso global
window.CarrinhoManager = CarrinhoManager;

// Inicializar ao carregar
document.addEventListener('DOMContentLoaded', function() {
  CarrinhoManager.adicionarLinkCarrinho();
  CarrinhoManager.atualizarContador();
});
