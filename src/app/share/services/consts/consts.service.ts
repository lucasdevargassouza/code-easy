import { Injectable } from '@angular/core';
import { ResourcesTreeInterface } from '../resources-tree.interface';

@Injectable({
  providedIn: 'root'
})
export class CONSTS {
  constructor() {}

  public static homeCollums = {
    widthColLeft: 'widthColLeft',
    widthColRight: 'widthColRight'
  };

  public static tiposItens = {
    appConfig: 'appConfig',
    pasta: 'pasta',
    servidor: 'servidor',
    rota: 'rota',
    model: 'model',
    controller: 'controller',
    repository: 'repository',
    services: 'services'
  };

  private static srcPadrao: ResourcesTreeInterface[] = [
    {
      isHaveChild: false,
      isSelected: false,
      indexPath: [],
      tipoItem: CONSTS.tiposItens.appConfig,
      staticPropertiesList: [
        {
          propertieName: 'Nome do projeto: ',
          propertiePlaceholder: 'Um nome aqui...',
          propertieValue: 'MinhaAPINode'
        },
        {
          propertieName: 'Descrição: ',
          propertiePlaceholder: 'Uma descrição aqui...',
          propertieValue: ''
        },
        {
          propertieName: 'Autor: ',
          propertiePlaceholder: 'Nome do autor...',
          propertieValue: 'Code Easy'
        },
        {
          propertieName: 'Versão: ',
          propertiePlaceholder: 'Ex: \'1.0.0\'',
          propertieValue: '1.0.0'
        },
        {
          propertieName: 'Caminho: ',
          propertiePlaceholder: 'Ex: \'/home/user\'',
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
    },
    {
      isHaveChild: false,
      isSelected: false,
      indexPath: [],
      tipoItem: CONSTS.tiposItens.servidor,
      staticPropertiesList: [
        {
          propertieName: 'Nome: ',
          propertiePlaceholder: 'Um nome aqui...',
          propertieValue: 'Servidor'
        },
        {
          propertieName: 'Descrição: ',
          propertiePlaceholder: 'Uma descrição aqui...',
          propertieValue: ''
        },
        {
          propertieName: 'Porta: ',
          propertiePlaceholder: 'A porta do servidor...',
          propertieValue: '3000'
        },
        {
          propertieName: 'Achar porta livre: ',
          propertiePlaceholder: '\'True\' ou \'False\'',
          propertieValue: 'False'
        }
      ],
      propertiesList: [
        {
          propertieName: '',
          propertieValue: ''
        }
      ],
      itemList: []
    },
    {
      isHaveChild: true,
      isSelected: false,
      indexPath: [],
      tipoItem: CONSTS.tiposItens.pasta,
      staticPropertiesList: [
        {
          propertieName: 'Nome: ',
          propertiePlaceholder: 'Um nome aqui...',
          propertieValue: 'Routers'
        },
        {
          propertieName: 'Descrição: ',
          propertiePlaceholder: 'Uma descrição aqui...',
          propertieValue: ''
        }
      ],
      propertiesList: [
        {
          propertieName: '',
          propertieValue: ''
        }
      ],
      itemList: [
        {
          isHaveChild: false,
          isSelected: false,
          indexPath: [],
          tipoItem: CONSTS.tiposItens.rota,
          staticPropertiesList: [
            {
              propertieName: 'Nome: ',
              propertiePlaceholder: 'Um nome aqui...',
              propertieValue: 'NomeRota'
            },
            {
              propertieName: 'Descrição: ',
              propertiePlaceholder: 'Uma descrição aqui...',
              propertieValue: ''
            },
            {
              propertieName: 'Requisição: ',
              propertiePlaceholder: '\'get\', \'post\', \'delete\', \'put\'...',
              propertieValue: ''
            },
            {
              propertieName: 'Caminho: ',
              propertiePlaceholder: 'Ex: "/produtos"',
              propertieValue: ''
            },
            {
              propertieName: 'Retorno: ',
              propertiePlaceholder: 'Tudo que será retornado...',
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
        }
      ]
    },
    {
      isHaveChild: true,
      isSelected: false,
      indexPath: [],
      tipoItem: CONSTS.tiposItens.pasta,
      staticPropertiesList: [
        {
          propertieName: 'Nome: ',
          propertiePlaceholder: 'Um nome aqui...',
          propertieValue: 'Models'
        },
        {
          propertieName: 'Descrição: ',
          propertiePlaceholder: 'Uma descrição aqui...',
          propertieValue: ''
        }
      ],
      propertiesList: [
        {
          propertieName: 'Nome: ',
          propertieValue: ''
        }
      ],
      itemList: [
        {
          isHaveChild: false,
          isSelected: false,
          indexPath: [],
          tipoItem: CONSTS.tiposItens.model,
          staticPropertiesList: [
            {
              propertieName: 'Nome: ',
              propertiePlaceholder: 'Um nome aqui...',
              propertieValue: 'NomeModelo'
            },
            {
              propertieName: 'Descrição: ',
              propertiePlaceholder: 'Uma descrição aqui...',
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
        }
      ]
    },
    {
      isHaveChild: true,
      isSelected: false,
      indexPath: [],
      tipoItem: CONSTS.tiposItens.pasta,
      staticPropertiesList: [
        {
          propertieName: 'Nome: ',
          propertiePlaceholder: 'Um nome aqui...',
          propertieValue: 'Controllers'
        },
        {
          propertieName: 'Descrição: ',
          propertiePlaceholder: 'Uma descrição aqui...',
          propertieValue: ''
        }
      ],
      propertiesList: [
        {
          propertieName: '',
          propertieValue: ''
        }
      ],
      itemList: [
        {
          isHaveChild: false,
          isSelected: false,
          indexPath: [],
          tipoItem: CONSTS.tiposItens.controller,
          staticPropertiesList: [
            {
              propertieName: 'Nome: ',
              propertiePlaceholder: 'Um nome aqui...',
              propertieValue: 'NomeControler'
            },
            {
              propertieName: 'Descrição: ',
              propertiePlaceholder: 'Uma descrição aqui...',
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
        }
      ]
    },
    {
      isHaveChild: true,
      isSelected: false,
      indexPath: [],
      tipoItem: CONSTS.tiposItens.pasta,
      staticPropertiesList: [
        {
          propertieName: 'Nome: ',
          propertiePlaceholder: 'Um nome aqui...',
          propertieValue: 'Repository'
        },
        {
          propertieName: 'Descrição: ',
          propertiePlaceholder: 'Uma descrição aqui...',
          propertieValue: ''
        }
      ],
      propertiesList: [
        {
          propertieName: '',
          propertieValue: ''
        }
      ],
      itemList: [
        {
          isHaveChild: false,
          isSelected: false,
          indexPath: [],
          tipoItem: CONSTS.tiposItens.repository,
          staticPropertiesList: [
            {
              propertieName: 'Nome: ',
              propertiePlaceholder: 'Um nome aqui...',
              propertieValue: 'NomeRepositorio'
            },
            {
              propertieName: 'Descrição: ',
              propertiePlaceholder: 'Uma descrição aqui...',
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
        }
      ]
    },
    {
      isHaveChild: true,
      isSelected: false,
      indexPath: [],
      tipoItem: CONSTS.tiposItens.pasta,
      staticPropertiesList: [
        {
          propertieName: 'Nome: ',
          propertiePlaceholder: 'Um nome aqui...',
          propertieValue: 'Services'
        },
        {
          propertieName: 'Descrição: ',
          propertiePlaceholder: 'Uma descrição aqui...',
          propertieValue: ''
        }
      ],
      propertiesList: [
        {
          propertieName: 'Nome: ',
          propertieValue: ''
        }
      ],
      itemList: [
        {
          isHaveChild: false,
          isSelected: false,
          indexPath: [],
          tipoItem: CONSTS.tiposItens.services,
          staticPropertiesList: [
            {
              propertieName: 'Nome: ',
              propertiePlaceholder: 'Um nome aqui...',
              propertieValue: 'NomeService'
            },
            {
              propertieName: 'Descrição: ',
              propertiePlaceholder: 'Uma descrição aqui...',
              propertieValue: ''
            }
          ],
          propertiesList: [
            {
              propertieName: 'Nome: ',
              propertieValue: ''
            }
          ],
          itemList: []
        }
      ]
    }
  ];

  public static appResources = {
    srcLocal: 'srcLocal',
    srcPadrao: CONSTS.srcPadrao
  };
}
