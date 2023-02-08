import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Author } from "src/app/shared/model/author";
import { AuthorsActions } from "./action-types";
import { AuthorsState } from "./authors.reducer";
import { getAddedAuthor, getAuthors } from "./authors.selectors";

@Injectable({
  providedIn: 'root'
})
export class AuthorsStateFacade {

  addedAuthor$: Observable<Author | undefined>;
  authors$: Observable<Author[]>;

  constructor(
    private store: Store<AuthorsState>
  ) {
    this.authors$ = store.pipe(select(getAuthors));
    this.addedAuthor$ = store.pipe(select(getAddedAuthor));
  }

  getAuthors() {
    this.store.dispatch(AuthorsActions.requestAuthors());
  }

  addAuthor(author: Author) {
    this.store.dispatch(AuthorsActions.requestAddAuthor(author));
  }

  resetAddedAuthor() {
    this.store.dispatch(AuthorsActions.resetAddedAuthor());
  }
}