package com.petshop.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CategoriaResponseDTOTest {

    @Test
    void deveTestarGettersESetters() {
        CategoriaResponseDTO dto = new CategoriaResponseDTO();
        
        dto.setId(1L);
        assertEquals(1L, dto.getId());
        
        dto.setNome("Rações");
        assertEquals("Rações", dto.getNome());
        
        dto.setDescricao("Alimentos para pets");
        assertEquals("Alimentos para pets", dto.getDescricao());
        
        dto.setAtivo(true);
        assertTrue(dto.getAtivo());
    }
}
