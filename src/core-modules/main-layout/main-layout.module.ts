import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule, NgbProgressbarModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';

// Components.
import { BaseLayoutComponent } from './base/base-layout/base-layout.component';

import { HeaderComponent } from './components/header/header.component';
import { HeaderMobileComponent } from './components/header/header-mobile/header-mobile.component';
import { BrandComponent } from './components/header/brand/brand.component';
import { TopbarComponent } from './components/header/topbar/topbar.component';
import { MenuHorizontalComponent } from './components/header/menu-horizontal/menu-horizontal.component';
import { UserProfileComponent } from './components/header/topbar/user-profile/user-profile.component';

import { AsideLeftComponent } from './components/aside-left/aside-left.component';
import { AsideRightComponent } from './components/aside-right/aside-right.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';

// Services.
import { HtmlClassService } from './services/html-class.service';

// Directives.
import { HeaderDirective } from './directives/header.directive';
import { OffcanvasDirective } from './directives/offcanvas.directive';
import { ToggleDirective } from './directives/toggle.directive';
import { ScrollTopDirective } from './directives/scroll-top.directive';

// Pipes.
import { FirstLetterPipe } from './pipes/first-letter.pipe';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MapLayoutComponent } from './base/map-layout/map-layout.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelSpeed: 0.5,
  swipeEasing: true,
  minScrollbarLength: 40,
  maxScrollbarLength: 300,
};


@NgModule({
  declarations: [
    BaseLayoutComponent,
    MapLayoutComponent,
    NotFoundComponent,

    HeaderComponent,
    HeaderMobileComponent,
    BrandComponent,
    TopbarComponent,
    MenuHorizontalComponent,
    UserProfileComponent,

    AsideLeftComponent,
    AsideRightComponent,
    PageFooterComponent,
    ScrollTopComponent,

    // Directives.
    HeaderDirective,
    ToggleDirective,
    OffcanvasDirective,
    ScrollTopDirective,

    // Pipes.
    FirstLetterPipe

  ],
  imports: [
    CommonModule,
    RouterModule,

    TranslateModule.forChild(),
    NgbDropdownModule,
    NgbProgressbarModule,
    NgbTooltipModule,

    LoadingBarModule,
    PerfectScrollbarModule
  ],
  exports: [
    CommonModule,
    RouterModule,

    TranslateModule,

    NgbDropdownModule,
    NgbProgressbarModule,
    NgbTooltipModule,

    BaseLayoutComponent,
    MapLayoutComponent,

    HeaderComponent,
    HeaderMobileComponent,
    BrandComponent,
    TopbarComponent,
    MenuHorizontalComponent,
    UserProfileComponent,

    AsideLeftComponent,
    AsideRightComponent,
    PageFooterComponent,
    ScrollTopComponent,

    // Directives.
    HeaderDirective,
    ToggleDirective,
    OffcanvasDirective,
    ScrollTopDirective,

    // Pipes.
    FirstLetterPipe

  ],
  providers: [
    HtmlClassService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class MainLayoutModule { }
