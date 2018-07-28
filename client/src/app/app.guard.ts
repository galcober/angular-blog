import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppGuard implements CanActivate {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log('Current User: ', localStorage.getItem('currentUser'));
      if (localStorage.getItem('currentUser')) {
        const token = JSON.parse(localStorage.getItem('currentUser')).token;
        const isExpired = this.jwtHelper.isTokenExpired(token);
        if (isExpired) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }
    }
}
