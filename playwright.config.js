// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Configuração do Playwright para testes do Pet Shop
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests/e2e',
  
  /* Tempo máximo de execução por teste */
  timeout: 30 * 1000,
  
  /* Configuração de expect */
  expect: {
    timeout: 5000
  },
  
  /* Executar testes em paralelo */
  fullyParallel: true,
  
  /* Falhar o build em CI se testes foram deixados com .only */
  forbidOnly: !!process.env.CI,
  
  /* Retry em caso de falha */
  retries: process.env.CI ? 1 : 0,
  
  /* Workers para execução paralela */
  workers: process.env.CI ? 2 : undefined,
  
  /* Reporter para saída de testes */
  reporter: [
    ['html'],
    ['list']
  ],
  
  /* Configurações compartilhadas entre projetos */
  use: {
    /* URL base */
    baseURL: 'http://localhost:5500',
    
    /* Coletar trace on first retry */
    trace: 'on-first-retry',
    
    /* Screenshots on failure */
    screenshot: 'only-on-failure',
    
    /* Video on first retry */
    video: 'retain-on-failure',
  },

  /* Configurar projetos para diferentes browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Testes mobile */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* Servidor de desenvolvimento local */
  webServer: {
    command: 'cd frontend && python3 -m http.server 5500',
    url: 'http://localhost:5500',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
