import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/model/course';
import { ButtonContent } from 'src/app/shared/utils/button-icon-name';
import { Observable } from 'rxjs';
import { UserStateFacade } from 'src/app/user/store/user.facade';
import { AuthorsStateFacade } from 'src/app/store/authors/authors.facade';
import { CoursesStateFacade } from 'src/app/store/courses/courses.facade';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;
  isAdmin$: Observable<boolean>;

  // Buttons:
  pencilIcon = ButtonContent.PENCIL;
  trashIcon = ButtonContent.TRASH;

  // Modal window:
  title?: string;
  courseId?: string;
  confirmOnDeleteMessage = 'Confirm that you really want to delete the course.';

  constructor(
    private userStateFacade: UserStateFacade,
    private coursesStateFacade: CoursesStateFacade,
    private authorsStateFacade: AuthorsStateFacade
  ) { }

  ngOnInit(): void {

    this.authorsStateFacade.getAuthors();
    this.coursesStateFacade.getAllCourses();

    this.isAdmin$ = this.userStateFacade.isAdmin$;
    this.courses$ = this.coursesStateFacade.courses$;
  }

  onSearch(courseTitle: string) {
    this.coursesStateFacade.getFilteredCourses(courseTitle);
  }

  openWindowToConfirmDeletion(title: string, courseId: string) {
    this.title = title;
    this.courseId = courseId;
  }

  onConfirmButtonClicked(buttonValue: string): void {
    if (buttonValue === ButtonContent.OK) {
      this.coursesStateFacade.deleteCourse(this.courseId!);
    }
    this.courseId = undefined;
    this.title = undefined;
  }
}