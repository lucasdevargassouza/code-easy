import { Injectable } from '@angular/core';
import { ResourcesTreeInterface } from '../resources-tree.interface';
import { HttpClient } from '@angular/common/http';
import { Emissor } from '../emissor-eventos/emissor-eventos.service';

const shell = require('node-powershell');
const ps = new shell({ executionPolicy: 'Bypass', noProfile: true });

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
  ) { }

  public initIndexPath(src: ResourcesTreeInterface[], indexPath?: number[]): ResourcesTreeInterface[] {

    for (let index = 0; index < src.length; index++) {

      src[index].indexPath.splice(0, src[index].indexPath.length);

      if (indexPath !== null && indexPath !== undefined) {
        indexPath.forEach(i => {
          src[index].indexPath.push(i);
        });
      }
      src[index].indexPath.push(index);

      if (src[index].itemList.length > 0) {
        src[index].itemList = this.initIndexPath(src[index].itemList, src[index].indexPath);
      }
    }
    return src;
  }

  public finalizaProcessos(port: string): Promise<any> {

    ps.addCommand('netstat -ona | findstr :' + port);
    ps.invoke().then(data => {
      try {
        const pid = data.split('LISTENING ')[1].split('TCP ')[0].trim();
        console.log(pid);

        ps.addCommand('taskKill.exe /F /PID ' + pid);
        ps.invoke().then(() => {

          Emissor.currentStatus.emit({
            message: 'Execução da API finalizada!',
            color: '', isShowLoadingBar: false
          });

        }).catch(error => {  console.log(error); });
      } catch (error) { let erro; erro = error; }

    }).catch(error => {
      console.log(error);
    });

    return new Promise(null);
  }

  public async getPidCurrentProcess(port: string): Promise<any> {
    ps.addCommand('netstat -ona | findstr :' + port);
    ps.invoke().then(data => {
      try {

        const pid = data.split('LISTENING ')[1].split('TCP ')[0].trim();
        Emissor.pidProcessoAtual.emit(Number(pid));

      } catch (error) { let erro; erro = error; Emissor.pidProcessoAtual.emit('--'); }
    }).catch(error => {
      console.log(error);
      Emissor.pidProcessoAtual.emit('--');
    });
  }

  public initSugestions(src: ResourcesTreeInterface[]): ResourcesTreeInterface[] {

    src[2].itemList.forEach(rota => {
      rota.staticPropertiesList[4].propertieSugestions = [];
    });
    src[3].itemList.forEach(controller => {
      src[2].itemList.forEach(rota => {
        rota.staticPropertiesList[4].propertieSugestions.push({
            'sugestionsName': controller.staticPropertiesList[0].propertieValue,
            'sugestionsValue': controller.staticPropertiesList[0].propertieValue
        });
      });
    });

    return src;
  }
}
