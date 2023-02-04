import { Inject, Injectable } from '@angular/core';
import { UserState } from '../store/user.reducer';

const USER = 'user';

@Injectable({
  providedIn: 'root'
})
export class UserSessionStoreService {

  constructor(@Inject('Window') private window: Window) { }

  setUser(user: UserState) {
    this.window.sessionStorage.setItem(USER, JSON.stringify(user));
  }

  deleteUser() {
    this.window.sessionStorage.removeItem(USER);
  }

  getUser() {
    return this.window.sessionStorage.getItem(USER);
  }
}
