import {Component, Input} from '@angular/core';
import {ReviewComment} from "../Services/ReviewComment";

@Component({
  styleUrls: ["comment.component.css"],
  moduleId: module.id,
  selector: 'comment-component',
  templateUrl: "comment.component.html"
})
export class CommentComponent {
  @Input('display-comment') comment : ReviewComment;
  constructor(/*private commentService:CommentService*/) {

  }

  ngOnInit() {
  }
}
