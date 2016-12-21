import { Component } from '@angular/core';
import {InitService} from "./services/initService";

@Component({
  selector: 'my-app',

  templateUrl: "./app/app.component.html",
})

export class AppComponent {
  name = 'Tal';

  constructor(private initService:InitService) {

  }

  initES() {
    this.initService.init();
  }
}
