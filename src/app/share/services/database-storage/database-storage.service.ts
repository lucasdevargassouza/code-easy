import { Injectable } from '@angular/core';
import { Emissor } from '../emissor-eventos/emissor-eventos.service';
import { CONSTS } from '../consts/consts.service';
import { ResourcesTreeInterface } from '../resources-tree.interface';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseStorageService {
  private srcGlobal: ResourcesTreeInterface[];

  constructor(private utils: UtilsService) {
    Emissor.srcGlobal.subscribe(
      data => (this.srcGlobal = data),
      error => console.log(error)
    );
    this.getSrc();
  }

  public async getSrc() {
    Emissor.srcGlobal.emit(
      await JSON.parse(localStorage.getItem(CONSTS.appResources.srcLocal))
    );
  }

  public updateSrc() {
    this.srcGlobal = this.utils.initIndexPath(this.srcGlobal);

    localStorage.setItem(CONSTS.appResources.srcLocal, JSON.stringify(this.srcGlobal));
  }
}
