import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthorsStoreService } from 'src/app/services/authors/authors-store.service';
import { Course } from 'src/app/shared/model/course';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input() course: Course;
  @Input() isConfirmWindowColosed!: boolean;

  authorsNames$: Observable<string>;

  constructor(private authorsStoreService: AuthorsStoreService) { }

  ngOnInit(): void {
    this.authorsNames$ =
      this.authorsStoreService.selectAuthorsByIds(this.course.authors)
        .pipe(
          map(author => author
            .map(author => author.name)
            .join(', ')
          )
        );
  }
}
