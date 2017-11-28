import { Action } from '@ngrx/store';

import { Loader } from '@store/loader/loader.interface';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  TOGGLE:    '[Loader] Toggle Loader',
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class ToggleLoaderAction implements Action {
  type = ActionTypes.TOGGLE;

  constructor(public payload: Loader) { }
}

export type Actions
  = ToggleLoaderAction;
