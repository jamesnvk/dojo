import { Injectable } from '@angular/core';
import {User} from './user';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(private router: Router, private http: HttpClient) { }

  findOrCreateByUser(payload): User {

    let user = new User();
    user.id = Number(payload.idTokenPayload.sub.substr(14));
    user.firstName = payload.idTokenPayload.given_name;
    user.lastName = payload.idTokenPayload.family_name;
    user.picture = payload.idTokenPayload.picture;
    user.updatedAt = payload.idTokenPayload.updated_at;

    this.http.post(environment.apiFindOrCreateByUser, user)
      .subscribe(data => {
        user.id = data['Attributes'].id;
        user.firstName = data['Attributes'].firstName;
        user.lastName = data['Attributes'].lastName;
        user.picture = data['Attributes'].picture;
        user.updatedAt = data['Attributes'].updatedAt;
      },  (err) => console.log(err));

    return user;
  }

  // "current user" is the user that is in local storage
  public getCurrentUser() {
    return JSON.parse(localStorage.getItem('current_user'));
  }

  // public getUser() {
  //   this.http.get(environment.)
  // }

  public buildUser(payload): User {
      let user = new User();
      user.id = Number(payload.idTokenPayload.sub.substr(14));
      user.firstName = payload.idTokenPayload.given_name;
      user.lastName = payload.idTokenPayload.family_name;
      user.picture = payload.idTokenPayload.picture;
      user.updatedAt = payload.idTokenPayload.updated_at;

      return user;
  }
}
