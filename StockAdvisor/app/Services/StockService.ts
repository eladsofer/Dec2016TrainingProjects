import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Stock} from "./Stock";

@Injectable()
export class StockService {
  private allStockServiceUrl="/stocks/";
  private stockByIdUrl="/stock/";
  private stocksByUserIdUrl = "/stocks/user/:id";

  constructor(private http: Http)
  {}

  getStockById(id:number): Promise<Stock> {
    return this.http.get(this.stockByIdUrl + id).toPromise().then(res => res.json());
  }

  getAllStocks(): Promise<Stock[]> {
    return this.http.get(this.allStockServiceUrl).toPromise().then(res => res.json());
  }

  getStocksByUserId(): Promise<Stock[]> {
    return this.http.get(this.stocksByUserIdUrl).toPromise().then(res => res.json());
  }
}
