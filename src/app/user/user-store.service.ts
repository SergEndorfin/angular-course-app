import { Injectable } from '@angular/core';
import { BehaviorSubject, map, pipe, tap } from 'rxjs';
import { SessionStorageService } from '../auth/services/session-storage.service';
import { User } from '../shared/model/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private name$$ = new BehaviorSubject<string>('');
  private isAdmin$$ = new BehaviorSubject<boolean>(false);

  name$ = this.name$$.asObservable();
  isAdmin$ = this.isAdmin$$.asObservable();

  constructor(private userService: UserService, private sessionStore: SessionStorageService) {
    const sessionUser = this.sessionStore.getUser();
    if (sessionUser) {
      const user = JSON.parse(sessionUser);
      this.name$$.next('' + user.name);
      this.isAdmin$$.next(user.role === 'admin');
    }
  }

  init() {
    this.userService.getUser()
      .pipe(
        map(user => this.setNameIfEmpty(user))
      )
      .subscribe(user => {
        this.sessionStore.setUser({ name: user.name, role: user.role });
        this.name$$.next('' + user.name);
        this.isAdmin$$.next(user.role === 'admin');
      });
  }

  setNameIfEmpty(user: User): User {
    user.name = user.name ? user.name : 'user without name';
    return user;
  }

  logout() {
    this.name$$.next('');
    this.isAdmin$$.next(false);
  }
}
