///<reference path="../../dm/patient.ts"/>


import { Component ,Input} from '@angular/core';

import {Patient} from "../../dm/patient";
import {PatientService} from "../../services/patientService";
import {Router} from '@angular/router';
import {SimptomsService} from "../../services/simptomsService";
import {Simptom} from "../../dm/simptom";
import {PatientRequest} from "../../dm/patientRequest";
import {Suggestion} from "../../dm/suggestion";
import {RequestStatus} from "../../dm/requestStatusEnum";


@Component({
  selector: 'doctor',
  styleUrls: ['app/components/doctor.commponents/doctor.commponent.css'],
  templateUrl: "app/components/doctor.commponents/doctor.commponent.html",
})
export class Doctor  {
  public isDoctorView:boolean;
  public patient: Patient;
  public patientRequest: PatientRequest;
  public  symptoms:Simptom[];
  suggestions: Suggestion[];

  public  requestStatus:string;
  constructor(private simptomsService:SimptomsService, private patientService:PatientService,private route:Router){
    this.isDoctorView = patientService.getUserStatus();

    this.patient = {id:null,name:null};
    this.suggestions= [];

    this.patientRequest ={  patient: null, symptoms: [], status: null,suggestions:null};
    patientService.getPatient().then((user:Patient) =>{
      if(user == undefined || user.id == undefined || user.name == undefined) {
        this.route.navigate(['login']);


      }
      else{
        this.patient = user;
        this.getPatientRequest();
      }

    });

  }

  getPatientRequest(){
    if(this.patient!=null && this.patient!=undefined) {
      this.patientService.getPatientRequest(this.patient).then((patientRequest: any) => {


        this.patientRequest = patientRequest._source;
        this.symptoms = this.patientRequest.symptoms;
        this.requestStatus = this.getRequestStatus();
        if (this.patientRequest.status == RequestStatus.Handled) {
          this.isDoctorView = false;
        }


      });
    }

  }

  suggestionClicked(e: any){
    let s: Suggestion = e.value;
    if(this.suggestions.indexOf(s) > -1) {
      this.suggestions.splice(this.suggestions.indexOf(s),1);
    }
    else{
      this.suggestions.push(s);
    }
    // console.log(i.value);
    // let s = i.value;
    // this.suggestions.push(i.value);
  }

  updateRequest() {
    this.patientRequest.suggestions = this.suggestions;
    this.patientService.updatePatientRequest(this.patientRequest).then((data: any) => {
      this.patientRequest = data;
      this.symptoms = this.patientRequest.symptoms;
      this.isDoctorView = false;
      this.requestStatus = this.getRequestStatus();

    }).catch(err => {
    });
    return false
  }

  getRequestStatus(){
    if(this.patientRequest.status == RequestStatus.New || this.patientRequest.status == RequestStatus.Processing){
      return "ממתינה לתשובת הרופא";
    }
    else{
      return "בקשה הושלמה";
    }
  }

  GoToLogin() {
    this.route.navigateByUrl('login');
  }

}

