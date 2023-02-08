import { Component, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { CoursesStateFacade } from 'src/app/store/courses/courses.facade';
import { formToCourse } from '../../utils/converter';
import { CreateEditCourseFormComponent } from '../create-edit-course-form/create-edit-course-form.component';

@Component({
  selector: 'app-create-edit-course',
  templateUrl: './create-edit-course.component.html',
  styleUrls: ['./create-edit-course.component.scss']
})
export class CreateEditCourseComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(CreateEditCourseFormComponent)
  createEditCourseForm!: CreateEditCourseFormComponent;

  private isCreateCourseButtonActive$$: BehaviorSubject<boolean>;
  isCreateCourseButtonActive$: Observable<boolean>;

  private formStatusChangesSubscription: Subscription;

  constructor(
    private router: Router,
    private courseStateFacade: CoursesStateFacade
  ) { }

  ngOnInit(): void {
    this.isCreateCourseButtonActive$$ = new BehaviorSubject(this.router.url.includes('add') ? true : false);
    this.isCreateCourseButtonActive$ = this.isCreateCourseButtonActive$$.asObservable();
  }

  ngAfterViewInit(): void {
    this.formStatusChangesSubscription = this.createEditCourseForm.form.statusChanges
      .pipe(
        map(status => status === 'INVALID' ? true : false)
      )
      .subscribe(isValid => this.isCreateCourseButtonActive$$.next(isValid));
  }

  ngOnDestroy(): void {
    this.formStatusChangesSubscription.unsubscribe();
  }

  addCourseCancelClicked(event: any) {
    event.preventDefault();
    this.router.navigate(['..']);
  }

  createCourseClicked(event: any) {
    event.preventDefault();
    const course = formToCourse(this.createEditCourseForm.form);

    if (course.id === '') {
      this.courseStateFacade.createCourse(course);
    } else {
      this.courseStateFacade.editCourse(course, course.id);
    }
  }
}