import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BsNavbarComponent } from './bs-navbar.component';

export class RouterStub {
  navigate(params) {}
}

describe('BsNavbarComponent', () => {
  let component: BsNavbarComponent;
  let fixture: ComponentFixture<BsNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        BsNavbarComponent
      ],
      providers: []
    });

    fixture = TestBed.createComponent(BsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  // it ('should have a link to the todos dashboard', () => {
  //   const des = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));

  //   const index = des.findIndex(el => el.properties['href'] === '/');
  //   expect(index).toBeGreaterThan(-1);
  // });
});
