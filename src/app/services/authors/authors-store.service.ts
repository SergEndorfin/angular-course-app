import { Injectable } from '@angular/core';
import { concatMap, from, map, Observable, of, reduce } from 'rxjs';
import { Author } from 'src/app/shared/model/author';
import { AuthorsStateFacade } from 'src/app/store/authors/authors.facade';
import { AuthorsService } from './authors.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorsStoreService {

  authors$: Observable<Author[]>;

  constructor(
    private authorsService: AuthorsService,
    private authorsStateFacade: AuthorsStateFacade
  ) {
    this.authors$ = authorsStateFacade.authors$;
  }

  selectAuthorsByIds(authorIds: string[]): Observable<Author[]> {
    return this.authorsStateFacade.authors$
      .pipe(
        map(authors => authors.filter(author => authorIds.includes(author.id)))
      );
  }



  deleteAuthorsByIds(ids: string[]): Observable<any> {
    return of(...ids)
      .pipe(
        concatMap(authorId => this.authorsService.deleteAuthorById(authorId)),
        reduce((acc, responce) => {
          acc.push(responce);
          return acc;
        }, new Array())
      )
  }

  // deleteAuthorsFromStore(authorsIds: string[]) {
  //   const updatedAuthorsList = this.authors$$.getValue()
  //     .filter(author => !authorsIds.includes(author.id));
  //   this.authors$$.next(updatedAuthorsList);
  // }

  createAuthors(authors: Author[]): Observable<any> {
    return from(authors).pipe(
      concatMap(author => this.authorsService.addAuthor(author)),
      reduce((acc, responce) => {
        acc.push(responce);
        return acc;
      }, new Array()),
      // update authors local store
      // tap(responces => {
      //   if (responces.length > 0) this.authors$$.next([...this.authors$$.getValue(), ...responces]);
      // })
    )
  }
}
