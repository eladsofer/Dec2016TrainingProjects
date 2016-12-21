import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import {SymptomsList} from "./components/symptomsList.component";
import {Login} from "./components/login/login";
import {FormsModule } from  '@angular/forms';
import {PatientSimptomsForm} from "./components/patient-simptoms-form.component";
import {SymptomsDropdown} from "./components/symptomsDropdown.component";
import {HttpModule} from "@angular/http";
import {SimptomsService} from "./services/simptomsService";
import {PatientService} from "./services/patientService";
import {RouterModule, Routes}   from '@angular/router';
import {Doctor} from "./components/doctor.commponents/doctor.commponent";
import {InitService} from "./services/initService";
import {SuggestionsService} from "./services/suggestionsService";
import {Suggestions} from "./components/suggestions/suggestions.component";

const appRoutes: Routes = [
  { path: 'login', component: Login },
  { path: 'patient', component: PatientSimptomsForm },
  { path: 'doctor', component: Doctor },
  { path: '', component: Login },
  { path: '**', component: Login }
];

@NgModule({
  imports:      [ BrowserModule,FormsModule,RouterModule.forRoot(appRoutes),HttpModule ],
  declarations: [ AppComponent, SymptomsList,Login ,PatientSimptomsForm, SymptomsDropdown,Doctor,Suggestions ],
  bootstrap:    [ AppComponent ],
  providers:    [ PatientService, SimptomsService, InitService, SuggestionsService]
})
export class AppModule { }
