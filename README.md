# 🚗 AutoRent — API de Aluguel de Carros

API desenvolvida em **Node.js + TypeScript** para gerenciamento de carros, categorias, especificações e processo de aluguel.  
Projeto criado para fins de estudo, utilizando arquitetura limpa, boas práticas e recursos modernos como **Docker**, **TypeORM**, **Multer**, **JWT**, **TSyringe** e **Jest**.

---

## 📦 Tecnologias utilizadas

- Node.js  
- TypeScript  
- Express  
- TypeORM  
- PostgreSQL  
- Docker & Docker Compose  
- Multer  
- JWT  
- TSyringe  
- Swagger UI  
- Jest  

---

# 🐳 Rodando com Docker

## 1. Subir containers
 - docker compose up -d

## 2. Para a aplicação
 - docker compose stop

## 2. Rodar a aplicação
- docker compose start

---

# Rodar os teste
 - npm test

---


# Requisitos do sistema

# Cadastro de carro

**RF**
Deve ser possível cadrastar um novo carro.
Deve ser possível listar todas as categorias.

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
Não deve ser possível alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado com a disponibilidade por padrão.
O usuário responsável pelo cadastro deve ser possível um usuário administrador.


# Listagem de carros

**RF**
Deve ser possível listar os carros disponíveis.
Deve ser possível listar os carros disponíveis pelo nome da categoria.
Deve ser possível listar os carros disponíveis pelo nome da marca.
Deve ser possível listar os carros disponíveis pelo nome da carro.

**RN**
O usuário não precisa estar logado no sistema. 


# Cadastro de especificação no carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.
Deve ser possível listar todos os carros.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser possível um usuário administrador.

# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro

**RNF**
Utilizar o multer para uploads dos arquivos.

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.


# Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel.

**RNF**

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.