import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsNotice } from '@store/bs-notify/bs-notify.interface';
import { IBsNotice } from '@store/bs-notify/bs-notify.reducer';
import { IAppState } from '@store/index';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { fxArray } from '../../../../prefx';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'bs-notify',
  templateUrl: './bs-notify.component.html',
  styleUrls: ['./bs-notify.component.scss'],
  animations: [
    fxArray
  ]
})
export class BsNotifyComponent implements OnInit, OnDestroy {

  notice$: Observable<IBsNotice>;

  /** The current notify options */
  notice: BsNotice;

  show = false; // show or hide notification

  percent = 0; // holds current progress value

  animationStyle = 'zoomInDown';

  subscription: Subscription;

  constructor(
    private store: Store<IAppState>,
    private cdRef: ChangeDetectorRef
  ) {
    // detact the component's change detector for performance reasons
    // cdRef.detach();
    cdRef.markForCheck();
  }

  ngOnInit(): void {
    this.notice$ = this.store.select('bsNotice');
    this.subscription = this.notice$.switchMap((action) => {
        this.percent = 0; // reset percent progress

        this.notice = action.notice;

        this.setAnimationStyle();

        this.canShow();

        // set an interval and stop just 2 seconds after the set delay duration
        const source = Observable.interval(1000);
        const timer = Observable.timer(this.notice.delay + 2000);
        return source.takeUntil(timer);
      })
      .subscribe((counter) => {
        this.calculateProgress(counter);
      });
  }

  private calculateProgress(counter: number) {
    const delay = this.notice.delay;

    if (delay > 0) {
      counter++;
      const max = delay / 1000;

      if (counter > max) {
        this.close();
        this.cdRef.detectChanges();
      } else if (this.percent < 100) {
        this.percent = +(100 * counter / max).toFixed(2);
        // do a local change  check every second
        this.cdRef.detectChanges();
      }
    }
  }

  private canShow() {
      if (this.notice.message) {
          this.show = true;
      }
  }

  private setAnimationStyle() {
    switch (this.notice.placement) {
      case 'top-left':
        this.animationStyle = 'zoomInRight';
        break;

      case 'top-right':
        this.animationStyle = 'zoomInLeft';
        break;

      default:
        this.animationStyle = 'zoomInDown';
        break;
    }
  }

  close() {
    this.show = false;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
