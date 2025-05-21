# Mind Blog API

Projeto desenvolvido como parte de um teste técnico para uma vaga de estágio como desenvolvedor fullstack na MindGroup. 

# 🚀 Tecnologias Utilizadas

* NestJS
* TypeORM
* Express
* Jest
* MySQL
* Husky
* CommitLint

# ⚙️ Hooks de Pré-Commit e Padrão de Commits

Para garantir a qualidade do código e a padronização do histórico de commits, este projeto utiliza:

* Husky: Gerenciador de Git Hooks. Ele automatiza a execução de scripts antes de certas operações Git, como commit e push.
* Commitlint: Ferramenta que verifica se suas mensagens de commit seguem as convenções de commit semântico (Conventional Commits).


# Funcionalidades

* Cadastro de novos usuários usuários
* Redefinição de senha
* Autenticação e autorização

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
