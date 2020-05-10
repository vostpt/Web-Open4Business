import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { OffcanvasOptions } from '../../../main-layout/directives/offcanvas.directive';
import { environment } from '@core-modules/core';
import { TranslateService } from '@ngx-translate/core';

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
  currLang: string;
  availableLangs: string[];

  offcanvasOptions: OffcanvasOptions;

  quickGuideLink = `${environment.apiUrl}/insights/v1/guide`;

  constructor(private translateService: TranslateService) {
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
    this.availableLangs = this.translateService.getLangs();
    this.currLang = this.translateService.currentLang || this.translateService.defaultLang;
    console.log(this.currLang);
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

  setLang(lang: string) {
    this.currLang = lang;
    this.translateService.use(this.currLang);
  }
}
