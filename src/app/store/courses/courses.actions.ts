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
  '[Course] Get one success'
);
export const requestSingleCourseFail = createAction(
  '[Course] Get one fail'
);


export const requestFilteredCourses = createAction(
  '[Course] Get filtered one request',
  props<{ searchValue: string }>()
);
export const requestFilteredCoursesSuccess = createAction(
  '[Course] Get filtered one success'
);


export const requestDeleteCourse = createAction(
  '[Course] Delete one request',
  props<{ id: string }>()
);
export const requestDeleteCourseFail = createAction(
  '[Course] Delete one fail'
);


export const requestEditCourse = createAction(
  '[Course] Delete edit request',
  props<{ body: Course, id: string }>()
);
export const requestEditCourseSuccess = createAction(
  '[Course] Delete edit success'
);
export const requestEditCourseFail = createAction(
  '[Course] Delete edit fail'
);


export const requestCreateCourse = createAction(
  '[Course] Delete create request',
  props<{ body: Course }>()
);
export const requestCreateCourseSuccess = createAction(
  '[Course] Delete create success'
);
export const requestCreateCourseFail = createAction(
  '[Course] Delete create fail'
);