import { Injectable } from '@angular/core';
import { TranspilerService } from '../transpiler/transpiler.service';
import { ResourcesTreeInterface } from '../resources-tree.interface';
import { UtilsService } from '../utils/utils.service';
import { DatabaseStorageService } from '../database-storage/database-storage.service';
import { Emissor } from '../emissor-eventos/emissor-eventos.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { LoadingModalComponent } from '../../components/loading-modal/loading-modal.component';

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
    private database: DatabaseStorageService,
    public dialog: MatDialog,

  ) {
    Emissor.srcGlobal.subscribe(data => this.srcGlobal = data);
    this.database.getSrc();
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
        'taskKill.exe /F /PID ' + srcGlobal[0].staticPropertiesList[5].propertieValue + ' > ' +
        srcGlobal[0].staticPropertiesList[0].propertieValue.toLocaleLowerCase().trim() + '.json'
      );
      ps.invoke().then(() => Emissor.currentStatus.emit('Execução da API finalizada!')).catch(err => console.log(err));
    }
  }

  public async instalaNodeModules(caminho: string) {
    this.dialog.open(LoadingModalComponent, {
      id: 'loading-modal',
      width: '250px',
      disableClose: true,
      data: {}
    });

    setTimeout(() => {
      Emissor.currentStatus.emit('Entrando na pasta');
      ps.addCommand('cd ' + caminho);
      ps.invoke().then(output => {


        Emissor.currentStatus.emit('Rodando npm install');
        ps.addCommand('npm i');
        ps.invoke().then(output => {

          Emissor.currentStatus.emit('npm install executado com sucesso');
          this.dialog.closeAll();

        }).catch(err => {
          console.log(err);
          Emissor.currentStatus.emit('npm install executado com avisos');
          this.dialog.closeAll();
        });


      }).catch(err => {
        console.log(err);
        this.dialog.closeAll();
      });
    }, 2000);
  }

  private async iniciarEscutaAPI(srcGlobal: ResourcesTreeInterface[]) {
    let temNodeModules: Boolean = false;

    // Usado para validar se já existe outro processo rodando na mesma porta.
    const value = srcGlobal[0].staticPropertiesList[5].propertieValue;
    if (value !== '' && value !== '--' && value !== undefined && value !== null) {
      Emissor.currentStatus.emit('Finalizando processo anterior');
      ps.addCommand('taskKill.exe /F /PID ' + srcGlobal[0].staticPropertiesList[5].propertieValue);
      ps.invoke().then(() => this.iniciarEscutaAPI(srcGlobal)).catch(() => {
        Emissor.currentStatus.emit('Processo anteriror finalizado');
        this.iniciarEscutaAPI(srcGlobal);
      });
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
            Emissor.currentStatus.emit('Instalando dependências');
          }

          // Executa npm i se nescessário
          ps.invoke().then(() => {
            Emissor.currentStatus.emit('Escutando API');

            // Inicia novo processo
            ps.addCommand('node server.js > ' + srcGlobal[0].staticPropertiesList[0].propertieValue.toLocaleLowerCase().trim() + '.json');
            ps.invoke().then(() => {

              Emissor.currentStatus.emit('Processo finalizado!');

            }).catch(err => {Emissor.currentStatus.emit('API não iniciada!'); console.log(err);});
          }).catch(err => {Emissor.currentStatus.emit('Não instalou as dependências!'); console.log(err);});
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
    }
  }

  public async genereteFiles(srcGlobal: ResourcesTreeInterface[]): Promise<any> {
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
      },
      {
        fileName: '',
        extensao: 'gitignore',
        content: await this.transpiler.getGitIgnore()
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

          Emissor.currentStatus.emit('Salvando em: \"' + path + '\"');
          files.forEach(file => {
            try {
              Emissor.currentStatus.emit(path + '\\' + file.fileName + '.' + file.extensao);
              fs.writeFile(path + '\\' + file.fileName + '.' + file.extensao, file.content, () => {
                Emissor.currentStatus.emit(file.fileName + ' salvo!');
              });
            } catch (e) {
              Emissor.currentStatus.emit('Falha ao salvar o arquivo');
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
      Emissor.currentStatus.emit('Salvando em: \"' + caminhoSalvar + '\"');
      files.forEach(file => {
        try {
          fs.writeFile(caminhoSalvar + '\\' + file.fileName + '.' + file.extensao, file.content, (err) => {
            Emissor.currentStatus.emit(file.fileName + '.' + file.extensao + ' salvo!');
          });
        } catch (e) {
          Emissor.currentStatus.emit('Erro aosalvar o arquivo: \"' + file.fileName + '.' + file.extensao);
        }
      });

      // Criar ou recria arquivo de configurações
      fs.writeFile(
        caminhoSalvar + '\\' + srcGlobal[0].staticPropertiesList[0].propertieValue.toLocaleLowerCase().trim() + '.json',
        '',
        () => { }
      );
      return true;
    }
  }
}
