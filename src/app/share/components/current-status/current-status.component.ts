import { Component, OnInit } from '@angular/core';
import { Emissor } from '../../services/emissor-eventos/emissor-eventos.service';

@Component({
  selector: 'app-current-status',
  templateUrl: './current-status.component.html',
  styleUrls: ['./current-status.component.scss']
})
export class CurrentStatusComponent implements OnInit {
  public currentStatus: string;

  constructor() { }

  ngOnInit() {
    Emissor.currentStatus.subscribe(
      (data: string) => {
        this.currentStatus = data;
      },
      error => console.log(error)
    );
  }

}
