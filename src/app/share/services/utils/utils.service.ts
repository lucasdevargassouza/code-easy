import { Injectable } from '@angular/core';
import { ResourcesTreeInterface } from '../../interfaces/resources-tree.interface';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
  ) { }

  /**
   * Serve para inicializar o indexPath de cada elemento passado.
   *
   *
   * @param src ResourcesTreeInterface[] Basicamento todo o código do projeto atual.
   * @param indexPath number[] Opcional, serve para verificar se já não existe um path, evitando gerar outro.
   *
   * @returns ResourcesTreeInterface[] Retorna todo que foi passado por parâmetro, mas com os indexPaths atualizados.
   */
  public initIndexPath(src: ResourcesTreeInterface[], indexPath?: number[]): ResourcesTreeInterface[] {

    for (let index = 0; index < src.length; index++) {

      src[index].indexPath.splice(0, src[index].indexPath.length);

      if (indexPath !== null && indexPath !== undefined) {
        indexPath.forEach(i => {
          src[index].indexPath.push(i);
        });
      }
      src[index].indexPath.push(index);

      if (src[index].itemList.length > 0) {
        src[index].itemList = this.initIndexPath(src[index].itemList, src[index].indexPath);
      }
    }
    return src;
  }

  public initSugestions(src: ResourcesTreeInterface[]): ResourcesTreeInterface[] {

    src[2].itemList.forEach(rota => {
      rota.staticPropertiesList[4].propertieSugestions = [];
    });
    src[3].itemList.forEach((controller, index) => {
      src[2].itemList.forEach(rota => {
        rota.staticPropertiesList[4].propertieSugestions.push({
            'sugestionsName': controller.staticPropertiesList[0].propertieValue,
            'sugestionsValue': index.toString()
        });
      });
    });

    return src;
  }
}
