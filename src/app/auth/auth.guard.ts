import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) {}

  canActivate() {
    if (Number(localStorage.getItem('expires_at')) > 0) {
      return true;
    }

    // not logged in so redirect to auth0 login
    this.auth.auth0.authorize();
    return false;
  }
}
