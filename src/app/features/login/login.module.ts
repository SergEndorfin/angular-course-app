import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,
    FontAwesomeModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
