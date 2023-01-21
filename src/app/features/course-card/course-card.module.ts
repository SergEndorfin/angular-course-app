import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseModule } from '../course/course.module';
import { CourseCardComponent } from './course-card.component';


@NgModule({
  declarations: [
    CourseCardComponent
  ],
  imports: [
    SharedModule,
    CourseModule
  ],
  exports: [
    CourseCardComponent
  ]
})
export class CourseCardModule { }
