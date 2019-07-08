import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatabaseStorageService } from '../../services/database-storage/database-storage.service';

@Component({
  selector: 'app-input-label-type',
  templateUrl: './input-label-type.component.html',
  styleUrls: ['./input-label-type.component.scss']
})
export class InputLabelTypeComponent implements OnInit {

  @Input() @Output() propertieName = new EventEmitter();
  @Input() @Output() propertieType = new EventEmitter();
  @Input() @Output() propertiePlaceholder = new EventEmitter();
  @Input() @Output() propertieValue = new EventEmitter();
  @Input() @Output() propertieSugestions = new EventEmitter();
  @Input() @Output() index = new EventEmitter();

  constructor(
    private database: DatabaseStorageService,

  ) { }

  ngOnInit() {
  }

  
  // Em cada change salva os dados.
  public inputsOnChange() {
    this.propertieName.emit(this.propertieName);
    setTimeout(() => {
      this.database.updateSrc();
    }, 1);
  }
}
