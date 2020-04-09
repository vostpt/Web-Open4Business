import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

// import { HeaderService } from '../../../../services/header.service';

// import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'kt-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  // public user: UserModel;

  public user = {
    fullname: 'Ricardo',
    pic: ''
  };

  @Input() avatar = true;
  @Input() greeting = true;
  @Input() badge: boolean;
  @Input() icon: boolean;

  constructor() { }


  ngOnInit(): void {
    // this.user$ = this.store.pipe(select(currentUser));

  }

  logout() {
    // this.store.dispatch(new Logout());
  }

  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }
}
