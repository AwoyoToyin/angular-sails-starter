import 'rxjs/add/operator/switchMap';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubFollower } from '@github/models/follower/follower.model';
import { Github } from '@github/models/github.model';
import { Store } from '@ngrx/store';
import { followers, IAppState } from '@store/index';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { FollowersService } from '../../services/followers.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'github-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit, OnDestroy {

  github$: Observable<Github>; // holds all followers of the supplied user
  followers: GithubFollower[] = []; // holds all followers of the supplied user
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
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params['username']) {
        if (!this.username) { this.username = params['username']; }
        this.github$ =  this.service.getFollowers(params['username']);
      }
    });
    // dispatches a store event
    // this.subscription = this.route.queryParams.subscribe(params => {
    //   if (params['username']) {
    //     if (!this.username) { this.username = params['username']; }
    //     this.store.dispatch(new GetUserFollowersAction(params['username']));
    //   }
    // });

    // // select and subscribe to the followers from the store
    // const subscription = this.store.select(followers)
    //   .subscribe(followers => {
    //     console.log(followers);
    //     this.followers = followers;
    //   });

    // this.subscription.add(subscription);
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
