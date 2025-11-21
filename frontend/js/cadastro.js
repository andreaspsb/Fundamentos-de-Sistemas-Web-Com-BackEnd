// ========================================
// JavaScript para Formulário de Cadastro
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('cadastroForm');
  
  if (!form) return;
  
  console.log('📋 Formulário de cadastro carregado!');
  
  // Aplicar máscaras nos campos
  aplicarMascaras();
  
  // Validação do formulário
  form.addEventListener('submit', function(event) {
    console.log('🔔 Evento submit detectado!');
    event.preventDefault();
    event.stopPropagation();
    
    console.log('✅ preventDefault e stopPropagation executados');
    console.log('🔍 Validando formulário...');
    console.log('Form válido?', form.checkValidity());
    
    if (form.checkValidity()) {
      console.log('✅ Formulário válido - iniciando processamento');
      processarCadastro();
    } else {
      console.warn('⚠️ Formulário inválido - mostrando erros');
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

/**
 * Aplica máscaras de formatação nos campos
 */
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
  
  console.log('✨ Máscaras de formatação aplicadas');
}

/**
 * Mostra erros de validação
 */
function mostrarErrosValidacao() {
  const invalidFields = document.querySelectorAll('.form-control:invalid, .form-check-input:invalid, .form-select:invalid');
  
  console.warn('⚠️ Formulário com erros de validação');
  console.log(`Total de campos inválidos: ${invalidFields.length}`);
  
  // Scroll para o primeiro campo inválido
  if (invalidFields.length > 0) {
    invalidFields[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Usar setTimeout para garantir que o foco aconteça após o scroll
    setTimeout(() => {
      invalidFields[0].focus();
    }, 500);
  }
}

/**
 * Processa o cadastro após validação
 */
async function processarCadastro() {
  // Proteção contra duplo envio
  const submitBtn = document.querySelector('button[type="submit"]');
  if (submitBtn.disabled) {
    console.warn('⚠️ Processamento já em andamento');
    return;
  }
  
  const formData = new FormData(document.getElementById('cadastroForm'));
  const dados = Object.fromEntries(formData.entries());
  
  // Coletar checkboxes múltiplos (necessidades especiais)
  const necessidades = Array.from(
    document.querySelectorAll('input[name="necessidades"]:checked')
  ).map(cb => cb.value);
  
  console.log('═══════════════════════════════════════');
  console.log('🚀 INICIANDO PROCESSAMENTO DO CADASTRO');
  console.log('═══════════════════════════════════════');
  console.log('📝 Dados coletados:', dados);
  console.log('📝 Necessidades especiais:', necessidades);
  
  // Mostrar loading no botão
  const originalHTML = mostrarLoading();
  
  // Mostrar toast de processamento
  mostrarToastProcessamento();
  
  let clienteCriado = null;
  
  try {
    // 1. Criar Cliente (ou buscar se já existe)
    const clienteData = {
      nome: dados.nomeCliente,
      cpf: limparCPF(dados.cpf),  // Backend limpa automaticamente, mas podemos enviar limpo
      email: dados.email,
      telefone: limparTelefone(dados.telefone),  // Backend limpa automaticamente
      dataNascimento: dados.dataNascimento,
      sexo: dados.sexo,
      endereco: dados.endereco,
      numero: dados.numero,
      complemento: dados.complemento || null,
      bairro: dados.bairro,
      cidade: dados.cidade
    };
    
    console.log('👤 Verificando/Cadastrando cliente...', clienteData);
    
    let cliente;
    try {
      // Tentar criar cliente
      cliente = await ApiService.post(API_CONFIG.ENDPOINTS.CLIENTES, clienteData);
      console.log('✅ Cliente cadastrado:', cliente);
    } catch (errorCliente) {
      // Se erro de CPF duplicado, buscar cliente existente
      if (errorCliente.message && errorCliente.message.includes('CPF já cadastrado')) {
        console.log('ℹ️ CPF já existe, buscando cliente...');
        const cpfLimpo = limparCPF(dados.cpf);
        
        // Buscar cliente por CPF
        try {
          cliente = await ApiService.get(`${API_CONFIG.ENDPOINTS.CLIENTES}/cpf/${cpfLimpo}`);
          console.log('✅ Cliente encontrado:', cliente);
          console.log('⚠️ Usando cliente existente (ID: ' + cliente.id + ') para cadastrar o pet');
        } catch (errorBusca) {
          throw new Error('CPF já cadastrado mas não foi possível localizar o cliente. Entre em contato com o suporte.');
        }
      } else {
        // Outro tipo de erro, propagar
        throw errorCliente;
      }
    }
    
    clienteCriado = cliente;
    
    // 2. Criar Pet
    const idade = parseInt(dados.idadePet) || 0;
    const peso = parseFloat(dados.pesoPet) || 0.0;
    
    const petData = {
      nome: dados.nomePet,
      tipo: dados.tipoPet,
      raca: dados.raca,
      idade: idade,
      peso: peso,
      sexo: dados.sexoPet,
      castrado: dados.castrado === 'sim',
      temAlergia: necessidades.includes('alergia'),
      precisaMedicacao: necessidades.includes('medicacao'),
      comportamentoAgressivo: necessidades.includes('agressivo'),
      observacoes: dados.observacoes || null,
      clienteId: cliente.id
    };
    
    console.log('🐾 Cadastrando pet...', petData);
    const pet = await ApiService.post(API_CONFIG.ENDPOINTS.PETS, petData);
    console.log('✅ Pet cadastrado:', pet);
    
    // Salvar IDs no localStorage para uso posterior
    salvarLocalStorage('ultimoCliente', cliente);
    salvarLocalStorage('ultimoPet', pet);
    
    // Ocultar toast de processamento
    ocultarToastProcessamento();
    
    // Finalizar com sucesso
    finalizarCadastroSucesso(cliente, pet, originalHTML);
    
  } catch (error) {
    console.error('❌ Erro ao processar cadastro:', error);
    ocultarToastProcessamento();
    
    // Restaurar botão
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalHTML;
    
    // Mensagem de erro personalizada
    let mensagemErro = 'Erro ao realizar cadastro. Verifique os dados e tente novamente.';
    
    // Verificar se é erro de CPF duplicado
    if (error.message && error.message.includes('CPF já cadastrado')) {
      mensagemErro = '⚠️ Este CPF já está cadastrado no sistema. Use outro CPF ou entre em contato conosco.';
    }
    // Verificar se é erro de email duplicado
    else if (error.message && error.message.includes('Email já cadastrado')) {
      mensagemErro = '⚠️ Este email já está cadastrado no sistema. Use outro email ou faça login.';
    }
    
    // Mostrar erro
    mostrarErroAPI(error, mensagemErro);
  }
}

/**
 * Mostra toast de processamento
 */
function mostrarToastProcessamento() {
  const toastEl = document.getElementById('loadingToast');
  const toast = new bootstrap.Toast(toastEl, {
    autohide: false
  });
  toast.show();
}

/**
 * Oculta toast de processamento
 */
function ocultarToastProcessamento() {
  const toastEl = document.getElementById('loadingToast');
  const toast = bootstrap.Toast.getInstance(toastEl);
  if (toast) {
    toast.hide();
  }
}

/**
 * Mostra indicador de loading
 */
function mostrarLoading() {
  const submitBtn = document.querySelector('button[type="submit"]');
  const originalHTML = submitBtn.innerHTML;
  
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Cadastrando...';
  
  console.log('⏳ Cadastrando no backend...');
  
  // Retornar HTML original para restauração posterior
  return originalHTML;
}

/**
 * Finaliza o cadastro com sucesso
 */
async function finalizarCadastroSucesso(cliente, pet, originalHTML) {
  const submitBtn = document.querySelector('button[type="submit"]');
  const form = document.getElementById('cadastroForm');
  const sucessoMsg = document.getElementById('sucessoMsg');
  const countdownSpan = document.getElementById('countdown');
  
  console.log('🎯 Iniciando finalização do cadastro...');
  
  // Restaurar botão
  submitBtn.disabled = false;
  submitBtn.innerHTML = originalHTML || '<i class="bi bi-check-circle"></i> Cadastrar';
  
  // Resetar formulário
  form.reset();
  form.classList.remove('was-validated');
  
  // Atualizar mensagem de sucesso com dados do backend
  const mensagemDetalhes = sucessoMsg.querySelector('p');
  if (mensagemDetalhes) {
    mensagemDetalhes.innerHTML = `
      <strong>Cliente:</strong> ${cliente.nome} (CPF: ${cliente.cpf})<br>
      <strong>Pet:</strong> ${pet.nome} - ${pet.raca} (${pet.tipo})<br>
      <strong>ID do Cliente:</strong> ${cliente.id}<br>
      <strong>ID do Pet:</strong> ${pet.id}
    `;
  }
  
  // Mostrar mensagem de sucesso
  if (sucessoMsg) {
    sucessoMsg.style.display = 'block';
    sucessoMsg.style.visibility = 'visible';
    sucessoMsg.style.opacity = '1';
    
    console.log('✅ Mensagem de sucesso exibida!');
    console.log('📍 Cliente ID:', cliente.id);
    console.log('📍 Pet ID:', pet.id);
  } else {
    console.error('❌ Elemento sucessoMsg não encontrado!');
  }
  
  // Criar conta de usuário (OBRIGATÓRIO)
  try {
    // Sugerir username baseado no nome
    const usernameSugerido = cliente.nome.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/\s+/g, '') // Remove espaços
      .substring(0, 20); // Limita tamanho
    
    const username = prompt(
      '🔐 CRIAR CONTA DE USUÁRIO\n\n' +
      'Para acessar o sistema e fazer agendamentos online, você precisa criar uma conta.\n\n' +
      'Digite um nome de usuário:',
      usernameSugerido
    );
    
    if (!username) {
      alert('⚠️ Você precisa criar uma conta para usar o sistema online.\n\nSeus dados foram salvos. Entre em contato conosco para ativar sua conta.');
      console.log('❌ Criação de usuário cancelada - username não informado');
      return;
    }
    
    const senha = prompt('Digite uma senha (mínimo 6 caracteres):');
    if (!senha || senha.length < 6) {
      alert('❌ Senha inválida. A senha deve ter no mínimo 6 caracteres.\n\nSeus dados foram salvos. Entre em contato conosco para ativar sua conta.');
      console.log('❌ Criação de usuário cancelada - senha inválida');
      return;
    }
    
    const usuarioData = {
      username: username,
      senha: senha,
      email: cliente.email,
      role: 'CLIENTE',
      clienteId: cliente.id
    };
    
    console.log('👤 Criando usuário:', { ...usuarioData, senha: '***' });
    
    const usuario = await ApiService.post(API_CONFIG.ENDPOINTS.REGISTRAR, usuarioData);
    console.log('✅ Usuário criado:', usuario);
    
    // Fazer login automaticamente
    alert('✅ Cadastro e conta criados com sucesso!\n\n' +
          `📝 Cliente: ${cliente.nome}\n` +
          `🐾 Pet: ${pet.nome}\n` +
          `👤 Usuário: ${username}\n\n` +
          'Você será redirecionado para fazer login.');
    
    window.location.href = AuthManager.getRelativePath('login.html');
    
  } catch (errorUsuario) {
    console.error('❌ Erro ao criar usuário:', errorUsuario);
    let mensagem = 'Erro ao criar conta de usuário. Seus dados foram salvos, mas você não conseguirá fazer login.';
    
    if (errorUsuario.message && errorUsuario.message.includes('Username já cadastrado')) {
      mensagem = '❌ Nome de usuário já existe.\n\nEscolha outro nome ou faça login se já tem uma conta.';
      
      // Tentar novamente
      setTimeout(() => {
        finalizarCadastroSucesso(cliente, pet, originalHTML);
      }, 100);
      return;
    } else if (errorUsuario.message && errorUsuario.message.includes('Email já cadastrado')) {
      mensagem = '❌ Este email já possui uma conta.\n\nFaça login com suas credenciais existentes.';
      alert(mensagem);
      window.location.href = AuthManager.getRelativePath('login.html');
      return;
    }
    
    alert(mensagem + '\n\nEntre em contato conosco para ativar sua conta.');
  }
  
  // Scroll suave para a mensagem
  setTimeout(() => {
    if (sucessoMsg) {
      sucessoMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 200);
  
  console.log('✅ Cadastro finalizado com sucesso!');
  console.log(`👤 Cliente: ${cliente.nome}`);
  console.log(`🐾 Pet: ${pet.nome} (${pet.raca})`);
  console.log('⏰ Iniciando countdown de 10 segundos...');
  
  // Countdown de 10 segundos
  let segundosRestantes = 10;
  const countdownInterval = setInterval(() => {
    segundosRestantes--;
    if (countdownSpan) {
      countdownSpan.textContent = segundosRestantes;
    }
    console.log(`⏰ Tempo restante: ${segundosRestantes}s`);
    
    if (segundosRestantes <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);
  
  // Ocultar mensagem após 10 segundos
  setTimeout(() => {
    clearInterval(countdownInterval);
    console.log('⏰ 10 segundos transcorridos - ocultando mensagem');
    if (sucessoMsg) {
      sucessoMsg.style.display = 'none';
    }
    if (countdownSpan) {
      countdownSpan.textContent = '10';
    }
  }, 10000);
}

/**
 * Validação customizada de CPF
 */
function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  
  let soma = 0;
  let resto;
  
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  
  return true;
}

/**
 * Auto-completar idade do pet com base na data
 */
document.addEventListener('DOMContentLoaded', function() {
  const tipoPetSelect = document.getElementById('tipoPet');
  
  if (tipoPetSelect) {
    tipoPetSelect.addEventListener('change', function() {
      console.log(`🐾 Tipo de pet selecionado: ${this.value}`);
    });
  }
});
