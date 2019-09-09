import { Injectable } from '@angular/core';
import { TranspilerService } from '../transpiler/transpiler.service';
import { ResourcesTreeInterface } from '../../interfaces/resources-tree.interface';
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
    public dialogModal: MatDialog,
    private http: HttpClient,
    private utils: UtilsService,

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
    Emissor.currentStatus.emit({
      message: 'Parando API...',
      color: '', isShowLoadingBar: true
    });

    this.utils.finalizaProcessos(srcGlobal[1].staticPropertiesList[2].propertieValue);

  }

  public async instalaNodeModules(caminho: string) {
  /* this.dialogModal.open(LoadingModalComponent, {
      id: 'loading-modal',
      width: '250px',
      disableClose: true,
      data: {}
    });

    this.dialogModal.closeAll();
  */

    setTimeout(() => {
      Emissor.currentStatus.emit({
        message: 'Localizando pasta',
        color: '', isShowLoadingBar: true
      });
      ps.addCommand('cd ' + caminho);
      ps.invoke().then(output => {


        Emissor.currentStatus.emit({
          message: 'Executando npm install',
          color: '', isShowLoadingBar: true
        });
        ps.addCommand('npm i');
        ps.invoke().then(() => {

          Emissor.currentStatus.emit({
            message: 'Npm install executado com sucesso',
            color: '', isShowLoadingBar: false
          });

        }).catch(err => {
          console.log(err);
          Emissor.currentStatus.emit({
            message: 'Npm install finalizado com avisos',
            color: '', isShowLoadingBar: false
          });
        });


      }).catch(err => {
        console.log(err);
      });
    }, 2000);
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

  private async iniciarEscutaAPI(srcGlobal: ResourcesTreeInterface[]) {
    let temNodeModules: Boolean = false;

    this.utils.finalizaProcessos(srcGlobal[1].staticPropertiesList[2].propertieValue);

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
            Emissor.currentStatus.emit({
              message: 'Instalando dependências',
              color: '', isShowLoadingBar: true
            });
          }

          // Executa npm i se nescessário
          ps.invoke().then(() => {

            Emissor.currentStatus.emit({
              message: 'Escutando API',
              color: '#207d00', isShowLoadingBar: false
            });

            ps.addCommand('netstat -ona | findstr :' + srcGlobal[1].staticPropertiesList[2].propertieValue);
            ps.invoke().then(data => {
              try {
                const pid = data.split('LISTENING ')[1].split('TCP ')[0].trim();
                console.log(pid);

                srcGlobal[0].staticPropertiesList[5].propertieValue = pid;
              } catch (error) { let erro; erro = error; }
            }).catch(error => {  console.log(error); });

            // Inicia novo processo
            ps.addCommand('node server.js > ' + srcGlobal[0].staticPropertiesList[0].propertieValue.toLocaleLowerCase().trim() + '.json');
            ps.invoke().then(() => {

              Emissor.currentStatus.emit({
                message: 'Processo finalizado!',
                color: '', isShowLoadingBar: false
              });

            }).catch(err => {
              console.log(err);
              Emissor.currentStatus.emit({
                message: 'API não iniciada!',
                color: '', isShowLoadingBar: true
              });
            });
          }).catch(err => {
            console.log(err);
            Emissor.currentStatus.emit({
              message: 'Execução da API finalizada!',
              color: '', isShowLoadingBar: false
            });
        });
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
  }

  private async salvarFiles(caminhoSalvar: String, files: any[], srcGlobal: ResourcesTreeInterface[]) {

    if (caminhoSalvar === '' || caminhoSalvar === undefined || caminhoSalvar === null) {

      dialog.showOpenDialog({properties: ['openDirectory']}, (path) => {
        if (path === undefined) {} else {

          srcGlobal[0].staticPropertiesList[4].propertieValue = path.toString();
          this.database.updateSrc();

          Emissor.currentStatus.emit({
            message: 'Salvando em: \"' + path + '\"',
            color: '', isShowLoadingBar: true
          });
          files.forEach(file => {
            try {
              Emissor.currentStatus.emit({
                  message: path + '\\' + file.fileName + '.' + file.extensao,
                  color: '', isShowLoadingBar: true
                });
              fs.writeFile(path + '\\' + file.fileName + '.' + file.extensao, file.content, () => {
                Emissor.currentStatus.emit({
                  message: file.fileName + ' salvo!',
                  color: '', isShowLoadingBar: true
                });
              });
            } catch (e) {
              Emissor.currentStatus.emit({
                message: 'Falha ao salvar o arquivo',
                color: '', isShowLoadingBar: false
              });
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
      Emissor.currentStatus.emit({
        message: 'Salvando em: \"' + caminhoSalvar + '\"',
        color: '', isShowLoadingBar: true
      });
      files.forEach(file => {
        try {
          fs.writeFile(caminhoSalvar + '\\' + file.fileName + '.' + file.extensao, file.content, (err) => {
            Emissor.currentStatus.emit({
              message: file.fileName + '.' + file.extensao + ' salvo!',
              color: '', isShowLoadingBar: true
            });
          });
        } catch (e) {
          Emissor.currentStatus.emit({
            message: 'Erro aosalvar o arquivo: \"' + file.fileName + '.' + file.extensao,
            color: '', isShowLoadingBar: false
          });
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
