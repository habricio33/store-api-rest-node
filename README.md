# Store API Rest

## Descrição
Este projeto é uma **API REST** desenvolvida com **Node.js**, utilizando **MongoDB** e **PostgreSQL** como bancos de dados. A API foi construída seguindo os princípios da **Clean Architecture** e utilizando uma arquitetura em camadas para garantir a escalabilidade, manutenção e organização do código.

Este projeto foi desenvolvido como parte do **desafio da disciplina de API's Rest/Restful** da **pós-graduação em Desenvolvimento Full Stack & Full Cycle**.

---

## 🚀 Principais Tecnologias Utilizadas
- **Node.js**: Plataforma de desenvolvimento JavaScript.
- **MongoDB**: Banco de dados NoSQL.
- **PostgreSQL**: Banco de dados relacional.
- **Clean Architecture**: Organização do código em camadas independentes.
- **Express**: Framework para criação de rotas e gerenciamento de middlewares.
- **Sequelize**: ORM (Object Relational Mapper) para interagir com o PostgreSQL.
- **Winston**: Para gerenciamento de logs.

---

## 📂 Estrutura do Projeto
O projeto segue a **Clean Architecture**, organizado em camadas principais, com as seguintes responsabilidades:
1. **Routes**: Responsável por definir os endpoints da aplicação, mapeando as requisições para os respectivos controladores (Controllers). Essa camada atua como a interface inicial entre o cliente e o backend.
2. **Controllers**: Controladores que gerenciam a comunicação entre as rotas (Routes) e as camadas de lógica de negócio (Services). São responsáveis por receber requisições, processar dados de entrada e enviar respostas apropriadas.
3. **Services**: Contém a lógica de negócio da aplicação, centralizando as operações principais e garantindo que a lógica seja reutilizável e independente de frameworks ou tecnologias específicas (como MongoDB ou PostgreSQL).
5. **Models**: Representa a estrutura de dados da aplicação. É responsável por definir os esquemas e validações para os dados, especialmente ao interagir com os bancos de dados.
5. **Repositories**: Realiza a abstração da interação com os bancos de dados. Aqui estão localizadas as operações CRUD e consultas específicas para cada entidade.

---

## 🛠️ Funcionalidades Implementadas
- Criação, leitura, atualização e exclusão (CRUD) de dados.
- Integração com múltiplos bancos de dados (MongoDB e PostgreSQL).
- Roteamento organizado e documentação das rotas.

---

## 📋 Pré-requisitos
Antes de iniciar o projeto, certifique-se de ter as seguintes ferramentas instaladas:
- **Node.js** (v18 ou superior)
- **MongoDB** (instância local ou cloud)
- **PostgreSQL** (instância local ou cloud)

---

## 🔧 Instalação e Execução
1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-repositorio.git
   cd nome-repositorio
