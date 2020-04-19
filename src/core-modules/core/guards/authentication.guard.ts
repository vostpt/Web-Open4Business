import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(
    private router: Router,
    private notification: ToastrService,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {

    const token = localStorage.getItem('token');

    if (token) {
      return this.authenticationService.verifySession().pipe(map(
        (response) => {
          if (response && response['data']) {
            localStorage.setItem('email', response['data'].authId);
            localStorage.setItem('name', response['data'].name);
            localStorage.setItem('isA', response['data'].isAdmin);
          }

          return true;
        }
      ), catchError(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('isA');
        if (route.queryParams.token && route.queryParams.activationCode) {
          this.notification.warning('If trying to execute administration actions, make sure you are logged in.');
        }
        this.router.navigateByUrl('/auth/signin');
        return of(false);
      }));
    }

    if (route.queryParams.token && route.queryParams.confirmationCode) {
      this.notification.warning('If trying to execute administration actions, make sure you are logged in.');
    }
    this.router.navigateByUrl('/auth/signin');
    return of(false);

  }

}
