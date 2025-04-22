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
}
