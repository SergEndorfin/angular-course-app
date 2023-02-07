import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CoursesStateFacade } from 'src/app/store/courses/courses.facade';
import { Course } from '../../shared/model/course';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {

  courses$: Observable<Course[]> = this.courseStateFacade.allCourses$;

  constructor(
    private courseStateFacade: CoursesStateFacade
  ) { }


  createCourse(course: Course): Observable<any> {
    return of(null)
    //  this.authorsStoreService.createAuthors(course.authors)
    //   .pipe(
    //     map<Author[], string[]>(saveAuthorResponces => saveAuthorResponces.map(resp => resp['id'])),
    //     tap(authorsIds => course.authors = authorsIds),
    //     concatMap(() => this.coursesService.createCourse(course)),
    //     // tap(createdCourse => this.createCourseInStrore(createdCourse))
    //   );
  }

  updateCourse(course: Course): Observable<any> {
    // const currentCourseAuthors: Author[] = course.authors;
    // const currentCourseAuthorsIds = currentCourseAuthors.map(author => author.id);
    // const currentCourseAuthorsStoreIds: string[] = [];//this.courses$$.getValue().find(c => c.id === course.id)!.authors;
    // const authorIdsToBeDeleted = currentCourseAuthorsStoreIds.filter(authorStoreId =>
    //   !currentCourseAuthorsIds.includes(authorStoreId)
    // );
    // const authorsIdsToLeave: string[] = currentCourseAuthors.filter(author => author.id).map(author => author.id);
    // const authorsWithoutIdsToBeCreated: Author[] = currentCourseAuthors.filter(author => !author.id);

    return of(null);
  }
}
