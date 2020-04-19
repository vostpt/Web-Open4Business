import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment, UrlModel } from '@core-modules/core';

@Injectable()
export class UsersService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient
  ) { }

  getUsers(search?: string) {
    const url = new UrlModel(this.apiUrl).setPath('auth/v1/users');

    if (search) {
      url.setQueryParams({ search });
    }

    return this.http.get(url.buildUrl());
  }

  getUser(search?: string) {
    const url = new UrlModel(this.apiUrl).setPath('auth/v1/info');
    return this.http.get(url.buildUrl());
  }

  saveUserInfo(body:
    {
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
      currentPassword: string,
      password: string
    }) {
    const url = new UrlModel(this.apiUrl).setPath('auth/v1/password');
    return this.http.put(url.buildUrl(), body);
  }

}
