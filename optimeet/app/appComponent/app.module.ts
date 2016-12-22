import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

// used to create fake backend
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import {HomeComponent} from "../home/index";
import {LoginComponent} from "../login/login.component";

import {RegisterComponent} from "../register/register.component";
import {AlertComponent} from "../directives/alert.component";
import {AuthGuard} from "../guards/auth.guard";
import {AlertService} from "../services/alert.service";
import {AuthenticationService} from "../services/authentication.service";
import {UserService} from "../services/user.service";
import {fakeBackendProvider} from "../helpers/fake-backend";
import {MyMeetingsComponent} from "../myMeetingsComponent/my.meetings.component";
import {ApproveMeetingCompponent} from "../approveMeetingComponent/approve.meeting.component";
import {NewMeetingCompponent} from "../newMeetingComponent/new.meeting.component";
import {MeetingService} from "../services/meeting.service";
import {GlobalEventsManager} from "../GlobalEventsManager";
import {AgmCoreModule} from "angular2-google-maps/core";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBnGibaZ8hYzJ-YMHRJtPGS8_hEwIC9dNA'
    })
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MyMeetingsComponent,
    ApproveMeetingCompponent,
    NewMeetingCompponent
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    MeetingService,
    GlobalEventsManager,

    // providers used to create fake backend
    //fakeBackendProvider,
    //MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
