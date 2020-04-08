import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          switch (event.status) {
            case 400: // Bad request!
              // TODO
              break;
            case 401:
              localStorage.removeItem('token');
              // window.location.href = `${environment.accountsUrl}signin`;
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
