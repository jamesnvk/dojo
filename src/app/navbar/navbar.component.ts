import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, public userService: UserService) { }
  ngOnInit() {}

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
    this.userService.userLogOut();
  }

  isAuthenticated() {
    this.authService.isAuthenticated();
  }

  loggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

}
