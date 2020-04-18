import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: ''
})
export class SignoutComponent {
  constructor(private router: Router
  ) {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('isA');

    this.router.navigateByUrl('/auth/signin');
  }
}
