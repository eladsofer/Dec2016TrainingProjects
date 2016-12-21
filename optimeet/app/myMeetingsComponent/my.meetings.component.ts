import {Component, Input, OnInit} from '@angular/core';
import {Meeting} from "../models/meeting.model";
import {user} from "../models/user.model";
import {UserService} from "../services/user.service";

@Component({
  moduleId: module.id,
  selector: 'my-meetings',
  templateUrl: 'my.meetings.component.html'
})
export class MyMeetingsComponent implements OnInit{
  @Input()
meetingList: Meeting[];
  @Input()
  currentUser: user;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.loadMyMeetings();

  }
  private loadMyMeetings() {
    //this.userService.getAllMeetingsForUser(this.currentUser.id).subscribe(myMeetings => { this.meetingList = myMeetings; });
  }
}
