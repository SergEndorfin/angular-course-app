import { Injectable } from '@angular/core';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  dataFromBackend: Course[];

  getAllCourses() {
    return this.dataFromBackend;
  }

  getAllCoursesByTitle(title: string) {
    return this.dataFromBackend.filter(
      course => course.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  deleteById(id: any) {
    if (typeof id === 'number' && id > -1) {
      this.dataFromBackend.splice(id, 1);
    }
  }

  constructor() {
    this.dataFromBackend = dammyData;
  }

  createCourse(course: Course) {
    course.creationDate = new Date(Date.now());
    if (!course.id) {
      this.dataFromBackend.push(course);
    } else {
      this.dataFromBackend[course.id] = course;
    }
  }
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
    description: 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    creationDate: new Date('December 17, 1995 03:24:00'),
    duration: 90,
    authors: ['Bob Bopson', 'Sam Samson']
  },
  {
    title: 'NodeJs',
    description: 'It has survived not Ipsum',
    creationDate: new Date('December 17, 1995 03:24:00'),
    duration: 90,
    authors: ['Bob Bopson', 'Sam Samson']
  }
];