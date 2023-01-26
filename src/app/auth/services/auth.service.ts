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
  ) { }

  login(email: string, password: string) {
    return this.httpClient.post<any>('http://localhost:4000/login', { email, password })
      .pipe(
        tap(responce => {
          this.sessionStorage.setToken(responce.result);
        })
      );
  }

  logout() {
    return this.httpClient.delete<any>("http://localhost:4000/logout", { headers: this.sessionStorage.headers })
      .pipe(
        tap(() => this.sessionStorage.deleteToken()),
        tap(() => this.sessionStorage.deleteUser())
      );
  }

  register(userData: any) {
    return this.httpClient.post<any>('http://localhost:4000/register', userData);
  }
}