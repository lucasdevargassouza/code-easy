import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Emissor } from '../../services/emissor-eventos/emissor-eventos.service';
import { ResourcesTreeInterface } from '../../services/resources-tree.interface';
import { DatabaseStorageService } from '../../services/database-storage/database-storage.service';
import { CONSTS } from '../../services/consts/consts.service';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit {
  public srcGlobal: ResourcesTreeInterface[];
  public srcLocal: ResourcesTreeInterface;
  public flowCodeIndexInScrLocal: number;
  public flowCode: [];

  @Input() private toolList: [];

  constructor(
    private database: DatabaseStorageService,


  ) { }

  ngOnInit() {
    this.inicializaEmissores();
  }

  public drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    if (event.previousContainer.id === event.container.id) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    Emissor.listTools.emit(CONSTS.tipoOfTools);

    // Atualiza onde os itens estão salvos!
    this.srcLocal.staticPropertiesList[this.flowCodeIndexInScrLocal].propertieValue = JSON.stringify(this.flowCode);

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

        this.srcLocal = await this.getItemAEditar(data);

        for (let index = 0; index < this.srcLocal.staticPropertiesList.length; index++) {
          if (this.srcLocal.staticPropertiesList[index].propertieType === 'code') {
            console.log(this.srcLocal.staticPropertiesList[index].propertieValue);
            this.flowCodeIndexInScrLocal = index;
            this.flowCode = JSON.parse(this.srcLocal.staticPropertiesList[index].propertieValue);
            console.log(this.flowCode);
          }
        }

      },
      error => console.log(error)
    );
  }
}
