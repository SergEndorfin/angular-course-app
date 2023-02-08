import { createAction, props } from "@ngrx/store";
import { Course } from "src/app/shared/model/course";


export const requestAllCourses = createAction(
  '[Courses] Get all request'
);
export const requestAllCoursesSuccess = createAction(
  '[Courses] Get all success',
  props<{ courses: Course[] }>()
);
export const requestAllCoursesFail = createAction(
  '[Courses] Get all fail',
  props<{ errorMessage: string }>()
);


export const requestSingleCourse = createAction(
  '[Course] Get one request',
  props<{ id: string }>()
);
export const requestSingleCourseSuccess = createAction(
  '[Course] Get one success',
  props<Course>()
);
export const requestSingleCourseFail = createAction(
  '[Course] Get one fail',
  props<{ errorMessage: string }>()
);


export const requestFilteredCourses = createAction(
  '[Courses Search] Request',
  props<{ searchValue: string }>()
);
export const requestFilteredCoursesSuccess = createAction(
  '[Courses Search] Success',
  props<{ courses: Course[] }>()
);


export const requestDeleteCourse = createAction(
  '[Course] Delete one request',
  props<{ id: string }>()
);
export const requestDeleteCourseFail = createAction(
  '[Course] Delete one fail',
  props<{ errorMessage: string }>()
);


export const requestEditCourse = createAction(
  '[Course] Edit request',
  props<{ body: Course, id: string }>()
);
export const requestEditCourseSuccess = createAction(
  '[Course] Edit success'
);
export const requestEditCourseFail = createAction(
  '[Course] Edit fail',
  props<{ errorMessage: string }>()
);


export const requestCreateCourse = createAction(
  '[Course] Create request',
  props<{ course: Course }>()
);
export const requestCreateCourseSuccess = createAction(
  '[Course] Create success'
);
export const requestCreateCourseFail = createAction(
  '[Course] Create fail',
  props<{ errorMessage: string }>()
);