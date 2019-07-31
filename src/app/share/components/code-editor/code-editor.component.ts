import { Component, OnInit } from '@angular/core';
import { Emissor } from '../../services/emissor-eventos/emissor-eventos.service';
import { ResourcesTreeInterface } from '../../services/resources-tree.interface';
import { DatabaseStorageService } from '../../services/database-storage/database-storage.service';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit {
  public codeIndex: number;

  public srcGlobal: ResourcesTreeInterface[];
  public srcLocal: ResourcesTreeInterface;

  constructor(
    private database: DatabaseStorageService
  ) { }

  ngOnInit() {
    this.inicializaEmissores();

  
  }

  // Em cada change salva os dados.
  public inputsOnChange() {
    setTimeout(() => {
      this.database.updateSrc();
    }, 100);
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

        this.codeIndex = undefined;

        for (let index = 0; index < this.srcLocal.staticPropertiesList.length; index++) {
          if (this.srcLocal.staticPropertiesList[index].propertieType === 'code') {
            this.codeIndex = index;
          }
        }

      },
      error => console.log(error)
    );
  }
}
