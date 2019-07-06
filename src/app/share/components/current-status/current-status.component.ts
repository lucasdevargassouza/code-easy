import { Component, OnInit } from '@angular/core';
import { Emissor } from '../../services/emissor-eventos/emissor-eventos.service';
import { CurrentStatus } from '../../services/emissor-eventos/interfaces.interface';

@Component({
  selector: 'app-current-status',
  templateUrl: './current-status.component.html',
  styleUrls: ['./current-status.component.scss']
})
export class CurrentStatusComponent implements OnInit {
  public currentStatus: CurrentStatus;

  constructor() { }

  ngOnInit() {
    Emissor.currentStatus.subscribe(
      (data: CurrentStatus) => {
        this.currentStatus = data;
      },
      error => console.log(error)
    );
  }

}