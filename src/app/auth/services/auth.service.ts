import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthorized$$ = new BehaviorSubject(false);

  isAuthorized$ = this.isAuthorized$$.asObservable();

  constructor(
    private sessionStorage: SessionStorageService,
    private httpClient: HttpClient
  ) {
    this.isAuthorized$$.next(!!this.sessionStorage.getUser());
  }

  login(email: string, password: string) {
    return this.httpClient.post<any>('http://localhost:4000/login', { email, password })
      .pipe(
        tap(responce => {
          this.sessionStorage.setToken(responce.result);
          this.isAuthorized$$.next(true);
        })
      );
  }

  logout() {
    return this.httpClient.delete<any>("http://localhost:4000/logout", { headers: this.sessionStorage.headers })
      .pipe(
        tap(() => this.sessionStorage.deleteToken()),
        tap(() => this.sessionStorage.deleteUser()),
        tap(() => this.isAuthorized$$.next(false))
      );
  }

  register(userData: any) {
    return this.httpClient.post<any>('http://localhost:4000/register', userData);
  }
}