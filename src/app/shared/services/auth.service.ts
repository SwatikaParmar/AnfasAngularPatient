import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ApiEndPoint } from '../enums/api-end-point.enum';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Login>;
  public currentUser: Observable<Login>;               
  constructor(private http: HttpClient,         
    private router: Router) {                 
    this.currentUserSubject = new BehaviorSubject<Login>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }                                                 
                                          
  public get currentUserValue(): Login {
    return this.currentUserSubject.value;       
  }              

  login(user: any) {    
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.login,user)
      .pipe(map(user => {
        if (user.data) {   
          debugger  
          localStorage.setItem('currentUser', JSON.stringify(user.data));
          localStorage.setItem('loginRole', user.data.role);
          localStorage.setItem('fname', user.data.patient.firstName);
          localStorage.setItem('lname', user.data.patient.lastName);
          localStorage.setItem('mrn', user.data.patient.mrn);
          //   localStorage.setItem('distributorId', user.data.distributorId);
          this.currentUserSubject.next(user);
        } else {
          this.router.navigateByUrl('/login');          
        }                
        return user;
      }));
  }


  patientDetails(data: any) {
    let query = '';
    if (data.mrn) {
      query = '?Mrn=' + data.mrn;
    } else if (data.mobilePhone) {
      query = '?MobilePhone=' + data.mobilePhone;
    } else if (data.nationalId) {
      query = '?NationalId=' + data.nationalId;
    }
  
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.patientDetail + query);
  }
  

 
  logout() {
    localStorage.clear();
    this.router.navigate(['/home-page'])
      .then(() => {      
        window.location.reload();
      });
  }
  // otp(data:any){
  //   return this.http.post<any>(environment.apiUrl + ApiEndPoint. emailOtp,data)
  // }

}
