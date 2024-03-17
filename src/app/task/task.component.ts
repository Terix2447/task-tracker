import { Component, OnInit } from '@angular/core';
import { Task } from '../class/task';
import { TaskService } from '../task.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  constructor(private taskService: TaskService) {}
  
  
}
