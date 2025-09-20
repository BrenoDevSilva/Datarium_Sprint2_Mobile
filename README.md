# Datarium Mobile

### **Visão Geral**

O **Datarium** é uma plataforma de assessoramento virtual de investimentos, desenvolvida para o desafio da **XP Inc.** e FIAP. Este projeto mobile é a interface do usuário que se comunica com uma API Java para todas as operações de cadastro, login e visualização dos dados do portfólio.

### **Participantes do Grupo**

* **Anna Yagyu** - RM 550360
* **Breno Silva** - RM 99275
* **Danilo Urze** - RM 99465
* **Gabriel Pacheco** - RM 550191

### **Tecnologias Utilizadas**

* **Front-end**: React Native com Expo e TypeScript.
* **Back-end**: Java 17, Spring Boot, Spring Data JPA e Oracle Database.

---

### **Como Rodar o Projeto (Front-end Mobile)**

1.  **Pré-requisitos**:
    * Node.js e npm instalados.
    * Um emulador Android ou iOS (configurado via Android Studio ou Xcode).
    * O aplicativo **Expo Go** instalado no seu celular ou emulador.

2.  **Instalação das Dependências**:
    * Abra o terminal na pasta do projeto mobile (`DatariumMobile`).
    * Execute o seguinte comando para instalar todas as dependências:
        ```bash
        npm install
        ```

3.  **Execução da Aplicação**:
    * Certifique-se de que a sua **API Java está rodando** (veja as instruções abaixo).
    * No terminal, inicie o projeto com o comando:
        ```bash
        npx expo start
        ```
    * Escaneie o QR Code com o aplicativo Expo Go no seu celular ou pressione `a` no terminal para abrir no emulador Android.

---

### **Como Rodar o Projeto (Back-end Java)**

Este projeto requer que a API Java esteja em execução para que o aplicativo mobile funcione.

1.  **Pré-requisitos**:
    * **Java 17** e **Maven** instalados e configurados.
    * Acesso ao banco de dados Oracle da FIAP.

2.  **Configuração do Banco de Dados**:
    * Abra o arquivo `src/main/resources/application.properties`.
    * **O projeto está configurado para rodar na minha conta pessoal do banco de dados Oracle.** Caso queira executá-lo em outra conta, por favor, mude as credenciais (`username` e `password`) para as suas.
    ```properties
    spring.datasource.url=jdbc:oracle:thin:@oracle.fiap.com.br:1521:ORCL
    spring.datasource.username=RM99275
    spring.datasource.password=180105
    ```

3.  **Execução da API a partir do Terminal**:
    * Navegue até a pasta do projeto Java (`Datarium_Sprint2_Api_Java`).
    * Execute o seguinte comando para construir e rodar a aplicação:
        ```bash
        mvn spring-boot:run
        ```
    * A API será executada na porta `8080` e estará pronta para aceitar requisições do aplicativo mobile.

### **Funcionalidades do Aplicativo**

* **Autenticação**: Telas de login e cadastro integradas à API Java.
* **Navegação**: Navegação por abas (`Tab Navigation`) para as telas principais do aplicativo.
* **Portfólio**: Tela que exibe o patrimônio total do cliente e a alocação de ativos em um gráfico de pizza, com dados buscados em tempo real da API.
* **Explicações**: Seção educacional com informações sobre investimentos.
