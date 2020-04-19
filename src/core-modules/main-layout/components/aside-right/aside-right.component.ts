import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { OffcanvasOptions } from '../../../main-layout/directives/offcanvas.directive';

@Component({
  selector: 'app-main-layout-aside-right',
  templateUrl: './aside-right.component.html',
  styleUrls: ['./aside-right.component.scss']
})
export class AsideRightComponent implements OnInit {
  @Input() toggleBy: string;
  @Output() closeEvent: EventEmitter<{ type: string, data: any }> = new EventEmitter();

  email: string;
  name: string;
  session: boolean;
  isAdmin: boolean;

  offcanvasOptions: OffcanvasOptions;

  constructor() {
    if (localStorage.getItem('email')) {
      this.email = `${localStorage.getItem('email')}`;
      this.name = `${localStorage.getItem('name')}`;
      this.session = true;
      this.isAdmin = (localStorage.getItem('token') && localStorage.getItem('email') && localStorage.getItem('isA') === 'true' ? true : false);
    } else {
      this.email = '';
      this.session = false;
      this.isAdmin = false;
    }
  }

  ngOnInit() {
    this.offcanvasOptions = {
      overlay: true,
      baseClass: 'kt-quick-panel',
      closeBy: this.toggleBy + '-close-btn',
      toggleBy: this.toggleBy || 'kt_quick_panel_toggler_btn'
    };
  }

  open() {
    document.getElementById('kt_quick_panel_toggler_btn').click();
  }

  close() {
    document.getElementById('kt_quick_panel_toggler_btn').click();
  }

  onClose() {
    this.closeEvent.emit({ type: 'close', data: null });
  }

}
