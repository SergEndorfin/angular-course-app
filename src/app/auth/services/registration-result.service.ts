import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SuccsessfulRegistrationBody {
  successful: boolean;
  result: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationResultService {
  userCreatedResponce$: Observable<SuccsessfulRegistrationBody>
}
