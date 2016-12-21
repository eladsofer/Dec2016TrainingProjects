import {Component, Input,Output,EventEmitter} from '@angular/core';
import {ChatItem} from "../model/chat.item";
import {User} from "../model/user";

@Component({
  moduleId: module.id,
  selector: 'honey-chat',
  templateUrl: "chat.component.html",
  styleUrls:["chat.component.css"]
})
export class ChatComponent {
  @Input() chatList: ChatItem[];
  @Input() user: User;
  @Output() addChat =new EventEmitter();

  newChatItem:ChatItem = { text:"",userId:1, dateTime:null};

  onSend() {
    this.addChat.emit({userId:1,text:this.newChatItem.text,dateTime:new Date()});
    this.newChatItem.text="";

  }
}


