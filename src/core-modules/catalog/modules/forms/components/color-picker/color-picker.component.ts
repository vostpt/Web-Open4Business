import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-catalog-form-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPickerComponent implements OnInit {
  @Input() color: string;
  @Output() changeColorEvent = new EventEmitter();

  ngOnInit() {}

  handleChange(event) {
    this.color = event.color.hex;
    this.changeColorEvent.emit({ type: 'colorChange', data: { color: event.color } });
  }
}
