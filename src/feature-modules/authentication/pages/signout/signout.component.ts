import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: ''
})
export class SignoutComponent {

  constructor(
    private router: Router
  ) {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('isA');

    location.href = '/auth/signin'; // Full reload is necessary!.
    // this.router.navigateByUrl('/auth/signin');
  }

}
