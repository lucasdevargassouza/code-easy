import { Component, OnInit, Input } from '@angular/core';

import { ResourcesTreeInterface } from '../../services/resources-tree.interface';
import { Emissor } from '../../services/emissor-eventos/emissor-eventos.service';

@Component({
  selector: 'app-resources-tree',
  templateUrl: './resources-tree.component.html',
  styleUrls: ['./resources-tree.component.scss']
})
export class ResourcesTreeComponent implements OnInit {

  @Input() objeto: ResourcesTreeInterface;

  constructor() { }

  ngOnInit() {
    if (this.objeto === undefined) {
      this.objeto = {
        isHaveChild: false,
        isSelected: false,
        indexPath: [],
        staticPropertiesList: [
          {
            propertieName: '',
            propertiePlaceholder: '',
            propertieValue: ''
          }
        ],
        propertiesList: [
          {
            propertieName: '',
            propertieValue: ''
          }
        ],
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

}
