import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component/app.component';
import {AgendaComponent}  from './agenda.component/agenda.component';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {WhereAreYou} from "./where-r-u.component/where-r-u.component";
import {ChatComponent} from "./chat.component/chat.component";
import {FormsModule} from "@angular/forms";
import {GoogleplaceDirective} from 'angular2-google-map-auto-complete/directives/googleplace.directive';
import {HoneyService} from "./service/honey.service";
import {HttpModule} from "@angular/http";

@NgModule({
  imports: [BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBnGibaZ8hYzJ-YMHRJtPGS8_hEwIC9dNA'
    })],
  declarations: [AppComponent, AgendaComponent, WhereAreYou, ChatComponent, GoogleplaceDirective],

  bootstrap: [AppComponent]
})
export class AppModule {
}
