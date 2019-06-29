import { Injectable } from '@angular/core';
import { TranspilerService } from '../transpiler/transpiler.service';
import { ResourcesTreeInterface } from '../resources-tree.interface';

const fs = require('fs');
const shell = require('node-powershell');
const ps = new shell({ executionPolicy: 'Bypass', noProfile: true });

@Injectable({
  providedIn: 'root'
})
export class CompilerService {
  constructor(private transpiler: TranspilerService) {}

  public async iniciarAplicacao(srcGlobal: ResourcesTreeInterface[]) {
    await this.genereteFiles(srcGlobal);

    this.iniciarEscutaAPI(srcGlobal);
  }

  private iniciarEscutaAPI(srcGlobal: ResourcesTreeInterface[]) {
    ps.addCommand('cd ' + srcGlobal[0].staticPropertiesList[4].propertieValue);
    ps.addCommand('node server.js');
    ps.invoke()
        .then(output => {
            console.log(output);
        })
        .catch(err => {
            console.log(err);
        })
  }

  private async genereteFiles(srcGlobal: ResourcesTreeInterface[]) {
    console.log('Iniciou');
    const files = [
      {
        fileName: 'package',
        extensao: 'json',
        content: await this.transpiler.getPackageJson(srcGlobal)
      },
      {
        fileName: 'server',
        extensao: 'js',
        content: await this.transpiler.getContentServidor(srcGlobal)
      },
      {
        fileName: 'rotas',
        extensao: 'js',
        content: await this.transpiler.getContentRotas(srcGlobal)
      }
    ];
    console.log(files);
    this.salvarFiles(
      srcGlobal[0].staticPropertiesList[4].propertieValue,
      files
    );
    console.log('Salvou tudo!');
  }

  private async salvarFiles(caminhoSalvar: String, files: any[]) {
    console.log('inicia a salvar');
    files.forEach(file => {
      console.log('salvando');

      try {
        console.log(caminhoSalvar + '\\' + file.fileName + '.' + file.extensao, file.content);
        fs.writeFile(caminhoSalvar + file.fileName + '.' + file.extensao, file.content, (err)=> {
          console.log(file.fileName);
        });
      } catch (e) {
        console.log('Failed to save the file! Erro:');
        console.log(e);
      }

      /* fs.writeFile(caminhoSalvar, file.fileName + ', ' + file.extensao, (e) => {
        if (e) {
          console.log(e);
        }
        console.log(file.fileName);
      }); */
    });
  }
}
