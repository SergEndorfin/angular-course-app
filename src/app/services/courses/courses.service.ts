import { Injectable } from '@angular/core';
import { Course } from '../../shared/model/course';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';
import { AuthSessionStorageService } from 'src/app/auth/services/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private httpClient: HttpClient,
    private sessionStorage: AuthSessionStorageService) { }

  getEmpty(): Course {
    return { id: 'mock-course', title: '', authors: [], description: '', duration: 0, creationDate: '' }
  }

  getAllCourses(): Observable<Course[]> {
    return this.httpClient.get<any>('http://localhost:4000/courses/all')
      .pipe(
        map(res => res['result']),
        shareReplay()
      );
  }

  getSpecificCourse(id: string): Observable<Course> {
    return this.httpClient.get<any>(`http://localhost:4000/courses/${id}`)
      .pipe(
        map(res => res['result']),
        shareReplay()
      );
  }

  deleteCourse(id: string): Observable<any> {
    return this.httpClient
      .delete(`http://localhost:4000/courses/${id}`, { headers: this.sessionStorage.headers });
  }

  createCourse(course: any): Observable<any> {
    return this.httpClient
      .post<any>('http://localhost:4000/courses/add', course, { headers: this.sessionStorage.headers })
      .pipe(
        map(res => res['result'])
      );
  }

  editCourse(course: any): Observable<any> {
    return this.httpClient
      .put<any>(`http://localhost:4000/courses/${course.id}`, course, { headers: this.sessionStorage.headers })
      .pipe(
        map(res => res['result'])
      );;
  }
}
