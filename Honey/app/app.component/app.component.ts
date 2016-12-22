import {Component, ViewChild, OnInit} from '@angular/core';
import {AgendaComponent, ShowLocationArgs} from '../agenda.component/agenda.component';
import {AgendaItem} from "../model/agenda.item";
import {WhereAreYou} from "../where-r-u.component/where-r-u.component";
import {ChatItem} from "../model/chat.item";
import {TaskItem} from "../model/task.item";
import {User} from "../model/user";
import {HoneyService} from "../service/honey.service";

@Component({
  moduleId: module.id,
  styles : [`
        :host {
            display: block;
        }
    `],
  selector: 'honey-header',
  providers: [HoneyService],
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
  name = 'Honey';
  startloop:boolean = false;
  theUser:User = { id:null,partnerId:null,name:"", partnerName:"",location:[]};
  @ViewChild(WhereAreYou) whereAreYou: WhereAreYou

  agendaList: AgendaItem[]= [
    {agendaDate: new Date(), agendaTasks: [{name:"להתקשר לבנק",time:"10:20",location:null},{name: "לאסוף את הילד מהחוג",time: "17:20", location:[32.05,34.8423]}]},
    {agendaDate: new Date(), agendaTasks: [{name:"לקנות עוגה",time:"10:20",location:[32.024,34.850]},{name: "יום הולדת לאשתי",time: null, location:null}]}
  ];
  chatList:ChatItem[] = [
    {dateTime: new Date(),text:"הי מאמי",userId:1},
    {dateTime: new Date(),text:"אוהב אותך",userId:2}
  ];

  constructor(private honeyService:HoneyService){

  }

  ngOnInit() {
    document.getElementById("openModalButton").click();

  }

  ShowLocationFromTask($event:ShowLocationArgs){
    this.whereAreYou.ShowLocation($event.location)

  }

  addTask(item:TaskItem){
    console.log(item);
    let d = new Date(item.time);
    var arr = this.agendaList.filter(function(obj) {
      return obj.agendaDate.getDate() == d.getDate();
    })
    if(arr.length>0)
      arr[0].agendaTasks.push(item);
    else
      this.agendaList.push({agendaDate: d, agendaTasks: [{name:item.name,time:d.getTime().toString(),location:item.location}]})

    this.honeyService.addTask(item);
  }

  addChat(chatItem:ChatItem){
    this.chatList.push(chatItem);
    this.honeyService.addChatItem(chatItem);
  }
  addUser(){
    if(!this.theUser.id) {
      this.honeyService.addUser(this.theUser).then((data:string) => {
        this.theUser.id = data;
        let partner:User = {
          id:null,
          name:this.theUser.partnerName,
          partnerId:this.theUser.id,
          partnerName:this.theUser.name,
          location:[]};
        this.honeyService.addUser(partner).then((data:string) => {
          this.theUser.partnerId = data;
          partner.id = data;
          this.honeyService.setUser(partner);
          this.honeyService.setUser(this.theUser);
          this.startLoop();
        });
        });
    }
    else {
      this.honeyService.getUser(this.theUser.id).then((data)=> {
        let id= this.theUser.id;
        this.theUser = data;
        this.theUser.id = id;
        this.startLoop();
      });
    }



  }

  startLoop(){
    let self=this;
    setInterval(function() {
      self.honeyService.getUser(self.theUser.partnerId).then((data)=>{
          self.whereAreYou.ShowPartnerLocation(data.location);
        }
      );
      self.theUser.location = self.whereAreYou.getLocation();
      self.honeyService.setUser(self.theUser);
    },5000);
  }

}
