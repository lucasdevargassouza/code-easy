import { Component, OnInit } from '@angular/core';
import { remote } from 'electron'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    remote.dialog.showOpenDialog({ properties: ['openDirectory'] });
  }

}
