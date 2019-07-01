import { Component, OnInit, Input } from '@angular/core';
import { remote } from 'electron';
import { Emissor } from '../../services/emissor-eventos/emissor-eventos.service';
import { CompilerService } from '../../services/compiler/compiler.service';
import { ResourcesTreeInterface } from '../../services/resources-tree.interface';

@Component({
  selector: 'app-top-bar-frame',
  templateUrl: './top-bar-frame.component.html',
  styleUrls: ['./top-bar-frame.component.scss']
})
export class TopBarFrameComponent implements OnInit {
  private srcGlobal: ResourcesTreeInterface[];
  @Input() tituloIde: string;

  private window = remote.getCurrentWindow();

  constructor(
    private compiler: CompilerService
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

}
