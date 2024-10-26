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
- **React Native Expo**: Para o desenvolvimento da versão mobile.

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
O projeto está **concluído**, com as seguintes etapas ainda em andamento:
- Implementação de responsividade e refinamento de estilo

## 🌐 Deploy
O projeto foi desenvolvido e está disponível na Vercel, podendo ser acessado em: ['Wallet-Flow'](https://wallet-flow.vercel.app/)

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

## 🕹️ Como Usar

### 💻 Versão Web
1. **Login**: Ao realizar o login, você será direcionado diretamente para a página inicial (Home).
2. **Página Inicial**: Na Home, você verá os dados da sua conta, incluindo saldo e histórico de transações.
3. **Depósitos e Transferências**:
   - Na mesma página, abaixo dos dados da conta, haverá dois formulários:
     - **Depósito**: Informe o valor e clique no botão para realizar o depósito.
     - **Transferência**: Informe a chave e o valor e clique no botão para realizar a transferência.
4. **Criar Conta**: 
   - Caso ainda não tenha uma conta, um botão de "Criar Conta" será exibido na página inicial.
   - Ao clicar no botão, você será direcionado para a página de criação de conta, onde deverá informar a chave e o saldo inicial.

### 📱 Versão Mobile
1. **Login**: Após o login, três opções principais estarão disponíveis:
   - **Depósito**: Clique para acessar o formulário de depósito. Basta informar o valor e confirmar.
   - **Transferência**: Clique para acessar o formulário de transferência. Informe a chave e o valor, e clique no botão para confirmar a transação.
   - **Extrato**: Exibe o histórico de transações da conta.
2. **Criar Conta**:
   - Semelhante à versão web, caso não tenha uma conta, uma opção de "Criar Conta" estará disponível.
   - Ao selecionar essa opção, informe a chave e o saldo inicial para criar a conta.

## ✍️ Contribuições
Sinta-se à vontade para contribuir com este projeto. Sugestões, correções de bugs e melhorias são sempre bem-vindas. Por favor, siga o fluxo de trabalho do Git Flow para submissão de pull requests.
