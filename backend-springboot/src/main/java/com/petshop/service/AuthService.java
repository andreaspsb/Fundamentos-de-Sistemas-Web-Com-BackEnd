package com.petshop.service;

import com.petshop.dto.LoginRequestDTO;
import com.petshop.dto.LoginResponseDTO;
import com.petshop.dto.UsuarioRequestDTO;
import com.petshop.model.Cliente;
import com.petshop.model.Usuario;
import com.petshop.repository.ClienteRepository;
import com.petshop.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Transactional
    public LoginResponseDTO login(LoginRequestDTO loginRequest) {
        // Buscar usuário
        Usuario usuario = usuarioRepository.findByUsernameAndAtivo(loginRequest.getUsername(), true)
                .orElseThrow(() -> new RuntimeException("Usuário ou senha inválidos"));

        // Validar senha com BCrypt
        if (!passwordEncoder.matches(loginRequest.getSenha(), usuario.getSenha())) {
            throw new RuntimeException("Usuário ou senha inválidos");
        }

        // Atualizar último acesso
        usuario.setUltimoAcesso(LocalDateTime.now());
        usuarioRepository.save(usuario);

        // Gerar token simples (Base64 do username + timestamp)
        String token = gerarToken(usuario);

        // Retornar resposta
        Long clienteId = usuario.getCliente() != null ? usuario.getCliente().getId() : null;
        
        return new LoginResponseDTO(
            token,
            usuario.getUsername(),
            usuario.getEmail(),
            usuario.getRole(),
            clienteId
        );
    }

    @Transactional
    public Usuario registrar(UsuarioRequestDTO usuarioRequest) {
        // Validar se username já existe
        if (usuarioRepository.existsByUsername(usuarioRequest.getUsername())) {
            throw new RuntimeException("Username já cadastrado");
        }

        // Validar se email já existe
        if (usuarioRepository.existsByEmail(usuarioRequest.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }

        // Criar novo usuário
        Usuario usuario = new Usuario();
        usuario.setUsername(usuarioRequest.getUsername());
        // Hash da senha com BCrypt
        usuario.setSenha(passwordEncoder.encode(usuarioRequest.getSenha()));
        usuario.setEmail(usuarioRequest.getEmail());
        usuario.setRole(usuarioRequest.getRole());
        usuario.setAtivo(true);

        // Vincular cliente se fornecido
        if (usuarioRequest.getClienteId() != null) {
            Cliente cliente = clienteRepository.findById(usuarioRequest.getClienteId())
                    .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
            usuario.setCliente(cliente);
        }

        return usuarioRepository.save(usuario);
    }

    private String gerarToken(Usuario usuario) {
        // Token simples: Base64 de "username:timestamp"
        String payload = usuario.getUsername() + ":" + System.currentTimeMillis();
        return Base64.getEncoder().encodeToString(payload.getBytes());
    }

    public boolean validarToken(String token) {
        try {
            String decoded = new String(Base64.getDecoder().decode(token));
            String[] parts = decoded.split(":");
            
            if (parts.length != 2) return false;
            
            // Verificar se usuário existe
            Optional<Usuario> usuario = usuarioRepository.findByUsername(parts[0]);
            
            // Token válido por 24 horas
            long timestamp = Long.parseLong(parts[1]);
            long now = System.currentTimeMillis();
            long diff = now - timestamp;
            long hours = diff / (1000 * 60 * 60);
            
            return usuario.isPresent() && hours < 24;
        } catch (Exception e) {
            return false;
        }
    }

    public Optional<Usuario> getUsuarioFromToken(String token) {
        try {
            String decoded = new String(Base64.getDecoder().decode(token));
            String username = decoded.split(":")[0];
            return usuarioRepository.findByUsername(username);
        } catch (Exception e) {
            return Optional.empty();
        }
    }
}
