import { Component, OnInit } from '@angular/core';

import { LayoutConfigService } from '../../services/layout-config.service';

import * as objectPath from 'object-path';

@Component({
  selector: 'app-layout-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.scss']
})
export class PageFooterComponent implements OnInit {

  today: number = Date.now();
  fluid: boolean;

  constructor(private layoutConfigService: LayoutConfigService) {
  }

  ngOnInit(): void {
    const config = this.layoutConfigService.getConfig();

    // footer width fluid
    this.fluid = objectPath.get(config, 'footer.self.width') === 'fluid';
  }
}
