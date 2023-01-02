import { NgModule } from '@angular/core';
import { CourseComponent } from './course.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CourseComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CourseComponent
  ]
})
export class CourseModule { }