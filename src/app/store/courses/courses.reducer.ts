import { createReducer, on } from "@ngrx/store";
import { Course } from "src/app/shared/model/course";
import { CoursesActions } from "./action-types";

export const coursesFeatureKey = 'courses';

export interface CoursesState {
  allCourses: Course[];
  courses: Course[];
  course?: Course;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage?: string;
}

export const initialAuthState: CoursesState = {
  allCourses: [],
  courses: [],
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false
}

export const coursesReducer = createReducer(
  initialAuthState,
  // get All:
  on(CoursesActions.requestAllCourses, (state) => {
    return {
      ...state,
      isAllCoursesLoading: true
    }
  }),
  on(CoursesActions.requestAllCoursesSuccess, (_state, action) => {
    return {
      ...initialAuthState,
      allCourses: action.courses,
      courses: action.courses,
      isAllCoursesLoading: false
    }
  }),
  on(CoursesActions.requestAllCoursesFail, (_state, action) => {
    return {
      ...initialAuthState,
      errorMessage: action.errorMessage,
      isAllCoursesLoading: false
    }
  }),
  // filter:
  on(CoursesActions.requestFilteredCourses, (state) => {
    return {
      ...state,
      courses: [],
      isSearchState: true
    }
  }),
  on(CoursesActions.requestFilteredCoursesSuccess, (state, action) => {
    return {
      ...state,
      courses: action.courses,
      isSearchState: false
    }
  }),
  // get one:
  on(CoursesActions.requestSingleCourse, (state) => {
    return {
      ...state,
      isSingleCourseLoading: true
    }
  }),
  on(CoursesActions.requestSingleCourseSuccess, (state, course) => {
    return {
      ...state,
      course: course,
      isSingleCourseLoading: false
    }
  }),
  on(CoursesActions.requestSingleCourseFail, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage,
      isSingleCourseLoading: false
    }
  })
)