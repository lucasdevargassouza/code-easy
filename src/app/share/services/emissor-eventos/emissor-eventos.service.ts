import { Injectable, EventEmitter  } from '@angular/core';
import { ResourcesTreeInterface } from '../../interfaces/resources-tree.interface';
import { StatusBar } from '../../interfaces/status-bar';


@Injectable({
  providedIn: 'root'
})

export class Emissor {
  public static itemSelectedLocation = new EventEmitter<number[]>();
  public static srcGlobal = new EventEmitter<ResourcesTreeInterface>();
  public static currentStatus = new EventEmitter<StatusBar>();
  public static currentTab = new EventEmitter<string>();
  public static pidProcessoAtual = new EventEmitter<any>();
  public static listTools = new EventEmitter<any[]>();

  constructor() {}
}
