import { Injectable } from '@angular/core';
import * as child_process from 'child_process';
import * as utf8 from 'utf8';

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
    this.execCommand("start " + url);
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

  private execCommand(command: string): Promise<any> {
    return new Promise((a, r) => {
      child_process.exec(command, (err, stdout) => {
        if (err) { r(err); } else { a(utf8.encode(stdout)); }
      });
    });
  }
}
