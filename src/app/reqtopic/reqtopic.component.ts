import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-reqtopic',
  templateUrl: './reqtopic.component.html',
  styleUrls: ['./reqtopic.component.scss']
})
export class ReqtopicComponent implements OnInit {

  timeAllottedValues = [15, 30, 60, 90];
  submitted = false;

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
  }

  createTopic(topic) {
    console.log(topic.value);
    this.submitted = true;

    let timeAllottedString: String = topic.value.timeAllotted;

    let timeNum = Number(timeAllottedString.substr(0, 2));

    topic.value.timeAllotted = timeNum;

    this.http.post(environment.apiPostTopic, topic.value)
      .subscribe(data => { return; });
    topic.reset();
  }

}
