import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BasePageComponent } from '@core-modules/main-layout';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent extends BasePageComponent implements OnInit, AfterViewInit {
  
  constructor(
    ) {
      super();
    }

  ngOnInit() {
    this.loader.show('pageLoader');
  }

  ngAfterViewInit() { 
    this.loader.hide('pageLoader');

    document.getElementById('kt_quick_panel_close_btn').click();
  }
}
