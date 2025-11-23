package com.petshop.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ServicoResponseDTOTest {

    @Test
    void deveTestarGettersESetters() {
        ServicoResponseDTO dto = new ServicoResponseDTO();
        
        dto.setId(1L);
        assertEquals(1L, dto.getId());
        
        dto.setNome("Banho e Tosa");
        assertEquals("Banho e Tosa", dto.getNome());
        
        dto.setDescricao("Serviço completo");
        assertEquals("Serviço completo", dto.getDescricao());
        
        dto.setPreco(80.00);
        assertEquals(80.00, dto.getPreco());
        
        dto.setAtivo(true);
        assertTrue(dto.getAtivo());
    }
}
