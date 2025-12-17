import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
debugger
    // ❗ Ignore preflight OPTIONS requests
    if (request.method === 'OPTIONS') {
      return next.handle(request);
    }

    const currentUser = this.authService.currentUserValue;

    // Add Bearer Token if logged in
    if (currentUser?.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }
debugger
    return next.handle(request).pipe(
      tap(
        () => {},
        (error) => {

          // Unauthorized (login expired)
          if (error.status === 401) {
            localStorage.removeItem('currentUser');
            location.reload();
          }

 

        }
      )
    );
  }
}
