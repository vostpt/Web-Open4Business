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
        (response) => {
          if (response && response['data']) {
            localStorage.setItem('email', response['data'].authId);
          }
          
          return true;
        }
      ), catchError(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        this.router.navigateByUrl('/auth/signin');
        return of(false);
      }));
    }

    this.router.navigateByUrl('/auth/signin');
    return of(false);

  }

}
