import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { UserSessionStoreService } from 'src/app/user/services/user-session-store-.service';
import { AuthSessionStorageService as AuthSessionStoreService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private sessionStorage: AuthSessionStoreService,
    private userSessionStoreService: UserSessionStoreService,
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
        tap(() => {
          this.sessionStorage.deleteToken();
          this.userSessionStoreService.deleteUser();
        })
      );
  }

  register(userData: any) {
    return this.httpClient.post<any>('http://localhost:4000/register', userData);
  }
}