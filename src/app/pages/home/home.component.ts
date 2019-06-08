import { Component, OnInit, HostListener } from "@angular/core";
import { remote } from "electron";

import { CONSTS } from "./../../share/services/consts/consts.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    //remote.dialog.showOpenDialog({ properties: ['openDirectory'] });
  }

  //#region Resize Divs
  private oldX = 0;
  private grabberColLeft = false;
  private grabberColRight = false;
  public widthColLeft = 300;
  public widthColRight = 300;

  public onMouseDownColLeft(event: MouseEvent) {
    this.grabberColLeft = true;
    this.oldX = event.clientX;
  }

  public onMouseDownColRight(event: MouseEvent) {
    this.grabberColRight = true;
    this.oldX = event.clientX;
  }

  @HostListener("document:mousemove", ["$event"])
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

  @HostListener("document:mouseup", ["$event"])
  public onMouseUp(event: MouseEvent) {
    this.grabberColLeft = false;
    this.grabberColRight = false;
  }

  //#endregion
}
