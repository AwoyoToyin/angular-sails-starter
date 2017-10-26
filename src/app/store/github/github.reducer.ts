import { IGithub } from './github.reducer';
import { Actions, ActionTypes } from './github.actions';

import { tassign } from 'tassign';

export interface IGithub {
    followers: any[];
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

export const followers = (state: IGithub) => state.followers;
