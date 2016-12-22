import {Component, Input, ViewChild} from '@angular/core';
import {Review} from "../Services/Review";
import {ReviewService} from "../Services/ReviewService";
import {ModalComponent} from "ng2-bs3-modal/components/modal";

@Component({
  styleUrls: ["review.component.css"],
  moduleId: module.id,
  selector: 'review-component',
  templateUrl: "review.component.html"
})
export class ReviewComponent {
  @Input('displayed-review') review : Review;
  @Input('is-collapsed') isCollapsed: boolean;
  @ViewChild('stockModal') stockModal : ModalComponent;
  @ViewChild('authorModal') authorModal : ModalComponent;
  isStockModalOpen : boolean;
  isAuthorModalOpen : boolean;

  constructor(private reviewService:ReviewService) {
  }

  ngAfterViewInit() {
    //console.log(!!this.myModal + " myModal");
  }

  onStockClick() {
    this.stockModal.open();
    this.isStockModalOpen = true;
  }

  onAuthorClick() {
    this.authorModal.open();
    this.isAuthorModalOpen = true;
  }
}
