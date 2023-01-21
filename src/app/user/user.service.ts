import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { SessionStorageService } from '../auth/services/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private sessionStorage: SessionStorageService) { }

  getUser() {
    return this.httpClient.get<any>('http://localhost:4000/users/me', { headers: this.sessionStorage.headers })
      .pipe(
        map(responce => responce.result)
      )
  }
}
