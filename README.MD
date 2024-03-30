# Registo e Início de Sessão com Base de Dados

## Visão Geral

Este repositório contém uma página HTML com funcionalidades de registo e início de sessão, utilizando: EJS, Node.JS, Express e MondoDB.

## Instruções de Utilização

Para utilizar esta aplicação, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter o Node.js e o MongoDB instalados em sua máquina.

### Passos

1. **Eliminar "node_modules"**: 
   Delete a pasta "node_modules" se já existir.

2. **Instalar dependências**:
   Abra o terminal na pasta do programa e execute os seguintes comandos:
   
   $npm i -y
   
   $npm i express
   
   $npm i mongoose
   
   $npm i bcrypt
   
   $npm i ejs

   $npm install -g nodemon --save-dev

3. **Iniciar o Servidor**:
Execute o seguinte comando para iniciar o servidor:

   $nodemon src/index.js

4. **Criar Base de Dados**:
Abra o MongoDB Compass e crie uma nova base de dados com o seguinte nome:

   Nome: TunApp_db

   Collection: users

5. **Acesso à Aplicação**:
No seu navegador, acesse:

      http://localhost:3000



