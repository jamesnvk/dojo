import { Injectable } from '@angular/core';
import {User} from './user';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {

  private currentUser: User;

  constructor(private router: Router, private http: HttpClient) { }

  findOrCreateById(id) {

  }

  setCurrentUser(user) {
    this.currentUser = user;
  }

  getUser() {
    return this.currentUser;
  }

  userLogOut() {
    this.currentUser = null;
  }

  isLoggedIn() {

  }
}
