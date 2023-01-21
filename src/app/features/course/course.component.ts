import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { AuthorsStoreService } from 'src/app/services/authors/authors-store.service';
import { CoursesStoreService } from 'src/app/services/courses/courses-store.service';
import { Course } from 'src/app/shared/model/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  course$: Observable<Course>;

  constructor(
    private route: ActivatedRoute,
    private coursesStoreService: CoursesStoreService,
    private authorStoreService: AuthorsStoreService
  ) { }

  ngOnInit(): void {
    const courseId = this.route.snapshot.params['id'];
    this.course$ = this.coursesStoreService.selectCourseById(courseId)
      .pipe(
        first()
      );
  }

  getAuthorsForCurrentCourse(course: Course): Observable<string> {
    return this.authorStoreService.selectAuthorNamesByIds(course.authors)
      .pipe(
        map(author => author.map(author => author.name).join(', '))
      );
  }

}
