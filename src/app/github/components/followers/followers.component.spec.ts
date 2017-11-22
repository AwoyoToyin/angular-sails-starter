import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Github } from '@github/models/github.model';
import { FollowersService } from '@github/services/followers.service';
import { collection } from '@test/data';
import { Stubs } from '@test/stubs';
import { Observable } from 'rxjs/Rx';

import { FollowersComponent } from './followers.component';

describe('FollowersComponent', () => {
  let component: FollowersComponent;
  let fixture: ComponentFixture<FollowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [ FollowersComponent ],
      providers: [
        FollowersService,
        { provide: Router, useClass: Stubs.RouterStub },
        { provide: ActivatedRoute, useClass: Stubs.ActivatedRouteStub }
      ]
    });

    fixture = TestBed.createComponent(FollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set the username property to the supplied query param', () => {
    getFollowers();

    const route: Stubs.ActivatedRouteStub = TestBed.get(ActivatedRoute);
    route.push({ username: 'awoyotoyin' });

    fixture.detectChanges();

    expect(component.username).toBe('awoyotoyin');

    component.github$.subscribe((response) => {
      expect(response.totalFollowersCount).toBe(2);
    });
  });

  it('should redirect back to same page with the username as a query param', fakeAsync(() => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    const fb = new FormBuilder();
    const form = fb.group({
      username: ['mosh-hamedani', Validators.required]
    });

    component.search(form);

    expect(spy).toHaveBeenCalledWith(
      ['/github/followers'], { queryParams: { username: form.value.username } }
    );

  }));

  function getFollowers() {
    const service = TestBed.get(FollowersService);
    spyOn(service, 'getFollowers').and.returnValue(Observable.from([new Github(collection)]));
  }
});
