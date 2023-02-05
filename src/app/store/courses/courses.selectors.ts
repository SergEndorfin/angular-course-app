import { createFeatureSelector, createSelector } from "@ngrx/store";
import { coursesFeatureKey, CoursesState } from "./courses.reducer";

export const selectCoursesState = createFeatureSelector<CoursesState>(coursesFeatureKey);

export const isAllCoursesLoadingSelector = createSelector(
  selectCoursesState,
  coursesState => coursesState.isAllCoursesLoading
);

export const isSearchingStateSelector = createSelector(
  selectCoursesState,
  coursesState => coursesState.isSearchState
);

export const isSingleCourseLoadingSelector = createSelector(
  selectCoursesState,
  coursesState => coursesState.isSingleCourseLoading
);

export const getCourses = createSelector(
  selectCoursesState,
  coursesState => coursesState.courses
);

export const getAllCourses = createSelector(
  selectCoursesState,
  coursesState => coursesState.allCourses
);

export const getCourse = createSelector(
  selectCoursesState,
  coursesState => coursesState.course
);

export const getErrorMessage = createSelector(
  selectCoursesState,
  coursesState => coursesState.errorMessage
);