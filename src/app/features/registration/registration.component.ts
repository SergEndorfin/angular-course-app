import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faEyeSlash, faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { Observable, of } from 'rxjs';
import { AuthStateFacade } from 'src/app/auth/store/auth.facade';
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

  errorMessage$: Observable<string | undefined> = this.authStateFacade.getRegisterErrorMessage$;
  triedToRegister = false;

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
    private authStateFacade: AuthStateFacade
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
    this.triedToRegister = true;
    this.authStateFacade.register(this.form.value);
    this.errorMessage$ = this.authStateFacade.getRegisterErrorMessage$;
  }

  onTyping() {
    if (this.triedToRegister) {
      this.errorMessage$ = of(undefined);
    }
  }
}
