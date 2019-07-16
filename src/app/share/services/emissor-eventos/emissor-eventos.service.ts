import { Injectable, EventEmitter  } from '@angular/core';
import { ResourcesTreeInterface } from '../resources-tree.interface';
import { CurrentStatus } from './interfaces.interface';


@Injectable({
  providedIn: 'root'
})

export class Emissor {
  public static itemSelectedLocation = new EventEmitter<number[]>();
  public static srcGlobal = new EventEmitter<ResourcesTreeInterface>();
  public static currentStatus = new EventEmitter<CurrentStatus>();
  public static pidProcessoAtual = new EventEmitter<any>();

  constructor() {}
}
