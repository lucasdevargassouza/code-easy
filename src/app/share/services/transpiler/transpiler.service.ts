import { Injectable } from '@angular/core';
import { ResourcesTreeInterface } from '../resources-tree.interface';

@Injectable({
  providedIn: 'root'
})
export class TranspilerService {

  constructor() { }

  public async getContentRotas(rotas: ResourcesTreeInterface): Promise<String> {
    let listaRotas: string = '';

    rotas.itemList.forEach(rota => {
        listaRotas = listaRotas + "\n" +
          "   /* " + rota.staticPropertiesList[1].propertieValue + " */ \n" +
          "   " + rota.staticPropertiesList[0].propertieValue.trim() + " = router." + rota.staticPropertiesList[2].propertieValue.trim() + "(" + rota.staticPropertiesList[3].propertieValue.trim() + ", (req, res, next) => { \n" +
          "    res.send({\n        " + rota.staticPropertiesList[4].propertieValue + "\n    }); \n" +
          "  }),\n/* ------ */    \n";
    });


    let stringFile = "const express = require('express'); \n" +
      "const router = express.Router(); \n\n" +

      "const rotas = { \n" 
      +
      listaRotas
      +
      "} \n" +
      "module.exports = rotas; \n"

    return stringFile;
  }

}
