import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable } from "rxjs";
import { AuthStateFacade } from "../store/auth.facade";

@Injectable()
export class NotAuthorizedGuard implements CanActivate {

  constructor(
    private authStateFacade: AuthStateFacade,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.authStateFacade.isAuthorized$
      .pipe(
        map(isUserAuthorized => !isUserAuthorized ? true : this.router.parseUrl('/courses'))
      )
  }
}