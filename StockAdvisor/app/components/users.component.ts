import {UserService} from "../Services/UserService";
import {User} from "../Services/User";
import {Component} from "@angular/core";

@Component({
  styleUrls: ["users.component.css"],
  moduleId: module.id,
  selector: 'users-component',
  templateUrl: "users.component.html"
})
export class UsersComponent {
  allUsers : User[];

  constructor(private userService : UserService) {
  }

  ngOnInit() {
    this.userService.getAllUsers().then(users => {
      this.allUsers = users;
    }).catch(err => {
      console.log(err);
    })
  }
}
