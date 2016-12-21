import { Component, ElementRef, Input, EventEmitter, Output} from '@angular/core';
import {PatientRequest} from "../../dm/patientRequest";
import {SuggestionsService} from "../../services/suggestionsService";
import {Suggestion} from "../../dm/suggestion";
import {Patient} from "../../dm/patient";
import {PatientService} from "../../services/patientService";



@Component({
  selector: 'suggestions',
  styleUrls: ['app/components/suggestions/suggestions.component.css'],
  templateUrl: "app/components/suggestions/suggestions.component.html"
})
export class Suggestions  {
  @Output() suggestionClicked = new EventEmitter();
  request: PatientRequest;
  public suggestions:Suggestion[];
  DoctorSuggestions:Suggestion[];
  private patient:Patient;
  loading : boolean = true;
  constructor(private suggestionsService:SuggestionsService,private patientService:PatientService){
    this.DoctorSuggestions=[];
    this.getPatientRequest();
}


  getPatientRequest = () => {
    this.patientService.getPatient().then((user: Patient) => {

      this.patient = user;
      if(this.patient!=null && this.patient!=undefined) {
        this.patientService.getPatientRequest(this.patient).then((patientRequest: any) => {

          this.request = patientRequest._source;
          this.getSuggestionsForPatient();
        });
      }

    });
  }
    getSuggestionsForPatient = () =>{

      if (this.request != undefined && this.request != null) {
        this.suggestionsService.getSuggestionsForPatient(this.request).then((data: Suggestion[]) => {

          this.suggestions = data;
        });
      }
      setTimeout(()=>{ this.loading = false; }, 2000);

    }


  addDoctorSuggest(suggestion:Suggestion){
    this.suggestionClicked.emit({
      value: suggestion
    });

  }

}

