import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseCardModule } from '../course-card/course-card.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuthorsStore from '../../store/authors/authors.reducer'
import * as fromCoursesStore from '../../store/courses/courses.reducer'
import { AuthorsEffects } from 'src/app/store/authors/authors.effects';
import { CoursesEffects } from 'src/app/store/courses/courses.effects';


@NgModule({
  imports: [
    SharedModule,
    CourseCardModule,
    CoursesRoutingModule,

    StoreModule.forFeature(
      fromAuthorsStore.authorsFeatureKey,
      fromAuthorsStore.authorsReducer,
    ),
    StoreModule.forFeature(
      fromCoursesStore.coursesFeatureKey,
      fromCoursesStore.coursesReducer,
    ),
    EffectsModule.forFeature([
      AuthorsEffects,
      CoursesEffects
    ])
  ],
  declarations: [
    CoursesComponent
  ],
  exports: [
  ]
})
export class CoursesModule { }
