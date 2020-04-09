import { Component, Output, EventEmitter } from '@angular/core';

import { OffcanvasOptions } from '../../../main-layout/directives/offcanvas.directive';

@Component({
  selector: 'app-main-layout-aside-right',
  templateUrl: './aside-right.component.html',
  styleUrls: ['./aside-right.component.scss']
})
export class AsideRightComponent {
  @Output() closeEvent: EventEmitter<{ type: string, data: any }> = new EventEmitter();

  offcanvasOptions: OffcanvasOptions = {
    overlay: true,
    baseClass: 'kt-quick-panel',
    closeBy: 'kt_quick_panel_close_btn',
    toggleBy: 'kt_quick_panel_toggler_btn'
  };

  constructor() { }

  open() {
    document.getElementById('kt_quick_panel_toggler_btn').click();
  }

  close() {
    document.getElementById('kt_quick_panel_toggler_btn').click();
  }

  onClose() {
    this.closeEvent.emit({ type: 'close', data: null });
  }

}
