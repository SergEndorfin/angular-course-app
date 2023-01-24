import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { CoursesStoreService } from 'src/app/services/courses/courses-store.service';
import { formToCourse } from '../../utils/converter';
import { CreateEditCourseFormComponent } from '../create-edit-course-form/create-edit-course-form.component';

@Component({
  selector: 'app-create-edit-course',
  templateUrl: './create-edit-course.component.html',
  styleUrls: ['./create-edit-course.component.scss']
})
export class CreateEditCourseComponent implements OnInit, AfterViewInit {

  @ViewChild(CreateEditCourseFormComponent)
  createEditCourseForm!: CreateEditCourseFormComponent;

  private isCreateCourseButtonActive$$: BehaviorSubject<boolean>;
  isCreateCourseButtonActive$: Observable<boolean>;

  constructor(private router: Router, private courseStoreService: CoursesStoreService) { }

  ngOnInit(): void {
    this.isCreateCourseButtonActive$$ = new BehaviorSubject(this.router.url.includes('add') ? true : false);
    this.isCreateCourseButtonActive$ = this.isCreateCourseButtonActive$$.asObservable();
  }

  ngAfterViewInit(): void {
    this.createEditCourseForm.form.statusChanges
      .pipe(
        map(status => status === 'INVALID' ? true : false)
      )
      .subscribe(isValid => this.isCreateCourseButtonActive$$.next(isValid));
  }

  addCourseCancelClicked(event: any) {
    event.preventDefault();
    this.router.navigate(['..']);
  }

  createCourseClicked(event: any) {
    event.preventDefault();
    const course = formToCourse(this.createEditCourseForm.form);

    let create$: Observable<any>;
    if (course.id === '') {
      create$ = this.courseStoreService.createCourse(course);
    } else {
      create$ = this.courseStoreService.updateCourse(course);
    }

    create$.subscribe({
      next: (resp) => {
        this.courseStoreService.createCourseInStrore(resp);
        this.router.navigate(['/'])
      }
    })
  }
}