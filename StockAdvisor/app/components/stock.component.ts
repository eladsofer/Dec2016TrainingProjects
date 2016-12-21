import {Component, Input, ViewChild} from '@angular/core';
import {Stock} from "../Services/Stock";
import {StockService} from "../Services/StockService";
import {ReviewService} from "../Services/ReviewService";
import {Review} from "../Services/Review";
import {ModalComponent} from "ng2-bs3-modal/components/modal";

@Component({
  styleUrls: ["stock.component.css"],
  moduleId: module.id,
  selector: 'stock-main',
  templateUrl: "stock.component.html"
})
export class StockComponent {
  @Input("display-stock") stock : Stock;
  @Input("is-collapsed") isCollapsed : boolean;
  @ViewChild('collapsedStockModal') collapsedStockModal : ModalComponent;
  isCollapsedStockModalOpen : boolean;
  stockReviews: Review[];

  constructor(private stockService : StockService, private reviewService:ReviewService) {

  }

  getReviewsByStockId() {
    this.reviewService.getAllReviewsByStockId(this.stock.id).then(reviews => {
      this.stockReviews = reviews;
    }).catch(err => {
      console.log(err.message);
    })
  }

  ngOnInit() {
    this.getReviewsByStockId();
  }

  onCollapsedStockClick() {
    this.collapsedStockModal.open();
    this.isCollapsedStockModalOpen = true;
  }
}
