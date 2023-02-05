import { createReducer, on } from "@ngrx/store";
import { Author } from "src/app/shared/model/author";
import { AuthorsActions } from "./action-types";



export const authorsFeatureKey = 'authors';

export interface AuthorsState {
  authors: Author[];
  addedAuthor?: Author[];
}

export const initialState: AuthorsState = {
  authors: [],
  addedAuthor: []
}

export const authorsReducer = createReducer(
  initialState,

  on(AuthorsActions.requestAuthorsSuccess, (_state, actionValueOkResponce) => {
    return {
      authors: actionValueOkResponce.authors
    }
  })
)