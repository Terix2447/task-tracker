import { Injectable } from '@angular/core';
import { Task } from './class/task';
@Injectable({
  providedIn: 'root'
})
export class IdServiceService {
  public idCounter:number = 1;

  public generateId(task:Task):void{
    task.id = this.idCounter++;
  }
  constructor() { }
}
