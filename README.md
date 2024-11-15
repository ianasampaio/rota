# Rota  

**Rota** é um sistema de gerenciamento de vendas e produtos em carregamentos para transporte entre diferentes localidades. Ele foi desenvolvido utilizando **TypeScript**, **Node.js**, **Prisma ORM**, e **PostgreSQL** para garantir eficiência e escalabilidade.  

## 📋 Funcionalidades  

- Gerenciamento de Clientes, Carregamentos, Vendas, Produtos, Produtos em carregamentos e Pagamentos

## 🛠️ Tecnologias Utilizadas  

- **Linguagem**:  
  - [TypeScript](https://www.typescriptlang.org/)  

- **Backend**:  
  - [Node.js](https://nodejs.org/)  
  - [Express.js](https://expressjs.com/)  

- **ORM**:  
  - [Prisma](https://www.prisma.io/)  

- **Banco de Dados**:  
  - [PostgreSQL](https://www.postgresql.org/)  

## Pré-requisitos

Antes de rodar o projeto, certifique-se de ter as seguintes ferramentas instaladas:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/)
- [npm ou yarn](https://yarnpkg.com/)
  
## 🔧 Configuração e Instalação  

1. **Clone o repositório**  
   ```bash  
   git clone https://github.com/ianasampaio/rota.git 
   cd rota  
   ```  

2. **Configure o ambiente**  
   - Crie um arquivo .env na raiz do projeto e insira as seguintes variáveis:

     ```env  
      POSTGRES_HOST=  
      POSTGRES_PORT=  
      POSTGRES_USER=  
      POSTGRES_DB=  
      POSTGRES_PASSWORD=  
      DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco       
      ACCESS_TOKEN_SECRET=<sua-chave-secreta>  
      EXPIRE=''
     ```
     
3. **Subindo o container Docker**
    - No diretório raiz do projeto, execute o seguinte comando para rodar o banco de dados PostgreSQL em um container Docker:
    ```bash  
    docker-compose up -d
    ```
    
4. **Instale as dependências**  
   ```bash  
   yarn  
   ```
   
5. **Execute a migração do banco de dados** 
     ```bash  
     npx prisma migrate dev  
     ```  

6. **Inicie o servidor**  
   ```bash  
   yarn dev  
   ```  
