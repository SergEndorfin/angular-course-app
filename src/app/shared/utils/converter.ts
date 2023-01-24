import { FormGroup } from "@angular/forms";
import { Course } from "../model/course";

export function formToCourse(form: FormGroup): Course {
  const course = {
    ...form.value,
    duration: +form.value.duration,
  };
  course['authors'] = course.authors.map(
    (authorObj: { author: string }) => authorObj['author']
  );
  return course;
}