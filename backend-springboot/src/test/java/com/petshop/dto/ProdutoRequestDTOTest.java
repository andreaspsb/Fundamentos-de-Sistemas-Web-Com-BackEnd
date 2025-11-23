package com.petshop.dto;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class ProdutoRequestDTOTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void deveValidarProdutoValido() {
        ProdutoRequestDTO dto = new ProdutoRequestDTO();
        dto.setNome("Ração Premium");
        dto.setDescricao("Ração de alta qualidade");
        dto.setPreco(89.90);
        dto.setQuantidadeEstoque(50);
        dto.setUrlImagem("http://example.com/image.jpg");
        dto.setAtivo(true);
        dto.setCategoriaId(1L);

        Set<ConstraintViolation<ProdutoRequestDTO>> violations = validator.validate(dto);
        assertTrue(violations.isEmpty());
    }

    @Test
    void naoDeveValidarSemNome() {
        ProdutoRequestDTO dto = new ProdutoRequestDTO();
        dto.setPreco(89.90);
        dto.setQuantidadeEstoque(50);
        dto.setCategoriaId(1L);

        Set<ConstraintViolation<ProdutoRequestDTO>> violations = validator.validate(dto);
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().contains("Nome do produto é obrigatório")));
    }

    @Test
    void naoDeveValidarPrecoNulo() {
        ProdutoRequestDTO dto = new ProdutoRequestDTO();
        dto.setNome("Ração");
        dto.setQuantidadeEstoque(50);
        dto.setCategoriaId(1L);

        Set<ConstraintViolation<ProdutoRequestDTO>> violations = validator.validate(dto);
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().contains("Preço é obrigatório")));
    }

    @Test
    void naoDeveValidarPrecoZero() {
        ProdutoRequestDTO dto = new ProdutoRequestDTO();
        dto.setNome("Ração");
        dto.setPreco(0.0);
        dto.setQuantidadeEstoque(50);
        dto.setCategoriaId(1L);

        Set<ConstraintViolation<ProdutoRequestDTO>> violations = validator.validate(dto);
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().contains("Preço deve ser maior que zero")));
    }

    @Test
    void naoDeveValidarEstoqueNegativo() {
        ProdutoRequestDTO dto = new ProdutoRequestDTO();
        dto.setNome("Ração");
        dto.setPreco(89.90);
        dto.setQuantidadeEstoque(-1);
        dto.setCategoriaId(1L);

        Set<ConstraintViolation<ProdutoRequestDTO>> violations = validator.validate(dto);
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().contains("Estoque não pode ser negativo")));
    }

    @Test
    void naoDeveValidarSemCategoria() {
        ProdutoRequestDTO dto = new ProdutoRequestDTO();
        dto.setNome("Ração");
        dto.setPreco(89.90);
        dto.setQuantidadeEstoque(50);

        Set<ConstraintViolation<ProdutoRequestDTO>> violations = validator.validate(dto);
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().contains("Categoria é obrigatória")));
    }

    @Test
    void deveTestarGettersESetters() {
        ProdutoRequestDTO dto = new ProdutoRequestDTO();
        
        dto.setNome("Ração");
        assertEquals("Ração", dto.getNome());
        
        dto.setDescricao("Descrição teste");
        assertEquals("Descrição teste", dto.getDescricao());
        
        dto.setPreco(99.99);
        assertEquals(99.99, dto.getPreco());
        
        dto.setQuantidadeEstoque(100);
        assertEquals(100, dto.getQuantidadeEstoque());
        
        dto.setUrlImagem("http://test.com/img.jpg");
        assertEquals("http://test.com/img.jpg", dto.getUrlImagem());
        
        dto.setAtivo(false);
        assertFalse(dto.getAtivo());
        
        dto.setCategoriaId(5L);
        assertEquals(5L, dto.getCategoriaId());
    }

    @Test
    void deveInicializarAtivoComoTrue() {
        ProdutoRequestDTO dto = new ProdutoRequestDTO();
        assertTrue(dto.getAtivo());
    }
}
