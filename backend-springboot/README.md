# Petshop Backend - Spring Boot

## Tecnologias
- Java 21
- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database (em memória)
- Maven

## Dependências Incluídas
- **Spring Web**: Para criar APIs REST
- **Spring Data JPA**: Para acesso ao banco de dados
- **H2 Database**: Banco de dados em memória
- **Validation**: Para validação de dados
- **Lombok**: Para reduzir código boilerplate (getters, setters, construtores)
- **DevTools**: Hot reload durante desenvolvimento

## Como Executar

### Via Maven
```bash
cd backend-springboot
mvn spring-boot:run
```

### Via Java
```bash
mvn clean package
java -jar target/petshop-backend-0.0.1-SNAPSHOT.jar
```

## Endpoints
- API: http://localhost:8080
- H2 Console: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:petshopdb`
  - Username: `sa`
  - Password: (vazio)

## Estrutura do Projeto
```
src/main/java/com/petshop/
├── PetshopApplication.java    # Classe principal
├── controller/                # Controllers REST
├── service/                   # Lógica de negócio
├── repository/                # Repositórios JPA
├── model/                     # Entidades do banco
├── dto/                       # Data Transfer Objects
└── config/                    # Configurações
```
