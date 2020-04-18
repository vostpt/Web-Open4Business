import { NgModule, APP_INITIALIZER, Optional, SkipSelf } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
// import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Services.
import { AuthenticationService } from './services/authentication.service';
import { EnvironmentService } from './services/environment.service';


// Interceptors.
import { ApiInInterceptor } from './interceptors/api-in.interceptor';
import { ApiOutInterceptor } from './interceptors/api-out.interceptor';

// Guards.
import { AuthenticationGuard } from './guards/authentication.guard';

// Resolvers.


// Models.
import { environment } from './models/environment.model';
import { UrlModel } from './models/url.model';


// Initialize LayoutConfigService.
import { LayoutConfig } from '../main-layout/_config/layout.config';
import { LayoutConfigService } from '../main-layout/services/layout-config.service';


export function initializeLayoutConfig(appConfig: LayoutConfigService) {
  return () => { appConfig.loadConfiguration(new LayoutConfig().configs); };
}

@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,

    LoggerModule.forRoot({
      level: environment.logLevel,  // TRACE|DEBUG|INFO|LOG|WARN|ERROR|FATAL|OFF
      timestampFormat: 'mediumTime'
    }),

    // NgxSpinnerModule,

    ToastrModule.forRoot({
      closeButton: true
    }),

    TranslateModule.forRoot({})

  ],
  exports: [],
  providers: [
    AuthenticationService,
    EnvironmentService,

    LayoutConfigService,
    {
      // LayoutConfigService initializer
      provide: APP_INITIALIZER,
      useFactory: initializeLayoutConfig,
      deps: [LayoutConfigService], multi: true
    },
    {
      // App base HREF definition.
      provide: APP_BASE_HREF,
      useValue: (environment.baseHref.startsWith('/') ? '' : '/') + environment.baseHref
    },

    // Interceptors.
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiOutInterceptor,
      multi: true
    },

    // Guards.
    AuthenticationGuard,

    // Resolvers.
  ]
})

export class CoreModule {
  // Makes sure that CoreModule is imported only by one NgModule (AppModule)!
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('Core Module is already loaded. Import it only in AppModule, please!');
    }
  }
}
