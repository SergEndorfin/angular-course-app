import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Author } from "src/app/shared/model/author";
import { AuthorsActions } from "./action-types";
import { AuthorsState } from "./authors.reducer";

@Injectable({
  providedIn: 'root'
})
export class AuthorsStateFacade {

  addedAuthor$: Observable<Author>;
  authors$: Observable<Author>;

  constructor(
    private store: Store<AuthorsState>
  ) { }

  getAuthors() {
    this.store.dispatch(AuthorsActions.requestAuthors());
  }

  addAuthor(author: Author) {
    this.store.dispatch(AuthorsActions.requestAddAuthor(author));
  }
}