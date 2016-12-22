import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {user} from "../models/user.model";
import {Meeting} from "../models/meeting.model";
import "rxjs/operator/toPromise";


@Injectable()
export class MeetingService {
    constructor(private http: Http) { }

    getAll(): Promise<Meeting[]> {
        return this.http.get('/api/meeting', this.jwt()).toPromise().then(res => res.json());
    }

    getById(id: number): Promise<Meeting> {
        return this.http.get('/api/meeting/' + id, this.jwt()).toPromise().then(res => res.json());
    }

  getByUser(id: number): Promise<Meeting[]> {
    return this.http.get('/api/meeting/user/' + id, this.jwt()).toPromise().then(res => res.json());
  }

    create(meeting: Meeting) {
        return this.http.post('/api/meeting', meeting, this.jwt()).toPromise().then(res => res.json());
    }

    update(meeting: Meeting) {
        return this.http.put('/api/meeting', meeting, this.jwt()).toPromise().then(res => res.json());
    }

    delete(id: number) {
        return this.http.delete('/api/meeting/' + id, this.jwt()).map((response: Response) => response.json());
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
