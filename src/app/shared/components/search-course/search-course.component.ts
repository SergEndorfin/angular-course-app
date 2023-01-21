import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.scss']
})
export class SearchCourseComponent {

  @Output()
  searchCourseEvent = new EventEmitter<string>();

  constructor() { }

  onSearchClicked(title: string) {
    this.searchCourseEvent.emit(title);
  }
}
