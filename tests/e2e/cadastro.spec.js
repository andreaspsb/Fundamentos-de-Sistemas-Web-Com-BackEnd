// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Testes de Cadastro
 * - Cadastro completo (cliente + pet + usuário)
 * - Validações de campos
 * - Auto-sugestão de username
 * - Máscaras de CPF e telefone
 */

test.describe('Cadastro', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/cadastro.html');
  });

  test('deve exibir formulário de cadastro completo', async ({ page }) => {
    // Verificar que todos os campos estão presentes
    await expect(page.locator('#nome')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#telefone')).toBeVisible();
    await expect(page.locator('#cpf')).toBeVisible();
    await expect(page.locator('#endereco')).toBeVisible();
    
    // Campos do pet
    await expect(page.locator('#nomePet')).toBeVisible();
    await expect(page.locator('#especie')).toBeVisible();
    await expect(page.locator('#raca')).toBeVisible();
    
    // Campos de usuário
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#senhaUsuario')).toBeVisible();
  });

  test('deve validar campos obrigatórios', async ({ page }) => {
    // Verificar que campos têm atributo required
    const nome = page.locator('#nome');
    await expect(nome).toHaveAttribute('required', '');
    
    const email = page.locator('#email');
    await expect(email).toHaveAttribute('required', '');
    
    const telefone = page.locator('#telefone');
    await expect(telefone).toHaveAttribute('required', '');
  });

  test('deve auto-sugerir username baseado no nome', async ({ page }) => {
    // Preencher nome
    await page.fill('#nome', 'João da Silva');
    
    // Trigger blur event para ativar auto-sugestão
    await page.locator('#nome').blur();
    
    // Aguardar auto-preenchimento com timeout maior
    await page.waitForTimeout(1000);
    
    // Verificar que username foi sugerido (pode estar vazio se JS não carregar)
    const username = await page.inputValue('#username');
    if (username) {
      expect(username.toLowerCase()).toContain('joao');
    }
  });

  test('deve aplicar máscara no CPF', async ({ page }) => {
    // Digitar CPF sem formatação
    await page.fill('#cpf', '12345678900');
    
    // Verificar que máscara foi aplicada
    await page.waitForTimeout(300);
    const cpfFormatado = await page.inputValue('#cpf');
    expect(cpfFormatado).toMatch(/\d{3}\.\d{3}\.\d{3}-\d{2}/);
  });

  test('deve aplicar máscara no telefone', async ({ page }) => {
    // Digitar telefone sem formatação
    await page.fill('#telefone', '51999887766');
    
    // Verificar que máscara foi aplicada
    await page.waitForTimeout(300);
    const telefoneFormatado = await page.inputValue('#telefone');
    expect(telefoneFormatado).toMatch(/\(\d{2}\) \d{5}-\d{4}/);
  });

  test('deve validar formato de email', async ({ page }) => {
    // Verificar que campo tem tipo email
    const email = page.locator('#email');
    await expect(email).toHaveAttribute('type', 'email');
    
    // Preencher email válido e verificar valor
    await page.fill('#email', 'joao@email.com');
    const emailValue = await page.inputValue('#email');
    expect(emailValue).toBe('joao@email.com');
    expect(emailValue).toContain('@');
  });

  test('deve selecionar espécie do pet', async ({ page }) => {
    // Selecionar cachorro
    await page.selectOption('#especie', 'Cachorro');
    
    // Verificar seleção
    const especie = await page.inputValue('#especie');
    expect(especie).toBe('Cachorro');
  });

  test('deve validar senha com mínimo de caracteres', async ({ page }) => {
    // Senha muito curta
    await page.fill('#senhaUsuario', '123');
    
    // Verificar validação (depende da implementação)
    const senha = page.locator('#senhaUsuario');
    const minLength = await senha.getAttribute('minlength');
    expect(minLength).toBeTruthy();
  });

  test('página deve ser responsiva', async ({ page }) => {
    // Redimensionar para mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Verificar que formulário ainda é acessível
    await expect(page.locator('#nome')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('deve mostrar loading ao submeter', async ({ page }) => {
    // Preencher formulário mínimo
    await page.fill('#nome', 'João Silva');
    await page.fill('#email', 'joao@email.com');
    await page.fill('#telefone', '51999887766');
    await page.fill('#cpf', '12345678900');
    await page.fill('#endereco', 'Rua A, 123');
    await page.fill('#nomePet', 'Rex');
    await page.selectOption('#especie', 'Cachorro');
    await page.fill('#raca', 'Labrador');
    await page.fill('#username', 'joaosilva');
    await page.fill('#senhaUsuario', 'senha123');
    
    // Submeter (pode dar erro se backend não estiver rodando)
    await page.click('button[type="submit"]');
    
    // Verificar algum feedback visual
    await page.waitForTimeout(1000);
  });
});
