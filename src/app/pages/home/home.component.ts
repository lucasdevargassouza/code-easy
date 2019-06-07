import { Component, OnInit, HostListener } from "@angular/core";
import { remote } from "electron";

import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  private x = 100;
  private oldX = 0;
  private grabber = false;
  public width = 150;
  
  constructor() { }

  ngOnInit() {
    //remote.dialog.showOpenDialog({ properties: ['openDirectory'] });
  }

  onResizeEnd(event: ResizeEvent): void {
    this.width = event.rectangle.width;
  }


  /* @HostListener('document:mousedown', ['$event']) */
  onMouseDown(event: MouseEvent) {
    this.grabber = true;
    this.oldX = event.clientX;
  }
  
  @HostListener("document:mousemove", ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.grabber) {
      return;
    }
    this.resizer(event.clientX - this.oldX);
    this.oldX = event.clientX;
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.grabber = false;
  }
  resizer(offsetX: number) {
    this.width += offsetX;
  }
}
