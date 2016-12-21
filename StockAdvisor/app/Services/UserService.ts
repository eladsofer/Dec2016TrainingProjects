import {User} from "./User";
import {UserStockRelation} from "./UserStockRelation";
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise'
import {Injectable} from "@angular/core";

@Injectable()
export class UserService {
  private userByIdServiceUrl="/user/";
  private allUsersServiceUrl = "/users/";

  constructor(private http: Http)
  {}

  getUserById(id:number): Promise<User> {
    return this.http.get(this.userByIdServiceUrl + id).toPromise().then(res => res.json());
  }

  getAllUsers(): Promise<User[]> {
    return this.http.get(this.allUsersServiceUrl).toPromise().then(res => res.json());
  }

  addUserStockRelation(relation: UserStockRelation):Promise<string>
  {
    return this.http.post("/user_stock_relation",relation).toPromise().then(res => res.json());
  }
}
