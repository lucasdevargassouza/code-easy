import { Component, OnInit, HostListener } from '@angular/core';

import { Emissor } from '../../share/services/emissor-eventos/emissor-eventos.service';
import { DatabaseStorageService } from '../../share/services/database-storage/database-storage.service';
import { UtilsService } from '../../share/services/utils/utils.service';
import { CONSTS } from '../../share/services/consts/consts.service';
import { ResourcesTreeInterface } from '../../share/services/resources-tree.interface';

const fs = require('fs');


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public srcGlobal = [];

  private oldX = 0;
  private grabberColLeft = false;
  private grabberColRight = false;
  public widthColLeft = 300;
  public widthColRight = 300;
  public currentTab = CONSTS.editorTabs.propriedades;

  constructor(
    private database: DatabaseStorageService,
    private utils: UtilsService,
  ) {}
  
  ngOnInit() {
    this.database.getSrc();

    this.inicializaEmissores();

    this.inicializaPid();
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
  }

  @HostListener('document:mouseup', ['$event'])
  public onMouseUp(event: MouseEvent) {
    this.grabberColLeft = false;
    this.grabberColRight = false;
  }

  //#endregion

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
    });
    Emissor.currentTab.subscribe(data => this.currentTab = data);

    Emissor.pidProcessoAtual.subscribe(
      data => this.srcGlobal[0].staticPropertiesList[5].propertieValue = data
    );
  }
}
