import { Injectable } from '@angular/core';
import { Emissor } from '../emissor-eventos/emissor-eventos.service';
import { CONSTS } from '../consts/consts.service';
import { ResourcesTreeInterface } from '../../interfaces/resources-tree.interface';
import { UtilsService } from '../utils/utils.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DatabaseStorageService {
  private listaprojetos: ResourcesTreeInterface[][];
  private srcGlobal: ResourcesTreeInterface[];

  constructor(
    private utils: UtilsService,
    private router: Router,

    ) {
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
    return;
  }

  public getListaProjetos(): ResourcesTreeInterface[][] {
    return JSON.parse(localStorage.getItem(CONSTS.appResources.listaProjetos));
  }

  public setListaProjetos(listaProjetos: ResourcesTreeInterface[][]) {
    localStorage.setItem(CONSTS.appResources.listaProjetos, JSON.stringify(listaProjetos));
  }

  public updateSrc() {

    // Salva o srcPadrao
    this.srcGlobal = this.utils.initIndexPath(this.srcGlobal);
    this.srcGlobal = this.utils.initSugestions(this.srcGlobal);

    localStorage.setItem(CONSTS.appResources.srcLocal, JSON.stringify(this.srcGlobal));
    // ---

    // Atualiza a lista de projetos -- Ataliza um projeto que ja existe ou adiciona ele a lista.
    if (localStorage.getItem(CONSTS.appResources.listaProjetos) === null) {
      localStorage.setItem(CONSTS.appResources.listaProjetos, JSON.stringify([ this.srcGlobal ]));
    } else {
      const listaProjetos: ResourcesTreeInterface[][] = JSON.parse(localStorage.getItem(CONSTS.appResources.listaProjetos));
      let atualizouProjeto = false;
      for (let i = 0; i < listaProjetos.length; i++) {
        if (listaProjetos[i][0].staticPropertiesList[0].propertieValue ===  this.srcGlobal[0].staticPropertiesList[0].propertieValue) {
          listaProjetos[i] = this.srcGlobal;
          atualizouProjeto = true;
        }
      }
      if (!atualizouProjeto) {
        listaProjetos.push(this.srcGlobal);
      }
      localStorage.setItem(CONSTS.appResources.listaProjetos, JSON.stringify(listaProjetos));
    }
    // ---

    return;
  }

  public criarSrc(srcGlobal: ResourcesTreeInterface[]) {
    this.srcGlobal = srcGlobal;
    this.updateSrc();
    return;
  }

  public removeSrc() {
    localStorage.setItem(CONSTS.appResources.srcLocal, JSON.stringify(null));
    this.router.navigate(['/inicio']);
    return;
  }
}
