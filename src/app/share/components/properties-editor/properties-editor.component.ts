import { Component, OnInit, Input } from '@angular/core';

/**
 * Este componente.
 *
 * Conforme o endereço que ele receber por meio de um array de indexs,
 * pegará no local storage as nformações e setará novamente conforme sejam alteradas.
 *
 */

@Component({
  selector: 'app-properties-editor',
  templateUrl: './properties-editor.component.html',
  styleUrls: ['./properties-editor.component.scss']
})
export class PropertiesEditorComponent implements OnInit {
  @Input() itemLocation: [];

  constructor() {}

  ngOnInit() {
    console.log(this.itemLocation);
  }
}
