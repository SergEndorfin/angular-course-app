import { createReducer, on } from "@ngrx/store";
import { AuthActions } from "./action-types";

export const authFeatureKey = 'auth';

export interface AuthState {
  isAuthorized: boolean,
  token?: string,
  errorMessage?: string
}

export const initialAuthState: AuthState = {
  isAuthorized: false
}

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.requestLoginSuccess, (_state, actionValueOkResponce) => {
    return {
      isAuthorized: actionValueOkResponce.isAuthorized,
      token: actionValueOkResponce.token
    }
  }),

  on(AuthActions.requestLoginFail, (_state, actionValueFailResponce) => {
    return {
      ...initialAuthState,
      errorMessage: actionValueFailResponce.errorMessage
    }
  }),

  on(AuthActions.requestRegisterFail, (_state, actionValueFailResponce) => {
    return {
      ...initialAuthState,
      errorMessage: actionValueFailResponce.errorMessage
    }
  }),

  on(AuthActions.requestRegisterSuccess, () => initialAuthState),

  on(AuthActions.requestLogoutSuccess, () => initialAuthState)
);

