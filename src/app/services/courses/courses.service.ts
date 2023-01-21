import { Injectable } from '@angular/core';
import { Course } from '../../shared/model/course';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient) {
  }

  getEmpty(): Course {
    return { id: 'mock-course', title: '', authors: [], description: '', duration: 0, creationDate: new Date() }
  }

  getAllCourses(): Observable<Course[]> {
    return this.httpClient.get<any>('http://localhost:4000/courses/all')
      .pipe(
        map(res => res['result'])
      );
  }
}