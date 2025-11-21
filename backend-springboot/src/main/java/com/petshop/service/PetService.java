package com.petshop.service;

import com.petshop.model.Pet;
import com.petshop.model.Cliente;
import com.petshop.repository.PetRepository;
import com.petshop.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Transactional(readOnly = true)
    public List<Pet> listarTodos() {
        return petRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Pet> buscarPorId(Long id) {
        return petRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Pet> buscarPorCliente(Long clienteId) {
        return petRepository.findByClienteId(clienteId);
    }

    @Transactional(readOnly = true)
    public List<Pet> buscarPorTipo(String tipo) {
        return petRepository.findByTipo(tipo);
    }

    @Transactional
    public Pet salvar(Pet pet, Long clienteId) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado com ID: " + clienteId));
        
        pet.setCliente(cliente);
        return petRepository.save(pet);
    }

    @Transactional
    public Pet atualizar(Long id, Pet petAtualizado) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet não encontrado com ID: " + id));

        pet.setNome(petAtualizado.getNome());
        pet.setTipo(petAtualizado.getTipo());
        pet.setRaca(petAtualizado.getRaca());
        pet.setIdade(petAtualizado.getIdade());
        pet.setPeso(petAtualizado.getPeso());
        pet.setSexo(petAtualizado.getSexo());
        pet.setCastrado(petAtualizado.getCastrado());
        pet.setObservacoes(petAtualizado.getObservacoes());
        pet.setTemAlergia(petAtualizado.getTemAlergia());
        pet.setPrecisaMedicacao(petAtualizado.getPrecisaMedicacao());
        pet.setComportamentoAgressivo(petAtualizado.getComportamentoAgressivo());

        return petRepository.save(pet);
    }

    @Transactional
    public void deletar(Long id) {
        if (!petRepository.existsById(id)) {
            throw new RuntimeException("Pet não encontrado com ID: " + id);
        }
        petRepository.deleteById(id);
    }
}
