// ========================================
// JavaScript para Agendamento de Serviços
// ========================================

// Variáveis globais
let servicosDisponiveis = [];
let clienteAtual = null;
let petsDoCliente = [];

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('agendamentoForm');
  
  if (!form) return;
  
  console.log('📅 Formulário de agendamento carregado!');
  
  // Carregar serviços do backend
  carregarServicos();
  
  // Configurar data mínima (hoje)
  configurarDataMinima();
  
  // Adicionar interatividade aos cards de serviço
  configurarCardsServicos();
  
  // Adicionar interatividade aos cards de método
  configurarCardsMetodo();
  
  // Configurar máscara de telefone
  configurarMascaraTelefone();
  
  // Pré-selecionar serviço da URL
  preencherServicoURL();
  
  // Configurar botão "Ver Resumo"
  const btnResumo = document.querySelector('button[onclick="calcularResumo()"]');
  if (btnResumo) {
    btnResumo.removeAttribute('onclick');
    btnResumo.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      calcularResumo();
    });
    console.log('✅ Botão Ver Resumo configurado');
  }
  
  // Validação do formulário
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (validarFormulario()) {
      processarAgendamento();
    } else {
      mostrarErrosValidacao();
    }
    
    form.classList.add('was-validated');
  }, false);
  
  // Limpar ao resetar
  form.addEventListener('reset', function() {
    form.classList.remove('was-validated');
    document.getElementById('sucessoMsg').style.display = 'none';
    document.getElementById('resumoAgendamento').style.display = 'none';
    limparSelecaoCards();
    console.log('🔄 Formulário resetado');
  });
});

/**
 * Configura a data mínima como hoje
 */
function configurarDataMinima() {
  const dataInput = document.getElementById('dataAgendamento');
  const hoje = new Date().toISOString().split('T')[0];
  dataInput.min = hoje;
  
  // Definir data máxima (30 dias a partir de hoje)
  const dataMaxima = new Date();
  dataMaxima.setDate(dataMaxima.getDate() + 30);
  dataInput.max = dataMaxima.toISOString().split('T')[0];
  
  console.log('📆 Calendário configurado - Período disponível: hoje até 30 dias');
}

/**
 * Configura interatividade dos cards de serviço
 */
function configurarCardsServicos() {
  const cards = ['cardBanho', 'cardTosa', 'cardCompleto'];
  const checkboxes = ['servicoBanho', 'servicoTosa', 'servicoCompleto'];
  
  console.log('🔧 Configurando cards de serviços...');
  
  cards.forEach((cardId, index) => {
    const card = document.getElementById(cardId);
    const checkbox = document.getElementById(checkboxes[index]);
    
    if (!card) {
      console.error(`❌ Card não encontrado: ${cardId}`);
      return;
    }
    
    if (!checkbox) {
      console.error(`❌ Checkbox não encontrado: ${checkboxes[index]}`);
      return;
    }
    
    console.log(`✅ Configurando: ${cardId}`);
    
    card.addEventListener('click', function(e) {
      console.log('🖱️ Click detectado no card:', cardId);
      console.log('Estado atual do checkbox:', checkbox.checked);
      
      // Se já estava selecionado, desmarcar
      if (checkbox.checked) {
        checkbox.checked = false;
        atualizarVisualCard(card, false);
        console.log(`🛁 Serviço ${checkbox.value}: desmarcado`);
        return;
      }
      
      // Desmarcar todos os outros serviços primeiro
      const todosCheckboxes = ['servicoBanho', 'servicoTosa', 'servicoCompleto'];
      const todosCards = ['cardBanho', 'cardTosa', 'cardCompleto'];
      
      todosCheckboxes.forEach((id, i) => {
        const cb = document.getElementById(id);
        const c = document.getElementById(todosCards[i]);
        if (cb && c) {
          cb.checked = false;
          atualizarVisualCard(c, false);
        }
      });
      
      // Marcar apenas o selecionado
      checkbox.checked = true;
      atualizarVisualCard(card, true);
      console.log(`🛁 Serviço ${checkbox.value}: selecionado`);
      console.log('Novo estado do checkbox:', checkbox.checked);
      
      // Esconder mensagem de erro ao selecionar um serviço
      const servicoError = document.getElementById('servicoError');
      if (servicoError) {
        servicoError.classList.remove('d-block');
        servicoError.style.display = 'none';
      }
    });
  });
}

