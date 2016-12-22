import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import {Simptom} from "../dm/simptom";
import {Patient} from "../dm/patient";
import {PatientRequest} from "../dm/patientRequest";

@Injectable()
export class SimptomsService {
  constructor (private http: Http) {}

  private symptomsUrl = 'symptoms';

  getAllSimptoms (): Promise<Simptom[]> {
      return this.http.get(this.symptomsUrl)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
  }


  private extractData(res: Response) {
    let body = res.json();
    return body || { };
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
