import {Component} from '@angular/core';
import {StockService} from "../Services/StockService";
import {Stock} from "../Services/Stock";

@Component({
  styleUrls: ["stockCatalog.component.css"],
  moduleId: module.id,
  selector: 'stocks-catalog',
  templateUrl: "stockCatalog.component.html"
})
export class StockCatalogComponent {
  allStocks : Stock[];
  constructor(private stockService : StockService) {
  }

  ngOnInit() {
    this.stockService.getAllStocks().then(stocks => {
      this.allStocks = stocks;
    }).catch(err => {
      console.log(err);
    })
  }
}
