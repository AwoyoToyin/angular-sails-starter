import 'rxjs/add/operator/switchMap';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GetUserFollowersAction } from '@store/github/github.actions';
import { followers, IAppState } from '@store/index';
import { Subscription } from 'rxjs/Subscription';

import { FollowersService } from '../../services/followers.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'github-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit, OnDestroy {

  followers: any[] = []; // holds all followers of the supplied user
  username = ''; // form control
  subscription: Subscription; // holds all subscriptions to be unsubscribed when destroying

  constructor(
    private service: FollowersService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
    this.getFollowers();
  }

  /**
   * Sends a request to fetch a list of all searched user followers
   */
  getFollowers() {
    // dispatches a store event
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params['username']) {
        if (!this.username) { this.username = params['username']; }
        this.store.dispatch(new GetUserFollowersAction(params['username']));
      }
    });

    // select and subscribe to the followers from the store
    const subscription = this.store.select(followers)
      .subscribe(followers => {
        console.log(followers);
        this.followers = followers;
      });

    this.subscription.add(subscription);
  }

  /**
   * Handles the search form
   * Reloads the page with the search param
   * @param c AbstractControl
   */
  search(c: AbstractControl) {
    this.router.navigate(['/github/followers'], { queryParams: { username: c.value.username } });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
