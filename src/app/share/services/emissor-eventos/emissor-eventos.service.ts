import { Injectable,EventEmitter  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Emissor {
  public static itemSelectedLocation = new EventEmitter<[any]>();

  constructor() {
    Emissor.itemSelectedLocation.emit([{"0": "teste"}]);
  }
}
