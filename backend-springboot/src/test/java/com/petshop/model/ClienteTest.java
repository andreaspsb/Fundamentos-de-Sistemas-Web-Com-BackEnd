package com.petshop.model;

import org.junit.jupiter.api.Test;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class ClienteTest {

    @Test
    void deveCriarClienteComConstrutorVazio() {
        Cliente cliente = new Cliente();
        assertNotNull(cliente);
    }

    @Test
    void deveCriarClienteComConstrutorParametrizado() {
        LocalDate dataNascimento = LocalDate.of(1990, 5, 15);
        Cliente cliente = new Cliente("João Silva", "12345678901", "11999999999", 
            "joao@test.com", dataNascimento, "M", "Rua Teste", "123", "Apto 45", "Centro", "São Paulo");
        
        assertEquals("João Silva", cliente.getNome());
        assertEquals("12345678901", cliente.getCpf());
        assertEquals("11999999999", cliente.getTelefone());
        assertEquals("joao@test.com", cliente.getEmail());
        assertEquals(dataNascimento, cliente.getDataNascimento());
        assertEquals("M", cliente.getSexo());
        assertEquals("Rua Teste", cliente.getEndereco());
        assertEquals("123", cliente.getNumero());
        assertEquals("Apto 45", cliente.getComplemento());
        assertEquals("Centro", cliente.getBairro());
        assertEquals("São Paulo", cliente.getCidade());
    }

    @Test
    void deveTestarGettersESetters() {
        Cliente cliente = new Cliente();
        LocalDate data = LocalDate.of(1995, 3, 20);
        
        cliente.setId(1L);
        assertEquals(1L, cliente.getId());
        
        cliente.setNome("Maria Santos");
        assertEquals("Maria Santos", cliente.getNome());
        
        cliente.setCpf("98765432100");
        assertEquals("98765432100", cliente.getCpf());
        
        cliente.setTelefone("11988887777");
        assertEquals("11988887777", cliente.getTelefone());
        
        cliente.setEmail("maria@test.com");
        assertEquals("maria@test.com", cliente.getEmail());
        
        cliente.setDataNascimento(data);
        assertEquals(data, cliente.getDataNascimento());
        
        cliente.setSexo("F");
        assertEquals("F", cliente.getSexo());
        
        cliente.setEndereco("Av. Principal");
        assertEquals("Av. Principal", cliente.getEndereco());
        
        cliente.setNumero("456");
        assertEquals("456", cliente.getNumero());
        
        cliente.setComplemento("Casa 2");
        assertEquals("Casa 2", cliente.getComplemento());
        
        cliente.setBairro("Jardim");
        assertEquals("Jardim", cliente.getBairro());
        
        cliente.setCidade("Rio de Janeiro");
        assertEquals("Rio de Janeiro", cliente.getCidade());
    }

    @Test
    void deveGerenciarPedidos() {
        Cliente cliente = new Cliente();
        assertNotNull(cliente.getPedidos());
        assertTrue(cliente.getPedidos().isEmpty());
    }

    @Test
    void deveGerenciarPets() {
        Cliente cliente = new Cliente();
        assertNotNull(cliente.getPets());
        assertTrue(cliente.getPets().isEmpty());
    }

    @Test
    void deveGerenciarAgendamentos() {
        Cliente cliente = new Cliente();
        assertNotNull(cliente.getAgendamentos());
        assertTrue(cliente.getAgendamentos().isEmpty());
    }

    @Test
    void deveAdicionarPet() {
        Cliente cliente = new Cliente();
        Pet pet = new Pet();
        pet.setNome("Rex");
        
        cliente.adicionarPet(pet);
        
        assertEquals(1, cliente.getPets().size());
        assertEquals(cliente, pet.getCliente());
    }

    @Test
    void deveRemoverPet() {
        Cliente cliente = new Cliente();
        Pet pet = new Pet();
        pet.setNome("Rex");
        
        cliente.adicionarPet(pet);
        cliente.removerPet(pet);
        
        assertTrue(cliente.getPets().isEmpty());
        assertNull(pet.getCliente());
    }
}
