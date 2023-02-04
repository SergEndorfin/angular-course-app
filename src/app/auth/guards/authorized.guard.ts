import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { first, Observable, tap } from "rxjs";
import { AuthStateFacade } from "../store/auth.facade";

@Injectable()
export class AuthorizedGuard implements CanLoad {

  constructor(private authStateFacade: AuthStateFacade, private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this.authStateFacade.isAuthorized$
      .pipe(
        first(),
        tap(isAuthorized => { if (!isAuthorized) this.router.navigateByUrl('/login') })
      )
  }
}