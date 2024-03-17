import { Component, ElementRef,ChangeDetectorRef} from '@angular/core';
import { TaskService } from '../task.service';
import { IdServiceService } from '../id-service.service';
import { ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../class/task';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent  {
  task:boolean = false;
  selectedPerformers: string[] = [];
  choosePerformer:boolean = false;
  taskPerformers: string[] = [];
  currentDate:string;
  selectPerformers:boolean = false;
  actualTaskId:number = 0;

  subscription:Subscription;

  @ViewChild('taskTitle')taskTitle!:ElementRef;
  @ViewChild('taskName')taskName!:ElementRef;
  @ViewChild('taskDeadline')taskDeadline!:ElementRef;
  @ViewChild('taskPriority')taskPriority!:ElementRef;
  @ViewChild('taskPerformer')taskPerformer!:ElementRef;
  @ViewChild('selectPerfomer')selectPerfomer!:ElementRef;
  
  @ViewChild('submitInput')submitInput!:ElementRef;
  

  @ViewChild('readyTaskStatus')readyTaskStatus:any;

  

  constructor(protected taskService: TaskService,private cdr: ChangeDetectorRef, private idService: IdServiceService) {
    this.currentDate = new Date().toISOString().substring(0, 10);
    this.subscription = this.taskService.isFormVisible.subscribe((isVisible)=>{
      this.task = isVisible;
    })
  }

  public addTask():void{  
    // this.cdr.detectChanges();
    if (this.taskName.nativeElement.value == '') {
      this.taskService.closeForm();
    } else {
      const newTask = new Task(
        this.taskTitle.nativeElement.value,
        this.taskName.nativeElement.value,
        new Date(this.taskDeadline.nativeElement.value),
        this.taskPriority.nativeElement.value,
        this.taskPerformer.nativeElement.value.split(',')
      )
      this.idService.generateId(newTask);
      this.taskService.addTaskArray(newTask);
      console.log(newTask)
      this.taskService.closeForm();
    }
  } 

  public visibleForm():void{
    this.taskService.showForm();
    this.cdr.detectChanges();// принудительная проверка изм. в компоненте
    this.selectedPerformers=[];
    this.choosePerformer = false;
    this.submitInput.nativeElement.value = 'Добавить задачу';
  }

  //выбор исполнителей при создании задачи
  public togglePerformer(performer:string):void{
    if(this.selectedPerformers.includes(performer)){
      let index = this.selectedPerformers.indexOf(performer);
      this.selectedPerformers.splice(index,1);
    } else {
      this.selectedPerformers.push(performer);
    }
  }

  //метод для показа меню выбора исполнителей на главной странице
  public showPerfomer($event:any,task:Task) {
    this.actualTaskId = task.id;
    this.selectPerformers = !this.selectPerformers;
    this.cdr.detectChanges();
    console.log($event);
    this.selectPerfomer.nativeElement.style.left = `${$event.clientX}px`;
    this.selectPerfomer.nativeElement.style.top = `${$event.clientY}px`;
    // this.selectPerfomer.nativeElement.setAttribute('id',`${task.id}`);


    const closeSelectPerformer = (event: any) => {
      if (event.target.parentNode.className != "select-performer-option_1" && event.target.parentNode.className != "select-performer-option_2" && !event.target.closest(".select-performer") ) {
        console.log(event.target.parentNode )
        this.selectPerformers = false;
        window.removeEventListener('click', closeSelectPerformer);
      }
    }
    // сет таймаут тут потому что  вызывалось событие на клик window сразу же после события открытия выбора исполнителей
    setTimeout(()=>{
      window.addEventListener('click',closeSelectPerformer);
    },0)
  }

  searchPerfomer(performer:string):boolean {
    const task = this.taskService.searchTask(this.actualTaskId);
    if(task) {
      for (let perf of task.performers) {
        if(perf === performer) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }
}

