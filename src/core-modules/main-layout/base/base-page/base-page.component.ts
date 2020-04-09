import { OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NGXLogger } from 'ngx-logger';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

import { AppInjector } from '../../../core/injectors/app-injector';

import { EnvironmentService } from '../../../core/services/environment.service';
// import { PermissionsService } from '@core/services/permissions.service';

export abstract class BasePageComponent implements OnInit, OnDestroy, AfterViewInit {

  protected subscriptions: Subscription[] = [];
  public translateService: TranslateService;
  public logger: NGXLogger;
  public loader: NgxSpinnerService;
  public notification: ToastrService;
  public environment: EnvironmentService;
  // public permissions: any;
  // public permissionsService: any;

  constructor() {
    const injector = AppInjector.getInjector();
    this.translateService = injector.get(TranslateService);
    this.logger = injector.get(NGXLogger);
    this.loader = injector.get(NgxSpinnerService);
    this.notification = injector.get(ToastrService);
    this.environment = injector.get(EnvironmentService);
    // this.permissionsService = AppInjector.getInjector().get(PermissionsService);
    // this.permissions = this.permissionsService.getPermissions();
  }

  ngOnInit() { }

  ngAfterViewInit() { }


  translate(translation: string) {
    return this.translateService.instant(translation);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
