import { Component, OnInit } from '@angular/core';
import { remote } from 'electron';
import { DatabaseStorageService } from '../../share/services/database-storage/database-storage.service';
import { ResourcesTreeInterface } from '../../share/services/resources-tree.interface';
import { CONSTS } from '../../share/services/consts/consts.service';
import { Router } from '@angular/router';
import { TranspilerService } from '../../share/services/transpiler/transpiler.service';
import { CompilerService } from '../../share/services/compiler/compiler.service';

const dialog = remote.dialog;
const fs = require('fs');

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.scss']
})
export class PaginaInicialComponent implements OnInit {
  private window = remote.getCurrentWindow();
  private srcGlobal: ResourcesTreeInterface[];

  public appConfig = [
    {
      label: 'Nome do projeto: ',
      placeholder: 'Qual será o nome do seu projeto? *',
      value: '',
      sugestions: [],
      type: 'text'
    },
    {
      label: 'Descrição do projeto: ',
      placeholder: 'Como você descreve seu novo projeto?',
      value: '',
      sugestions: [],
      type: 'textMultiline'
    },
    {
      label: 'Autor do projeto: ',
      placeholder: 'Quem está desenvolvendo o projeto? *',
      value: '',
      sugestions: [],
      type: 'text'
    },
    {
      label: 'Caminho: ',
      placeholder: 'Onde salvar o projeto? *',
      value: '',
      sugestions: [],
      type: 'selectPath'
    },
    {
      label: 'Tipo de projeto: ',
      placeholder: 'Escolha um tipo de projeto? *',
      value: '0',
      sugestions: [
        {
          label: 'API com nodejs',
          value: 'apinode'
        }
      ],
      type: 'select'
    }
  ];

  constructor(
    private database: DatabaseStorageService,
    private router: Router,
    private transpiler: TranspilerService,
    private compiler: CompilerService,
  ) { }

  ngOnInit() {}

  public selecionarCaminho(i: number) {
    dialog.showOpenDialog({properties: ['openDirectory']}, (path) => {
      console.log(path[0]);
      if (path === undefined) {} else {
        this.appConfig[i].value = path[0].toString();
        document.getElementById('input-propertie-4').focus();
      }
    });
  }

  public criarNovoProjeto() {
    if (this.appConfig[0].value === '' || this.appConfig[0].value === null || this.appConfig[0].value === undefined) {
      document.getElementById('input-propertie-0').focus();
      return;
    }
    if (this.appConfig[2].value === '' || this.appConfig[2].value === null || this.appConfig[2].value === undefined) {
      document.getElementById('input-propertie-2').focus();
      return;
    }
    if (this.appConfig[3].value === '' || this.appConfig[3].value === null || this.appConfig[3].value === undefined) {
      document.getElementById('input-propertie-3').focus();
      return;
    }
    if (Number(this.appConfig[4].value) === 0) {
      document.getElementById('input-propertie-4').focus();
      return;
    }

    this.srcGlobal = CONSTS.appResources.srcPadrao;
    this.srcGlobal[0].staticPropertiesList[0].propertieValue = this.appConfig[0].value;
    this.srcGlobal[0].staticPropertiesList[1].propertieValue = this.appConfig[1].value;
    this.srcGlobal[0].staticPropertiesList[2].propertieValue = this.appConfig[2].value;
    this.srcGlobal[0].staticPropertiesList[4].propertieValue = this.appConfig[3].value + '\\' +
          this.appConfig[0].value.toLocaleLowerCase().trim();

    this.database.criarSrc(this.srcGlobal);

    this.inicializaDiretorio();

  }

  public closeIde() {
    this.window.close();
  }

  private async inicializaDiretorio() {
    if (!fs.existsSync(this.srcGlobal[0].staticPropertiesList[4].propertieValue)) {
      fs.mkdirSync(this.srcGlobal[0].staticPropertiesList[4].propertieValue);
    }

    await this.compiler.genereteFiles(this.srcGlobal);

    await this.compiler.instalaNodeModules(this.srcGlobal[0].staticPropertiesList[4].propertieValue);

    this.router.navigate(['']);
  }
}
