import { NgModule } from '@angular/core';
import { RegistrationComponent } from './registration.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegistrationRoutingModule } from './registration-routing.module';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent
  },
  {
    path: 'registration',
    redirectTo: '/registration'
  }
]

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    SharedModule,
    FontAwesomeModule,
    RegistrationRoutingModule
  ],
  exports: [
    RegistrationComponent
  ]
})
export class RegistrationModule { }
