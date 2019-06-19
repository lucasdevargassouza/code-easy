import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CONSTS {
  constructor() {}

  public static homeCollums = {
    widthColLeft: 'widthColLeft',
    widthColRight: 'widthColRight',
  };

  public static applicationResources = {
    srcLocal: 'srcLocal',
    srcPadrao: [
      {
        'itemName': 'Models',
        'isHaveChild': true,
        'isSelected': false,
        'indexPath': [0],
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
            'itemDescription': '',
            'isHaveChild': false,
            'isSelected': false,
            'indexPath': [0, 0],
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
                  'propertieName': 'Nome: ',
                  'propertieValue': ''
              }
            ],
            'itemList': []
          }
        ]
      },
      {
        'itemDescription': '',
        'isHaveChild': true,
        'isSelected': false,
        'indexPath': [1],
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
              'propertieName': 'Nome: ',
              'propertieValue': ''
          }
        ],
        'itemList': [
          {
            'isHaveChild': false,
            'isSelected': false,
            'indexPath': [1, 0],
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
                  'propertieName': 'Nome: ',
                  'propertieValue': ''
              }
            ],
          }
        ]
      },
      {
        'itemDescription': '',
        'isHaveChild': true,
        'isSelected': false,
        'indexPath': [2],
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
              'propertieName': 'Nome: ',
              'propertieValue': ''
          }
        ],
        'itemList': [
          {
            'isHaveChild': false,
            'isSelected': false,
            'indexPath': [2, 0],
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
                  'propertieName': 'Nome: ',
                  'propertieValue': ''
              }
            ],
          }
        ]
      },
      {
        'itemDescription': '',
        'isHaveChild': true,
        'isSelected': false,
        'indexPath': [3],
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
              'propertieName': 'Nome: ',
              'propertieValue': ''
          }
        ],
        'itemList': [
          {
            'isHaveChild': false,
            'isSelected': false,
            'controllerMethodo': '',
            'indexPath': [3, 0],
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
                }
            ],
            'propertiesList': [
              {
                  'propertieName': 'Nome: ',
                  'propertieValue': ''
              }
            ],
          }
        ]
      },
      {
        'itemDescription': '',
        'isHaveChild': true,
        'isSelected': false,
        'indexPath': [4],
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
            'indexPath': [4, 0],
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
          }
        ]
      }
    ],

  };

}
