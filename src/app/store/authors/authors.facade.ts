import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Author } from "src/app/shared/model/author";
import { AuthorsActions } from "./action-types";
import { AuthorsState } from "./authors.reducer";
import { getAuthors } from "./authors.selectors";

@Injectable({
  providedIn: 'root'
})
export class AuthorsStateFacade {

  addedAuthor$: Observable<Author>;
  authors$: Observable<Author[]>;

  constructor(
    private store: Store<AuthorsState>
  ) {
    this.authors$ = store.pipe(select(getAuthors));
  }

  getAuthors() {
    this.store.dispatch(AuthorsActions.requestAuthors());
  }

  addAuthor(author: Author) {
    this.store.dispatch(AuthorsActions.requestAddAuthor(author));
  }
}