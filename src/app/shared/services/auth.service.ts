import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

    setCurrentUser(data: any) {
    localStorage.setItem('currentUser', JSON.stringify(data));
    this.currentUserSubject.next(data);
  }


  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  // 🔥 SAVE USER TO STORAGE + BEHAVIORSUBJECT
  private saveUser(data: any) {
    localStorage.setItem('currentUser', JSON.stringify(data));
    this.currentUserSubject.next(data);
  }        

  // login(user: any) {    
  //   return this.http.post<any>(environment.apiUrl + ApiEndPoint.login,user)
  //     .pipe(map(user => {
  //       if (user.data) {   
            

  //         localStorage.setItem('role', 'Patient')
  //         //   localStorage.setItem('distributorId', user.data.distributorId);
  //         this.currentUserSubject.next(user);
  //       } else {
  //         this.router.navigateByUrl('/login');          
  //       }                
  //       return user;
  //     }));
  // }

Doctorlogin(user: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.doctorLogin, user)
      .pipe(
        map(res => {
          if (res?.data) {

            const doctorUser = {
              token: res.data.token,
              role: 'Doctor',
              doctor: res.data.doctor
            };

            this.saveUser(doctorUser);

            localStorage.setItem('role', 'Doctor');
            localStorage.setItem('dname', res.data.doctor.printName);
            localStorage.setItem('code', res.data.doctor.loginId);
            localStorage.setItem('loginId', res.data.doctor.loginId);

            return res;
          } else {
            this.router.navigateByUrl('/login');
            return null;
          }
        })
      );
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
  

 
 
  // otp(data:any){
  //   return this.http.post<any>(environment.apiUrl + ApiEndPoint. emailOtp,data)
  // }

    sendotp(data: any) {
  return this.http.post<any>(environment.apiUrl + ApiEndPoint.sendPhoneOtp, data);
}

  // ⭐ VERIFY OTP (Store token here)
  // ⭐ Verify OTP (Save token)
  verifyPhone(phoneNumber: string, code: string): Observable<any> {
    const payload = { phoneNo: phoneNumber, code };

    return this.http.post(`${environment.apiUrl}api/User/VerifyPhone`, payload)
      .pipe(
map((res: any) => {
          if (res?.status === true && res?.code === 200) {

            const patientUser = {
              token: res.data.token,
              role: 'Patient',
              phoneNumber: phoneNumber
            };

            // ⭐ Save token for interceptor
            this.setCurrentUser(patientUser);

            localStorage.setItem('role', 'Patient');

            return res;
          }
          return res;
        })
      );
  }

  fcmToken(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.tockenFcm, data).pipe(map((data: any) => {
      return data;
    }));
  }


  getPrefrence(mrn:any){
return this.http.get<any>(environment.apiUrl + ApiEndPoint.getPrefrence + '?mrn=' + mrn)
  }

    getPrefrenceDoctor(careProviderCode:any){
return this.http.get<any>(environment.apiUrl + ApiEndPoint.getPrefrence + '?careProviderCode=' + careProviderCode)
  }

}
