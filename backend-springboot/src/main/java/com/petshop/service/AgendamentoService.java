package com.petshop.service;

import com.petshop.model.Agendamento;
import com.petshop.model.Agendamento.StatusAgendamento;
import com.petshop.model.Cliente;
import com.petshop.model.Pet;
import com.petshop.model.Servico;
import com.petshop.repository.AgendamentoRepository;
import com.petshop.repository.ClienteRepository;
import com.petshop.repository.PetRepository;
import com.petshop.repository.ServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private ServicoRepository servicoRepository;

    @Transactional(readOnly = true)
    public List<Agendamento> listarTodos() {
        return agendamentoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Agendamento> buscarPorId(Long id) {
        return agendamentoRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Agendamento> buscarPorCliente(Long clienteId) {
        return agendamentoRepository.findByClienteId(clienteId);
    }

    @Transactional(readOnly = true)
    public List<Agendamento> buscarPorData(LocalDate data) {
        return agendamentoRepository.findByDataAgendamento(data);
    }

    @Transactional(readOnly = true)
    public List<Agendamento> buscarPorStatus(StatusAgendamento status) {
        return agendamentoRepository.findByStatus(status);
    }

    @Transactional(readOnly = true)
    public List<Agendamento> buscarPorPeriodo(LocalDate dataInicio, LocalDate dataFim) {
        return agendamentoRepository.findByDataAgendamentoBetween(dataInicio, dataFim);
    }

    @Transactional
    public Agendamento salvar(Agendamento agendamento, Long clienteId, Long petId, List<Long> servicoIds) {
        // Validar disponibilidade de horário
        if (agendamentoRepository.existsByDataAgendamentoAndHorario(
                agendamento.getDataAgendamento(), agendamento.getHorario())) {
            throw new RuntimeException("Horário já está ocupado");
        }

        // Buscar cliente
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado com ID: " + clienteId));
        
        // Buscar pet
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new RuntimeException("Pet não encontrado com ID: " + petId));

        // Validar se o pet pertence ao cliente
        if (!pet.getCliente().getId().equals(clienteId)) {
            throw new RuntimeException("Pet não pertence ao cliente informado");
        }

        // Buscar serviços
        List<Servico> servicos = servicoRepository.findAllById(servicoIds);
        if (servicos.size() != servicoIds.size()) {
            throw new RuntimeException("Um ou mais serviços não foram encontrados");
        }

        // Calcular valor total
        double valorTotal = servicos.stream().mapToDouble(Servico::getPreco).sum();
        
        // Adicionar taxa de tele-busca se aplicável
        if ("telebusca".equalsIgnoreCase(agendamento.getMetodoAtendimento())) {
            valorTotal += 20.0;
        }

        agendamento.setCliente(cliente);
        agendamento.setPet(pet);
        agendamento.setValorTotal(valorTotal);
        agendamento.setStatus(StatusAgendamento.PENDENTE);

        // Salvar agendamento
        Agendamento agendamentoSalvo = agendamentoRepository.save(agendamento);

        // Associar serviços
        for (Servico servico : servicos) {
            agendamentoSalvo.adicionarServico(servico);
        }

        return agendamentoRepository.save(agendamentoSalvo);
    }

    @Transactional
    public Agendamento atualizarStatus(Long id, StatusAgendamento novoStatus) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado com ID: " + id));
        
        agendamento.setStatus(novoStatus);
        return agendamentoRepository.save(agendamento);
    }

    @Transactional
    public void cancelar(Long id) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado com ID: " + id));
        
        agendamento.setStatus(StatusAgendamento.CANCELADO);
        agendamentoRepository.save(agendamento);
    }

    @Transactional
    public void deletar(Long id) {
        if (!agendamentoRepository.existsById(id)) {
            throw new RuntimeException("Agendamento não encontrado com ID: " + id);
        }
        agendamentoRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public boolean verificarDisponibilidade(LocalDate data, LocalTime horario) {
        return !agendamentoRepository.existsByDataAgendamentoAndHorario(data, horario);
    }
}
