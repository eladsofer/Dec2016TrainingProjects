import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise'
import {Injectable} from "@angular/core";
import {Review} from "./Review";

@Injectable()
export class ReviewService {
  private reviewServiceUrl="/user_reviews/";
  private reviewsByUserUrl="/user/reviews/";
  private reviewsByStockUrl="/stock/reviews/";

  constructor(private http: Http)
  {}

  getReviewById(id:number): Promise<Review> {
    return this.http.get(this.reviewServiceUrl + id).toPromise().then(res => res.json());
  }

  getAllReviews(): Promise<Review[]> {
    throw Error("Not Implemented Yet");
  }

  getAllReviewsByUserId(userId: number): Promise<Review[]> {
    return this.http.get(this.reviewsByUserUrl + userId).toPromise().then(res => res.json());
  }

  getAllReviewsByStockId(stockId: number): Promise<Review[]> {
    return this.http.get(this.reviewsByStockUrl + stockId).toPromise().then(res => res.json());
  }
}
