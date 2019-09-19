import { Component, OnInit } from '@angular/core';
import { Emissor } from '../../services/emissor-eventos/emissor-eventos.service';
import { StatusBar } from '../../interfaces/status-bar';

@Component({
  selector: 'app-current-status',
  templateUrl: './current-status.component.html',
  styleUrls: ['./current-status.component.scss']
})
export class CurrentStatusComponent implements OnInit {
  public currentStatus: StatusBar;

  constructor() { }

  ngOnInit() {
    Emissor.currentStatus.subscribe(
      (data: StatusBar) => {
        this.currentStatus = data;
      },
      error => console.log(error)
    );
  }

}
