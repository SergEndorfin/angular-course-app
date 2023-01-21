import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEyeSlash, faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { map, Observable, of, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { switchBorder } from 'src/app/shared/utils/element-border-switcher';
import { createEmailValidator } from 'src/app/shared/utils/email.validator';
import { switchFieldTypeAndIcon } from 'src/app/shared/utils/password-field-switcher';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  faUser = faUser;
  faEyeSlash = faEyeSlash;
  faEnvelope = faEnvelope;

  isNewUserCreated$: Observable<string>;
  doesUserExist$: Observable<boolean>;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', {
      validators: [Validators.required, createEmailValidator()],
      updateOn: 'blur'
    }
    ],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  get name() {
    return this.form.controls['name'];
  }

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

  switchFieldTypeAndIcon(passwordField: HTMLInputElement) {
    this.faEyeSlash = switchFieldTypeAndIcon(passwordField, this.faEyeSlash);
  }

  addErrorStyle(errors: any, isTouched: boolean, element: any) {
    switchBorder(errors, isTouched, element);
  }

  registation() {
    this.authService.register(this.form.value)
      .subscribe({
        next: responce => {
          this.isNewUserCreated$ = of(responce.result);
          this.doesUserExist$ = of(false);
          this.form.reset();
        },
        error: () => this.doesUserExist$ = of(true)
      });
  }

  clearFormFields() {

  }
}
