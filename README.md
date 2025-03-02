
# Case Join

O **Case Join** é um sistema de gerenciamento que permite realizar operações de CRUD (Criar, Ler, Atualizar e Deletar) para **clientes**, **produtos** e **estoque**. O projeto foi desenvolvido utilizando **Next.js** e **TypeScript**, juntamente com o **json-server** para simular uma API REST.

## Funcionalidades

- **Gerenciamento de clientes**: Criação, edição, listagem e exclusão de clientes.
- **Gerenciamento de produtos**: Adição, edição, visualização e remoção de produtos.
- **Gerenciamento de estoque**: Controle de estoque de produtos com funcionalidades de CRUD.

## Tecnologias

- **Next.js 15** (Framework para React)
- **TypeScript** (Para tipagem estática)
- **json-server** (Simulação de uma API REST)
- **PrimeReact** (Biblioteca de componentes UI)
- **TailwindCSS** (Framework CSS)

## Executando o Projeto

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/heraldo-andrade/case-join.git
   ```

2. **Acesse o diretório do projeto**:

   ```bash
   cd case-join
   ```

3. **Instale as dependências**:

   ```bash
   npm install
   ```

4. **Execute o json-server** (para simular a API):

   ```bash
   npm run json-server
   ```
A api estará disponível em `http://localhost:5000`.

5. **Execute o projeto**:

   ```bash
   npm run dev
   ```

O projeto estará disponível em `http://localhost:3000`.

## Dependências

As dependências do projeto incluem:

- **@hookform/resolvers**: Utilizado para resolver validações no React Hook Form.
- **axios**: Para realizar requisições HTTP.
- **dayjs**: Para manipulação de datas.
- **primeicons** e **primereact**: Biblioteca de componentes UI.
- **react-hook-form**: Para gerenciar formulários.
- **zod**: Para validação de formulários.
- **eslint**: Configuração do ESLint para garantir a qualidade do código.
- **tailwindcss**: Framework CSS para estilização.
- **typescript**: Tipagem estática para JavaScript.