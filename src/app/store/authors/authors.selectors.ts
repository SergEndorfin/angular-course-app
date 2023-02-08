import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authorsFeatureKey, AuthorsState } from "./authors.reducer";


export const selectAuthorsState = createFeatureSelector<AuthorsState>(authorsFeatureKey);

export const getAuthors = createSelector(
  selectAuthorsState,
  authorsState => authorsState.authors
);

export const getAddedAuthor = createSelector(
  selectAuthorsState,
  authorsState => authorsState.addedAuthor
);