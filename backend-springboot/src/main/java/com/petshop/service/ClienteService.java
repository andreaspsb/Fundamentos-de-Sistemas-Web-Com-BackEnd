package com.petshop.service;

import com.petshop.model.Cliente;
import com.petshop.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Transactional(readOnly = true)
    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Cliente> buscarPorId(Long id) {
        return clienteRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<Cliente> buscarPorCpf(String cpf) {
        return clienteRepository.findByCpf(cpf);
    }

    @Transactional(readOnly = true)
    public Optional<Cliente> buscarPorEmail(String email) {
        return clienteRepository.findByEmail(email);
    }

    @Transactional
    public Cliente salvar(Cliente cliente) {
        // Limpar formatação antes de salvar
        cliente.setCpf(limparCpf(cliente.getCpf()));
        cliente.setTelefone(limparTelefone(cliente.getTelefone()));
        
        validarCliente(cliente);
        return clienteRepository.save(cliente);
    }

    @Transactional
    public Cliente atualizar(Long id, Cliente clienteAtualizado) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado com ID: " + id));

        // Limpar formatação
        clienteAtualizado.setCpf(limparCpf(clienteAtualizado.getCpf()));
        clienteAtualizado.setTelefone(limparTelefone(clienteAtualizado.getTelefone()));

        // Validar se CPF e email não estão sendo usados por outro cliente
        if (!cliente.getCpf().equals(clienteAtualizado.getCpf()) && 
            clienteRepository.existsByCpf(clienteAtualizado.getCpf())) {
            throw new RuntimeException("CPF já cadastrado");
        }

        if (!cliente.getEmail().equals(clienteAtualizado.getEmail()) && 
            clienteRepository.existsByEmail(clienteAtualizado.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }

        cliente.setNome(clienteAtualizado.getNome());
        cliente.setCpf(clienteAtualizado.getCpf());
        cliente.setTelefone(clienteAtualizado.getTelefone());
        cliente.setEmail(clienteAtualizado.getEmail());
        cliente.setDataNascimento(clienteAtualizado.getDataNascimento());
        cliente.setSexo(clienteAtualizado.getSexo());
        cliente.setEndereco(clienteAtualizado.getEndereco());
        cliente.setNumero(clienteAtualizado.getNumero());
        cliente.setComplemento(clienteAtualizado.getComplemento());
        cliente.setBairro(clienteAtualizado.getBairro());
        cliente.setCidade(clienteAtualizado.getCidade());

        return clienteRepository.save(cliente);
    }

    @Transactional
    public void deletar(Long id) {
        if (!clienteRepository.existsById(id)) {
            throw new RuntimeException("Cliente não encontrado com ID: " + id);
        }
        clienteRepository.deleteById(id);
    }

    private void validarCliente(Cliente cliente) {
        // Validar CPF
        String cpf = cliente.getCpf();
        if (cpf == null || cpf.length() != 11 || !cpf.matches("\\d{11}")) {
            throw new RuntimeException("CPF inválido");
        }
        
        // Validar telefone
        String telefone = cliente.getTelefone();
        if (telefone == null || (telefone.length() != 10 && telefone.length() != 11) || !telefone.matches("\\d{10,11}")) {
            throw new RuntimeException("Telefone inválido");
        }
        
        if (clienteRepository.existsByCpf(cliente.getCpf())) {
            throw new RuntimeException("CPF já cadastrado");
        }
        if (clienteRepository.existsByEmail(cliente.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }
    }
    
    /**
     * Remove caracteres não numéricos de CPF
     */
    private String limparCpf(String cpf) {
        if (cpf == null) return null;
        return cpf.replaceAll("[^0-9]", "");
    }
    
    /**
     * Remove caracteres não numéricos de telefone
     */
    private String limparTelefone(String telefone) {
        if (telefone == null) return null;
        return telefone.replaceAll("[^0-9]", "");
    }
}
