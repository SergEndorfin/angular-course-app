import { state } from "@angular/animations";
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
  on(CoursesActions.requestAllCoursesSuccess, (state, action) => {
    return {
      ...state,
      allCourses: action.courses
    }
  })
)