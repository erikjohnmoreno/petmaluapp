import { Component } from '@angular/core';

import { AppComponent } from './app.component';
import { UserService } from './user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  errorMessage: string;
  context;

  constructor(
    private userService: UserService) {}

  login(email: string, password: string): void {
    email = email.trim();
    password = password.trim();

    if (!email ) { return; }

    this.userService.login(email, password)
                    .subscribe(
                      context => {
                        this.context = context
                        AppComponent.returned.next(localStorage.getItem("token"));
                      },
                      error => this.errorMessage = <any>error)
  }
}
