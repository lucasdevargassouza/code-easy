import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CONSTS {
  constructor() {}

  public static homeCollums = {
    widthColLeft: "widthColLeft",
    widthColRight: "widthColRight",
  };

  public static applicationResources = {
    srcLocal: "srcLocal",
    srcPadrao: [
      {
        "itemName": "Models",
        "isHaveChild": true,
        "itemList": [
          {
            "itemName": "Nome do modelo",
            "itemDescription": "",
            "isHaveChild": false,
            "itemList": [
              {
                "itemName": "Nome atributo",
                "isHaveChild": false,
                "itemProperties": {
                  "type": "string",
                  "required": true,
                  "unique": true,
                  "defaultValue": true
                }
              }
            ]
          }
        ]
      },
      {
        "itemName": "Controllers",
        "itemDescription": "",
        "isHaveChild": true,
        "itemList": [
          {
            "itemName": "Nome da controler",
            "isHaveChild": false,
            "content": ""
          }
        ]
      },
      {
        "itemName": "Repository",
        "itemDescription": "",
        "isHaveChild": true,
        "itemList": [
          {
            "itemName": "Nome do repositório",
            "isHaveChild": false,
            "content": ""
          }
        ]
      },
      {
        "itemName": "Routers",
        "itemDescription": "",
        "isHaveChild": true,
        "itemList": [
          {
            "itemName": "Nome da rota",
            "isHaveChild": false,
            "controllerMethodo": "",
            "content": ""
          }
        ]
      },
      {
        "itemName": "Services",
        "itemDescription": "",
        "isHaveChild": true,
        "itemList": [
          {
            "itemName": "Nome do service",
            "isHaveChild": false,
            "content": ""
          }
        ]
      }
    ],
  
  };
}
