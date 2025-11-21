package com.petshop.config;

import com.petshop.model.Categoria;
import com.petshop.model.Produto;
import com.petshop.model.Servico;
import com.petshop.model.Usuario;
import com.petshop.repository.CategoriaRepository;
import com.petshop.repository.ProdutoRepository;
import com.petshop.repository.ServicoRepository;
import com.petshop.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private ServicoRepository servicoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public void run(String... args) throws Exception {
        // Verifica se já existem dados
        if (categoriaRepository.count() > 0) {
            return;
        }

        // Criar Categorias
        Categoria racoes = new Categoria();
        racoes.setNome("Rações e Alimentação");
        racoes.setDescricao("Rações, petiscos e suplementos para cães e gatos");
        racoes.setAtivo(true);
        racoes = categoriaRepository.save(racoes);

        Categoria higiene = new Categoria();
        higiene.setNome("Higiene e Cuidados");
        higiene.setDescricao("Produtos de higiene, beleza e primeiros socorros para pets");
        higiene.setAtivo(true);
        higiene = categoriaRepository.save(higiene);

        Categoria acessorios = new Categoria();
        acessorios.setNome("Acessórios e Brinquedos");
        acessorios.setDescricao("Coleiras, camas, roupas, brinquedos e itens para passeios");
        acessorios.setAtivo(true);
        acessorios = categoriaRepository.save(acessorios);

        // Criar Produtos - Rações e Alimentação
        Produto racaoPremium = new Produto();
        racaoPremium.setNome("Ração Premium para Cães Adultos");
        racaoPremium.setDescricao("Ração seca de alta qualidade para cães adultos de todos os portes. Fórmula balanceada com vitaminas e minerais essenciais. Embalagem de 10kg.");
        racaoPremium.setPreco(150.00);
        racaoPremium.setQuantidadeEstoque(50);
        racaoPremium.setUrlImagem("https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&h=300&fit=crop");
        racaoPremium.setCategoria(racoes);
        racaoPremium.setAtivo(true);
        produtoRepository.save(racaoPremium);

        Produto racaoGatos = new Produto();
        racaoGatos.setNome("Ração Hipoalergênica para Gatos");
        racaoGatos.setDescricao("Ração especial para gatos com sensibilidade alimentar. Ingredientes selecionados que não causam alergias. Embalagem de 3kg.");
        racaoGatos.setPreco(95.00);
        racaoGatos.setQuantidadeEstoque(40);
        racaoGatos.setUrlImagem("https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=600&h=300&fit=crop");
        racaoGatos.setCategoria(racoes);
        racaoGatos.setAtivo(true);
        produtoRepository.save(racaoGatos);

        // Criar Produtos - Higiene e Cuidados
        Produto kitBanho = new Produto();
        kitBanho.setNome("Kit Xampu e Condicionador para Peles Sensíveis");
        kitBanho.setDescricao("Conjunto completo para banho de pets com pele sensível. Fórmula hipoalergênica e pH balanceado. Fragrância suave. Frascos de 500ml cada.");
        kitBanho.setPreco(65.00);
        kitBanho.setQuantidadeEstoque(60);
        kitBanho.setUrlImagem("https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=600&h=300&fit=crop");
        kitBanho.setCategoria(higiene);
        kitBanho.setAtivo(true);
        produtoRepository.save(kitBanho);

        Produto antipulgas = new Produto();
        antipulgas.setNome("Antipulgas e Carrapatos");
        antipulgas.setDescricao("Proteção eficaz contra pulgas e carrapatos por até 3 meses. Aplicação tópica fácil e segura. Para cães de 10 a 25kg. Embalagem com 3 pipetas.");
        antipulgas.setPreco(85.00);
        antipulgas.setQuantidadeEstoque(35);
        antipulgas.setUrlImagem("https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=600&h=300&fit=crop");
        antipulgas.setCategoria(higiene);
        antipulgas.setAtivo(true);
        produtoRepository.save(antipulgas);

        // Criar Produtos - Acessórios e Brinquedos
        Produto kitColeira = new Produto();
        kitColeira.setNome("Kit Coleira e Guia Resistente");
        kitColeira.setDescricao("Conjunto de coleira ajustável e guia de 1,5m em nylon resistente. Ideal para passeios seguros. Disponível em várias cores. Tamanho M.");
        kitColeira.setPreco(45.00);
        kitColeira.setQuantidadeEstoque(80);
        kitColeira.setUrlImagem("https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=300&fit=crop");
        kitColeira.setCategoria(acessorios);
        kitColeira.setAtivo(true);
        produtoRepository.save(kitColeira);

        Produto camaOrtopedica = new Produto();
        camaOrtopedica.setNome("Cama Ortopédica para Cães");
        camaOrtopedica.setDescricao("Cama confortável com espuma ortopédica de alta densidade. Perfeita para cães idosos ou com problemas articulares. Capa removível e lavável. Tamanho G.");
        camaOrtopedica.setPreco(180.00);
        camaOrtopedica.setQuantidadeEstoque(25);
        camaOrtopedica.setUrlImagem("https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=600&h=300&fit=crop");
        camaOrtopedica.setCategoria(acessorios);
        camaOrtopedica.setAtivo(true);
        produtoRepository.save(camaOrtopedica);

        // Criar Serviços
        Servico banho = new Servico();
        banho.setNome("Banho");
        banho.setDescricao("Banho completo com produtos de qualidade");
        banho.setPreco(50.00);
        banho.setAtivo(true);
        servicoRepository.save(banho);

        Servico tosa = new Servico();
        tosa.setNome("Tosa");
        tosa.setDescricao("Tosa higiênica ou completa");
        tosa.setPreco(40.00);
        tosa.setAtivo(true);
        servicoRepository.save(tosa);

        Servico completo = new Servico();
        completo.setNome("Banho + Tosa");
        completo.setDescricao("Pacote completo com desconto - banho e tosa");
        completo.setPreco(80.00);
        completo.setAtivo(true);
        servicoRepository.save(completo);

        // Criar Usuário Admin padrão
        Usuario admin = new Usuario();
        admin.setUsername("admin");
        // Hash da senha com BCrypt
        org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder encoder = 
            new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
        admin.setSenha(encoder.encode("admin123"));
        admin.setEmail("admin@petshop.com");
        admin.setRole("ADMIN");
        admin.setAtivo(true);
        usuarioRepository.save(admin);

        System.out.println("✅ Dados iniciais carregados com sucesso!");
        System.out.println("   - 3 Categorias criadas");
        System.out.println("   - 6 Produtos criados");
        System.out.println("   - 3 Serviços criados");
        System.out.println("   - 1 Usuário Admin criado (admin/admin123)");
    }
}
