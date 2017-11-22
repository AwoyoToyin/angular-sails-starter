import { ModuleWithProviders } from '@angular/core';
import { environment } from '@environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { bsNoticeReducer, IBsNotice } from './bs-notify/bs-notify.reducer';
import { GithubEffects } from './github/github.effects';
import { githubReducer, IGithub } from './github/github.reducer';
import { ILoader, loaderReducer } from './loader/loader.reducer';

export interface IAppState {
    loader: ILoader;
    bsNotice: IBsNotice;
    github: IGithub;
}

export const reducers: ActionReducerMap<IAppState> = {
    loader: loaderReducer,
    bsNotice: bsNoticeReducer,
    github: githubReducer
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
