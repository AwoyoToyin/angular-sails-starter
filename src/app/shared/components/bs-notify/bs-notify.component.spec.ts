import { ChangeDetectorRef } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { CreateNoticeAction } from '@store/bs-notify/bs-notify.actions';
import { IAppState, reducers } from '@store/index';

import { BsNotifyComponent } from './bs-notify.component';

describe('BsNotifyComponent', () => {
  let component: BsNotifyComponent;
  let fixture: ComponentFixture<BsNotifyComponent>;
  let store: Store<IAppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...reducers
        }),
        NoopAnimationsModule
      ],
      declarations: [ BsNotifyComponent ],
      providers: [
        ChangeDetectorRef
      ]
    });

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(BsNotifyComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set percent as zero', () => {
    fixture.detectChanges();

    expect(component.percent).toBe(0);
  });

  it('should dispatch and create a bs notice', fakeAsync(() => {
    const action = new CreateNoticeAction({
      title: 'Error!',
      message: 'Authorization required',
      type: 'danger',
      placement: 'top-left',
      showProgressbar: true,
      delay: 10000
    });

    store.dispatch(action);

    fixture.detectChanges();

    component.notice$.subscribe(data => {
      const notice = data.notice;
      expect(notice.title).toBe('Error!');
      expect(notice.message).toBe('Authorization required');
      expect(notice.type).toBe('danger');
      expect(notice.placement).toBe('top-left');
      expect(notice.showProgressbar).toBeTruthy();
      expect(notice.delay).toBe(10000);
      expect(component.animationStyle).toBe('zoomInRight');
    });

    tick(13000);
    component.close();

    fixture.detectChanges();
    expect(component.show).toBeFalsy();
  }));

  it('should dispatch, create a bs notice and set the animationStyle to zoomInDown', fakeAsync(() => {
    const action = new CreateNoticeAction({
      title: 'Error!',
      message: 'Authorization required',
      type: 'danger',
      showProgressbar: true,
      delay: 10000
    });

    store.dispatch(action);

    fixture.detectChanges();

    component.notice$.subscribe(data => {
      const notice = data.notice;
      expect(component.animationStyle).toBe('zoomInDown');
    });

    tick(13000);
    component.close();

    fixture.detectChanges();
    expect(component.show).toBeFalsy();
  }));

});
