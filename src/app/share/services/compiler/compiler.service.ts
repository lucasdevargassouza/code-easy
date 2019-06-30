import { Injectable } from '@angular/core';
import { TranspilerService } from '../transpiler/transpiler.service';
import { ResourcesTreeInterface } from '../resources-tree.interface';
import { dialog } from 'electron';

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
    let temNodeModules: Boolean = false;

    ps.addCommand('cd ' + srcGlobal[0].staticPropertiesList[4].propertieValue);
    ps.invoke().then(output => {
      ps.addCommand('ls');
      ps.invoke().then(output => {
        const nodemodules = output.toString().indexOf('node_modules');
        if (nodemodules !== -1) {
          temNodeModules = true;
        } else {
          // Instala a pasta node_modules
          ps.addCommand('npm i > logs.log');
        }

        // Executa npm i se nescessário
        ps.invoke().then(output => {
          console.log(output);

          // Inicia novo processo
          ps.addCommand('node server.js');
          ps.invoke().then(output => {

            console.log(output);

          }).catch(err => console.log(err));/**/
        }).catch(err => console.log(err));


      }).catch();
    }).catch(err => console.log(err));
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
    await this.salvarFiles(
      srcGlobal[0].staticPropertiesList[4].propertieValue,
      files
    );
  }

  private async salvarFiles(caminhoSalvar: String, files: any[]) {
    console.log('inicia a salvar em ' + caminhoSalvar);
    files.forEach(file => {
      console.log('salvando');

      if (caminhoSalvar === '' || caminhoSalvar === undefined || caminhoSalvar === null) {

        dialog.showSaveDialog(null, (path) => {
          console.log(path);
          try {
            console.log(caminhoSalvar + '\\' + file.fileName + '.' + file.extensao, file.content);
            fs.writeFile(path + file.fileName + '.' + file.extensao, file.content, (err) => {
              console.log('foi no try');
              console.log(file.fileName);
            });
          } catch (e) {
            console.log('Failed to save the file! Erro:');
            console.log(e);
          }
        });
      }

      try {
        console.log(caminhoSalvar + file.fileName + '.' + file.extensao);
        fs.writeFile(caminhoSalvar + file.fileName + '.' + file.extensao, file.content, (err) => {
          console.log(file.fileName);
        });
      } catch (e) {
        console.log('Failed to save the file! Erro:');
        console.log(e);
      }

    });

    // Criar ou recria arquivo de logs
    fs.writeFile(caminhoSalvar + 'logs.log', '', (err) => { /* console.log(err) */ });
  }
}
