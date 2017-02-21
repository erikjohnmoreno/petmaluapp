import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { ConversationService } from './conversation.service';
import { HelperService } from './helper.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'conversation',
  templateUrl: './conversation.component.html'
})

export class ConversationComponent implements OnInit {
  conversation;
  constructor(
    private helper: HelperService,
    private conversationService: ConversationService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.conversationService.getConversation(+params['id']))
      .subscribe(conversation => this.conversation = conversation)
    this.helper;
  }

  sendMessage(content: string) {
    this.route.params
      .switchMap((params: Params) => this.conversationService.send(+params['id'], content))
      .subscribe(message => {
        this.conversation.messages.push(message);
      })
  }
}
