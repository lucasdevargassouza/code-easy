import { Injectable } from '@angular/core';
import { ResourcesTreeInterface } from '../resources-tree.interface';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public initIndexPath(src: ResourcesTreeInterface[], indexPath?: number[]): ResourcesTreeInterface[] {

    for (let index = 0; index < src.length; index++) {

      src[index].indexPath.splice(0, src[index].indexPath.length);

      if (indexPath !== null && indexPath !== undefined) {
        indexPath.forEach(i => {
          src[index].indexPath.push(i);
        });
      }
      src[index].indexPath.push(index);

      if (src[index].itemList.length > 0) {
        src[index].itemList = this.initIndexPath(src[index].itemList, src[index].indexPath);
      }
    }

    return src;
  }
}
