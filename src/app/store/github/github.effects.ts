import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { FollowersService } from '@github/services/followers.service';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import * as actions from '@store/github/github.actions';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GithubEffects {
    @Effect() getFollowers$: Observable<any> = this.actions$
        .ofType(actions.ActionTypes.GET_FOLLOWERS)
        .map(toPayload)
        .switchMap(payload => {
            return this.service.getFollowers(payload)
                .map((followers) => new actions.GetUserFollowersSuccessAction(followers))
                .catch((error) => Observable.of(new actions.GetUserFollowersFailedAction(error)));
        });


    constructor(private actions$: Actions, private service: FollowersService) {}
}
