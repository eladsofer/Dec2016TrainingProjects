import {User} from "./User";
import {ReviewComment} from "./ReviewComment";
import {Stock} from "./Stock";

export interface Review {
  id : number,
  stock : Stock,
  postDate : string,
  content : string,
  owner : User,
  comments: ReviewComment[]
}
