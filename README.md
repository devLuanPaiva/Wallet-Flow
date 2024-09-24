# 🤑 Wallet Flow 💴

**Wallet Flow** é uma aplicação web de carteira virtual, onde o usuário pode:

- Criar uma conta
- Visualizar o saldo
- Realizar depósitos
- Transferir saldo para outra conta de outro usuário
- Visualizar o extrato das operações realizadas
- Reverter operações

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido com foco em aprendizado e boas práticas de arquitetura limpa. As seguintes tecnologias foram utilizadas:

- **TurboRepo**: Para a organização da arquitetura em monorepo.
- **Next.js**: Framework React para a construção da interface web.
- **TailwindCSS**: Para estilização de componentes de forma eficiente e responsiva.
- **Aceternity UI**: Para componentes de interface de usuário.
- **Prisma**: ORM para interação com o banco de dados.
- **SQLite**: Banco de dados leve e eficiente.
- **Jest**: Para testes unitários e de integração.
- **Git Flow**: Para gerenciamento de versão com uma estratégia clara de branches.
-**React Native Expo**: Para o desenvolvimento da versão mobile.

## 🛠️ Funcionalidades

- **Criação de contas**: Os usuários podem se registrar e criar uma conta.
- **Depósitos e Transferências**: O sistema permite ao usuário fazer depósitos para si mesmo e transferências para outros usuários.
- **Extrato de Operações**: Os usuários podem visualizar um histórico detalhado de todas as operações realizadas.
- **Reversão de Operações**: Possibilidade de reverter operações.

## 📚 Motivação e Objetivo

Este projeto foi desenvolvido com o objetivo de ser enviado como parte de um teste técnico, além de oferecer uma oportunidade de aprendizado em relação a:

- Arquitetura limpa
- Melhores práticas de desenvolvimento de aplicações web
- Uso das tecnologias mencionadas de forma eficiente

## 🚧 Status do Projeto

O projeto está **em desenvolvimento**, com as seguintes etapas ainda em andamento:
- Implementação de responsividade e refinamento de estilo
- Finalização de regras de negócio
- Testes em toda a aplicação (usando Jest)
- Desenvolvimento da versão mobile, com as telas de Landing e Access já implementadas. Ambas fazem requisições para registrar usuários e login, sendo testadas com sucesso em casos de registro e login (incluindo cenários de erro).

## 🧩 Próximos Passos
- Desenvolver a versão mobile
- Realizar o deploy de todo o sistema

## 📦 Como rodar o projeto

### Pré-requisitos

- Node.js (versão recomendada: 18.x.x)
- Yarn ou NPM

### Instalação e execução
1. Clone o repositório:
```sh
git clone https://github.com/devLuanPaiva/Wallet-Flow.git
```
2. Navege até a pasta do projeto:
```sh
cd barba-brutal
```
3. Instale as dependências:
```bash
npm install
# ou 
yarn install
```
4. Inicie o servidor de desenvolvimento:

    ```bash
        npm run dev
        # or
        yarn dev
        # or
        pnpm dev
        # or
        bun dev
        ```
5. Abra o navegador e acesse `http://localhost:3000`.

## ✍️ Contribuições
Sinta-se à vontade para contribuir com este projeto. Sugestões, correções de bugs e melhorias são sempre bem-vindas. Por favor, siga o fluxo de trabalho do Git Flow para submissão de pull requests.
