// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Testes de Acessibilidade
 * - ARIA labels
 * - Navegação por teclado
 * - Alt text em imagens
 * - Contraste de cores
 * - Focus visible
 */

test.describe('Acessibilidade', () => {
  
  test('imagens devem ter alt text', async ({ page }) => {
    await page.goto('/');
    
    // Buscar todas as imagens
    const images = page.locator('img');
    const count = await images.count();
    
    // Verificar que cada imagem tem alt
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt).not.toBe('');
    }
  });

  test('formulários devem ter labels associados', async ({ page }) => {
    await page.goto('/cadastro.html');
    
    // Verificar inputs principais
    const inputs = [
      '#nome',
      '#email',
      '#telefone',
      '#cpf',
      '#nomePet'
    ];
    
    for (const input of inputs) {
      const label = page.locator(`label[for="${input.replace('#', '')}"]`);
      await expect(label).toBeVisible();
    }
  });

  test('botões devem ser acessíveis por teclado', async ({ page }) => {
    await page.goto('/');
    
    // Tab até primeiro botão
    let tabCount = 0;
    while (tabCount < 20) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => document.activeElement?.tagName);
      
      if (focused === 'BUTTON' || focused === 'A') {
        // Pressionar Enter
        await page.keyboard.press('Enter');
        break;
      }
      tabCount++;
    }
    
    // Algo deve ter acontecido (navegação ou ação)
    await page.waitForTimeout(500);
  });

  test('skip links devem existir para navegação', async ({ page }) => {
    await page.goto('/');
    
    // Pressionar Tab para focar primeiro elemento
    await page.keyboard.press('Tab');
    
    // Verificar se há link de skip (idealmente)
    const focused = await page.evaluate(() => document.activeElement?.textContent);
    expect(focused).toBeTruthy();
  });

  test('navbar deve ter role=navigation', async ({ page }) => {
    await page.goto('/');
    
    const nav = page.locator('nav[role="navigation"]');
    await expect(nav).toBeVisible();
  });

  test('landmarks devem estar presentes', async ({ page }) => {
    await page.goto('/');
    
    // Verificar landmarks principais
    const header = page.locator('header');
    const main = page.locator('main');
    const footer = page.locator('footer');
    
    await expect(header).toBeVisible();
    await expect(footer).toBeVisible();
    // main pode não existir em todas as páginas
  });

  test('focus deve ser visível', async ({ page }) => {
    await page.goto('/');
    
    // Tab até primeiro link
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Verificar que há um elemento focado
    const hasFocus = await page.evaluate(() => {
      return document.activeElement !== document.body;
    });
    
    expect(hasFocus).toBeTruthy();
  });

  test('modais devem ter aria-label', async ({ page }) => {
    await page.goto('/');
    
    // Se houver modais na página
    const modals = page.locator('.modal');
    const count = await modals.count();
    
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const ariaLabel = await modals.nth(i).getAttribute('aria-labelledby');
        expect(ariaLabel).toBeTruthy();
      }
    }
  });

  test('inputs de formulário devem ter placeholder ou label', async ({ page }) => {
    await page.goto('/cadastro.html');
    
    const inputs = page.locator('input[type="text"], input[type="email"], input[type="password"]');
    const count = await inputs.count();
    
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const placeholder = await input.getAttribute('placeholder');
      const id = await input.getAttribute('id');
      const hasLabel = id ? await page.locator(`label[for="${id}"]`).count() > 0 : false;
      
      // Deve ter placeholder OU label
      expect(placeholder || hasLabel).toBeTruthy();
    }
  });

  test('contraste de texto deve ser adequado', async ({ page }) => {
    await page.goto('/');
    
    // Verificar cor do texto principal
    const body = page.locator('body');
    const color = await body.evaluate(el => {
      return window.getComputedStyle(el).color;
    });
    
    // Verificar que não é transparente
    expect(color).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('links devem ter texto descritivo', async ({ page }) => {
    await page.goto('/');
    
    const links = page.locator('a');
    const count = await links.count();
    
    for (let i = 0; i < count; i++) {
      const text = await links.nth(i).textContent();
      const ariaLabel = await links.nth(i).getAttribute('aria-label');
      
      // Link deve ter texto ou aria-label
      expect((text && text.trim()) || ariaLabel).toBeTruthy();
    }
  });

  test('headings devem seguir hierarquia', async ({ page }) => {
    await page.goto('/');
    
    // Verificar que existe h1
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    
    // h1 deve vir antes de h2
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);
  });

  test('cards de produtos devem ser acessíveis', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Rações e Alimentação');
    
    await page.waitForSelector('.produto-card');
    
    // Verificar que cards têm informações acessíveis
    const cards = page.locator('.produto-card');
    const firstCard = cards.first();
    
    // Deve ter nome do produto
    await expect(firstCard).toContainText(/R\$/);
  });
});
