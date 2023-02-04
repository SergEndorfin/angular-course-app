import { Component } from '@angular/core';
import { faEyeSlash, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { RegistrationResultService } from 'src/app/auth/services/registration-result.service';
import { AuthStateFacade } from 'src/app/auth/store/auth.facade';
import { switchBorder } from 'src/app/shared/utils/element-border-switcher';
import { switchFieldTypeAndIcon } from 'src/app/shared/utils/password-field-switcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  // Buttons:
  faEyeSlash = faEyeSlash;
  faEnvelope = faEnvelope;

  loginErrorMessage$ = this.authStateFacade.getLoginErrorMessage$;
  createdUserResponce$ = this.registrationResultService.userCreatedResponce$;

  constructor(
    private authStateFacade: AuthStateFacade,
    private registrationResultService: RegistrationResultService) { }

  switchFieldTypeAndIcon(passwordField: HTMLInputElement) {
    this.faEyeSlash = switchFieldTypeAndIcon(passwordField, this.faEyeSlash);
  }

  login(email: string, password: string) {
    this.authStateFacade.login({ email, password });
  }

  addErrorStyle(errors: any, isTouched: boolean, element: any) {
    switchBorder(errors, isTouched, element);
  }
}