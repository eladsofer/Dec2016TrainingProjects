
import { Component ,Input} from '@angular/core';

import {Patient} from "../../dm/patient";
import {PatientService} from "../../services/patientService";
import {Router} from '@angular/router';
import {isUndefined} from "util";
import {PatientRequest} from "../../dm/patientRequest";


@Component({
  selector: 'login',
  styleUrls: ['app/components/login/login.css'],
  templateUrl: "app/components/login/login.html"
})
export class Login  {
  loginPatient:Patient;

  constructor(private service:PatientService,private route:Router){

    this.loginPatient = { id:null,name:null};
  }


  EnterUser = (isDoctor:boolean) => {

    if (this.loginPatient.id!=undefined && this.loginPatient.name !=undefined && this.loginPatient.id.toString() != "" && this.loginPatient.name != '') {
      this.service.setPatient(this.loginPatient);

      this.service.setPatient(this.loginPatient).then((response: boolean) => {
        if (response) {
          this.service.setUserStatus(isDoctor);

          this.service.getPatientRequest(this.loginPatient).then((patientRequest: any) => {
            if (patientRequest != undefined && patientRequest != null && patientRequest._source.symptoms.length > 0) {
              this.route.navigateByUrl('doctor');
            }
            else {
              if (isDoctor) {

                alert('משתמש אנו קיים');
              }
              else {
                this.route.navigateByUrl('patient');
              }
            }
          }).catch(() => {
            if (isDoctor) {

              alert('משתמש אנו קיים');
            }
            else {
              this.route.navigateByUrl('patient');
            }

          });
        }

      });


    }
  }

  isDisableButtons(){
    if (this.loginPatient.id==undefined || this.loginPatient.name ==undefined || this.loginPatient.id.toString() == "" || this.loginPatient.name == '' ) {

      return true;
    }

    return !(parseInt(this.loginPatient.id.toString()) == this.loginPatient.id);
  }
}
