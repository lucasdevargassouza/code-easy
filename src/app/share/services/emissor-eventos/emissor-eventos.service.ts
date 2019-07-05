import { Injectable, EventEmitter  } from '@angular/core';
import { ResourcesTreeInterface } from '../resources-tree.interface';

@Injectable({
  providedIn: 'root'
})

export class Emissor {
  public static itemSelectedLocation = new EventEmitter<number[]>();
  public static srcGlobal = new EventEmitter<ResourcesTreeInterface>();
  public static currentStatus = new EventEmitter<string>();

  constructor() {}
}
