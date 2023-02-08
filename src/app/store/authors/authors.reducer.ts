import { createReducer, on } from "@ngrx/store";
import { Author } from "src/app/shared/model/author";
import { AuthorsActions } from "./action-types";

export const authorsFeatureKey = 'authors';

export interface AuthorsState {
  authors: Author[];
  addedAuthor?: Author;
}

export const initialState: AuthorsState = {
  authors: []
}

export const authorsReducer = createReducer(
  initialState,
  // get all:
  on(AuthorsActions.requestAuthorsSuccess, (_state, actionValueOkResponce) => {
    return {
      ...initialState,
      authors: actionValueOkResponce.authors
    }
  }),
  on(AuthorsActions.requestAuthorsFail, (state, actionValueOkResponce) => {
    return {
      ...state,
      errorMessage: actionValueOkResponce.errorMessage
    }
  }),

  // add:
  on(AuthorsActions.requestAddAuthorSuccess, (state, addedAuthor) => {
    return {
      ...state,
      addedAuthor: addedAuthor.author
    }
  }),
  on(AuthorsActions.requestAddAuthorFail, (state, actionValueFailResponce) => {
    return {
      ...state,
      errorMessage: actionValueFailResponce.errorMessage
    }
  }),

  // reset author state:
  on(AuthorsActions.resetAddedAuthor, (state) => {
    const updatedAuthors = state.authors.slice(0);
    updatedAuthors.push(state.addedAuthor!);
    return {
      authors: updatedAuthors,
      addedAuthor: undefined
    }
  }),
)