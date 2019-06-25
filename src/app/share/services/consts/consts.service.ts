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

  public static srcPadrao: ResourcesTreeInterface[] = [
    {
      'isHaveChild': false,
      'isSelected': false,
      'indexPath': [0],
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
      'indexPath': [1],
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
          'indexPath': [1, 0],
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
      'itemDescription': '',
      'isHaveChild': true,
      'isSelected': false,
      'indexPath': [2],
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
          'indexPath': [2, 0],
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
          'indexPath': [3, 0],
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
          'indexPath': [4, 0],
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
              'propertieName': '',
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
      'indexPath': [5],
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
          'indexPath': [5, 0],
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
  ];

  public static applicationResources = {
    srcLocal: 'srcLocal',
    srcPadrao: [
      {
        'itemName': 'Servidor',
        'isHaveChild': false,
        'isSelected': false,
        'indexPath': [0],
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
        'itemName': 'Models',
        'isHaveChild': true,
        'isSelected': false,
        'indexPath': [1],
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
            'indexPath': [1, 0],
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
        'itemDescription': '',
        'isHaveChild': true,
        'isSelected': false,
        'indexPath': [2],
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
            'indexPath': [2, 0],
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
            'indexPath': [3, 0],
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
            'indexPath': [4, 0],
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
                'propertieName': '',
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
        'indexPath': [5],
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
            'indexPath': [5, 0],
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
