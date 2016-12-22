import {MeetingOptionResponse} from "./meeting.optional.time.single.model";
export class MeetingResponse{
  Rsvp: string;
  RsvpByHour : MeetingOptionResponse[];
}
