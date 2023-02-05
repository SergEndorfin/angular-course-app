import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, of, tap } from "rxjs";
import { AuthorsService } from "src/app/services/authors/authors.service";
import { AuthorsActions } from "./action-types";


@Injectable()
export class AuthorsEffects {

  getAuthors$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthorsActions.requestAuthors),
      concatMap(
        () => this.authorsService.getAllAuthors()
          .pipe(
            map(authors => AuthorsActions.requestAuthorsSuccess({ authors })),
            catchError(err => {
              console.log(' get authors error:', err);
              return of(AuthorsActions.requestAuthorsFail({ errorMessage: err.error["message"] }))
            })
          )
      )
    )
  );

  addAuthor$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthorsActions.requestAddAuthor),
      concatMap(
        author => this.authorsService.addAuthor(author)
          .pipe(
            tap(addedAythorResp => console.log('added Author responce:', addedAythorResp)),
            map(authors => AuthorsActions.requestAddAuthorSuccess()),
            catchError(err => {
              console.log(' Add authors error:', err);
              return of(AuthorsActions.requestAddAuthorFail({ errorMessage: err.error["message"] }))
            })
          )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private authorsService: AuthorsService
  ) { }
}