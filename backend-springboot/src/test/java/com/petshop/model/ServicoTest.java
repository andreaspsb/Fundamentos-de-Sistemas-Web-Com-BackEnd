package com.petshop.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ServicoTest {

    @Test
    void deveCriarServicoComConstrutorVazio() {
        Servico servico = new Servico();
        assertNotNull(servico);
    }

    @Test
    void deveCriarServicoComConstrutorParametrizado() {
        Servico servico = new Servico("Banho e Tosa", "Banho completo", 80.00);
        
        assertEquals("Banho e Tosa", servico.getNome());
        assertEquals("Banho completo", servico.getDescricao());
        assertEquals(80.00, servico.getPreco());
    }

    @Test
    void deveTestarGettersESetters() {
        Servico servico = new Servico();
        
        servico.setId(1L);
        assertEquals(1L, servico.getId());
        
        servico.setNome("Consulta Veterinária");
        assertEquals("Consulta Veterinária", servico.getNome());
        
        servico.setDescricao("Consulta de rotina");
        assertEquals("Consulta de rotina", servico.getDescricao());
        
        servico.setPreco(150.00);
        assertEquals(150.00, servico.getPreco());
        
        servico.setAtivo(false);
        assertFalse(servico.getAtivo());
    }

    @Test
    void deveInicializarAtivoComoTrue() {
        Servico servico = new Servico();
        assertTrue(servico.getAtivo());
    }

    @Test
    void deveGerenciarAgendamentos() {
        Servico servico = new Servico();
        assertNotNull(servico.getAgendamentos());
        assertTrue(servico.getAgendamentos().isEmpty());
    }
}
