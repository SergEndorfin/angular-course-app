import { createReducer, on } from "@ngrx/store";
import { UserActions } from "./user.action-types";


export const userFeatureKey = 'user';

export interface UserState {
  isAdmin: boolean,
  name?: string
}

export const initialUserState: UserState = {
  isAdmin: false
}

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.requestCurrentUserSuccess, (_state, actionValueOkResponce) => {
    return {
      isAdmin: actionValueOkResponce.isAdmin,
      name: actionValueOkResponce.name
    }
  }),
  on(UserActions.requestCurrentUserFail, (_state, actionValueBadResponce) => {
    return {
      ...initialUserState,
      errorMessage: actionValueBadResponce.errorMessage
    }
  }),
  on(UserActions.onLogoutSuccess, () => initialUserState)
);