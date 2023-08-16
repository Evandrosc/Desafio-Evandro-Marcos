**Link de Deploy**: [https://evandrosc.github.io/Desafio-Evandro-Marcos/](https://evandrosc.github.io/Desafio-Evandro-Marcos/)

# Instruções para Executar o Projeto e Testes Localmente

Este arquivo README fornece as instruções necessárias para configurar, executar o projeto e realizar testes usando a extensão Live Server no Visual Studio Code, juntamente com o framework de testes Jest. Certifique-se de seguir os passos abaixo para garantir uma experiência suave ao trabalhar com o projeto.

## Pré-requisitos

Antes de iniciar, verifique se você possui os seguintes pré-requisitos instalados em seu sistema:

1. **Node.js**: Certifique-se de ter o Node.js instalado. Caso não tenha, você pode baixá-lo e instalá-lo a partir do site oficial: [https://nodejs.org/](https://nodejs.org/)

2. **npm (Node Package Manager)**: O npm é instalado junto com o Node.js. Verifique se você tem a versão mais recente do npm instalada executando o seguinte comando no terminal:

   ```sh
   npm install -g npm
   ```

3. **Visual Studio Code**: Certifique-se de ter o Visual Studio Code instalado em seu sistema. Você pode baixá-lo a partir do site oficial: [https://code.visualstudio.com/](https://code.visualstudio.com/)

4. **Extensão Live Server**: Instale a extensão Live Server no Visual Studio Code. Você pode instalá-la através do mercado de extensões do VS Code.

## Configuração do Projeto

Siga as etapas abaixo para configurar o projeto:

1. Clone o repositório para o seu sistema local usando o Git ou baixe o código-fonte como um arquivo ZIP.

2. Abra o Visual Studio Code e navegue até o diretório raiz do projeto.

## Instalação das Dependências

Execute o seguinte comando para instalar as dependências do projeto listadas no arquivo `package.json`:

```sh
npm install
```

## Executando o Projeto com o Live Server

Siga as etapas abaixo para executar o projeto usando a extensão Live Server:

1. No Visual Studio Code, abra o arquivo HTML principal do projeto.

2. Localize o botão "Go Live" na barra de status na parte inferior da janela.

3. Clique no botão "Go Live". Isso iniciará o Live Server e abrirá o projeto em um navegador da web.

## Testes com o Jest

Para executar os testes usando o Jest, siga estas etapas:

1. No terminal do Visual Studio Code ou de sua preferência, execute o seguinte comando para rodar os testes:

```sh
npm test
```

O Jest irá executar os testes definidos no projeto e fornecerá os resultados no terminal.

## Encerrando a Execução do Projeto

Para encerrar a execução do projeto e desativar o Live Server, siga as seguintes etapas:

1. No Visual Studio Code, localize a barra de status na parte inferior da janela.

2. Clique no botão "Stop" (ícone quadrado) localizado na barra de status do Live Server.

3. Feche a janela do navegador onde o projeto estava sendo executado.

## Conclusão

Agora você está pronto para configurar, instalar dependências, executar, testar e explorar o projeto usando a extensão Live Server no Visual Studio Code, juntamente com o framework de testes Jest. Certifique-se de seguir as instruções fornecidas acima para garantir uma execução suave do projeto e a realização dos testes. Se você encontrar algum problema, verifique se todos os pré-requisitos foram atendidos e siga as etapas novamente. Divirta-se explorando o projeto!