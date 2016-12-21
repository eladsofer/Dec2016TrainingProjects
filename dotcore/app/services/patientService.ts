
import {Patient} from "../dm/patient";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {PatientRequest} from "../dm/patientRequest";
import {isUndefined} from "util";

@Injectable()
export class  PatientService {

  patient:Patient;

  isDoctor:boolean;
  constructor(private http:Http){
  }

  private patientsUrl = 'patients';

  getUserStatus = () => {
  return this.isDoctor;
  }
  setUserStatus = (IsDoctor:boolean) => {
    this.isDoctor =IsDoctor;
  }
  getPatient = (): Promise<Patient>  => {
    return Promise.resolve(this.patient);
  }

  setPatient = (patient:Patient): Promise<boolean>  => {
    this.patient = patient;
    return Promise.resolve(true);
  }

  getPatientFromServer = (): Promise<Patient>  => {
    return this.http.get("sdf"+this.patient.id).toPromise().then((data) =>{
    });
  }

  addPatientRequest (request: PatientRequest): Promise<string> {

    return this.http.post(this.patientsUrl, request)
      .toPromise()
      .then(this.handleAddPatientRequest)
      .catch(this.handleError);
  }

  updatePatientRequest (request: PatientRequest): Promise<string> {

    return this.http.put(this.patientsUrl, request)
      .toPromise()
      .then(this.handleAddPatientRequest)
      .catch(this.handleError);
  }

  getPatientRequest  (patient:Patient): Promise<PatientRequest> {
    if(patient!=undefined) {
      return this.http.get(this.patientsUrl + '/' + patient.id)
        .toPromise()
        .then(this.handleAddPatientRequest)
        .catch(this.handleError);
    }
    else{
      return Promise.resolve("error");
    }
  }

  private handleAddPatientRequest(res: Response) {
    let body = res.json();
    console.log(body);
    return body;
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
