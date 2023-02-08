import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Course } from "src/app/shared/model/course";
import { CoursesActions } from "./action-types";
import { CoursesState } from "./courses.reducer";
import { getAllCourses, getCourse, getCourses, getErrorMessage, isAllCoursesLoadingSelector, isSearchingStateSelector, isSingleCourseLoadingSelector } from "./courses.selectors";


@Injectable({
  providedIn: 'root'
})
export class CoursesStateFacade {

  isAllCoursesLoading$: Observable<boolean>;
  isSingleCourseLoading$: Observable<boolean>;
  isSearchingState$: Observable<boolean>;
  courses$: Observable<Course[]>;
  allCourses$: Observable<Course[]>;
  course$: Observable<Course | undefined>;
  errorMessage$: Observable<string | undefined>;

  constructor(
    private store: Store<CoursesState>,
  ) {
    this.isAllCoursesLoading$ = store.pipe(select(isAllCoursesLoadingSelector));
    this.isSingleCourseLoading$ = store.pipe(select(isSingleCourseLoadingSelector));
    this.isSearchingState$ = store.pipe(select(isSearchingStateSelector));
    this.courses$ = store.pipe(select(getCourses));
    this.allCourses$ = store.pipe(select(getAllCourses));
    this.course$ = store.pipe(select(getCourse));
    this.errorMessage$ = store.pipe(select(getErrorMessage));
  }

  getAllCourses() {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: string) {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
  }

  getFilteredCourses(searchValue: string) {
    this.store.dispatch(CoursesActions.requestFilteredCourses({ searchValue }));
  }

  editCourse(body: Course, id: string) {
    this.store.dispatch(CoursesActions.requestEditCourse({ body, id }));
  }

  createCourse(body: Course) {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course: body }));
  }

  deleteCourse(id: string) {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
  }
}