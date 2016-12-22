import {Component, ElementRef, Input, EventEmitter, Output} from "@angular/core";
import {Simptom} from "../dm/simptom";

@Component({
  selector: 'symptoms-dropdown',
  moduleId: module.id,
  styleUrls: ["symptomsDropdown.component.css"],
  templateUrl: "symptomsDropdown.component.html",
  host: {
    '(document:click)': 'handleClick($event)',
  },
})

export class SymptomsDropdown {
  @Output() symptomAdded = new EventEmitter();
  @Input() simptoms: Simptom[];
  @Input() selectedSymptoms: Simptom[];

  query: string = "";
  filteredList = [];
  elementRef;

  constructor(myElement: ElementRef) {
    this.elementRef = myElement;
  }

  ngOnInit() {
    this.filteredList = this.simptoms;
  }

  filter() {
    if (this.query !== ""){
      this.filteredList = this.simptoms.filter(function(el) {
        if(el.description.toLowerCase().indexOf(this.query.toLowerCase()) != -1) {
          if(this.selectedSymptoms.indexOf(el) == -1) {
            return true;
          }
        }
        return false;
      }.bind(this));
    }else{
      this.filteredList = [];
    }
  }

  select(item){
    this.query = item.description;
    this.filteredList = [];
  }

  handleClick(event){
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if(!inside){
      this.filteredList = [];
    }
  }

  addSymptom(s: Simptom){
    this.query = s.description;
    this.filteredList = [];
    this.symptomAdded.emit({
      value: s
    })
  }
}
