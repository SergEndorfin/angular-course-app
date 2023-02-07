import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, first, map, Observable } from 'rxjs';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { Course } from 'src/app/shared/model/course';
import { CoursesStateFacade } from 'src/app/store/courses/courses.facade';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  course$: Observable<Course>;

  constructor(
    private route: ActivatedRoute,
    private courseStateFacade: CoursesStateFacade,
    private coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    const courseId = this.route.snapshot.params['id'];

    this.course$ = this.courseStateFacade.allCourses$
      .pipe(
        map(courses => {
          const foundCourse = courses.find(course => course.id === courseId);
          if (foundCourse === undefined) return this.coursesService.getEmpty();
          return foundCourse;
        }),
        filter(course => !!course),
        first()
      );
  }
}