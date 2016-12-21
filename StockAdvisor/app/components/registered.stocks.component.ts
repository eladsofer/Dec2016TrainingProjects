import {User} from "../Services/User";
import {Input, Component} from "@angular/core";
import {Stock} from "../Services/Stock";
import {UserService} from "../Services/UserService";
import {ReviewService} from "../Services/ReviewService";
import {StockService} from "../Services/StockService";

@Component({
  styleUrls: ["registered.stocks.component.css"],
  moduleId: module.id,
  selector: 'registered-stocks',
  templateUrl: "registered.stocks.component.html"
})
export class RegisteredStocksComponent {
  @Input("logged-user") loggedUser : User;
  registeredStocks: Stock[];

  constructor(private stockService : StockService) {
  }

  getRegisteredStocksByUserId() {
    /*this.stockService.getRegisteredStocksByUserId(this.loggedUser.id).then(stocks => {
      this.registeredStocks = stocks;
    }).catch(err => {
      console.log(err.message);
    })*/
  }

  ngOnInit() {
    this.getRegisteredStocksByUserId();
  }
}
