import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AuthSessionStorageService } from '../auth/services/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private sessionStorage: AuthSessionStorageService) { }

  getUser() {
    return this.httpClient.get<any>('http://localhost:4000/users/me', { headers: this.sessionStorage.headers })
      .pipe(
        map(responce => responce['result'])
      )
  }
}
