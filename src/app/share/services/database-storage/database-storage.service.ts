import { Injectable } from '@angular/core';
import { Emissor } from '../emissor-eventos/emissor-eventos.service';
import { CONSTS } from '../consts/consts.service';

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

  public updateSrc() {


    this.getSrc();
  }
}
