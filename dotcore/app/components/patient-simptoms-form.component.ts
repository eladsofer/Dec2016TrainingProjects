import { Component } from '@angular/core';
import {Simptom} from "../dm/simptom";
import {Patient} from "../dm/patient";
import {SimptomsService} from "../services/simptomsService";
import {PatientService} from "../services/patientService";
import {isUndefined} from "util";
import {Router} from "@angular/router";
import {PatientRequest} from "../dm/patientRequest";
import {RequestStatus} from "../dm/requestStatusEnum";
import {SuggestionsService} from "../services/suggestionsService";


@Component({
  selector: 'patient-simptoms-form',
  moduleId: module.id,
  templateUrl: "patient-simptoms-form.component.html",
  styleUrls: ['login/login.css'],
})

export class PatientSimptomsForm {
  simptoms: Simptom[];
  allSimptoms: Simptom[];
  patient: Patient;
  flag: boolean;
  patientName:string;
  existingRequest: PatientRequest;

  constructor(private simptomsService:SimptomsService, private patientService:PatientService,
              private suggestionsService:SuggestionsService,  private route:Router) {
    this.patientName = '';
    patientService.getPatient().then((user:Patient) =>{
      if(user == undefined || user.id == undefined || user.name == undefined) {
        this.route.navigate(['login']);
      }
      else{
        this.patient = user;
        this.patientName = this.patient.name;
      }

    });

    //this.patient = {id: 99999,name:"Shaul",symptoms:null};
    this.flag = true;
    this.simptoms = [];
  }
  ngOnInit() {

    this.simptomsService.getAllSimptoms().then(simptoms => {
      this.allSimptoms = simptoms.sort(function(a,b) {return (a.description > b.description) ? 1 : ((b.description > a.description) ? -1 : 0);} );
    }).catch(err => {
    });
  }


  addSymptom(i: any){
    console.log(i.value);
    let s = i.value;
    this.simptoms.push(i.value);
  }


  remove(simptomToRemove: Simptom, index: number) {
    //console.log(index);
    //alert(contact.name);

    console.log(this.simptoms);

    this.simptoms.splice(index, 1);
  }

  save(form) {
    console.log("Valid: " + form.form.valid);
    let request: PatientRequest = {patient: this.patient, status: RequestStatus.New, symptoms: this.simptoms, suggestions: undefined};
    this.patientService.addPatientRequest(request).then((data: any) => {
      console.log(data);
      this.route.navigate(['doctor']);
      this.suggestionsService.getSuggestionsForPatient(request).then(suggestions => {
        console.log(suggestions);
      }).catch(err => {
      });
      //To Dd : Message success or failed to client

    }).catch(err => {
    });
    return false
  }

  GoToLogin() {
    this.route.navigateByUrl('login');
  }
}
