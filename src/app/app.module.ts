import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReqtopicComponent } from './reqtopic/reqtopic.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import {FormsModule} from '@angular/forms';
import {AuthService} from './auth/auth.service';
import { CallbackComponent } from './callback/callback.component';
import {UserService} from './user/user.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReqtopicComponent,
    LeaderboardComponent,
    NavbarComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'reqtopic',
        component: ReqtopicComponent
      },
      {
        path: 'leaderboard',
        component: LeaderboardComponent
      },
      {
        path: 'callback',
        component: CallbackComponent
      }
    ])
  ],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
