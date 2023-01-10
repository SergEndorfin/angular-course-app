import { Component } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { switchBorder } from '../../utils/element-border-switcher';
import { ButtonContent } from '../../utils/button-icon-name';
import { CoursesService } from '../../services/courses.service';
import { formToCourse } from '../../utils/converter';

@Component({
  selector: 'app-create-edit-course-form',
  templateUrl: './create-edit-course-form.component.html',
  styleUrls: ['./create-edit-course-form.component.scss']
})
export class CreateEditCourseFormComponent {

  createAuthorBtnText = ButtonContent.CREATE_AUTHOR;
  xMarkBtn = faXmark;

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(6)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    authors: this.fb.array([]),
    duration: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.min(0)]],
  });

  constructor(private fb: FormBuilder, private courseService: CoursesService) { }

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

  addErrorStyle(errors: any, isTouched: boolean, element: any) {
    switchBorder(errors, isTouched, element);
  }

  addAuthor(inputElement: HTMLInputElement) {
    const authorName = inputElement.value;
    const authorsForm = this.fb.group({
      author: [authorName]
    });
    this.authors.push(authorsForm);
    inputElement.value = '';
  }

  deleteAuthor(authorIndex: number) {
    this.authors.removeAt(authorIndex);
  }

  onSubmit(event: any) {
    console.log('>>>>>>>>>>', event);
    const buttonElement = event.target;
    const valueContent = (buttonElement.textContent || buttonElement.innerText).trim();
    if (valueContent === ButtonContent.CREATE_COURSE) {
      this.courseService.createCourse(formToCourse(this.form));
    }
    console.log('>>>>>>>>>>', valueContent);
  }
}
