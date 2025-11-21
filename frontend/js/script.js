// ========================================
// JavaScript Customizado - Pet Shop
// ========================================

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
  console.log('Pet Shop - Sistema carregado!');
  
  // Destaca a página ativa no menu de navegação
  highlightActiveNavItem();
  
  // Adiciona animação suave aos links internos
  addSmoothScrolling();
  
  // Adiciona interatividade aos produtos
  addProductInteractions();
  
  // Inicia o carrossel automático com controles temporais
  initCarousel();
});

/**
 * Destaca o item ativo no menu de navegação
 */
function highlightActiveNavItem() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    
    // Verifica se o link corresponde à página atual
    if (currentPath === linkPath || 
        (currentPath.endsWith('/') && currentPath === linkPath + '/') ||
        (linkPath.endsWith('/') && currentPath + '/' === linkPath)) {
      link.style.backgroundColor = 'var(--primary-color, #4a90e2)';
      link.style.color = 'white';
    }
  });
}

/**
 * Adiciona rolagem suave para links âncora
 */
function addSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId !== '#') {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

/**
 * Adiciona interações aos produtos/articles
 */
function addProductInteractions() {
  const articles = document.querySelectorAll('article');
  
  articles.forEach(article => {
    // Adiciona efeito de destaque ao passar o mouse
    article.addEventListener('mouseenter', function() {
      this.style.borderLeft = '4px solid var(--secondary-color, #f39c12)';
    });
    
    article.addEventListener('mouseleave', function() {
      this.style.borderLeft = 'none';
    });
    
    // Adiciona funcionalidade de clique (pode ser expandido futuramente)
    article.addEventListener('click', function() {
      console.log('Produto clicado:', this.querySelector('h3')?.textContent);
    });
  });
}

/**
 * Função auxiliar para formatar valores monetários
 */
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

/**
 * Função para exibir mensagens toast (pode ser usado com Bootstrap)
 */
function showToast(message, type = 'info') {
  // Esta função pode ser expandida para usar os toasts do Bootstrap
  console.log(`[${type.toUpperCase()}] ${message}`);
}

/**
 * Inicializa o carrossel com controle temporal automático
 * Demonstra o uso de setTimeout e setInterval
 */
function initCarousel() {
  const carouselElement = document.getElementById('carouselPromocoes');
  
  if (!carouselElement) {
    return; // Carrossel não existe nesta página
  }
  
  // Inicializa o carrossel do Bootstrap
  const carousel = new bootstrap.Carousel(carouselElement, {
    interval: 4000, // Troca a cada 4 segundos
    wrap: true,     // Volta ao início após o último slide
    pause: 'hover'  // Pausa quando o mouse está sobre o carrossel
  });
  
  // Adiciona contador de visualizações usando setTimeout
  let slideCounter = 0;
  const slides = carouselElement.querySelectorAll('.carousel-item');
  
  // Mostra mensagem de boas-vindas após 2 segundos
  setTimeout(() => {
    console.log('🐾 Bem-vindo ao Pet Shop! Confira nossas promoções no carrossel!');
  }, 2000);
  
  // Contador de tempo total de visualização usando setInterval
  let tempoTotal = 0;
  const contadorTempo = setInterval(() => {
    tempoTotal++;
    if (tempoTotal % 10 === 0) {
      console.log(`⏱️ Você está navegando há ${tempoTotal} segundos`);
    }
  }, 1000);
  
  // Event listener para mudanças de slide
  carouselElement.addEventListener('slide.bs.carousel', function(event) {
    slideCounter++;
    const slideAtual = event.to + 1;
    const totalSlides = slides.length;
    
    console.log(`🖼️ Slide ${slideAtual}/${totalSlides} - Total de trocas: ${slideCounter}`);
    
    // Destaca promoção especial após 3 trocas de slide
    if (slideCounter === 3) {
      setTimeout(() => {
        console.log('🎉 PROMOÇÃO ESPECIAL: Você está engajado! Use o cupom PETLOVER10 para 10% de desconto!');
      }, 500);
    }
  });
  
  // Para o contador quando o usuário sai da página
  window.addEventListener('beforeunload', () => {
    clearInterval(contadorTempo);
    console.log(`👋 Até logo! Você ficou ${tempoTotal} segundos na página.`);
  });
  
  // Controle manual: pausar/retomar com teclas
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      carousel.next();
      console.log('➡️ Próximo slide (atalho de teclado)');
    } else if (event.key === 'ArrowLeft') {
      carousel.prev();
      console.log('⬅️ Slide anterior (atalho de teclado)');
    } else if (event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
      if (carouselElement.classList.contains('paused')) {
        carousel.cycle();
        carouselElement.classList.remove('paused');
        console.log('▶️ Carrossel retomado');
      } else {
        carousel.pause();
        carouselElement.classList.add('paused');
        console.log('⏸️ Carrossel pausado');
      }
    }
  });
  
  console.log('🎠 Carrossel inicializado com sucesso!');
  console.log('💡 Dicas: Use ← → para navegar | Espaço para pausar/retomar');
}
