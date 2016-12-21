import {Component, Input, ViewChild} from '@angular/core';
import {UserService} from "../Services/UserService";
import {User} from "../Services/User";
import {Review} from "../Services/Review";
import {ReviewService} from "../Services/ReviewService";
import {ModalComponent} from "ng2-bs3-modal/components/modal";

@Component({
  styleUrls: ["userprofilecomponent.css"],
  moduleId: module.id,
  selector: 'user-profile',
  templateUrl: "userprofilecomponent.html"
})
export class UserProfileComponent {
  @Input("profile-user") user : User;
  @Input("is-collapsed") isCollapsed : boolean;
  @ViewChild('fullModal') fullModal : ModalComponent;
  isFullModalOpen : boolean;

  userReviews: Review[];
  constructor(private userService:UserService, private reviewService:ReviewService) {

  }

  ngOnInit() {
    this.reviewService.getAllReviewsByUserId(this.user.id).then(reviews => {
      this.userReviews = reviews;
    }).catch(err => {
      console.log(err.message);
    });
  }

  onFullViewClicked() {
    this.fullModal.open();
    this.isFullModalOpen = true;
  }
}
