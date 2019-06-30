import { Component, OnInit, Input } from '@angular/core';

import { ResourcesTreeInterface } from '../../services/resources-tree.interface';
import { Emissor } from '../../services/emissor-eventos/emissor-eventos.service';
import { DatabaseStorageService } from '../../services/database-storage/database-storage.service';
import { CONSTS } from '../../services/consts/consts.service';

@Component({
  selector: 'app-resources-tree',
  templateUrl: './resources-tree.component.html',
  styleUrls: ['./resources-tree.component.scss']
})
export class ResourcesTreeComponent implements OnInit {
  @Input() objeto: ResourcesTreeInterface;

  constructor(private database: DatabaseStorageService) {}

  ngOnInit() {
    if (this.objeto === undefined) {
      this.objeto = {
        isHaveChild: false,
        isSelected: false,
        indexPath: [],
        tipoItem: '',
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

  public addItem(tipoItem: string) {
    switch (tipoItem) {
      case CONSTS.tiposItens.pasta:
        this.objeto.itemList.push({
          isHaveChild: false,
          isSelected: false,
          indexPath: [],
          tipoItem: CONSTS.tiposItens.pasta,
          staticPropertiesList: [
            {
              propertieName: 'Nome: ',
              propertieType: 'text',
              propertieSugestions: [],
              propertiePlaceholder: 'Um nome aqui...',
              propertieValue: 'Nome da ' + CONSTS.tiposItens.pasta
            },
            {
              propertieName: 'Descrição: ',
              propertieType: 'text',
              propertieSugestions: [],
              propertiePlaceholder: 'Uma descrição aqui...',
              propertieValue: ''
            }
          ],
          propertiesList: [],
          itemList: []
        });
        break;
      case CONSTS.tiposItens.rota:
        this.objeto.itemList.push({
          isHaveChild: false,
          isSelected: false,
          indexPath: [],
          tipoItem: CONSTS.tiposItens.rota,
          staticPropertiesList: [
            {
              propertieName: 'Nome: ',
              propertieType: 'text',
              propertieSugestions: [],
              propertiePlaceholder: 'Um nome aqui...',
              propertieValue: 'Nome' + CONSTS.tiposItens.rota
            },
            {
              propertieName: 'Descrição: ',
              propertieType: 'text',
              propertieSugestions: [],
              propertiePlaceholder: 'Uma descrição aqui...',
              propertieValue: ''
            },
            {
              propertieName: 'Requisição: ',
              propertieType: 'select',
              propertieSugestions: [
                {
                  sugestionsName: 'get',
                  sugestionsValue: 'get'
                },
                {
                  sugestionsName: 'post',
                  sugestionsValue: 'post'
                },
                {
                  sugestionsName: 'put',
                  sugestionsValue: 'put'
                },
                {
                  sugestionsName: 'delete',
                  sugestionsValue: 'delete'
                },
              ],
              propertiePlaceholder: '\'get\', \'post\', \'delete\', \'put\'...',
              propertieValue: ''
            },
            {
              propertieName: 'Url: ',
              propertieType: 'text',
              propertieSugestions: [],
              propertiePlaceholder: 'Ex: "/produtos"',
              propertieValue: ''
            },
            {
              propertieName: 'Retorno: ',
              propertieType: 'text',
              propertieSugestions: [],
              propertiePlaceholder: 'Tudo que será retornado...',
              propertieValue: ''
            }
          ],
          propertiesList: [
            {
              propertieName: '',
              propertieType: 'text',
              propertieSugestions: [],
              propertieValue: ''
            }
          ],
          itemList: []
        });
        break;
      case CONSTS.tiposItens.model:
        this.objeto.itemList.push({
          isHaveChild: false,
          isSelected: false,
          indexPath: [],
          tipoItem: CONSTS.tiposItens.model,
          staticPropertiesList: [
            {
              propertieName: 'Nome: ',
              propertieType: 'text',
              propertieSugestions: [],
              propertiePlaceholder: 'Um nome aqui...',
              propertieValue: 'Nome' + CONSTS.tiposItens.model
            },
            {
              propertieName: 'Descrição: ',
              propertieType: 'text',
              propertieSugestions: [],
              propertiePlaceholder: 'Uma descrição aqui...',
              propertieValue: ''
            }
          ],
          propertiesList: [
            {
              propertieName: '',
              propertieType: 'text',
              propertieSugestions: [],
              propertieValue: ''
            }
          ],
          itemList: []
        });
        break;
      case CONSTS.tiposItens.controller:
        this.objeto.itemList.push({
          isHaveChild: false,
          isSelected: false,
          indexPath: [],
          tipoItem: CONSTS.tiposItens.controller,
          staticPropertiesList: [
            {
              propertieName: 'Nome: ',
              propertieType: 'text',
              propertieSugestions: [],
              propertiePlaceholder: 'Um nome aqui...',
              propertieValue: 'Nome' + CONSTS.tiposItens.controller
            },
            {
              propertieName: 'Descrição: ',
              propertieType: 'text',
              propertieSugestions: [],
              propertiePlaceholder: 'Uma descrição aqui...',
              propertieValue: ''
            }
          ],
          propertiesList: [
            {
              propertieName: '',
              propertieType: 'text',
              propertieSugestions: [],
              propertieValue: ''
            }
          ],
          itemList: []
        });
        break;
      case CONSTS.tiposItens.repository:
        this.objeto.itemList.push({
          isHaveChild: false,
          isSelected: false,
          indexPath: [],
          tipoItem: CONSTS.tiposItens.repository,
          staticPropertiesList: [
            {
              propertieName: 'Nome: ',
              propertieType: 'text',
              propertieSugestions: [],
              propertiePlaceholder: 'Um nome aqui...',
              propertieValue: 'Nome' + CONSTS.tiposItens.repository
            },
            {
              propertieName: 'Descrição: ',
              propertieType: 'text',
              propertieSugestions: [],
              propertiePlaceholder: 'Uma descrição aqui...',
              propertieValue: ''
            }
          ],
          propertiesList: [
            {
              propertieName: '',
              propertieType: 'text',
              propertieSugestions: [],
              propertieValue: ''
            }
          ],
          itemList: []
        });
        break;
      case CONSTS.tiposItens.services:
        this.objeto.itemList.push({
          isHaveChild: false,
          isSelected: false,
          indexPath: [],
          tipoItem: CONSTS.tiposItens.services,
          staticPropertiesList: [
            {
              propertieName: 'Nome: ',
              propertieType: 'text',
              propertieSugestions: [],
              propertiePlaceholder: 'Um nome aqui...',
              propertieValue: 'Nome' + CONSTS.tiposItens.services
            },
            {
              propertieName: 'Descrição: ',
              propertieType: 'text',
              propertieSugestions: [],
              propertiePlaceholder: 'Uma descrição aqui...',
              propertieValue: ''
            }
          ],
          propertiesList: [
            {
              propertieName: '',
              propertieType: 'text',
              propertieSugestions: [],
              propertieValue: ''
            }
          ],
          itemList: []
        });
        break;
      default:
        break;
    }

    this.database.updateSrc();
  }

  public removeItem(teste: number) {
    // this.objeto.itemList.splice()

    this.database.updateSrc();
  }
}
