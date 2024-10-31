# Backend - Mini Rede Social

Este é o backend de uma aplicação de rede social simples. Ele fornece uma API para que o frontend possa realizar operações de autenticação, cadastro de usuários e manipulação de dados de postagens.

## Tecnologias Utilizadas

- **Node.js** com **NestJS** para organização e modularidade.
- **TypeScript** para tipagem estática e melhor suporte a grandes projetos.
- **Prisma** como ORM para interagir com o banco de dados PostgreSQL.
- **PostgreSQL** como banco de dados relacional.
- **Docker** para containerização e fácil deploy em múltiplos ambientes.

## Estrutura do Projeto

A estrutura do backend foi construída seguindo princípios de DDD (Domain-Driven Design), facilitando a escalabilidade e manutenção do código.

```plaintext
backend
├── prisma                # Configurações e migrations do Prisma
│   ├── migrations        # Migrations para o banco de dados
│   └── schema.prisma     # Esquema do banco de dados
├── src
│   ├── core              # Core da aplicação, contendo elementos essenciais
│   │   ├── entities      # Entidades de domínio
│   │   ├── errors        # Definição de erros personalizados
│   │   ├── repositories  # Interfaces e implementações de repositórios
│   │   └── types         # Tipos utilitários
│   │       ├── either.spec.ts
│   │       └── either.ts
│   ├── domain            # Módulos de domínio da aplicação
│   │   └── feed          # Módulo de feed
│   │       ├── application # Camada de aplicação
│   │       │   ├── cryptography
│   │       │   ├── repositories
│   │       │   ├── use-cases
│   │       │   └── enterprise
│   ├── infra             # Implementações de infraestrutura
│   │   ├── auth          # Autenticação
│   │   ├── cache         # Cache
│   │   ├── cryptography  # Criptografia
│   │   ├── database      # Configuração do banco de dados
│   │   ├── env           # Variáveis de ambiente e configurações
│   │   └── http          # Configuração HTTP e rotas
│   │       ├── controllers # Controladores das rotas
│   │       ├── pipes      # Pipes personalizados
│   │       └── presenters # Apresentação de dados
│   │       └── http.module.ts
│   ├── app.module.ts     # Módulo principal da aplicação
│   └── main.ts           # Arquivo principal de inicialização
├── test                  # Testes da aplicação
│   ├── cryptography      # Testes de criptografia
│   ├── e2e               # Testes end-to-end
│   ├── factories         # Fábricas para criação de mocks
│   ├── repositories      # Testes de repositórios
│   └── utils             # Utilitários de teste
│   └── setup-e2e.ts      # Configuração dos testes end-to-end
└── .env                  # Arquivo de variáveis de ambiente

### Generate KEY JWT
```
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private_key.pem -out public_key.pem

```
```
base64 private_key.pem > private_key-base64.txt
base64 public_key.pem > public_key-base64.txt
```
