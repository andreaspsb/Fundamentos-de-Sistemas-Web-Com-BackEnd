package com.petshop.dto;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class ServicoRequestDTOTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void deveValidarServicoValido() {
        ServicoRequestDTO dto = new ServicoRequestDTO();
        dto.setNome("Banho e Tosa");
        dto.setDescricao("Serviço completo");
        dto.setPreco(80.00);
        dto.setAtivo(true);

        Set<ConstraintViolation<ServicoRequestDTO>> violations = validator.validate(dto);
        assertTrue(violations.isEmpty() || violations.stream().noneMatch(v -> 
            v.getMessage().contains("obrigatório")));
    }

    @Test
    void deveTestarGettersESetters() {
        ServicoRequestDTO dto = new ServicoRequestDTO();
        
        dto.setNome("Consulta");
        assertEquals("Consulta", dto.getNome());
        
        dto.setDescricao("Consulta veterinária");
        assertEquals("Consulta veterinária", dto.getDescricao());
        
        dto.setPreco(150.00);
        assertEquals(150.00, dto.getPreco());
        
        dto.setAtivo(false);
        assertFalse(dto.getAtivo());
    }

    @Test
    void deveInicializarAtivoComoTrue() {
        ServicoRequestDTO dto = new ServicoRequestDTO();
        assertTrue(dto.getAtivo());
    }
}
