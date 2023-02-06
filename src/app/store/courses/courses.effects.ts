import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { CoursesService } from "src/app/services/courses/courses.service";
import { AuthorsStateFacade } from "../authors/authors.facade";
import { CoursesActions } from "./action-types";
import { CoursesStateFacade } from "./courses.facade";

@Injectable()
export class CoursesEffects {

  getAll$ = createEffect(
    () => this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      mergeMap(
        () => this.coursesService.getAllCourses()
          .pipe(
            map(courses => CoursesActions.requestAllCoursesSuccess({ courses })),
            catchError(err => of(CoursesActions.requestAllCoursesFail({ errorMessage: err.error["result"] })))
          )
      )
    ))

  filteredCourses$ = createEffect(
    () => this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      mergeMap(searchValue => this.coursesStateFacade.allCourses$
        .pipe(
          map(courses => courses.filter(course => course.title.includes(searchValue.searchValue))),
          tap(searchResult => console.log('searchResult >>>', searchResult))
        )
      ),
      map(filteredCourses => CoursesActions.requestFilteredCoursesSuccess({ courses: filteredCourses })),

      tap(res => console.log('>> filtered courses>', res)),
      // first()
    )
  )
  // getSpecificCourse$ = createEffect(
  // deleteCourse$ = createEffect(
  // editCourse$ = createEffect(
  // createCourse$ = createEffect(
  // redirectToTheCoursesPage$ = createEffect(

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private coursesStateFacade: CoursesStateFacade,
    private authorsStateFacade: AuthorsStateFacade
  ) { }
}