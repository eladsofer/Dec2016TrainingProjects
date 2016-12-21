import {Participants} from "./participants.model";
import {PlacesEnum} from "./enums";
import {DayAndTime} from "./day.and.time.model";
import {DateSuggestion} from "./date.suggestion.model";

export class Meeting{
  id: number;
  MeetingName: string;
  Desc:string;
  FromDate: Date;
  ToDate: Date;
  Duration: number;
  PlaceType: PlacesEnum;
  ParticipantsList: Participants[];
  Suggestions: DateSuggestion[];
  durationHours: number;

  constructor(){
    this.durationHours = 1;
  }
}

