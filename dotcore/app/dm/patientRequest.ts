import {Patient} from "./patient";
import {Simptom} from "./simptom";
import {RequestStatus} from "./requestStatusEnum";
import {Suggestion} from "./suggestion";

export interface PatientRequest{
  patient: Patient;
  symptoms: Simptom[];
  suggestions:Suggestion[]
  status: RequestStatus
}
