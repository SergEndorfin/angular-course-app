import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { UserStateFacade } from "src/app/user/store/user.facade";

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private userStateFacade: UserStateFacade, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.userStateFacade.isAdmin$
      .pipe(
        tap(val => console.log('>>> isAdmin guard >>', val)),
        map(isAdmin => isAdmin ? true : this.router.parseUrl('/courses'))
      );
  }
}