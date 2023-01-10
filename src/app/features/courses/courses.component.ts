import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from 'src/app/shared/model/course';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { ButtonContent } from 'src/app/shared/utils/button-icon-name';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  @Input() editable!: boolean;

  @Output()
  onEditCourse = new EventEmitter<Course>();

  courses: Course[];

  showCoursesText = ButtonContent.SHOW_COURSE;
  pencilIcon = ButtonContent.PENCIL;
  trashIcon = ButtonContent.TRASH;

  title?: string;
  index?: number;
  confirmOnDeleteMessage = 'Confirm that you really want to delete the course.';

  constructor(private coursesService: CoursesService) {
    this.courses = coursesService.getAllCourses();
  }

  deleteCourse(title: string, index: number) {
    this.title = title;
    this.index = index;
  }

  editCourse(course: Course, index: number) {
    ////////////////////////////////////////////////////////////////////////////////////
    course.id = index;
    this.onEditCourse.emit(course);
  }

  onConfirmWindowClicked(buttonValue: string) {
    if (buttonValue === ButtonContent.OK) {
      this.coursesService.deleteById(this.index);
      this.index = undefined;
    }
    this.title = undefined;
  }

  searchResult(coursesFound: Course[]) {
    this.courses = coursesFound;
  }
}