import { Action } from '@ngrx/store';
import { BsNotice } from '@shared/models/bs-notify/bs-notify.interface';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  CREATE:   '[Bs-Notice] Create Bootstrap Notification',
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class CreateNoticeAction implements Action {
  type = ActionTypes.CREATE;

  constructor(public payload: BsNotice) { }
}

export type Actions
  = CreateNoticeAction;
