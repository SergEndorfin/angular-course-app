import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authFeatureKey, AuthState } from "./auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const isUserAuthorized = createSelector(
  selectAuthState,
  authState => authState.isAuthorized
);

export const getToken = createSelector(
  selectAuthState,
  authState => authState.token
);

export const getSpecificErrorMessage = createSelector(
  selectAuthState,
  authState => authState.errorMessage
);
