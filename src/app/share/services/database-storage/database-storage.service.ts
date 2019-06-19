import { Injectable } from '@angular/core';
import { Emissor } from '../emissor-eventos/emissor-eventos.service';
import { CONSTS } from '../consts/consts.service';
import { ResourcesTreeInterface } from '../resources-tree.interface';

@Injectable({
  providedIn: 'root'
})
export class DatabaseStorageService {

  constructor() {
    this.getSrc();
  }

  public async getSrc() {
    Emissor.srcGlobal.emit(
      await JSON.parse(localStorage.getItem(CONSTS.applicationResources.srcLocal))
    );
  }

  public updateSrc(srcGlobal: ResourcesTreeInterface[]) {
    localStorage.setItem(CONSTS.applicationResources.srcLocal, JSON.stringify(srcGlobal));
  }
}
