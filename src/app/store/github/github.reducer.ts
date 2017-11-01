import { GithubFollower } from '@github/models/follower/follower.model';
import { tassign } from 'tassign';

import { Actions, ActionTypes } from './github.actions';

export interface IGithub {
    followers: GithubFollower[];
}

const initialState: IGithub = {
    followers: []
};

export function githubReducer(state: IGithub = initialState, action: Actions): IGithub  {
    switch (action.type) {

        case ActionTypes.GET_FOLLOWERS_SUCCESS:

            return tassign(state, { followers: action.payload });

        default:
            return state;
    }
}

export const getFollowers = (state: IGithub) => state.followers;
