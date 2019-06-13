import { Injectable,EventEmitter  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Emissor {
  public static itemSelectedLocation = new EventEmitter<[]>();

  constructor() {}
}
