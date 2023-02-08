import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/auth/guards/admin.guard';
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
    component: CreateEditCourseComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'edit/:id',
    component: CreateEditCourseComponent,
    canActivate: [AdminGuard]
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
  providers: [
    AdminGuard
  ]
})
export class CoursesRoutingModule { }
