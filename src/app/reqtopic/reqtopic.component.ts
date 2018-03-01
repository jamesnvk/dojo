import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-reqtopic',
  templateUrl: './reqtopic.component.html',
  styleUrls: ['./reqtopic.component.scss']
})
export class ReqtopicComponent implements OnInit {

  timeAllottedValues = [15, 30, 60, 90];
  submitted = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  createTopic(topic) {
    console.log(topic.value);
    this.submitted = true;

    let timeAllottedString: String = topic.value.timeAllotted;

    let timeNum = Number(timeAllottedString.substr(0, 2));

    topic.value.timeAllotted = timeNum;

    console.log(topic.value);

    this.http.post('https://9jwv1wpu4g.execute-api.us-east-1.amazonaws.com/prod/reqtopic', topic.value)
      .subscribe(data => {
        console.log(JSON.stringify(data) + ' has been submitted!');
      });
    topic.reset();
  }

}
