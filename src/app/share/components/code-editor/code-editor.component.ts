import { Component, OnInit } from '@angular/core';
import { Emissor } from '../../services/emissor-eventos/emissor-eventos.service';
import { ResourcesTreeInterface } from '../../services/resources-tree.interface';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit {
  public options = {theme: 'vs-dark', language: 'javascript'};
  public code = 'function x() {}';

  public srcGlobal: ResourcesTreeInterface[];
  public srcLocal: ResourcesTreeInterface;

  constructor() { }

  ngOnInit() {
    this.inicializaEmissores();
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

        this.srcLocal.staticPropertiesList.forEach(propertie => {
          if (propertie.propertieType === 'code') {
            this.code = propertie.propertieValue;
          }
        });

      },
      error => console.log(error)
    );
  }
}
