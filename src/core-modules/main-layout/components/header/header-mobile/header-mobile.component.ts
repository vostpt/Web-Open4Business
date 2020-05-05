import { Component, OnInit } from '@angular/core';

import { LayoutConfigService } from '../../../services/layout-config.service';

import { ToggleOptions } from '../../../directives/toggle.directive';

@Component({
  selector: 'app-main-layout-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss']
})
export class HeaderMobileComponent implements OnInit {

  session: boolean;
  headerLogo: string;
  asideDisplay: boolean;

  toggleOptions: ToggleOptions = {
    target: 'body',
    targetState: 'kt-header__topbar--mobile-on',
    togglerState: 'kt-header-mobile__toolbar-topbar-toggler--active'
  };

  constructor(
    private layoutConfigService: LayoutConfigService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.session = true;
    } else {
      this.session = false;
    }

    // this.headerLogo = this.layoutConfigService.getStickyLogo();
    this.headerLogo = this.layoutConfigService.getLogo();
    this.asideDisplay = this.layoutConfigService.getConfig('aside.self.display');
  }

}
