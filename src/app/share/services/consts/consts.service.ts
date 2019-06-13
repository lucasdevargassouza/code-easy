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
        'itemList': [
          {
            'itemName': 'Nome do modelo',
            'itemDescription': '',
            'isHaveChild': false,
            'isSelected': false,
            'indexPath': [0, 0],
            'itemList': [
              {
                'itemName': 'Nome atributo',
                'isHaveChild': false,
                'isSelected': false,
                'indexPath': [0, 0, 0],
                'itemProperties': {
                  'type': 'string',
                  'required': true,
                  'unique': true,
                  'defaultValue': true
                }
              }
            ]
          }
        ]
      },
      {
        'itemName': 'Controllers',
        'itemDescription': '',
        'isHaveChild': true,
        'isSelected': false,
        'indexPath': [1],
        'itemList': [
          {
            'itemName': 'Nome da controler',
            'isHaveChild': false,
            'isSelected': false,
            'indexPath': [1, 0],
            'content': ''
          }
        ]
      },
      {
        'itemName': 'Repository',
        'itemDescription': '',
        'isHaveChild': true,
        'isSelected': false,
        'indexPath': [2],
        'itemList': [
          {
            'itemName': 'Nome do repositório',
            'isHaveChild': false,
            'isSelected': false,
            'indexPath': [2, 0],
            'content': ''
          }
        ]
      },
      {
        'itemName': 'Routers',
        'itemDescription': '',
        'isHaveChild': true,
        'isSelected': false,
        'indexPath': [3],
        'itemList': [
          {
            'itemName': 'Nome da rota',
            'isHaveChild': false,
            'isSelected': false,
            'controllerMethodo': '',
            'indexPath': [3, 0],
            'content': ''
          }
        ]
      },
      {
        'itemName': 'Services',
        'itemDescription': '',
        'isHaveChild': true,
        'isSelected': false,
        'indexPath': [4],
        'itemList': [
          {
            'itemName': 'Nome do service',
            'isHaveChild': false,
            'isSelected': false,
            'indexPath': [4, 0],
            'content': ''
          }
        ]
      }
    ],

  };

}
