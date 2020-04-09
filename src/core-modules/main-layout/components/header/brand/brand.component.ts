import { OnDestroy, Component, OnInit } from '@angular/core';

import { HtmlClassService } from '../../../services/html-class.service';
import { LayoutConfigService } from '../../../services/layout-config.service';

import { ToggleOptions } from '../../../directives/toggle.directive';


@Component({
  selector: 'app-main-layout-header-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit, OnDestroy {

  headerLogo: string;
  headerStickyLogo: string;

  toggleOptions: ToggleOptions = {
    target: 'body',
    targetState: 'kt-aside--minimize',
    togglerState: 'kt-aside__brand-aside-toggler--active'
  };

  constructor(
    private readonly layoutConfigService: LayoutConfigService,
    public readonly htmlClassService: HtmlClassService
  ) {
  }

  ngOnInit(): void {
    this.headerLogo = this.layoutConfigService.getLogo();
    this.headerStickyLogo = this.layoutConfigService.getStickyLogo();
  }

  ngOnDestroy() { }
}
