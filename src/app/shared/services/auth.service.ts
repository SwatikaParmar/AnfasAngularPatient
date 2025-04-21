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

  login(user: Login) {    
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.login,user)
      .pipe(map(user => {
        if (user.data) {     
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('loginRole', user.data.role);
          // localStorage.setItem('userId', user.data.userId);
          // localStorage.setItem('userId', user.data.id);
          //   localStorage.setItem('distributorId', user.data.distributorId);
          this.currentUserSubject.next(user);
        } else {
          this.router.navigateByUrl('/login');          
        }                
        return user;
      }));
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/home-page'])
      .then(() => {      
        window.location.reload();
      });
  }
  otp(data:any){
    return this.http.post<any>(environment.apiUrl + ApiEndPoint. emailOtp,data)
  }

}
