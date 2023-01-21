import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesStoreService } from './services/courses/courses-store.service';
import { AuthorsStoreService } from './services/authors/authors-store.service';
import { UserStoreService } from './user/user-store.service';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userName$: Observable<string | null>;

  constructor(
    private activateRoute: ActivatedRoute,
    private coursesStore: CoursesStoreService,
    private authorsStoreService: AuthorsStoreService,
    private userStoreService: UserStoreService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.coursesStore.init();
    this.authorsStoreService.init();
    this.userName$ = this.userStoreService.name$;
  }

  isCoursesRouteActive() {
    const snapshot: any = this.activateRoute.snapshot;
    return snapshot['_routerState'].url === '/courses';
  }

  onLogoutButtonClicked() {
    this.authService.logout()
      .pipe(
        tap(() => this.userStoreService.logout())
      )
      .subscribe();
  }

}