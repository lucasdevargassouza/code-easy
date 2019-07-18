import { Component, OnInit } from '@angular/core';
import { ResourcesTreeInterface } from '../../services/resources-tree.interface';
import { CurrentStatus } from '../../services/emissor-eventos/interfaces.interface';
import { Emissor } from '../../services/emissor-eventos/emissor-eventos.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {
  public srcGlobal: ResourcesTreeInterface[];
  public currentStatus: CurrentStatus;

  constructor() { }

  ngOnInit() {
    this.inicializaEmissores();
  }

  public changeCurrentTab(value: string) {
    Emissor.currentTab.emit(value);
  }

  private inicializaEmissores() {

    this.currentStatus = {
      message: '',
      color: '',
      isShowLoadingBar: false
    };

    Emissor.srcGlobal.subscribe(data => this.srcGlobal = data);

    Emissor.currentStatus.subscribe(
      (data: CurrentStatus) => {
        this.currentStatus = data;
      },
      error => {
        console.log(error);
        this.currentStatus = {
          message: '',
          color: '',
          isShowLoadingBar: false
        };
      }
    );
  }
}
