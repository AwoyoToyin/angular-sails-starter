import { ModuleWithProviders } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, ActionReducerMap, createSelector, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../environments/environment';
import { bsNoticeReducer, getBsNotice, IBsNotice } from './bs-notify/bs-notify.reducer';
import { GithubEffects } from './github/github.effects';
import { getFollowers, githubReducer, IGithub } from './github/github.reducer';

export interface IAppState {
    github: IGithub;
    bsNotice: IBsNotice;
}

const reducers: ActionReducerMap<IAppState> = {
    github: githubReducer,
    bsNotice: bsNoticeReducer
};

export function logger(reducer: ActionReducer<IAppState>): ActionReducer<any, any> {
    return function (state: IAppState, action: any): IAppState {
        // console.log('state', state);
        // console.log('action', action);

        return reducer(state, action);
    };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
const metaReducers: MetaReducer<IAppState>[] = !environment.production
    ? [logger, storeFreeze]
    : [];

export const store: ModuleWithProviders = StoreModule.forRoot(reducers, { metaReducers });

export const instrumentation = !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [];

export const effects: ModuleWithProviders = EffectsModule.forRoot([
    GithubEffects
]);

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `netflix` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.netflix$ = state$.select(getNetflixState)
 * 	}
 * }
 * ```
 */
/**
 * Github
 */
export const selectGithubState = (state: IAppState) => state.github;
export const followers = createSelector(selectGithubState, getFollowers);

/**
 * BS Notify
 */
export const selectBsNoticeState = (state: IAppState) => state.bsNotice;
export const bsNotice = createSelector(selectBsNoticeState, getBsNotice);
