import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentUserValue;

    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.data?.token}`
        }
      });
    }                                            
                                      
    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
          }  
        },
        error => {
          // 401 means Unauthorised
          if (error.status === '401' || error.status === 401) {
         
            localStorage.removeItem('currentUser');
            location.reload();
          }   
        }
      )
    );
  }

}
