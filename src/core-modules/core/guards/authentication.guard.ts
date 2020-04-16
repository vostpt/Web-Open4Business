import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate() {

    const token = localStorage.getItem('token');

    if (token) {
      return this.authenticationService.verifySession().pipe(map(
        () => {
          return true;
        }
      ), catchError(() => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/auth/signin');
        return of(false);
      }));
    }

    this.router.navigateByUrl('/auth/signin');
    return of(false);

  }

}
