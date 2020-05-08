import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-layout-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Output() dismissEvent = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  dismiss() {
    this.dismissEvent.emit();
  }

}
