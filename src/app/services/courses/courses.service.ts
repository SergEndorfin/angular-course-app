import { Injectable } from '@angular/core';
import { Course } from '../../shared/model/course';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SessionStorageService } from 'src/app/auth/services/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient, private sessionStorage: SessionStorageService) {
  }

  getEmpty(): Course {
    return { id: 'mock-course', title: '', authors: [], description: '', duration: 0, creationDate: '' }
  }

  getAllCourses(): Observable<Course[]> {
    return this.httpClient.get<any>('http://localhost:4000/courses/all')
      .pipe(
        map(res => res['result'])
      );
  }

  deleteCourseById(id: string): Observable<any> {
    return this.httpClient
      .delete(`http://localhost:4000/courses/${id}`, { headers: this.sessionStorage.headers });
  }

  createCourse(course: Course): Observable<any> {
    return this.httpClient
      .post<any>('http://localhost:4000/courses/add', course, { headers: this.sessionStorage.headers })
      .pipe(
        map(res => res['result'])
      );
  }

  updateCourse(course: Course): Observable<any> {
    return this.httpClient
      .put<any>(`http://localhost:4000/courses/${course.id}`, course, { headers: this.sessionStorage.headers })
      .pipe(
        map(res => res['result'])
      );;
  }
}
