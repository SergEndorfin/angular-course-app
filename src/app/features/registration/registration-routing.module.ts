import { NgModule } from '@angular/core';
import { RegistrationComponent } from './registration.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent
  },
  {
    path: 'login',
    redirectTo: '/login'
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
