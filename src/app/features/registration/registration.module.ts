import { NgModule } from '@angular/core';
import { RegistrationComponent } from './registration.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    SharedModule,
    FontAwesomeModule
  ],
  exports: [
    RegistrationComponent
  ]
})
export class RegistrationModule { }
