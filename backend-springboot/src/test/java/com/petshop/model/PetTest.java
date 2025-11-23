package com.petshop.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PetTest {

    @Test
    void deveCriarPetComConstrutorVazio() {
        Pet pet = new Pet();
        assertNotNull(pet);
    }

    @Test
    void deveCriarPetComConstrutorParametrizado() {
        Pet pet = new Pet("Rex", "cao", "Labrador", 3, 25.5, "M", false, "Pet brincalhão");
        
        assertEquals("Rex", pet.getNome());
        assertEquals("cao", pet.getTipo());
        assertEquals("Labrador", pet.getRaca());
        assertEquals(3, pet.getIdade());
        assertEquals(25.5, pet.getPeso());
        assertEquals("M", pet.getSexo());
        assertFalse(pet.getCastrado());
        assertEquals("Pet brincalhão", pet.getObservacoes());
    }

    @Test
    void deveTestarGettersESetters() {
        Pet pet = new Pet();
        Cliente cliente = new Cliente();
        
        pet.setId(1L);
        assertEquals(1L, pet.getId());
        
        pet.setNome("Mimi");
        assertEquals("Mimi", pet.getNome());
        
        pet.setTipo("gato");
        assertEquals("gato", pet.getTipo());
        
        pet.setRaca("Siamês");
        assertEquals("Siamês", pet.getRaca());
        
        pet.setIdade(2);
        assertEquals(2, pet.getIdade());
        
        pet.setSexo("F");
        assertEquals("F", pet.getSexo());
        
        pet.setPeso(4.5);
        assertEquals(4.5, pet.getPeso());
        
        pet.setCastrado(true);
        assertTrue(pet.getCastrado());
        
        pet.setObservacoes("Gosta de brincar");
        assertEquals("Gosta de brincar", pet.getObservacoes());
        
        pet.setTemAlergia(true);
        assertTrue(pet.getTemAlergia());
        
        pet.setPrecisaMedicacao(false);
        assertFalse(pet.getPrecisaMedicacao());
        
        pet.setComportamentoAgressivo(false);
        assertFalse(pet.getComportamentoAgressivo());
        
        pet.setCliente(cliente);
        assertEquals(cliente, pet.getCliente());
    }

    @Test
    void deveGerenciarAgendamentos() {
        Pet pet = new Pet();
        assertNotNull(pet.getAgendamentos());
        assertTrue(pet.getAgendamentos().isEmpty());
    }
}
