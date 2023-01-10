import { Component, EventEmitter, Output } from '@angular/core';
import { faEye, faEyeSlash, faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { User } from 'src/app/shared/model/user';
import { UserService } from 'src/app/shared/services/user.service';
import { ButtonContent } from 'src/app/shared/utils/button-icon-name';
import { switchBorder } from 'src/app/shared/utils/element-border-switcher';
import { switchFieldTypeAndIcon } from 'src/app/shared/utils/password-field-switcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss'
  ]
})
export class LoginComponent {

  loginButtonContext = ButtonContent.LOGIN;

  faUser = faUser;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faEnvelope = faEnvelope;

  @Output()
  loginEvent = new EventEmitter<User>();

  constructor(private userServise: UserService) { }

  switchFieldTypeAndIcon(passwordField: HTMLInputElement) {
    this.faEyeSlash = switchFieldTypeAndIcon(passwordField, this.faEyeSlash);
  }

  login(email: string, password: string) {
    this.loginEvent.emit(
      this.userServise.login({ email, password, name: '' })
    );
  }

  addErrorStyle(errors: any, isTouched: boolean, element: any) {
    switchBorder(errors, isTouched, element);
  }

}