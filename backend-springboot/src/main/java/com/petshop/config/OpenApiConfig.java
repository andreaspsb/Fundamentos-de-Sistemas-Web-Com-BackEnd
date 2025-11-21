package com.petshop.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI petshopOpenAPI() {
        Server localServer = new Server();
        localServer.setUrl("http://localhost:8080");
        localServer.setDescription("Servidor Local");

        Contact contact = new Contact();
        contact.setName("Andreas Paulus Scherdien Berwaldt");
        contact.setEmail("contato@petshop.com.br");

        Info info = new Info()
                .title("Pet Shop API")
                .version("1.0.0")
                .description("API REST para sistema de Pet Shop - Fundamentos de Sistemas Web")
                .contact(contact);

        return new OpenAPI()
                .info(info)
                .servers(List.of(localServer));
    }
}
