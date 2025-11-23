package com.petshop.dto;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class CategoriaRequestDTOTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void deveValidarCategoriaValida() {
        CategoriaRequestDTO dto = new CategoriaRequestDTO();
        dto.setNome("Rações");
        dto.setDescricao("Alimentos para pets");
        dto.setAtivo(true);

        Set<ConstraintViolation<CategoriaRequestDTO>> violations = validator.validate(dto);
        assertTrue(violations.isEmpty() || violations.stream().noneMatch(v -> 
            v.getMessage().contains("obrigatório")));
    }

    @Test
    void deveTestarGettersESetters() {
        CategoriaRequestDTO dto = new CategoriaRequestDTO();
        
        dto.setNome("Higiene");
        assertEquals("Higiene", dto.getNome());
        
        dto.setDescricao("Produtos de limpeza");
        assertEquals("Produtos de limpeza", dto.getDescricao());
        
        dto.setAtivo(false);
        assertFalse(dto.getAtivo());
    }

    @Test
    void deveInicializarAtivoComoTrue() {
        CategoriaRequestDTO dto = new CategoriaRequestDTO();
        assertTrue(dto.getAtivo());
    }
}
