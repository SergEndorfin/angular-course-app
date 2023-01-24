import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, filter, first, map, Observable, pipe, tap } from 'rxjs';
import { Author } from 'src/app/shared/model/author';
import { Course } from '../../shared/model/course';
import { AuthorsStoreService } from '../authors/authors-store.service';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {

  private courses$$ = new BehaviorSubject<Course[]>([]);

  courses$: Observable<Course[]> = this.courses$$.asObservable();

  constructor(private coursesService: CoursesService, private authorsStoreService: AuthorsStoreService) { }

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

  deleteCourseById(id: string): void {
    this.coursesService.deleteCourseById(id)
      .pipe(
        map(deleteResponce => this.getIdFromResponce(deleteResponce)),
        concatMap(courseId => this.getAuthorsIdsForCurrentCourse(courseId)),
        concatMap(authorsIds => this.authorsStoreService.deleteAuthorsByIds(authorsIds)),
        map(deleteAuthorsResponces => deleteAuthorsResponces.map((resp: any) => this.getIdFromResponce(resp)))
      )
      .subscribe(authorIds => {
        this.deleteCourseFromStore(id);
        this.authorsStoreService.deleteAuthorsFromStore(authorIds);
      });
  }

  createCourse(course: Course): Observable<any> {
    // save authors to get Ids
    return this.authorsStoreService.createAuthors(course.authors)
      .pipe(
        map<Author[], string[]>(saveAuthorResponces => saveAuthorResponces.map(resp => resp['id'])),
        // put ids into course.authors
        tap(authorsIds => course.authors = authorsIds),
        concatMap(() => this.coursesService.createCourse(course)),

        tap(createCourseResp => console.log('_=_', createCourseResp))
      );
  }

  updateCourse(course: Course) {
    return this.coursesService.updateCourse(course);
  }

  deleteCourseFromStore(courseId: string) {
    const courses = this.courses$$.getValue();
    const updatedCoursesList = courses.filter(course => course.id !== courseId);
    this.courses$$.next(updatedCoursesList);
  }

  createCourseInStrore(course: Course) {
    this.courses$$.next([...this.courses$$.value, course])
  }

  getIdFromResponce(responce: any): string {
    return responce['result'].split(' ')[4];
  }

  getAuthorsIdsForCurrentCourse(id: string): Observable<string[]> {
    return this.courses$.pipe(
      map(courses => courses.find(course => course.id === id)),
      map(course => course ? course.authors : []),
      first()
    )
  }
}
