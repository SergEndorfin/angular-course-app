import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faEyeSlash, faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { UserService } from 'src/app/shared/services/user.service';
import { ButtonContent } from 'src/app/shared/utils/button-icon-name';
import { switchBorder } from 'src/app/shared/utils/element-border-switcher';
import { createEmailValidator } from 'src/app/shared/utils/email.validator';
import { switchFieldTypeAndIcon } from 'src/app/shared/utils/password-field-switcher';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  @Output() registrationEvent = new EventEmitter();

  registerButtonContext = ButtonContent.REGISTRATION;

  faUser = faUser;
  faEyeSlash = faEyeSlash;
  faEnvelope = faEnvelope;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', {
      validators: [Validators.required, createEmailValidator()],
      updateOn: 'blur'
    }
    ],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]]
  });

  constructor(private fb: FormBuilder, private userService: UserService) { }

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

  registation(event: Event) {
    event.preventDefault();
    this.userService.registration(<User>this.form.value);
    this.registrationEvent.emit(true);
  }
}
