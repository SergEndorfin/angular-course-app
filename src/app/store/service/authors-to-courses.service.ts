import { concatMap, first, map, mergeAll, mergeMap, Observable, tap, toArray } from "rxjs";
import { Author } from "src/app/shared/model/author";
import { Course } from "src/app/shared/model/course";

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

export const copyCourse = function (course: Course) {
  const updatedCourse = {
    title: course.title,
    description: course.description,
    duration: course.duration,
    authors: new Array<string>()
  }
  if (course.id) Object.defineProperty(updatedCourse, 'id', course.id);
  if (course.creationDate) Object.defineProperty(updatedCourse, 'creationDate', course.creationDate);
  return updatedCourse;
}