import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, of, tap } from "rxjs";
import { CoursesService } from "src/app/services/courses/courses.service";
import { AuthorsStateFacade } from "../authors/authors.facade";
import { CoursesActions } from "./action-types";

@Injectable()
export class CoursesEffects {

  getAll$ = createEffect(
    () => this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      concatMap(
        () => this.coursesService.getAllCourses()
          .pipe(
            map(courses => CoursesActions.requestAllCoursesSuccess({ courses })),
            catchError(err => of(CoursesActions.requestAllCoursesFail({ errorMessage: err.error["result"] })))
          )
      )
    ))

  // filteredCourses$ = createEffect(
  // getSpecificCourse$ = createEffect(
  // deleteCourse$ = createEffect(
  // editCourse$ = createEffect(
  // createCourse$ = createEffect(
  // redirectToTheCoursesPage$ = createEffect(

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private authorsStateFacade: AuthorsStateFacade
  ) { }
}