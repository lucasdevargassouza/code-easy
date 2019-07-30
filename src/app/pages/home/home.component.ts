import { Component, OnInit, HostListener } from '@angular/core';
import { remote } from 'electron';

import { Emissor } from '../../share/services/emissor-eventos/emissor-eventos.service';
import { DatabaseStorageService } from '../../share/services/database-storage/database-storage.service';
import { UtilsService } from '../../share/services/utils/utils.service';
import { CONSTS } from '../../share/services/consts/consts.service';
import { TerminalAccessService } from '../../share/services/terminal-access/terminal-access.service';
import { CompilerService } from '../../share/services/compiler/compiler.service';

const dialog = remote.dialog;
const fs = require('fs');


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public srcGlobal = [];
  public widthColLeft = 180;
  public widthColRight = 300;
  public heightColRight = 200;
  public currentTab = CONSTS.editorTabs.editor;
  public dependencesList: [];
  public installDependencesList: any[];
  public dependenciaIndex: Number = 0;
  public dependenciaDetalhe = {name: '', version: '', index: 0};
  public dependenciaSearch: string;
  public toggleTab: Boolean = true;
  public instalarDependencia: Boolean = false;

  private oldX = 0;
  private oldY = 0;
  private grabberColRightResizeY = false;
  private grabberColLeft = false;
  private grabberColRight = false;

  constructor(
    private database: DatabaseStorageService,
    private utils: UtilsService,
    private terminalAccess: TerminalAccessService,
    private compiler: CompilerService,

  ) {}

  ngOnInit() {
    this.database.getSrc();
    this.inicializaEmissores();
    this.inicializaPid();
    this.inicializaNpmSearch();
    console.log(this.srcGlobal);
  }

  //#region Resize Divs
  public onMouseDownColLeft(event: MouseEvent) {
    this.grabberColLeft = true;
    this.oldX = event.clientX;
  }

  public onMouseDownColRight(event: MouseEvent) {
    this.grabberColRight = true;
    this.oldX = event.clientX;
  }

  public onMouseDownColRightResizeY(event: MouseEvent) {
    this.grabberColRightResizeY = true;
    this.oldY = event.clientY;
  }

  @HostListener('document:mousemove', ['$event'])
  public onMouseMove(event: MouseEvent) {
    if (this.grabberColLeft) {
      this.widthColLeft += event.clientX - this.oldX;
      this.oldX = event.clientX;
    }
    if (this.grabberColRight) {
      this.widthColRight -= event.clientX - this.oldX;
      this.oldX = event.clientX;
    }
    if (this.grabberColRightResizeY) {
      this.heightColRight += event.clientY - this.oldY;
      this.oldY = event.clientY;
    }
  }

  @HostListener('document:mouseup', ['$event'])
  public onMouseUp(event: MouseEvent) {
    this.grabberColLeft = false;
    this.grabberColRight = false;
    this.grabberColRightResizeY = false;
  }

  //#endregion

  public selecionarCaminho(i: number) {
    dialog.showOpenDialog({properties: ['openDirectory']}, (path) => {
      if (path === undefined) {} else {
        this.srcGlobal[i].value = path[0].toString();
        document.getElementById('input-propertie-4').focus();
      }
    });
  }

  // Em cada change salva os dados.
  public inputsOnChange() {
    setTimeout(() => {
      this.database.updateSrc();
    }, 100);
  }

  public abrirNavegador(url: string) {
    this.terminalAccess.openUrl(url);
  }

  public changeCurrentTab(value: string) {
    Emissor.currentTab.emit(value);
  }

  public abrirDependencia(index, tipo) {
    this.dependenciaDetalhe.index = index;
    this.dependenciaIndex = index;
    if (tipo === 'instaladas') {
      this.dependenciaDetalhe = this.dependencesList[index];
      this.dependenciaDetalhe.index = index;
      this.instalarDependencia = false;
    } else if (tipo === 'instalar') {

      this.dependenciaDetalhe = this.installDependencesList[index];
      this.dependenciaDetalhe.index = index;

      // Verifica se o elemento já está instalado.
      const elementoExiste = this.dependencesList.find((elemento: any) => {
        return elemento.name === this.installDependencesList[index].name;
      });
      if (elementoExiste === undefined) {
        this.instalarDependencia = true;
      }
    }
  }

  public async removeDependencia(index) {
    this.dependencesList.splice(index, 1);
    this.dependenciaDetalhe = {name: '', version: '', index: 0};
    try {
      this.srcGlobal[0].staticPropertiesList[6].propertieValue = JSON.stringify(this.dependencesList);
      this.database.updateSrc();
      await this.compiler.genereteFiles(this.srcGlobal);
      await this.compiler.instalaNodeModules(this.srcGlobal[0].staticPropertiesList[4].propertieValue);
    } catch (e) {
      console.log(e);
    }
  }

  public async adicionaDependencia(index) {
    const elementoExiste = this.dependencesList.find((elemento: any) => {
      return elemento.name === this.installDependencesList[index].name;
    });

    if (elementoExiste === undefined) {
      this.dependencesList.push(this.installDependencesList[index] as never);
      this.dependenciaDetalhe = this.installDependencesList[index];
      this.dependenciaDetalhe.index = index;
      this.instalarDependencia = false;
      try {
        this.srcGlobal[0].staticPropertiesList[6].propertieValue = JSON.stringify(this.dependencesList);
        this.database.updateSrc();
        await this.compiler.genereteFiles(this.srcGlobal);
        await this.compiler.instalaNodeModules(this.srcGlobal[0].staticPropertiesList[4].propertieValue);
      } catch (e) { console.log(e); }
    }
  }

  public async inicializaNpmSearch() {
    console.log(await this.terminalAccess.npmSearch(this.dependenciaSearch));
    this.installDependencesList = await this.terminalAccess.npmSearch(this.dependenciaSearch);
  }

  private async inicializaPid() {
    let pid = '--';
    setInterval(async () => {
      if (this.srcGlobal) {
        if (this.srcGlobal[0].staticPropertiesList[4].propertieValue !== '') {
          try {
            await this.utils.getPidCurrentProcess(this.srcGlobal[1].staticPropertiesList[2].propertieValue);
          } catch (error) { pid = '--'; let err; err = error; }
        }
      }
    }, 3000);
  }

  private inicializaEmissores() {
    Emissor.srcGlobal.subscribe(data => {
      this.srcGlobal = data;
      console.log(this.srcGlobal);
      try {
        this.dependencesList = JSON.parse(this.srcGlobal[0].staticPropertiesList[6].propertieValue);
      } catch (e) {
        this.dependencesList = [];
      }
      console.log(this.dependencesList);
    });

    Emissor.currentTab.subscribe(data => {
      this.currentTab = data;
      setTimeout(() => {
        this.database.getSrc();
      }, 60);
    });

    Emissor.pidProcessoAtual.subscribe(
      data => this.srcGlobal[0].staticPropertiesList[5].propertieValue = data
    );
  }
}
