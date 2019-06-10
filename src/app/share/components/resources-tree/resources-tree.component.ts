import { Component, OnInit, Input } from "@angular/core";

import { ResourcesTreeInterface } from "./resources-tree.interface";

@Component({
  selector: "app-resources-tree",
  templateUrl: "./resources-tree.component.html",
  styleUrls: ["./resources-tree.component.scss"]
})
export class ResourcesTreeComponent implements OnInit {
  public showContent: Boolean = false;

  @Input() objeto: ResourcesTreeInterface;

  constructor() {}

  ngOnInit() {
    if (this.objeto == undefined) {
      this.objeto = {
        itemName: "",
        isHaveChild: false,
        itemList: []
      };
    }
  }

  public toggleContent() {
    this.showContent = !this.showContent;
  }
}
