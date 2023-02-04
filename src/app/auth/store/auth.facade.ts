import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs"
import { AuthSessionStorageService } from "../services/session-storage.service";
import { AuthActions } from "./action-types";
import { AuthState } from "./auth.reducer";
import { getSpecificErrorMessage, getToken, isUserAuthorized } from "./auth.selectors";

@Injectable({
  providedIn: 'root'
})
export class AuthStateFacade {

  isAuthorized$: Observable<boolean>;
  getToken$: Observable<string | undefined>;
  getLoginErrorMessage$: Observable<string | undefined>;
  getRegisterErrorMessage$: Observable<string | undefined>;

  constructor(
    private store: Store<AuthState>,
    private authSessionStorageService: AuthSessionStorageService
  ) {
    this.isAuthorized$ = store.pipe(select(isUserAuthorized));
    this.getToken$ = store.pipe(select(getToken));
    this.getLoginErrorMessage$ = store.pipe(select(getSpecificErrorMessage));
    this.getRegisterErrorMessage$ = store.pipe(select(getSpecificErrorMessage));
  }

  login(credentials: { email: string, password: string }) {
    this.store.dispatch(AuthActions.requestLogin(credentials));
  }

  logout() {
    this.store.dispatch(AuthActions.requestLogout());
  }

  register(user: any) {
    this.store.dispatch(AuthActions.requestRegister(user));
  }

  setAuthorization() {
    const token = this.authSessionStorageService.getToken()
    if (token) {
      this.store.dispatch(AuthActions.requestLoginSuccess({
        isAuthorized: true,
        token
      }));
    }
  }
}