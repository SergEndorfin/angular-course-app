import { concatMap, filter, first, map, mergeAll, mergeMap, Observable, tap, toArray } from "rxjs";
import { Author } from "src/app/shared/model/author";
import { Course } from "src/app/shared/model/course";
import { AuthorsStateFacade } from "../authors/authors.facade";

export const mapAuthorsToCourses = (authors$: Observable<Author[]>) => (sourse: Observable<Course[]>) =>
  sourse
    .pipe(
      mergeAll(),
      mergeMap(course => authors$
        .pipe(
          map(authors => course.authors.map(authorId => authors.find(author => author.id === authorId)!.name)),
          tap(authorNames => course.authors = authorNames),
          map(() => course),
          first()
        )
      ),
      toArray()
    );

export const mapAuthorsToSingleCourse = (authors$: Observable<Author[]>) => (sourse: Observable<Course>) =>
  sourse.pipe(
    concatMap(course => authors$
      .pipe(
        map(authors => course.authors.map(authorId => authors.find(author => author.id === authorId)?.name)),
        tap(authorNames => course.authors = authorNames.filter(name => !!name).map(name => name!.toString())),
        map(() => course)
      )
    ),
    first()
  );

export const createAuthorsAndSetIds = (authorsStateFacade: AuthorsStateFacade) => (sourse: Observable<Course>) =>
  sourse.pipe(
    map(sourseCourse => {
      const course = copyCourse(sourseCourse);
      const originCourseAuthorsLength = sourseCourse.authors.length;
      return { course, originCourseAuthorsLength };
    }),
    concatMap(data =>
      authorsStateFacade.addedAuthor$
        .pipe(
          filter(addedAuthor => !!addedAuthor),
          map(addedAuthor => addedAuthor!.id),
          tap(authorId => data.course.authors.push(authorId)),
          tap(() => authorsStateFacade.resetAddedAuthor()),
          filter(() => data.course.authors.length === data.originCourseAuthorsLength),
          map(() => data.course)
        )
    ),
  )


export const copyCourse = function (course: Course) {
  const updatedCourse = {
    title: course.title,
    description: course.description,
    duration: course.duration,
    authors: new Array<string>()
  }
  if (course.id)
    Object.defineProperty(updatedCourse, 'id', { value: course.id });
  if (course.creationDate)
    Object.defineProperty(updatedCourse, 'creationDate', { value: course.creationDate });
  return updatedCourse;
}