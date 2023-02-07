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