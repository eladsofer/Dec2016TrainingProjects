import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/index';
import {user} from "../models/user.model";
import {Meeting} from "../models/meeting.model";
import {MeetingService} from "../services/meeting.service";
import {AlertService} from "../services/alert.service";

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: user;
    users: user[] = [];
    meetingList: Meeting[] = [];

    constructor(private userService: UserService, private meetingService: MeetingService, private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
      this.meetingService.getByUser(this.currentUser.id)
        .then(meeting => {
          if(meeting == null || meeting.length == 0)
          {
            this.alertService.error("No meetings for you");
          }
          else {
            this.meetingList = meeting;
          }
        }).catch(error => {
        this.alertService.error(error);
      });


      }
}
