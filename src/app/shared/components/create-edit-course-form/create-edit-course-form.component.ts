import { Component, OnDestroy, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { switchBorder } from '../../utils/element-border-switcher';
import { Course } from '../../model/course';
import { ActivatedRoute } from '@angular/router';
import { CoursesStateFacade } from 'src/app/store/courses/courses.facade';
import { filter, Observable, of, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-create-edit-course-form',
  templateUrl: './create-edit-course-form.component.html',
  styleUrls: ['./create-edit-course-form.component.scss']
})
export class CreateEditCourseFormComponent implements OnInit, OnDestroy {

  xMarkBtn = faXmark;
  isAuthorNameFieldTouched$: Observable<boolean>;

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    authors: this.fb.array([], Validators.required),
    duration: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.min(0)]],

    // 2 hidden fields only for updating purpose:
    creationDate: [''],
    id: [''],
  });

  currentCourseSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private coursesStateFacade: CoursesStateFacade
  ) { }

  ngOnInit(): void {
    const courseId = this.route.snapshot.params['id'];
    if (courseId) {
      this.coursesStateFacade.getSingleCourse(courseId);

      this.currentCourseSubscription = this.coursesStateFacade.course$
        .pipe(
          filter(course => !!course),
          tap(course => {
            if (course) this.fillInTheFormFields(course)
          })
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.currentCourseSubscription?.unsubscribe();
    this.form.reset();
    this.authors.clear();
  }

  get title() {
    return this.form.controls['title'];
  }

  get description() {
    return this.form.controls['description'];
  }

  get authors() {
    return this.form.controls['authors'] as FormArray;
  }

  get duration() {
    return this.form.controls['duration'];
  }

  get creationDate() {
    return this.form.controls['creationDate'];
  }

  get id() {
    return this.form.controls['id'];
  }

  fillInTheFormFields(course: Course) {
    this.title.setValue(course.title);
    this.description.setValue(course.description);
    this.duration.setValue('' + course.duration);
    //2 hidden fields:
    this.id.setValue(course.id);
    this.creationDate.setValue(course.creationDate.toString());

    course.authors
      .filter(author => !!author)
      .forEach(author => {
        this.authors.push(this.fb.group({
          author: [author]
        }))
      })
  }

  addErrorStyle(errors: any, isTouched: boolean, element: any) {
    switchBorder(errors, isTouched, element);
    if (element.name === 'author') {
      this.isAuthorNameFieldTouched$ = of(true);
    }
  }

  addAuthor(inputElement: HTMLInputElement) {
    const authorName = inputElement.value;
    if (authorName.trim() !== '') {
      const authorsForm = this.fb.group({
        author: [authorName]
      });
      this.authors.push(authorsForm);
      inputElement.value = '';
    }
    this.isAuthorNameFieldTouched$ = of(true);
    switchBorder(this.authors.status === 'INVALID', this.authors.length === 0, inputElement);
  }

  deleteAuthor(authorIndex: number) {
    this.authors.removeAt(authorIndex);
  }
}