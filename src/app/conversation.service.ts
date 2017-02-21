import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ConversationService {
  private conversationUrl = "http://localhost:3000/api/v1/conversations/";

  constructor(private router: Router, private http: Http) {}

  getConversation(id: number) {
    const url = this.conversationUrl + id;
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError)
  }

  getConversations() {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let token = localStorage.getItem("token");
    const url = this.conversationUrl + "list";
    return this.http.post(url, {token}, options)
                    .map(this.extractData)
                    .catch(this.handleError)
  }

  create(email: string, subject: string, content: string) {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let token = localStorage.getItem("token");

    return this.http.post(this.conversationUrl, {token, email, subject, content}, options)
                    .map((res: Response) => {
                      this.router.navigateByUrl('/dashboard');
                    })
                    .catch(this.handleError)
  }

  send(conversation_id: number, content: string) {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let token = localStorage.getItem("token");
    const url = this.conversationUrl + 'send';
    
    return this.http.post(url, {conversation_id, content, token}, options)
                    .map(this.extractData)
                    .catch(this.handleError)
  }

  private extractData(response: Response) {
    let body = response.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
