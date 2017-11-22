import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { IAppState, reducers } from '@store/index';

import { AppComponent } from './app.component';
import { ToggleLoaderAction } from './store/loader/loader.actions';

export class RouterStub {
  navigate(params) {}
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<IAppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpModule,
        StoreModule.forRoot({
          ...reducers
        })
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        // { provide: Router, useClass: RouterStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  }));

  it('should have a router outlet', async(() => {
    const de = fixture.debugElement.query(By.directive(RouterOutlet));

    expect(de).not.toBeNull();
  }));

  it('should have the loader set to false', async(() => {
    component.loader$.subscribe((loader) => {
      expect(loader.show).toBeFalsy();
    });
  }));

  it('should have the loader set to true', fakeAsync(() => {
    showLoader();

    fixture.detectChanges();

    component.loader$.subscribe((loader) => {
      expect(loader.show).toBeTruthy();
    });

  }));

  function showLoader(show = true) {
    const action = new ToggleLoaderAction({
      show: show
    });

    store.dispatch(action);
  }

});
