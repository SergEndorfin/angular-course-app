import { createAction, props } from "@ngrx/store";
import { Author } from "src/app/shared/model/author";
import { AuthorsState } from "./authors.reducer";


export const requestAuthors = createAction(
  '[Authors] Get all request',
);
export const requestAuthorsSuccess = createAction(
  '[Authors] Get all success',
  props<AuthorsState>()
);
export const requestAuthorsFail = createAction(
  '[Authors] Get all fail',
  props<{ errorMessage: string }>()
);


export const requestAddAuthor = createAction(
  '[Authors] Add request',
  props<Author>()
);
export const requestAddAuthorSuccess = createAction(
  '[Authors] Add request success',
  props<{ author: Author }>()
);
export const requestAddAuthorFail = createAction(
  '[Authors] Add request fail',
  props<{ errorMessage: string }>()
);


export const resetAddedAuthor = createAction(
  '[Authors] Reset added'
);