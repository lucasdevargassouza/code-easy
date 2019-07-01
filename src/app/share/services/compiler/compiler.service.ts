import { Injectable } from '@angular/core';
import { TranspilerService } from '../transpiler/transpiler.service';
import { ResourcesTreeInterface } from '../resources-tree.interface';
import { UtilsService } from '../utils/utils.service';
import { DatabaseStorageService } from '../database-storage/database-storage.service';
import { Emissor } from '../emissor-eventos/emissor-eventos.service';

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

  ) {
    Emissor.srcGlobal.subscribe(data => this.srcGlobal = data);
    this.database.getSrc();

    setInterval(() => {
      this.utils.getInfoAPI(
        'http://localhost:' +
        this.srcGlobal[1].staticPropertiesList[2].propertieValue +
        '/process/pid'
      ).subscribe(
        (data: any) => {
          this.srcGlobal[0].staticPropertiesList[5].propertieValue = data.process_pid;
        },
        error => {
          this.srcGlobal[0].staticPropertiesList[5].propertieValue = '--';
        }
      );
    }, 3000);
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
      ps.addCommand('taskKill.exe /F /PID ' + srcGlobal[0].staticPropertiesList[5].propertieValue);
      ps.invoke().then(() => {}).catch(err => console.log(err));
    }
  }

  private async iniciarEscutaAPI(srcGlobal: ResourcesTreeInterface[]) {
    let temNodeModules: Boolean = false;

    ps.addCommand('cd ' + srcGlobal[0].staticPropertiesList[4].propertieValue);
    ps.invoke().then(() => {
      ps.addCommand('ls');
      ps.invoke().then((output) => {
        const nodemodules = output.toString().indexOf('node_modules');
        if (nodemodules !== -1) {
          temNodeModules = true;
        } else {
          // Instala a pasta node_modules
          ps.addCommand('npm i > logs.log');
        }

        // Executa npm i se nescessário
        ps.invoke().then(() => {
          console.log('Escuta da API iniciado!');

          // Inicia novo processo
          ps.addCommand('node server.js');
          ps.invoke().then(() => {

            console.log('Processo finalizado!');

          }).catch(err => {

            this.utils.getInfoAPI(
              'http://localhost:' +
              srcGlobal[1].staticPropertiesList[2].propertieValue +
              '/process/pid'
            ).subscribe(
              (data: any) => {
                srcGlobal[0].staticPropertiesList[5].propertieValue = data.process_pid;
              },
              error => {
                srcGlobal[0].staticPropertiesList[5].propertieValue = '--';
              }
            );

            // Usado para validar se já existe outro processo rodando na mesma porta.
            const value = srcGlobal[0].staticPropertiesList[5].propertieValue;
            if (value !== '' && value !== '--' && value !== undefined && value !== null) {

              ps.addCommand('taskKill.exe /F /PID ' + srcGlobal[0].staticPropertiesList[5].propertieValue);
              ps.invoke().then(() => this.iniciarEscutaAPI(srcGlobal)).catch(() => this.iniciarEscutaAPI(srcGlobal));

            } else {
              this.iniciarEscutaAPI(srcGlobal);
            }
          });
        }).catch(err => console.log(err));

        setInterval(() => {
          this.utils.getInfoAPI(
            'http://localhost:' +
            srcGlobal[1].staticPropertiesList[2].propertieValue +
            '/process/pid'
          ).subscribe(
            (data: any) => {
              srcGlobal[0].staticPropertiesList[5].propertieValue = data.process_pid;
            },
            error => {
              srcGlobal[0].staticPropertiesList[5].propertieValue = '--';
            }
          );
        }, 3000);


      }).catch(err => console.log(err));
    }).catch(err => console.log(err));

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
          fs.writeFile(caminhoSalvar + 'logs.log', '', (err) => { /* console.log(err) */ });
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
      fs.writeFile(caminhoSalvar + 'logs.log', '', (err) => { /* console.log(err) */ });
    }
    return;
  }
}
