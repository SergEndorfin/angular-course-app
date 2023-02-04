import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userFeatureKey, UserState } from "./user.reducer";

export const selectUserState = createFeatureSelector<UserState>(userFeatureKey);

export const getName = createSelector(
  selectUserState,
  userState => userState.name
);

export const isAdmin = createSelector(
  selectUserState,
  userState => userState.isAdmin
);