import { Action } from '@ngrx/store';

export const ActionTypes = {
    GET_FOLLOWERS:                  '[Follower] Get Followers',
    GET_FOLLOWERS_SUCCESS:          '[Follower] Get Followers Successful',
    GET_FOLLOWERS_FAILED:           '[Follower] Get Followers Failed'
};

export class GetUserFollowersAction implements Action {
    readonly type: string = ActionTypes.GET_FOLLOWERS;

    constructor(public payload: string) {}
}

export class GetUserFollowersSuccessAction implements Action {
    readonly type: string = ActionTypes.GET_FOLLOWERS;

    constructor(public payload: object) {}
}

export class GetUserFollowersFailedAction implements Action {
    readonly type: string = ActionTypes.GET_FOLLOWERS;

    constructor(public payload?: any) {}
}

export type Actions
    = GetUserFollowersAction
    | GetUserFollowersSuccessAction
    | GetUserFollowersFailedAction;
