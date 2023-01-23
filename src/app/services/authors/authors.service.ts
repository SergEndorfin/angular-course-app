import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SessionStorageService } from 'src/app/auth/services/session-storage.service';
import { Author } from 'src/app/shared/model/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private httpClient: HttpClient, private sessionStorage: SessionStorageService) { }

  getAllAuthors(): Observable<Author[]> {
    return this.httpClient.get<any>('http://localhost:4000/authors/all')
      .pipe(
        map(res => res['result'])
      );
  }

  // TODO
  addAuthor() {

  }

  deleteAuthorById(id: string): Observable<any> {
    return this.httpClient.delete(`http://localhost:4000/authors/${id}`, { headers: this.sessionStorage.headers });
  }
}

