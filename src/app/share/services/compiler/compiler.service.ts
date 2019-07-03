import { Injectable } from '@angular/core';
import { TranspilerService } from '../transpiler/transpiler.service';
import { ResourcesTreeInterface } from '../resources-tree.interface';
import { UtilsService } from '../utils/utils.service';
import { DatabaseStorageService } from '../database-storage/database-storage.service';
import { Emissor } from '../emissor-eventos/emissor-eventos.service';
import { HttpClient } from '@angular/common/http';

const { dialog } = require('electron').remote;
const fs = require('fs');
const shell = require('node-powershell');
let ps = new shell({ executionPolicy: 'Bypass', noProfile: true });

@Injectable({
  providedIn: 'root'
})
export class CompilerService {
  private srcGlobal: ResourcesTreeInterface[];

  constructor(
    private transpiler: TranspilerService,
    private utils: UtilsService,
    private database: DatabaseStorageService,
    private http: HttpClient,

  ) {
    Emissor.srcGlobal.subscribe(data => this.srcGlobal = data);
    this.database.getSrc();

    this.readFile();
  }

  public async iniciarAplicacao(srcGlobal: ResourcesTreeInterface[]) {
    await this.genereteFiles(srcGlobal);

    // Finaliza e inicia o ps.
    ps = new shell({ executionPolicy: 'Bypass', noProfile: true });

    // Usado para validar se já existe outro processo rodando na mesma porta.
    if (
      srcGlobal[0].staticPropertiesList[5].propertieValue !== '' &&
      srcGlobal[0].staticPropertiesList[5].propertieValue !== '--' &&
      srcGlobal[0].staticPropertiesList[5].propertieValue !== undefined &&
      srcGlobal[0].staticPropertiesList[5].propertieValue !== null
    ) {
      ps.addCommand('taskKill.exe /F /PID ' + srcGlobal[0].staticPropertiesList[5].propertieValue);
      ps.invoke().then(output => {
        this.iniciarEscutaAPI(srcGlobal);
      }).catch(err => {
        console.log(err);
        this.iniciarEscutaAPI(srcGlobal);
      });

    } else {
      this.iniciarEscutaAPI(srcGlobal);
    }
  }

  public async pararAplicacao(srcGlobal: ResourcesTreeInterface[]) {
    console.log('Parando API...');
    // Finaliza e inicia o ps.
    ps = null;
    ps = new shell({ executionPolicy: 'Bypass', noProfile: true });

    // Usado para validar se já existe outro processo rodando na mesma porta.
    if (
      srcGlobal[0].staticPropertiesList[5].propertieValue !== '' &&
      srcGlobal[0].staticPropertiesList[5].propertieValue !== '--' &&
      srcGlobal[0].staticPropertiesList[5].propertieValue !== undefined &&
      srcGlobal[0].staticPropertiesList[5].propertieValue !== null
    ) {
      ps.addCommand(
        'taskKill.exe /F /PID ' + srcGlobal[0].staticPropertiesList[5].propertieValue);
      ps.invoke().then(() => console.log('Execução da API finalizada!')).catch(err => console.log(err));
    }
  }

  private async iniciarEscutaAPI(srcGlobal: ResourcesTreeInterface[]) {
    let temNodeModules: Boolean = false;

    // Usado para validar se já existe outro processo rodando na mesma porta.
    const value = srcGlobal[0].staticPropertiesList[5].propertieValue;
    if (value !== '' && value !== '--' && value !== undefined && value !== null) {
      ps.addCommand('taskKill.exe /F /PID ' + srcGlobal[0].staticPropertiesList[5].propertieValue);
      ps.invoke().then(() => this.iniciarEscutaAPI(srcGlobal)).catch(() => this.iniciarEscutaAPI(srcGlobal));
    } else {
      ps.addCommand('cd ' + srcGlobal[0].staticPropertiesList[4].propertieValue);
      ps.invoke().then(() => {
        ps.addCommand('ls');
        ps.invoke().then((output) => {

          const nodemodules = output.toString().indexOf('node_modules');
          if (nodemodules !== -1) {
            temNodeModules = true;
          } else {
            // Instala a pasta node_modules
            ps.addCommand('npm i');
          }

          // Executa npm i se nescessário
          ps.invoke().then(() => {
            console.log('Escuta da API iniciado!');

            // Inicia novo processo
            ps.addCommand('node server.js > ' + srcGlobal[0].staticPropertiesList[0].propertieValue.toLocaleLowerCase().trim() + '.json');
            ps.invoke().then(() => {

              console.log('Processo finalizado!');

            }).catch(err => console.log('API não iniciada!'));
          }).catch(err => console.log('Não instalou as dependências!'));
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
    }
  }

  private async genereteFiles(srcGlobal: ResourcesTreeInterface[]): Promise<any> {
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
    return await this.salvarFiles(
      srcGlobal[0].staticPropertiesList[4].propertieValue,
      files,
      srcGlobal
    );
  }

  private async salvarFiles(caminhoSalvar: String, files: any[], srcGlobal: ResourcesTreeInterface[]) {

    if (caminhoSalvar === '' || caminhoSalvar === undefined || caminhoSalvar === null) {

      dialog.showOpenDialog({properties: ['openDirectory']}, (path) => {
        if (path === undefined) {} else {

          srcGlobal[0].staticPropertiesList[4].propertieValue = path.toString();
          this.database.updateSrc();

          console.log('Salvando em: \"' + path + '\"');
          files.forEach(file => {
            try {
              console.log(path + '\\' + file.fileName + '.' + file.extensao);
              fs.writeFile(path + '\\' + file.fileName + '.' + file.extensao, file.content, () => {
                console.log(file.fileName + ' salvo!');
              });
            } catch (e) {
              console.log('Failed to save the file! Erro:' + e);
            }
          });

          // Criar ou recria arquivo de logs
          fs.writeFile(
            caminhoSalvar + '\\' + srcGlobal[0].staticPropertiesList[0].propertieValue.toLocaleLowerCase().trim() + '.json',
            '',
            () => {}
          );
        }
      });
    } else {
      console.log('Salvando em: \"' + caminhoSalvar + '\"');
      files.forEach(file => {
        try {
          fs.writeFile(caminhoSalvar + '\\' + file.fileName + '.' + file.extensao, file.content, (err) => {
            console.log(file.fileName + '.' + file.extensao + ' salvo!');
          });
        } catch (e) {
          console.log('Failed to save the file! Erro:' + e);
        }
      });

      // Criar ou recria arquivo de logs
      fs.writeFile(
        caminhoSalvar + '\\' + srcGlobal[0].staticPropertiesList[0].propertieValue.toLocaleLowerCase().trim() + '.json',
        '',
        () => {}
      );
    }
    return;
  }

  private async readFile() {
    let pid = '--';
    if (this.srcGlobal) {
      if (this.srcGlobal[0].staticPropertiesList[4].propertieValue !== '') {
        setInterval(() => {

          fs.readFile(
            this.srcGlobal[0].staticPropertiesList[4].propertieValue + '\\' +
            this.srcGlobal[0].staticPropertiesList[0].propertieValue.toLocaleLowerCase().trim() +
            '.json', 'utf16le', function (err, data) {
              if (err) { pid = '--'; }
              pid = data.split('[ ')[1].split(' ]')[0].toString();
            }
          );

          this.http.get('http://localhost:' + this.srcGlobal[1].staticPropertiesList[2].propertieValue).subscribe(
            data => {},
            error => pid = '--'
          );

          this.srcGlobal[0].staticPropertiesList[5].propertieValue = pid;
        }, 3000);
      }
    }
  }
}
