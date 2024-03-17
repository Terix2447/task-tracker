import { Prioritets } from "../enum/prioritets";
import { Perfomers } from "../enum/performers";
export interface Itask {
    id:number;
    title:string;
    name:string;
    deadline:Date;
    priority:Prioritets;
    status:boolean;
    performers:Perfomers[];
}