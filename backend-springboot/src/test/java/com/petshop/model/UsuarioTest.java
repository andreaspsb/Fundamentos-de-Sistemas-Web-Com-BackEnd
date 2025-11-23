package com.petshop.model;

import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class UsuarioTest {

    @Test
    void deveCriarUsuarioComConstrutorVazio() {
        Usuario usuario = new Usuario();
        assertNotNull(usuario);
        assertNotNull(usuario.getDataCriacao());
    }

    @Test
    void deveCriarUsuarioComConstrutorParametrizado() {
        Usuario usuario = new Usuario("admin", "senha123", "admin@test.com", "ADMIN");
        
        assertEquals("admin", usuario.getUsername());
        assertEquals("senha123", usuario.getSenha());
        assertEquals("admin@test.com", usuario.getEmail());
        assertEquals("ADMIN", usuario.getRole());
    }

    @Test
    void deveTestarGettersESetters() {
        Usuario usuario = new Usuario();
        
        usuario.setId(1L);
        assertEquals(1L, usuario.getId());
        
        usuario.setUsername("user");
        assertEquals("user", usuario.getUsername());
        
        usuario.setSenha("pass123");
        assertEquals("pass123", usuario.getSenha());
        
        usuario.setEmail("user@test.com");
        assertEquals("user@test.com", usuario.getEmail());
        
        usuario.setRole("USER");
        assertEquals("USER", usuario.getRole());
        
        usuario.setAtivo(false);
        assertFalse(usuario.isAtivo());
        
        LocalDateTime agora = LocalDateTime.now();
        usuario.setUltimoAcesso(agora);
        assertEquals(agora, usuario.getUltimoAcesso());
    }

    @Test
    void deveInicializarAtivoComoTrue() {
        Usuario usuario = new Usuario();
        assertTrue(usuario.isAtivo());
    }

    @Test
    void deveTestarRelacionamentoComCliente() {
        Usuario usuario = new Usuario();
        Cliente cliente = new Cliente("João", "12345678901", "11999999999", 
            "joao@test.com", null, "M", "Rua A", "1", "", "Centro", "SP");
        
        usuario.setCliente(cliente);
        assertEquals(cliente, usuario.getCliente());
    }
}
