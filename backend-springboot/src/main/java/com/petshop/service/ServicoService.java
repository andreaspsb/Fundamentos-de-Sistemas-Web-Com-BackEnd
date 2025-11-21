package com.petshop.service;

import com.petshop.model.Servico;
import com.petshop.repository.ServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ServicoService {

    @Autowired
    private ServicoRepository servicoRepository;

    @Transactional(readOnly = true)
    public List<Servico> listarTodos() {
        return servicoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Servico> listarAtivos() {
        return servicoRepository.findByAtivo(true);
    }

    @Transactional(readOnly = true)
    public Optional<Servico> buscarPorId(Long id) {
        return servicoRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<Servico> buscarPorNome(String nome) {
        return servicoRepository.findByNome(nome);
    }

    @Transactional
    public Servico salvar(Servico servico) {
        if (servicoRepository.existsByNome(servico.getNome())) {
            throw new RuntimeException("Já existe um serviço com este nome");
        }
        return servicoRepository.save(servico);
    }

    @Transactional
    public Servico atualizar(Long id, Servico servicoAtualizado) {
        Servico servico = servicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado com ID: " + id));

        // Validar nome único se foi alterado
        if (!servico.getNome().equals(servicoAtualizado.getNome()) && 
            servicoRepository.existsByNome(servicoAtualizado.getNome())) {
            throw new RuntimeException("Já existe um serviço com este nome");
        }

        servico.setNome(servicoAtualizado.getNome());
        servico.setDescricao(servicoAtualizado.getDescricao());
        servico.setPreco(servicoAtualizado.getPreco());
        servico.setAtivo(servicoAtualizado.getAtivo());

        return servicoRepository.save(servico);
    }

    @Transactional
    public void ativar(Long id) {
        Servico servico = servicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado com ID: " + id));
        servico.setAtivo(true);
        servicoRepository.save(servico);
    }

    @Transactional
    public void desativar(Long id) {
        Servico servico = servicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado com ID: " + id));
        servico.setAtivo(false);
        servicoRepository.save(servico);
    }

    @Transactional
    public void deletar(Long id) {
        if (!servicoRepository.existsById(id)) {
            throw new RuntimeException("Serviço não encontrado com ID: " + id);
        }
        servicoRepository.deleteById(id);
    }
}
