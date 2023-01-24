import { Component, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { switchBorder } from '../../utils/element-border-switcher';
import { Course } from '../../model/course';
import { ActivatedRoute } from '@angular/router';
import { CoursesStoreService } from 'src/app/services/courses/courses-store.service';
import { AuthorsStoreService } from 'src/app/services/authors/authors-store.service';

@Component({
  selector: 'app-create-edit-course-form',
  templateUrl: './create-edit-course-form.component.html',
  styleUrls: ['./create-edit-course-form.component.scss']
})
export class CreateEditCourseFormComponent implements OnInit {

  xMarkBtn = faXmark;

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    authors: this.fb.array([]),
    duration: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.min(0)]],

    // 2 hidden fields only for updating purpose:
    creationDate: [''],
    id: [''],
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

    const authorNames$ = this.authorsStoreService.selectAuthorsByIds(course.authors);

    const subscription = authorNames$.subscribe(
      authors => authors.forEach(author =>
        this.authors.push(this.fb.group({ author }))
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
        author: [{ name: authorName, id: '' }]
      });
      this.authors.push(authorsForm);
      inputElement.value = '';
    }
  }

  deleteAuthor(authorIndex: number) {
    this.authors.removeAt(authorIndex);
  }
}