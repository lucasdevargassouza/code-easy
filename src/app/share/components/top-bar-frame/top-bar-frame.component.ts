import { Component, OnInit, Input } from '@angular/core';
import { remote } from 'electron';
import { Emissor } from '../../services/emissor-eventos/emissor-eventos.service';

@Component({
  selector: 'app-top-bar-frame',
  templateUrl: './top-bar-frame.component.html',
  styleUrls: ['./top-bar-frame.component.scss']
})
export class TopBarFrameComponent implements OnInit {

  @Input() tituloIde: string;

  private window = remote.getCurrentWindow();

  constructor() { }

  ngOnInit() {
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
