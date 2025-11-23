package com.petshop.config;

import io.swagger.v3.oas.models.OpenAPI;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class OpenApiConfigTest {

    @Test
    void deveConfigurarOpenAPI() {
        OpenApiConfig config = new OpenApiConfig();
        OpenAPI openAPI = config.petshopOpenAPI();
        
        assertNotNull(openAPI);
        assertNotNull(openAPI.getInfo());
        assertEquals("Pet Shop API", openAPI.getInfo().getTitle());
        assertEquals("API REST para sistema de Pet Shop - Fundamentos de Sistemas Web", openAPI.getInfo().getDescription());
        assertEquals("1.0.0", openAPI.getInfo().getVersion());
    }

    @Test
    void deveConterInformacoesDeContato() {
        OpenApiConfig config = new OpenApiConfig();
        OpenAPI openAPI = config.petshopOpenAPI();
        
        assertNotNull(openAPI.getInfo().getContact());
        assertEquals("Andreas Paulus Scherdien Berwaldt", openAPI.getInfo().getContact().getName());
    }

    @Test
    void deveConterServidores() {
        OpenApiConfig config = new OpenApiConfig();
        OpenAPI openAPI = config.petshopOpenAPI();
        
        assertNotNull(openAPI.getServers());
        assertFalse(openAPI.getServers().isEmpty());
        assertEquals("http://localhost:8080", openAPI.getServers().get(0).getUrl());
    }
}
