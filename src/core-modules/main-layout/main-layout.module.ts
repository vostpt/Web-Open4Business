import { NgModule } from '@angular/core';
// import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbTabsetModule, NgbProgressbarModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { TranslateModule } from '@ngx-translate/core';

// import { CatalogModule } from '@external-modules/catalog';


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
// import { GenericCardComponent } from './components/generic-card/generic-card.component';
// import { GenericCardV2Component } from './components/generic-card-v2/generic-card-v2.component';
// import { GenericModalComponent } from './components/generic-modal/generic-modal.component';
// import { PageTitleHeaderComponent } from './components/page-title-header/page-title-header.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
// import { PageListHeaderComponent } from './components/page-list-header/page-list-header.component';
// import { PageSearchHeaderComponent } from './components/page-search-header/page-search-header.component';
// import { PageActionFooterComponent } from './components/page-action-footer/page-action-footer.component';
// import { PageAsideLeftComponent } from './components/page-aside-left/page-aside-left.component';
// import { PageLayoutWrapperComponent } from './components/page-layout-wrapper/page-layout-wrapper.component';

// Services.
// import { HeaderService } from './services/header.service';
import { HtmlClassService } from './services/html-class.service';
// import { PageHeaderService } from './services/page-header.service';

// Directives.
import { HeaderDirective } from './directives/header.directive';
import { OffcanvasDirective } from './directives/offcanvas.directive';
import { ToggleDirective } from './directives/toggle.directive';
import { ScrollTopDirective } from './directives/scroll-top.directive';

// Pipes.
import { FirstLetterPipe } from './pipes/first-letter.pipe';
import { NotFoundComponent } from './components/not-found/not-found.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelSpeed: 0.5,
  swipeEasing: true,
  minScrollbarLength: 40,
  maxScrollbarLength: 300,
};


@NgModule({
  declarations: [
    BaseLayoutComponent,
    NotFoundComponent,
    
    HeaderComponent,
    HeaderMobileComponent,
    BrandComponent,
    TopbarComponent,
    MenuHorizontalComponent,
    UserProfileComponent,

    AsideLeftComponent,
    AsideRightComponent,
    // GenericCardComponent,
    // GenericCardV2Component,
    // GenericCardV2ContentComponent,
    // GenericModalComponent,
    // PageTitleHeaderComponent,
    PageFooterComponent,
    ScrollTopComponent,
    // PageListHeaderComponent,
    // PageSearchHeaderComponent,
    // PageActionFooterComponent,
    // PageAsideLeftComponent,
    // PageLayoutWrapperComponent,



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

    // TODO review imports
    NgbDropdownModule,
    NgbTabsetModule,
    NgbProgressbarModule,
    NgbTooltipModule,

    LoadingBarModule,
    PerfectScrollbarModule,
    TranslateModule.forChild(),

    // CatalogModule
  ],

  exports: [
    CommonModule,
    RouterModule,

    TranslateModule,

    NgbDropdownModule,
    NgbTabsetModule,
    NgbProgressbarModule,
    NgbTooltipModule,

    BaseLayoutComponent,

    HeaderComponent,
    HeaderMobileComponent,
    BrandComponent,
    TopbarComponent,
    MenuHorizontalComponent,
    UserProfileComponent,

    AsideLeftComponent,
    AsideRightComponent,
    // GenericCardComponent,
    // GenericCardV2Component,
    // GenericCardV2ContentComponent,
    // GenericModalComponent,
    // PageTitleHeaderComponent,
    PageFooterComponent,
    ScrollTopComponent,
    // PageListHeaderComponent,
    // PageSearchHeaderComponent,
    // PageActionFooterComponent,
    // PageAsideLeftComponent,
    // PageLayoutWrapperComponent,

    // Directives.
    HeaderDirective,
    ToggleDirective,
    OffcanvasDirective,
    ScrollTopDirective,

    // Pipes.
    FirstLetterPipe

  ],
  providers: [
    // HeaderService,
    HtmlClassService,

    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },

    // PageHeaderService
  ]
})
export class MainLayoutModule { }
