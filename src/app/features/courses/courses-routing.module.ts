import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditCourseComponent } from 'src/app/shared/components';
import { CourseComponent } from '../course/course.component';
import { CoursesComponent } from './courses.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent
  },
  {
    path: 'add',
    component: CreateEditCourseComponent
  },
  {
    path: 'edit/:id',
    component: CreateEditCourseComponent
  },
  {
    path: ":id",
    component: CourseComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class CoursesRoutingModule { }
