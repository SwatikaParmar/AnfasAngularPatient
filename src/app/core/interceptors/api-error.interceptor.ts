import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // ✔ Only intercept API calls (URLs starting with environment.apiUrl)
    if (!req.url.startsWith(environment.apiUrl)) {
      return next.handle(req); // Ignore non-API requests
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        // ✔ If API returns 404 or API domain unreachable → maintenance
        if (error.status === 404 || error.status === 503) {
          this.router.navigate(['/maintenance']);
        }

        return throwError(() => error);
      })
    );
  }
}


