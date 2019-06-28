import { Injectable } from '@angular/core';
import { TranspilerService } from '../transpiler/transpiler.service';
import { ResourcesTreeInterface } from '../resources-tree.interface';

@Injectable({
  providedIn: 'root'
})
export class CompilerService {

  constructor(
    private transpiler: TranspilerService,
  ) { }

  private async genereteFiles(srcGlobal: ResourcesTreeInterface[]) {
    let files = [
      {
        fileName: 'package',
        extensao: 'json',
        packageJson: this.transpiler.getPackageJson(srcGlobal)
      },
      {
        fileName: 'server',
        extensao: 'js',
        packageJson: this.transpiler.getContentServidor(srcGlobal)
      },
      {
        fileName: 'rotas',
        extensao: 'js',
        packageJson: this.transpiler.getContentRotas(srcGlobal)
      },
    ];
  }

  private async salvandoFiles() {

  }
}
