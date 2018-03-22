import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../environments/environment';
import {Topic} from './topic';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-reqtopic',
  templateUrl: './reqtopic.component.html',
  styleUrls: ['./reqtopic.component.scss']
})
export class ReqtopicComponent implements OnInit {

  submitted = false;

  constructor(private http: HttpClient, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {}

  public createTopic(topicForm): void {
    const topic = new Topic();
    topic.active = true;
    topic.title = topicForm.value.title;
    topic.description = topicForm.value.description;
    topic.createdAt = (new Date()).toString().split(' ').splice(1,3).join(' ');
    topic.novice = this.userService.getCurrentUserId();
    topic.novicePic = this.userService.getCurrentUserPic();
    topic.noviceName = this.userService.getCurrentUserName();

    this.http.post(environment.apiPostTopic, topic)
      .subscribe(data => { return; });
    topicForm.reset();
    this.submitted = true;
  }

}
