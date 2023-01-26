import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class NotAuthorizedGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.authService.isAuthorized$
      .pipe(
        tap(isAuthorized => console.log('isAuthorized:', isAuthorized)),
        map(isAuthorized => !isAuthorized ? true : this.router.parseUrl('/courses'))
      )
  }
}