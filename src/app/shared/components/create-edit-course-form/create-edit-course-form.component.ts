import { Component, OnDestroy, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { switchBorder } from '../../utils/element-border-switcher';
import { ButtonContent } from '../../utils/button-icon-name';
import { Observable } from 'rxjs';
import { Course } from '../../model/course';
import { ActivatedRoute } from '@angular/router';
import { CoursesStoreService } from 'src/app/services/courses/courses-store.service';
import { AuthorsStoreService } from 'src/app/services/authors/authors-store.service';

@Component({
  selector: 'app-create-edit-course-form',
  templateUrl: './create-edit-course-form.component.html',
  styleUrls: ['./create-edit-course-form.component.scss']
})
export class CreateEditCourseFormComponent implements OnInit, OnDestroy {

  // course$: Observable<Course>;

  createAuthorBtnText = ButtonContent.CREATE_AUTHOR;
  xMarkBtn = faXmark;

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(6)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    authors: this.fb.array([]),
    duration: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.min(0)]],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private coursesStoreService: CoursesStoreService,
    private authorsStoreService: AuthorsStoreService
  ) { }

  ngOnInit(): void {
    const courseId = this.route.snapshot.params['id'];
    if (courseId) {
      const subscription = this.coursesStoreService.selectCourseById(courseId)
        .subscribe(course => this.fillInTheFormFields(course));
      // do I need to unsubscribe here?
      subscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    // this.course$.subscribe();
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

  fillInTheFormFields(course: Course) {
    this.title.setValue(course.title);
    this.description.setValue(course.description);
    this.duration.setValue('' + course.duration);

    const authorNames$ = this.authorsStoreService.selectAuthorNamesByIds(course.authors);

    const subscription = authorNames$.subscribe(
      authors => authors.forEach(author =>
        this.authors.push(this.fb.group({ author: [author.name] }))
      )
    );
    // do I need to unsubscribe here?
    subscription.unsubscribe()
  }

  addErrorStyle(errors: any, isTouched: boolean, element: any) {
    switchBorder(errors, isTouched, element);
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
  }

  deleteAuthor(authorIndex: number) {
    this.authors.removeAt(authorIndex);
  }

  onCreateCourseClicked(event: any) {
    console.log('>>>>>>>>>>', event);
    const buttonElement = event.target;
    const valueContent = (buttonElement.textContent || buttonElement.innerText).trim();
    if (valueContent === ButtonContent.CREATE_COURSE) {
      // this.courseService.createCourse(formToCourse(this.form));
    }
    console.log('>>>>>>>>>>', valueContent);
    // {
    //   "successful": true,
    //   "result": {
    //     "title": "tttttttttt",
    //     "description": "dddddddddddd",
    //     "duration": 150,
    //     "authors": [
    //       "3e9f640f-8f7e-47c3-bd1f-facf1c13f52c",
    //       "1fccd9fc-248d-407d-b488-88e75a30304e"
    //     ],
    //     "creationDate": "19/01/2023",
    //     "id": "f6cfc7dd-8a70-444b-a2d0-0055e243b13c"
    //   }
    // }
  }
}
