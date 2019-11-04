[![Angular Logo](https://www.vectorlogo.zone/logos/angular/angular-icon.svg)](https://angular.io/) [![Electron Logo](https://www.vectorlogo.zone/logos/electronjs/electronjs-icon.svg)](https://electronjs.org/)

[![Travis Build Status][build-badge]][build]
[![Make a pull request][prs-badge]][prs]
[![License](http://img.shields.io/badge/Licence-MIT-brightgreen.svg)](LICENSE.md)

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

# Introdução

Desenvolva suas APIs de uma forma simples e direta com a melhor plataforma de low-code.

Atualmente roda com esta tecnologias:

- Angular v8.0.0
- Electron v5.0.2
- Electron Builder v20.41.0

Você pode executar esta aplicação:

- Rode a aplicação em ambiente local e com Hot reload.
- Rode sua aplicação em ambiente de produção.
- Crie executáveis para windows, mac e linux.

/!\ Angular 8.0 CLI precisa do Node 10.9 ou superior para funcionar.

## Como iniciar

Clone este repositório na sua maquina :

``` bash
git clone https://github.com/maximegris/angular-electron.git
```

Instale as dependências com o npm :

``` bash
npm install
```

Se você quiser gerar componentes com o Angular-cli , você **precisa** instalar o `@angular/cli` no contexto global do npm.
Por favor siga [Angular-cli documentation](https://github.com/angular/angular-cli) se você precisar instalar versões anteriores do  `angular-cli`.

``` bash
npm install -g @angular/cli
```

## Para iniciar a aplicação em modo desenvolvedor

- **no terminal do windows execute** -> npm start

Feito! você já pode ver a aplicação feita com Angular + Electron em um anbiente local de desenvolvimento com o hot reload do angular!


## Comandos incluídos

|Comando|Descrição|
|--|--|
|`npm run ng:serve:web`| Executa o app no navegador |
|`npm run build`| Constroi o app. Seus arquivos de build estão na pasta /dist. |
|`npm run build:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:local`| Builds your application and start electron
|`npm run electron:linux`| Builds your application and creates an app consumable on linux system |
|`npm run electron:windows`| On a Windows OS, builds your application and creates an app consumable in windows 32/64 bit systems |
|`npm run electron:mac`|  On a MAC OS, builds your application and generates a `.app` file of your application that can be run on Mac |


