package com.petshop.config;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FilterConfigTest {

    @Test
    void deveCriarFilterConfig() {
        FilterConfig config = new FilterConfig();
        assertNotNull(config);
    }
    
    @Test
    void deveVerificarQueClasseExiste() {
        // Verifica que a classe FilterConfig existe e pode ser instanciada
        FilterConfig config = new FilterConfig();
        assertEquals("FilterConfig", config.getClass().getSimpleName());
    }
}
