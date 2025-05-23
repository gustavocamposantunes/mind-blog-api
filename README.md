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

# Instruções

## Variável de ambiente
* É necessário copiar os arquivos do ``.env.example`` para o .env

## MySQL com docker-compose
* Tendo o docker-compose instalado, para rodar o mysql é necessário rodar o comando "docker-compose up"

## Rodar o projeto
* Utilize ``pnpm run start``