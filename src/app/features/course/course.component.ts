import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subject, Subscriber } from 'rxjs';
import { Course } from 'src/app/shared/components/model/course';
import { ButtonContent } from 'src/app/shared/utils/button-icon-name';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {

  @Input() editable: boolean = true;
  @Input() course!: Course;

  @Input() confirmModalWindow!: TemplateRef<any>;
  confirmOnDeleteMessage = 'Confirm that you really want to delete the course.';
  isConfirmWindowClosed = true;

  showCoursesText = ButtonContent.SHOW_COURSE;
  pencilIcon = ButtonContent.PENCIL;
  trashIcon = ButtonContent.TRASH;


  deleteCourse() {
    this.isConfirmWindowClosed = false;
  }

  onConfirmWindowClicked(buttonValue: string) {
    console.log('>>> (click)="onConfirmWindowClicked()', buttonValue);
    if (buttonValue === ButtonContent.CLOSE) {
      this.isConfirmWindowClosed = true;
    } else if (buttonValue === ButtonContent.OK) {
      this.isConfirmWindowClosed = true;
      this.editable = false;
    }
  }
}
