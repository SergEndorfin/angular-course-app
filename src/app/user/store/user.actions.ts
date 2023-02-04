import { createAction, props } from "@ngrx/store";
import { UserState } from "./user.reducer";

export const requestCurrentUser = createAction(
  '[User] Request current user'
);

export const requestCurrentUserSuccess = createAction(
  '[User] Request current user success',
  props<UserState>()
);

export const requestCurrentUserFail = createAction(
  '[User] Request current user fail',
  props<{ errorMessage: string }>()
);

export const onLogoutSuccess = createAction(
  '[User] Logout success'
);