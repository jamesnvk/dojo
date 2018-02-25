import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  topics = [];
  isDataLoaded = false;

  ngOnInit() {
    this.http.get<any[]>("https://jsonplaceholder.typicode.com/users")
      .subscribe(data => {
        data.forEach(i => {
          this.topics.push(i.name)
        })
      },
        err => {
        console.log("Error occured:" + err);
        });
    this.isDataLoaded = true;
  }

  teach() {
    alert("this is working!");
    console.log(this.topics);
  }

}
