import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, of, tap } from "rxjs";
import { UserStateFacade } from "src/app/user/store/user.facade";
import { AuthService } from "../services/auth.service";
import { RegistrationResultService } from "../services/registration-result.service";
import { AuthActions } from "./action-types";

@Injectable()
export class AuthEffects {

  login$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.requestLogin),
      concatMap(
        reqLoginAction => this.authService.login(reqLoginAction.email, reqLoginAction.password)
          .pipe(
            map(userResp => AuthActions.requestLoginSuccess({
              isAuthorized: userResp['successful'],
              token: userResp['result']
            })),
            tap(() => this.userStateFacade.getCurrentUser()),
            tap(() => this.router.navigateByUrl('/courses')),
            catchError(err => of(AuthActions.requestLoginFail({ errorMessage: err.error["result"] })))
          )
      )
    )
  );

  logout$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.requestLogout),
      concatMap(
        () => this.authService.logout()
          .pipe(
            map(() => AuthActions.requestLogoutSuccess()),
            tap(() => this.userStateFacade.logout()),
            tap(() => this.router.navigateByUrl('/login'))
          )
      )
    )
  );

  register$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.requestRegister),
      concatMap(
        reqRegisterAction => this.authService.register(reqRegisterAction)
          .pipe(
            tap(userCreatedResp => this.registrationResultService.userCreatedResponce$ = of(userCreatedResp)),
            map(_userCreatedResp => AuthActions.requestRegisterSuccess()),
            tap(() => this.router.navigateByUrl('/login')),
            catchError(() => {
              return of(AuthActions.requestLoginFail({ errorMessage: 'User with current email exists. Try another one.' }));
            })
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private userStateFacade: UserStateFacade,
    private registrationResultService: RegistrationResultService
  ) { }
}