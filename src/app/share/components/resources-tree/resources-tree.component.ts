import { Component, OnInit, Input,  } from '@angular/core';

@Component({
  selector: 'app-resources-tree',
  templateUrl: './resources-tree.component.html',
  styleUrls: ['./resources-tree.component.scss']
})
export class ResourcesTreeComponent implements OnInit {
  public showContent: Boolean = false;

  @Input() public objeto: any;
  public isHaveChild: Boolean;
  constructor() {
  }

  ngOnInit() {
    this.isHaveChild = this.objeto.isHaveChild as Boolean;
  }

  public toggleContent() {
    this.showContent = !this.showContent;
  }

}
