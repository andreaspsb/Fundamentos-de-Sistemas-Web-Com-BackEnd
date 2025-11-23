package com.petshop.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CategoriaTest {

    @Test
    void deveCriarCategoriaComConstrutorVazio() {
        Categoria categoria = new Categoria();
        assertNotNull(categoria);
    }

    @Test
    void deveCriarCategoriaComConstrutorParametrizado() {
        Categoria categoria = new Categoria("Rações", "Alimentos para pets");
        assertEquals("Rações", categoria.getNome());
        assertEquals("Alimentos para pets", categoria.getDescricao());
    }

    @Test
    void deveTestarGettersESetters() {
        Categoria categoria = new Categoria();
        
        categoria.setId(1L);
        assertEquals(1L, categoria.getId());
        
        categoria.setNome("Higiene");
        assertEquals("Higiene", categoria.getNome());
        
        categoria.setDescricao("Produtos de higiene");
        assertEquals("Produtos de higiene", categoria.getDescricao());
        
        categoria.setAtivo(false);
        assertFalse(categoria.getAtivo());
    }

    @Test
    void deveInicializarAtivoComoTrue() {
        Categoria categoria = new Categoria();
        assertTrue(categoria.getAtivo());
    }

    @Test
    void deveGerenciarProdutos() {
        Categoria categoria = new Categoria();
        assertNotNull(categoria.getProdutos());
        assertTrue(categoria.getProdutos().isEmpty());
    }
}
