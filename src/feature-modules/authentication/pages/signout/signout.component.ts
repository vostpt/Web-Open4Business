import { Component } from '@angular/core';
import { AuthenticationService } from '@authentication-feature-module/services/authentication.service';

@Component({ template: '' })
export class SignoutComponent {

  constructor(
    private readonly authenticationService: AuthenticationService
  ) {
    // Destroy session
    this.authenticationService.signout().subscribe(
      (result: { data: { token: string } }) => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('isA');

        location.href = '/auth/signin';  // Full reload is necessary!.
      },
      () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('isA');

        location.href = '/auth/signin';  // Full reload is necessary!.
      });
  }

}
