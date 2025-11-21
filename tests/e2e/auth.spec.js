// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Testes de Autenticação
 * - Login com credenciais válidas
 * - Login com credenciais inválidas
 * - Logout
 * - Persistência de sessão
 */

test.describe('Autenticação', () => {
  
  test.beforeEach(async ({ page }) => {
    // Limpar localStorage antes de cada teste
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('deve fazer login com credenciais válidas (admin)', async ({ page }) => {
    await page.goto('/login.html');
    
    // Preencher formulário
    await page.fill('#username', 'admin');
    await page.fill('#senha', 'admin123');
    
    // Submeter
    await page.click('button[type="submit"]');
    
    // Aguardar redirecionamento
    await page.waitForURL(/index.html|\/$/);
    
    // Verificar se navbar mostra usuário logado
    const navbar = page.locator('.navbar');
    await expect(navbar).toContainText('admin');
    
    // Verificar se dropdown do usuário está presente
    const userDropdown = page.locator('.dropdown-toggle');
    await expect(userDropdown).toBeVisible();
  });

  test('deve mostrar erro com credenciais inválidas', async ({ page }) => {
    await page.goto('/login.html');
    
    // Preencher com credenciais erradas
    await page.fill('#username', 'usuario_invalido');
    await page.fill('#senha', 'senha_errada');
    
    // Aguardar alert (Playwright detecta automaticamente)
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Credenciais inválidas');
      await dialog.accept();
    });
    
    await page.click('button[type="submit"]');
    
    // Deve permanecer na página de login
    await expect(page).toHaveURL(/login.html/);
  });

  test('deve fazer logout e limpar sessão', async ({ page }) => {
    // Fazer login primeiro
    await page.goto('/login.html');
    await page.fill('#username', 'admin');
    await page.fill('#senha', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/index.html|\/$/);
    
    // Verificar se está logado
    await expect(page.locator('.navbar')).toContainText('admin');
    
    // Fazer logout
    await page.click('.dropdown-toggle');
    await page.click('text=Sair');
    
    // Verificar redirecionamento para login
    await page.waitForURL(/login.html/);
    
    // Verificar que localStorage foi limpo
    const token = await page.evaluate(() => localStorage.getItem('petshop_auth_token'));
    expect(token).toBeNull();
  });

  test('deve redirecionar para login ao acessar página protegida sem autenticação', async ({ page }) => {
    // Tentar acessar painel admin sem login
    await page.goto('/admin/index.html');
    
    // Deve redirecionar para login
    await page.waitForURL(/login.html/);
  });

  test('deve redirecionar para login ao acessar checkout sem autenticação', async ({ page }) => {
    // Tentar acessar checkout sem login
    await page.goto('/checkout.html');
    
    // Deve redirecionar para login
    await page.waitForURL(/login.html/);
  });

  test('deve persistir sessão após recarregar página', async ({ page }) => {
    // Fazer login
    await page.goto('/login.html');
    await page.fill('#username', 'admin');
    await page.fill('#senha', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/index.html|\/$/);
    
    // Recarregar página
    await page.reload();
    
    // Verificar que continua logado
    await expect(page.locator('.navbar')).toContainText('admin');
  });
});
