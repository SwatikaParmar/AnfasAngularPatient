import { HttpClient, HttpParams,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiEndPoint } from '../enums/api-end-point.enum';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ContentService {


  constructor(private http: HttpClient) { }

 
  getDoctors() {  
    return this.http.get<any>(environment.apiUrl +  ApiEndPoint.doctors)
  }

  patientDetails(data:any){
    debugger
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.patientDetail + '?Mrn=' + data)
  }

  getConsent(mrn:any){
    debugger
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.consentForm + '?mrn=' + mrn.mrn + '&language=' + mrn.language )
  }

  
  getVisit(data:any) {  
    return this.http.get<any>(environment.apiUrl +  ApiEndPoint.visitList + '?mrn=' + data + '&forPatient=true' + '&forDoctor=false')
  }


  getLab(data:any){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.LabReport + '?PatientUid=' + data.PatientUid 
      + '&PatientVisitUid=' + data.PatientVisitUid
    )
  }

  getRis(data:any){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.RisReport + '?PatientUid=' + data.PatientUid 
      + '&PatientVisitUid=' + data.PatientVisitUid
    )
  }

  getAppointment(data:any){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.appointment + '?mrn=' + data)
  }

}
