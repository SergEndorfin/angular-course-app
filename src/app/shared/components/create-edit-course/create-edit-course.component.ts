import { Component, AfterViewChecked, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { ButtonContent } from '../../utils/button-icon-name';
import { formToCourse } from '../../utils/converter';
import { CreateEditCourseFormComponent } from '../create-edit-course-form/create-edit-course-form.component';

@Component({
  selector: 'app-create-edit-course',
  templateUrl: './create-edit-course.component.html',
  styleUrls: ['./create-edit-course.component.scss']
})
export class CreateEditCourseComponent implements AfterViewChecked {

  cancelBtnText = ButtonContent.CANCEL;
  createCourseBtnText = ButtonContent.CREATE_COURSE;

  @Input()
  course?: Course;
  courseId?: number;

  @Output() buttonClickedEvent = new EventEmitter();

  @ViewChild(CreateEditCourseFormComponent)
  createEditCourseForm!: CreateEditCourseFormComponent;
  isFormInvalid = true;

  constructor(private courseService: CoursesService) {
  }

  // I believe this bad solution can be replaced with Observable:
  ngAfterViewChecked() {
    this.isFormInvalid = !this.createEditCourseForm.form.valid;
    if (this.course) {
      this.courseId = this.course.id;
      this.createEditCourseForm.title.setValue(this.course.title);
      this.createEditCourseForm.description.setValue(this.course.description);
      this.createEditCourseForm.duration.setValue(String(this.course.duration));
    }
    this.course = undefined;
  }

  createCourseClicked(event: any) {
    event.preventDefault();
    const course = formToCourse(this.createEditCourseForm.form);
    course.id = this.courseId;
    this.courseService.createCourse(course);
    this.courseId = undefined;
    this.buttonClickedEvent.emit(this.cancelBtnText);
  }

  cancelCourseClicked(event: any) {
    event.preventDefault();
    this.buttonClickedEvent.emit(this.cancelBtnText);
  }
}
