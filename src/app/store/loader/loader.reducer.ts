import { tassign } from 'tassign';

import { Actions, ActionTypes } from './loader.actions';

export interface ILoader {
    show: boolean;
}

const initialState: ILoader = {
    show: false
};

export function loaderReducer(state: ILoader = initialState, action: Actions): ILoader {

    switch (action.type) {

        case ActionTypes.TOGGLE:

            return tassign(state, action.payload);

        default:
            return state;
    }
}

// export const getLoading = (state: ILoader) => state.show;
