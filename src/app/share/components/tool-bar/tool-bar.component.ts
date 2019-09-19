import { Component, OnInit } from '@angular/core';
import { ResourcesTreeInterface } from '../../interfaces/resources-tree.interface';
import { Emissor } from '../../services/emissor-eventos/emissor-eventos.service';
import { StatusBar, TypeOfStatus, ColorsOfStatus } from '../../interfaces/status-bar';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {
  public srcGlobal: ResourcesTreeInterface[];
  public currentStatus: StatusBar;

  constructor() { }

  ngOnInit() {
    this.inicializaEmissores();
  }

  public changeCurrentTab(value: string) {
    Emissor.currentTab.emit(value);
  }

  private inicializaEmissores() {

    this.currentStatus = {
      status: TypeOfStatus.OutroStatus,
      message: '',
      color: ColorsOfStatus.OutroStatus,
      isShowLoadingBar: false
    };

    Emissor.srcGlobal.subscribe(data => this.srcGlobal = data);

    Emissor.currentStatus.subscribe(
      (data: StatusBar) => {
        this.currentStatus = data;
      },
      error => {
        console.log(error);
        this.currentStatus = {
          status: TypeOfStatus.OutroStatus,
          message: '',
          color: ColorsOfStatus.OutroStatus,
          isShowLoadingBar: false
        };
      }
    );
  }
}
