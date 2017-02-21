import { Component } from '@angular/core';

import { ConversationService } from './conversation.service';

@Component({
  selector: 'compose',
  template: `
  <div class="container">
    <div class="alert alert-{{message.status}}" *ngIf="message">{{ message.message }}</div>
      <div class="card card-container">
          <p id="profile-name" class="profile-name-card"></p>
          <form class="form-signin">
              <span id="reauth-email" class="reauth-email"></span>
              <label>Recepient: </label>
              <input type="email" #receiver class="form-control" placeholder="To" required autofocus>
              <label>Subject: </label>
              <input type="text" #subject class="form-control" placeholder="Subject" required>
              <label>Content: </label>
              <textarea type="text" #content class="form-control" placeholder="Content" rows="7" required></textarea>
              <br>
              <button (click)="send(receiver.value, subject.value, content.value)" class="btn btn-lg btn-primary btn-block btn-signin">Send</button>
          </form>
      </div>
  </div>
  `
})

export class ComposeComponent {
  errorMessage: string;
  context;

  constructor(private conversationService: ConversationService) {}

  send(receiver_email, subject, content) {
    receiver_email = receiver_email.trim();
    subject = subject.trim();
    content = content.trim();

    if (!receiver_email) { return; }

    this.conversationService.create(receiver_email, subject, content)
                            .subscribe(
                              context => this.context = context,
                              error => this.errorMessage = <any>error)
  }
}
