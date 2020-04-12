import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '@core-modules/main-layout';
import { FormsService } from '@core-modules/catalog/modules/forms';
import { HomeService } from '@home-feature-module/services/home.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  
}
