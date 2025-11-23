package com.petshop.dto;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class LoginRequestDTOTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void deveValidarLoginValido() {
        LoginRequestDTO dto = new LoginRequestDTO("admin", "senha123");

        Set<ConstraintViolation<LoginRequestDTO>> violations = validator.validate(dto);
        assertTrue(violations.isEmpty());
    }

    @Test
    void naoDeveValidarUsernameVazio() {
        LoginRequestDTO dto = new LoginRequestDTO("", "senha123");

        Set<ConstraintViolation<LoginRequestDTO>> violations = validator.validate(dto);
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().contains("Username é obrigatório")));
    }

    @Test
    void naoDeveValidarSenhaVazia() {
        LoginRequestDTO dto = new LoginRequestDTO("admin", "");

        Set<ConstraintViolation<LoginRequestDTO>> violations = validator.validate(dto);
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().contains("Senha é obrigatória")));
    }

    @Test
    void deveTestarGettersESetters() {
        LoginRequestDTO dto = new LoginRequestDTO();
        
        dto.setUsername("testuser");
        assertEquals("testuser", dto.getUsername());
        
        dto.setSenha("testpass");
        assertEquals("testpass", dto.getSenha());
    }

    @Test
    void deveTestarConstrutorComParametros() {
        LoginRequestDTO dto = new LoginRequestDTO("user123", "pass456");
        
        assertEquals("user123", dto.getUsername());
        assertEquals("pass456", dto.getSenha());
    }

    @Test
    void deveTestarConstrutorVazio() {
        LoginRequestDTO dto = new LoginRequestDTO();
        
        assertNull(dto.getUsername());
        assertNull(dto.getSenha());
    }
}
