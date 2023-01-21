import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseCardModule } from '../course-card/course-card.module';


@NgModule({
  imports: [
    SharedModule,
    CourseCardModule,
    CoursesRoutingModule
  ],
  declarations: [
    CoursesComponent
  ],
  exports: [
  ]
})
export class CoursesModule { }
