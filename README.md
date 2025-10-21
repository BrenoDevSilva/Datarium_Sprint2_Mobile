# Datarium Mobile 📱

Este é o repositório do projeto **Datarium Mobile**, a interface de usuário (front-end) da plataforma de assessoramento virtual de investimentos. O projeto foi desenvolvido em React Native com Expo para o desafio da **XP Inc.** e FIAP.

Este aplicativo se conecta a uma API Java (Spring Boot) para todas as operações de cadastro, login e gerenciamento de portfólio.

---

### **Participantes do Grupo**

* **Anna Yagyu** - RM 550360
* **Breno Silva** - RM 99275
* **Danilo Urze** - RM 99465
* **Gabriel Pacheco** - RM 550191

---

### **🛠️ Tecnologias Utilizadas**

* **Front-end**: React Native, Expo, TypeScript.
* **Navegação**: React Navigation (Stack e Bottom Tabs).
* **Armazenamento Local**: AsyncStorage (para salvar o ID do usuário e email).
* **Gráficos**: `react-native-chart-kit`.
* **Back-end (Dependência)**: Java 17, Spring Boot, Oracle Database.

---

# ⚠️ Atenção: Configuração Obrigatória da API

Para que este aplicativo mobile funcione, ele **precisa** se conectar à API Java (back-end). Siga os passos abaixo **antes** de executar o app.

### 1. Execute a API Java

* Certifique-se de que a API Java do projeto esteja rodando na sua máquina.
* Você pode encontrar o repositório da API [**AQUI**](https://github.com/BrenoDevSilva/Datarium_Sprint2_Api_Java).
* Siga as instruções do `README.md` da API para iniciá-la (geralmente com o comando `mvn spring-boot:run`).

### 2. Encontre o Endereço IP da sua Máquina

O aplicativo móvel precisa do endereço IP (IPv4) da sua máquina na sua rede local para se conectar ao servidor Java.

* **No Windows:**
    1.  Abra o Prompt de Comando (cmd).
    2.  Digite `ipconfig` e pressione Enter.
    3.  Procure pela sua conexão de rede (Wi-Fi ou Ethernet) e anote o valor do **Endereço IPv4** (Ex: `192.168.15.73`).
* **No macOS / Linux:**
    1.  Abra o Terminal.
    2.  Digite `ifconfig` ou `ip addr show`.
    3.  Procure pela sua conexão de rede (ex: `en0` ou `wlan0`) e anote o endereço `inet` (Ex: `192.168.15.73`).

### 3. Atualize o IP no Código do Aplicativo

Você **deve** substituir a variável `API_URL` em **todos** os arquivos abaixo pelo IP que você encontrou no passo anterior:

* `screens/Auth/LoginScreen.tsx`
* `screens/Auth/RegisterScreen.tsx`
* `screens/App/PortfolioScreen.tsx`
* `screens/App/AddAssetScreen.tsx`
* `screens/App/ProfileScreen.tsx`

**Exemplo de alteração:**

```javascript
// Altere esta linha em todos os arquivos listados:
const API_URL = "http://192.168.15.73:8080";
// Substitua pelo SEU IP e mantenha a porta :8080
```

---

# 🏁 Como Rodar o Projeto (APP Mobile)

Após configurar o IP e garantir que a API Java esteja rodando:

**1. Pré-requisitos:**

* Node.js (LTS) e npm instalados.
* `yarn` instalado (execute `npm install -g yarn` se não tiver).
* O aplicativo **Expo Go** instalado no seu celular (iOS ou Android).

**2. Instalação das Dependências:**

* Abra um terminal na pasta raiz deste projeto (`sprint_mobile_datarium`).
* Execute o comando:
    ```bash
    npm install
    ```
    *(Se você executou `npm install` antes de instalar o `yarn`, talvez seja necessário apagar a pasta `node_modules` e rodar `npm install` novamente).*

**3. Execução do Aplicativo:**

* No terminal, na pasta raiz do projeto, execute:
    ```bash
    npx expo start -c
    ```
* Isso iniciará o Metro Bundler e exibirá um QR Code no terminal.
* Abra o app Expo Go no seu celular e escaneie o QR Code para carregar o aplicativo.

---

### ✨ Funcionalidades do Aplicativo

* **Autenticação**: Telas de Login e Cadastro, com integração total com a API Java.
* **Navegação**: Navegação por abas (Tab Navigator) para as telas de Home, Portfólio, Explicações e Perfil.
* **Dashboard (Home)**: Tela inicial com recomendações personalizadas (mockado) e destaques do mercado (mockado).
* **Portfólio**:
    * Busca e exibe o patrimônio total do cliente (soma dos valores dos ativos) em tempo real via API.
    * Exibe a alocação de ativos por tipo (`RENDA_FIXA`, `RENDA_VARIAVEL`, etc.) em um gráfico de pizza.
    * Lista todos os ativos individuais do cliente.
    * Permite adicionar novos ativos ao portfólio (integrado com `POST /ativos` da API).
* **Perfil**:
    * Busca os dados do perfil do usuário (`GET /clientes/{id}`).
    * Permite ao usuário atualizar seu `PerfilInvestidor` e `Objetivo` (integrado com `PUT /clientes/{id}`).
    * Função de Logout (limpa o AsyncStorage e reseta a navegação).
* **Explicações**: Seção educacional estática com cartões expansíveis sobre finanças.

---

# 📸 Evidências do Projeto

| Tela de Cadastro | Cadastro Sucesso |
| :---: | :---: |
| ![Tela de Cadastro](evidencias/tela_cadastro.png) | ![Cadastro Sucesso](evidencias/sucesso_cadastro.png) |
| **Login Sucesso (Home)** | **Adição Ativo** |
| ![Login Sucesso](evidencias/login_realizado.png) | ![Adição Ativo](evidencias/adicao_ativo.png) |
| **Sucesso Adição Ativo1** | **Sucesso Adição Ativo2** |
| ![Sucesso Ativo1](evidencias/sucesso_ativo1.png) | ![Sucesso Ativo2](evidencias/sucesso_ativo2.png) |
| **Tela de Portifólio** | **Editando Perfil** |
| ![Tela de Portifólio](evidencias/tela_portifolio.png) | ![Editando Perfil](evidencias/edicao_perfil.png) |
| **Sucesso Edição Perfil** | **Dashboard (Home)** |
| ![Tela Sucesso Edição Perfil](evidencias/sucesso_perfil.png) | ![Dashboard](evidencias/dashboard_home.png) |
| **Logout** | **Banco de Dados Datarium - Cliente** |
| ![Tela Logout](evidencias/sessao_encerrada.png) | ![Datarium Banco Cliente](evidencias/datarium_cliente_banco.png) |
| **Banco de Dados Datarium - Ativos** |
| ![Datarium Banco Ativos](evidencias/datarium_ativo_banco.png) |
