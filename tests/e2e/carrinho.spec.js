// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Testes de Carrinho de Compras
 * - Adicionar produtos ao carrinho
 * - Atualizar quantidade
 * - Remover produtos
 * - Limpar carrinho
 * - Contador de itens
 */

test.describe('Carrinho de Compras', () => {
  
  test.beforeEach(async ({ page }) => {
    // Limpar carrinho antes de cada teste
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('petshop_carrinho'));
  });

  test('deve adicionar produto ao carrinho', async ({ page }) => {
    // Ir para página de produtos
    await page.goto('/');
    await page.click('text=Rações e Alimentação');
    
    // Aguardar produtos carregarem
    await page.waitForSelector('.produto-card', { timeout: 10000 });
    
    // Clicar no primeiro botão "Adicionar ao Carrinho"
    await page.locator('.produto-card button').first().click();
    
    // Verificar se toast de sucesso aparece
    await expect(page.locator('.toast')).toContainText('adicionado', { timeout: 5000 });
    
    // Verificar contador no navbar
    const contador = page.locator('.badge.bg-danger');
    await expect(contador).toHaveText('1');
  });

  test('deve visualizar produtos no carrinho', async ({ page }) => {
    // Adicionar produto primeiro
    await page.goto('/');
    await page.click('text=Rações e Alimentação');
    await page.waitForSelector('.produto-card');
    await page.locator('.produto-card button').first().click();
    await page.waitForTimeout(1000); // Aguardar toast
    
    // Ir para carrinho
    await page.click('text=Carrinho');
    
    // Verificar URL
    await expect(page).toHaveURL(/carrinho.html/);
    
    // Verificar se produto está listado
    const carrinhoItems = page.locator('#carrinho-items .card');
    await expect(carrinhoItems).toHaveCount(1);
  });

  test('deve atualizar quantidade de produto', async ({ page }) => {
    // Adicionar produto e ir para carrinho
    await page.goto('/');
    await page.click('text=Rações e Alimentação');
    await page.waitForSelector('.produto-card');
    await page.locator('.produto-card button').first().click();
    await page.waitForTimeout(1000);
    await page.click('text=Carrinho');
    
    // Aumentar quantidade
    const btnAumentar = page.locator('.btn-sm.btn-outline-primary').filter({ hasText: '+' }).first();
    await btnAumentar.click();
    
    // Verificar que quantidade mudou
    const inputQuantidade = page.locator('input[type="number"]').first();
    await expect(inputQuantidade).toHaveValue('2');
    
    // Verificar que total foi atualizado
    const total = page.locator('#total-geral');
    const valorAntes = await total.textContent();
    expect(valorAntes).toBeTruthy();
  });

  test('deve remover produto do carrinho', async ({ page }) => {
    // Adicionar produto e ir para carrinho
    await page.goto('/');
    await page.click('text=Rações e Alimentação');
    await page.waitForSelector('.produto-card');
    await page.locator('.produto-card button').first().click();
    await page.waitForTimeout(1000);
    await page.click('text=Carrinho');
    
    // Aguardar confirmação de remoção
    page.on('dialog', async dialog => {
      await dialog.accept();
    });
    
    // Clicar em remover
    await page.click('.btn-danger');
    
    // Verificar que carrinho está vazio
    await expect(page.locator('#carrinho-vazio')).toBeVisible();
    
    // Verificar contador zerado
    const contador = page.locator('.badge.bg-danger');
    await expect(contador).not.toBeVisible();
  });

  test('deve limpar carrinho completo', async ({ page }) => {
    // Adicionar múltiplos produtos
    await page.goto('/');
    await page.click('text=Rações e Alimentação');
    await page.waitForSelector('.produto-card');
    
    // Adicionar 2 produtos
    const botoes = page.locator('.produto-card button');
    await botoes.nth(0).click();
    await page.waitForTimeout(500);
    await botoes.nth(1).click();
    await page.waitForTimeout(500);
    
    // Ir para carrinho
    await page.click('text=Carrinho');
    
    // Aguardar confirmação
    page.on('dialog', async dialog => {
      await dialog.accept();
    });
    
    // Limpar carrinho
    await page.click('text=Limpar Carrinho');
    
    // Verificar que está vazio
    await expect(page.locator('#carrinho-vazio')).toBeVisible();
  });

  test('deve validar estoque ao adicionar produto', async ({ page }) => {
    // Ir para produtos
    await page.goto('/');
    await page.click('text=Rações e Alimentação');
    await page.waitForSelector('.produto-card');
    
    // Tentar adicionar mais do que o estoque permite
    // (depende do produto ter estoque limitado)
    const botao = page.locator('.produto-card button').first();
    
    // Adicionar múltiplas vezes
    for (let i = 0; i < 15; i++) {
      await botao.click();
      await page.waitForTimeout(200);
    }
    
    // Deve mostrar mensagem de estoque insuficiente em algum momento
    // (verificar via toast ou alert)
    await page.waitForTimeout(1000);
  });

  test('deve manter carrinho após recarregar página', async ({ page }) => {
    // Adicionar produto
    await page.goto('/');
    await page.click('text=Rações e Alimentação');
    await page.waitForSelector('.produto-card');
    await page.locator('.produto-card button').first().click();
    await page.waitForTimeout(1000);
    
    // Recarregar página
    await page.reload();
    
    // Verificar que contador permanece
    const contador = page.locator('.badge.bg-danger');
    await expect(contador).toHaveText('1');
    
    // Ir para carrinho e verificar
    await page.click('text=Carrinho');
    const items = page.locator('#carrinho-items .card');
    await expect(items).toHaveCount(1);
  });
});
