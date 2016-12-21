import "reflect-metadata";
import "zone.js";
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import {UserProfileComponent} from "./components/userprofilecomponent";
import {MaterialModule} from "@angular/material";
import {UserService} from "./Services/UserService";
import { HttpModule, JsonpModule } from '@angular/http';
import {ReviewComponent} from "./components/review.component";
import {CommentComponent} from "./components/comment.component";
import {ReviewService} from "./Services/ReviewService";
import {StockService} from "./Services/StockService";
import {StockComponent} from "./components/stock.component";
import {Ng2Bs3ModalModule} from "ng2-bs3-modal/ng2-bs3-modal";
import {StockCatalogComponent} from "./components/stockCatalog.component";
import {UsersComponent} from "./components/users.component";


@NgModule({
  imports: [BrowserModule,
    HttpModule,
    JsonpModule,
    MaterialModule.forRoot(),
    Ng2Bs3ModalModule],
  declarations: [
    AppComponent,
    UserProfileComponent,
    ReviewComponent,
    CommentComponent,
    StockComponent,
    StockCatalogComponent,
    UsersComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    UserService,
    ReviewService,
    StockService
  ]
})


export class AppModule { }
