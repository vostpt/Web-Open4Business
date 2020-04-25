import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { tap, retry, catchError } from 'rxjs/operators';

import { environment } from '../models/environment.model';

@Injectable()
export class ApiInInterceptor implements HttpInterceptor {

  public router: Router;

  constructor(
    private injector: Injector
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.router = this.injector.get(Router);

    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error('API ERROR', error.status, errorMessage);

        switch (error.status) {
          case 400: // Bad request!
            // TODO
            break;
          case 401:
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('name');
            localStorage.removeItem('isA');
            this.router.navigate(['/auth/signin']);
            break;
          case 403: // Forbidden.
            this.router.navigate(['/forbidden']);
            break;
          case 404: // Not found!
            // TODO
            break;
          case 500: // Internal Server Error!
            // TODO
            break;
          default:
            break;
        }

        return throwError(error);
      }),
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          switch (event.status) {
            case 400: // Bad request!
              // TODO
              break;
            case 401:
              localStorage.removeItem('token');
              localStorage.removeItem('email');
              localStorage.removeItem('name');
              localStorage.removeItem('isA');
              this.router.navigate(['/auth/signin']);
              break;
            case 403: // Forbidden.
              this.router.navigate(['/forbidden']);
              break;
            case 404: // Not found!
              // TODO
              break;
            case 500: // Internal Server Error!
              // TODO
              break;
            default:
              break;
          }
        }
      })
    );
  }
}
