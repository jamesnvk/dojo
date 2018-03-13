import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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
    this.getTopics();
    this.isDataLoaded = true;
  }

  public getTopics(): void {
    const token = localStorage.getItem('id_token')
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    const httpOptions = {headers: headers};
    this.http.get(environment.apiGetActiveTopics, httpOptions)
    .subscribe(data => {
          data['Items'].forEach(i => {
            this.topics.push(i);
          });
        },
        err => {
          console.log('Error occured:' + err);
        });
  }

  public teach() {
    alert('this is working!');
    console.log(this.topics);
  }

}
