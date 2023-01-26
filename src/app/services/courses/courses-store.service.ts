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
    return this.authorsStoreService.createAuthors(course.authors)
      .pipe(
        map<Author[], string[]>(saveAuthorResponces => saveAuthorResponces.map(resp => resp['id'])),
        tap(authorsIds => course.authors = authorsIds),
        concatMap(() => this.coursesService.createCourse(course)),
        tap(createdCourse => this.createCourseInStrore(createdCourse))
      );
  }

  updateCourse(course: Course): Observable<any> {
    const currentCourseAuthors: Author[] = course.authors;
    const currentCourseAuthorsIds = currentCourseAuthors.map(author => author.id);
    const currentCourseAuthorsStoreIds: string[] = this.courses$$.getValue().find(c => c.id === course.id)!.authors;
    const authorIdsToBeDeleted = currentCourseAuthorsStoreIds.filter(authorStoreId =>
      !currentCourseAuthorsIds.includes(authorStoreId)
    );
    const authorsIdsToLeave: string[] = currentCourseAuthors.filter(author => author.id).map(author => author.id);
    const authorsWithoutIdsToBeCreated: Author[] = currentCourseAuthors.filter(author => !author.id);

    return this.authorsStoreService.deleteAuthorsByIds(authorIdsToBeDeleted)
      .pipe(
        map<any[], string[]>(deleteAuthorsResponce => deleteAuthorsResponce.map(resp => resp.result.split(' ')[4])),
        tap(deletedAuthorsIds => this.authorsStoreService.deleteAuthorsFromStore(deletedAuthorsIds)),

        concatMap(() => this.authorsStoreService.createAuthors(authorsWithoutIdsToBeCreated)),
        map<Author[], string[]>(createdAuthors => createdAuthors.map(author => author['id'])),
        tap(createdAuthorIds => course.authors = [...authorsIdsToLeave, ...createdAuthorIds]),

        concatMap(() => this.coursesService.updateCourse(course)),
        tap(updatedCourse => this.updateCourseInStrore(updatedCourse))
      );
  }

  deleteCourseFromStore(courseId: string) {
    const courses = this.courses$$.getValue().slice(0);
    const updatedCoursesList = courses.filter(course => course.id !== courseId);
    this.courses$$.next(updatedCoursesList.slice(0));
  }

  createCourseInStrore(course: Course) {
    this.courses$$.next([...this.courses$$.value, course])
  }

  updateCourseInStrore(course: Course) {
    const courses = this.courses$$.getValue();
    const courseIndex = courses.findIndex(c => c.id === course.id);
    const newCoursesList = courses.slice(0);
    newCoursesList[courseIndex] = {
      ...courses[courseIndex],
      ...course
    };
    this.courses$$.next(newCoursesList);
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
