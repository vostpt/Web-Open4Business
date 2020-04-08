import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-catalog-loader',
  templateUrl: './loader.component.html'
})

export class LoaderComponent implements OnInit {

  @Input() name: string;
  @Input() type?: string;
  @Input() size?: string;
  @Input() fullScreen?: boolean;

  constructor() {}

  ngOnInit() {
    this.type = this.type || 'ball-scale-ripple-multiple';
    this.size = this.size || 'medium';
    this.fullScreen = !!this.fullScreen;
  }

}
