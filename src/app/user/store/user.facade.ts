import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { UserSessionStoreService } from "../services/user-session-store-.service";
import { UserActions } from "./user.action-types";
import { UserState } from "./user.reducer";
import { getName, isAdmin } from "./user.selectors";

@Injectable({
  providedIn: 'root'
})
export class UserStateFacade {

  name$: Observable<string | undefined>;
  isAdmin$: Observable<boolean>;

  constructor(
    private store: Store<UserState>,
    private userSessionStoreService: UserSessionStoreService
  ) {
    this.name$ = store.pipe(select(getName));
    this.isAdmin$ = store.pipe(select(isAdmin));
  }

  getCurrentUser(): void {
    this.store.dispatch(UserActions.requestCurrentUser());
  }

  setUserIfExists() {
    const sessionUser = this.userSessionStoreService.getUser();
    if (sessionUser) {
      this.store.dispatch(UserActions.requestCurrentUserSuccess(JSON.parse(sessionUser)));
    }
  }

  logout() {
    this.store.dispatch(UserActions.onLogoutSuccess());
  }
}