import {Component, OnInit} from '@angular/core';
import {Meeting} from "../models/meeting.model";
import {Participants} from "../models/participants.model";
import {user} from "../models/user.model";
import {UserService} from "../services/user.service";
import {DayAndTime} from "../models/day.and.time.model";
import {MeetingService} from "../services/meeting.service";
import {AlertService} from "../services/alert.service";

@Component({
  moduleId: module.id,
  selector: 'new-meeting',
  templateUrl: 'new.meeting.component.html',
  styleUrls: ['new.meeting.component.css']

})
export class NewMeetingCompponent implements OnInit {
  name = 'new meeting';
  newMeeting: Meeting;
  users: user[] = [];
  days: any[] = [];
  currentUser: user;
  currentUserParticipant: Participants;

  constructor(private userService: UserService, private  meetingService: MeetingService, private alertService: AlertService) {
    this.newMeeting = new Meeting();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUserParticipant = new Participants();
    this.currentUserParticipant.UserId = this.currentUser.id;

    this.newMeeting.ParticipantsList = [this.currentUserParticipant];
    this.newMeeting.FromDate = new Date();
    this.newMeeting.ToDate = new Date();
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  addParticipant(): void {
    this.newMeeting.ParticipantsList.push(new Participants());
  }

  removeParticipant(index: number): void {
    this.newMeeting.ParticipantsList.splice(index, 1);
    if (this.newMeeting.ParticipantsList.length == 0) {
      this.addParticipant();
    }
  }

  private loadAllUsers() {
    this.userService.getAll().then(users => {
      this.users = users;
    });
  }


  private loadDays() {
    this.days = [{engName: 'Sunday'}, {engName: 'Monday'}, {engName: 'tuesday'}, {engName: 'wednesday'}, {engName: 'thursday'}, {engName: 'friday'}, {engName: 'saturday'}]
  }

  createMeeting() {
    this.meetingService.create(this.newMeeting)
      .then(data => {
        this.alertService.success('Meeting created successful', true);
      }).catch(error => {
      this.alertService.error(error);
    });
  }
}
