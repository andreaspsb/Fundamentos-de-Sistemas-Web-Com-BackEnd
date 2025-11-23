package com.petshop.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LoginResponseDTOTest {

    @Test
    void deveCriarLoginResponseComConstrutorParametrizado() {
        LoginResponseDTO dto = new LoginResponseDTO("token123", "admin", "admin@test.com", "ADMIN", 1L);
        
        assertEquals("token123", dto.getToken());
        assertEquals("admin", dto.getUsername());
        assertEquals("admin@test.com", dto.getEmail());
        assertEquals("ADMIN", dto.getRole());
        assertEquals(1L, dto.getClienteId());
    }

    @Test
    void deveTestarGettersESetters() {
        LoginResponseDTO dto = new LoginResponseDTO();
        
        dto.setToken("newtoken456");
        assertEquals("newtoken456", dto.getToken());
        
        dto.setUsername("user");
        assertEquals("user", dto.getUsername());
        
        dto.setEmail("user@test.com");
        assertEquals("user@test.com", dto.getEmail());
        
        dto.setRole("USER");
        assertEquals("USER", dto.getRole());
        
        dto.setClienteId(5L);
        assertEquals(5L, dto.getClienteId());
    }

    @Test
    void deveCriarComConstrutorVazio() {
        LoginResponseDTO dto = new LoginResponseDTO();
        assertNotNull(dto);
        assertNull(dto.getToken());
        assertNull(dto.getUsername());
    }
}
