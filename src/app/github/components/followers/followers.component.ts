import 'rxjs/add/operator/switchMap';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  followers: any[] = []; // holds all followers of the supplied user
  username = ''; // form control
  subscription: Subscription; // holds all subscriptions to be unsubscribed when destroying

  constructor(
    private service: FollowersService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getFollowers();
  }

  /**
   * Sends a request to fetch a list of all searched user followers
   */
  getFollowers() {
    this.subscription = this.route.queryParams.switchMap(params => {
      if (params['username']) {
        if (!this.username) { this.username = params['username']; }
        return this.service.getFollowers(params['username']);
      }
    }).subscribe(followers => this.followers = followers);
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
