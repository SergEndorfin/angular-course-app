import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // currentUser?: User;

  usersBackendData: User[];

  constructor() {
    this.usersBackendData = [{
      name: 'Some User',
      email: 'test@test.test',
      password: '12345'
    }]
  }

  login(user: User): User {
    return this.usersBackendData.filter(u => u.email === user.email && u.email === user.email)[0];
  }

  registration(user: User) {
    this.usersBackendData.push(user);
  }
}
