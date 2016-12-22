import {Component, Input,Output,EventEmitter} from '@angular/core';
import {AgendaItem} from "../model/agenda.item";
import {TaskItem} from "../model/task.item";

@Component({
  moduleId: module.id,
  selector: 'honey-agenda',
  styles : [`
        :host {
            display: block;
        }
    `],
  templateUrl: "agenda.component.html"
})
export class AgendaComponent
{
  name = 'Agenda';
    public address : Object;
    @Input() agendaList: AgendaItem[]
    newItem:TaskItem = {name:"",location:null,time:""};
    @Output() addTask =new EventEmitter();
    @Output() onShowLocation = new EventEmitter<ShowLocationArgs>();

    AddTaskItem(item:any){
        console.log(this.newItem);
        this.addTask.emit(this.newItem);
        this.newItem = {name:"",location:null,time:""};
    }

    getAddress(place:Object) {
        this.address = place['formatted_address'];
        var location = place['geometry']['location'];
        var lat =  location.lat();
        var lng = location.lng();
        this.newItem.location=[lat,lng];
        console.log("Address Object", place);
    }

    showLocation(location:number[]) {
        this.onShowLocation.emit({
            location: location
        });
    }
}

export interface ShowLocationArgs {
    location: number[];
}
