import { ElementRef, Injectable } from '@angular/core';
import { Task } from './class/task';
import { BehaviorSubject } from 'rxjs';
import { Prioritets } from './enum/prioritets';
import { Perfomers } from './enum/performers';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public isFormVisible = new BehaviorSubject<boolean>(false);
  public taskArray: Task[] = [];

  prioritets:Object =  Prioritets;
  performers:Object = Perfomers;

  constructor() {}


  //метод поиска задачи по id
  public searchTask(id:number):Task | undefined {
    return this.taskArray.find(task => task.id === id);
  }

  //метод обработки выбора пользователем статуса или исполнителей
  public changeTasks(task:Task,option: any){
    if (task) {
      if (option.value == 'Выполнена') {
        task.status = true;
        console.log(task);
        const indexCompletedTask = this.taskArray.indexOf(task);
        this.taskArray.splice(indexCompletedTask,1);
        console.log(this.taskArray);
      }
    }
  }

  public addPerformer(id:number,performer:Perfomers):void{
    const task = this.searchTask(id);
    if(task) {
      task.performers.push(performer);
      console.log(task);
    }
  }

  public deletePerfomer(id:number,performer:Perfomers):void {
    const task = this.searchTask(id);
    if (task){
      const index = task.performers.indexOf(performer);
      task.performers.splice(index,1);
      console.log(task);
    }
  }

  public getObjectKeys(enums:Object){
    return Object.values(enums);
  }


  public addTaskArray(task:Task):void{
    this.taskArray.push(task)
  }

  //открыть форму заполнения задачи
  public showForm():void{
    this.isFormVisible.next(true);
  }

  //закрыть форму заполнения задачи
  public closeForm():void {
    this.isFormVisible.next(false);
  }


}
