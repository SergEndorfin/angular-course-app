import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, from, map, Observable, of, reduce, tap } from 'rxjs';
import { Author } from 'src/app/shared/model/author';
import { AuthorsService } from './authors.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorsStoreService {

  private authors$$ = new BehaviorSubject<Author[]>([]);

  authors$: Observable<Author[]> = this.authors$$.asObservable();

  constructor(private authorsService: AuthorsService) { }

  init() {
    this.authorsService.getAllAuthors()
      .subscribe(authors => this.authors$$.next(authors))
  }

  selectAuthorsByIds(authorIds: string[]): Observable<Author[]> {
    return this.authors$.pipe(
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

  deleteAuthorsFromStore(authorsIds: string[]) {
    const updatedAuthorsList = this.authors$$.getValue()
      .filter(author => !authorsIds.includes(author.id));
    this.authors$$.next(updatedAuthorsList);
  }

  createAuthors(authors: Author[]): Observable<any> {
    return from(authors).pipe(
      concatMap(author => this.authorsService.addAuthor(author)),
      reduce((acc, responce) => {
        acc.push(responce);
        return acc;
      }, new Array()),
      // update authors local store
      tap(responces => {
        if (responces.length > 0) this.authors$$.next([...this.authors$$.getValue(), ...responces]);
      })
    )
  }




  /////////////////////////////////
  getCurrentValuesFromStore() {
    return this.authors$$.getValue();
  }
}
