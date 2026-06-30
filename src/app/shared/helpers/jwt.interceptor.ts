import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'OPTIONS' || this.isPublicRequest(request)) {
      return next.handle(request);
    }

    const currentUser = this.authService.currentUserValue;

    if (currentUser?.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(request).pipe(
      tap(
        () => { },
        (error) => {
          if (error.status === 401) {
            localStorage.removeItem('currentUser');
            location.reload();
          }
        }
      )
    );
  }

  private isPublicRequest(request: HttpRequest<any>): boolean {
    return request.url.includes('api/Admin/GetPrivacyHtml');
  }
}
