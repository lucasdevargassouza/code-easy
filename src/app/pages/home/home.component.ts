import { Component, OnInit, HostListener } from "@angular/core";
import { remote } from "electron";

import { CONSTS } from "./../../share/services/consts/consts.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  public src = [
    {
      "itemName": "Models",
      "isHaveChild": true,
      "itemList": [
        {
          "itemName": "Nome do modelo",
          "itemDescription": "",
          "isHaveChild": true,
          "itemList": [
            {
              "itemName": "Nome atributo",
              "isHaveChild": false,
              "itemProperties": {
                "type": "string",
                "required": true,
                "unique": true,
                "defaultValue": true
              }
            },
            {
              "itemName": "Nome atributo",
              "isHaveChild": false,
              "itemProperties": {
                "type": "string",
                "required": true,
                "unique": true,
                "defaultValue": true
              }
            }
          ]
        }
      ]
    },
    {
      "itemName": "Controllers",
      "itemDescription": "",
      "isHaveChild": true,
      "itemList": [
        {
          "itemName": "Nome da controler",
          "isHaveChild": false,
          "content": ""
        }
      ]
    },
    {
      "itemName": "Repository",
      "itemDescription": "",
      "isHaveChild": true,
      "itemList": [
        {
          "itemName": "Nome do repositório",
          "isHaveChild": false,
          "content": ""
        }
      ]
    },
    {
      "itemName": "Routers",
      "itemDescription": "",
      "isHaveChild": true,
      "itemList": [
        {
          "itemName": "Nome da rota",
          "isHaveChild": false,
          "controllerMethodo": "",
          "content": ""
        }
      ]
    },
    {
      "itemName": "Services",
      "itemDescription": "",
      "isHaveChild": true,
      "itemList": [
        {
          "itemName": "Nome do service",
          "isHaveChild": false,
          "content": ""
        }
      ]
    }
  ];
  
  constructor() {
    console.log(this.src)
  }

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
