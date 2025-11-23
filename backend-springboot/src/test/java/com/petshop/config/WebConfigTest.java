package com.petshop.config;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class WebConfigTest {

    @Test
    void deveCriarWebConfig() {
        WebConfig config = new WebConfig();
        assertNotNull(config);
    }

    @Test
    void deveImplementarWebMvcConfigurer() {
        WebConfig config = new WebConfig();
        assertTrue(config instanceof org.springframework.web.servlet.config.annotation.WebMvcConfigurer);
    }
}
