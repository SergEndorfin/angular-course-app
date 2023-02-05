import { createAction, props } from "@ngrx/store";
import { Author } from "src/app/shared/model/author";
import { AuthorsState } from "./authors.reducer";

export const requestAuthors = createAction(
  '[Authors] Get request',
);

export const requestAuthorsSuccess = createAction(
  '[Authors] Get request success',
  props<AuthorsState>()
);

export const requestAuthorsFail = createAction(
  '[Authors] Get request fail',
  props<{ errorMessage: string }>()
);

export const requestAddAuthor = createAction(
  '[Authors] Add request',
  props<Author>()
);

export const requestAddAuthorSuccess = createAction(
  '[Authors] Add request success',
);

export const requestAddAuthorFail = createAction(
  '[Authors] Add request fail',
  props<{ errorMessage: string }>()
);

// , , , , , resetAddedAuthor?
export const resetAddedAuthor = createAction(
  '[Authors] Reset added',
);