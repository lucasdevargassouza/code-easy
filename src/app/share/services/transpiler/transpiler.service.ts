import { Injectable } from '@angular/core';
import { ResourcesTreeInterface } from '../resources-tree.interface';
import { CONSTS } from '../consts/consts.service';

@Injectable({
  providedIn: 'root'
})
export class TranspilerService {

  constructor() { }

  /**
   * Retorna o conteúdo que deve estar contido dentro do arquivo "package.json".
   *
   * @param srcGlobal ResourcesTreeInterface[] Deve ser passado o projeto em que se esta trabalhando.
   * @returns Promise<string> Retorna a promessa de uma string. Usar 'await' para receber o retorno com o conteúdo final.
   */
  public async getPackageJson(srcGlobal: ResourcesTreeInterface[]): Promise<string> {

    const appConfig: ResourcesTreeInterface =  await this.getItemEspecifico(srcGlobal, CONSTS.tiposItens.appConfig);

    let dependences = ' \"dependencies\": {\n';
    JSON.parse(appConfig.staticPropertiesList[6].propertieValue).forEach(dependencia => {
      dependences = dependences + '  \"' + dependencia.name + '\": \"' + dependencia.version + '\", \n';
    });
    dependences = dependences + ' }\n';
    console.log(dependences);

    const packagejson = '{\n' +
    ' \"name\": \"' + appConfig.staticPropertiesList[0].propertieValue.toLowerCase() + '\",\n' +
    ' \"version\": \"' +
        appConfig.staticPropertiesList[3].propertieValue.toString().split('', 3)[0] + '.' +
        appConfig.staticPropertiesList[3].propertieValue.toString().split('', 3)[1] + '.' +
        appConfig.staticPropertiesList[3].propertieValue.toString().split('', 3)[2] +
      '\",\n' +
    ' \"description\": \"' + appConfig.staticPropertiesList[1].propertieValue + '\",\n' +
    ' \"main\": \"index.js\",\n' +
    ' \"scripts\": {\n' +
    '   \"test\": \"echo \\"Error: no test specified\\" && exit 1\"\n' +
    ' }, \n' +
    ' \"author\": \"' + appConfig.staticPropertiesList[2].propertieValue + '\",\n' +
    ' \"license\": \"ISC\",\n' +
    dependences +
    '}\n';

    return packagejson;
  }

  // Retorna as rotas
  public async getContentRotas(srcGlobal: ResourcesTreeInterface[]): Promise<String> {
    const rotas: ResourcesTreeInterface = await this.getItemEspecifico(srcGlobal, CONSTS.tiposItens.rota);
    let listaRotas = '\n';

    rotas.itemList.forEach(rota => {
      listaRotas = listaRotas + '\n' +
      '/*' + rota.staticPropertiesList[1].propertieValue + '*/\n' +
      'app.' + rota.staticPropertiesList[2].propertieValue.trim() +
      '(\'' + rota.staticPropertiesList[3].propertieValue.trim() + '\', (req, res, next) => {\n' +
      '  res.send({\n        ' + rota.staticPropertiesList[4].propertieValue + '\n: \'ok\'    })\n' +
      '});\n';
    });

    const stringFile = '' +
      '\'use strict\';\n\n' +

      'const express = require(\'express\');\n' +
      'const router = express.Router();\n' +
      'const app = express();\n\n' +
      'const cors = require(\'cors\');\n' +

      '// Habilita o CORS\n' +
      'app.use(cors());\n' +

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


    'const server = http.createServer(app);\n' +

    'server.listen(' + server.staticPropertiesList[2].propertieValue + ');\n\n' +


    '// Emit o pid do processo para a plataforma.\n' +
    'console.log([process.pid]);\n';

    return serverString;
  }

  /**
   * Apenas retorna o .gitignore.
   *
   * @returns string Retorna o conteúdo que deve estar contido no arquivo ".gitignore".
   */
  public getGitIgnore(): string {
    return '/node_modules';
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
