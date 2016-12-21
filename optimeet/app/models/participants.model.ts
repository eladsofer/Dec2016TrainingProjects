import {MeetingResponse} from "./meeting.response.model";
import {DateSuggestion} from "./date.suggestion.model";

export class Participants {
  Id: number;
  UserId: number;
  response: DateSuggestion[];
}
