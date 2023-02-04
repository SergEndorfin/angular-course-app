import { Inject, Injectable } from '@angular/core';

const AUTH_TOKEN = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthSessionStorageService {

  constructor(@Inject('Window') private window: Window) { }

  setToken(token: string) {
    this.window.sessionStorage.setItem(AUTH_TOKEN, token);
  }

  getToken() {
    return this.window.sessionStorage.getItem(AUTH_TOKEN);
  }

  deleteToken() {
    this.window.sessionStorage.removeItem(AUTH_TOKEN);
  }

  get headers() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `${this.getToken()}`
    };
  }
}
