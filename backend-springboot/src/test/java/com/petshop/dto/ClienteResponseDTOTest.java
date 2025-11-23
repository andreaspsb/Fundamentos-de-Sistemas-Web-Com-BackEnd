package com.petshop.dto;

import org.junit.jupiter.api.Test;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class ClienteResponseDTOTest {

    @Test
    void deveTestarGettersESetters() {
        ClienteResponseDTO dto = new ClienteResponseDTO();
        LocalDate data = LocalDate.of(1990, 5, 15);
        
        dto.setId(1L);
        assertEquals(1L, dto.getId());
        
        dto.setNome("João Silva");
        assertEquals("João Silva", dto.getNome());
        
        dto.setEmail("joao@test.com");
        assertEquals("joao@test.com", dto.getEmail());
        
        dto.setCpf("12345678901");
        assertEquals("12345678901", dto.getCpf());
        
        dto.setTelefone("11999999999");
        assertEquals("11999999999", dto.getTelefone());
        
        dto.setDataNascimento(data);
        assertEquals(data, dto.getDataNascimento());
        
        dto.setSexo("M");
        assertEquals("M", dto.getSexo());
        
        dto.setEndereco("Rua Teste");
        assertEquals("Rua Teste", dto.getEndereco());
        
        dto.setNumero("123");
        assertEquals("123", dto.getNumero());
        
        dto.setComplemento("Apto 45");
        assertEquals("Apto 45", dto.getComplemento());
        
        dto.setBairro("Centro");
        assertEquals("Centro", dto.getBairro());
        
        dto.setCidade("São Paulo");
        assertEquals("São Paulo", dto.getCidade());
    }
}
