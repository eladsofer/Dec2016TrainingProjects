import { Component } from '@angular/core';
import {User} from "./Services/User";
import {UserService} from "./Services/UserService";

@Component({
  styleUrls: ["app.component.css"],
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: "app.component.html"
})
export class AppComponent  {
  users : User[]
  constructor(private userService:UserService) {
  }

  ngOnInit() {
    this.userService.getUserById(1).then(user => {
      this.users = [user];
    }).catch(err => {
      console.log(err.message);
    });
  }
}
