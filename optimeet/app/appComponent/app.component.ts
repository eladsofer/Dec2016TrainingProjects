import {Component, OnInit} from '@angular/core';
import {user} from "../models/user.model";
import {GlobalEventsManager} from "../GlobalEventsManager";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent  implements OnInit {
  currentUser: user;
  loginString: string;
  showNavBar: boolean = false;


  constructor(private globalEventsManager: GlobalEventsManager) {

    this.globalEventsManager.showNavBarEmitter.subscribe((mode)=>{
      // mode will be null the first time it is created, so you need to igonore it when null
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (mode !== null) {
        this.showNavBar = mode;
      }
      if(this.currentUser != null)
      {
        this.showNavBar = true;
        this.loginString = "Hello " + this.currentUser.username + ", logout"
      }

    });

  }

  ngOnInit() {
    if(this.currentUser != null)
    {
      this.showNavBar = true;
      this.loginString = "Hello " + this.currentUser.username + ", logout"
    }
  }

}
