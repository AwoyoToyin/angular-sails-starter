import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ui-loader',
  template: `
    <div *ngIf="loading" class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
  `,
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnChanges {

  @Input() loading: Boolean = false;

  ngOnChanges(changes: SimpleChanges) {}

}
