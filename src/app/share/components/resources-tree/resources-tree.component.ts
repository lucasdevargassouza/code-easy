import { Component, OnInit, Input } from '@angular/core';

import { ResourcesTreeInterface } from '../../services/resources-tree.interface';
import { Emissor } from '../../services/emissor-eventos/emissor-eventos.service';
import { DatabaseStorageService } from '../../services/database-storage/database-storage.service';

@Component({
  selector: 'app-resources-tree',
  templateUrl: './resources-tree.component.html',
  styleUrls: ['./resources-tree.component.scss']
})
export class ResourcesTreeComponent implements OnInit {

  @Input() objeto: ResourcesTreeInterface;

  constructor(
    private database: DatabaseStorageService
  ) { }

  ngOnInit() {
    if (this.objeto === undefined) {
      this.objeto = {
        isHaveChild: false,
        isSelected: false,
        indexPath: [],
        staticPropertiesList: [],
        propertiesList: [],
        itemList: []
      };
    }
  }

  public toggleContent() {
    this.objeto.isSelected = !this.objeto.isSelected;
  }

  public emiteCaminho() {
    Emissor.itemSelectedLocation.emit(this.objeto.indexPath);
  }

  public addItem() {
    this.objeto.itemList.push({
        'isHaveChild': false,
        'isSelected': false,
        'indexPath': [],
        'staticPropertiesList': [
          {
            'propertieName': 'Nome: ',
            'propertiePlaceholder': 'Um nome aqui...',
            'propertieValue': 'Nome do item'
          },
          {
            'propertieName': 'Descrição: ',
            'propertiePlaceholder': 'Uma descrição aqui...',
            'propertieValue': ''
          }
        ],
        'propertiesList': [
          {
            'propertieName': '',
            'propertieValue': ''
          }
        ],
        'itemList': []
    });

    this.database.updateSrc();
  }

  public removeItem(teste: number) {
    // this.objeto.itemList.splice()

    this.database.updateSrc();
  }

}
