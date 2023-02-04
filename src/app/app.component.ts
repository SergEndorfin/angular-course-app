import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesStoreService } from './services/courses/courses-store.service';
import { AuthorsStoreService } from './services/authors/authors-store.service';
import { Observable, tap } from 'rxjs';
import { AuthStateFacade } from './auth/store/auth.facade';
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
    private coursesStore: CoursesStoreService,
    private authorsStoreService: AuthorsStoreService,
    private authStateFacade: AuthStateFacade,
    private userStateFacade: UserStateFacade
  ) { }

  ngOnInit(): void {
    this.coursesStore.init();
    this.authorsStoreService.init();
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
}