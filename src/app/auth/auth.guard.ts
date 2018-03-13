import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {UserService} from '../user/user.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //debugger
    // access token = state.url
    if (this.userService.getCurrentUser() || state.url.includes('access_token')) {
      // handle auth in lambda with access token in state.url
      this.auth.handleAuthentication();
      return true;
    } else {
      // not logged in so redirect to auth0 login
      this.auth.login();
    }

    return false;
  }
}
