import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '@store/index';
import { ILoader } from '@store/loader/loader.reducer';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loader$: Observable<ILoader>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.loader$ = this.store.select('loader');
  }
}
