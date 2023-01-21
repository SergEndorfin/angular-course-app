import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { Course } from '../../shared/model/course';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {

  private courses$$ = new BehaviorSubject<Course[]>([]);

  courses$: Observable<Course[]> = this.courses$$.asObservable();

  constructor(private coursesService: CoursesService) { }

  init() {
    this.coursesService.getAllCourses()
      .subscribe(courses => this.courses$$.next(courses))
  }

  selectCourseById(courseId: string): Observable<Course> {
    return this.courses$.pipe(
      map(courses => {
        const foundCourse = courses.find(course => course.id === courseId);
        if (foundCourse === undefined) return this.coursesService.getEmpty();
        return foundCourse;
      }),
      filter(course => !!course)
    );
  }
}
