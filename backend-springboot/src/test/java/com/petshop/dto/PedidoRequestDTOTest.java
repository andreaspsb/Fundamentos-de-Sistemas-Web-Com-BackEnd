package com.petshop.dto;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class PedidoRequestDTOTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void deveTestarGettersESetters() {
        PedidoRequestDTO dto = new PedidoRequestDTO();
        
        dto.setClienteId(1L);
        assertEquals(1L, dto.getClienteId());
        
        dto.setFormaPagamento("PIX");
        assertEquals("PIX", dto.getFormaPagamento());
        
        dto.setObservacoes("Entrega rápida");
        assertEquals("Entrega rápida", dto.getObservacoes());
    }

    @Test
    void deveFalharQuandoClienteIdNulo() {
        PedidoRequestDTO dto = new PedidoRequestDTO();
        dto.setClienteId(null);
        dto.setFormaPagamento("PIX");

        Set<ConstraintViolation<PedidoRequestDTO>> violations = validator.validate(dto);
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
            .anyMatch(v -> v.getMessage().contains("Cliente é obrigatório")));
    }

    @Test
    void deveValidarPedidoCompleto() {
        PedidoRequestDTO dto = new PedidoRequestDTO();
        dto.setClienteId(1L);
        dto.setFormaPagamento("CARTAO");
        dto.setObservacoes("Entregar após 18h");

        Set<ConstraintViolation<PedidoRequestDTO>> violations = validator.validate(dto);
        assertTrue(violations.isEmpty());
    }
}
