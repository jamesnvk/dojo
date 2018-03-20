import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../user/user.service';
import {NavbarService} from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  const user = {};

  constructor(private authService: AuthService, public userService: UserService, private nav: NavbarService) {}
  ngOnInit() {
    //this.user['picture'] = this.userService.getUser();
  }

  logout() {
    this.authService.logout();
  }

}
