import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginRoutingModule } from './login-routing.module';
import { UserStateFacade } from 'src/app/user/store/user.facade';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,
    FontAwesomeModule,
    LoginRoutingModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
