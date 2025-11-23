package com.petshop.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ItemPedidoDTOTest {

    @Test
    void deveTestarGettersESetters() {
        ItemPedidoDTO dto = new ItemPedidoDTO();
        
        dto.setProdutoId(1L);
        assertEquals(1L, dto.getProdutoId());
        
        dto.setProdutoNome("Ração Premium");
        assertEquals("Ração Premium", dto.getProdutoNome());
        
        dto.setQuantidade(2);
        assertEquals(2, dto.getQuantidade());
        
        dto.setPrecoUnitario(89.90);
        assertEquals(89.90, dto.getPrecoUnitario());
        
        dto.setSubtotal(179.80);
        assertEquals(179.80, dto.getSubtotal());
    }
}
