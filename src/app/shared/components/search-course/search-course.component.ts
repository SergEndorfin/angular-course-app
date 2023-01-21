import { Component, EventEmitter, Output } from '@angular/core';
import { Course } from '../../model/course';
import { CoursesService } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.scss']
})
export class SearchCourseComponent {

  @Output()
  searchCourseEvent = new EventEmitter<Course[]>();

  constructor(private courseService: CoursesService) { }

  onSearchClicked(title: string) {
    // this.searchCourseEvent.emit(this.courseService.getAllCoursesByTitle(title));
  }
}
