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
import {UserService} from './user/user.service';
import {AuthGuard} from './auth/auth.guard';
import { ResolveComponent } from './resolve/resolve.component';
import {NavbarService} from './navbar/navbar.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReqtopicComponent,
    LeaderboardComponent,
    NavbarComponent,
    ResolveComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'reqtopic',
        component: ReqtopicComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'leaderboard',
        component: LeaderboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'resolve',
        component: ResolveComponent
      }
    ])
  ],
  providers: [AuthService, UserService, AuthGuard, NavbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
