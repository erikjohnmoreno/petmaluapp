import { Component } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  // template: `
  //   <h1>{{ title }} </h1>
  //   <a routerLink="/signup">Signup</a>
  //   <a routerLink="/login">Login</a>
  //   <router-outlet></router-outlet>
  // `,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Malupet na app';
  isLoggedIn: boolean = false;

  public static returned: Subject<any> = new Subject();

  constructor(private userService: UserService) {
    AppComponent.returned.subscribe(res => {
      this.isLoggedIn = false;
      if (res != "undefined") {
        if (res != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  logout() {
    this.userService.logout();
    AppComponent.returned.next(localStorage.getItem("token"));
  }
}
