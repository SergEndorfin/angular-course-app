import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthSessionStorageService } from 'src/app/auth/services/session-storage.service';
import { Author } from 'src/app/shared/model/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private httpClient: HttpClient, private sessionStorage: AuthSessionStorageService) { }

  getAllAuthors(): Observable<Author[]> {
    return this.httpClient.get<any>('http://localhost:4000/authors/all')
      .pipe(
        map(res => res['result'])
      );
  }

  deleteAuthorById(id: string): Observable<any> {
    return this.httpClient.delete(`http://localhost:4000/authors/${id}`, { headers: this.sessionStorage.headers });
  }

  addAuthor(author: Author): Observable<any> {
    return this.httpClient
      .post<any>('http://localhost:4000/authors/add', { name: author['name'] }, { headers: this.sessionStorage.headers })
      .pipe(
        map(res => res['result'])
      );
  }

  updateAuthor(author: Author): Observable<any> {
    return this.httpClient
      .put<any>(`http://localhost:4000/authors/${author.id}`, { name: author.name }, { headers: this.sessionStorage.headers })
      .pipe(
        map(res => res['result'])
      );
  }
}