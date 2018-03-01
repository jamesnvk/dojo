import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  topics = [];
  isDataLoaded = false;

  // https://jsonplaceholder.typicode.com/users
  /*
  {
  "Items": [
    {
      "topicId": "1",
      "active": true,
      "description": "This is a dummy description of spring data rest topic",
      "title": "Spring Data REST"
    }
  ],
  "Count": 1,
  "ScannedCount": 1

  environment.apiUrl
}
   */

  ngOnInit() {
    this.http.get(environment.apiUrl)
      .subscribe(data => {
        data['Items'].forEach(i => {
          this.topics.push(i);
        });
      },
        err => {
        console.log('Error occured:' + err);
        });
    this.isDataLoaded = true;
  }

  teach() {
    alert('this is working!');
    console.log(this.topics);
  }

}
