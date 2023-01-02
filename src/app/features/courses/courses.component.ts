import { Component } from '@angular/core';
import { Course } from 'src/app/shared/components/model/course';
import { ButtonContent } from 'src/app/shared/utils/button-icon-name';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  loginText = ButtonContent.LOGIN;
  logoutText = ButtonContent.LOGOUT;

  courses: Course[] = dammyData;
}




const dammyData = [
  {
    title: 'Angular',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    creationDate: new Date('December 1, 2022 03:24:00'),
    duration: 121,
    authors: ['Dave Haisenberg', 'Tony Ja', 'Bob Bobson']
  },
  {
    title: 'Angular-2',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    creationDate: new Date('December 17, 1995 03:24:00'),
    duration: 90,
    authors: ['Dave Haisenberg', 'Tony Ja']
  }
];