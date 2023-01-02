import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseModule } from '../course/course.module';


@NgModule({
  imports: [
    SharedModule,
    CourseModule
  ],
  declarations: [
    CoursesComponent
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
