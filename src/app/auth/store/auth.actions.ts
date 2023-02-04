import { createAction, props } from "@ngrx/store";
import { AuthState } from "./auth.reducer";



export const requestLogin = createAction(
  '[Login page] User login request',
  props<{ email: string; password: string }>()
);
export const requestLoginSuccess = createAction(
  '[Login page] User login success',
  props<AuthState>()
);
export const requestLoginFail = createAction(
  '[Login page] User login fail',
  props<{ errorMessage: string }>()
);


export const requestRegister = createAction(
  '[Registration page] User register request'
);
export const requestRegisterSuccess = createAction(
  '[Registration page] User register success'

);
export const requestRegisterFail = createAction(
  '[Registration page] User register fail'
);


export const requestLogout = createAction(
  '[Logout main header] User logout request'
);
export const requestLogoutSuccess = createAction(
  '[Logout main header] User logout success'
);