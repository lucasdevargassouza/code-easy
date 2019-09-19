import { Injectable } from '@angular/core';
import * as child_process from 'child_process';
import * as utf8 from 'utf8';
import { Emissor } from '../emissor-eventos/emissor-eventos.service';
import { TypeOfStatus, ColorsOfStatus, MessagesOfStatus } from '../../interfaces/status-bar';

@Injectable({
  providedIn: 'root'
})
export class TerminalAccessService {

  constructor() { }

  /**
   * Deve ser passado um link para abrir no navegador.
   *
   * @param url string Url que será aberta em navegador.
   */
  public openUrl(url: string) {
    this.execCommand('start ' + url);
  }

  /**
   * Busca por pacotes npm disponíveis.
   *
   * @param keyword string Palavra chave do pacote npm.
   * @returns Promisse<[]> Retorna uma Promisse, user await para obter apenas o resultado.
   *
   */
  public async npmSearch(keyword: string): Promise<[]> {
    return JSON.parse(await this.execCommand('npm search --json ' + keyword));
  }

  /**
   * Este metodo serve para finalizar a execução da api que estiver rodando na porta informada
   *
   * @param port String Porta na qual o processo está rodando
   * @returns new Promise(null)
   */
  public finalizaProcessos(port: string): Promise<boolean> {
    this.execCommand('netstat -ona | findstr :' + port).then(data => {

      try {
        const pid = data.split('LISTENING ')[1].split('TCP ')[0].trim();
        console.log(pid);

        this.execCommand('taskKill.exe /F /PID ' + pid).then(() => {

          Emissor.currentStatus.emit({
            status: TypeOfStatus.OutroStatus,
            message: 'Execução da API finalizada!',
            color: ColorsOfStatus.OutroStatus, isShowLoadingBar: false
          });

          return Promise.resolve(true);
        }).catch(error => { console.log(error); });
      } catch (error) {
        let erro;
        erro = error;
        return Promise.resolve(false);
      }
    }).catch(error => {
      console.log(error);
      return Promise.resolve(false);
    });

    return Promise.resolve(false);
  }

  /**
   * Este metodo serve buscar o PID da API sendo executada.
   *  OBS: Vai emitir o pid através do emissor de eventos.
   *
   * @param port String Porta na qual deve ser verificado se tem uma API sendo executada
   * @returns new Promise(null)
   */
  public async getPidCurrentProcess(port: string): Promise<any> {
    this.execCommand('netstat -ona | findstr :' + port).then(data => {
      try {

        const pid = data.split('LISTENING ')[1].split('TCP ')[0].trim(); // Pega o pid.

        Emissor.pidProcessoAtual.emit(Number(pid));
        Emissor.currentStatus.emit({
          status: TypeOfStatus.EscutandoApi,
          isShowLoadingBar: false,
          color: ColorsOfStatus.EscutandoApi,
          message: MessagesOfStatus.EscutandoApi,
        });

      } catch (error) { let erro; erro = error; Emissor.pidProcessoAtual.emit('--'); }
    }).catch(error => {

      console.log('Nenhuma API rodando...');
      Emissor.pidProcessoAtual.emit('--');

    });
    return new Promise(null);
  }

  public async instalaNodeModules(caminho: string) {
    setTimeout(() => {
      Emissor.currentStatus.emit({
        status: TypeOfStatus.OutroStatus,
        message: 'Localizando pasta',
        color: ColorsOfStatus.OutroStatus, isShowLoadingBar: true
      });
      this.execCommand('cd ' + caminho).then(output => {

        Emissor.currentStatus.emit({
          status: TypeOfStatus.OutroStatus,
          message: 'Executando npm install',
          color: ColorsOfStatus.OutroStatus, isShowLoadingBar: true
        });

        this.execCommand('npm i').then(() => {

          Emissor.currentStatus.emit({
            status: TypeOfStatus.OutroStatus,
            message: 'Npm install executado com sucesso',
            color: ColorsOfStatus.OutroStatus, isShowLoadingBar: false
          });

        }).catch(err => {
          console.log(err);
          Emissor.currentStatus.emit({
            status: TypeOfStatus.OutroStatus,
            message: 'Npm install finalizado com avisos',
            color: ColorsOfStatus.OutroStatus, isShowLoadingBar: false
          });
        });


      }).catch(err => {
        console.log(err);
      });
    }, 2000);
  }

  private execCommand(command: string): Promise<any> {
    return new Promise((a, r) => {
      child_process.exec(command, (err, stdout) => {
        if (err) { r(err); } else { a(utf8.encode(stdout)); }
      });
    });
  }
}
