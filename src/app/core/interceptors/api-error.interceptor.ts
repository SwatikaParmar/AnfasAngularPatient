import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
debugger
    // ❗ Ignore OPTIONS requests (CORS preflight)
    if (request.method === 'OPTIONS') {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        // ❗ Avoid infinite navigation loops
        if (this.router.url === '/maintenance') {
          return throwError(() => error);
        }

        // ⭐ Redirect to maintenance only for real API failures
        if ([404, 502, 503, 500].includes(error.status)) {
          this.router.navigate(['/maintenance']);
        }

        return throwError(() => error);
      })
    );
  }
}
