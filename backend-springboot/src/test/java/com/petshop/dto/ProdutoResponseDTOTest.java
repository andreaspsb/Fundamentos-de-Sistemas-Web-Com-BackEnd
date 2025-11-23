package com.petshop.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ProdutoResponseDTOTest {

    @Test
    void deveTestarGettersESetters() {
        ProdutoResponseDTO dto = new ProdutoResponseDTO();
        
        dto.setId(1L);
        assertEquals(1L, dto.getId());
        
        dto.setNome("Ração Premium");
        assertEquals("Ração Premium", dto.getNome());
        
        dto.setDescricao("Ração de alta qualidade");
        assertEquals("Ração de alta qualidade", dto.getDescricao());
        
        dto.setPreco(89.90);
        assertEquals(89.90, dto.getPreco());
        
        dto.setQuantidadeEstoque(50);
        assertEquals(50, dto.getQuantidadeEstoque());
        
        dto.setUrlImagem("http://test.com/img.jpg");
        assertEquals("http://test.com/img.jpg", dto.getUrlImagem());
        
        dto.setAtivo(true);
        assertTrue(dto.getAtivo());
        
        dto.setCategoriaNome("Rações");
        assertEquals("Rações", dto.getCategoriaNome());
    }
}