/**
 * Configura interatividade dos cards de método
 */
function configurarCardsMetodo() {
  const cards = ['cardTelebusca', 'cardLocal'];
  const radios = ['metodoTelebusca', 'metodoLocal'];
  
  cards.forEach((cardId, index) => {
    const card = document.getElementById(cardId);
    const radio = document.getElementById(radios[index]);
    
    card.addEventListener('click', function(e) {
      if (e.target.type !== 'radio') {
        radio.checked = true;
      }
      
      // Atualizar todos os cards
      cards.forEach((id, i) => {
        const c = document.getElementById(id);
        atualizarVisualCard(c, radios[i] === radios[index]);
      });
      
      console.log(`🚗 Método selecionado: ${radio.value}`);
      
      // Esconder mensagem de erro ao selecionar um método
      const metodoError = document.getElementById('metodoError');
      if (metodoError) {
        metodoError.classList.remove('d-block');
        metodoError.style.display = 'none';
      }
    });
  });
}

/**
 * Configura máscara de telefone
 */
function configurarMascaraTelefone() {
  const telefoneInput = document.getElementById('telefone');
  
  if (!telefoneInput) return;
  
  telefoneInput.addEventListener('input', function(e) {
    let valor = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    
    if (valor.length <= 10) {
      // Formato: (00) 0000-0000
      valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else {
      // Formato: (00) 00000-0000
      valor = valor.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
    }
    
    e.target.value = valor;
  });
  
  console.log('📱 Máscara de telefone configurada');
}

/**
 * Pré-seleciona serviço baseado no parâmetro da URL
 */
function preencherServicoURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const servico = urlParams.get('servico');
  
  if (!servico) return;
  
  console.log('🔗 Parâmetro de URL detectado:', servico);
  
  // Mapear valores da URL para IDs dos elementos
  const mapeamento = {
    'banho': { checkbox: 'servicoBanho', card: 'cardBanho' },
    'tosa': { checkbox: 'servicoTosa', card: 'cardTosa' },
    'completo': { checkbox: 'servicoCompleto', card: 'cardCompleto' }
  };
  
  const elemento = mapeamento[servico];
  
  if (elemento) {
    const checkbox = document.getElementById(elemento.checkbox);
    const card = document.getElementById(elemento.card);
    
    if (checkbox && card) {
      // Desmarcar todos primeiro
      ['servicoBanho', 'servicoTosa', 'servicoCompleto'].forEach(id => {
        const cb = document.getElementById(id);
        if (cb) cb.checked = false;
      });
      
      ['cardBanho', 'cardTosa', 'cardCompleto'].forEach(id => {
        const c = document.getElementById(id);
        if (c) atualizarVisualCard(c, false);
      });
      
      // Marcar o serviço selecionado
      checkbox.checked = true;
      atualizarVisualCard(card, true);
      
      // Scroll suave até o serviço selecionado
      setTimeout(() => {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
      
      console.log('✅ Serviço pré-selecionado:', servico);
    }
  }
}

/**
 * Atualiza visual do card (selecionado/não selecionado)
 */
function atualizarVisualCard(card, selecionado) {
  if (selecionado) {
    card.classList.add('selected');
    card.style.borderColor = '#0d6efd';
    card.style.borderWidth = '3px';
    card.style.backgroundColor = '#e7f3ff';
  } else {
    card.classList.remove('selected');
    card.style.borderColor = '';
    card.style.borderWidth = '';
    card.style.backgroundColor = '';
  }
}

/**
 * Limpa seleção visual dos cards
 */
function limparSelecaoCards() {
  const allCards = document.querySelectorAll('.servico-card, .metodo-card');
  allCards.forEach(card => {
    card.classList.remove('selected');
    card.style.borderColor = '';
    card.style.borderWidth = '';
    card.style.backgroundColor = '';
  });
}

/**
 * Valida o formulário
 */
function validarFormulario() {
  const form = document.getElementById('agendamentoForm');
  let valido = true;
  
  // Validar serviços
  const servicosSelecionados = document.querySelectorAll('input[name="servicos"]:checked');
  const servicoError = document.getElementById('servicoError');
  if (servicosSelecionados.length === 0) {
    servicoError.classList.add('d-block');
    servicoError.style.display = 'block';
    valido = false;
    setTimeout(() => {
      servicoError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  } else {
    servicoError.classList.remove('d-block');
    servicoError.style.display = 'none';
  }
  
  // Validar método
  const metodoSelecionado = document.querySelector('input[name="metodo"]:checked');
  const metodoError = document.getElementById('metodoError');
  if (!metodoSelecionado) {
    metodoError.classList.add('d-block');
    metodoError.style.display = 'block';
    valido = false;
    setTimeout(() => {
      metodoError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  } else {
    metodoError.classList.remove('d-block');
    metodoError.style.display = 'none';
  }
  
  // Validar data (não pode ser domingo)
  const dataInput = document.getElementById('dataAgendamento');
  if (dataInput.value) {
    const data = new Date(dataInput.value + 'T00:00:00');
    if (data.getDay() === 0) {
      alert('⚠️ Não atendemos aos domingos. Por favor, selecione outra data.');
      valido = false;
    }
  }
  
  return valido && form.checkValidity();
}

/**
 * Mostra erros de validação
 */
function mostrarErrosValidacao() {
  const invalidFields = document.querySelectorAll('.form-control:invalid, .form-select:invalid');
  
  console.warn('⚠️ Formulário com erros de validação');
  
  if (invalidFields.length > 0) {
    invalidFields[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => invalidFields[0].focus(), 500);
  }
}

/**
 * Calcula e mostra o resumo do agendamento
 */
function calcularResumo() {
  console.log('🧮 Calculando resumo...');
  
  // Coletar serviços
  const servicosSelecionados = Array.from(
    document.querySelectorAll('input[name="servicos"]:checked')
  ).map(cb => cb.value);
  
  console.log('Serviços selecionados:', servicosSelecionados);
  
  if (servicosSelecionados.length === 0) {
    alert('⚠️ Por favor, selecione pelo menos um serviço.');
    return;
  }
  
  // Calcular valores
  let total = 0;
  let servicosTexto = [];
  
  if (servicosSelecionados.includes('completo')) {
    total = 80;
    servicosTexto.push('Banho + Tosa (Combo)');
  } else {
    if (servicosSelecionados.includes('banho')) {
      total += 50;
      servicosTexto.push('Banho');
    }
    if (servicosSelecionados.includes('tosa')) {
      total += 40;
      servicosTexto.push('Tosa');
    }
  }
  
  console.log('Serviços texto:', servicosTexto);
  console.log('Total parcial:', total);
  
  // Adicionar taxa de tele-busca
  const metodo = document.querySelector('input[name="metodo"]:checked');
  console.log('Método selecionado:', metodo ? metodo.value : 'nenhum');
  
  if (metodo && metodo.value === 'telebusca') {
    total += 20;
  }
  
  // Montar resumo
  const data = document.getElementById('dataAgendamento').value;
  const horario = document.getElementById('horarioAgendamento').value;
  const nomePet = document.getElementById('nomePet').value;
  const metodoTexto = metodo ? (metodo.value === 'telebusca' ? 'Tele-busca' : 'Entrega no local') : 'Não selecionado';
  
  const resumoHTML = `
    <p><strong>Serviço(s):</strong> ${servicosTexto.join(' + ')}</p>
    <p><strong>Método:</strong> ${metodoTexto} ${metodo && metodo.value === 'telebusca' ? '(+ R$ 20,00)' : ''}</p>
    <p><strong>Pet:</strong> ${nomePet || 'Não informado'}</p>
    <p><strong>Data:</strong> ${data ? new Date(data + 'T00:00:00').toLocaleDateString('pt-BR') : 'Não selecionada'}</p>
    <p><strong>Horário:</strong> ${horario || 'Não selecionado'}</p>
  `;
  
  document.getElementById('resumoConteudo').innerHTML = resumoHTML;
  document.getElementById('valorTotal').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
  document.getElementById('resumoAgendamento').style.display = 'block';
  
  // Scroll para o resumo com delay
  setTimeout(() => {
    document.getElementById('resumoAgendamento').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 150);
  
  console.log('💰 Resumo calculado - Total: R$', total);
}

/**
 * Carrega serviços disponíveis do backend
 */
async function carregarServicos() {
  try {
    console.log('🔄 Carregando serviços do backend...');
    // Buscar todos os serviços (não existe endpoint /ativos para serviços)
    const todosServicos = await ApiService.get(API_CONFIG.ENDPOINTS.SERVICOS);
    servicosDisponiveis = todosServicos.filter(s => s.ativo);
    console.log('✅ Serviços carregados:', servicosDisponiveis);
    
    // Atualizar preços nos cards (se disponível)
    atualizarPrecosCards();
  } catch (error) {
    console.error('❌ Erro ao carregar serviços:', error);
    // Usar valores padrão se falhar
    servicosDisponiveis = [
      { id: 1, nome: 'Banho', preco: 50, ativo: true },
      { id: 2, nome: 'Tosa', preco: 40, ativo: true },
      { id: 3, nome: 'Banho e Tosa Completo', preco: 80, ativo: true }
    ];
    console.log('⚠️ Usando serviços padrão:', servicosDisponiveis);
  }
}

/**
 * Atualiza preços dos cards com dados do backend
 */
function atualizarPrecosCards() {
  servicosDisponiveis.forEach(servico => {
    const nome = servico.nome.toLowerCase();
    let cardId = null;
    
    if (nome.includes('banho') && !nome.includes('tosa')) {
      cardId = 'cardBanho';
    } else if (nome.includes('tosa') && !nome.includes('banho')) {
      cardId = 'cardTosa';
    } else if (nome.includes('banho') && nome.includes('tosa')) {
      cardId = 'cardCompleto';
    }
    
    if (cardId) {
      const card = document.getElementById(cardId);
      if (card) {
        const precoElement = card.querySelector('.text-primary.fw-bold, .text-success.fw-bold');
        if (precoElement) {
          const precoFormatado = formatarMoeda(servico.preco);
          precoElement.innerHTML = precoElement.innerHTML.replace(/R\$ \d+,\d{2}/, precoFormatado);
        }
      }
    }
  });
}

/**
 * Processa o agendamento
 */
async function processarAgendamento() {
  const formData = new FormData(document.getElementById('agendamentoForm'));
  const dados = Object.fromEntries(formData.entries());
  
  // Coletar serviços (checkboxes)
  const servicosSelecionados = Array.from(
    document.querySelectorAll('input[name="servicos"]:checked')
  ).map(cb => cb.value);
  
  dados.servicos = servicosSelecionados;
  
  console.log('═══════════════════════════════════════');
  console.log('📅 PROCESSANDO AGENDAMENTO');
  console.log('═══════════════════════════════════════');
  console.log('Dados:', dados);
  
  // Mostrar loading
  const submitBtn = document.querySelector('button[type="submit"]');
  const originalHTML = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Confirmando...';
  
  try {
    // 0. Garantir que serviços estão carregados
    if (servicosDisponiveis.length === 0) {
      console.log('⏳ Aguardando carregamento de serviços...');
      await carregarServicos();
    }
    
    // 1. Buscar ou criar cliente pelo telefone
    const telefoneLimpo = dados.telefone.replace(/\D/g, '');
    console.log('📞 Buscando cliente por telefone:', telefoneLimpo);
    
    // Buscar todos os clientes e filtrar por telefone
    const clientes = await ApiService.get(API_CONFIG.ENDPOINTS.CLIENTES);
    let cliente = clientes.find(c => c.telefone === telefoneLimpo);
    
    if (!cliente) {
      console.log('ℹ️ Cliente não encontrado, será necessário cadastrar antes');
      alert('⚠️ Cliente não encontrado. Por favor, realize o cadastro primeiro em "Cadastro" no menu.');
      throw new Error('Cliente não cadastrado');
    }
    
    console.log('✅ Cliente encontrado:', cliente);
    
    // 2. Buscar pets do cliente
    const todosOsPets = await ApiService.get(API_CONFIG.ENDPOINTS.PETS);
    const petsCliente = todosOsPets.filter(p => p.clienteId === cliente.id);
    
    console.log('🐾 Pets do cliente:', petsCliente);
    
    // Buscar pet pelo nome
    let pet = petsCliente.find(p => p.nome.toLowerCase() === dados.nomePet.toLowerCase());
    
    if (!pet) {
      console.log('ℹ️ Pet não encontrado');
      alert(`⚠️ Pet "${dados.nomePet}" não encontrado. Verifique o nome ou cadastre o pet primeiro.`);
      throw new Error('Pet não encontrado');
    }
    
    console.log('✅ Pet encontrado:', pet);
    
    // 3. Buscar IDs dos serviços selecionados
    console.log('📦 Serviços disponíveis carregados:', servicosDisponiveis);
    console.log('✅ Serviços selecionados do form:', servicosSelecionados);
    
    const servicoIds = [];
    
    // Mapear nomes do formulário para palavras-chave de busca
    const mapeamento = {
      'banho': ['banho'],
      'tosa': ['tosa'],
      'completo': ['combo', 'completo', '+']  // Buscar por várias palavras-chave
    };
    
    for (const servicoNome of servicosSelecionados) {
      const palavrasChave = mapeamento[servicoNome] || [servicoNome];
      console.log(`🔍 Buscando serviço: "${servicoNome}" -> palavras-chave:`, palavrasChave);
      
      const servico = servicosDisponiveis.find(s => {
        const nomeServico = s.nome.toLowerCase();
        console.log(`  Comparando com: "${nomeServico}"`);
        
        // Verificar se o nome do serviço contém alguma das palavras-chave
        return palavrasChave.some(palavra => nomeServico.includes(palavra.toLowerCase()));
      });
      
      if (servico) {
        servicoIds.push(servico.id);
        console.log(`  ✅ Encontrado: ${servico.nome} (ID: ${servico.id})`);
      } else {
        console.warn(`  ⚠️ Serviço "${servicoNome}" não encontrado no backend`);
        console.warn(`  📋 Serviços disponíveis:`, servicosDisponiveis.map(s => s.nome));
      }
    }
    
    console.log('🔧 Serviços selecionados (IDs):', servicoIds);
    
    // 4. Calcular valor total
    let valorTotal = 0;
    servicoIds.forEach(id => {
      const servico = servicosDisponiveis.find(s => s.id === id);
      if (servico) valorTotal += servico.preco;
    });
    
    // Adicionar taxa de tele-busca
    if (dados.metodo === 'telebusca') {
      valorTotal += 20;
    }
    
    console.log('💰 Valor total:', valorTotal);
    
    // 5. Criar agendamento
    const agendamentoData = {
      clienteId: cliente.id,
      petId: pet.id,
      dataAgendamento: dados.dataAgendamento,
      horario: dados.horarioAgendamento + ':00',  // Formato HH:mm:ss
      metodoAtendimento: dados.metodo.toUpperCase(),
      portePet: dados.portePet.toUpperCase(),
      observacoes: dados.observacoes || null,
      valorTotal: valorTotal,
      servicoIds: servicoIds
    };
    
    console.log('📋 Criando agendamento:', agendamentoData);
    
    const agendamento = await ApiService.post(API_CONFIG.ENDPOINTS.AGENDAMENTOS, agendamentoData);
    
    console.log('✅ Agendamento criado:', agendamento);
    
    // Resetar formulário
    document.getElementById('agendamentoForm').reset();
    document.getElementById('agendamentoForm').classList.remove('was-validated');
    document.getElementById('resumoAgendamento').style.display = 'none';
    limparSelecaoCards();
    
    // Atualizar mensagem de sucesso com dados do agendamento
    const sucessoMsg = document.getElementById('sucessoMsg');
    const dataFormatada = new Date(dados.dataAgendamento + 'T00:00:00').toLocaleDateString('pt-BR');
    
    sucessoMsg.innerHTML = `
      <h4 class="alert-heading">✅ Agendamento confirmado!</h4>
      <p><strong>Cliente:</strong> ${cliente.nome}</p>
      <p><strong>Pet:</strong> ${pet.nome}</p>
      <p><strong>Data:</strong> ${dataFormatada} às ${dados.horarioAgendamento}</p>
      <p><strong>Valor:</strong> ${formatarMoeda(valorTotal)}</p>
      <hr>
      <p class="mb-0"><small>💡 ID do Agendamento: #${agendamento.id}</small></p>
      <button type="button" class="btn-close" aria-label="Close" onclick="document.getElementById('sucessoMsg').style.display='none'"></button>
    `;
    
    sucessoMsg.style.display = 'block';
    
    // Scroll para mensagem de sucesso
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
    
    console.log('✅ Agendamento confirmado!');
    console.log('═══════════════════════════════════════');
    
  } catch (error) {
    console.error('❌ Erro ao processar agendamento:', error);
    
    if (!error.message.includes('não cadastrado') && !error.message.includes('não encontrado')) {
      mostrarErroAPI(error, 'Erro ao criar agendamento. Verifique os dados e tente novamente.');
    }
  } finally {
    // Restaurar botão
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalHTML;
  }
}
