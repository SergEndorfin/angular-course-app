import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/model/course';
import { ButtonContent } from 'src/app/shared/utils/button-icon-name';
import { map, Observable } from 'rxjs';
import { CoursesStoreService } from 'src/app/services/courses/courses-store.service';
import { UserStateFacade } from 'src/app/user/store/user.facade';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;
  isAdmin$: Observable<boolean> = this.userStateFacade.isAdmin$;

  // Buttons:
  pencilIcon = ButtonContent.PENCIL;
  trashIcon = ButtonContent.TRASH;

  title?: string;
  courseId?: string;
  confirmOnDeleteMessage = 'Confirm that you really want to delete the course.';

  constructor(
    private coursesStoreService: CoursesStoreService,
    private userStateFacade: UserStateFacade
  ) { }

  ngOnInit(): void {
    this.courses$ = this.coursesStoreService.courses$;
  }

  searchResult(courseTitle: string) {
    this.courses$ = this.coursesStoreService.courses$.pipe(
      map(courses => courses.filter(course => course.title.includes(courseTitle)))
    )
  }

  deleteCourse(title: string, courseId: string) {
    this.title = title;
    this.courseId = courseId;
  }

  onConfirmWindowClicked(buttonValue: string): void {
    if (buttonValue === ButtonContent.OK) {
      this.coursesStoreService.deleteCourseById(this.courseId!);
      this.courseId = undefined;
    }
    this.title = undefined;
  }
}