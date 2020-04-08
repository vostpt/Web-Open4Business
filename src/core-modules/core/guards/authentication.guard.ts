import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';

import { environment } from '../models/environment.model';
import { UrlModel } from '../models/url.model';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {

    // If token present on URL queryParams, saves it to local storage.
    if (route.queryParams['token']) {
      localStorage.setItem('token', route.queryParams['token']);

      // TODO: Review if this is necessary!
      // this.location.replaceState('/');
      // // clear token from query params
      // if (route.queryParams['token']) {
      //   this.router.navigateByUrl('');
      // }
    }

    // TODO: REMOVE THIS LINE TO ACTIVATE AND TEEEESSSSSSTTTTT AUTHENTICATION!
    // TODO: Need to confirm the url being called!
    return true;

    const token = localStorage.getItem('token');

    if (token) {
      return this.authenticationService.verifyToken().pipe(map(
        () => {
          return true;
        }
        ), catchError(() => {
          localStorage.removeItem('token');
          // this.router.navigateByUrl(new UrlModel(environment.accountsUrl).buildUrl());
          return of(false);
        }));
    }

    // this.router.navigateByUrl(new UrlModel(environment.accountsUrl).buildUrl());
    return false;

  }

}
