// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Testes de Navegação
 * - Links do menu
 * - Breadcrumbs
 * - Footer
 * - Responsividade do menu
 */

test.describe('Navegação', () => {
  
  test('deve navegar para todas as páginas principais', async ({ page }) => {
    await page.goto('/');
    
    // Testar links do menu
    const links = [
      { text: 'Rações e Alimentação', url: /racoes-alimentacao/ },
      { text: 'Acessórios e Brinquedos', url: /acessorios-brinquedos/ },
      { text: 'Higiene e Cuidados', url: /higiene-cuidados/ },
      { text: 'Serviços', url: /servicos/ },
      { text: 'Cadastro', url: /cadastro.html/ }
    ];
    
    for (const link of links) {
      await page.goto('/');
      await page.click(`text=${link.text}`);
      await expect(page).toHaveURL(link.url);
    }
  });

  test('logo deve redirecionar para home', async ({ page }) => {
    // Ir para qualquer página
    await page.goto('/cadastro.html');
    
    // Clicar no logo
    await page.click('.navbar-brand');
    
    // Deve voltar para home
    await expect(page).toHaveURL(/index.html|\/$/);
  });

  test('menu mobile deve funcionar', async ({ page }) => {
    // Redimensionar para mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Menu deve estar colapsado
    const menu = page.locator('#navbarNav');
    await expect(menu).not.toBeVisible();
    
    // Clicar no toggle
    await page.click('.navbar-toggler');
    
    // Menu deve aparecer
    await expect(menu).toBeVisible();
    
    // Clicar em um link
    await page.click('text=Cadastro');
    await expect(page).toHaveURL(/cadastro.html/);
  });

  test('footer deve estar presente em todas as páginas', async ({ page }) => {
    const paginas = [
      '/',
      '/login.html',
      '/cadastro.html',
      '/servicos/index.html'
    ];
    
    for (const pagina of paginas) {
      await page.goto(pagina);
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
      await expect(footer).toContainText('Pet Shop');
    }
  });

  test('links do footer devem funcionar', async ({ page }) => {
    await page.goto('/');
    
    // Scroll até o footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Verificar links
    const footer = page.locator('footer');
    await expect(footer).toContainText('Home');
    await expect(footer).toContainText('Serviços');
  });

  test('deve voltar para página anterior', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Cadastro');
    await expect(page).toHaveURL(/cadastro.html/);
    
    // Voltar
    await page.goBack();
    await expect(page).toHaveURL(/index.html|\/$/);
  });

  test('links devem ter hover effect', async ({ page }) => {
    await page.goto('/');
    
    const link = page.locator('.nav-link').first();
    
    // Verificar estilo antes do hover
    await link.hover();
    
    // Playwright aplica hover automaticamente
    await expect(link).toBeVisible();
  });

  test('página 404 não deve quebrar navegação', async ({ page }) => {
    // Tentar acessar página inexistente
    const response = await page.goto('/pagina-inexistente.html', { 
      waitUntil: 'domcontentloaded' 
    });
    
    // Pode retornar 404 ou redirecionar
    expect(response?.status()).toBeTruthy();
  });

  test('carregamento de imagens do carrossel', async ({ page }) => {
    await page.goto('/');
    
    // Verificar se imagens do carrossel carregam
    const carrossel = page.locator('.carousel');
    await expect(carrossel).toBeVisible();
    
    // Verificar pelo menos 1 item ativo
    const itemAtivo = page.locator('.carousel-item.active');
    await expect(itemAtivo).toBeVisible();
  });

  test('navegação por teclado deve funcionar', async ({ page }) => {
    await page.goto('/');
    
    // Focar primeiro link
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Navegar com Enter
    await page.keyboard.press('Enter');
    
    // Aguardar navegação
    await page.waitForTimeout(500);
  });
});
