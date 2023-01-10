import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/model/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {


  @Input() course!: Course;
  @Input() isConfirmWindowColosed!: boolean;


  ngOnInit(): void {
  }

}
