import { Component, OnInit } from '@angular/core';

import { ConversationService } from './conversation.service';
import { HelperService } from './helper.service';

@Component({
  selector: 'dashboard',
  // template: `
  //   <li *ngFor="let user of users">{{ user.email }}</li>
  // `
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  errorMessage: string;
  conversations;

  constructor(private helper: HelperService, private conversationService: ConversationService) {}

  ngOnInit() {
    this.getConversations();
    this.helper;
  }

  getConversations() {
    this.conversationService.getConversations()
                            .subscribe(
                              conversations => this.conversations = conversations,
                              error => this.errorMessage = <any>error
                            );
  }
}
