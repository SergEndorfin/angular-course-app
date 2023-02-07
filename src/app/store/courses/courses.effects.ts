import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, iif, map, mergeMap, of, tap } from "rxjs";
import { CoursesService } from "src/app/services/courses/courses.service";
import { AuthorsStateFacade } from "../authors/authors.facade";
import { mapAuthorsToCourses, mapAuthorsToSingleCourse } from "../service/authors-to-courses.service";
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
          catchError(err => of(CoursesActions.requestSingleCourseFail({ errorMessage: err.error["result"] })))
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
          tap(() => () => this.router.navigateByUrl('/courses')),
          catchError(err => of(CoursesActions.requestDeleteCourseFail({ errorMessage: err.error["result"] })))
        )
      )
    )
  )

  // editCourse$ = createEffect(
  // createCourse$ = createEffect(

  redirectToTheCoursesPage$ = createEffect(
    () => this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourseSuccess),
      ofType(CoursesActions.requestEditCourseSuccess),
      ofType(CoursesActions.requestSingleCourseFail),
      tap(() => () => this.router.navigateByUrl('/courses'))
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