import { Component, OnInit } from '@angular/core';

const { dialog } = require('electron').remote;

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.scss']
})
export class PaginaInicialComponent implements OnInit {

  public appConfig = [
    {
      label: 'Nome do projeto: ',
      placeholder: 'Qual será o nome do seu projeto? ',
      value: '',
      sugestions: [],
      type: 'text'
    },
    {
      label: 'Descrição do projeto: ',
      placeholder: 'Como você descreve seu novo projeto?',
      value: '',
      sugestions: [],
      type: 'text'
    },
    {
      label: 'Autor do projeto: ',
      placeholder: 'Quem está desenvolvendo o projeto?',
      value: '',
      sugestions: [],
      type: 'text'
    },
    {
      label: 'Caminho: ',
      placeholder: 'Onde salvar o projeto? ',
      value: '',
      sugestions: [],
      type: 'selectPath'
    }
  ];

  constructor(
  ) { }

  ngOnInit() {
  }

  public inputsOnChange() {

  }

  public selecionarCaminho(i: number) {
    dialog.showOpenDialog({properties: ['openDirectory']}, (path) => {
      console.log(path[0]);
      if (path === undefined) {} else {
        console.log(path);
        this.appConfig[i].value = path[0].toString();
      }
    });
  }

  public criarNovoProjeto() {

  }

}
