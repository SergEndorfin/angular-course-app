import { Component, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../model/course';
import { ButtonContent } from '../../utils/button-icon-name';
import { formToCourse } from '../../utils/converter';
import { CreateEditCourseFormComponent } from '../create-edit-course-form/create-edit-course-form.component';

@Component({
  selector: 'app-create-edit-course',
  templateUrl: './create-edit-course.component.html',
  styleUrls: ['./create-edit-course.component.scss']
})
export class CreateEditCourseComponent {

  // Buttons
  cancelBtnText = ButtonContent.CANCEL;
  createCourseBtnText = ButtonContent.CREATE_COURSE;

  @Input()
  course?: Course;
  courseId?: number;

  @ViewChild(CreateEditCourseFormComponent)
  createEditCourseForm!: CreateEditCourseFormComponent;
  isFormInvalid = true;

  constructor(private router: Router) { }

  addCourseCancelClicked(event: any) {
    event.preventDefault();
    this.router.navigate(['..']);
  }



  createCourseClicked(event: any) {
    event.preventDefault();
    const course = formToCourse(this.createEditCourseForm.form);
    // course.id = this.courseId;
    // this.courseService.createCourse(course);
    this.courseId = undefined;
    // this.buttonClickedEvent.emit(this.cancelBtnText);
  }

}
