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
                'propertieValue': 'Models'
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
                    'propertieValue': 'Nome do modelo'
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
                'propertieValue': 'Controllers'
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
                    'propertieValue': 'Nome da controler'
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
                'propertieValue': 'Repository'
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
                    'propertieValue': 'Nome do repositório'
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
                'propertieValue': 'Routers'
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
                    'propertieValue': 'Nome da rota'
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
                'propertieValue': 'Services'
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
                    'propertieValue': 'Nome do service'
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
