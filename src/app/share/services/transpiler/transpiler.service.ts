import { Injectable } from '@angular/core';
import { ResourcesTreeInterface } from '../resources-tree.interface';
import { CONSTS } from '../consts/consts.service';

@Injectable({
  providedIn: 'root'
})
export class TranspilerService {

  constructor() { }

  // Retorna o Package.json
  public async getPackageJson(srcGlobal: ResourcesTreeInterface[]): Promise<string> {

    const appConfig: ResourcesTreeInterface =  await this.getItemEspecifico(srcGlobal, CONSTS.tiposItens.appConfig);

    const packagejson = '{\n' +
    ' \"name\": \"' + appConfig.staticPropertiesList[0].propertieValue + '\",\n' +
    ' \"version\": \"' + appConfig.staticPropertiesList[3].propertieValue + '\",\n' +
    ' \"description\": \"' + appConfig.staticPropertiesList[1].propertieValue + '\",\n' +
    ' \"main\": \"index.js\",\n' +
    ' \"scripts\": {\n' +
    '   \"test\": \"echo \\"Error: no test specified\\" && exit 1\"\n' +
    ' }, \n' +
    ' \"author\": \"' + appConfig.staticPropertiesList[2].propertieValue + '\",\n' +
    ' \"license\": \"ISC\",\n' +
    ' \"dependencies\": {\n' +
    '   \"debug\": \"^4.1.1\",\n' +
    '   \"express\": \"^4.17.1\",\n' +
    '   \"http\": \"0.0.0\"\n' +
    ' }\n' +
    '}\n';

    return packagejson;
  }

  // Retorna as rotas
  public async getContentRotas(srcGlobal: ResourcesTreeInterface[]): Promise<String> {
    let listaRotas = '';
    const rotas: ResourcesTreeInterface = await this.getItemEspecifico(srcGlobal, CONSTS.tiposItens.rota);

    rotas.itemList.forEach(rota => {
      listaRotas = listaRotas + '\n' +
      '/*' + rota.staticPropertiesList[1].propertieValue + '*/\n' +
      'const rota_' + rota.staticPropertiesList[0].propertieValue + ' = router.' + rota.staticPropertiesList[2].propertieValue.trim() +
      '(\'' + rota.staticPropertiesList[3].propertieValue.trim() + '\', (req, res, next) => {\n' +
      '  res.send({\n        ' + rota.staticPropertiesList[4].propertieValue + '\n    })\n' +
      '});\n' +
      'app.use(\'' + rota.staticPropertiesList[3].propertieValue.trim() + '\', rota_' +
                     rota.staticPropertiesList[0].propertieValue + ');\n    ';
    });

    const stringFile = '' +
      '\'use strict\';\n\n' +

      'const express = require(\'express\');\n' +
      'const router = express.Router();\n' +
      'const app = express();\n\n' +

      '/*---------------------------------- Rotas */\n'
      +
      listaRotas
      +
      '\n/*-----------------------------------------*/\n' +

      'module.exports = app;\n\n' +
    '';
    return stringFile;
  }

  // Retorna o Servidor
  public async getContentServidor(srcGlobal: ResourcesTreeInterface[]): Promise<string> {
    const server: ResourcesTreeInterface = await this.getItemEspecifico(srcGlobal, CONSTS.tiposItens.servidor);

    const serverString = '' +
    'const debug = require(\'debug\')(\'balta:server\');\n' +
    'const http = require(\'http\');\n' +
    'const app = require(\'./rotas\');\n\n' +

    'app.set(\'port\', ' + server.staticPropertiesList[2].propertieValue + ');\n\n' +

    'const server = http.createServer(app);\n\n' +

    'server.listen(' + server.staticPropertiesList[2].propertieValue + ');\n\n' +
    'console.log(\'API rodando na porta \' + ' + server.staticPropertiesList[2].propertieValue + ');\n\n';

    return serverString;
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
