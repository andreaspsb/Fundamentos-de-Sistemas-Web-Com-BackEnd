package com.petshop.dto;

public class LoginResponseDTO {

    private String token;
    private String username;
    private String email;
    private String role;
    private Long clienteId;

    // Construtores
    public LoginResponseDTO() {
    }

    public LoginResponseDTO(String token, String username, String email, String role, Long clienteId) {
        this.token = token;
        this.username = username;
        this.email = email;
        this.role = role;
        this.clienteId = clienteId;
    }

    // Getters e Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }
}
