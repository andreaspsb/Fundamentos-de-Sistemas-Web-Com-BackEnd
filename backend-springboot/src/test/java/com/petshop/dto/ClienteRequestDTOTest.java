package com.petshop.dto;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class ClienteRequestDTOTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void deveValidarClienteValido() {
        ClienteRequestDTO dto = new ClienteRequestDTO();
        dto.setNome("João Silva");
        dto.setEmail("joao@example.com");
        dto.setTelefone("11999999999");
        dto.setCpf("12345678901");
        dto.setDataNascimento(java.time.LocalDate.of(1990, 1, 1));
        dto.setSexo("M");
        dto.setEndereco("Rua Teste");
        dto.setNumero("123");
        dto.setBairro("Centro");
        dto.setCidade("São Paulo");

        Set<ConstraintViolation<ClienteRequestDTO>> violations = validator.validate(dto);
        assertTrue(violations.isEmpty());
    }

    @Test
    void deveTestarGettersESetters() {
        ClienteRequestDTO dto = new ClienteRequestDTO();
        
        dto.setNome("Maria Santos");
        assertEquals("Maria Santos", dto.getNome());
        
        dto.setEmail("maria@test.com");
        assertEquals("maria@test.com", dto.getEmail());
        
        dto.setTelefone("11988887777");
        assertEquals("11988887777", dto.getTelefone());
        
        dto.setCpf("98765432100");
        assertEquals("98765432100", dto.getCpf());
        
        dto.setEndereco("Av. Principal, 456");
        assertEquals("Av. Principal, 456", dto.getEndereco());
    }
}
