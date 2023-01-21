import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faEyeSlash, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { switchBorder } from 'src/app/shared/utils/element-border-switcher';
import { switchFieldTypeAndIcon } from 'src/app/shared/utils/password-field-switcher';
import { UserStoreService } from 'src/app/user/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss'
  ]
})
export class LoginComponent {

  // Buttons:
  faEyeSlash = faEyeSlash;
  faEnvelope = faEnvelope;

  isCredentialsInvalid$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userStoreService: UserStoreService
  ) { }

  switchFieldTypeAndIcon(passwordField: HTMLInputElement) {
    this.faEyeSlash = switchFieldTypeAndIcon(passwordField, this.faEyeSlash);
  }

  login(email: string, password: string) {
    this.authService.login(email, password)
      .subscribe({
        next: () => {
          this.userStoreService.init();
          this.router.navigateByUrl('/courses');
        },
        error: () => this.isCredentialsInvalid$ = of(true)
      });
  }

  isCredentialsInvalid(isValid = false) {
    return isValid;
  }

  addErrorStyle(errors: any, isTouched: boolean, element: any) {
    switchBorder(errors, isTouched, element);
  }

}