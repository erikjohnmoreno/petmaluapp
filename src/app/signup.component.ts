import { Component } from '@angular/core';

import { UserService } from './user.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./login.component.css']
})

export class SignupComponent {
  errorMessage: string;
  message: string;

  users;

  constructor(private userService: UserService) {}

  register(email: string, password: string, password_confirmation: string): void {
    email = email.trim();
    password = password.trim();
    password_confirmation = password_confirmation.trim();

    if ( !email ) { return; }

    this.userService.registerUser(email, password, password_confirmation)
                    .subscribe(
                      message => this.message = message,
                      error => this.errorMessage = <any>error);
  }

}
