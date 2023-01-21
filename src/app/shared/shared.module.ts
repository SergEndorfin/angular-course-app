import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MinutesToHoursPipe } from './pipes/minutes-to-hours.pipe';
import { ButtonComponent, ConfirmWindowComponent, HeaderComponent, InfoComponent, SearchCourseComponent, CreateEditCourseComponent, CreateEditCourseFormComponent } from './components'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailValidatorDirective } from './directives/email-validator.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ButtonComponent,
    ConfirmWindowComponent,
    HeaderComponent,
    InfoComponent,
    SearchCourseComponent,
    CreateEditCourseComponent,
    CreateEditCourseFormComponent,
    MinutesToHoursPipe,
    EmailValidatorDirective
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    ButtonComponent,
    ConfirmWindowComponent,
    HeaderComponent,
    InfoComponent,
    SearchCourseComponent,
    CreateEditCourseComponent,
    CreateEditCourseFormComponent,
    MinutesToHoursPipe,
    FormsModule,
    ReactiveFormsModule,
    EmailValidatorDirective
  ]
})
export class SharedModule { }
