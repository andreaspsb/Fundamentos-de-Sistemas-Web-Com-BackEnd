package com.petshop.model;

import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class PedidoTest {

    @Test
    void deveCriarPedidoComConstrutorVazio() {
        Pedido pedido = new Pedido();
        assertNotNull(pedido);
    }

    @Test
    void deveTestarGettersESetters() {
        Pedido pedido = new Pedido();
        LocalDateTime agora = LocalDateTime.now();
        Cliente cliente = new Cliente();
        
        pedido.setId(1L);
        assertEquals(1L, pedido.getId());
        
        pedido.setDataPedido(agora);
        assertEquals(agora, pedido.getDataPedido());
        
        pedido.setStatus(Pedido.StatusPedido.PENDENTE);
        assertEquals(Pedido.StatusPedido.PENDENTE, pedido.getStatus());
        
        pedido.setValorTotal(299.90);
        assertEquals(299.90, pedido.getValorTotal());
        
        pedido.setCliente(cliente);
        assertEquals(cliente, pedido.getCliente());
    }

    @Test
    void deveGerenciarItens() {
        Pedido pedido = new Pedido();
        assertNotNull(pedido.getItens());
        assertTrue(pedido.getItens().isEmpty());
    }

    @Test
    void deveCalcularValorTotal() {
        Pedido pedido = new Pedido();
        pedido.calcularValorTotal();
        assertEquals(0.0, pedido.getValorTotal());
    }
}
