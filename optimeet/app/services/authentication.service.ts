import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {user} from "../models/user.model";

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string): Promise<user> {

        return this.http.post('/api/authenticate', { username: username, password: password })
          .toPromise()
          .then(res => res.json())
        .then(res => {
          let user = res._body;
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          else{
            throw new Error('Username or password is incorrect');
          }
        });
    }

    logout() {
        // remove user from local storage to log user out
         localStorage.removeItem('currentUser');
    }
}
