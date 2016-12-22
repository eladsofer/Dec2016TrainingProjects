// Observable Version
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {ChatItem} from "../model/chat.item";
import {User} from "../model/user";
import {TaskItem} from "../model/task.item";

@Injectable()
export class HoneyService {
  private serverUrl = 'http://192.168.100.36:3000/';  // URL to web API

  constructor (private http: Http) {}

  getChatItems (): Promise<ChatItem[]> {
    return this.http.get(this.serverUrl + "getchat?last=")
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }


  addChatItem (chatItem: ChatItem): Promise<ChatItem> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.serverUrl + "sendchat", { chatItem: chatItem }, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  addUser(user:User): Promise<string>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.serverUrl + "addUser", { user: user }, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getUser (userId:string): Promise<User> {
    return this.http.get(this.serverUrl + "getUser?id="+userId)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  setUser(user:User): Promise<User>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.serverUrl + "setUser", { user: user }, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getTaskItems():Promise<TaskItem[]>{
    return this.http.get(this.serverUrl+"gettasks")
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  addTask(task:TaskItem):Promise<TaskItem>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.serverUrl+"addtask", { task: task }, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || body;
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}

/*
 private heroesUrl = 'app/heroes.json'; // URL to JSON file
 */


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
