import {User} from "./User";
import {Review} from "./Review";

export interface ReviewComment {
  id : number,
  parentReview : number,
  commenter : number,
  date : string,
  text : string,
  score : number
}
