import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { FollowersService } from '../../github/services/followers.service';
import * as actions from './github.actions';

@Injectable()
export class GithubEffects {
    @Effect() getFollowers$: Observable<any> = this.actions$
        .ofType(actions.ActionTypes.GET_FOLLOWERS)
        .map(toPayload)
        .switchMap(payload => {
            return this.service.getFollowers(payload)
                .map((followers) => new actions.GetUserFollowersSuccessAction(followers));
                // .catch((error) => Observable.of(new actions.GetUserFollowersFailedAction(error)));
        });


    constructor(private actions$: Actions, private service: FollowersService) {}
}
