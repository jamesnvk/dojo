import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {UserService} from '../user/user.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (state.url.includes('access_token')) {
      let idToken = state.url.split('#')[1].split('&').filter(param => param.includes("id_token"))[0].split("=")[1]
      this.auth.setIdToken(idToken);
      this.auth.handleAuthentication();
      return true;
    } else if (localStorage.getItem('id_token') !== undefined && localStorage.getItem('id_token') !== null) {
      return true;
    } else {
      // not logged in so redirect to auth0 login
      this.auth.login();
    }
    return false;
  }
}
