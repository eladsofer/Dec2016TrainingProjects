import {Component, Input} from '@angular/core';
import {Simptom} from "../dm/simptom";

@Component({
  selector: 'symptoms-list',
  moduleId: module.id,
  templateUrl: "symptomsList.component.html",
})

export class SymptomsList {
  @Input() symptoms: Simptom[];

  constructor() {

  }

  remove(index: number) {
    this.symptoms.splice(index, 1);
  }
}
