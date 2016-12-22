import { Component, Input } from '@angular/core';
import {Meeting} from "../models/meeting.model";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import {MeetingOptionResponse} from "../models/meeting.optional.time.single.model";
import {user} from "../models/user.model";
import {MeetingService} from "../services/meeting.service";
import {DateSuggestion} from "../models/date.suggestion.model";
import {AlertService} from "../services/alert.service";

@Component({
  moduleId: module.id,
  selector: 'approve-meeting',
  templateUrl: 'approve.meeting.component.html'
})

export class ApproveMeetingCompponent {

  private subscription: Subscription;
  currentUser: user;
  meeting: Meeting;
  lat: number = 51.678418;
  lng: number = 7.809007;
  currentUserIndex: number;
  currentUserResponse: boolean[];
  newUserResponse: DateSuggestion[] = [];
  displayDates: String[];


  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private meetingService: MeetingService, private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.meeting = new Meeting();
    this.currentUserResponse = [];
    this.displayDates = [];
  }

  ngOnInit() {

    // subscribe to router event
    this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => {
        this.meetingService.getById(param['id']).then(meeting => this.initMeeting(meeting));

      });
    }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }

  initMeeting(m: Meeting) {
    this.meeting = m;
    if(this.meeting.ParticipantsList) {
      this.currentUserIndex = this.getParticipantIndex(this.currentUser.id);
    }
    if(this.meeting.Suggestions) {
      for(var suggestionIndex = 0; suggestionIndex < this.meeting.Suggestions.length; suggestionIndex++) {
        this.currentUserResponse[suggestionIndex] = this.checkResponseForUser(this.currentUserIndex,suggestionIndex);
        this.displayDates[suggestionIndex] = this.prettyDate(new Date(this.meeting.Suggestions[suggestionIndex].date))
      }}
  }

  approveMeeting() {

  }

  getParticipantIndex(i: number) {

    for (var j = 0; j < this.meeting.ParticipantsList.length; j++) {
      if (this.meeting.ParticipantsList[j].UserId == i) {
        return j;
      }
    }
    //return error?
  }

  checkResponseForUser(participantIndex: number, suggestionIndex: number) {
    if (this.meeting.ParticipantsList[participantIndex].response) {
      for (var i = 0; i < this.meeting.ParticipantsList[participantIndex].response.length; i++) {
        if (this.meeting.ParticipantsList[participantIndex].response[i].date == this.meeting.Suggestions[suggestionIndex].date) {
          return true;
        }
      }
      return false;
    }
    else {
      return false;
    }
  }

  saveResponseToDB(userIndex: number, newUserResponseBoolean: boolean[]) {
    console.log("report to DB");

    // this.meeting.ParticipantsList[this.currentUserIndex].response = new <DateSuggestion>();
    for (var i = 0; i < this.meeting.Suggestions.length; i++) {
      if (newUserResponseBoolean[i]) {
        this.newUserResponse.push(this.meeting.Suggestions[i]);
        console.log(i+1);
      }
    }
    this.meeting.ParticipantsList[this.getParticipantIndex(userIndex)].response = this.newUserResponse;
    this.meetingService.update(this.meeting).then(data => {
      this.alertService.success('Saved!', true);
    }).catch(error => {
      this.alertService.error(error);
    });
  }

  prettyDate(d:Date): string{
    return [
        this.padLeft2(d.getDate()),
        this.padLeft2(d.getMonth()+1),
        this.padLeft2(d.getFullYear())
      ].join('/')+
      ' ' +
      [
        this.padLeft2(d.getHours()),
        this.padLeft2(d.getMinutes())
      ].join(':');
}
  padLeft2(n:number):string{
    if(n<10) {
      return "0" + n.toString();
    }else{
      return n.toString();
    }
}


}
