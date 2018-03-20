import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {UserService} from '../user/user.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // access token = state.url
    if(this.userService.getCurrentUser()) {
      this.auth.checkToken();
      return true;
    } else if (state.url.includes('access_token')) {
      this.auth.handleAuthentication();
      // closure here before true
      return true;
    } else {
      // not logged in so redirect to auth0 login
      this.auth.login();
    }
    return false;
  }
}
