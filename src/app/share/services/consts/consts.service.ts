import { Injectable } from '@angular/core';
import { ResourcesTreeInterface } from '../resources-tree.interface';

@Injectable({
  providedIn: 'root'
})
export class CONSTS {
  constructor() { }

  public static homeCollums = {
    widthColLeft: 'widthColLeft',
    widthColRight: 'widthColRight',
  };

  private static srcPadrao: ResourcesTreeInterface[] = [
    {
      'isHaveChild': false,
      'isSelected': false,
      'indexPath': [],
      'staticPropertiesList': [
        {
          'propertieName': 'Nome: ',
          'propertiePlaceholder': 'Um nome aqui...',
          'propertieValue': 'Servidor'
        },
        {
          'propertieName': 'Descrição: ',
          'propertiePlaceholder': 'Uma descrição aqui...',
          'propertieValue': ''
        },
        {
          'propertieName': 'Porta: ',
          'propertiePlaceholder': 'A porta do servidor...',
          'propertieValue': '3000'
        },
        {
          'propertieName': 'Achar porta livre: ',
          'propertiePlaceholder': '\'True\' ou \'False\'',
          'propertieValue': 'False'
        }
      ],
      'propertiesList': [
        {
          'propertieName': '',
          'propertieValue': ''
        }
      ],
      'itemList': []
    },
    {
      'isHaveChild': true,
      'isSelected': false,
      'indexPath': [],
      'staticPropertiesList': [
        {
          'propertieName': 'Nome: ',
          'propertiePlaceholder': 'Um nome aqui...',
          'propertieValue': 'Routers'
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
      'itemList': [
        {
          'isHaveChild': false,
          'isSelected': false,
          'indexPath': [],
          'staticPropertiesList': [
            {
              'propertieName': 'Nome: ',
              'propertiePlaceholder': 'Um nome aqui...',
              'propertieValue': 'Nome da rota'
            },
            {
              'propertieName': 'Descrição: ',
              'propertiePlaceholder': 'Uma descrição aqui...',
              'propertieValue': ''
            },
            {
              'propertieName': 'Caminho: ',
              'propertiePlaceholder': 'Ex: \"/produtos\"',
              'propertieValue': ''
            },
            {
              'propertieName': 'Metodo: ',
              'propertiePlaceholder': 'Ação que será executada...',
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
        }
      ]
    },
    {
      'isHaveChild': true,
      'isSelected': false,
      'indexPath': [],
      'staticPropertiesList': [
        {
          'propertieName': 'Nome: ',
          'propertiePlaceholder': 'Um nome aqui...',
          'propertieValue': 'Models'
        },
        {
          'propertieName': 'Descrição: ',
          'propertiePlaceholder': 'Uma descrição aqui...',
          'propertieValue': ''
        }
      ],
      'propertiesList': [
        {
          'propertieName': 'Nome: ',
          'propertieValue': ''
        }
      ],
      'itemList': [
        {
          'isHaveChild': false,
          'isSelected': false,
          'indexPath': [],
          'staticPropertiesList': [
            {
              'propertieName': 'Nome: ',
              'propertiePlaceholder': 'Um nome aqui...',
              'propertieValue': 'Nome do modelo'
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
        }
      ]
    },
    {
      'isHaveChild': true,
      'isSelected': false,
      'indexPath': [],
      'staticPropertiesList': [
        {
          'propertieName': 'Nome: ',
          'propertiePlaceholder': 'Um nome aqui...',
          'propertieValue': 'Controllers'
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
      'itemList': [
        {
          'isHaveChild': false,
          'isSelected': false,
          'indexPath': [],
          'staticPropertiesList': [
            {
              'propertieName': 'Nome: ',
              'propertiePlaceholder': 'Um nome aqui...',
              'propertieValue': 'Nome da controler'
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
        }
      ]
    },
    {
      'isHaveChild': true,
      'isSelected': false,
      'indexPath': [],
      'staticPropertiesList': [
        {
          'propertieName': 'Nome: ',
          'propertiePlaceholder': 'Um nome aqui...',
          'propertieValue': 'Repository'
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
      'itemList': [
        {
          'isHaveChild': false,
          'isSelected': false,
          'indexPath': [],
          'staticPropertiesList': [
            {
              'propertieName': 'Nome: ',
              'propertiePlaceholder': 'Um nome aqui...',
              'propertieValue': 'Nome do repositório'
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
        }
      ]
    },
    {
      'isHaveChild': true,
      'isSelected': false,
      'indexPath': [],
      'staticPropertiesList': [
        {
          'propertieName': 'Nome: ',
          'propertiePlaceholder': 'Um nome aqui...',
          'propertieValue': 'Services'
        },
        {
          'propertieName': 'Descrição: ',
          'propertiePlaceholder': 'Uma descrição aqui...',
          'propertieValue': ''
        }
      ],
      'propertiesList': [
        {
          'propertieName': 'Nome: ',
          'propertieValue': ''
        }
      ],
      'itemList': [
        {
          'isHaveChild': false,
          'isSelected': false,
          'indexPath': [],
          'staticPropertiesList': [
            {
              'propertieName': 'Nome: ',
              'propertiePlaceholder': 'Um nome aqui...',
              'propertieValue': 'Nome do service'
            },
            {
              'propertieName': 'Descrição: ',
              'propertiePlaceholder': 'Uma descrição aqui...',
              'propertieValue': ''
            }
          ],
          'propertiesList': [
            {
              'propertieName': 'Nome: ',
              'propertieValue': ''
            }
          ],
          'itemList': []
        }
      ]
    }
  ];

  public static appResources = {
    srcLocal: 'srcLocal',
    srcPadrao: CONSTS.srcPadrao,
  };

}
