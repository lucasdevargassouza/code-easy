import { Component } from '@angular/core';
import { ElectronService } from './share/services/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';

import { CONSTS } from './share/services/consts/consts.service';
import { ResourcesTreeInterface } from './share/services/resources-tree.interface';
import { UtilsService } from './share/services/utils/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    private router: Router,

  ) {
    // Avisos padrões mostrados no console.>>
    this.translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);
    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
    // Avisos padrões mostrados no console. <<

    this.inicializarVariaveisInternas();
  }

  private inicializarVariaveisInternas() {
    let src = [];

    try {
      src = JSON.parse(localStorage.getItem(CONSTS.appResources.srcLocal));

      if (src === null) {
        // localStorage.setItem(CONSTS.appResources.srcLocal, JSON.stringify(this.utils.initIndexPath(CONSTS.appResources.srcPadrao)));
        // src = JSON.parse(localStorage.getItem(CONSTS.appResources.srcLocal));

        this.router.navigate(['inicio']);
      }

    } catch (e) {
      localStorage.setItem(CONSTS.appResources.srcLocal, JSON.stringify(CONSTS.appResources.srcPadrao));
    }
  }
}
