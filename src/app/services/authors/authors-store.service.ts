import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subscriber } from 'rxjs';
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

  selectAuthorNamesByIds(authorIds: string[]): Observable<Author[]> {
    return this.authors$.pipe(
      map(authors => authors.filter(author => authorIds.includes(author.id)))
    );
  }
}
