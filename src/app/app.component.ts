import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthStateFacade } from './auth/store/auth.facade';
import { CoursesStateFacade } from './store/courses/courses.facade';
import { UserStateFacade } from './user/store/user.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userName$: Observable<string | undefined> = this.userStateFacade.name$;

  constructor(
    private activateRoute: ActivatedRoute,
    private authStateFacade: AuthStateFacade,
    private userStateFacade: UserStateFacade,
    private coursesStateFacade: CoursesStateFacade
  ) { }

  ngOnInit(): void {
    this.authStateFacade.setAuthorization();
    this.userStateFacade.setUserIfExists();
  }

  isCredentialsPageActive() {
    const snapshot: any = this.activateRoute.snapshot;
    const currentPage = snapshot['_routerState'].url;
    return currentPage !== '/login' && currentPage !== '/registration';
  }

  onLogoutButtonClicked() {
    this.authStateFacade.logout();
  }

  onLogoClicked() {
    this.coursesStateFacade.getFilteredCourses('');
  }
}