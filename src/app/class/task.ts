import { Itask } from "../interface/task";
import { Prioritets } from "../enum/prioritets";
import { Perfomers } from "../enum/performers";
 export class Task implements Itask{
    id:number;
    title:string;
    name:string;
    deadline:Date;
    priority:Prioritets;
    status:boolean;
    performers:Perfomers[];
    constructor(taskTitle:string, taskName:string,taskDeadline:Date, taskPriority:Prioritets,taskPerformers:Perfomers[]) {
        this.id = 0;
        this.title = taskTitle;
        this.name = taskName;
        this.deadline = taskDeadline;
        this.priority = taskPriority;
        this.status = false;
        this.performers = taskPerformers;
    }
}