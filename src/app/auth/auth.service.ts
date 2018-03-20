import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import {environment} from '../../environments/environment';
import {UserService} from '../user/user.service';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: environment.clientId,
    domain: environment.authDomain,
    responseType: 'token id_token',
    audience: 'https://jgdojo.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200',
    scope: 'openid profile'
  });

  // redirectUri: environment.endpoint   ->   use as callback URL in auth0 profile

  constructor(public router: Router, private userService: UserService) {
    this.checkToken();
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      // need this callback to finish executing before returning true
      if(authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        const user = this.userService.buildUser(authResult);
        this.setSession(authResult, user);
      } else {
        this.login();
      }
    });
  }

  public checkToken(): void {
    this.auth0.checkSession({
      audience: 'https://jgdojo.auth0.com/userinfo',
      scope: 'read:order write:order'
    }, (err, res) => {
      console.log(res);
      if(res !== undefined) {
        this.setSession(res, localStorage.getItem('current_user'));
      } else {
        console.log(err);
        this.login();
      }
    });
  }

  private setSession(authResult, user): any {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    let stringified = JSON.stringify(user);
    localStorage.setItem('current_user', stringified);
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    return authResult;
  }

  public logout(): void {
    // Remove tokens, expiry time and current user from localStorage
    localStorage.removeItem('current_user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/resolve']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
