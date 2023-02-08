import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, filter, iif, map, mergeMap, of, tap } from "rxjs";
import { CoursesService } from "src/app/services/courses/courses.service";
import { AuthorsStateFacade } from "../authors/authors.facade";
import { createAuthorsAndSetIds, mapAuthorsToCourses, mapAuthorsToSingleCourse } from "../service/authors-to-courses.service";
import { CoursesActions } from "./action-types";
import { CoursesStateFacade } from "./courses.facade";

@Injectable()
export class CoursesEffects {

  getAll$ = createEffect(
    () => this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      mergeMap(() => this.coursesService.getAllCourses()
        .pipe(
          mapAuthorsToCourses(this.authorsStateFacade.authors$),
          map(courses => CoursesActions.requestAllCoursesSuccess({ courses })),
          catchError(err => of(CoursesActions.requestAllCoursesFail({ errorMessage: err.error["result"] })))
        )
      )
    ));

  filteredCourses$ = createEffect(
    () => this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      mergeMap(searchValue =>
        iif(
          () => !searchValue.searchValue,
          this.coursesStateFacade.allCourses$,
          this.coursesStateFacade.allCourses$
            .pipe(
              map(courses => courses.filter(course => course.title.includes(searchValue.searchValue)))
            )
        )
      ),
      map(filteredCourses => CoursesActions.requestFilteredCoursesSuccess({ courses: filteredCourses }))
    )
  )

  getSpecificCourse$ = createEffect(
    () => this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      mergeMap(courseId => this.coursesService.getSpecificCourse(courseId.id)
        .pipe(
          mapAuthorsToSingleCourse(this.authorsStateFacade.authors$),
          map(course => CoursesActions.requestSingleCourseSuccess(course)),
          catchError(err => of(CoursesActions.requestSingleCourseFail({ errorMessage: err.error["result"] }))
          )
        )
      )
    )
  )

  deleteCourse$ = createEffect(
    () => this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      concatMap(courseId => this.coursesService.deleteCourse(courseId.id)
        .pipe(
          tap(() => this.coursesStateFacade.getAllCourses()),
          catchError(err => of(CoursesActions.requestDeleteCourseFail({ errorMessage: err.error["result"] })))
        )
      )
    ),
    { dispatch: false }
  )

  editCourse$ = createEffect(
    () => this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      tap(action => action.body.authors.forEach(authorName => this.authorsStateFacade.addAuthor({ name: authorName, id: '' }))),
      map(action => action.body),
      createAuthorsAndSetIds(this.authorsStateFacade),
      concatMap(course => this.coursesService.editCourse(course)
        .pipe(
          map(() => CoursesActions.requestEditCourseSuccess()),
          catchError(err => of(CoursesActions.requestEditCourseFail({ errorMessage: err.error["result"] })))
        ))
    )
  )

  createCourse$ = createEffect(
    () => this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      tap(action => action.course.authors.forEach(authorName => this.authorsStateFacade.addAuthor({ name: authorName, id: '' }))),
      map(action => action.course),
      createAuthorsAndSetIds(this.authorsStateFacade),
      concatMap(course => this.coursesService.createCourse(course)
        .pipe(
          map(() => CoursesActions.requestCreateCourseSuccess()),
          catchError(err => of(CoursesActions.requestCreateCourseFail({ errorMessage: err.error["result"] })))
        ))
    )
  )

  redirectToTheCoursesPage$ = createEffect(
    () => this.actions$.pipe(
      filter(action =>
        action.type === CoursesActions.requestSingleCourseFail.type ||
        action.type === CoursesActions.requestCreateCourseSuccess.type ||
        action.type === CoursesActions.requestEditCourseSuccess.type
      ),
      tap(() => this.router.navigate(['/courses'])),
    ),
    { dispatch: false }
  )

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private coursesStateFacade: CoursesStateFacade,
    private authorsStateFacade: AuthorsStateFacade,
    private router: Router
  ) { }
}