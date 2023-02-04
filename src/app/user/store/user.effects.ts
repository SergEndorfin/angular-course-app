import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, of, tap } from "rxjs";
import { UserSessionStoreService } from "../services/user-session-store-.service";
import { UserService } from "../user.service";
import { UserActions } from "./user.action-types";

@Injectable()
export class UserEffects {

  getCurrentUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.requestCurrentUser),
      concatMap(() => this.userService.getUser()
        .pipe(
          map(userResp => {
            return {
              isAdmin: userResp.role === 'admin',
              name: this.setNameIfEmpty(userResp.name)
            }
          }),
          tap(user => this.userSessionStoreService.setUser(user)),
          map(user => UserActions.requestCurrentUserSuccess(user)),
          catchError(err => of(UserActions.requestCurrentUserFail({ errorMessage: err.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private userSessionStoreService: UserSessionStoreService
  ) { }

  setNameIfEmpty(name: string): string {
    return name ? name : 'user without name';
  }
}