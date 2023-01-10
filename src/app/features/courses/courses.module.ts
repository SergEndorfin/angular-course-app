import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseModule } from '../course/course.module';
import { RegistrationModule } from '../registration/registration.module';


@NgModule({
  imports: [
    SharedModule,
    CourseModule,
    RegistrationModule
  ],
  declarations: [
    CoursesComponent
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
