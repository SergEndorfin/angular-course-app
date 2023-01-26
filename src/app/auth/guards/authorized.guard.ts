import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { first, Observable, tap } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthorizedGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this.authService.isAuthorized$
      .pipe(
        first(),
        tap(isAuthorized => { if (!isAuthorized) this.router.navigateByUrl('/login') })
      )
  }


}