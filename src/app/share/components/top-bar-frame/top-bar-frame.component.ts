import { Component, OnInit, Input } from '@angular/core';
import { remote } from 'electron';
import { Emissor } from '../../services/emissor-eventos/emissor-eventos.service';
import { CompilerService } from '../../services/compiler/compiler.service';
import { ResourcesTreeInterface } from '../../services/resources-tree.interface';
import { DatabaseStorageService } from '../../services/database-storage/database-storage.service';

@Component({
  selector: 'app-top-bar-frame',
  templateUrl: './top-bar-frame.component.html',
  styleUrls: ['./top-bar-frame.component.scss']
})
export class TopBarFrameComponent implements OnInit {
  public srcGlobal: ResourcesTreeInterface[];
  @Input() tituloIde: string;

  private window = remote.getCurrentWindow();

  constructor(
    private compiler: CompilerService,
    private database: DatabaseStorageService,
  ) { }

  ngOnInit() {
    Emissor.srcGlobal.subscribe(
      data => {
        this.srcGlobal = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  public play() {
    this.compiler.iniciarAplicacao(this.srcGlobal);
  }

  public stop() {
    this.compiler.pararAplicacao(this.srcGlobal);
  }

  public closeIde() {
    this.window.close();
  }

  public minimizeIde() {
    this.window.minimize();
  }

  public toggleMaximizeIde() {
    if (this.window.isMaximized()) {
      this.window.unmaximize();
    } else {
      this.window.maximize();
    }
  }

  public descartarProjeto() {
    console.log('aqui');
    this.database.removeSrc();
  }

}
