import { Component, OnInit, Input } from '@angular/core';
import { Emissor } from '../../services/emissor-eventos/emissor-eventos.service';
import { ResourcesTreeInterface } from '../resources-tree/resources-tree.interface';
import { CONSTS } from '../../services/consts/consts.service';


/**
 * Este componente.
 *
 * Conforme o endereço que ele receber por meio de um array de indexs,
 * pegará no local storage as nformações e setará novamente conforme sejam alteradas.
 *
 */

@Component({
  selector: 'app-properties-editor',
  templateUrl: './properties-editor.component.html',
  styleUrls: ['./properties-editor.component.scss']
})
export class PropertiesEditorComponent implements OnInit {
  private srcLocal: ResourcesTreeInterface[];

  constructor() {}

  ngOnInit() {
    Emissor.itemSelectedLocation.subscribe( data => this.mudaItemEditado(data), error => console.log(error));
  }

  private mudaItemEditado(itemAtual: []) {
    console.log(itemAtual);
    this.srcLocal = this.getItemAEditar(itemAtual);
  }

  private getItemAEditar(itemAtual: []) {
    let itemCurrent: any = JSON.parse(localStorage.getItem(CONSTS.applicationResources.srcLocal));
    if (itemAtual.length > 0) {
      for (let i = 0; itemAtual.length > i; i++) {
        if (i > 0) {
          itemCurrent = itemCurrent.itemList[itemAtual[i]];
        } else {
          itemCurrent = itemCurrent[itemAtual[i]];
        }
      }
    }
    console.log(itemCurrent);
    return itemCurrent;
  }
}
