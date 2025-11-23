package com.petshop.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ProdutoTest {

    private Produto produto;

    @BeforeEach
    void setUp() {
        produto = new Produto("Ração Premium", "Alta qualidade", 89.90, 100, "http://test.com/img.jpg");
    }

    @Test
    void deveCriarProdutoComConstrutorParametrizado() {
        assertNotNull(produto);
        assertEquals("Ração Premium", produto.getNome());
        assertEquals("Alta qualidade", produto.getDescricao());
        assertEquals(89.90, produto.getPreco());
        assertEquals(100, produto.getQuantidadeEstoque());
        assertEquals("http://test.com/img.jpg", produto.getUrlImagem());
    }

    @Test
    void deveCriarProdutoComConstrutorVazio() {
        Produto p = new Produto();
        assertNotNull(p);
        assertNull(p.getNome());
    }

    @Test
    void deveVerificarSeTemEstoqueSuficiente() {
        assertTrue(produto.temEstoque(50));
        assertTrue(produto.temEstoque(100));
        assertFalse(produto.temEstoque(101));
    }

    @Test
    void deveReduzirEstoque() {
        produto.reduzirEstoque(30);
        assertEquals(70, produto.getQuantidadeEstoque());
    }

    @Test
    void deveLancarExcecaoAoReduzirEstoqueInsuficiente() {
        Exception exception = assertThrows(IllegalStateException.class, () -> {
            produto.reduzirEstoque(101);
        });
        assertEquals("Estoque insuficiente", exception.getMessage());
    }

    @Test
    void deveAdicionarEstoque() {
        produto.adicionarEstoque(50);
        assertEquals(150, produto.getQuantidadeEstoque());
    }

    @Test
    void deveTestarGettersESetters() {
        produto.setId(1L);
        assertEquals(1L, produto.getId());

        produto.setNome("Novo Nome");
        assertEquals("Novo Nome", produto.getNome());

        produto.setDescricao("Nova Descrição");
        assertEquals("Nova Descrição", produto.getDescricao());

        produto.setPreco(199.99);
        assertEquals(199.99, produto.getPreco());

        produto.setQuantidadeEstoque(200);
        assertEquals(200, produto.getQuantidadeEstoque());

        produto.setUrlImagem("http://new.com/img.jpg");
        assertEquals("http://new.com/img.jpg", produto.getUrlImagem());

        produto.setAtivo(false);
        assertFalse(produto.getAtivo());

        Categoria categoria = new Categoria();
        categoria.setId(1L);
        produto.setCategoria(categoria);
        assertEquals(1L, produto.getCategoria().getId());
    }

    @Test
    void deveInicializarAtivoComoTrue() {
        Produto p = new Produto();
        assertTrue(p.getAtivo());
    }

    @Test
    void deveGerenciarItensPedido() {
        assertNotNull(produto.getItensPedido());
        assertTrue(produto.getItensPedido().isEmpty());
    }
}
