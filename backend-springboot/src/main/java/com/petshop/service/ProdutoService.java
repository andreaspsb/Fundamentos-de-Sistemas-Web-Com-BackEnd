package com.petshop.service;

import com.petshop.model.Produto;
import com.petshop.model.Categoria;
import com.petshop.repository.ProdutoRepository;
import com.petshop.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Transactional(readOnly = true)
    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Produto> listarDisponiveis() {
        return produtoRepository.findProdutosDisponiveis();
    }

    @Transactional(readOnly = true)
    public List<Produto> listarPorCategoria(Long categoriaId) {
        return produtoRepository.findByCategoriaId(categoriaId);
    }

    @Transactional(readOnly = true)
    public List<Produto> listarDisponiveisPorCategoria(Long categoriaId) {
        return produtoRepository.findProdutosDisponiveisPorCategoria(categoriaId);
    }

    @Transactional(readOnly = true)
    public Optional<Produto> buscarPorId(Long id) {
        return produtoRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Produto> buscarPorNome(String termo) {
        return produtoRepository.buscarPorNome(termo);
    }

    @Transactional(readOnly = true)
    public List<Produto> listarEstoqueBaixo(Integer quantidade) {
        return produtoRepository.findByQuantidadeEstoqueLessThan(quantidade);
    }

    @Transactional
    public Produto salvar(Produto produto, Long categoriaId) {
        Categoria categoria = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada com ID: " + categoriaId));
        
        produto.setCategoria(categoria);
        return produtoRepository.save(produto);
    }

    @Transactional
    public Produto atualizar(Long id, Produto produtoAtualizado) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com ID: " + id));

        produto.setNome(produtoAtualizado.getNome());
        produto.setDescricao(produtoAtualizado.getDescricao());
        produto.setPreco(produtoAtualizado.getPreco());
        produto.setQuantidadeEstoque(produtoAtualizado.getQuantidadeEstoque());
        produto.setUrlImagem(produtoAtualizado.getUrlImagem());
        produto.setAtivo(produtoAtualizado.getAtivo());

        return produtoRepository.save(produto);
    }

    @Transactional
    public Produto atualizarEstoque(Long id, Integer quantidade) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com ID: " + id));
        
        produto.setQuantidadeEstoque(quantidade);
        return produtoRepository.save(produto);
    }

    @Transactional
    public Produto adicionarEstoque(Long id, Integer quantidade) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com ID: " + id));
        
        produto.adicionarEstoque(quantidade);
        return produtoRepository.save(produto);
    }

    @Transactional
    public Produto reduzirEstoque(Long id, Integer quantidade) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com ID: " + id));
        
        if (!produto.temEstoque(quantidade)) {
            throw new RuntimeException("Estoque insuficiente para o produto: " + produto.getNome());
        }
        
        produto.reduzirEstoque(quantidade);
        return produtoRepository.save(produto);
    }

    @Transactional
    public void ativar(Long id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com ID: " + id));
        produto.setAtivo(true);
        produtoRepository.save(produto);
    }

    @Transactional
    public void desativar(Long id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com ID: " + id));
        produto.setAtivo(false);
        produtoRepository.save(produto);
    }

    @Transactional
    public void deletar(Long id) {
        if (!produtoRepository.existsById(id)) {
            throw new RuntimeException("Produto não encontrado com ID: " + id);
        }
        produtoRepository.deleteById(id);
    }
}
