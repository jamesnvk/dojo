import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient, private authService: AuthService, private userService: UserService) { }

  topics = [];
  isDataLoaded = false;

  ngOnInit() {
    this.getTopics();
    this.isDataLoaded = true;
  }

  public getTopics(): void {
    this.authService.sendRequest((options) => {
      this.http.get(environment.apiGetActiveTopics, options)
      .subscribe(data => {
            data['Items'].forEach(i => {
              this.topics.push(i);
            });
          },
          err => {
            console.log('Error occured:' + err);
          });
    })
  }

  public teach() {
    alert('this is working!');
  }

  public readMore() {
    alert('Modal will be here!');
  }

  

}
