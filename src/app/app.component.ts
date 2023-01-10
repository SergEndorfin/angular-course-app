import { Component, ViewChild } from '@angular/core';
import { CoursesComponent } from './features/courses/courses.component';
import { Course } from './shared/model/course';
import { User } from './shared/model/user';
import { CoursesService } from './shared/services/courses.service';
import { UserService } from './shared/services/user.service';
import { ButtonContent } from './shared/utils/button-icon-name';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user?: User;

  loginText = ButtonContent.LOGIN;
  logoutText = ButtonContent.LOGOUT;
  addNewCourseButtonText = ButtonContent.ADD_NEW_COURSE;

  isLoginPageVisible = false;
  isRegistrationPageVisible = false;
  isAddNewCoursePageVisible = false;

  @ViewChild('courses')
  courses!: CoursesComponent;

  course?: Course;

  constructor(private courseService: CoursesService) {
    // test data:
    // this.user = { name: 'Bob Sterling', email: 'test@test', password: '123456' };
  }

  isUserLoggedIn(): boolean {
    return Boolean(this.user);
  }

  onLogoutButtonClicked() {
    this.user = undefined;
  }

  onRegistrationLinkClicked() {
    this.isRegistrationPageVisible = true;
    this.isLoginPageVisible = false;
  }

  onLoginLinkClicked(isLoginPageVisible = true) {
    this.isLoginPageVisible = isLoginPageVisible;
    this.isRegistrationPageVisible = false;
  }

  onRegistratinEvent(isRegistered: boolean) {
    this.onLoginLinkClicked(isRegistered);
  }

  onLoginEvent(loggedInUser: User) {
    this.user = loggedInUser;
    this.isLoginPageVisible = false;
    this.isRegistrationPageVisible = false;
  }

  onAddNewCourseLinkClicked() {
    this.isAddNewCoursePageVisible = true;
  }

  onAddNewCourseEvent(buttonContent: string) {
    if (buttonContent === ButtonContent.CANCEL) {
      // TODO some logic here... 
    } else if (buttonContent === ButtonContent.CREATE_COURSE) {
      // TODO some logic here... 
    }
    this.isAddNewCoursePageVisible = false;
    this.course = undefined;
  }

  restartSearchResult() {
    this.courses.courses = this.courseService.getAllCourses();
  }

  onEditCourseEvent(course: Course) {
    this.onAddNewCourseLinkClicked();
    this.course = course;
  }
}