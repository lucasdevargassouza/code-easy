import { Injectable } from '@angular/core';
import { ResourcesTreeInterface } from '../resources-tree.interface';
import { CONSTS } from '../consts/consts.service';

@Injectable({
  providedIn: 'root'
})
export class TranspilerService {

  constructor() { }

  public async getContentRotas(srcGlobal: ResourcesTreeInterface[]): Promise<String> {
    let listaRotas = '';

    const rotas: ResourcesTreeInterface = await this.getItemEspecifico(srcGlobal, CONSTS.tiposItens.rota);

    rotas.itemList.forEach(rota => {
      listaRotas = listaRotas + '\n' +
      '/*' + rota.staticPropertiesList[1].propertieValue + '*/\n' +
      'router.' + rota.staticPropertiesList[2].propertieValue.trim() +
      '(\'' + rota.staticPropertiesList[3].propertieValue.trim() + '\', (req, res, next) => {\n' +
      '  res.send({\n        ' + rota.staticPropertiesList[4].propertieValue + '\n    })\n' +
      '});\n    ';
    });

    const stringFile = '' +
      '\'use strict\';\n\n' +

      'const express = require(\'express\');\n' +
      'const router = express.Router();\n\n' +

      '/*---------------------------------- Rotas */\n'
      +
      listaRotas
      +
      '\n/*-----------------------------------------*/\n' +

      'module.exports = router;' +
    '';
    return stringFile;
  }

  public async getContentServidor(srcGlobal: ResourcesTreeInterface[]) {
    let servidor = '';

    const server: ResourcesTreeInterface = await this.getItemEspecifico(srcGlobal, CONSTS.tiposItens.servidor);

    // let serverString =
  }

  public async getPackageJson(srcGlobal: ResourcesTreeInterface[]): Promise<string> {

    const appConfig: ResourcesTreeInterface =  await this.getItemEspecifico(srcGlobal, CONSTS.tiposItens.appConfig);

    const packagejson = '{ \n' +
    '\"name\": \"' + appConfig.staticPropertiesList[0].propertieValue + '\", \n' +
    '\"version\": \"' + appConfig.staticPropertiesList[3].propertieValue + '\", \n' +
    '\"description\": \"' + appConfig.staticPropertiesList[1].propertieValue + '\", \n' +
    '\"main\": \"index.js\", \n' +
    '\"scripts\": { \n' +
    '  \"test\": \"echo \"Error: no test specified\" && exit 1\" \n' +
    '}, \n' +
    '\"author\": \"' + appConfig.staticPropertiesList[2].propertieValue + '\", \n' +
    '\"license\": \"ISC\" \n' +
    '}';

    return packagejson;
  }

  private getItemEspecifico(resTree: ResourcesTreeInterface[], tipoItem: string): ResourcesTreeInterface {
    let retorno: ResourcesTreeInterface = null;

    resTree.forEach(item => {
      if (item.tipoItem === tipoItem) {
        retorno = item;
        return;
      } else if (item.tipoItem === CONSTS.tiposItens.pasta) {
        const res = this.getItemEspecifico(item.itemList, tipoItem);
        if (res !== null) {
          retorno = item;
          return;
        }
      }
    });
    return retorno;
  }

}
