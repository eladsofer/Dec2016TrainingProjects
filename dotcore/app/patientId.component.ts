/**
 * Created by 012-user on 12/12/2016.
 */

import {Component} from "@angular/core";
import "../app/dm/patient.js";
import {Patient} from "./dm/patient";

@Component(
  {
    selector: "patient-id",
    moduleId: module.id,
    templateUrl: "./patientId.component.html"
  }
)

export class PatientId {
  patient : Patient;
  flag : boolean;

  constructor() {
    this.patient = {
      id: undefined,
      name: undefined,
    };
  };

  checkId() {
      console.log(this.patient.id);
  }
}

