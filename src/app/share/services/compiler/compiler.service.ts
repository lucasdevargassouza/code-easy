import { Injectable } from '@angular/core';
import { TranspilerService } from '../transpiler/transpiler.service';
import { ResourcesTreeInterface } from '../../interfaces/resources-tree.interface';
import { DatabaseStorageService } from '../database-storage/database-storage.service';
import { Emissor } from '../emissor-eventos/emissor-eventos.service';
import { MatDialog } from '@angular/material';
import { TerminalAccessService } from '../terminal-access/terminal-access.service';

import { dialog } from 'electron';
import { TypeOfStatus, ColorsOfStatus } from '../../interfaces/status-bar';

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
    private terminalAccess: TerminalAccessService,

  ) {
    Emissor.srcGlobal.subscribe(data => this.srcGlobal = data);
    this.database.getSrc();
  }

  public async iniciarAplicacao(srcGlobal: ResourcesTreeInterface[]) {
    await this.genereteFiles(srcGlobal);

    // Finaliza e inicia o ps.
    ps = new shell({ executionPolicy: 'Bypass', noProfile: true });

    // Pega o pid do processo que estiver radando!
    const pidProcesso = srcGlobal[0].staticPropertiesList[5].propertieValue;

    // Usado para validar se já existe outro processo rodando na mesma porta.
    if (pidProcesso !== '' && pidProcesso !== '--' && pidProcesso !== undefined && pidProcesso !== null) {

      const processStoped = await this.terminalAccess.finalizaProcessos(srcGlobal[1].staticPropertiesList[2].propertieValue);
      if (processStoped) {
        this.iniciarEscutaAPI(srcGlobal);
      } else {
        this.iniciarEscutaAPI(srcGlobal);
      }

    } else {
      this.iniciarEscutaAPI(srcGlobal);
    }
  }

  public async pararAplicacao(srcGlobal: ResourcesTreeInterface[]) {
    console.log('Parando API...');
    Emissor.currentStatus.emit({
      status: TypeOfStatus.OutroStatus,
      message: 'Parando API...',
      color: '', isShowLoadingBar: true
    });

    this.terminalAccess.finalizaProcessos(srcGlobal[1].staticPropertiesList[2].propertieValue);

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

    this.pararAplicacao(srcGlobal);

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
            status: TypeOfStatus.OutroStatus,
            message: 'Instalando dependências',
            color: ColorsOfStatus.OutroStatus, isShowLoadingBar: true
          });
        }

        // Executa npm i se nescessário
        ps.invoke().then(() => {

          Emissor.currentStatus.emit({
            status: TypeOfStatus.EscutandoApi,
            message: 'Escutando API',
            color: ColorsOfStatus.EscutandoApi, isShowLoadingBar: false
          });

          // this.terminalAccess.getPidCurrentProcess(srcGlobal[1].staticPropertiesList[2].propertieValue);
          /* ps.addCommand('netstat -ona | findstr :' + srcGlobal[1].staticPropertiesList[2].propertieValue);
          ps.invoke().then(data => {
            try {

               // Se o processo iniciou grava o pid do processo
              const pid = data.split('LISTENING ')[1].split('TCP ')[0].trim();
              srcGlobal[0].staticPropertiesList[5].propertieValue = pid;


            } catch (error) { let erro; erro = error; }
          }).catch(error => { console.log(error); }); */

          // Inicia novo processo
          ps.addCommand('node server.js > ' + srcGlobal[0].staticPropertiesList[0].propertieValue.toLocaleLowerCase().trim() + '.json');
          ps.invoke().then(() => {

            Emissor.currentStatus.emit({
      status: TypeOfStatus.OutroStatus,
              message: 'Processo finalizado!',
              color: '', isShowLoadingBar: false
            });

          }).catch(err => {
            console.log(err);
            Emissor.currentStatus.emit({
              status: TypeOfStatus.FalhaGeral,
              message: 'API não iniciada!',
              color: '', isShowLoadingBar: true
            });
          });
        }).catch(err => {
          console.log(err);
          Emissor.currentStatus.emit({
            status: TypeOfStatus.ApiFinalizada,
            message: 'Execução da API finalizada!',
            color: '', isShowLoadingBar: false
          });
        });
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }

  private async salvarFiles(caminhoSalvar: String, files: any[], srcGlobal: ResourcesTreeInterface[]) {

    if (caminhoSalvar === '' || caminhoSalvar === undefined || caminhoSalvar === null) {

      dialog.showOpenDialog({ properties: ['openDirectory'] }, (path) => {
        if (path === undefined) { } else {

          srcGlobal[0].staticPropertiesList[4].propertieValue = path.toString();
          this.database.updateSrc();

          Emissor.currentStatus.emit({
            status: TypeOfStatus.OutroStatus,
            message: 'Salvando em: \"' + path + '\"',
            color: '', isShowLoadingBar: true
          });
          files.forEach(file => {
            try {
              Emissor.currentStatus.emit({
                status: TypeOfStatus.OutroStatus,
                message: path + '\\' + file.fileName + '.' + file.extensao,
                color: '', isShowLoadingBar: true
              });
              fs.writeFile(path + '\\' + file.fileName + '.' + file.extensao, file.content, () => {
                Emissor.currentStatus.emit({
                  status: TypeOfStatus.OutroStatus,
                  message: file.fileName + ' salvo!',
                  color: '', isShowLoadingBar: true
                });
              });
            } catch (e) {
              Emissor.currentStatus.emit({
                status: TypeOfStatus.FalhaGeral,
                message: 'Falha ao salvar o arquivo',
                color: '', isShowLoadingBar: false
              });
            }
          });

          // Criar ou recria arquivo de logs
          fs.writeFile(
            caminhoSalvar + '\\' + srcGlobal[0].staticPropertiesList[0].propertieValue.toLocaleLowerCase().trim() + '.json',
            '',
            () => { }
          );
        }
      });
    } else {
      Emissor.currentStatus.emit({
        status: TypeOfStatus.OutroStatus,
        message: 'Salvando em: \"' + caminhoSalvar + '\"',
        color: '', isShowLoadingBar: true
      });
      files.forEach(file => {
        try {
          fs.writeFile(caminhoSalvar + '\\' + file.fileName + '.' + file.extensao, file.content, (err) => {
            Emissor.currentStatus.emit({
              status: TypeOfStatus.OutroStatus,
              message: file.fileName + '.' + file.extensao + ' salvo!',
              color: '', isShowLoadingBar: true
            });
          });
        } catch (e) {
          Emissor.currentStatus.emit({
            status: TypeOfStatus.OutroStatus,
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
