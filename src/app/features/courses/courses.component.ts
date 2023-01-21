import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/model/course';
import { ButtonContent } from 'src/app/shared/utils/button-icon-name';
import { first, Observable, tap } from 'rxjs';
import { CoursesStoreService } from 'src/app/services/courses/courses-store.service';
import { UserStoreService } from 'src/app/user/user-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;
  isAdmin$: Observable<boolean>;

  // Buttons:
  showCoursesText = ButtonContent.SHOW_COURSE;
  pencilIcon = ButtonContent.PENCIL;
  trashIcon = ButtonContent.TRASH;
  addNewCourseButtonText = ButtonContent.ADD_NEW_COURSE;

  title?: string;
  courseId?: string;
  confirmOnDeleteMessage = 'Confirm that you really want to delete the course.';

  constructor(
    private coursesStoreService: CoursesStoreService,
    private userStoreService: UserStoreService
  ) { }

  ngOnInit(): void {
    this.courses$ = this.coursesStoreService.courses$
      .pipe(
        first()
      );
    this.isAdmin$ = this.userStoreService.isAdmin$;
  }


  ///////////////////////////
  ///////////////////////////
  deleteCourse(title: string, courseId: string) {
    console.log('deleteCourse clicked -> course id =', courseId);
    this.title = title;
    this.courseId = courseId;
  }

  onConfirmWindowClicked(buttonValue: string) {
    if (buttonValue === ButtonContent.OK) {
      // this.coursesService.deleteById(this.courseId);
      this.courseId = undefined;
    }
    this.title = undefined;
  }

  searchResult(coursesFound: Course[]) {
    // this.courses = coursesFound;
  }

}