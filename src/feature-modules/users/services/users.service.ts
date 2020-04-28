import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment, UrlModel } from '@core-modules/core';

@Injectable()
export class UsersService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient
  ) { }

  getUsers(search?: string, active? : boolean) {
    const url = new UrlModel(this.apiUrl).setPath('auth/v1/users');
    let filter = {};

    if (search) {
      filter = {...filter, search};
    }
    
    if (active !== undefined && active !== null ) {
      filter = {...filter, active};
    }

    url.setQueryParams(filter);

    return this.http.get(url.buildUrl());
  }

  getUser(authId?: string) {
    const url = new UrlModel(this.apiUrl).setPath('auth/v1/info');

    if (authId) {
      url.setQueryParams({authId});
    }

    return this.http.get(url.buildUrl());
  }

  saveUserInfo(body:
    {
      authId?: string,
      company: string,
      name: string,
      email: string,
      phone: string
    }) {
    const url = new UrlModel(this.apiUrl).setPath('auth/v1/info');
    return this.http.put(url.buildUrl(), body);
  }

  saveUserPassword(body:
    {
      currentPassword?: string,
      password: string
    }) {
    const url = new UrlModel(this.apiUrl).setPath('auth/v1/password');
    return this.http.put(url.buildUrl(), body);
  }

}
