import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(public auth: AuthService, public userService: UserService) {
    auth.handleAuthentication();
  }

  ngOnInit() { }

}
