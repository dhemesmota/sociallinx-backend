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
/src
├── modules                # Módulos principais (ex.: user, auth, post)
│   ├── user               # Lógica de domínio para usuários
│   ├── auth               # Lógica de autenticação
│   └── post               # Lógica para postagens
├── common                 # Utilitários e funcionalidades compartilhadas
├── config                 # Configurações gerais do projeto
└── main.ts                # Arquivo principal de inicialização do NestJS


### Generate KEY JWT
```
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private_key.pem -out public_key.pem

```
```
base64 private_key.pem > private_key-base64.txt
base64 public_key.pem > public_key-base64.txt
```
