import { Component, OnInit, Input } from '@angular/core';
import { Emissor } from '../../services/emissor-eventos/emissor-eventos.service';
import { ResourcesTreeInterface } from '../../services/resources-tree.interface';
import { CONSTS } from '../../services/consts/consts.service';
import { DatabaseStorageService } from '../../services/database-storage/database-storage.service';
import { TranspilerService } from '../../services/transpiler/transpiler.service';
import { UtilsService } from '../../services/utils/utils.service';


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
  public srcLocal: ResourcesTreeInterface;
  private srcGlobal: ResourcesTreeInterface[];

  constructor(
    private database: DatabaseStorageService,

  ) { }

  ngOnInit() {
    this.inicializaEmissores();
  }

  // Remove uma nova propriedade extendida no item.
  public removeExtendedPropertie(index: number) {
    this.srcLocal.propertiesList.splice(index, 1);
    this.database.updateSrc();
  }

  // Adiciona uma nova propriedade extendida no item.
  public addExtendedPropertie() {
    this.srcLocal.propertiesList.push(
      {
        'propertieName': '',
        'propertieType': '',
        'propertieSugestions': [
          {
            'sugestionsName': '',
            'sugestionsValue': ''
          }
        ],
        'propertieValue': ''
      }
    );
    this.database.updateSrc();
  }

  // Em cada change salva os dados.
  public inputsOnChange() {
    /* this.srcLocal.staticPropertiesList[0].propertieValue.replace(' ', ''); */
    setTimeout(() => {
      this.database.updateSrc();
    }, 1);
  }

  // Sempre retorna o item que deve ser editado.
  private getItemAEditar(itemAtual: []) {
    let itemCurrent: any = this.srcGlobal;
    if (itemAtual.length > 0) {
      for (let i = 0; itemAtual.length > i; i++) {
        if (i > 0) {
          itemCurrent = itemCurrent.itemList[itemAtual[i]];
        } else {
          itemCurrent = itemCurrent[itemAtual[i]];
        }
      }
    }
    return itemCurrent;
  }

  // Inicializa os amissores que recebem os dados.
  private inicializaEmissores() {
    Emissor.srcGlobal.subscribe(
      data => {
        this.srcGlobal = data;
      },
      error => console.log(error)
      );

      Emissor.itemSelectedLocation.subscribe(
        async data => {
        console.log(data);
          this.srcLocal = await this.getItemAEditar(data);
          /* console.log(await this.traspiler.getContentRotas(this.srcGlobal));
          console.log(await this.traspiler.getContentServidor(this.srcGlobal));
          console.log(await this.traspiler.getPackageJson(this.srcGlobal)); */
      },
      error => console.log(error)
    );
  }

}
