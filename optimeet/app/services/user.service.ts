import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {user} from "../models/user.model";


@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/api/user', this.jwt()).toPromise()
          .then(res => res.json());
    }

  getAllMeetingsForUser(id: number) {
    return this.http.get('/api/user/' + id + '/meetings', this.jwt()).map((response: Response) => response.json());
  }

    getById(id: number) {
        return this.http.get('/api/user/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: user) {
        return this.http.post('/api/user', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: user) {
        return this.http.put('/api/user/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/user/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
