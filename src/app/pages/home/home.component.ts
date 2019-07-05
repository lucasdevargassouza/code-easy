import { Component, OnInit, HostListener } from '@angular/core';

import { Emissor } from '../../share/services/emissor-eventos/emissor-eventos.service';
import { DatabaseStorageService } from '../../share/services/database-storage/database-storage.service';
import { HttpClient } from '@angular/common/http';

const fs = require('fs');


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public srcGlobal = [];

  private oldX = 0;
  private grabberColLeft = false;
  private grabberColRight = false;
  public widthColLeft = 300;
  public widthColRight = 300;

  constructor(
    private database: DatabaseStorageService,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    // remote.dialog.showOpenDialog({ properties: ['openDirectory'] });

    this.database.getSrc();

    Emissor.srcGlobal.subscribe(
      data => this.srcGlobal = data,
      error => console.log(error)
    );

    this.readFile();
  }

  //#region Resize Divs
  public onMouseDownColLeft(event: MouseEvent) {
    this.grabberColLeft = true;
    this.oldX = event.clientX;
  }

  public onMouseDownColRight(event: MouseEvent) {
    this.grabberColRight = true;
    this.oldX = event.clientX;
  }

  @HostListener('document:mousemove', ['$event'])
  public onMouseMove(event: MouseEvent) {
    if (this.grabberColLeft) {
      this.widthColLeft += event.clientX - this.oldX;
      this.oldX = event.clientX;
    }
    if (this.grabberColRight) {
      this.widthColRight -= event.clientX - this.oldX;
      this.oldX = event.clientX;
    }
  }

  @HostListener('document:mouseup', ['$event'])
  public onMouseUp(event: MouseEvent) {
    this.grabberColLeft = false;
    this.grabberColRight = false;
  }

  //#endregion

  private async readFile() {
    let pid = '--';
    setInterval(() => {
      if (this.srcGlobal) {
        if (this.srcGlobal[0].staticPropertiesList[4].propertieValue !== '') {

          try {
            fs.readFile(
              this.srcGlobal[0].staticPropertiesList[4].propertieValue + '\\' +
              this.srcGlobal[0].staticPropertiesList[0].propertieValue.toLocaleLowerCase().trim() +
              '.json', 'utf16le', function (err, data) {
                if (err) { pid = '--'; }
                pid = data.split('[ ')[1].split(' ]')[0].toString();
              }
            );
          } catch (error) {
            pid = '--';
          }

          this.http.get('http://localhost:' + this.srcGlobal[1].staticPropertiesList[2].propertieValue).subscribe(
            data => {},
            error => pid = '--'
          );

          this.srcGlobal[0].staticPropertiesList[5].propertieValue = pid;
        }
      }
    }, 3000);
  }
}
