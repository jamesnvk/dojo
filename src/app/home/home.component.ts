import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../user/user.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Topic } from '../reqtopic/topic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient, 
    private authService: AuthService, 
    private userService: UserService,
    private modalService: NgbModal
    ) { }

  topics = [];
  isDataLoaded = false;
  submitted = false;
  pairedNovice = '';

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

  public pair(topicObj) {
    const topic = new Topic();
    topic.id = topicObj.topicId;
    topic.updatedAt = (new Date()).toString().split(' ').splice(1,3).join(' ');
    topic.expert = this.userService.getCurrentUserId();
    topic.active = false;

      this.http.post(environment.apiUpdateTopic, topic)
      .subscribe(data => {
        let index = this.topics.findIndex(e => e.topicId === data["Attributes"].topicId)
        this.topics.splice(index, 1)
        this.pairedNovice = data["Attributes"].noviceName
        console.log(data["Attributes"].topicId) 
      });
      this.submitted = true;
  }

  public pairModal(pairContent) {
    this.modalService.open(pairContent).result.then((result) => {
      console.log(result) 
      }, (cancelled) => {
        console.log(cancelled);
    });
  }

}
